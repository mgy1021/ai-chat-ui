import React from "react";

export function TypingIndicator() {
  return (
    <div className="flex space-x-1 items-center">
      <div className="flex space-x-1">
        <div className="h-2 w-2 bg-[#4318ff] rounded-full animate-pulse" style={{ animationDelay: "0ms" }}></div>
        <div className="h-2 w-2 bg-[#4318ff] rounded-full animate-pulse" style={{ animationDelay: "300ms" }}></div>
        <div className="h-2 w-2 bg-[#4318ff] rounded-full animate-pulse" style={{ animationDelay: "600ms" }}></div>
      </div>
    </div>
  );
} 