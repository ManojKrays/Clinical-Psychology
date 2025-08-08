import React, { useState } from "react";
import TherapistsFaq from "./TherapistsFaq";
import ClientsFaq from "./ClientsFaq";

const Faq = () => {
  const [activeTab, setActiveTab] = useState("clients");

  return (
    <div className="mx-auto w-[90%] px-4 pt-20 pb-10 md:w-[80%] lg:w-[80%]">
      <h2 className="font-avenir mb-6 text-[36px] font-extrabold sm:text-[26px]">
        Frequently
        <br />
        asked questions
      </h2>
      <div className="mb-6 flex border-b border-gray-200">
        <button
          className={`mr-20 cursor-pointer border-b-2 pb-2 text-lg font-medium ${
            activeTab === "clients"
              ? "border-blue-400 text-blue-500"
              : "border-white text-black"
          }`}
          onClick={() => setActiveTab("clients")}
        >
          Clients
        </button>
        <button
          className={`cursor-pointer border-b-2 pb-2 text-lg font-medium ${
            activeTab === "therapists"
              ? "border-blue-400 text-blue-500"
              : "border-white text-black"
          }`}
          onClick={() => setActiveTab("therapists")}
        >
          Therapists
        </button>
      </div>

      {activeTab === "therapists" && (
        <div>
          <TherapistsFaq />
        </div>
      )}
      {activeTab === "clients" && (
        <div>
          <ClientsFaq />
        </div>
      )}
    </div>
  );
};

export default Faq;
