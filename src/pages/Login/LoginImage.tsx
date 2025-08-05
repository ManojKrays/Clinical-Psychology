import Images from "@/utils/Images";
import React from "react";

const LoginImage = () => {
  return (
    <div className="pt-10 flex items-center justify-center w-full h-full">
      <img
        src={Images.LOGIN}
        alt="Design Up"
        className="h-[75%] w-[90%] object-cover bg-gray-100 rounded-[10px]"
      />
    </div>
  );
};

export default LoginImage;
