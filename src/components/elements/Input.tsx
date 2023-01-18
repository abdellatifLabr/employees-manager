import React from "react";
import cn from "classnames";

const SIZES = {
  sm: "px-2 py-1 text-xs",
  md: "px-3 py-2 text-sm",
  lg: "px-4 py-3 text-sm",
};

interface Props
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  label?: string;
  size?: keyof typeof SIZES;
}

const Input: React.FC<Props> = ({
  label,
  size = "md",
  className,
  ...props
}) => {
  return (
    <>
      {label && <label className="text-sm font-medium">{label}</label>}
      <input
        className={cn(
          "w-full block text-sm px-3 py-2 rounded-md border border-gray-200 transition-colors",
          SIZES[size],
          className
        )}
        {...props}
      />
    </>
  );
};

export default Input;
