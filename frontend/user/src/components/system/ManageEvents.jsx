"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useUserContext } from "@/context/UserContext";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";
import Link from "next/link";
import CountdownTimer from "../design/CountdownTimer";

const gradients = [
  "bg-gradient-to-r from-violet-600 to-indigo-600",
  "bg-gradient-to-r from-emerald-500 to-emerald-900",
  "bg-gradient-to-r from-rose-400 to-red-500",
  "bg-gradient-to-r from-purple-500 to-purple-900",
  "bg-gradient-to-r from-pink-500 to-rose-500",
  "bg-gradient-to-r from-stone-500 to-stone-700",
  "bg-gradient-to-r from-blue-200 to-cyan-200",
  "bg-gradient-to-r from-teal-200 to-teal-500",
  "bg-gradient-to-r from-red-500 to-orange-500",
  "bg-gradient-to-r from-violet-200 to-pink-200",
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
    return `${diffYears} year${diffYears > 1 ? "s" : ""} ago`;
  } else if (diffMonths > 0) {
    return `${diffMonths} month${diffMonths > 1 ? "s" : ""} ago`;
  } else if (diffDays > 0) {
    return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;
  } else if (diffHours > 0) {
    return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;
  } else if (diffMinutes > 0) {
    return `${diffMinutes} minute${diffMinutes > 1 ? "s" : ""} ago`;
  } else {
    return `${diffSeconds} second${diffSeconds > 1 ? "s" : ""} ago`;
  }
}

export default function ManageEvents() {
  const { user } = useUserContext();
  const userId = user.userId;
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");

  // Function to generate random gradient class
  const getRandomGradient = () => {
    const randomIndex = Math.floor(Math.random() * gradients.length);
    return gradients[randomIndex];
  };

  // Function to fetch data
  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASEURL}/events/rooms/user/${userId}`
      );
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [userId]);

  // Function to handle delete event
  const handleDelete = async (eventId) => {
    try {
      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_BASEURL}/events/rooms/${eventId}`
      );
      toast({
        title: "Event Deleted successfully!",
        description: `${
          response.message
        } - At ${new Date()}, our system detected a Login from your IP.`,
      });
      fetchData();
    } catch (error) {
      console.error("Error deleting event:", error);
      toast({
        variant: "destructive",
        title: `${error.message} - Faild to create event!`,
        description: `something went wrong while deleting this event - At ${new Date()}, our system detected a new request to our server from your IP.`,
      });
    }
  };

  // Function to filter events based on search query
  const filteredEvents = data
    ? data.filter((event) =>
        event.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  return (
    <section className="w-full min-h-screen pb-16">
      <div className="flex w-full items-center space-x-2 md:mt-0 mt-2">
        <Input
          type="search"
          placeholder="Search Events By Title"
          className="w-full"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <div className="inline-flex w-10 h-10 justify-center items-center dark:bg-[rgba(225,225,225,0.08)] bg-[rgba(0,0,0,0.05)] hover:bg-slate-100 dark:hover:bg-[rgba(225,225,225,0.1)] rounded-xl cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>
        </div>
      </div>
      <div className="grid md:grid-cols-4 grid-cols-1 gap-4 my-3">
        {loading ? (
          [...Array(7)].map((item, index) => (
            <div className="w-full flex flex-col gap-2">
              <div className="h-[150px] w-full dark:bg-slate-500 bg-slate-200 animate-pulse rounded-xl"></div>
              <div className="h-4 w-full dark:bg-slate-500 bg-slate-200 animate-pulse rounded-md"></div>
              <div className="h-2 w-full dark:bg-slate-500 bg-slate-200 animate-pulse rounded-md"></div>
            </div>
          ))
        ) : (
          <>
            {filteredEvents.length > 0 ? (
              filteredEvents.map((item, index) => (
                <div key={index} className="w-full flex flex-col gap-2">
                  <div
                    className={`h-[150px] w-full rounded-xl ${getRandomGradient()} relative overflow-hidden`}
                  >
                    <div
                      className="absolute top-0 right-0 p-2 cursor-pointer bg-red-50 hover:bg-red-100 text-red-500 rounded-bl-xl z-50"
                      title="Delete"
                      onClick={() => handleDelete(item._id)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-5 h-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                        />
                      </svg>
                    </div>
                    <div
                      className="absolute top-0 left-0 p-2 cursor-pointer bg-emerald-50 hover:bg-emerald-100 text-emerald-500 rounded-br-xl z-50"
                      title="Time left to start event"
                    >
                      <CountdownTimer timestamp={item.startDate} />
                    </div>
                    <Link
                      href={`/dashboard/manage-events/${item._id}`}
                      className="absolute top-[48px] right-0 p-2 cursor-pointer bg-blue-50 hover:bg-blue-100 text-blue-500 rounded-bl-xl rounded-tl-xl z-50"
                      title="Edit"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-5 h-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                        />
                      </svg>
                    </Link>
                  </div>
                  <h1 className="px-2 text-xl font-bold">
                    {item.name || "..."}
                  </h1>
                  <div className="w-full flex flex-row gap-2 px-2 items-center text-xs whitespace-nowrap dark:text-slate-500">
                    <span>{formatTimeAgo(item.createdAt)}</span>
                    <span>•</span>
                    <span>{item.maxParticipants} participants</span>
                  </div>
                  <p className="px-2 text-sm line-clamp-3">
                    {item.description || "..."}
                  </p>
                </div>
              ))
            ) : (
              <>
                <div className="flex justify-start items-center w-full py-4">
                  <p className="text-slate-500 text-3xl font-bold">
                    No events found.
                  </p>
                </div>
              </>
            )}
          </>
        )}
      </div>
    </section>
  );
}
