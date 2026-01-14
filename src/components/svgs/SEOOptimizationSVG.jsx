const SEOOptimizationSVG = ({ className = "w-full h-full" }) => {
  return (
    <svg
      viewBox="0 0 400 300"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Background */}
      <circle cx="200" cy="150" r="120" fill="#F0FDF4" opacity="0.8" />

      {/* Search bar */}
      <rect
        x="80"
        y="100"
        width="240"
        height="50"
        rx="25"
        fill="white"
        stroke="#2563EB"
        strokeWidth="3"
      />

      {/* Search icon */}
      <circle
        cx="110"
        cy="125"
        r="12"
        stroke="#2563EB"
        strokeWidth="2.5"
        fill="none"
      />
      <line
        x1="119"
        y1="134"
        x2="128"
        y2="143"
        stroke="#2563EB"
        strokeWidth="2.5"
        strokeLinecap="round"
      />

      {/* Search text */}
      <line
        x1="145"
        y1="125"
        x2="280"
        y2="125"
        stroke="#94A3B8"
        strokeWidth="2"
        strokeLinecap="round"
      />

      {/* Magnifying glass (large) */}
      <g transform="translate(280, 170)">
        <circle
          cx="0"
          cy="0"
          r="35"
          stroke="#2563EB"
          strokeWidth="4"
          fill="white"
        />
        <circle cx="0" cy="0" r="25" fill="#DBEAFE" />
        <line
          x1="25"
          y1="25"
          x2="45"
          y2="45"
          stroke="#2563EB"
          strokeWidth="6"
          strokeLinecap="round"
        />

        {/* Keywords inside magnifying glass */}
        <text
          x="0"
          y="-8"
          textAnchor="middle"
          fill="#2563EB"
          fontSize="10"
          fontWeight="bold"
        >
          SEO
        </text>
        <text x="0" y="4" textAnchor="middle" fill="#3B82F6" fontSize="8">
          Keywords
        </text>
        <text x="0" y="14" textAnchor="middle" fill="#60A5FA" fontSize="7">
          Ranking
        </text>
      </g>

      {/* Ranking positions */}
      <g transform="translate(80, 180)">
        <rect
          x="0"
          y="0"
          width="140"
          height="35"
          rx="6"
          fill="white"
          stroke="#10B981"
          strokeWidth="2"
        />
        <circle cx="15" cy="17.5" r="8" fill="#10B981" />
        <text
          x="15"
          y="21"
          textAnchor="middle"
          fill="white"
          fontSize="10"
          fontWeight="bold"
        >
          1
        </text>
        <rect x="30" y="8" width="100" height="6" rx="3" fill="#D1FAE5" />
        <rect x="30" y="8" width="90" height="6" rx="3" fill="#10B981" />
        <text
          x="135"
          y="13"
          textAnchor="end"
          fill="#10B981"
          fontSize="9"
          fontWeight="bold"
        >
          95%
        </text>
        <rect x="30" y="21" width="100" height="4" rx="2" fill="#E5E7EB" />
        <rect x="30" y="21" width="85" height="4" rx="2" fill="#60A5FA" />
      </g>

      {/* Trend arrow */}
      <g transform="translate(120, 60)">
        <path
          d="M 0 20 L 30 5 L 60 10 L 80 0"
          stroke="#10B981"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path d="M 80 0 L 70 0 L 80 10 Z" fill="#10B981" />
      </g>

      {/* Stars for rating */}
      <g transform="translate(280, 100)">
        {[0, 1, 2, 3, 4].map((i) => (
          <path
            key={i}
            d="M 0 -5 L 1.5 0 L 5 0 L 2 3 L 3 7 L 0 4.5 L -3 7 L -2 3 L -5 0 L -1.5 0 Z"
            fill="#F59E0B"
            transform={`translate(${i * 10}, 0)`}
          />
        ))}
      </g>
    </svg>
  );
};

export default SEOOptimizationSVG;
