import React from "react";
import { Loader2 } from "lucide-react"

export default function Loading() {
  return (
    <div className="flex justify-center items-center h-screen">
      <Loader2 className="h-10 w-10 animate-spin" />
    </div>
  );
}