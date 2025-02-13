interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
}

const Button: React.FC<ButtonProps> = ({ variant = "primary", children, className, ...rest }) => {
  const baseStyles =
    "w-full rounded-md border border-transparent font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-500";
  const variantStyles =
    variant === "primary"
      ? "bg-green-600 hover:bg-green-700 text-white focus:ring-green-500"
      : "bg-gray-200 hover:bg-gray-300 text-black";

  return (
    <button className={`${baseStyles} ${variantStyles} ${className}`} {...rest}>
      {children}
    </button>
  );
};

export default Button;
