"use client";
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from 'axios';
import Link from 'next/link';
import CountdownTimer from '../design/CountdownTimer';
import Creator from './Creator';

const gradients = [
    'bg-gradient-to-r from-violet-600 to-indigo-600',
    'bg-gradient-to-r from-emerald-500 to-emerald-900',
    'bg-gradient-to-r from-rose-400 to-red-500',
    'bg-gradient-to-r from-purple-500 to-purple-900',
    'bg-gradient-to-r from-pink-500 to-rose-500',
    'bg-gradient-to-r from-stone-500 to-stone-700',
    'bg-gradient-to-r from-blue-200 to-cyan-200',
    'bg-gradient-to-r from-teal-200 to-teal-500',
    'bg-gradient-to-r from-red-500 to-orange-500',
    'bg-gradient-to-r from-violet-200 to-pink-200'
];

function formatTimeAgo(timestamp) {
    const currentDate = new Date();
    const createdAtDate = new Date(timestamp);
    const diffMilliseconds = currentDate - createdAtDate;
    const diffSeconds = Math.floor(diffMilliseconds / 1000);
    const diffMinutes = Math.floor(diffSeconds / 60);
    const diffHours = Math.floor(diffMinutes / 60);
    const diffDays = Math.floor(diffHours / 24);
    const diffMonths = Math.floor(diffDays / 30);
    const diffYears = Math.floor(diffDays / 365);

    if (diffYears > 0) {
        return `${diffYears} year${diffYears > 1 ? 's' : ''} ago`;
    } else if (diffMonths > 0) {
        return `${diffMonths} month${diffMonths > 1 ? 's' : ''} ago`;
    } else if (diffDays > 0) {
        return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    } else if (diffHours > 0) {
        return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    } else if (diffMinutes > 0) {
        return `${diffMinutes} minute${diffMinutes > 1 ? 's' : ''} ago`;
    } else {
        return `${diffSeconds} second${diffSeconds > 1 ? 's' : ''} ago`;
    }
}

export default function Events() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');

    // Function to generate random gradient class
    const getRandomGradient = () => {
        const randomIndex = Math.floor(Math.random() * gradients.length);
        return gradients[randomIndex];
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_BASEURL}/events/rooms`);
                setData(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // Function to filter events based on search query
    const filteredEvents = data ? data.filter(event => event.name.toLowerCase().includes(searchQuery.toLowerCase())) : [];

    return (
        <section className='w-full min-h-screen pb-16 pt-12'>
            <div className='container mx-auto'>
                <div className="flex w-full items-center space-x-2 md:mt-0 mt-2">
                    <Input type="search" placeholder="Search Events By Title" className="w-full" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                    <div className="inline-flex w-10 h-10 justify-center items-center dark:bg-[rgba(225,225,225,0.08)] bg-[rgba(0,0,0,0.05)] hover:bg-slate-100 dark:hover:bg-[rgba(225,225,225,0.1)] rounded-xl cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                        </svg>
                    </div>
                </div>
                <div className='grid md:grid-cols-4 grid-cols-1 gap-4 my-4'>
                    {loading ? (
                        [...Array(7)].map((item, index) => (
                            <div className='w-full flex flex-col gap-2' key={index}>
                                <div className='h-[150px] w-full dark:bg-slate-500 bg-slate-200 animate-pulse rounded-xl'></div>
                                <div className='h-4 w-full dark:bg-slate-500 bg-slate-200 animate-pulse rounded-md'></div>
                                <div className='h-2 w-full dark:bg-slate-500 bg-slate-200 animate-pulse rounded-md'></div>
                            </div>
                        ))
                    ) : (
                        filteredEvents.map((item, index) => (
                            <Link href={`/events/${item._id}`} key={index} className='w-full flex flex-col gap-2'>
                                <div className={`h-[150px] w-full rounded-xl ${getRandomGradient()} relative overflow-hidden`}>
                                    <div className="absolute top-0 left-0 p-2 cursor-pointer bg-emerald-50 hover:bg-emerald-100 text-emerald-500 rounded-br-xl z-50" title="Time left to start event">
                                        <CountdownTimer timestamp={item.startDate} />
                                    </div>
                                </div>
                                <h1 className='px-2 text-xl font-bold'>{item.name || "..."}</h1>
                                <div className='w-full flex flex-row gap-2 px-2 items-center text-xs whitespace-nowrap dark:text-slate-500'>
                                    <Creator id={item.creator} />
                                    <span>•</span>
                                    <span>{formatTimeAgo(item.createdAt)}</span>
                                    <span>•</span>
                                    <span>{item.maxParticipants} participants</span>
                                </div>
                                <p className='px-2 text-sm line-clamp-3'>{item.description || '...'}</p>
                            </Link>
                        ))
                    )}
                </div>
            </div>
        </section>
    )
}
