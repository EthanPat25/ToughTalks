"use client"

import React from 'react'
import { Button } from '../ui/button'
//import { Carousel, CarouselContent, CarouselItem, CarouselNext } from '@/components/ui/carousel'
import Flight_attendant from '@/components/Training_module_Components/flightattendantanimation'
import Retailanimation from '@/components/Training_module_Components/retailanimation'
import { EmblaCarousel } from '@/components/Training_module_Components/carousel'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

const Customerservice = () => {

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="px-6 py-2 bg-[rgb(58,80,244)] text-white rounded-lg font-bold transform hover:-translate-y-1 transition duration-400">
          Start Training Now
        </button>
      </DialogTrigger>
      <DialogContent className='h-3/5 w-[80%] sm:h-4/5 sm:w-[60%]'>
            <EmblaCarousel close = {          
                <DialogClose asChild>
                  <Button type="button" variant="secondary">
                    Close
                  </Button>
              </DialogClose>
              }> 
            </EmblaCarousel>
    </DialogContent>
  </Dialog>
  )
}

export default Customerservice


