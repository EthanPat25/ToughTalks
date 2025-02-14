"use client"

import React from 'react'
import { Carousel } from "./Carousel"
import {SlideInterface} from './CarouselSlide'
import UnderDevelopmentDialogContent from '@/app/training/UnderDevelopmentDialogContent'
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

interface TrainingModuleDialogProps {
  slides: Array<SlideInterface>;
  className: string;
  text: string;
  isHovering?: React.Dispatch<React.SetStateAction<boolean>>;
  isMouseTracking?: React.Dispatch<React.SetStateAction<boolean>>;
}


const TrainingModuleDialog = ({slides, className, text, isHovering, isMouseTracking}: TrainingModuleDialogProps) => {

  const [isTryNowTriggered, updateIsTryNowTriggered] = React.useState(false);

  return (
    <Dialog modal = {true}>
      <DialogTitle className='hidden'>Training Module Selection: {text}</DialogTitle>
      <DialogTrigger asChild>
        <button className={className} onClick={() => {
            if (isHovering && isMouseTracking) {
              isHovering(false)
              isMouseTracking(false)
            }
          }}>
          {text}
        </button>
      </DialogTrigger>
      <DialogContent className='h-3/5 w-[32rem] sm:h-4/5 rounded-3xl p-6' isMouseTracking = {isMouseTracking} isTryNowTriggered = {isTryNowTriggered} updateIsTryNowTriggered = {updateIsTryNowTriggered}>
        {
          isTryNowTriggered ? (
            <UnderDevelopmentDialogContent></UnderDevelopmentDialogContent>
          ) : (
            <Carousel slides = {slides} updateIsTryNowTriggered = {updateIsTryNowTriggered}> 
            </Carousel>
          )
        }
    </DialogContent>
  </Dialog>
  )
}


export default TrainingModuleDialog


