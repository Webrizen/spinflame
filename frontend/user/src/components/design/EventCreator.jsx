"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

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

export default function EventCreator({ id }) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_BASEURL}/auth/users/${id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const userData = await response.json();
                setData(userData);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);
    return (
        <Link href={`/@${data?.user.username}`} className='w-full dark:bg-[rgba(225,225,225,0.1)] bg-[rgba(0,0,0,0.01)] border dark:border-[rgba(225,225,225,0.1)] border-[rgba(0,0,0,0.1)] py-2 px-2 rounded-lg backdrop-blur-3xl grid grid-cols-[.5fr_1fr] gap-2'>
            <div className='w-full'>
                <img src="https://placehold.co/500x500" alt='Creator' className='w-full h-auto aspect-square rounded-xl border dark:border-[rgba(225,225,225,0.1)] border-[rgba(0,0,0,0.1)]' />
            </div>
            <div className='w-full flex flex-col p-1'>
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <>
                        <h1 className='text-md font-bold'>{`${data?.user.firstName} ${data?.user.lastName}`}</h1>
                        <p className='text-sm dark:text-slate-300 text-slate-500'>@{data?.user.username}</p>
                        <span className='text-xs dark:text-slate-500'>joined {formatTimeAgo(data?.user.createdAt)}</span>
                    </>
                )}
            </div>
        </Link>
    )
}
