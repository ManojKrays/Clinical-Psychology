import React, { useEffect, useRef, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import String from "@/utils/String";
import Images from "@/utils/Images";
import { usePrompt } from "@/hooks/usePrompt";
import Application from "./Steps/Application";
import ProfileSummary from "./Steps/ProfileSummary";
import Terms from "./Steps/Terms";
import Account from "./Steps/Account";
import TherapistModel from "@/components/TherapistModel";

const WorkingProcedure = () => {
  return (
    <div>
      <div className="flex flex-col items-center justify-center pb-10">
        <h2 className="font-agency mb-2 text-[30px] font-bold">
          {String.HOWITSWORK}
        </h2>
        <p className="font-avenir text-md">{String.STEPS}</p>
      </div>
      <div className="flex flex-col items-center gap-2 pb-10 md:flex-row">
        <div className="bg-accent flex h-[200px] w-[250px] flex-col items-center justify-center gap-5 rounded-xl text-center ">
          <div>
            <img
              src={Images.APPLICATION}
              alt="find"
              className="h-[150px] w-[250px] object-contain"
            />
            <p className="text-[14px] font-medium pb-10">Application</p>
          </div>
        </div>

        <div className="bg-accent flex h-[200px] w-[250px] flex-col items-center justify-center gap-5 rounded-xl text-center ">
          <div>
            <img
              src={Images.BOOKING}
              alt="find"
              className="h-[150px] w-[250px] object-contain"
            />
            <p className="text-[14px] font-medium pb-10">Review</p>
          </div>
        </div>

        <div className="bg-accent flex h-[200px] w-[250px] flex-col items-center justify-center gap-5 rounded-xl text-center ">
          <img
            src={Images.APPROVAL}
            alt="find"
            className="h-[150px] w-[250px] object-contain pt-2"
          />
          <p className="text-[14px] font-medium pb-10">Approval</p>
        </div>

        <div className="bg-accent flex h-[200px] w-[250px] flex-col items-center justify-center gap-3 rounded-xl text-center">
          <img
            src={Images.THERAPIST}
            alt="therapist"
            className="h-[150px] w-[250px] object-contain"
          />
          <p className="text-[14px] font-medium pb-10">Start Therapisting</p>
        </div>
      </div>
    </div>
  );
};

const Stepper = ({ steps, currentStep }) => {
  const [newStep, setNewStep] = useState([]);
  const stepRef = useRef();

  const updateStep = (stepNumber, steps) => {
    const newSteps = [...steps];
    let count = 0;

    while (count < newSteps.length) {
      if (count === stepNumber) {
        newSteps[count] = {
          ...newSteps[count],
          highlighted: true,
          selected: true,
          completed: false,
        };
      } else if (count < stepNumber) {
        newSteps[count] = {
          ...newSteps[count],
          highlighted: false,
          selected: true,
          completed: true,
        };
      } else {
        newSteps[count] = {
          ...newSteps[count],
          highlighted: false,
          selected: false,
          completed: false,
        };
      }
      count++;
    }
    return newSteps;
  };

  useEffect(() => {
    const stepsState = steps.map((step, index) => ({
      description: step,
      completed: false,
      highlighted: index === 0,
      selected: index === 0,
    }));
    stepRef.current = stepsState;
    const current = updateStep(currentStep, stepRef.current);
    setNewStep(current);
  }, [steps, currentStep]);

  const displaySteps = newStep.map((step, index) => (
    <div
      key={index}
      className={
        index !== newStep.length - 1
          ? "flex w-full items-center"
          : "flex items-center"
      }
    >
      <div className="relative flex flex-col items-center">
        <div
          className={`flex h-11 w-11 items-center justify-center rounded-full border-2 border-gray-300 py-3 transition duration-500 ease-in-out ${
            step.selected
              ? "bg-secondary border-secondary font-bold text-white"
              : ""
          }`}
        >
          {step.completed ? (
            <span className="text-xl font-bold text-white">&#10003;</span>
          ) : (
            index + 1
          )}
        </div>
        <div
          className={`absolute top-0 mt-16 w-32 text-center text-xs font-medium uppercase ${
            step.highlighted ? "text-gray-800" : "text-gray-400"
          }`}
        >
          {step.description}
        </div>
      </div>
      {index !== newStep.length - 1 && (
        <div
          className={`ease in out mx-2 flex-auto rounded-full border-t-8 transition duration-500 ${
            step.completed ? "border-secondary" : "border-gray-300"
          }`}
        ></div>
      )}
    </div>
  ));

  return (
    <div className="flex items-center justify-between p-4">{displaySteps}</div>
  );
};

const Therapist = () => {
  const steps = ["Application", "Profile", "Terms", "Account"];
  const [currentStep, setCurrentStep] = useState(0);
  const [isModelVisibile, setIsModelVisibile] = useState(true);
  const [isEmailVerified, setIsEmailVerified] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    getValues,
    setValue,
    watch,
  } = useForm();

  const formProps = {
    formState: { errors },
    register,
    control,
    handleSubmit,
    errors,
    getValues,
    setValue,
    watch,
  };

  const hasUnsavedProgress = currentStep < steps.length - 1;
  usePrompt(
    "Your progress may be lost. Are you sure you want to leave?",
    hasUnsavedProgress
  );
  const methods = useForm();

  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (hasUnsavedProgress) {
        e.preventDefault();
        e.returnValue = "";
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [hasUnsavedProgress]);

  const displaySteps = (step) => {
    switch (step) {
      case 0:
        return (
          <Application
            formProps={formProps}
            onNext={() => handleClick("next")}
          />
        );
      case 1:
        return (
          <ProfileSummary
            formProps={formProps}
            onNext={() => handleClick("next")}
            onPrev={() => handleClick("prev")}
          />
        );
      case 2:
        return (
          <Terms
            formProps={formProps}
            onNext={() => handleClick("next")}
            onPrev={() => handleClick("prev")}
          />
        );
      case 3:
        return (
          <Account
            formProps={formProps}
            onPrev={() => handleClick("prev")}
            emailVerified={isEmailVerified}
            setEmailVerified={setIsEmailVerified}
          />
        );
      default:
        return "Done";
    }
  };

  const handleClick = (direction) => {
    let newStep = currentStep;
    direction === "next" ? newStep++ : newStep--;
    if (newStep >= 0 && newStep < steps.length) {
      setCurrentStep(newStep);
    }
  };

  return (
    <FormProvider {...methods}>
      <div className="mx-auto w-full pt-24 md:w-[80%]">
        {isModelVisibile && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-black/50">
            <TherapistModel setIsModelVisibile={setIsModelVisibile} />
          </div>
        )}

        {currentStep === 0 && <WorkingProcedure />}

        <div className="mx-auto w-[98%] rounded-md border border-gray-200 p-5 lg:w-[90%]">
          <div className="md:w-[80%]pb-10 mx-auto w-[98%]">
            <Stepper steps={steps} currentStep={currentStep} />
          </div>

          <div className="w-full border border-gray-200" />

          <div className="mb-10 text-sm">{displaySteps(currentStep)}</div>
        </div>
      </div>
    </FormProvider>
  );
};

export default Therapist;
