import React from "react";
import LoginImage from "./LoginImage";
import LoginForm from "./LoginForm";

const Login = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-white px-4">
      <div className="flex w-full overflow-hidden rounded-lg">
        <div className="w-full md:w-[50%]">
          <LoginForm />
        </div>
        <div className="hidden md:flex md:w-[50%]">
          <LoginImage />
        </div>
      </div>
    </div>
  );
};

export default Login;
