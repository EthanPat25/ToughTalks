"use client"
import React, { useRef } from "react"
import * as motion from "motion/react-client"
import { IconBorderRadius } from "@tabler/icons-react"
import ExplainerPopUp from "./ExplainerPopUp"


export default function Loading() {

    const LoadingText: Array<String> = "Loading...".split('');

    const box = {
        width: 100,
        height: 100,
        backgroundColor: "#4A90E2",
        borderRadius: 20,
        justifyContent: "center",
      }

      const handleAnimationComplete = () => {
      }


    return (
        <div className="flex flex-col justify-center w-full h-full items-center">
            <div className="mb-5">

            <motion.div
                style={box}
                initial={{ opacity: 0, scale: 0, borderRadius: "100%" }} // Start fully invisible
                animate={{ rotate: 360, opacity: 1, scale: 1, borderRadius: "25%" }} // Transition to visible square
                transition={{
                // Slow fade-in
                    borderRadius: { duration: 2.5 },
                    scale: { duration: 2, ease: "easeInOut" },  // Slow scale-up
                    rotate: { 
                        duration: 3, 
                        repeat: Infinity, 
                        ease: "easeInOut" 
                    }
                }}
                className="justify-center"  
                onAnimationComplete={handleAnimationComplete}
            />

            </div>
        <div className="flex flex-row">
            {LoadingText.map((element, index) => (
                <motion.h1 
                    initial={{ opacity: 0, scale: 0, repeat: 0 }}
                    animate={{opacity: 1, scale: 1}} 
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }} 
                    style ={{fontWeight: 500}}
                    key = {index}
                >
                        {element}
                </motion.h1>
            ))}

        </div>
            <ExplainerPopUp></ExplainerPopUp>
        </div>
    );
}
