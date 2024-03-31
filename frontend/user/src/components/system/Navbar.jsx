"use client";
import { useState } from "react";
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useUserContext } from "@/context/UserContext";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { setTheme } = useTheme();
    const { user, logout } = useUserContext();
    return (
        <>
            <header
                className="p-2 fixed md:bottom-2 md:top-auto top-2 w-full"
                style={{ zIndex: "99" }}
            >
                <div className="container mx-auto flex flex-row flex-wrap p-3 md:justify-normal justify-between items-center bg-[rgba(225,225,225,0.1)] backdrop-blur-2xl rounded-xl border border-slate-300  dark:border-slate-700">
                    <Link
                        href="/"
                        className="flex title-font font-medium items-center text-slate-700 dark:text-slate-200 mr-4 border-r-none md:border-r border-slate-300 pr-4 md:mb-0"
                    >
                        <img
                            src="/spinflame.png"
                            alt="Spinflame Logo"
                            className="w-8 h-8"
                        />
                        <span className="ml-3 text-xl md:block hidden">
                            Spinflame
                        </span>
                    </Link>
                    <nav
                        className={`lg:flex lg:flex-row flex-col flex-grow md:relative absolute md:w-auto w-full left-0 right-0 md:top-auto top-16 z-50 text-sm items-center ${isMenuOpen ? "grid grid-cols-2 bg-white dark:bg-slate-900 p-4" : " hidden"
                            }`}
                    >
                        <Link
                            href="/"
                            className="lg:inline-flex lg:w-auto px-3 py-2 rounded text-slate-700 dark:text-slate-300 items-center justify-center hover:bg-slate-100 dark:hover:bg-[rgba(225,225,225,0.1)]"
                        >
                            Home
                        </Link>
                        <Link
                            href="/events"
                            className="lg:inline-flex lg:w-auto px-3 py-2 rounded text-slate-700 dark:text-slate-300 items-center justify-center hover:bg-slate-100 dark:hover:bg-[rgba(225,225,225,0.1)]"
                        >
                            Events
                        </Link>
                        <Link
                            href="/about"
                            className="lg:inline-flex lg:w-auto px-3 py-2 rounded text-slate-700 dark:text-slate-300 items-center justify-center hover:bg-slate-100 dark:hover:bg-[rgba(225,225,225,0.1)]"
                        >
                            About
                        </Link>
                        <Link
                            href="/faq"
                            className="lg:inline-flex lg:w-auto px-3 py-2 rounded dark:text-slate-300 text-slate-700 items-center justify-center hover:bg-slate-100 dark:hover:bg-[rgba(225,225,225,0.1)]"
                        >
                            FAQs
                        </Link>
                        <Link
                            href="/contact"
                            className="lg:inline-flex lg:w-auto px-3 py-2 rounded dark:text-slate-300 text-slate-700 items-center justify-center hover:bg-slate-100 dark:hover:bg-[rgba(225,225,225,0.1)]"
                        >
                            Contact
                        </Link>
                    </nav>
                    <div className="flex justify-end items-center gap-1">
                        <Link href="/search"
                            className="inline-flex w-10 h-10 justify-center items-center hover:bg-slate-100 dark:hover:bg-[rgba(225,225,225,0.1)] rounded-xl"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                            </svg>
                        </Link>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" size="icon" className="!bg-transparent hover:!bg-slate-100 dark:hover:!bg-[rgba(225,225,225,0.1)] !rounded-xl">
                                    <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                                    <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                                    <span className="sr-only">Toggle theme</span>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="mt-4">
                                <DropdownMenuItem onClick={() => setTheme("light")}>
                                    Light
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => setTheme("dark")}>
                                    Dark
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => setTheme("system")}>
                                    System
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                        {(user ? (
                            <>
                                <DropdownMenu>
                                    <DropdownMenuTrigger>
                                        <Avatar className="w-10 h-10 rounded-xl cursor-pointer backdrop-blur-3xl hover:bg-[rgba(0,0,0,0.04)] flex justify-center items-center">
                                            <AvatarImage src="https://www.aapda.in/male.png" alt="@user" />
                                            <AvatarFallback>US</AvatarFallback>
                                        </Avatar>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end" className="mb-5">
                                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem><Link href="/dashboard" className="w-full">Dashboard</Link></DropdownMenuItem>
                                        <DropdownMenuItem><Link href="/dashboard/create-event" className="w-full">Create Event</Link></DropdownMenuItem>
                                        <DropdownMenuItem className="bg-red-50 text-red-400 cursor-pointer" onClick={logout}>Logout</DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </>
                        ) : (
                            <>
                                <Button variant="outline" className="text-sm ml-1" asChild>
                                    <Link href="/auth">Login</Link>
                                </Button>
                            </>
                        ))}
                        <button
                            className="inline-flex w-10 h-10 justify-center items-center hover:bg-slate-100 dark:hover:bg-[rgba(225,225,225,0.1)] rounded lg:hidden"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-4 h-4"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M3.75 9h16.5m-16.5 6.75h16.5"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            </header>
        </>
    );
}