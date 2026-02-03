import React from "react";

/* simple helper for class names */
function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

function Badge({ children, variant = "default", className = "", ...props }) {
  const baseClass =
    "inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium whitespace-nowrap";

  const variants = {
    default: "background-color: #2563eb; color: white;",
    secondary: "background-color: #e5e7eb; color: #111827;",
    destructive: "background-color: #dc2626; color: white;",
    outline: "background-color: transparent; border: 1px solid #d1d5db;",
  };

  return (
    <span
      style={{}}
      className={cn(baseClass, className)}
      {...props}
    >
      {children}
    </span>
  );
}

export default Badge;
