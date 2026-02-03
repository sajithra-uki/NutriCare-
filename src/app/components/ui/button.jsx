import React from "react";

/* simple helper for class names */
function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

function Button({
  children,
  variant = "default",
  size = "default",
  className = "",
  disabled = false,
  ...props
}) {
  const baseClass =
    "inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-colors disabled:opacity-50 disabled:pointer-events-none";

  const variants = {
    default: "bg-blue-600 text-white hover:bg-blue-700",
    destructive: "bg-red-600 text-white hover:bg-red-700",
    outline: "border border-gray-300 text-gray-800 hover:bg-gray-100",
    secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300",
    ghost: "hover:bg-gray-100",
    link: "text-blue-600 underline hover:no-underline",
  };

  const sizes = {
    default: "h-9 px-4",
    sm: "h-8 px-3 text-sm",
    lg: "h-10 px-6 text-base",
    icon: "h-9 w-9",
  };

  return (
    <button
      className={cn(
        baseClass,
        variants[variant],
        sizes[size],
        className
      )}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}

export { Button };
