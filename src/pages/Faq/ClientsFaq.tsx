import String from "@/utils/String";
import React, { useState } from "react";

const ClientsFaq = () => {
  const [openIndex, setOpenIndex] = useState(0);
  const clientFaq = [
    {
      question: String.CLIENTQUESTION1,
      answer: String.CLIENTANSWER1,
    },
    {
      question: String.CLIENTQUESTION2,
      answer: String.CLIENTANSWER2,
    },
    {
      question: String.CLIENTQUESTION3,
      answer: String.CLIENTANSWER3,
    },
    {
      question: String.CLIENTQUESTION4,
      answer: String.CLIENTANSWER4,
    },
    {
      question: String.CLIENTQUESTION5,
      answer: String.CLIENTANSWER5,
    },
  ];
  return (
    <div className="font-avenir space-y-4">
      {clientFaq.map((faq, index) => (
        <div
          key={index}
          className="overflow-hidden rounded-md border border-gray-200"
        >
          <button
            className="flex w-full cursor-pointer items-center justify-between p-4 text-left"
            onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
          >
            <span className="font-bold">{faq.question}</span>
            <span className="text-xl">{openIndex === index ? "-" : "+"}</span>
          </button>
          {openIndex === index && (
            <div className="px-4 pb-4 text-justify text-sm text-black">
              {faq.answer}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ClientsFaq;
