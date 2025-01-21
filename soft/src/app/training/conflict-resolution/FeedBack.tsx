"use client"

import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog"
import { AnimatedCircularProgressBar } from '@/components/ui/RatingMeter'
import {openAiStructuretype} from '../../../utils/openai'
import Loading from '../loadingAnimation'
import {responseError} from "../../../utils/openai"
import RestrictionAnimation from '../RestrictionAnimation'

interface Response {
    response: openAiStructuretype;
    state: boolean
}

const FeedBack = ({response, isDialogTriggered, hasApiResponded, updatehasApiResponded, updateisDialogTriggered}:any) => {
    const [isOpen, setIsOpen] = React.useState(isDialogTriggered); // Initialize with the passed state

    React.useEffect(() => {
        setIsOpen(isDialogTriggered); // Sync with parent whenever `state` changes
    }, [isDialogTriggered]);


    React.useEffect(() => {
        if (isOpen === false) {
            updatehasApiResponded(false);
        }
        updateisDialogTriggered(isOpen); // Sync with parent whenever `state` changes
    }, [isOpen]);

    const DyanmicProps = !hasApiResponded
    ? {
        onInteractOutside: (event: any) => event.preventDefault(),
        onEscapeKeyDown: (event: any) => event.preventDefault(),
      }
    : {};


    function isResponseError(response: openAiStructuretype | responseError): response is responseError {
          return (response as responseError).error !== undefined;
    }

  return (

        <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTitle className='hidden'>FeedBack</DialogTitle>
        <DialogContent className='h-3/5 w-[80%] sm:h-4/5 sm:w-[60%] rounded-3xl'{...DyanmicProps}>
        {!isResponseError(response) && hasApiResponded ? (
            <>
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
            </>
        ) : isResponseError(response) && hasApiResponded ? (
          <>
          <div className="flex-[0.7] flex items-center justify-center">
          <h1 className="text-xl font-semibold">Error</h1>
        </div>
        <div className="flex-[4]">
            <p className='text-center'>{response.error}</p>
        </div>
        <div className="flex-[0.5] flex justify-center items-center">
        <RestrictionAnimation animate = {true}></RestrictionAnimation>
        </div>
        </>
        ): (
          <Loading></Loading>
        )}
      </DialogContent>
    </Dialog>
  )
}

export default FeedBack
