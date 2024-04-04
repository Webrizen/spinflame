import React from 'react';
import SpinWheelArea from '@/components/design/SpinWheelArea';

export default function page({ params }) {
  return (
    <section className='container mx-auto p-4'>
      {params.id}
      <SpinWheelArea />
    </section>
  )
}
