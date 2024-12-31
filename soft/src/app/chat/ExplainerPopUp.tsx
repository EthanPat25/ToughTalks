"use client"

import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog"

const ExplainerPopUp = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
      </DialogTrigger>
      <DialogContent className='h-3/5 w-[80%] sm:h-4/5 sm:w-[60%] rounded-3xl'>
      <div className="flex-[0.7] flex items-center justify-center">
          <h1 className="text-xl font-semibold">How it Works</h1>
        </div>
        <div className="flex-[4]">
        </div>
        <div className="flex-[0.5] flex justify-center items-center">
        </div>
    </DialogContent>
  </Dialog>
  )
}

export default ExplainerPopUp


