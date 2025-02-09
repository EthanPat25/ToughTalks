"use client"

import React from 'react'
import { ToolBox } from '@/components/Training_module_Components/ToolBox'
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'

interface ComingSoonPopUp {
    isopen: boolean,
}

const ComingSoonPopUp = ({isopen}:ComingSoonPopUp) => {
  return (
    <Dialog open = {isopen}>
      <DialogTitle className='hidden'>ExplainerPopUp</DialogTitle>
      <DialogContent className='h-3/5 w-[80%] sm:h-4/5 sm:w-[60%] rounded-3xl'>
      <div className="flex-[0.7] flex items-center justify-center">
          <h1 className="text-xl font-semibold text-center">This Learning Module <br></br>is currently under development</h1>
        </div>
        <div className="flex flex-[4] justify-center items-center w-full">
            <ToolBox animate = {true}></ToolBox>
        </div>
        <div className="flex-[0.5] flex justify-center items-center">
        </div>
    </DialogContent>
  </Dialog>
  )
}

export default ComingSoonPopUp

