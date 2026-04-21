import { useMemo } from 'react';
import {
  ReactFlow,
  Background,
  BackgroundVariant,
  Controls,
  MiniMap,
  type Node,
  type NodeProps,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import './TimelineFlow.css';

export interface TimelinePost {
  title: string;
  description: string;
  date: string;
  slug: string;
}

interface Props {
  posts: TimelinePost[];
}

const CANVAS_W = 2400;
const PAD = 160;
const HIT = 28;
const AXIS_OFFSET_Y = 0;

type PointData = {
  title: string;
  description: string;
  slug: string;
  stateId: string;
  dateLabel: string;
  above: boolean;
};

function AxisNode({ data }: NodeProps) {
  const d = data as { width: number };
  return <div className="tf-axis" style={{ width: d.width }} />;
}

function YearNode({ data }: NodeProps) {
  const d = data as { label: string };
  return (
    <div className="tf-year">
      <span className="tf-year-line" aria-hidden="true"></span>
      <span className="tf-year-label">{d.label}</span>
    </div>
  );
}

function PointNode({ data }: NodeProps) {
  const d = data as PointData;
  return (
    <a
      className={`tf-point tf-point-${d.above ? 'above' : 'below'}`}
      href={`/blog/${d.slug}/`}
      aria-label={`${d.title} — ${d.dateLabel}`}
    >
      <span className="tf-point-hit" aria-hidden="true"></span>
      <span className="tf-point-dot" aria-hidden="true"></span>
      <div className="tf-point-tip">
        <div className="tf-point-tip-meta">
          <span className="tf-point-tip-id">{d.stateId}</span>
          <span className="tf-point-tip-sep" aria-hidden="true">·</span>
          <time>{d.dateLabel}</time>
        </div>
        <div className="tf-point-tip-title">{d.title}</div>
        <div className="tf-point-tip-cta">enter →</div>
      </div>
    </a>
  );
}

const nodeTypes = {
  axis: AxisNode,
  year: YearNode,
  point: PointNode,
};

function dateLabel(d: Date) {
  return d.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export default function TimelineFlow({ posts }: Props) {
  const nodes = useMemo<Node[]>(() => {
    const asc = [...posts].sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );
    const total = asc.length;
    const dates = asc.map((p) => new Date(p.date).getTime());
    const minD = Math.min(...dates);
    const maxD = Math.max(...dates);
    const range = Math.max(maxD - minD, 1);

    const xForMs = (ms: number) =>
      PAD + ((ms - minD) / range) * (CANVAS_W - 2 * PAD);

    // 1. Axis line node — thin horizontal rule behind everything
    const axis: Node = {
      id: 'axis',
      type: 'axis',
      position: { x: PAD - 40, y: AXIS_OFFSET_Y - 0.5 },
      data: { width: CANVAS_W - 2 * PAD + 80 },
      draggable: false,
      selectable: false,
      connectable: false,
      focusable: false,
    };

    // 2. Year tick nodes — below the axis
    const years = Array.from(
      new Set(asc.map((p) => new Date(p.date).getFullYear()))
    ).sort((a, b) => a - b);
    const tickNodes: Node[] = years.map((y) => {
      const cx = xForMs(new Date(`${y}-06-15`).getTime());
      return {
        id: `year-${y}`,
        type: 'year',
        position: { x: cx - 24, y: AXIS_OFFSET_Y + 6 },
        data: { label: String(y) },
        draggable: false,
        selectable: false,
        connectable: false,
        focusable: false,
      };
    });

    // 3. Point nodes — dots on the axis, alternating tooltip direction
    const pointNodes: Node[] = asc.map((p, i) => {
      const stateIdx = total - i; // newest = s_01
      const d = new Date(p.date);
      return {
        id: `post-${p.slug}`,
        type: 'point',
        position: {
          x: xForMs(dates[i]) - HIT / 2,
          y: AXIS_OFFSET_Y - HIT / 2,
        },
        data: {
          title: p.title,
          description: p.description,
          slug: p.slug,
          stateId: `s_${String(stateIdx).padStart(2, '0')}`,
          dateLabel: dateLabel(d),
          above: i % 2 === 0,
        },
        draggable: false,
        selectable: false,
        connectable: false,
      };
    });

    return [axis, ...tickNodes, ...pointNodes];
  }, [posts]);

  return (
    <div className="tf-wrap">
      <ReactFlow
        nodes={nodes}
        edges={[]}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={{ padding: 0.35, maxZoom: 1.2 }}
        minZoom={0.4}
        maxZoom={4}
        nodesDraggable={false}
        nodesConnectable={false}
        elementsSelectable={false}
        zoomOnScroll
        zoomOnPinch
        panOnDrag
        zoomOnDoubleClick={false}
        colorMode="dark"
        proOptions={{ hideAttribution: true }}
      >
        <Background
          variant={BackgroundVariant.Dots}
          gap={32}
          size={1}
          color="rgba(138, 138, 138, 0.12)"
        />
        <Controls
          position="bottom-right"
          showInteractive={false}
          className="tf-controls"
        />
        <MiniMap
          position="top-right"
          className="tf-minimap"
          nodeColor={(n) => (n.type === 'point' ? '#3B82F6' : 'transparent')}
          nodeStrokeColor={() => 'transparent'}
          maskColor="rgba(10, 10, 10, 0.55)"
          pannable
          zoomable
        />
      </ReactFlow>
      <p className="tf-hint">
        <kbd>scroll</kbd> to zoom · <kbd>drag</kbd> to pan · hover a point to reveal
      </p>
    </div>
  );
}
