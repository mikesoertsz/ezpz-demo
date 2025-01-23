"use client";

import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
  { name: "Mike", phoneNumber: "+351912580952" },
  { name: "Jordi", phoneNumber: "+31641532184" },
];

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  phoneNumber: z.string().min(10, {
    message: "Phone number must be at least 10 characters.",
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
      authorization: process.env.BLAND_API_KEY || "",
      "Content-Type": "application/json",
    };

    const data = {
      phone_number: values.phoneNumber,
      pathway_id: "910b8c10-57fc-4f3c-bafc-c4a7ea3bbcdc",
      task: "",
      voice: "2c5f8cc1-5a86-4551-b143-959b53a8d2ba",
      background_track: "office",
      first_sentence: "",
      wait_for_greeting: true,
      block_interruptions: true,
      interruption_threshold: 123,
      model: "turbo",
      temperature: 123,
      keywords: [""],
      pronunciation_guide: [{}],
      transfer_phone_number: "",
      transfer_list: {},
      language: "en",
      pathway_version: 123,
      local_dialing: true,
      voicemail_sms: true,
      dispatch_hours: {},
      sensitive_voicemail_detection: true,
      noise_cancellation: true,
      ignore_button_press: true,
      language_detection_period: 123,
      language_detection_options: [""],
      timezone: "",
      request_data: {
        name: values.name,
        contact: values.phoneNumber,
      },
      tools: [{}],
      start_time: "",
      voicemail_message: "",
      voicemail_action: {},
      retry: {},
      max_duration: 123,
      record: true,
      from: "+14155322237",
      webhook: "",
      webhook_events: [""],
      metadata: {},
      analysis_preset: "",
    };

    const options = {
      method: "POST",
      headers: headers,
      body: JSON.stringify(data),
    };

    try {
      const response = await fetch("https://api.bland.ai/v1/calls", options);
      const result = await response.json();
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
