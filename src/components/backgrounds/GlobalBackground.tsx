import { useReducedMotion } from '../../hooks/useReducedMotion';

/**
 * GlobalBackground - Dotted world map outline, connection paths, radar ripples
 * Used behind the Contact page content
 */
function GlobalBackground() {
  const reducedMotion = useReducedMotion();

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 800" preserveAspectRatio="xMidYMid slice">
        <defs>
          <filter id="radar-glow">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Simplified world map dots - rough continental outlines */}
        {/* Europe */}
        {[[680,180],[700,170],[720,175],[740,185],[710,195],[690,200],[670,195],[720,200],[740,210]].map(([x,y], i) => (
          <circle key={`eu-${i}`} cx={x} cy={y} r="4" fill="rgba(59,130,246,0.21)" />
        ))}
        {/* Africa */}
        {[[690,260],[700,280],[710,300],[700,320],[690,340],[680,320],[670,300],[680,280],[695,250]].map(([x,y], i) => (
          <circle key={`af-${i}`} cx={x} cy={y} r="4" fill="rgba(59,130,246,0.21)" />
        ))}
        {/* North America */}
        {[[350,200],[370,190],[390,195],[410,210],[380,220],[360,230],[340,220],[330,210],[400,185]].map(([x,y], i) => (
          <circle key={`na-${i}`} cx={x} cy={y} r="4" fill="rgba(59,130,246,0.18)" />
        ))}
        {/* Asia */}
        {[[850,200],[880,190],[910,195],[940,210],[920,220],[890,230],[860,220],[950,230],[970,220]].map(([x,y], i) => (
          <circle key={`as-${i}`} cx={x} cy={y} r="4" fill="rgba(59,130,246,0.18)" />
        ))}

        {/* Major connection points (cities) with glow */}
        {/* London */}
        <circle cx="690" cy="185" r="9" fill="rgba(59,130,246,0.45)" filter="url(#radar-glow)">
          {!reducedMotion && (
            <animate attributeName="r" values="7;10;7" dur="3s" repeatCount="indefinite" />
          )}
        </circle>
        {/* New York */}
        <circle cx="380" cy="210" r="8" fill="rgba(6,182,212,0.38)" filter="url(#radar-glow)">
          {!reducedMotion && (
            <animate attributeName="r" values="6;9;6" dur="4s" repeatCount="indefinite" />
          )}
        </circle>
        {/* Lagos */}
        <circle cx="680" cy="310" r="8" fill="rgba(59,130,246,0.38)" filter="url(#radar-glow)">
          {!reducedMotion && (
            <animate attributeName="r" values="6;9;6" dur="3.5s" repeatCount="indefinite" />
          )}
        </circle>
        {/* Singapore */}
        <circle cx="920" cy="320" r="7" fill="rgba(6,182,212,0.33)" filter="url(#radar-glow)">
          {!reducedMotion && (
            <animate attributeName="r" values="5;8;5" dur="4.5s" repeatCount="indefinite" />
          )}
        </circle>

        {/* Curved connection paths between cities */}
        <path d="M 690 185 Q 550 120, 380 210" fill="none" stroke="rgba(59,130,246,0.22)" strokeWidth="2" strokeDasharray="6 4">
          {!reducedMotion && (
            <animate attributeName="strokeDashoffset" values="0;-20" dur="3s" repeatCount="indefinite" />
          )}
        </path>
        <path d="M 690 185 Q 685 250, 680 310" fill="none" stroke="rgba(59,130,246,0.22)" strokeWidth="2" strokeDasharray="6 4">
          {!reducedMotion && (
            <animate attributeName="strokeDashoffset" values="0;-20" dur="4s" repeatCount="indefinite" />
          )}
        </path>
        <path d="M 690 185 Q 800 180, 920 320" fill="none" stroke="rgba(6,182,212,0.18)" strokeWidth="2" strokeDasharray="6 4">
          {!reducedMotion && (
            <animate attributeName="strokeDashoffset" values="0;-20" dur="5s" repeatCount="indefinite" />
          )}
        </path>
        <path d="M 380 210 Q 530 270, 680 310" fill="none" stroke="rgba(59,130,246,0.18)" strokeWidth="2" strokeDasharray="6 4">
          {!reducedMotion && (
            <animate attributeName="strokeDashoffset" values="0;-20" dur="4.5s" repeatCount="indefinite" />
          )}
        </path>

        {/* Radar ripple at London */}
        {!reducedMotion && (
          <>
            <circle cx="690" cy="185" r="15" fill="none" stroke="rgba(59,130,246,0.3)" strokeWidth="1.5">
              <animate attributeName="r" values="8;40;8" dur="5s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.3;0;0.3" dur="5s" repeatCount="indefinite" />
            </circle>
            <circle cx="690" cy="185" r="15" fill="none" stroke="rgba(59,130,246,0.22)" strokeWidth="1.5">
              <animate attributeName="r" values="8;55;8" dur="5s" begin="1s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.22;0;0.22" dur="5s" begin="1s" repeatCount="indefinite" />
            </circle>
          </>
        )}
      </svg>
    </div>
  );
}

export default GlobalBackground;
