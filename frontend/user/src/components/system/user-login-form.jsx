"use client";
import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FcGoogle } from "react-icons/fc";
import { useToast } from "@/components/ui/use-toast";
import axios from "axios";
import { useUserContext } from "@/context/UserContext";
import { useRouter } from "next/navigation";

export function UserLoginForm({ className, ...props }) {
    // const { login } = useUserContext();
    const router = useRouter();
    const [isLoading, setIsLoading] = React.useState(false)
    const { toast } = useToast();
    const onSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);

        try {
            const username = event.target.username.value;
            const password = event.target.password.value;

            // Send login request to your backend
            const response = await axios.post(`${process.env.NEXT_PUBLIC_BASEURL}/auth/login`, {
                username,
                password,
            });

            // Handle successful login
            console.log('Login successful:', response.data);
            toast({
                title: "Login successful",
                description: `At ${new Date()}, our system detected a Login from your IP.`,
            })
            // login(response.data);
            setIsLoading(false);
            router.push('/');
        } catch (error) {
            // Handle login errors
            console.error('Login error:', error);
            toast({
                variant: "destructive",
                title: "Login unsuccessful",
                description: `At ${new Date()}, our system detected a new login try from your IP.`,
            })
            setIsLoading(false);
        }
    };


    return (
        <div className={cn("grid gap-6", className)} {...props}>
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
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="mr-2 h-4 w-4 animate-spin">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
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
            <Button variant="outline" type="button" disabled={isLoading} title="Not Supported Currently" className="cursor-not-allowed">
                {isLoading ? (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="mr-2 h-4 w-4 animate-spin">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                    </svg>
                ) : (
                    <FcGoogle className="mr-2 h-4 w-4" />
                )}{" "}
                Google
            </Button>
        </div>
    )
}