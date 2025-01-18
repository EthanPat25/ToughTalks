"use client"

import React from 'react'
import { Button } from '../ui/button'
import { EmblaCarousel } from '@/components/Training_module_Components/carousel'
import {SlideInterface} from './Slide'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

interface ScenarioPopUpProps {
  slides: Array<SlideInterface>;
  className: string;
  text: string;
  isHovering?: React.Dispatch<React.SetStateAction<boolean>>;
  isTracking?: React.Dispatch<React.SetStateAction<boolean>>;
}

const ScenarioPopUp = ({slides, className, text, isHovering, isTracking}: ScenarioPopUpProps) => {

  console.log("yoyoyo");

  return (
    <Dialog modal = {true}>
      <DialogTitle className='hidden'>Training Module Selection: {text}</DialogTitle>
      <DialogTrigger asChild>
        <button className={className} onClick={() => {
            if (isHovering && isTracking) {
              isHovering(false)
              isTracking(false)
            }
          }}>
          {text}
        </button>
      </DialogTrigger>
      <DialogContent className='h-3/5 w-[80%] sm:h-4/5 sm:w-[60%] rounded-3xl' isTracking = {isTracking}>
            <EmblaCarousel slides = {slides}> 
            </EmblaCarousel>
    </DialogContent>
  </Dialog>
  )
}


export default ScenarioPopUp


