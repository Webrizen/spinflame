import React from 'react';
import { Separator } from '@/components/ui/separator';
import { CardTitle, CardDescription, CardHeader, CardContent, CardFooter, Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export default function page() {
    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-medium">Profile</h3>
                <p className="text-sm text-muted-foreground">
                    This is how others will see you on the site.
                </p>
            </div>
            <Separator />
            <div className="w-full">
                <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 relative">
                            <img
                                alt="Avatar"
                                className="rounded-full object-cover aspect-square"
                                height="150"
                                src="https://placehold.co/500x500"
                                width="150"
                            />
                            <div className="absolute -bottom-1 -right-1 backdrop-blur-3xl rounded-full p-1 cursor-pointer">
                                <UploadIcon className="w-5 h-5" />
                                <span className="sr-only">Change</span>
                            </div>
                        </div>
                        <div className="space-y-1.5">
                            <Label className="text-sm" htmlFor="avatar">
                                Profile Photo
                            </Label>
                            <Input accept="image/*" id="avatar" type="file" />
                        </div>
                    </div>
                    <div className="grid md:grid-cols-2 grid-cols-1 gap-2">
                        <div className="space-y-2">
                            <Label htmlFor="name">Name</Label>
                            <Input defaultValue="Jenny Wilson" id="name" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="username">Username</Label>
                            <Input defaultValue="jennywilson" id="username" />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="bio">Bio</Label>
                        <Textarea className="min-h-[100px]" id="bio" placeholder="Add a short bio to your profile." />
                    </div>
                    <div className='grid md:grid-cols-3 gap-2 grid-cols-1'>
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input defaultValue="jenny@example.com" id="email" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="website">Website</Label>
                            <Input id="website" placeholder="https://example.com" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="location">Location</Label>
                            <Input id="location" placeholder="City, Country" />
                        </div>
                    </div>
                </div>
                <CardFooter className="mt-6 flex flex-row justify-start items-center gap-3 p-0">
                    <Button>Save</Button>
                </CardFooter>
            </div>
        </div>
    )
}

function UploadIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="17 8 12 3 7 8" />
            <line x1="12" x2="12" y1="3" y2="15" />
        </svg>
    )
}
