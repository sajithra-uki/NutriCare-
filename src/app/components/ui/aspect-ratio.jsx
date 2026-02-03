import React from "react";
import { AspectRatio } from "./AspectRatio";

export default function App() {
  return (
    <div className="p-6 space-y-6">
      <AspectRatio ratio={16 / 9} className="bg-gray-200">
        <img
          src="https://via.placeholder.com/800x450"
          alt="Example"
          className="w-full h-full object-cover"
        />
      </AspectRatio>

      <AspectRatio ratio={1} className="bg-gray-300">
        <div className="flex items-center justify-center h-full w-full">
          1:1 Box
        </div>
      </AspectRatio>
    </div>
  );
}
