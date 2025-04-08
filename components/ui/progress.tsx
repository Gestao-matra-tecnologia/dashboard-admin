import * as React from "react";

interface ProgressProps {
  value: number;
  className?: string;
}

export function Progress({ value, className }: ProgressProps) {
  return (
    <div
      className={`w-full h-2 bg-gray-200 rounded-full overflow-hidden ${className}`}
    >
      <div
        className="h-full bg-gradient-to-r from-green-400 to-blue-500 transition-all duration-500"
        style={{ width: `${value}%` }}
      />
    </div>
  );
}
