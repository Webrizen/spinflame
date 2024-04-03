import EditEvents from '@/components/system/EditEvents'
import React from 'react'

export default function page({ params }) {
  return (
    <>
      <EditEvents id={params.id} />
    </>
  )
}
