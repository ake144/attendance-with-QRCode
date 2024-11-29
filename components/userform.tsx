"use client";

import { useCallback, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form"; 
import { z } from "zod";
import { UploadButton } from "@/lib/uploadthing";


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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"; 
import { useUser } from "@clerk/nextjs";
import { updateUserInfo } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import { UserInfo } from "@/types/type";


const formSchema = z.object({
  name: z.string().min(2, { message: "Username must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phone: z.string().min(10, { message: "Please enter a valid phone number" }).optional().nullable(),
  profilePic: z.string().min(2, { message: "Please upload a profile picture" }).url().optional().nullable(),
  age: z.coerce.number().min(0, { message: "Please enter a valid age" }).optional(),
  maritalStatus: z.enum(["Single", "Married"]).optional().nullable(),
  sex: z.enum(["Male", "Female"]).optional().nullable(),
  address: z.string().min(2, { message: "Please enter a valid address" }).optional().nullable(),
  occupation: z.string().min(2, { message: "Please enter a valid occupation" }).optional().nullable(),
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
        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("email", data.email);
        if (data.phone) formData.append("phone", data.phone);
        if (data.age) formData.append("age", data.age.toString());
        if (data.maritalStatus) formData.append("maritalStatus", data.maritalStatus);
        if (data.sex) formData.append("sex", data.sex);
        if (data.address) formData.append("address", data.address);
        if (data.occupation) formData.append("occupation", data.occupation);
        if (data.profilePic) formData.append("profilePic", data.profilePic);

        await updateUserInfo(user.id, formData);

        console.log('data',data.profilePic);

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
      <form onSubmit={form.handleSubmit(handleFormUpdate)} className="space-y-8 ">
        {/* Name Field */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="name">Name</FormLabel>
              <FormControl>
                <Input id="name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Email Field */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="email">Email</FormLabel>
              <FormControl>
                <Input id="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Phone Field */}
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="phone">Phone</FormLabel>
              <FormControl>
                <Input id="phone" {...field} value={field.value ?? ''} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />


         {/* Profile Picture Upload */}
         <FormField
          control={form.control}
          name="profilePic"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Profile Picture</FormLabel>
              <FormControl>
                <UploadButton
                  endpoint="imageUploader"
                  onClientUploadComplete={(res) => {
                    if (res && res[0]?.url) {
                      field.onChange(res[0].url);
                      form.setValue("profilePic", res[0].url);
                      toast({ title: "Profile picture uploaded successfully" });
                    }
                  }}
                  onUploadError={(error: Error) => {
                    toast({ title: `Error uploading image: ${error.message}`, variant: "destructive" });
                  }}
                />
              </FormControl>
              <FormMessage />
              {field.value && (
                <div className="mt-4">
                  <img src={field.value} alt="Profile" className="w-24 h-24 rounded-full" />
                </div>
              )}
            </FormItem>
          )}
        />


        {/* Age Field */}
        <FormField
          control={form.control}
          name="age"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="age">Age</FormLabel>
              <FormControl>
                <Input id="age" type="number" {...field} value={field.value ?? ''}  className="w-24"/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Marital Status Field */}
        <FormField
          control={form.control}
          name="maritalStatus"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="maritalStatus">Marital Status</FormLabel>
              <FormControl>
                <Select {...field} value={field.value ?? undefined}  onValueChange={(value) => field.onChange(value || null)}  >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Marital Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Single">Single</SelectItem>
                    <SelectItem value="Married">Married</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Gender Field */}
        <FormField
          control={form.control}
          name="sex"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="sex">Gender</FormLabel>
              <FormControl>
                <Select {...field} value={field.value ?? undefined} onValueChange={(value) => field.onChange(value || null)} >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Male">Male</SelectItem>
                    <SelectItem value="Female">Female</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Address Field */}
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="address">Address</FormLabel>
              <FormControl>
                <Input id="address" {...field} value={field.value ?? ''} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Occupation Field */}
        <FormField
          control={form.control}
          name="occupation"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="occupation">Occupation</FormLabel>
              <FormControl>
                <Input id="occupation" {...field} value={field.value ?? ''} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Updating..." : "Submit"}
        </Button>
      </form>
    </Form>
  );
}