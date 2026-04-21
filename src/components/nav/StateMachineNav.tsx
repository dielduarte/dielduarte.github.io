import { useEffect, useMemo, useState } from 'react';
import { useMachine } from '@xstate/react';
import {
  navMachine,
  pathToState,
  langFromPath,
  eventForState,
  visibleNodes,
  EDGES,
  type NavNode,
  type NavStateId,
  type Lang,
} from './navMachine';
import './StateMachineNav.css';

const NODES = visibleNodes;

interface Props {
  initialState?: NavStateId;
  initialLang?: Lang;
}

export default function StateMachineNav({
  initialState,
  initialLang = 'en',
}: Props) {
  const [state, send] = useMachine(navMachine);
  const [hoverId, setHoverId] = useState<NavStateId | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const lang = langFromPath(window.location.pathname);
    send({ type: 'SET_LANG', lang });

    const detected = initialState ?? pathToState(window.location.pathname);
    if (detected !== state.value) {
      send({ type: eventForState(detected) } as any);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const currentId = state.value as NavStateId;
  const lang = state.context.lang || initialLang;

  const nodeById = useMemo(() => {
    const m = new Map<NavStateId, NavNode>();
    for (const n of NODES) m.set(n.id, n);
    return m;
  }, []);

  const litEdges = useMemo(() => {
    if (!hoverId || hoverId === currentId) return new Set<string>();
    const node = nodeById.get(hoverId);
    if (!node || !node.href) return new Set<string>();
    return new Set([edgeKey(currentId, hoverId)]);
  }, [hoverId, currentId, nodeById]);

  const edgePaths = useMemo(() => {
    const paths: Array<{ key: string; d: string; from: NavStateId; to: NavStateId }> = [];
    const seen = new Set<string>();
    for (const [a, b] of EDGES) {
      const k = edgeKey(a, b);
      if (seen.has(k)) continue;
      seen.add(k);
      const na = nodeById.get(a)!;
      const nb = nodeById.get(b)!;
      paths.push({ key: k, d: edgePath(na, nb), from: a, to: b });
    }
    if (hoverId && hoverId !== currentId) {
      const k = edgeKey(currentId, hoverId);
      if (!seen.has(k)) {
        const na = nodeById.get(currentId)!;
        const nb = nodeById.get(hoverId)!;
        paths.push({ key: k, d: edgePath(na, nb), from: currentId, to: hoverId });
      }
    }
    return paths;
  }, [hoverId, currentId, nodeById]);

  return (
    <nav className="smn" aria-label="Site navigation">
      <span className="sr-only">
        Interactive state-machine diagram. The lit node is the current page.
        Tab between reachable states; press Enter to navigate.
      </span>

      <svg viewBox="0 0 480 400" focusable="false">
        <g aria-hidden="true">
          {edgePaths.map((p) => (
            <path
              key={p.key}
              className={`edge${litEdges.has(p.key) ? ' lit' : ''}`}
              d={p.d}
            />
          ))}
        </g>

        {NODES.map((node) => {
          const isActive = node.id === currentId;
          const isReachable = node.href !== null && !isActive;
          const disabled = node.href === null;
          const groupClass = [
            'node',
            isActive ? 'active' : '',
            isReachable ? 'reachable' : '',
            disabled ? 'disabled' : '',
          ]
            .filter(Boolean)
            .join(' ');

          const inner = (
            <>
              <circle cx={node.x} cy={node.y} r={28} />
              <text x={node.x} y={node.y + 4} textAnchor="middle">
                {node.label}
              </text>
            </>
          );

          if (isReachable && node.href) {
            const href = node.href[lang] ?? node.href.en;
            return (
              <a
                key={node.id}
                className={`node-link n-${node.id}`}
                href={href}
                aria-label={`go to ${node.label}`}
                onMouseEnter={() => setHoverId(node.id)}
                onMouseLeave={() =>
                  setHoverId((h) => (h === node.id ? null : h))
                }
                onFocus={() => setHoverId(node.id)}
                onBlur={() => setHoverId((h) => (h === node.id ? null : h))}
              >
                <circle
                  className="hit"
                  cx={node.x}
                  cy={node.y}
                  r={44}
                />
                <g
                  className={groupClass}
                  style={{ transformOrigin: `${node.x}px ${node.y}px` }}
                >
                  {inner}
                </g>
              </a>
            );
          }

          return (
            <g
              key={node.id}
              className={`${groupClass} n-${node.id}`}
              role="img"
              aria-label={
                disabled
                  ? `${node.label} — future state, unreachable`
                  : `${node.label} — current state`
              }
              aria-disabled={disabled || undefined}
              aria-current={isActive ? 'page' : undefined}
              style={{ transformOrigin: `${node.x}px ${node.y}px` }}
            >
              {inner}
            </g>
          );
        })}
      </svg>

      <div className="hint" aria-hidden="true">
        <span>
          <span className="dot" /> current state
        </span>
        <span>
          <span className="dot muted" /> edge — hover to light
        </span>
        <span className="kb-hint">
          <kbd>Tab</kbd> + <kbd>Enter</kbd> to navigate
        </span>
      </div>
    </nav>
  );
}

function edgeKey(a: NavStateId, b: NavStateId) {
  return a < b ? `${a}→${b}` : `${b}→${a}`;
}

const NODE_R = 28;
const EDGE_GAP = 4;

function edgePath(a: NavNode, b: NavNode) {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const len = Math.hypot(dx, dy) || 1;
  const ux = dx / len;
  const uy = dy / len;
  const pad = NODE_R + EDGE_GAP;
  const x1 = a.x + ux * pad;
  const y1 = a.y + uy * pad;
  const x2 = b.x - ux * pad;
  const y2 = b.y - uy * pad;
  return `M ${x1} ${y1} L ${x2} ${y2}`;
}
