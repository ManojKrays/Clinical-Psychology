import Images from "@/utils/Images";
import String from "@/utils/String";
import React from "react";

const ContactDetails = () => {
  return (
    <div className="md:[80%] flex flex-col justify-start gap-6 pt-5 pr-10 pl-8">
      <div>
        <h2 className="font-agency mb-2 text-[30px] font-bold">
          {String.GETINTOUCH}
        </h2>
        <p className="font-avenir text-md text-justify">
          {String.HAVEQUESTION}
        </p>
      </div>
      <div className="flex flex-col items-center justify-between md:flex-row">
        <img src={Images.CONTACTUS} alt="Background" className="" />
      </div>
    </div>
  );
};

export default ContactDetails;
