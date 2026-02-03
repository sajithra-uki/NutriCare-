import React from "react";
import { Avatar, AvatarImage, AvatarFallback } from "./Avatar";

export default function App() {
  return (
    <div className="p-6 flex gap-4">
      {/* Avatar with image */}
      <Avatar size={50}>
        <AvatarImage src="https://via.placeholder.com/150" alt="User" />
        <AvatarFallback>U</AvatarFallback>
      </Avatar>

      {/* Avatar with fallback only */}
      <Avatar size={50}>
        <AvatarFallback>AB</AvatarFallback>
      </Avatar>
    </div>
  );
}
