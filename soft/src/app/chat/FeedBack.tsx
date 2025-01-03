"use client"

import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog"
import { AnimatedCircularProgressBar } from '@/components/ui/RatingMeter'
import {openAiStructuretype} from '../../utils/openai'

interface Response {
    response: openAiStructuretype;
    state: boolean
}

const FeedBack = ({response, state}:Response) => {
    const [isOpen, setIsOpen] = React.useState(state); // Initialize with the passed state

    React.useEffect(() => {
        setIsOpen(state); // Sync with parent whenever `state` changes
    }, [state]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTitle className='hidden'>FeedBack</DialogTitle>
      <DialogContent className='h-3/5 w-[80%] sm:h-4/5 sm:w-[60%] rounded-3xl'>
      <div className="flex-[0.7] flex items-center justify-center">
          <h1 className="text-xl font-semibold">FeedBack</h1>
        </div>
        <div className="flex-[4]">
            <p>{response.feedBack}</p>
        </div>
        <div className="flex-[0.5] flex justify-center items-center">
        <AnimatedCircularProgressBar
            max={10}
            min={0}
            value={response.score}
            gaugePrimaryColor="rgb(79 70 229)"
            gaugeSecondaryColor="rgba(0, 0, 0, 0.1)"
        />
        </div>
    </DialogContent>
  </Dialog>
  )
}

export default FeedBack
