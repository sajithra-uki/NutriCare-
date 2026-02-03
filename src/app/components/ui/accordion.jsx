import React, { useState } from "react";

function Accordion({ children }) {
  return <div className="accordion">{children}</div>;
}

function AccordionItem({ children }) {
  return <div className="accordion-item border-b last:border-b-0">{children}</div>;
}

function AccordionTrigger({ children, onClick, isOpen }) {
  return (
    <button
      className={`accordion-trigger flex justify-between items-center py-4 text-left text-sm font-medium w-full ${
        isOpen ? "underline" : ""
      }`}
      onClick={onClick}
    >
      {children}
      <span
        className={`chevron transition-transform duration-200 ${
          isOpen ? "rotate-180" : ""
        }`}
      >
        ▼
      </span>
    </button>
  );
}

function AccordionContent({ children, isOpen }) {
  return (
    <div
      className={`accordion-content overflow-hidden transition-all duration-300 ${
        isOpen ? "max-h-96" : "max-h-0"
      }`}
    >
      <div className="pt-0 pb-4">{children}</div>
    </div>
  );
}

// Example usage:
export default function App() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <Accordion>
      {[1, 2, 3].map((item, index) => (
        <AccordionItem key={index}>
          <AccordionTrigger
            isOpen={openIndex === index}
            onClick={() => toggle(index)}
          >
            Item {item} Title
          </AccordionTrigger>
          <AccordionContent isOpen={openIndex === index}>
            This is the content for item {item}.
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
