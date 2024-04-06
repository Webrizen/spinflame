import React from 'react';
import SpinWheelArea from '@/components/design/SpinWheelArea';

async function getData(id) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASEURL}/events/rooms/${id}`)
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
 
  return res.json()
}

export default async function page({ params }) {
  const data = await getData(params.id)
  return (
    <section className='container mx-auto p-4'>
      <SpinWheelArea data={data} eventId={params.id} />
    </section>
  )
}
