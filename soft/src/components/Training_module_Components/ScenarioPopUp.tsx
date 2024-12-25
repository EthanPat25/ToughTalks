"use client"

import React from 'react'
import { Button } from '../ui/button'
import { EmblaCarousel } from '@/components/Training_module_Components/carousel'
import {SlideInterface} from './Slide'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog"

const ScenarioPopUp = ({slides}: {slides: Array<SlideInterface>}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="px-6 py-2 bg-[rgb(58,80,244)] text-white rounded-lg font-bold transform hover:-translate-y-1 transition duration-400">
          Start Training Now
        </button>
      </DialogTrigger>
      <DialogContent className='h-3/5 w-[80%] sm:h-4/5 sm:w-[60%] rounded-3xl'>
            <EmblaCarousel close = {          
                <DialogClose asChild>
                  <Button type="button" variant="secondary">
                    Close
                  </Button>
              </DialogClose>
              } slides = {slides}> 
            </EmblaCarousel>
    </DialogContent>
  </Dialog>
  )
}

export default ScenarioPopUp


