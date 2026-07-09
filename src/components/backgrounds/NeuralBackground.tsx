import { useReducedMotion } from '../../hooks/useReducedMotion';

/**
 * NeuralBackground - AI neural network nodes, connections, floating particles
 * Used behind the Why Choose Us section
 */
function NeuralBackground() {
  const reducedMotion = useReducedMotion();

  // Node positions in pixel coordinates for viewBox 1440x800
  const nodes = [
    { cx: 216, cy: 160, r: 7, delay: 0 },
    { cx: 360, cy: 360, r: 6, delay: 1 },
    { cx: 144, cy: 560, r: 6, delay: 2 },
    { cx: 576, cy: 120, r: 6, delay: 0.5 },
    { cx: 792, cy: 280, r: 7, delay: 1.5 },
    { cx: 1008, cy: 160, r: 7, delay: 0.8 },
    { cx: 1152, cy: 400, r: 6, delay: 2.5 },
    { cx: 1296, cy: 240, r: 6, delay: 1.2 },
    { cx: 1224, cy: 600, r: 6, delay: 3 },
    { cx: 864, cy: 560, r: 7, delay: 1.8 },
    { cx: 504, cy: 640, r: 6, delay: 2.2 },
    { cx: 720, cy: 440, r: 7, delay: 0.3 },
  ];

  // Connections between nodes
  const connections: [number, number][] = [
    [0, 1], [1, 2], [0, 3], [3, 4], [4, 5], [5, 7],
    [4, 11], [11, 9], [9, 10], [7, 8], [6, 8], [5, 6],
    [1, 11], [10, 2], [6, 9],
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 800" preserveAspectRatio="xMidYMid slice">
        <defs>
          <filter id="neural-glow">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Neural connections */}
        {connections.map(([from, to], i) => (
          <line
            key={`conn-${i}`}
            x1={nodes[from]!.cx}
            y1={nodes[from]!.cy}
            x2={nodes[to]!.cx}
            y2={nodes[to]!.cy}
            stroke="rgba(59,130,246,0.18)"
            strokeWidth="2"
            strokeDasharray="6 4"
          >
            {!reducedMotion && (
              <animate
                attributeName="opacity"
                values="0.15;0.27;0.15"
                dur={`${4 + i * 0.3}s`}
                repeatCount="indefinite"
              />
            )}
          </line>
        ))}

        {/* Neural nodes */}
        {nodes.map((node, i) => (
          <circle
            key={`node-${i}`}
            cx={node.cx}
            cy={node.cy}
            r={node.r}
            fill="rgba(59,130,246,0.38)"
            filter="url(#neural-glow)"
          >
            {!reducedMotion && (
              <animate
                attributeName="opacity"
                values="0.3;0.53;0.3"
                dur={`${3 + node.delay}s`}
                repeatCount="indefinite"
              />
            )}
          </circle>
        ))}

        {/* Floating particles - use percentage cx/cy which works for circles */}
        {!reducedMotion && (
          <>
            <circle cx="20%" cy="30%" r="2" fill="rgba(6,182,212,0.22)">
              <animateTransform attributeName="transform" type="translate" values="0,0; 8,12; 0,0" dur="8s" repeatCount="indefinite" />
            </circle>
            <circle cx="65%" cy="25%" r="2" fill="rgba(6,182,212,0.22)">
              <animateTransform attributeName="transform" type="translate" values="0,0; -6,10; 0,0" dur="10s" repeatCount="indefinite" />
            </circle>
            <circle cx="45%" cy="65%" r="2" fill="rgba(6,182,212,0.18)">
              <animateTransform attributeName="transform" type="translate" values="0,0; 10,-8; 0,0" dur="9s" repeatCount="indefinite" />
            </circle>
            <circle cx="75%" cy="60%" r="2" fill="rgba(59,130,246,0.22)">
              <animateTransform attributeName="transform" type="translate" values="0,0; -5,10; 0,0" dur="11s" repeatCount="indefinite" />
            </circle>
          </>
        )}

        {/* Triangular mesh hint */}
        <polygon points="432,80 547,144 317,144" fill="none" stroke="rgba(59,130,246,0.15)" strokeWidth="1.5" />
        <polygon points="1008,640 1123,704 893,704" fill="none" stroke="rgba(59,130,246,0.15)" strokeWidth="1.5" />
      </svg>
    </div>
  );
}

export default NeuralBackground;
