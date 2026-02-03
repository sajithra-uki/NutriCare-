import React from "react";
import { ChevronRight, MoreHorizontal } from "lucide-react";

/* simple helper for class names */
function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

function Breadcrumb({ children, ...props }) {
  return (
    <nav aria-label="breadcrumb" {...props}>
      {children}
    </nav>
  );
}

function BreadcrumbList({ children, className = "", ...props }) {
  return (
    <ol
      className={cn(
        "flex flex-wrap items-center gap-2 text-sm text-gray-500",
        className
      )}
      {...props}
    >
      {children}
    </ol>
  );
}

function BreadcrumbItem({ children, className = "", ...props }) {
  return (
    <li
      className={cn("inline-flex items-center gap-1.5", className)}
      {...props}
    >
      {children}
    </li>
  );
}

function BreadcrumbLink({ children, href = "#", className = "", ...props }) {
  return (
    <a
      href={href}
      className={cn("hover:text-black transition-colors", className)}
      {...props}
    >
      {children}
    </a>
  );
}

function BreadcrumbPage({ children, className = "", ...props }) {
  return (
    <span
      aria-current="page"
      className={cn("text-black font-normal", className)}
      {...props}
    >
      {children}
    </span>
  );
}

function BreadcrumbSeparator({ className = "" }) {
  return (
    <li className={cn("flex items-center", className)} aria-hidden="true">
      <ChevronRight size={14} />
    </li>
  );
}

function BreadcrumbEllipsis({ className = "" }) {
  return (
    <span
      className={cn(
        "flex items-center justify-center w-8 h-8",
        className
      )}
      aria-hidden="true"
    >
      <MoreHorizontal size={16} />
    </span>
  );
}

export {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
};
