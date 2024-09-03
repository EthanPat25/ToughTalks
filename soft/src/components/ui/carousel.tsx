"use client"

import React from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { Button } from './button'
import Retailanimation from '@/components/retailanimation'
import Flight_attendant from '@/components/flightattendantanimation'
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

export function EmblaCarousel({close}:any) {
  const [emblaRef,emblaapi] = useEmblaCarousel({loop: true})
  const [retail, updateretail] = React.useState<boolean>(true);
  const [Airline, updateairline] = React.useState<boolean>(false);

  const EmblaEvent = () => {
   console.log(emblaapi?.slidesNotInView());
}
  React.useEffect(() => {
    if (emblaapi) emblaapi?.on('select', EmblaEvent) 

    return () => {
        emblaapi?.off('select', EmblaEvent) 
    }
  })
  return (
    <Embla className="overflow-hidden w-full h-full" ref={emblaRef}>
      <Embla_container className="flex w-full h-[90%]" id='yoyoy'>
        <Embla_slide className= " flex flex-col flex-1 bg-slate-500 rounded-lg shadow-md justify-center items-center">
            <h1 className='size-20'>Retail Scenario</h1>
            <Retailanimation>
            </Retailanimation>
            <button className="shadow-[0_0_0_3px_#000000_inset] px-6 py-2 bg-white border border-black dark:border-white dark:text-white text-black rounded-lg font-bold transform hover:-translate-y-1 transition duration-400">
                Try Now
            </button>
        </Embla_slide>
        <Embla_slide className= " flex flex-col flex-1 bg-red-500 rounded-lg shadow-md justify-center items-center">
            <div className='flex-[0.7] flex items-center'>
                <h1 className='text-xl'>Airline Scenario</h1>
            </div>
            <div className='flex-[1]'>
                <Flight_attendant animate = {Airline}>
                </Flight_attendant>
            </div>
            <div className='flex-[0.5]'>
                <button className="shadow-[0_0_0_3px_#000000_inset] px-6 py-2 bg-white border border-black dark:border-white dark:text-white text-black rounded-lg font-bold transform hover:-translate-y-1 transition duration-400">
                    <Link href={'/chat'}>
                    Try Now
                    </Link>
                </button>
            </div>
        </Embla_slide>
        <Embla_slide className= " flex flex-col flex-1 bg-blue-500 rounded-lg shadow-md justify-center items-center">
            <h1>Tech Support Scenario</h1>
        </Embla_slide>
      </Embla_container>
      <div className='flex-1 flex justify-between'>
        {close}
        <Button onClick={() => {emblaapi?.scrollNext()}}>Next</Button>
      </div>
    </Embla>
  )
}






















