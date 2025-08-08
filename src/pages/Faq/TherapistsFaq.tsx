import String from "@/utils/String";
import React, { useState } from "react";

const TherapistsFaq = () => {
  const [openIndex, setOpenIndex] = useState(0);
  const therapistFaqs = [
    {
      question: String.THERAPISTQUESTION1,
      answer: String.THERAPISTANSWER1,
    },
    {
      question: String.THERAPISTQUESTION2,
      answer: String.THERAPISTANSWER2,
    },
    {
      question: String.THERAPISTQUESTION3,
      answer: String.THERAPISTANSWER3,
    },
    {
      question: String.THERAPISTQUESTION4,
      answer: String.THERAPISTANSWER4,
    },
    {
      question: String.THERAPISTQUESTION5,
      answer: String.THERAPISTANSWER5,
    },
  ];
  return (
    <div className="font-avenir space-y-4">
      {therapistFaqs.map((faq, index) => (
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

export default TherapistsFaq;
