import React, { useState } from "react";

// Simple Button component
function Button({ children, onClick, variant = "default", className }) {
  const base = "px-4 py-2 rounded-md font-medium";
  const styles = {
    default: "bg-blue-500 text-white hover:bg-blue-600",
    outline: "border border-gray-300 text-gray-700 hover:bg-gray-100",
  };
  return (
    <button onClick={onClick} className={`${base} ${styles[variant]} ${className || ""}`}>
      {children}
    </button>
  );
}

// AlertDialog component
function AlertDialog({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
        {children}
      </div>
    </div>
  );
}

// Header
function AlertDialogHeader({ children }) {
  return <div className="text-center sm:text-left mb-4 flex flex-col gap-2">{children}</div>;
}

// Footer
function AlertDialogFooter({ children }) {
  return <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end mt-4">{children}</div>;
}

// Title
function AlertDialogTitle({ children }) {
  return <h2 className="text-lg font-semibold">{children}</h2>;
}

// Description
function AlertDialogDescription({ children }) {
  return <p className="text-gray-600 text-sm mt-1">{children}</p>;
}

// Action button
function AlertDialogAction({ children, onClick }) {
  return <Button onClick={onClick}>{children}</Button>;
}

// Cancel button
function AlertDialogCancel({ children, onClick }) {
  return <Button onClick={onClick} variant="outline">{children}</Button>;
}

// Example usage
export default function App() {
  const [open, setOpen] = useState(false);

  return (
    <div className="p-6">
      <Button onClick={() => setOpen(true)}>Open Alert Dialog</Button>

      <AlertDialog isOpen={open} onClose={() => setOpen(false)}>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Item?</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete this item? This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setOpen(false)}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              alert("Deleted!");
              setOpen(false);
            }}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialog>
    </div>
  );
}

// Export all components
export {
  AlertDialog,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
  Button,
};
