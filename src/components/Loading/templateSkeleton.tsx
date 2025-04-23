import React from "react";

export const TemplateSkeleton = () => (
  <div className="space-y-4">
    <div className="h-8 bg-gray-200 rounded w-3/4 animate-pulse"></div>
    <div className="space-y-2">
      <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
      <div className="h-4 bg-gray-200 rounded w-5/6 animate-pulse"></div>
      <div className="h-4 bg-gray-200 rounded w-4/6 animate-pulse"></div>
    </div>
    <div className="h-32 bg-gray-200 rounded animate-pulse"></div>
    <div className="space-y-2">
      <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
      <div className="h-4 bg-gray-200 rounded w-5/6 animate-pulse"></div>
    </div>
  </div>
);
