"use client";
import React, { useState } from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from '@/components/ui/button';
import { useUserContext } from '@/context/UserContext';
import DatePicker from '@/components/ui/DatePicker';

export default function CreateEvent() {
    const { user } = useUserContext();
    const isPro = user.user.isPro;
    const defaultMaxParticipants = isPro ? '' : '50';
    const [maxParticipants, setMaxParticipants] = useState(defaultMaxParticipants);
    const handleMaxParticipantsChange = (event) => {
        setMaxParticipants(event.target.value);
    };

    return (
        <>
            <div className="space-y-8">
                <div className="space-y-2">
                    <h2 className="text-3xl font-bold">Create an Event</h2>
                    <p className="text-gray-500 dark:text-gray-400">Fill out the form below to create your event.</p>
                </div>
                <div className="space-y-4 flex justify-center flex-col">
                    <div className="grid grid-cols-3 gap-4 w-full">
                        <div className="space-y-2">
                            <Label htmlFor="event-name">Event Name</Label>
                            <Input id="event-name" placeholder="Enter the event name" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="creator">Creator</Label>
                            <Input id="creator" placeholder="Enter your name" disabled={true} value={`@${user.user.username}`} />
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
                                value={maxParticipants}
                                onChange={handleMaxParticipantsChange}
                                disabled={!isPro}
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea className="min-h-[200px]" id="description" placeholder="Enter the event description" />
                    </div>
                    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                        <div className="space-y-2 w-full flex flex-col">
                            <Label htmlFor="start-date">Start Date</Label>
                            <DatePicker />
                        </div>
                        <div className="space-y-2 w-full flex flex-col">
                            <Label htmlFor="end-date">End Date</Label>
                            <DatePicker />
                        </div>
                    </div>
                    <Button className="mx-auto">Create Event</Button>
                </div>
            </div>
        </>
    )
}
