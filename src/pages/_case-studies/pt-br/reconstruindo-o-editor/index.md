---
layout: '../../../../layouts/CaseStudy.astro'
title: "Reconstruindo o Editor — De Lento para Relâmpago"
company: "Appcues"
date: "2024-06-15"
description: "Como reconstruímos um editor WYSIWYG do zero, reduzindo tempos de renderização em 60% e uso de memória em 40% através de mudanças arquiteturais e UI orientada por máquinas de estado."
languageKey: "pt-br"
languageLink: "/case-studies/en/rebuilding-the-editor"
slug: "pt-br/reconstruindo-o-editor"
socialImage: "images/diel.jpeg"
techStack: ["React", "TypeScript", "XState", "Canvas API"]
role: "Principal Engineer"
duration: "4 meses"
impact: "60% mais rápido, 40% menos memória"
---

## O Problema

Nosso editor WYSIWYG era o coração do produto — todos os clientes o usavam diariamente para construir experiências in-app. Mas à medida que funcionalidades se acumularam ao longo de três anos, o editor ficou dolorosamente lento. Clientes com fluxos complexos experimentavam lag perceptível na digitação, e nosso time de suporte recebia reclamações semanalmente.

As causas raiz eram profundamente arquiteturais:

- **Re-renders descontrolados**: Cada tecla disparava uma reconciliação completa em centenas de componentes
- **Estado monolítico**: Uma única store Redux continha tudo — estado de seleção, conteúdo, estado da toolbar, histórico de undo — causando atualizações em cascata
- **Vazamentos de memória**: Nós DOM desvinculados de operações drag-and-drop se acumulavam durante sessões de edição

## Contexto

Antes de mergulhar em uma reescrita, precisávamos validar o escopo. Liderei um spike de duas semanas para instrumentar o editor existente e quantificar o problema:

- **Latência de input**: p95 era 340ms em fluxos complexos (meta: < 50ms)
- **Crescimento de memória**: 15MB de aumento por hora de edição ativa
- **Contagem de re-renders**: ~2.400 re-renders de componentes por tecla

O time havia considerado correções incrementais, mas o profiling mostrou que a arquitetura em si era o gargalo — patches não fechariam a lacuna.

### Restrições

- Zero downtime para clientes existentes durante a migração
- Compatibilidade total com dados de fluxos salvos
- Entregar dentro de um trimestre (o time era de 3 engenheiros)

## Solução

Reconstruímos o core do editor usando uma arquitetura em camadas com clara separação de responsabilidades:

### 1. UI Orientada por Máquina de Estados

Em vez de gerenciamento de estado ad-hoc, modelamos todo o ciclo de vida do editor como uma máquina de estados usando XState:

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

Isso nos deu transições de estado previsíveis, eliminou estados impossíveis e tornou o sistema de undo/redo trivial de implementar corretamente.

### 2. Camada de Renderização Virtualizada

Substituímos a abordagem pesada de DOM por uma camada de canvas virtualizada para o viewport do conteúdo:

```tsx
function EditorViewport({ blocks, visibleRange }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const ctx = canvasRef.current?.getContext('2d');
    if (!ctx) return;

    // Renderiza apenas blocos dentro do range visível
    const visibleBlocks = blocks.slice(visibleRange.start, visibleRange.end);

    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    visibleBlocks.forEach((block, index) => {
      renderBlock(ctx, block, index * BLOCK_HEIGHT);
    });
  }, [blocks, visibleRange]);

  return <canvas ref={canvasRef} />;
}
```

### 3. Reconciliação Incremental

Em vez de fazer diff de toda a árvore de conteúdo a cada mudança, implementamos um sistema de atualização direcionada que reconcilia apenas a subárvore afetada:

```tsx
function applyDelta(content: ContentTree, delta: Delta): ContentTree {
  const path = delta.path;
  const node = getNodeAtPath(content, path);

  // Clona apenas o branch afetado, não a árvore inteira
  return updateAtPath(content, path, {
    ...node,
    ...delta.changes,
    version: node.version + 1,
  });
}
```

## Impacto

Após o rollout para 100% dos clientes em duas semanas:

| Métrica | Antes | Depois | Mudança |
|---------|-------|--------|---------|
| Latência de input (p95) | 340ms | 45ms | -87% |
| Re-renders por tecla | ~2.400 | ~12 | -99,5% |
| Crescimento de memória por hora | 15MB | 2MB | -87% |
| Tickets de suporte (editor) | ~40/mês | ~5/mês | -87% |

A abordagem com máquina de estados também trouxe dividendos na velocidade de desenvolvimento — novas features do editor que costumavam levar 2-3 semanas passaram a ser entregues em 3-5 dias porque as transições de estado eram explícitas e testáveis.

### Principais Aprendizados

- **Meça primeiro**: O spike de instrumentação de duas semanas nos salvou de adivinhar. Sabíamos exatamente onde estavam os gargalos antes de escrever uma única linha de código novo.
- **Máquinas de estado eliminam categorias inteiras de bugs**: Estados impossíveis, race conditions e edge cases de undo/redo simplesmente não existem quando suas transições de estado são explícitas.
- **Migração incremental vale o overhead**: Rodar editores antigo e novo em paralelo por duas semanas adicionou complexidade, mas significou zero interrupção para os clientes.
