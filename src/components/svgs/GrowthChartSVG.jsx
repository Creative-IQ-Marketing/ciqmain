const GrowthChartSVG = ({ className = "w-full h-full" }) => {
  return (
    <svg
      viewBox="0 0 400 300"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Background gradient */}
      <defs>
        <linearGradient id="growthGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#DBEAFE" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#EFF6FF" stopOpacity="0.3" />
        </linearGradient>
      </defs>

      <rect
        x="50"
        y="50"
        width="300"
        height="200"
        rx="12"
        fill="url(#growthGradient)"
      />

      {/* Chart container */}
      <rect
        x="70"
        y="70"
        width="260"
        height="160"
        rx="8"
        fill="white"
        stroke="#2563EB"
        strokeWidth="2"
      />

      {/* Grid lines */}
      <line
        x1="70"
        y1="110"
        x2="330"
        y2="110"
        stroke="#E5E7EB"
        strokeWidth="1"
        strokeDasharray="4 4"
      />
      <line
        x1="70"
        y1="150"
        x2="330"
        y2="150"
        stroke="#E5E7EB"
        strokeWidth="1"
        strokeDasharray="4 4"
      />
      <line
        x1="70"
        y1="190"
        x2="330"
        y2="190"
        stroke="#E5E7EB"
        strokeWidth="1"
        strokeDasharray="4 4"
      />

      {/* Area under curve */}
      <path
        d="M 90 210 L 90 180 Q 130 170, 150 160 T 210 140 T 270 100 L 310 95 L 310 210 Z"
        fill="#DBEAFE"
        opacity="0.5"
      />

      {/* Growth curve */}
      <path
        d="M 90 180 Q 130 170, 150 160 T 210 140 T 270 100 L 310 95"
        stroke="#2563EB"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Data points */}
      <circle
        cx="90"
        cy="180"
        r="5"
        fill="white"
        stroke="#2563EB"
        strokeWidth="2"
      />
      <circle
        cx="150"
        cy="160"
        r="5"
        fill="white"
        stroke="#2563EB"
        strokeWidth="2"
      />
      <circle
        cx="210"
        cy="140"
        r="5"
        fill="white"
        stroke="#2563EB"
        strokeWidth="2"
      />
      <circle
        cx="270"
        cy="100"
        r="5"
        fill="white"
        stroke="#2563EB"
        strokeWidth="2"
      />
      <circle
        cx="310"
        cy="95"
        r="6"
        fill="#10B981"
        stroke="#059669"
        strokeWidth="2"
      />

      {/* Value labels */}
      <g transform="translate(310, 75)">
        <rect x="-35" y="-15" width="70" height="25" rx="4" fill="#10B981" />
        <text
          x="0"
          y="2"
          textAnchor="middle"
          fill="white"
          fontSize="12"
          fontWeight="bold"
        >
          +300%
        </text>
      </g>

      {/* Bottom labels */}
      <text x="90" y="225" textAnchor="middle" fill="#64748B" fontSize="10">
        Q1
      </text>
      <text x="150" y="225" textAnchor="middle" fill="#64748B" fontSize="10">
        Q2
      </text>
      <text x="210" y="225" textAnchor="middle" fill="#64748B" fontSize="10">
        Q3
      </text>
      <text x="270" y="225" textAnchor="middle" fill="#64748B" fontSize="10">
        Q4
      </text>
      <text
        x="310"
        y="225"
        textAnchor="middle"
        fill="#10B981"
        fontSize="10"
        fontWeight="bold"
      >
        Now
      </text>

      {/* Rocket icon */}
      <g transform="translate(340, 60) rotate(-45)">
        <ellipse cx="0" cy="0" rx="8" ry="12" fill="#2563EB" />
        <path d="M -8 6 Q -12 10, -10 14 L 0 8 Z" fill="#F59E0B" />
        <path d="M 8 6 Q 12 10, 10 14 L 0 8 Z" fill="#F59E0B" />
        <circle cx="0" cy="-3" r="3" fill="white" />
      </g>

      {/* Target icon */}
      <g transform="translate(60, 80)">
        <circle
          cx="0"
          cy="0"
          r="12"
          fill="white"
          stroke="#10B981"
          strokeWidth="2"
        />
        <circle
          cx="0"
          cy="0"
          r="7"
          fill="white"
          stroke="#10B981"
          strokeWidth="2"
        />
        <circle cx="0" cy="0" r="3" fill="#10B981" />
      </g>
    </svg>
  );
};

export default GrowthChartSVG;
