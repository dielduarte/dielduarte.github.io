---
layout: '../../../../layouts/CaseStudy.astro'
title: "Rebuilding the Editor — From Laggy to Lightning"
company: "Appcues"
date: "2024-06-15"
description: "How we rebuilt a core WYSIWYG editor from scratch, cutting render times by 60% and memory usage by 40% through architectural changes and state machine driven UI."
languageKey: "en"
languageLink: "/case-studies/pt-br/reconstruindo-o-editor"
slug: "en/rebuilding-the-editor"
socialImage: "images/diel.jpeg"
techStack: ["React", "TypeScript", "XState", "Canvas API"]
role: "Principal Engineer"
duration: "4 months"
impact: "60% faster render, 40% less memory"
---

## The Problem

Our WYSIWYG editor was the core of the product — every customer used it daily to build in-app experiences. But as features accumulated over three years, the editor had become painfully slow. Customers with complex flows experienced noticeable input lag, and our support team was fielding complaints weekly.

The root causes were deeply architectural:

- **Uncontrolled re-renders**: Every keystroke triggered a full tree reconciliation across hundreds of components
- **Monolithic state**: A single Redux store held everything — selection state, content, toolbar state, undo history — causing cascading updates
- **Memory leaks**: Detached DOM nodes from drag-and-drop operations accumulated over editing sessions

## Context

Before diving into a rewrite, we needed to validate the scope. I led a two-week spike to instrument the existing editor and quantify the problem:

- **Input latency**: p95 was 340ms on complex flows (target: < 50ms)
- **Memory growth**: 15MB increase per hour of active editing
- **Re-render count**: ~2,400 component re-renders per keystroke

The team had considered incremental fixes, but profiling showed that the architecture itself was the bottleneck — patching wouldn't close the gap.

### Constraints

- Zero downtime for existing customers during migration
- Full backward compatibility with saved flow data
- Ship within one quarter (the team was 3 engineers)

## Solution

We rebuilt the editor core using a layered architecture with clear separation of concerns:

### 1. State Machine-Driven UI

Instead of ad-hoc state management, we modeled the entire editor lifecycle as a state machine using XState:

```tsx
import { createMachine, assign } from 'xstate';

const editorMachine = createMachine({
  id: 'editor',
  initial: 'idle',
  context: {
    content: null,
    selection: null,
    history: [],
  },
  states: {
    idle: {
      on: {
        FOCUS: 'editing',
        LOAD: {
          actions: assign({ content: (_, event) => event.data }),
        },
      },
    },
    editing: {
      on: {
        INPUT: {
          actions: assign({
            content: (ctx, event) => applyDelta(ctx.content, event.delta),
            history: (ctx) => [...ctx.history, ctx.content],
          }),
        },
        BLUR: 'idle',
        UNDO: {
          actions: assign({
            content: (ctx) => ctx.history[ctx.history.length - 1],
            history: (ctx) => ctx.history.slice(0, -1),
          }),
          cond: (ctx) => ctx.history.length > 0,
        },
      },
    },
  },
});
```

This gave us predictable state transitions, eliminated impossible states, and made the undo/redo system trivial to implement correctly.

### 2. Virtualized Rendering Layer

We replaced the DOM-heavy rendering approach with a virtualized canvas layer for the content viewport:

```tsx
function EditorViewport({ blocks, visibleRange }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const ctx = canvasRef.current?.getContext('2d');
    if (!ctx) return;

    // Only render blocks within the visible range
    const visibleBlocks = blocks.slice(visibleRange.start, visibleRange.end);

    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    visibleBlocks.forEach((block, index) => {
      renderBlock(ctx, block, index * BLOCK_HEIGHT);
    });
  }, [blocks, visibleRange]);

  return <canvas ref={canvasRef} />;
}
```

### 3. Incremental Reconciliation

Rather than diffing the entire content tree on each change, we implemented a targeted update system that only reconciles the affected subtree:

```tsx
function applyDelta(content: ContentTree, delta: Delta): ContentTree {
  const path = delta.path;
  const node = getNodeAtPath(content, path);

  // Clone only the affected branch, not the entire tree
  return updateAtPath(content, path, {
    ...node,
    ...delta.changes,
    version: node.version + 1,
  });
}
```

## Impact

After rolling out to 100% of customers over two weeks:

| Metric | Before | After | Change |
|--------|--------|-------|--------|
| Input latency (p95) | 340ms | 45ms | -87% |
| Re-renders per keystroke | ~2,400 | ~12 | -99.5% |
| Memory growth per hour | 15MB | 2MB | -87% |
| Customer support tickets (editor) | ~40/month | ~5/month | -87% |

The state machine approach also paid dividends in developer velocity — new editor features that used to take 2-3 weeks were shipping in 3-5 days because the state transitions were explicit and testable.

### Key Takeaways

- **Measure first**: The two-week instrumentation spike saved us from guessing. We knew exactly where the bottlenecks were before writing a single line of new code.
- **State machines eliminate entire categories of bugs**: Impossible states, race conditions, and undo/redo edge cases simply don't exist when your state transitions are explicit.
- **Incremental migration is worth the overhead**: Running old and new editors in parallel for two weeks added complexity, but meant zero customer disruption.
