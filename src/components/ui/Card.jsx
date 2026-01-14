const Card = ({ children, className = "", hover = true }) => {
  return (
    <div
      className={`bg-white rounded-2xl shadow-lg ${
        hover ? "hover:shadow-2xl hover:scale-105" : ""
      } transition-all duration-300 ${className}`}
    >
      {children}
    </div>
  );
};

export default Card;
