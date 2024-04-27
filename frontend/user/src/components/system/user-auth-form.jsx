"use client";
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FcGoogle } from "react-icons/fc";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

export function UserAuthForm({ className, ...props }) {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedRole, setSelectedRole] = useState("creator");

  const handleRoleChange = (role) => {
    setSelectedRole(role);
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const username = event.target.username.value;
      const email = event.target.email.value;
      const password = event.target.password.value;
      const firstName = event.target.firstName.value;
      const lastName = event.target.lastName.value;

      if (!username || !email || !password || !firstName || !lastName) {
        toast({
          variant: "destructive",
          title: "Please Fill Out All Fields",
          description: `At ${new Date()}, our system detected a new signup try from your IP which was unsuccessful.`,
        });
        setIsLoading(false);
      }

      // Send signup request to your backend
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASEURL}/auth/register`,
        {
          firstName,
          lastName,
          username,
          email,
          role: selectedRole,
          password,
        }
      );

      // Handle successful signup
      console.log("Signup successful:", response.data);
      toast.success(`Signup successful - ${response?.data?.message}`, {
        duration: 4000,
        position: 'bottom-center',
      });
      // Reset loading state after a brief delay (for demo purposes)
      setTimeout(() => {
        setIsLoading(false);
      }, 3000);
    } catch (error) {
      // Handle signup errors
      console.error("Signup error:", error);
      toast.error(`Signup unsuccessful - ${error.response.data.message}`, {
        duration: 4000,
        position: 'bottom-center',
      });
      // Reset loading state after a brief delay (for demo purposes)
      setTimeout(() => {
        setIsLoading(false);
      }, 3000);
    }
  };

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <Toaster />
      <form onSubmit={onSubmit}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="firstName">
              First Name
            </Label>
            <Input
              id="firstName"
              placeholder="First Name"
              type="text"
              autoCapitalize="none"
              autoComplete="text"
              autoCorrect="off"
              disabled={isLoading}
            />
            <Label className="sr-only" htmlFor="lastName">
              Last Name
            </Label>
            <Input
              id="lastName"
              placeholder="Last Name"
              type="text"
              autoCapitalize="none"
              autoComplete="text"
              autoCorrect="off"
              disabled={isLoading}
            />
            <Label className="sr-only" htmlFor="username">
              UserName
            </Label>
            <Input
              id="username"
              placeholder="@username"
              type="text"
              autoCapitalize="none"
              autoComplete="text"
              autoCorrect="off"
              disabled={isLoading}
            />
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
            />
            <Label className="sr-only" htmlFor="password">
              Password
            </Label>
            <Input
              id="password"
              placeholder="Password"
              type="password"
              autoCapitalize="none"
              autoComplete="password"
              autoCorrect="off"
              disabled={isLoading}
            />
            <div className="flex flex-row justify-between gap-2 items-center w-full">
              <div
                className={`flex w-full items-center px-3 py-2 rounded-lg cursor-pointer ${
                  selectedRole === "creator"
                    ? "dark:bg-slate-200 dark:text-slate-950 border border-slate-800"
                    : " dark:bg-slate-950 dark:text-slate-200"
                }`}
                onClick={() => handleRoleChange("creator")}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  className="mr-2 w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
                Creator
              </div>
              <div
                className={`flex w-full items-center px-3 py-2 rounded-lg cursor-pointer ${
                  selectedRole === "user"
                    ? "dark:bg-slate-200 dark:text-slate-950 border border-slate-800"
                    : " dark:bg-slate-950 dark:text-slate-200"
                }`}
                onClick={() => handleRoleChange("user")}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  className="mr-2 w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
                Audience
              </div>
            </div>
          </div>
          <Button disabled={isLoading}>
            {isLoading && (
              <svg
                className="animate-spin h-4 w-4 mr-2 text-red-500"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            )}
            Sign In with Email
          </Button>
        </div>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-white dark:bg-slate-950 rounded-full px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <Button
        variant="outline"
        type="button"
        disabled={isLoading}
        title="Not Supported Currently"
        className="cursor-not-allowed"
      >
        <FcGoogle className="mr-2 h-4 w-4" />
        Google
      </Button>
    </div>
  );
}
