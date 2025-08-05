import React from "react";
import String from "../../../utils/String";
import { therapistTerms } from "../../../utils/data";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Terms = ({ onNext, onPrev, formProps }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = formProps;

  const onSubmit = (data) => {
    if (data.terms_condition) {
      onNext();
    }
  };
  return (
    <div className="w-[90%] pt-10 pl-6">
      <section className="font-avenir mb-6">
        <p className="mt-1 text-justify text-sm text-gray-700">
          {String.THERAPISTTERMS}
        </p>
      </section>
      {therapistTerms.map((section, index) => (
        <section key={index} className="font-avenir mb-6">
          <h2 className="font-extrabold text-gray-700">{section.title}</h2>
          <ul className="mt-1 list-inside list-disc space-y-1 text-justify text-sm text-gray-700">
            {section.body.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </section>
      ))}

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex items-start gap-2 pt-4">
          <input
            type="checkbox"
            id="terms_condition"
            {...register("terms_condition", {
              required: "You must agree to the terms and conditions",
            })}
            className="mt-1 cursor-pointer accent-black"
          />
          <label
            htmlFor="terms_condition"
            className="cursor-pointer text-sm text-gray-700"
          >
            I agree the{" "}
            <span className="text-secondary underline">
              <Link
                to="/terms"
                onClick={(e) => e.stopPropagation()}
                className="text-secondary underline"
              >
                Terms & Conditions
              </Link>
            </span>
          </label>
        </div>

        {errors.terms_condition && (
          <p className="pt-1 text-sm text-red-500">
            {errors.terms_condition.message}
          </p>
        )}
        <div className="flex w-full gap-5 pt-14">
          <Button
            type="button"
            onClick={() => onPrev()}
            className="font-avenir flex-1 bg-gray-400 text-black"
          >
            Back
          </Button>

          <Button
            type="submit"
            className="font-avenir bg-secondary flex-1 text-black"
          >
            Next
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Terms;
