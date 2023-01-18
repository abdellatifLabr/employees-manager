import React from "react";
import cn from "classnames";
import Loader from "@components/Loader";

const SIZES = {
  sm: "px-3 py-1 text-xs",
  md: "px-4 py-2 text-sm",
  lg: "px-5 py-3 text-sm",
};

const VARIANTS = {
  primary: "text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500",
  light: "text-gray-600 bg-gray-100 hover:bg-gray-200 focus:ring-gray-400",
};

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: keyof typeof SIZES;
  variant?: keyof typeof VARIANTS;
  loading?: boolean;
}

const Button: React.FC<Props> = ({
  size = "md",
  variant = "primary",
  type = "button",
  loading = false,
  disabled,
  className,
  children,
  ...props
}) => {
  return (
    <button
      type={type}
      className={cn(
        "inline-flex space-x-2 items-center border border-transparent rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors disabled:bg-gray-100 disabled:text-gray-300 disabled:pointer-events-none",
        SIZES[size],
        VARIANTS[variant],
        className
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading && <Loader className="w-5" />}
      <div className="flex items-center justify-center space-x-2">
        {children}
      </div>
    </button>
  );
};

export default Button;
