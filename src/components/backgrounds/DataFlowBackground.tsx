import { useReducedMotion } from '../../hooks/useReducedMotion';

/**
 * DataFlowBackground - Floating data particles, mesh, flowing streams
 * Used behind the Portfolio section
 */
function DataFlowBackground() {
  const reducedMotion = useReducedMotion();

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {/* Soft gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-transparent to-cyan-50/30" />

      <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 800" preserveAspectRatio="xMidYMid slice">
        {/* Flowing data streams */}
        <path d="M -50 240 Q 360 160, 720 280 T 1490 200" fill="none" stroke="rgba(59,130,246,0.27)" strokeWidth="3">
          {!reducedMotion && (
            <animate attributeName="d"
              values="M -50 240 Q 360 160, 720 280 T 1490 200;M -50 240 Q 360 280, 720 200 T 1490 240;M -50 240 Q 360 160, 720 280 T 1490 200"
              dur="12s" repeatCount="indefinite" />
          )}
        </path>
        <path d="M -50 520 Q 432 440, 792 560 T 1490 480" fill="none" stroke="rgba(6,182,212,0.22)" strokeWidth="3">
          {!reducedMotion && (
            <animate attributeName="d"
              values="M -50 520 Q 432 440, 792 560 T 1490 480;M -50 520 Q 432 560, 792 464 T 1490 520;M -50 520 Q 432 440, 792 560 T 1490 480"
              dur="14s" repeatCount="indefinite" />
          )}
        </path>
        <path d="M -50 680 Q 504 640, 864 720 T 1490 656" fill="none" stroke="rgba(59,130,246,0.22)" strokeWidth="3">
          {!reducedMotion && (
            <animate attributeName="d"
              values="M -50 680 Q 504 640, 864 720 T 1490 656;M -50 680 Q 504 720, 864 640 T 1490 696;M -50 680 Q 504 640, 864 720 T 1490 656"
              dur="16s" repeatCount="indefinite" />
          )}
        </path>

        {/* Data point cloud */}
        {[
          { x: 173, y: 200 }, { x: 317, y: 320 }, { x: 259, y: 480 },
          { x: 504, y: 160 }, { x: 605, y: 400 }, { x: 547, y: 600 },
          { x: 792, y: 240 }, { x: 893, y: 440 }, { x: 835, y: 640 },
          { x: 1080, y: 176 }, { x: 1181, y: 360 }, { x: 1123, y: 544 },
          { x: 1267, y: 280 }, { x: 1325, y: 576 }, { x: 691, y: 120 },
        ].map((point, i) => (
          <circle
            key={`data-${i}`}
            cx={point.x}
            cy={point.y}
            r={4.5 + (i % 3)}
            fill={i % 2 === 0 ? 'rgba(59,130,246,0.27)' : 'rgba(6,182,212,0.22)'}
          >
            {!reducedMotion && (
              <animate
                attributeName="opacity"
                values="0.18;0.33;0.18"
                dur={`${5 + i * 0.5}s`}
                repeatCount="indefinite"
              />
            )}
          </circle>
        ))}

        {/* Wireframe shape hint - bottom right */}
        <path d="M 1152 600 L 1224 560 L 1325 584 L 1296 640 L 1195 656 Z" fill="none" stroke="rgba(59,130,246,0.18)" strokeWidth="1.8" />
        <path d="M 1224 560 L 1267 520 L 1368 544 L 1325 584" fill="none" stroke="rgba(59,130,246,0.15)" strokeWidth="1.5" />
      </svg>
    </div>
  );
}

export default DataFlowBackground;
