"use client";
import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useUserContext } from "@/context/UserContext";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { Overview } from "@/components/system/overview";
import { RecentSales } from "@/components/system/recent-sales";

export default function page() {
  const { user } = useUserContext();
  const userId = user.userId;
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  // Function to fetch data
  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASEURL}/events/rooms/user/${userId}`
      );
      setRooms(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error(`Signup unsuccessful - ${error.response.data.message}`, {
        duration: 4000,
        position: "bottom-center",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [userId]);

  // Calculate Total Number of Rooms Created
  const totalRooms = rooms.length;

  // Calculate Total Number of Participants
  const totalParticipants = rooms.reduce(
    (total, room) => total + room.participants.length,
    0
  );

  // Calculate Average Number of Participants per Room
  const averageParticipantsPerRoom =
    totalRooms > 0 ? totalParticipants / totalRooms : 0;

  // Calculate the number of upcoming rooms
  const upcomingRooms = rooms.filter(
    (room) => new Date(room.startDate) > new Date()
  ).length;

  return (
    <>
      <Toaster />
      <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-4 w-full py-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Number of Rooms Created
            </CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-6 w-6 text-muted-foreground"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
              />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">{totalRooms || 0}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Number of Participants:
            </CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-6 w-6 text-muted-foreground"
            >
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">{totalParticipants || 0}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Average Number of Participants
            </CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-6 w-6 text-muted-foreground"
            >
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">
              {averageParticipantsPerRoom.toFixed(2) || 0}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Upcoming Rooms
            </CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-6 w-6 text-muted-foreground"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">{upcomingRooms || 0}</div>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="md:col-span-4">
          <CardHeader>
            <CardTitle>Overview</CardTitle>
          </CardHeader>
          <CardContent className="md:pl-2 pl-0">
            <Overview RoomData={rooms} />
          </CardContent>
        </Card>
        <Card className="md:col-span-3">
          <CardHeader>
            <CardTitle>Recent Winners From Your Events</CardTitle>
            <CardDescription>congratulations to all the  winners who participated.</CardDescription>
          </CardHeader>
          <CardContent>
            <RecentSales data={rooms} />
          </CardContent>
        </Card>
      </div>
    </>
  );
}
