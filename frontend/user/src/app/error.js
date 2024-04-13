'use client'; 
import { useEffect } from 'react';
import Link from "next/link";
 
export default function Error({ error, reset }) {
  useEffect(() => {
    console.error(error)
  }, [error])
 
  return (
    <div className="min-h-screen flex items-center justify-center">
    <div className="p-8 rounded-md shadow-lg max-w-md w-full">
      <div className="text-center">
        <svg
          className="text-red-500 h-12 w-12 mb-4 mx-auto"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M21 21l-18-18M8 4h13M8 11h7M4 14h7"
          ></path>
        </svg>
        <h1 className="text-3xl font-extrabold text-red-600 mb-4">Oops!</h1>
        <p className=" mb-4">
          We encountered an unexpected error. Our team has been notified.
        </p>
        <p className="mb-8">
          Please try again later or contact support if the problem persists. <br /> Server responded with error: <i>{error.statusText || error.message}</i>
        </p>
        <div className="flex flex-row gap-3 items-center justify-center">
        <button
          onClick={reset}
          className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-6 rounded-full focus:outline-none transition duration-300"
        >
          Retry
        </button>
        <Link href="/" className="bg-transparent hover:bg-[rgba(0,0,0,0.1)] text-gray-600 font-semibold py-2 px-6 rounded-full focus:outline-none transition duration-300">Go Back Home</Link>
        </div>
      </div>
    </div>
  </div>
  )
}