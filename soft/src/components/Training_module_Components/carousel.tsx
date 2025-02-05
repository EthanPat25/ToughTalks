"use client"

import React from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import {Slide} from './Slide'
import {SlideInterface} from './Slide'

import styled from 'styled-components'
import { EmblaCarouselType} from 'embla-carousel'
import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
import { Tag } from '../ui/Tag'

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

export function EmblaCarousel({close, slides}:any) {
  const [emblaRef,emblaapi] = useEmblaCarousel({loop: true, inViewThreshold: 0.9})  

  return (
    <Embla className="overflow-hidden w-full h-full" ref={emblaRef}>
      <Embla_container className="flex w-full h-[90%]">
        {
          slides.map((element: SlideInterface, key: number) => {
            const { ref, inView } = useInView({
              threshold: 0.8,
            });
            return (
            <Embla_slide key={key} className= " flex flex-col flex-1 rounded-xl justify-center items-center">
              <Slide {...element} inView = {inView} ref = {ref}></Slide>
            </Embla_slide>
            )

          })
        }
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






















