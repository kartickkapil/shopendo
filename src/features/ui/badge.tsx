import { FC, ReactNode } from "react";

export type BadgeVariant = "success";

export interface BadgeProps {
  children: ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

const Badge: FC<BadgeProps> = ({ children, variant = "success", className = "" }) => {
  const baseStyles = "inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-inset";
  let variantStyles = "";

  switch (variant) {
    case "success":
    default:
      variantStyles = "bg-green-50 text-green-700 ring-green-600/20";
      break;
  }

  return <span className={`${baseStyles} ${variantStyles} ${className}`}>{children}</span>;
};

export default Badge;
