"use client";
import React, { useEffect } from 'react';
import { useUserContext } from "@/context/UserContext";
import { useRouter } from 'next/navigation';
import { useToast } from "@/components/ui/use-toast";

export default function RouteGuard({ children }) {
    const { user } = useUserContext();
    const router = useRouter();
    const { toast } = useToast();

    useEffect(() => {
        if (!user) {
            router.push('/');
            toast({
                variant: "destructive",
                title: "You're Not Logged In. Please login to access this route.",
                description: `At ${new Date()}, our system detected that you attempted to access protected routes!`,
            })
        }
    }, [user]);

    if (!user) {
        return (
            <section className='flex justify-center items-center w-full min-h-screen'>
            <svg
                className="animate-spin h-8 w-8 text-red-700 mr-2"
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
            </svg> <span>Checking your connection...</span>
            </section>
        )
    }

    return <>{children}</>
}