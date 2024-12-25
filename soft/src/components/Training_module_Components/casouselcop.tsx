"use client"

import React from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Retailanimation from '@/components/Training_module_Components/retailanimation'
import Flight_attendant from '@/components/Training_module_Components/flightattendantanimation'
import TechSupport from './TechSupport'

import styled from 'styled-components'
import Link from 'next/link'
import { EmblaCarouselType} from 'embla-carousel'
import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";

{/* At the top */}
import { useInView } from "react-intersection-observer";

{/* Within the component */}

const Embla = styled.div`
`
const Embla_container = styled.div`
`
const Embla_slide = styled.div`
    flex: 0 0 100%;
    min-width: 0;
`

export function EmblaCarou({close}:any) {
  const [emblaRef,emblaapi] = useEmblaCarousel({loop: true, inViewThreshold: 0.9})
  const [slidesInView, setSlidesInView] = React.useState<Array<Number>>([]);
  const { ref, inView } = useInView({
    threshold: 0.2,
  });

  const updateSlidesInView = React.useCallback((emblaapi: EmblaCarouselType) => {
    setSlidesInView((slidesInView) => {  
      if (slidesInView.length === emblaapi.slideNodes().length) {
        setSlidesInView([]);
        //emblaapi.off('slidesInView', updateSlidesInView);
        console.log("All slides viewed, stopping listener");
      }
  
      const inView = emblaapi
        .slidesInView()
        .filter((index) => !slidesInView.includes(index));
      console.log("New slides in view:", inView);
  
      return slidesInView.concat(inView);
    });
  }, []);
  

  React.useEffect(() => {
    if (!emblaapi) return;
  
    console.log("Embla API initialized or changed:", emblaapi);
  
    updateSlidesInView(emblaapi);
    emblaapi.on('slidesInView', updateSlidesInView);
    emblaapi.on('reInit', updateSlidesInView);
  
    // Optional cleanup for debugging
    return () => {
      emblaapi.off('slidesInView', updateSlidesInView);
      emblaapi.off('reInit', updateSlidesInView);
      console.log("Cleaned up listeners");
    };
  }, [emblaapi, updateSlidesInView]);
  

  return (
    <Embla className="overflow-hidden w-full h-full" ref={emblaRef}>
      <Embla_container className="flex w-full h-[90%]" id='yoyoy'>

      <Embla_slide key = {0} className= " flex flex-col flex-1 rounded-xl justify-center items-center">
      <div className='flex-[0.7] flex items-center'>
              <h1 ref = {ref} className='text-xl font-semibold'>Airline Scenario</h1>
          </div>
          <div className='flex-[1]'>
          {slidesInView.includes(0) ? (
            <Flight_attendant key = "true" animate={true}></Flight_attendant>
          ) : (
            <Flight_attendant key = "false" animate={false}></Flight_attendant> // Replace this with your else condition
          )}

          </div>
          <div className='flex-[0.5] flex justify-center items-center'>
              <button className="px-8 py-2 rounded-md bg-[rgb(145,20,12)] text-white font-bold transition duration-200 hover:bg-white hover:text-black border-2 border-transparent hover:border-[rgb(145,20,12)]">
              <Link href={'/chat'}>
                  Try Now
                  </Link>
              </button>
          </div>

   
      </Embla_slide>
      <Embla_slide key = {1} className= " flex flex-col flex-1  rounded-xl justify-center items-center">
          <div className='flex-[0.7] flex items-center'>
              <h1 ref = {ref} className='text-xl font-semibold'>Retail Scenario</h1>
          </div>
          <div className='flex-[1]'>
          {slidesInView.includes(1) ? (
            <Retailanimation key = "true" animate={true}></Retailanimation>
          ) : (
            <Retailanimation key = "false" animate={false}></Retailanimation> // Replace this with your else condition
          )}

          </div>
          <div className='flex-[0.5] flex justify-center items-center'>
              <button className="px-8 py-2 rounded-md bg-[rgb(255,146,72)] text-white font-bold transition duration-200 hover:bg-white hover:text-black border-2 border-transparent hover:border-teal-500">
              <Link href={'/chat'}>
                  Try Now
                  </Link>
              </button>
          </div>
      </Embla_slide>
      <Embla_slide key = {2} className= " flex flex-col flex-1 rounded-xl justify-center items-center">
      <div className='flex-[0.7] flex items-center'>
              <h1 ref = {ref} className='text-xl font-semibold'>Tech Support Scenario</h1>
          </div>
          <div className='flex-[1]'>
          {slidesInView.includes(2) ? (
            <TechSupport key = "true" animate={true}></TechSupport>
          ) : (
            <TechSupport key = "false" animate={false}></TechSupport> // Replace this with your else condition
          )}

          </div>
          <div className='flex-[0.5] flex justify-center items-center'>
              <button className="px-8 py-2 rounded-md bg-[rgb(17,10,92)] text-white font-bold transition duration-200 hover:bg-white hover:text-black border-2 border-transparent hover:border-[rgb(17,10,92)]">
              <Link href={'/chat'}>
                  Try Now
                  </Link>
              </button>
          </div>

      </Embla_slide>
      </Embla_container>
      <div className='flex-1 flex justify-between'>
        <button onClick={() => {emblaapi?.scrollPrev()}}  className="h-12 w-12 rounded-full bg-gray-100 dark:bg-neutral-800 flex items-center justify-center group/button">
        <IconArrowLeft></IconArrowLeft>
        </button>
        <button onClick={() => {emblaapi?.scrollNext()}}  className="h-12 w-12 rounded-full bg-gray-100 dark:bg-neutral-800 flex items-center justify-center group/button">
        <IconArrowRight></IconArrowRight>
        </button>
      </div>
    </Embla>
  )
}





