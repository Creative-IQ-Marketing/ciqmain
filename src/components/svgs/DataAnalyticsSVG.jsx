const DataAnalyticsSVG = ({ className = "w-full h-full" }) => {
  return (
    <svg
      viewBox="0 0 400 300"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="hero-orbit-blue" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#0EA5E9" />
          <stop offset="50%" stopColor="#2563EB" />
          <stop offset="100%" stopColor="#38BDF8" />
        </linearGradient>
        <linearGradient id="hero-orbit-red" x1="1" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#F97373" />
          <stop offset="50%" stopColor="#EF4444" />
          <stop offset="100%" stopColor="#B91C1C" />
        </linearGradient>
        <linearGradient id="hero-orbit-yellow" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0%" stopColor="#FACC15" />
          <stop offset="50%" stopColor="#EAB308" />
          <stop offset="100%" stopColor="#CA8A04" />
        </linearGradient>
        <radialGradient
          id="hero-glow"
          cx="0.5"
          cy="0.4"
          r="0.8"
          fx="0.5"
          fy="0.4"
        >
          <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.9" />
          <stop offset="40%" stopColor="#2563EB" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#0F172A" stopOpacity="0" />
        </radialGradient>
        <filter id="hero-blur">
          <feGaussianBlur in="SourceGraphic" stdDeviation="18" />
        </filter>
        <filter id="hero-soft-shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow
            dx="0"
            dy="18"
            stdDeviation="24"
            floodColor="#0F172A"
            floodOpacity="0.35"
          />
        </filter>
        <linearGradient id="hero-grid-line" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#0EA5E9" stopOpacity="0.1" />
          <stop offset="50%" stopColor="#38BDF8" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#0EA5E9" stopOpacity="0.1" />
        </linearGradient>
      </defs>

      <circle cx="200" cy="150" r="140" fill="url(#hero-glow)" filter="url(#hero-blur)" />
      <circle
        cx="110"
        cy="80"
        r="60"
        fill="url(#hero-orbit-blue)"
        opacity="0.25"
      />
      <circle
        cx="290"
        cy="90"
        r="50"
        fill="url(#hero-orbit-red)"
        opacity="0.3"
      />
      <circle
        cx="320"
        cy="200"
        r="40"
        fill="url(#hero-orbit-yellow)"
        opacity="0.28"
      />
      <circle cx="80" cy="210" r="38" fill="#0F172A" opacity="0.5" />

      <g filter="url(#hero-soft-shadow)">
        <rect
          x="70"
          y="70"
          width="260"
          height="180"
          rx="24"
          fill="#020617"
        />
        <rect
          x="80"
          y="80"
          width="240"
          height="160"
          rx="20"
          fill="#020617"
          stroke="#1E293B"
          strokeWidth="1.5"
        />
      </g>

      <g opacity="0.6">
        {[0, 1, 2, 3, 4].map((i) => (
          <line
            key={`v-${i}`}
            x1={100 + i * 50}
            y1="100"
            x2={100 + i * 50}
            y2="220"
            stroke="url(#hero-grid-line)"
            strokeWidth="1"
          />
        ))}
        {[0, 1, 2, 3].map((i) => (
          <line
            key={`h-${i}`}
            x1="100"
            y1={120 + i * 25}
            x2="300"
            y2={120 + i * 25}
            stroke="url(#hero-grid-line)"
            strokeWidth="1"
          />
        ))}
      </g>

      <path
        d="M 105 210 C 135 200, 150 165, 180 150 C 205 138, 225 135, 250 128 C 275 120, 292 110, 298 104"
        stroke="#38BDF8"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M 105 210 C 135 190, 155 175, 190 162 C 220 150, 245 145, 280 138"
        stroke="#FACC15"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        strokeDasharray="6 10"
      />

      <circle cx="105" cy="210" r="5" fill="#38BDF8" />
      <circle cx="150" cy="180" r="5" fill="#38BDF8" />
      <circle cx="190" cy="162" r="5" fill="#38BDF8" />
      <circle cx="230" cy="140" r="5" fill="#38BDF8" />
      <circle cx="280" cy="128" r="5" fill="#38BDF8" />

      <circle cx="150" cy="180" r="8" fill="#0F172A" stroke="#38BDF8" />
      <circle cx="230" cy="140" r="8" fill="#0F172A" stroke="#FACC15" />

      <g transform="translate(105, 115)">
        <rect
          width="56"
          height="22"
          rx="11"
          fill="#0B1120"
          stroke="#38BDF8"
          strokeWidth="1"
        />
        <circle cx="13" cy="11" r="4" fill="#22C55E" />
        <circle cx="26" cy="11" r="4" fill="#FACC15" />
        <circle cx="39" cy="11" r="4" fill="#38BDF8" />
      </g>

      <g transform="translate(230, 185)">
        <rect
          width="80"
          height="42"
          rx="10"
          fill="#020617"
          stroke="#1D4ED8"
          strokeWidth="1.5"
        />
        <text
          x="12"
          y="15"
          fill="#64748B"
          fontSize="9"
          fontFamily="system-ui, -apple-system, BlinkMacSystemFont, sans-serif"
        >
          Active campaigns
        </text>
        <text
          x="12"
          y="29"
          fill="#E5E7EB"
          fontSize="14"
          fontWeight="bold"
          fontFamily="system-ui, -apple-system, BlinkMacSystemFont, sans-serif"
        >
          32
        </text>
      </g>

      <g transform="translate(60, 40)">
        <rect
          width="92"
          height="44"
          rx="11"
          fill="#0EA5E9"
        />
        <text
          x="46"
          y="18"
          textAnchor="middle"
          fill="#E0F2FE"
          fontSize="10"
          fontFamily="system-ui, -apple-system, BlinkMacSystemFont, sans-serif"
        >
          Live traffic
        </text>
        <text
          x="46"
          y="32"
          textAnchor="middle"
          fill="#F9FAFB"
          fontSize="16"
          fontWeight="bold"
          fontFamily="system-ui, -apple-system, BlinkMacSystemFont, sans-serif"
        >
          1,284
        </text>
      </g>

      <g transform="translate(270, 40)">
        <rect
          width="88"
          height="44"
          rx="11"
          fill="#111827"
          stroke="#F97373"
          strokeWidth="1.5"
        />
        <text
          x="10"
          y="17"
          fill="#9CA3AF"
          fontSize="9"
          fontFamily="system-ui, -apple-system, BlinkMacSystemFont, sans-serif"
        >
          CTR
        </text>
        <text
          x="10"
          y="30"
          fill="#F97373"
          fontSize="15"
          fontWeight="bold"
          fontFamily="system-ui, -apple-system, BlinkMacSystemFont, sans-serif"
        >
          7.4%
        </text>
        <text
          x="52"
          y="17"
          fill="#6EE7B7"
          fontSize="9"
          fontFamily="system-ui, -apple-system, BlinkMacSystemFont, sans-serif"
        >
          +2.3%
        </text>
        <circle cx="74" cy="30" r="5" fill="#22C55E" />
      </g>

      <g transform="translate(60, 210)">
        <rect
          width="90"
          height="46"
          rx="12"
          fill="#020617"
          stroke="#1E293B"
          strokeWidth="1.5"
        />
        <rect
          x="12"
          y="14"
          width="20"
          height="18"
          rx="5"
          fill="#38BDF8"
        />
        <rect
          x="36"
          y="10"
          width="40"
          height="4"
          rx="2"
          fill="#1E293B"
        />
        <rect
          x="36"
          y="18"
          width="32"
          height="4"
          rx="2"
          fill="#1E293B"
        />
        <rect
          x="36"
          y="26"
          width="22"
          height="4"
          rx="2"
          fill="#1E293B"
        />
      </g>

      <circle cx="340" cy="60" r="4" fill="#22C55E" />
      <circle cx="60" cy="70" r="3" fill="#38BDF8" />
      <circle cx="340" cy="250" r="3" fill="#FACC15" />
      <circle cx="50" cy="240" r="3" fill="#F97373" />
    </svg>
  );
};

export default DataAnalyticsSVG;
