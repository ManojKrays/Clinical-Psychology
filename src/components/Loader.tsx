import React from "react";

const Loader = () => {
  return (
    <div className="flex h-full w-full items-center justify-center space-x-2">
      <div className="bg-primary h-2 w-2 animate-bounce rounded-full [animation-delay:-0.3s]"></div>
      <div className="bg-primary h-2 w-2 animate-bounce rounded-full [animation-delay:-0.15s]"></div>
      <div className="bg-primary h-2 w-2 animate-bounce rounded-full"></div>
    </div>
  );
};

export default Loader;
