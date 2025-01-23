"use client";

import { zodResolver } from "@hookform/resolvers/zod";
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
import { PhoneOutgoing } from "lucide-react";

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
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: demoOptions[0], // Set default values from the first option
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
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
            >
              Run Demo
              <PhoneOutgoing className="w-3 h-3" size={12} />
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
