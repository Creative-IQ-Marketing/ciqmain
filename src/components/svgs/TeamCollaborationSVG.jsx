const TeamCollaborationSVG = ({ className = "w-full h-full" }) => {
  return (
    <svg
      viewBox="0 0 400 300"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Background */}
      <circle cx="200" cy="150" r="130" fill="#EEF2FF" opacity="0.6" />

      {/* Center hub */}
      <circle cx="200" cy="150" r="35" fill="#2563EB" />
      <circle cx="200" cy="150" r="25" fill="white" />

      {/* Connection lines */}
      <line
        x1="200"
        y1="150"
        x2="120"
        y2="80"
        stroke="#3B82F6"
        strokeWidth="2"
        strokeDasharray="4 4"
      />
      <line
        x1="200"
        y1="150"
        x2="280"
        y2="80"
        stroke="#3B82F6"
        strokeWidth="2"
        strokeDasharray="4 4"
      />
      <line
        x1="200"
        y1="150"
        x2="120"
        y2="220"
        stroke="#3B82F6"
        strokeWidth="2"
        strokeDasharray="4 4"
      />
      <line
        x1="200"
        y1="150"
        x2="280"
        y2="220"
        stroke="#3B82F6"
        strokeWidth="2"
        strokeDasharray="4 4"
      />

      {/* Team member 1 - Top Left */}
      <circle
        cx="120"
        cy="80"
        r="30"
        fill="white"
        stroke="#2563EB"
        strokeWidth="3"
      />
      <circle cx="120" cy="75" r="12" fill="#60A5FA" />
      <path
        d="M 100 95 Q 120 85, 140 95"
        stroke="#60A5FA"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
      />

      {/* Team member 2 - Top Right */}
      <circle
        cx="280"
        cy="80"
        r="30"
        fill="white"
        stroke="#10B981"
        strokeWidth="3"
      />
      <circle cx="280" cy="75" r="12" fill="#34D399" />
      <path
        d="M 260 95 Q 280 85, 300 95"
        stroke="#34D399"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
      />

      {/* Team member 3 - Bottom Left */}
      <circle
        cx="120"
        cy="220"
        r="30"
        fill="white"
        stroke="#8B5CF6"
        strokeWidth="3"
      />
      <circle cx="120" cy="215" r="12" fill="#A78BFA" />
      <path
        d="M 100 235 Q 120 225, 140 235"
        stroke="#A78BFA"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
      />

      {/* Team member 4 - Bottom Right */}
      <circle
        cx="280"
        cy="220"
        r="30"
        fill="white"
        stroke="#F59E0B"
        strokeWidth="3"
      />
      <circle cx="280" cy="215" r="12" fill="#FCD34D" />
      <path
        d="M 260 235 Q 280 225, 300 235"
        stroke="#FCD34D"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
      />

      {/* Center icon */}
      <path
        d="M 190 145 L 200 155 L 210 145"
        stroke="#2563EB"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="200" cy="150" r="3" fill="#2563EB" />
    </svg>
  );
};

export default TeamCollaborationSVG;
