import String from "@/utils/String";
import React from "react";

const PrivacyPolicy = () => {
  const privacySections = [
    {
      title: String.INFOHEAD1,
      body: [String.INFOBODY1, String.INFOBODY2, String.INFOBODY3],
    },
    {
      title: String.USAGEHEAD2,
      body: [
        String.USAGEBODY1,
        String.USAGEBODY2,
        String.USAGEBODY3,
        String.USAGEBODY4,
        String.USAGEBODY5,
      ],
    },
    {
      title: String.SECURITYHEAD3,
      body: [String.SECURITYBODY1, String.SECURITYBODY2, String.SECURITYBODY3],
    },
    {
      title: String.SHARINGHEAD4,
      body: [
        String.SHARINGBODY1,
        String.SHARINGBODY2,
        String.SHARINGBODY3,
        String.SHARINGBODY4,
        String.SHARINGBODY5,
      ],
    },
    {
      title: String.CONFIDENTIALITYHEAD5,
      body: [
        String.CONFIDENTIALITYBODY1,
        String.CONFIDENTIALITYBODY2,
        String.CONFIDENTIALITYBODY3,
      ],
    },
    {
      title: String.RIGHTSHEAD6,
      body: [
        String.RIGHTSBODY1,
        String.RIGHTSBODY2,
        String.RIGHTSBODY3,
        String.RIGHTSBODY4,
      ],
    },
    {
      title: String.COOKIESHEAD7,
      body: [String.COOKIESBODY1, String.COOKIESBODY2],
    },
    {
      title: String.RETENTIONHEAD8,
      body: [String.RETENTIONBODY1],
    },
    {
      title: String.LINKSHEAD9,
      body: [String.LINKSBODY1],
    },
    {
      title: String.CHANGESHEAD10,
      body: [String.CHANGESBODY1, String.CHANGESBODY2],
    },
    {
      title: String.CONTACTHEAD11,
      body: [String.CONTACTBODY1, String.CONTACTBODY2],
    },
  ];

  return (
    <div className="flex min-h-screen w-[90%] pt-[30%] md:pt-[13%] lg:pt-[10%]">
      <div className="font-agency pl-[10%] text-gray-800">
        <div className="mb-5 flex items-start md:justify-between lg:justify-between">
          <h1 className="text-sm font-bold md:text-lg lg:text-[26px]">
            {String.PRIVACYHEAD}
          </h1>
          <p className="font-avenir text- gray-500 text-[12px] md:text-[10px] lg:text-[12px]">
            Last Updated: 11-08-25
          </p>
        </div>

        <section className="font-avenir mb-6">
          <h2 className="font-semibold">{String.PRIVACYINTRO}</h2>
          <p className="mt-1 text-justify text-sm text-gray-700">
            {String.PRIVACYINTROBODY}
          </p>
        </section>
        {privacySections.map((section, index) => (
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

export default PrivacyPolicy;
