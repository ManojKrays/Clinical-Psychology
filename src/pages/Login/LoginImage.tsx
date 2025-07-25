import React from "react";

const LoginImage = () => {
  return (
    <div className="flex w-[80%] flex-row items-center gap-4">
      <div className="absolute flex pr-30">
        <img
          src={"src/assets/login.jpeg"}
          alt="Design Up"
          className="rotate-0"
        />
      </div>
    </div>
  );
};

export default LoginImage;
