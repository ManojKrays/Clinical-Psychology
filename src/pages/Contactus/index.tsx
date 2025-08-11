import String from "@/utils/String";
import { Mail, PhoneCall } from "lucide-react";
import React from "react";
import ContactDetails from "./ContactDetails";
import ContactForm from "./ContactForm";

const Contactus = () => {
  return (
    <div className="lg:pr-20 lg:pl-20 pt-10 w-full h-full">
      <div className="flex items-center justify-center bg-white mt-20">
        <div className="md:w-[80%]rounded-lg flex w-full flex-col overflow-hidden rounded-lg shadow md:flex-row">
          <div className="w-full lg:w-[50%]">
            <ContactDetails />
          </div>
          <div className="w-full">
            <ContactForm />
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-6 p-2 pt-10 pb-20 md:flex-row">
        <div className="bg-light w-full rounded-lg border border-secondary p-4 shadow-md">
          <div className="mb-3 flex items-center gap-2">
            <button className="cursor-pointer text-black hover:text-blue-500">
              <Mail className="h-6 w-6" />
            </button>
            <p className="pl-2 text-[14px]">{String.SUPPORT}</p>
          </div>
          <div className="flex items-center gap-2 pb-2">
            <button className="cursor-pointer text-black hover:text-blue-500">
              <PhoneCall className="h-6 w-6" />
            </button>
            <div className="flex-col">
              <p className="pl-2 text-[14px] text-justify">{String.CALL}</p>
              <p className="pl-2 text-[14px] text-justify">{String.TIME}</p>
            </div>
          </div>
          <div className="flex w-full pt-2">
            <button className="flex w-full bg-[#b2e0e9] p-1 text-sm text-justify items-center justify-center">
              We typically respond to all messages within 1–2 business days.
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contactus;
