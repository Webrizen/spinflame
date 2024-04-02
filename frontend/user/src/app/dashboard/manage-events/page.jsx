import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function page() {
    return (
        <section className='w-full min-h-screen pb-16'>
            <div className="flex w-full items-center space-x-2">
                <Input type="search" placeholder="Search Events" className="w-full" />
                <div className="inline-flex w-10 h-10 justify-center items-center dark:bg-[rgba(225,225,225,0.08)] bg-[rgba(0,0,0,0.05)] hover:bg-slate-100 dark:hover:bg-[rgba(225,225,225,0.1)] rounded-xl cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                    </svg>
                </div>
            </div>
            <div className='grid grid-cols-4 gap-4 my-3'>
                <div className='w-full flex flex-col gap-2'>
                    <div className='h-[150px] w-full bg-gradient-to-r from-violet-600 to-indigo-600 rounded-xl'></div>
                    <h1 className='px-2 text-xl font-bold'>Best Smartphones under 45k</h1>
                    <p className='px-2 text-sm'>By passing the io object to your router, you can access it within your route handlers and emit Socket.io events as needed. Adjust the rest of your route handlers in a similar manner to use the io object for emitting events.</p>
                </div>
            </div>
        </section>
    )
}
