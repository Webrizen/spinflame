import React from 'react'

export default function page() {
  return (
    <div className='w-full flex flex-col gap-3'>
    <h1 className='md:text-3xl text-xl font-bold'>Notifications</h1>
    <div className='p-3 rounded-xl border dark:border-[rgba(225,225,225,0.1)] border-[0,0,0,0.1] flex flex-row items-center justify-between'>
      <span>New Thanks from @Akash_bhakta from your event `Giveaway Iphone 15`</span>
      <span className='w-8 h-8 flex justify-center items-center rounded-xl border dark:border-[rgba(225,225,225,0.1)] border-[rgba(0,0,0,0.1)] cursor-pointer dark:hover:bg-[rgba(225,225,225,0.1)] hover:bg-[rgba(0,0,0,0.1)]' title='Mark as read'>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
</svg>
      </span>
    </div>
      
    </div>
  )
}
