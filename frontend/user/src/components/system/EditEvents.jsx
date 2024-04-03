"use client";
import React, { useEffect, useState } from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from '@/components/ui/button';
import { useUserContext } from '@/context/UserContext';
import DatePicker from '@/components/ui/DatePicker';
import { useToast } from "@/components/ui/use-toast";
import axios from "axios";

export default function EditEvents({ id }) {

    const { user } = useUserContext();
    const [data, setData] = useState(null);
    const isPro = user.user.isPro;
    const defaultMaxParticipants = isPro ? '' : '50';
    const [eventName, setEventName] = useState('');
    const [creator, setCreator] = useState(user.userId);
    const [description, setDescription] = useState('');
    const [maxParticipants, setMaxParticipants] = useState(defaultMaxParticipants);
    const [startDate, setStartDate] = useState(null);
    const { toast } = useToast();
    const [loading, setLoading] = useState(false);

    const handleStartDateSelect = (date) => {
        setStartDate(date);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_BASEURL}/events/rooms/${id}`);
                setData(response.data);
                const createdAtDate = new Date(response.data.createdAt);
                setStartDate(createdAtDate);
                setEventName(response.data.name);
                setDescription(response.data.description);
            } catch (error) {
                console.error('Error fetching data:', error);
                toast({
                    variant: "destructive",
                    title: `${error.response.data.message} - Error fetching event!`,
                    description: `${error.message} - At ${new Date()}, our system detected a new login try from your IP.`,
                })
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    const handleUpdateEvent = async () => {
        setLoading(true);
        try {
            const updatedEventData = {
                name: eventName,
                description: description,
                maxParticipants: maxParticipants,
                startDate: startDate
            };
            const response = await axios.put(`${process.env.NEXT_PUBLIC_BASEURL}/events/rooms/${id}`, updatedEventData);
            toast({
                title: "Event Updated Successfully!",
                description: `${response.data.message} - At ${new Date()}, our system detected a Login from your IP.`
            });
        } catch (error) {
            console.error('Error updating event:', error);
            toast({
                variant: "destructive",
                title: `${error.response.data.message} - Faild to Update event!`,
                description: `${error.message} - At ${new Date()}, our system detected a new login try from your IP.`,
            })
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className="space-y-8">
                <div className="space-y-2">
                    <h2 className="text-3xl font-bold">Edit an Event</h2>
                    <p className="text-gray-500 dark:text-gray-400">Fill out the form below to edit your event.</p>
                </div>
                <div className="space-y-4 flex justify-center flex-col">
                    <div className="grid md:grid-cols-4 grid-cols-1 gap-4 w-full">
                        <div className="space-y-2">
                            <Label htmlFor="event-name">Event Name</Label>
                            <Input id="event-name" placeholder="Enter the event name" value={eventName} disabled={loading} onChange={(e) => setEventName(e.target.value)} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="creator">Creator</Label>
                            <Input id="creator" placeholder="Enter your name" value={`@${user.user.username}`} disabled={true} />
                        </div>
                        <div className="space-y-2">
                            <Label className="flex-initial" htmlFor="max-participants">
                                Maximum Number Participants
                            </Label>
                            <Input
                                id="max-participants"
                                min="0"
                                type="number"
                                max={isPro ? '' : '50'}
                                value={maxParticipants || ''}
                                disabled={!isPro}
                                onChange={(e) => setMaxParticipants(e.target.value)}
                            />
                        </div>
                        <div className="space-y-2 w-full flex flex-col gap-2">
                            <Label htmlFor="start-date">Start Date</Label>
                            <DatePicker disabled={loading} onSelectDate={handleStartDateSelect} value={startDate} />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea disabled={loading} className="min-h-[200px]" id="description" placeholder="Enter the event description" value={description} onChange={(e) => setDescription(e.target.value)} />
                    </div>
                    <Button className="mx-auto" disabled={loading} onClick={handleUpdateEvent}>
                        {loading && (
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
                        Update Event
                    </Button>
                </div>
            </div>
        </>
    )
}
