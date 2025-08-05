import { cardDetails } from "@/utils/data";
import Images from "@/utils/Images";
import React from "react";
import { X } from "lucide-react";
const TherapistModel = ({ setIsModelVisibile }) => {
  const Card = ({ data }) => (
    <div className="bg-whitish w-full space-y-3 rounded-md border border-gray-200 p-4 text-center sm:w-[280px] md:w-[280px] lg:w-[240px] xl:w-[300px] h-[130px] overflow-y-auto">
      <h2 className="font-agency text-secondary text-lg md:text-xl">
        {data.heading}
      </h2>
      <p className="font-avenir text-sm text-gray-500">{data.des}</p>
    </div>
  );

  return (
    <div className="relative mx-auto my-10 min-h-screen w-[90%] max-w-[1200px] rounded-xs bg-white px-4 py-10 sm:px-6 md:w-[80%] lg:px-10">
      <div className="absolute top-0 right-0 p-10">
        <X
          className="cursor-pointer"
          onClick={() => setIsModelVisibile(false)}
        />
      </div>

      <div className="space-y-6 pt-5">
        <h2 className="font-agency text-2xl text-gray-700">
          Benefits of Joining as a Therapist
        </h2>
        <p className="text-sm text-gray-600 md:text-base">
          Share your expertise, grow your reputation, and earn by helping
          individuals improve their mental well-being.
        </p>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {cardDetails.map((data, i) => (
            <Card key={i} data={data} />
          ))}
        </div>

        <div className="space-y-3">
          <h4 className="text-lg font-bold sm:text-xl">
            Eligibility Checklist
          </h4>
          <h2 className="text-secondary text-2xl font-bold sm:text-3xl">
            Are You Eligible to Be a Therapist?
          </h2>
          <p className="text-sm text-gray-500">
            We’re looking for licensed professionals who can make a meaningful
            impact.
          </p>
        </div>

        {[
          [
            "Licensed therapist with 5+ years of experience",
            "Excellent communication skills (calls & messages)",
          ],
          [
            "Available for minimum 3 sessions per month",
            "Complete profile: headshot, short bio, credentials or portfolio link",
          ],
        ].map((section, i) => (
          <div
            key={i}
            className="font-avenir grid grid-cols-1 gap-4 pt-5 md:grid-cols-2"
          >
            {section.map((item, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <img src={Images.TICK} alt="tick" className="h-5 w-5" />
                <p className="text-[14px] text-gray-500">{item}</p>
              </div>
            ))}
          </div>
        ))}

        <div className="mx-auto md:w-[50%] w-[75%] ">
          <button
            onClick={() => setIsModelVisibile(false)}
            type="button"
            className="bg-secondary w-full cursor-pointer rounded-md py-3 text-sm text-white sm:text-base"
          >
            Apply to Become a Therapist
          </button>
        </div>
      </div>
    </div>
  );
};

export default TherapistModel;
