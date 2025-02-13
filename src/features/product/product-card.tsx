import { FC, ReactNode } from "react";
import { Link } from "react-router-dom";

type CardVariant = "grid" | "list";
type ImageVariant = "small" | "large";

interface ProductCardProps {
  variant?: CardVariant;
  href: string;
  children: ReactNode;
  className?: string;
}

const ProductCard: FC<ProductCardProps> & {
  Image: FC<{ variant?: ImageVariant; className?: string }>;
  Title: FC<{ children: ReactNode; className?: string }>;
  Description: FC<{ children: ReactNode; className?: string }>;
  Price: FC<{ children: ReactNode; className?: string }>;
} = ({ variant = "grid", href, children, className = "" }) => {
  if (variant === "list") {
    return <li className={`flex items-center py-6}>{children ${className}`}></li>;
  }

  return (
    <Link to={href} className={`group text-sm block ${className}`}>
      {children}
    </Link>
  );
};

ProductCard.Image = ({ variant = "large", className = "" }) => {
  return variant === "small" ? (
    <div className={`size-16 flex-none rounded-md border border-gray-200 ${className}`} aria-hidden="true"></div>
  ) : (
    <div
      className={`aspect-square w-full rounded-lg bg-gray-100 object-cover group-hover:opacity-75 ${className}`}
      aria-hidden="true"
    ></div>
  );
};

ProductCard.Title = ({ children, className = "" }) => {
  return <h3 className={`font-medium text-gray-900 ${className}`}>{children}</h3>;
};

ProductCard.Description = ({ children, className = "" }) => {
  return <p className={`italic text-gray-500 ${className}`}>{children}</p>;
};

ProductCard.Price = ({ children, className = "" }) => {
  return <p className={`font-medium text-gray-900 ${className}`}>{children}</p>;
};

export default ProductCard;
