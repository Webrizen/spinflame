"use client";
import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FcGoogle } from "react-icons/fc";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { useUserContext } from "@/context/UserContext";
import { useRouter } from "next/navigation";

export function UserLoginForm({ className, ...props }) {
  const { login } = useUserContext();
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);
  const onSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const username = event.target.username.value;
      const password = event.target.password.value;

      // Send login request to your backend
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASEURL}/auth/login`,
        {
          username,
          password,
        }
      );

      // Handle successful login
      console.log("Login successful:", response.data);
      toast.success(`Login successful - ${response?.data?.message}`, {
        duration: 4000,
        position: "bottom-center",
      });
      login(response.data);
      setIsLoading(false);
      router.push("/dashboard");
    } catch (error) {
      // Handle login errors
      console.error("Login error:", error);
      toast.error(`Login error - ${error.response.data.message}`, {
        duration: 4000,
        position: 'bottom-center',
      });
      setIsLoading(false);
    }
  };

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <Toaster />
      <form onSubmit={onSubmit}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="username">
              username
            </Label>
            <Input
              id="username"
              placeholder="@username"
              type="username"
              autoCapitalize="none"
              autoComplete="username"
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
        <FcGoogle className="mr-2 h-4 w-4" /> Google
      </Button>
    </div>
  );
}
