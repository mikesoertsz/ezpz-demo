"use client";

import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import axios from "axios";

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"; // Import Select components
import { Separator } from "@/components/ui/separator";
import { LoaderCircle, PhoneOutgoing } from "lucide-react";

// Array of options to preload the form
const demoOptions = [
  { name: "Mike", phoneNumber: "+351912580952", companyName: "Drifter" },
  {
    name: "Jordi",
    phoneNumber: "+31641532184",
    companyName: "E.Z.P.Z Recruitment",
  },
];

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  phoneNumber: z.string().min(10, {
    message: "Phone number must be at least 10 characters.",
  }),
  companyName: z.string().min(2, {
    message: "Company name must be at least 2 characters.",
  }),
});

export function FormVoiceDemo() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: demoOptions[0], // Set default values from the first option
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    const headers = {
      Authorization: process.env.BLAND_API_KEY || "",
      "x-bland-org-id": "13bd3e2f-0df8-417f-80ab-07e6a75ecbd3",
      "Content-Type": "application/json",
    };

    const data = {
      phone_number: values.phoneNumber,
      from: "+14155322237",
      task: "",
      model: "turbo",
      language: "en",
      voice: "2c5f8cc1-5a86-4551-b143-959b53a8d2ba",
      voice_settings: {},
      pathway_id: "910b8c10-57fc-4f3c-bafc-c4a7ea3bbcdc",
      local_dialing: true,
      max_duration: 123,
      answered_by_enabled: false,
      wait_for_greeting: true,
      noise_cancellation: true,
      record: true,
      amd: false,
      interruption_threshold: 123,
      voicemail_message: "",
      temperature: 123,
      transfer_phone_number: "",
      transfer_list: {},
      metadata: {},
      pronunciation_guide: [{}],
      start_time: "",
      background_track: "office",
      request_data: {
        name: values.name,
        contact: values.phoneNumber,
        company: values.companyName,
      },
      tools: [{}],
      dynamic_data: [],
      analysis_preset: "",
      analysis_schema: {},
      webhook: "",
      calendly: {},
      timezone: "",
    };

    try {
      const response = await axios.post("https://api.bland.ai/v1/calls", data, {
        headers,
      });
      const result = response.data;
      if (result.status === "success") {
        toast({
          title: "Scheduled: Catch up",
          description: "Call successfully queued.",
        });
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      console.error("Error initiating call:", error);
      toast({
        title: "Failed to initiate call",
        description: (error as Error).message || "Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  // 3. Handle selection change
  function handleSelectChange(index: number) {
    const selectedOption = demoOptions[index];
    form.reset(selectedOption); // Reset form with selected option
  }

  return (
    <div className="border border-slate-200 rounded-lg w-[400px] shadow-md bg-white">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="">
          <div className="w-full p-6 py-3 pt-5">
            <Select
              onValueChange={(value) => handleSelectChange(Number(value))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a demo" />
              </SelectTrigger>
              <SelectContent>
                {demoOptions.map((option, index) => (
                  <SelectItem key={index} value={String(index)}>
                    {option.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Separator className="my-1" />
          <div className="flex gap-6 p-6 py-2 bg-slate-50">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Mike" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input placeholder="+351912580952" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex gap-6 p-6 py-2 bg-slate-50">
            <FormField
              control={form.control}
              name="companyName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Company A" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Separator className="" />
          <div className="p-6 py-3">
            <Button
              type="submit"
              className="w-full flex gap-2 items-center justify-center"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <LoaderCircle className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  Run Demo
                  <PhoneOutgoing className="w-3 h-3" size={12} />
                </>
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
