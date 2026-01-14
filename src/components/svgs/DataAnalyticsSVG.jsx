const DataAnalyticsSVG = ({ className = "w-full h-full" }) => {
  return (
    <svg
      viewBox="0 0 400 300"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Background circles */}
      <circle cx="200" cy="150" r="120" fill="#E8F4FF" opacity="0.5" />
      <circle cx="200" cy="150" r="80" fill="#D4EBFF" opacity="0.6" />

      {/* Main chart container */}
      <rect
        x="80"
        y="80"
        width="240"
        height="180"
        rx="12"
        fill="white"
        stroke="#2563EB"
        strokeWidth="2"
      />

      {/* Bar chart */}
      <rect x="100" y="180" width="30" height="50" rx="4" fill="#3B82F6" />
      <rect x="145" y="140" width="30" height="90" rx="4" fill="#60A5FA" />
      <rect x="190" y="160" width="30" height="70" rx="4" fill="#3B82F6" />
      <rect x="235" y="120" width="30" height="110" rx="4" fill="#2563EB" />
      <rect x="280" y="150" width="30" height="80" rx="4" fill="#60A5FA" />

      {/* Trend line */}
      <path
        d="M 100 200 Q 150 160, 200 170 T 300 140"
        stroke="#10B981"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
      />

      {/* Data points */}
      <circle cx="115" cy="200" r="5" fill="#10B981" />
      <circle cx="160" cy="170" r="5" fill="#10B981" />
      <circle cx="205" cy="170" r="5" fill="#10B981" />
      <circle cx="250" cy="150" r="5" fill="#10B981" />
      <circle cx="295" cy="140" r="5" fill="#10B981" />

      {/* Floating stat cards */}
      <g transform="translate(30, 40)">
        <rect
          width="80"
          height="40"
          rx="8"
          fill="white"
          stroke="#2563EB"
          strokeWidth="2"
        />
        <text
          x="40"
          y="20"
          textAnchor="middle"
          fill="#2563EB"
          fontSize="12"
          fontWeight="bold"
        >
          +45%
        </text>
        <text x="40" y="32" textAnchor="middle" fill="#64748B" fontSize="8">
          Growth
        </text>
      </g>

      <g transform="translate(290, 40)">
        <rect
          width="80"
          height="40"
          rx="8"
          fill="white"
          stroke="#10B981"
          strokeWidth="2"
        />
        <text
          x="40"
          y="20"
          textAnchor="middle"
          fill="#10B981"
          fontSize="12"
          fontWeight="bold"
        >
          12.8%
        </text>
        <text x="40" y="32" textAnchor="middle" fill="#64748B" fontSize="8">
          Conversion
        </text>
      </g>
    </svg>
  );
};

export default DataAnalyticsSVG;
