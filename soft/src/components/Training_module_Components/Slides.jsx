"use client"

import React from 'react'
import Flight_attendant from '@/components/Training_module_Components/flightattendantanimation'
import styled from 'styled-components'
import Link from 'next/link'

const Embla = styled.div`
`
const Embla_container = styled.div`
`
const Embla_slide = styled.div`
    flex: 0 0 100%;
    min-width: 0;
`

export function slides() {
  return (
    [<Embla_slide className= " flex flex-col flex-1 bg-slate-500 rounded-lg shadow-md justify-center items-center">
      <h1 className='size-20'>Retail Scenario</h1>
      <button className="shadow-[0_0_0_3px_#000000_inset] px-6 py-2 bg-white border border-black dark:border-white dark:text-white text-black rounded-lg font-bold transform hover:-translate-y-1 transition duration-400">
          Try Now
      </button>
  </Embla_slide>, <Embla_slide className= " flex flex-col flex-1 bg-red-500 rounded-lg shadow-md justify-center items-center">
    <div className='flex-[0.7] flex items-center'>
        <h1 ref = {ref} className='text-xl'>Airline Scenario</h1>
    </div>
    <div className='flex-[1]'>
      <Flight_attendant animate = {slidesInView.indexOf(this) > -1}></Flight_attendant>
    </div>
    <div className='flex-[0.5]'>
        <button className="shadow-[0_0_0_3px_#000000_inset] px-6 py-2 bg-white border border-black dark:border-white dark:text-white text-black rounded-lg font-bold transform hover:-translate-y-1 transition duration-400">
            <Link href={'/chat'}>
            Try Now
            </Link>
        </button>
    </div>
</Embla_slide>, <Embla_slide className= " flex flex-col flex-1 bg-blue-500 rounded-lg shadow-md justify-center items-center">
    <h1>Tech Support Scenario</h1>
</Embla_slide>]
  );
}






