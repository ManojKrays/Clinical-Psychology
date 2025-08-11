import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import apiDetails from "@/config/apiDetails";
import { post } from "@/config/network";
import useAuthStore from "@/store/authStore";
import { errorNotify, successNotify } from "@/utils/MessageBar";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import PhoneInput from "react-phone-input-2";

const ContactForm = () => {
  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subject: "General Inquiry",
      work: "",
    },
  });

  const { control, handleSubmit, reset } = form;

  const [isProcessing, setIsProcessing] = useState(false);
  const userDetails = useAuthStore((state) => state.user);
  const clientId = userDetails?.role === "CLIENT" ? userDetails.id : null;
  const therapistId = userDetails?.role === "THERAPIST" ? userDetails.id : null;

  const onSubmit = async (data) => {
    setIsProcessing(true);
    try {
      const response = await post(apiDetails.endPoint.Contact, {
        name: data.name,
        email: data.email,
        phone: data.phone,
        subject: data.subject,
        message: data.work,
        therapistId,
        clientId,
      });

      if (response.status) {
        successNotify(response?.data?.message);
        reset();
      } else {
        errorNotify("Please check the Credentials");
      }
    } catch (error) {
      errorNotify(error.message);
      console.error("Contact:", error.message);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="flex flex-col justify-start gap-6 pt-10 pr-10 pb-10 pl-8">
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 lg:pr-20">
          <div className="flex flex-col gap-4 md:flex-row md:gap-6">
            <FormField
              control={control}
              name="name"
              rules={{ required: "Name is required" }}
              render={({ field }) => (
                <FormItem className="w-full md:w-1/2">
                  <FormLabel>
                    Full Name <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Enter Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="email"
              rules={{
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email address",
                },
              }}
              render={({ field }) => (
                <FormItem className="w-full md:w-1/2">
                  <FormLabel>
                    Email Address <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="example@gmail.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex flex-col gap-4 md:flex-row md:items-start">
            <FormField
              control={control}
              name="phone"
              rules={{
                required: "Phone Number is required",
                validate: (value) => {
                  const cleaned = value.replace(/\D/g, "");
                  if (cleaned.length < 10 || cleaned.length > 15) {
                    return "Invalid phone number";
                  }
                  return true;
                },
              }}
              render={({ field }) => (
                <FormItem className="w-full md:w-1/2">
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <PhoneInput
                      {...field}
                      country="ca"
                      enableSearch
                      placeholder="+1 647 555 1234"
                      specialLabel=""
                      inputStyle={{
                        width: "100%",
                        height: "38px",
                        fontSize: "14px",
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="subject"
              render={({ field }) => (
                <FormItem className="w-full pt-1 md:w-1/2">
                  <FormLabel>Subject</FormLabel>
                  <FormControl>
                    <select
                      {...field}
                      className="h-[38px] w-full rounded border border-gray-300 p-2 text-sm"
                    >
                      <option value="General Inquiry">General Inquiry</option>
                      <option value="Feedback">Feedback</option>
                      <option value="Support Request">Support Request</option>
                    </select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={control}
            name="work"
            rules={{ required: "Message is required" }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Message</FormLabel>
                <FormControl>
                  <Textarea placeholder="Enter your message" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex">
            <Button
              type="submit"
              className="bg-secondary w-[140px]"
              disabled={isProcessing}
            >
              {isProcessing ? "Sending..." : "Send Message"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ContactForm;
