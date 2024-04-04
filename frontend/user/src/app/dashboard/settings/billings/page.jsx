import { Button } from '@/components/ui/button'
import React from 'react'

export default function page() {
  return (
    <>
       <div className="max-w-3xl mx-auto">
        <div className='w-full flex flex-row items-center justify-between border-b border-slate-700 pb-4'>
        <h2 className="text-3xl font-semibold">Billing Information</h2>
        <Button>Manage Subscription</Button>
        </div>
        <div className="rounded-lg overflow-hidden">
          {/* Billing Summary */}
          <div className="p-2 pb-6 mb-4 border-b dark:border-gray-600">
            <h3 className="text-lg font-semibold mb-4">Billing Summary</h3>
            <div className="flex justify-between items-center mb-4">
              <p className="text-sm text-gray-600">Plan:</p>
              <p className="text-sm font-semibold">Professional Plan</p>
            </div>
            <div className="flex justify-between items-center mb-4">
              <p className="text-sm text-gray-600">Monthly Price:</p>
              <p className="text-sm font-semibold">$29.99</p>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-sm text-gray-600">Next Billing Date:</p>
              <p className="text-sm font-semibold">March 30, 2024</p>
            </div>
          </div>
          {/* Payment Method */}
          <div className="p-2 pb-6 my-4 border-b dark:border-gray-600">
            <h3 className="text-lg font-semibold mb-4">Payment Method</h3>
            <div className="flex items-center">
              <img src="data:image/png;base64,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" alt="Credit Card" className="w-6 h-6 mr-2" />
              <p className="text-sm text-gray-600">**** **** **** 1234</p>
            </div>
          </div>
          {/* Billing History */}
          <div className="p-2 my-4">
            <h3 className="text-lg font-semibold mb-4">Billing History</h3>
            <div className="flex justify-between items-center mb-2">
              <p className="text-sm text-gray-600">March 2024</p>
              <p className="text-sm font-semibold">$29.99</p>
            </div>
            <div className="flex justify-between items-center mb-2">
              <p className="text-sm text-gray-600">February 2024</p>
              <p className="text-sm font-semibold">$29.99</p>
            </div>
            <div className="flex justify-between items-center mb-2">
              <p className="text-sm text-gray-600">January 2024</p>
              <p className="text-sm font-semibold">$29.99</p>
            </div>
            {/* View More Button */}
            <button className="text-sm text-blue-600 hover:underline focus:outline-none">View More</button>
          </div>
        </div>
      </div>
    </>
  )
}
