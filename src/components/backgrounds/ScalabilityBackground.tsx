import { useReducedMotion } from '../../hooks/useReducedMotion';

/**
 * ScalabilityBackground - Rising pathways, growth charts, layered grids
 * Used behind the Pricing page content
 */
function ScalabilityBackground() {
  const reducedMotion = useReducedMotion();

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 800" preserveAspectRatio="xMidYMid slice">
        {/* Abstract rising growth chart - left side */}
        <path d="M 72 680 L 173 560 L 259 576 L 360 440 L 461 400 L 547 280" fill="none" stroke="rgba(59,130,246,0.3)" strokeWidth="3">
          {!reducedMotion && (
            <animate attributeName="opacity" values="0.22;0.38;0.22" dur="6s" repeatCount="indefinite" />
          )}
        </path>
        {/* Chart area fill */}
        <path d="M 72 680 L 173 560 L 259 576 L 360 440 L 461 400 L 547 280 L 547 680 Z" fill="rgba(59,130,246,0.09)" />

        {/* Second growth line - right side */}
        <path d="M 893 640 L 979 544 L 1066 520 L 1152 400 L 1238 336 L 1325 240" fill="none" stroke="rgba(6,182,212,0.27)" strokeWidth="3">
          {!reducedMotion && (
            <animate attributeName="opacity" values="0.18;0.33;0.18" dur="7s" repeatCount="indefinite" />
          )}
        </path>
        <path d="M 893 640 L 979 544 L 1066 520 L 1152 400 L 1238 336 L 1325 240 L 1325 640 Z" fill="rgba(6,182,212,0.08)" />

        {/* Horizontal grid layers */}
        <line x1="72" y1="240" x2="1368" y2="240" stroke="rgba(59,130,246,0.12)" strokeWidth="1.5" strokeDasharray="8 8" />
        <line x1="72" y1="400" x2="1368" y2="400" stroke="rgba(59,130,246,0.12)" strokeWidth="1.5" strokeDasharray="8 8" />
        <line x1="72" y1="560" x2="1368" y2="560" stroke="rgba(59,130,246,0.12)" strokeWidth="1.5" strokeDasharray="8 8" />

        {/* Rising digital pathway dots */}
        {[
          { x: 288, y: 600 }, { x: 360, y: 480 }, { x: 432, y: 416 },
          { x: 504, y: 320 }, { x: 576, y: 256 },
          { x: 1008, y: 560 }, { x: 1080, y: 464 }, { x: 1152, y: 384 },
          { x: 1224, y: 304 }, { x: 1296, y: 224 },
        ].map((dot, i) => (
          <circle
            key={`scale-${i}`}
            cx={dot.x}
            cy={dot.y}
            r="5"
            fill={i < 5 ? 'rgba(59,130,246,0.3)' : 'rgba(6,182,212,0.27)'}
          >
            {!reducedMotion && (
              <animate attributeName="r" values="4;6;4" dur={`${3 + i * 0.3}s`} repeatCount="indefinite" />
            )}
          </circle>
        ))}
      </svg>
    </div>
  );
}

export default ScalabilityBackground;
