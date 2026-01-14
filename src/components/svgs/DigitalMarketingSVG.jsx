const DigitalMarketingSVG = ({ className = "w-full h-full" }) => {
  return (
    <svg
      viewBox="0 0 400 300"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Background */}
      <rect x="50" y="50" width="300" height="200" rx="12" fill="#F0F9FF" />

      {/* Laptop screen */}
      <rect
        x="80"
        y="80"
        width="240"
        height="140"
        rx="8"
        fill="white"
        stroke="#2563EB"
        strokeWidth="3"
      />

      {/* Browser UI */}
      <rect x="80" y="80" width="240" height="25" rx="8" fill="#2563EB" />
      <circle cx="95" cy="92.5" r="4" fill="white" />
      <circle cx="107" cy="92.5" r="4" fill="white" />
      <circle cx="119" cy="92.5" r="4" fill="white" />

      {/* Content blocks inside screen */}
      <rect x="100" y="120" width="80" height="60" rx="6" fill="#DBEAFE" />
      <rect x="195" y="120" width="105" height="28" rx="4" fill="#93C5FD" />
      <rect x="195" y="155" width="105" height="25" rx="4" fill="#60A5FA" />

      {/* Megaphone */}
      <g transform="translate(320, 100)">
        <path d="M 0 0 L 20 -15 L 20 15 Z" fill="#2563EB" />
        <ellipse cx="22" cy="0" rx="8" ry="15" fill="#3B82F6" />
        <path
          d="M 30 -5 Q 40 -8, 45 -12 M 30 0 Q 42 0, 50 0 M 30 5 Q 40 8, 45 12"
          stroke="#10B981"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </g>

      {/* Social media icons floating */}
      <g transform="translate(60, 150)">
        <circle
          cx="0"
          cy="0"
          r="18"
          fill="white"
          stroke="#3B82F6"
          strokeWidth="2"
        />
        <text
          x="0"
          y="6"
          textAnchor="middle"
          fill="#3B82F6"
          fontSize="16"
          fontWeight="bold"
        >
          f
        </text>
      </g>

      <g transform="translate(360, 160)">
        <circle
          cx="0"
          cy="0"
          r="18"
          fill="white"
          stroke="#10B981"
          strokeWidth="2"
        />
        <path
          d="M -6 -6 L 6 6 M -6 6 L 6 -6"
          stroke="#10B981"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </g>

      <g transform="translate(340, 220)">
        <circle
          cx="0"
          cy="0"
          r="18"
          fill="white"
          stroke="#8B5CF6"
          strokeWidth="2"
        />
        <rect
          x="-6"
          y="-6"
          width="12"
          height="12"
          rx="2"
          stroke="#8B5CF6"
          strokeWidth="2"
          fill="none"
        />
      </g>

      {/* Laptop base */}
      <path d="M 60 220 L 340 220 L 360 240 L 40 240 Z" fill="#1E40AF" />
    </svg>
  );
};

export default DigitalMarketingSVG;
