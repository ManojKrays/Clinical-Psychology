import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Eye, EyeClosed, Loader } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router";
import { post } from "@/config/network";
import apiDetails from "@/config/apiDetails";
import { errorNotify, successNotify } from "@/utils/MessageBar";
import useAuthStore from "@/store/authStore";
import ButtonLoader from "@/components/ButtonLoader";

type FormData = {
  email: string;
  password: string;
};

const LoginForm = () => {
  const form = useForm<FormData>({ mode: "onSubmit" });

  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitted },
  } = form;

  const [showPassword, setShowPassword] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const { setUser } = useAuthStore();
  const navigate = useNavigate();

  const onSubmit = async (data: FormData) => {
    setIsProcessing(true);
    try {
      const response = await post(apiDetails.endPoint.login, {
        emailId: data.email,
        password: data.password,
      });

      if (response.status) {
        setUser(response?.data?.data);
        successNotify(response?.data?.message);
        navigate("/");
      } else {
        errorNotify("Please check the Credentials");
      }
    } catch (error) {
      errorNotify(error.message);
      console.error("Login error:", error.message);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="pt-24 pb-10 md:pt-30">
      <div className="mx-auto md:w-[80%] w-[90%] rounded-lg bg-white p-10 shadow-lg">
        <h2 className="mb-2 text-xl font-bold">Login</h2>
        <h4 className="text-primary mb-6 text-base">Enter your credentials</h4>

        <Form {...form}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-6"
          >
            <FormField
              control={control}
              name="email"
              rules={{
                required: true,
                pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={errors.email ? "text-red-600" : ""}>
                    Email{" "}
                    {isSubmitted && errors.email && (
                      <span className="text-red-600">*</span>
                    )}
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="text-sm"
                      {...field}
                      type="email"
                      placeholder="Enter your Email"
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="password"
              rules={{
                required: true,
                minLength: 8,
              }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={errors.password ? "text-red-600" : ""}>
                    Password{" "}
                    {isSubmitted && errors.password && (
                      <span className="text-red-600">*</span>
                    )}
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        className="text-sm"
                        {...field}
                        type={showPassword ? "text" : "password"}
                        placeholder="At least 8 characters"
                      />
                      <span
                        className="absolute right-3 top-2.5 cursor-pointer text-gray-600"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <Eye size={15} />
                        ) : (
                          <EyeClosed size={15} />
                        )}
                      </span>
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />
            <div
              onClick={() => navigate("/forgot-password")}
              className="cursor-pointer text-right text-sm text-blue-600 hover:underline"
            >
              {"Forgot Password?"}
            </div>
            <div className="md:col-span-2 text-center">
              <Button
                type="submit"
                variant="cta"
                className="w-full"
                disabled={isProcessing}
              >
                {isProcessing
                  ? isProcessing && (
                      <div className="flex items-center justify-center">
                        <ButtonLoader />
                      </div>
                    )
                  : "Submit"}
              </Button>
            </div>
          </form>
        </Form>
        {
          <div className="flex items-center  justify-center gap-4 pt-5">
            <hr className="flex-1" />
            <span className="text-sm text-gray-400">{"OR"}</span>
            <hr className="flex-1" />
          </div>
        }
        <p className="text-center text-sm font-bold lg:pr-20">
          {"Don't have an account ?"}{" "}
          <span
            className="text-secondary cursor-pointer"
            onClick={() => {
              navigate("/signup");
            }}
          >
            {"Sign Up"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
