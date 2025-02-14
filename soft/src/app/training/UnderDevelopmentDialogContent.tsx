"use client"

import React from 'react'
import { ToolBox } from '@/components/Training_module_Components/ToolBox'

const UnderDevelopmentDialogContent = () => {
  return (
    <>
      <div className="flex-[0.7] flex items-center justify-center">
          <h1 className="text-xl font-semibold text-center">This Learning Module <br></br>is currently under development</h1>
      </div>
      <div className="flex flex-[4] justify-center items-center w-full">
          <ToolBox animate = {true}></ToolBox>
      </div>
      <div className="flex-[0.5] flex justify-center items-center">
      </div>
    </>
  )
}

export default UnderDevelopmentDialogContent

