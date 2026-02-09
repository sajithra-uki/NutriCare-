import React from "react";

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

function Badge({ children, className = "", ...props }) {
  const baseClass =
    "inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium whitespace-nowrap";

  return (
    <span className={cn(baseClass, className)} {...props}>
      {children}
    </span>
  );
}

export default Badge;
