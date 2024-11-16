"use client";

import { useCallback, useState } from "react";
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
import { useUser } from "@clerk/nextjs";
import { updateUserInfo } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import { UserInfo } from "@/types/type";

const formSchema = z.object({
  name: z.string().min(2, { message: "Username must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phone: z.string().min(10, { message: "Please enter a valid phone number" }),
  profilePic: z.string().url({ message: "Please enter a valid URL" }).optional(),
  age: z.number().int().min(0, { message: "Please enter a valid age" }).optional(),
  maritalStatus: z.string().min(1, { message: "Please enter a valid marital status" }).optional(),
  sex: z.string().min(1, { message: "Please select your gender" }).optional(),
  address: z.string().min(2, { message: "Please enter a valid address" }).optional(),
  occupation: z.string().min(2, { message: "Please enter a valid occupation" }).optional(),
});

export function ProfileForm({ memberInfo }: { memberInfo: UserInfo }) {
  const { toast } = useToast();
  const { user } = useUser();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: memberInfo,
  });

  const handleFormUpdate = useCallback(
    async (data: UserInfo) => {
      if (!user) {
        toast({ title: "No user found", variant: "destructive" });
        return;
      }

      setIsSubmitting(true);

      try {
        await updateUserInfo(user.id, data);
        toast({ title: "Member info updated successfully" });
      } catch (error) {
        toast({ title: "Error updating member data", variant: "destructive" });
        console.error("Error updating member data:", error);
      } finally {
        setIsSubmitting(false);
      }
    },
    [user, toast]
  );

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleFormUpdate)} className="space-y-8">
        {Object.keys(formSchema.shape).map((field) => (
          <FormField
            key={field}
            control={form.control}
            name={field as keyof typeof formSchema.shape}
            render={({ field: input }) => (
              <FormItem>
                <FormLabel>{field}</FormLabel>
                <FormControl>
                  <Input placeholder={`Enter your ${field}`} {...input} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Updating..." : "Submit"}
        </Button>
      </form>
    </Form>
  );
}
