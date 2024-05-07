import React from 'react'

export default function Audience({ name }) {
  return (
    <div className='flex flex-row items-center justify-start gap-2 px-2 text-xs mt-1 md:whitespace-normal whitespace-nowrap'>
    <span className='dark:text-slate-300 text-slate-700'>@{name || "Loading..."}</span>
    <span className='dark:text-slate-500 text-slate-950'>Joined the event</span>
    </div>
  )
}
