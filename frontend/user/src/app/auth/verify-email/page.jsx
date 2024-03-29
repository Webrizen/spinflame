"use client";
import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import axios from 'axios';
import { useToast } from '@/components/ui/use-toast';

export default function page() {
    const [isLoading, setIsLoading] = useState(true);
    const searchParams = useSearchParams();
    const token = searchParams.get('token');
    const [verificationStatus, setVerificationStatus] = useState(null);
    const { toast } = useToast();
    const router = useRouter();

    // Function to handle email verification
    useEffect(() => {
        axios.get(`${process.env.NEXT_PUBLIC_BASEURL}/auth/verify-email/${token}`)
            .then(response => {
                setVerificationStatus('success');
                toast({
                    title: "Email verified successfully! ",
                    description: `${response.data.message}, you may now login! - At ${new Date()}, our system detected a new signup from your IP. you may countinue login.`,
                })
                router.push('/auth');
            })
            .catch(error => {
                setVerificationStatus('error');
                toast({
                    variant: "destructive",
                    title: "Failed to verify email. Please try again.",
                    description: `${error.response.data.message} - At ${new Date()}, our system detected a new signup try from your IP.`,
                })
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, [token]);

    return (
        <Suspense>
            <div className="flex flex-col items-center justify-center min-h-screen">
            {isLoading ? (
                <p className='flex flex-row items-center text-center text-xl'>
                <svg
                    className="animate-spin h-10 w-10 mr-4 text-red-500"
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
                verifying...
                </p>
            ) : (
                <div className="text-center">
                    {verificationStatus === 'success' ? (
                        <p className="text-green-500">Email verified successfully!</p>
                    ) : (
                        <p className="text-red-500">Failed to verify email. Please try again.</p>
                    )}
                </div>
            )}
        </div>
        </Suspense>
    );
}