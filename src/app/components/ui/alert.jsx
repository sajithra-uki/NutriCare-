import React from "react";

// Utility to combine class names
function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

// Alert component
function Alert({ children, variant = "default", className, ...props }) {
  const variantClasses = {
    default: "bg-white text-black border border-gray-200",
    destructive: "bg-red-50 text-red-700 border border-red-200",
  };

  const baseClasses = "relative w-full rounded-lg px-4 py-3 text-sm grid items-start gap-y-1";

  return (
    <div
      role="alert"
      className={cn(baseClasses, variantClasses[variant], className)}
      {...props}
    >
      {children}
    </div>
  );
}

// Alert title
function AlertTitle({ children, className, ...props }) {
  return (
    <div className={cn("font-medium tracking-tight mb-1", className)} {...props}>
      {children}
    </div>
  );
}

// Alert description
function AlertDescription({ children, className, ...props }) {
  return (
    <div className={cn("text-gray-600 text-sm", className)} {...props}>
      {children}
    </div>
  );
}

// Export components
export { Alert, AlertTitle, AlertDescription };
