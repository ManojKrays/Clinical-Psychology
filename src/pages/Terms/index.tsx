import String from "@/utils/String";
import React from "react";

const Terms = () => {
  const termsSections = [
    {
      title: String.USERELIGIBILITY,
      body: [
        String.USERELIGIBILITYBODY1,
        String.USERELIGIBILITYBODY2,
        String.USERELIGIBILITYBODY3,
      ],
    },
    {
      title: String.ACCOUNTMANAGEMENT,
      body: [
        String.ACCOUNTMANAGEMENTBODY1,
        String.ACCOUNTMANAGEMENTBODY2,
        String.ACCOUNTMANAGEMENTBODY3,
      ],
    },
    {
      title: String.THERAPYRESPONSIBILITIES,
      body: [
        String.THERAPYRESPONSIBILITIESBODY1,
        String.THERAPYRESPONSIBILITIESBODY2,
        String.THERAPYRESPONSIBILITIESBODY3,
      ],
    },
    {
      title: String.PAYMENTS,
      body: [String.PAYMENTSBODY1, String.PAYMENTSBODY2, String.PAYMENTSBODY3],
    },
    {
      title: String.OWNERSHIP,
      body: [String.OWNERSHIPBODY1, String.OWNERSHIPBODY2],
    },
    {
      title: String.PRIVACY,
      body: [String.PRIVACYBODY1, String.PRIVACYBODY2, String.PRIVACYBODY3],
    },
    {
      title: String.CODEOFCONDUCT,
      body: [
        String.CODEOFCONDUCTBODY1,
        String.CODEOFCONDUCTBODY2,
        String.CODEOFCONDUCTBODY3,
      ],
    },
    {
      title: String.LIMITATION,
      body: [
        String.LIMITATIONBODY1,
        String.LIMITATIONBODY2,
        String.LIMITATIONBODY3,
      ],
    },
    {
      title: String.TERMINATION,
      body: [String.TERMINATIONBODY1, String.TERMINATIONBODY2],
    },
    {
      title: String.AMENDMENTS,
      body: [String.AMENDMENTSBODY1, String.AMENDMENTSBODY2],
    },
    {
      title: String.CONTACTINFORMATION,
      body: [String.CONTACTINFORMATIONBODY1, String.CONTACTINFORMATIONBODY2],
    },
  ];
  return (
    <div className="flex min-h-screen w-[90%] pt-[30%] md:pt-[13%] lg:pt-[10%]">
      <div className="font-agency pl-[10%] text-gray-800">
        <div className="mb-5 flex items-start md:justify-between lg:justify-between">
          <h1 className="text-sm font-semibold md:text-lg lg:text-lg">
            {String.TERMSHEAD}
          </h1>
          <p className="font-avenir text- gray-500 text-[12px] md:text-[10px] lg:text-[12px]">
            Last Updated: 11-08-25
          </p>
        </div>

        <section className="font-avenir mb-6">
          <h2 className="font-semibold">{String.INTRO}</h2>
          <p className="mt-1 text-justify text-sm text-gray-700">
            {String.INTROBODY}
          </p>
        </section>
        {termsSections.map((section, index) => (
          <section key={index} className="font-avenir mb-6">
            <h2 className="font-semibold">{section.title}</h2>
            <ul className="mt-1 list-inside list-disc space-y-1 text-justify text-sm text-gray-700">
              {section.body.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
};

export default Terms;
