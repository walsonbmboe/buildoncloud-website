/**
 * CircuitBackground - Circuit board traces, connection nodes, and data pulses
 * Used behind the Services section
 */
function CircuitBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 800" preserveAspectRatio="xMidYMid slice">
        <defs>
          <filter id="node-glow">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Left circuit traces */}
        <path d="M 0 160 L 115 160 L 170 200 L 260 200" fill="none" stroke="rgba(59,130,246,0.3)" strokeWidth="2.5" />
        <path d="M 0 320 L 72 320 L 115 280 L 216 280" fill="none" stroke="rgba(59,130,246,0.22)" strokeWidth="2.5" />
        <path d="M 0 520 L 86 520 L 144 560 L 200 560" fill="none" stroke="rgba(59,130,246,0.27)" strokeWidth="2.5" />

        {/* Right circuit traces */}
        <path d="M 1440 240 L 1325 240 L 1267 200 L 1180 200" fill="none" stroke="rgba(59,130,246,0.3)" strokeWidth="2.5" />
        <path d="M 1440 440 L 1354 440 L 1296 480 L 1224 480" fill="none" stroke="rgba(59,130,246,0.22)" strokeWidth="2.5" />
        <path d="M 1440 600 L 1339 600 L 1281 640 L 1210 640" fill="none" stroke="rgba(59,130,246,0.27)" strokeWidth="2.5" />

        {/* Top traces */}
        <path d="M 432 0 L 432 48 L 504 80 L 504 112" fill="none" stroke="rgba(59,130,246,0.22)" strokeWidth="2.5" />
        <path d="M 864 0 L 864 40 L 792 72 L 792 104" fill="none" stroke="rgba(59,130,246,0.27)" strokeWidth="2.5" />

        {/* Connection nodes - VISIBLE */}
        <circle cx="260" cy="200" r="7" fill="rgba(59,130,246,0.38)" filter="url(#node-glow)">
          <animate attributeName="opacity" values="0.3;0.53;0.3" dur="4s" repeatCount="indefinite" />
        </circle>
        <circle cx="216" cy="280" r="6" fill="rgba(59,130,246,0.3)" filter="url(#node-glow)">
          <animate attributeName="opacity" values="0.22;0.45;0.22" dur="5s" repeatCount="indefinite" />
        </circle>
        <circle cx="1180" cy="200" r="7" fill="rgba(59,130,246,0.38)" filter="url(#node-glow)">
          <animate attributeName="opacity" values="0.3;0.53;0.3" dur="4.5s" repeatCount="indefinite" />
        </circle>
        <circle cx="1224" cy="480" r="6" fill="rgba(59,130,246,0.3)" filter="url(#node-glow)">
          <animate attributeName="opacity" values="0.22;0.45;0.22" dur="5.5s" repeatCount="indefinite" />
        </circle>
        <circle cx="200" cy="560" r="6" fill="rgba(59,130,246,0.3)">
          <animate attributeName="opacity" values="0.22;0.42;0.22" dur="6s" repeatCount="indefinite" />
        </circle>
        <circle cx="504" cy="112" r="6" fill="rgba(59,130,246,0.33)">
          <animate attributeName="opacity" values="0.27;0.45;0.27" dur="4s" repeatCount="indefinite" />
        </circle>

        {/* Animated data pulse */}
        <circle r="5" fill="rgba(59,130,246,0.75)">
          <animateMotion dur="4s" repeatCount="indefinite" path="M 0,160 L 115,160 L 170,200 L 260,200" />
          <animate attributeName="opacity" values="0;0.75;0.75;0" dur="4s" repeatCount="indefinite" />
        </circle>
        <circle r="5" fill="rgba(59,130,246,0.75)">
          <animateMotion dur="5s" repeatCount="indefinite" path="M 1440,240 L 1325,240 L 1267,200 L 1180,200" />
          <animate attributeName="opacity" values="0;0.75;0.75;0" dur="5s" repeatCount="indefinite" />
        </circle>

        {/* Hexagonal hints */}
        <polygon points="1270,65 1310,45 1350,65 1350,100 1310,120 1270,100" fill="none" stroke="rgba(59,130,246,0.18)" strokeWidth="1.5" />
        <polygon points="1230,100 1270,80 1310,100 1310,135 1270,155 1230,135" fill="none" stroke="rgba(59,130,246,0.15)" strokeWidth="1.5" />
      </svg>
    </div>
  );
}

export default CircuitBackground;
