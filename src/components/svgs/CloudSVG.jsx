const CloudSVG = ({ className = "w-full h-full", opacity = "opacity-40" }) => {
  return (
    <svg
      viewBox="0 0 100 60"
      className={`${className} ${opacity}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Main cloud shape */}
      <defs>
        <filter id="cloudShadow" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.1" />
        </filter>
      </defs>

      {/* Cloud body */}
      <path
        d="M 20 40 Q 15 40 15 35 Q 15 25 25 20 Q 30 15 38 15 Q 42 8 50 8 Q 60 8 65 15 Q 75 15 80 25 Q 85 30 85 40 Q 85 50 75 50 L 20 50 Q 10 50 10 40 Q 10 30 20 30 Q 20 25 20 20"
        fill="currentColor"
        filter="url(#cloudShadow)"
        strokeWidth="0.5"
        stroke="currentColor"
        opacity="0.15"
      />

      {/* Highlight effect */}
      <ellipse cx="35" cy="25" rx="12" ry="5" fill="white" opacity="0.3" />
    </svg>
  );
};

export default CloudSVG;
