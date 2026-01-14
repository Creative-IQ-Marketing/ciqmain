const Button = ({
  children,
  variant = "primary",
  size = "md",
  href,
  onClick,
  className = "",
  ...props
}) => {
  const baseStyles =
    "font-semibold rounded-lg transition-all duration-200 inline-flex items-center justify-center";

  const variants = {
    primary:
      "bg-gradient-to-r from-blue-600 to-blue-800 text-white hover:shadow-xl hover:scale-105",
    secondary:
      "bg-white border-2 border-blue-600 text-blue-600 hover:bg-blue-50",
    outline:
      "border-2 border-white text-white hover:bg-white hover:text-blue-600",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  const classes = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`;

  if (href) {
    return (
      <a href={href} className={classes} {...props}>
        {children}
      </a>
    );
  }

  return (
    <button onClick={onClick} className={classes} {...props}>
      {children}
    </button>
  );
};

export default Button;
