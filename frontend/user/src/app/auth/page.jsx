"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { Button, buttonVariants } from '@/components/ui/button';
import { UserAuthForm } from '@/components/system/user-auth-form';
import { UserLoginForm } from '@/components/system/user-login-form';

export default function page() {
    const [isNewUser, setNewUser] = useState(false);

    const toggleForm = () => {
        setNewUser(!isNewUser);
    };
    return (
        <>
            <div className="container relative md:min-h-screen h-screen flex flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
                <Button variant="ghost" className="absolute right-4 top-4 md:right-8 md:top-8" onClick={toggleForm}>
                {isNewUser ? 'New User? Signup here!' : 'Already have an account? Login here!'}
                </Button>
                <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r dark:border-slate-700">
                    <div className="absolute inset-0 bg-[url('/login-bg.png')] bg-center bg-cover" />
                    <Link href="/" className="relative z-20 flex items-center text-lg font-medium">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="mr-2 h-6 w-6"
                        >
                            <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
                        </svg>
                        Spinflame LLP.
                    </Link>
                    <div className="relative z-20 mt-auto">
                        <blockquote className="space-y-2">
                            <p className="text-lg">
                                &ldquo;Embrace the journey of wellness with each choice you make; every step, every meal, every breath is a testament to your commitment to a vibrant, healthier you.&rdquo;
                            </p>
                            <footer className="text-sm">Sofia Davis</footer>
                        </blockquote>
                    </div>
                </div>
                <div className="lg:p-8">
                    <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                        <div className="flex flex-col space-y-2 text-center">
                            <h1 className="text-2xl font-semibold tracking-tight">
                                {isNewUser ? 'Login to your account' : 'Create an account'}
                            </h1>
                            <p className="text-sm text-muted-foreground">
                                {isNewUser
                                    ? 'Enter your email and password to log in'
                                    : 'Enter your email below to create your account'}
                            </p>
                        </div>
                        {isNewUser ? <UserLoginForm /> : <UserAuthForm />}
                        <p className="px-8 text-center text-sm text-muted-foreground">
                            By clicking continue, you agree to our{" "}
                            <Link
                                href="/terms-and-conditions"
                                className="underline underline-offset-4 hover:text-primary"
                            >
                                Terms of Service
                            </Link>{" "}
                            and{" "}
                            <Link
                                href="/privacy-policy"
                                className="underline underline-offset-4 hover:text-primary"
                            >
                                Privacy Policy
                            </Link>
                            .
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}