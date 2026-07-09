import { useReducedMotion } from '../../hooks/useReducedMotion';

/**
 * GrowthBackground - Upward-flowing lines, layered geometric patterns
 * Used behind the About page content
 */
function GrowthBackground() {
  const reducedMotion = useReducedMotion();

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 800" preserveAspectRatio="xMidYMid slice">
        {/* Upward-flowing directional lines */}
        <line x1="216" y1="800" x2="288" y2="0" stroke="rgba(59,130,246,0.18)" strokeWidth="2.5" />
        <line x1="504" y1="800" x2="547" y2="0" stroke="rgba(59,130,246,0.15)" strokeWidth="2.5" />
        <line x1="792" y1="800" x2="749" y2="0" stroke="rgba(59,130,246,0.18)" strokeWidth="2.5" />
        <line x1="1080" y1="800" x2="1037" y2="0" stroke="rgba(59,130,246,0.15)" strokeWidth="2.5" />
        <line x1="1296" y1="800" x2="1267" y2="0" stroke="rgba(59,130,246,0.18)" strokeWidth="2.5" />

        {/* Layered geometric brackets / architectural elements */}
        <rect x="72" y="160" width="173" height="120" rx="3" fill="none" stroke="rgba(59,130,246,0.15)" strokeWidth="1.8" />
        <rect x="1195" y="440" width="144" height="96" rx="3" fill="none" stroke="rgba(59,130,246,0.15)" strokeWidth="1.8" />

        {/* Growth arrows / chevrons - left side */}
        <polyline points="144,640 187,600 230,640" fill="none" stroke="rgba(59,130,246,0.3)" strokeWidth="3">
          {!reducedMotion && (
            <animate attributeName="opacity" values="0.22;0.38;0.22" dur="4s" repeatCount="indefinite" />
          )}
        </polyline>
        <polyline points="144,600 187,560 230,600" fill="none" stroke="rgba(59,130,246,0.27)" strokeWidth="3">
          {!reducedMotion && (
            <animate attributeName="opacity" values="0.18;0.33;0.18" dur="4s" begin="0.5s" repeatCount="indefinite" />
          )}
        </polyline>
        <polyline points="144,560 187,520 230,560" fill="none" stroke="rgba(59,130,246,0.22)" strokeWidth="3">
          {!reducedMotion && (
            <animate attributeName="opacity" values="0.15;0.3;0.15" dur="4s" begin="1s" repeatCount="indefinite" />
          )}
        </polyline>

        {/* Right side growth chevrons */}
        <polyline points="1210,480 1253,440 1296,480" fill="none" stroke="rgba(59,130,246,0.3)" strokeWidth="3">
          {!reducedMotion && (
            <animate attributeName="opacity" values="0.22;0.38;0.22" dur="5s" repeatCount="indefinite" />
          )}
        </polyline>
        <polyline points="1210,440 1253,400 1296,440" fill="none" stroke="rgba(59,130,246,0.27)" strokeWidth="3">
          {!reducedMotion && (
            <animate attributeName="opacity" values="0.18;0.33;0.18" dur="5s" begin="0.7s" repeatCount="indefinite" />
          )}
        </polyline>

        {/* Blueprint-style grid dots */}
        {Array.from({ length: 8 }).map((_, row) =>
          Array.from({ length: 5 }).map((_, col) => (
            <circle
              key={`bp-${row}-${col}`}
              cx={360 + col * 173}
              cy={120 + row * 80}
              r="2.5"
              fill="rgba(59,130,246,0.18)"
            />
          ))
        )}
      </svg>
    </div>
  );
}

export default GrowthBackground;
