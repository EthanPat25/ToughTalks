"use client"

import React from "react";
import styled from "styled-components";
import { gsap } from "gsap";
import { motion } from "framer-motion";
import { WobbleCard } from "../ui/wobble-card";
import { Headset } from 'lucide-react';
import { Speech } from 'lucide-react';
import { Handshake } from 'lucide-react';
import Customerservice from "../Training_module_Components/customerservicepopup";
import Customer from "./Customer";
import ConflictResolution from "./ConflictResolution";


const ScenarioCards = styled.div`
  height: 50vh;
  width: 100vw;
  padding: 2%
`

const Container = styled.div`
  height: 100vh;
  width: 100vw;
`

const ScenarioIntro = styled.div`
  display: flex;
  flex-direction: coloumn;
  padding: 5%;
  margin-left: 3%;
  margin-right: 3%;
`

const ScenarioEnd = styled.div`
  display: flex;
  justify-content: center;
`

interface childprops {
}

export const ScenarioSection = React.forwardRef<HTMLDivElement | null>(({}, ref) => {

  return (
    <Container className="flex flex-col">
      <ScenarioIntro className="flex-grow-1">
        <div ref={ref} style={{width: "50%", display: "flex", flexDirection: "column", alignItems: "start", justifyContent: "center"}}>
          <motion.h4 
          style = {{fontWeight: "600", color: "#583fbc", fontSize: "14px"}}
           initial = {{ opacity: 0.4, scale: 0.5}}
           animate={{ opacity: 1, scale: 1 }}
           transition={{duration: 1}}>
            The Journey Begins
            </motion.h4>
          <motion.h1 
          style={{fontWeight: "700", color: "#181945", fontSize: "48px"}}
          initial={{ opacity: 0.4, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{duration: 1}}
          >
            Choose a Learning Module
            </motion.h1>
        </div>
        <div className = "text-center" style={{width: "50%", display: "flex", alignItems: "center", justifyContent: "center"}}>
          <p className="ml-5" style={{fontWeight: "400", color: "#74758f", fontSize: "18px"}}>Develop Important Soft Skills. Our Learning modules are tailored towards industry relevant scenarios </p>
        </div>
      </ScenarioIntro>
      <div className="grid grid-cols-2 gap-6 gap-y-6 p-6 flex-grow-3">
        <WobbleCard containerClassName = " flex min-h-[400px] bg-[rgb(122,87,207)]" >
          <div className="flex justify-center">
            <div className="flex justify-center">

            <Customer animate = {true}></Customer>
              
               </div>
          </div>
    
            <div className="">
              <div className="flex justify-center">
                <h1 className="font-bold">Customer Service Training Module</h1>
              </div>
              <p>Perfect your skills in dealing with challenging customers - choose from industry relevant
                scenarios which include retail, tech support and more!
              </p>
            </div>
            <div className="flex justify-center mt-8">

            <Customerservice></Customerservice>
        
            </div>
        </WobbleCard>
        <WobbleCard containerClassName = "min-h-[400px] bg-[rgb(90,159,243)]">
          <div className="flex justify-center">
          <ConflictResolution animate = {true}></ConflictResolution>
          </div>
          <div className="">
            <div className="flex justify-center mb-2">
            <h1 className="font-bold">Conflict Resolution Training Module</h1>
            </div>
              <p>Build your skills in navigating tough workplace conflicts.
               Our AI guides you through real-life scenarios, where you'll 
               be asked to identify the cause of the conflict and suggest 
               practical ways to bring the conflict to a resolution.
              </p>
          </div>
          <div className="flex justify-center mt-7">
            <button className="px-6 py-2 bg-[rgb(58,80,244)] text-white rounded-lg font-bold transform hover:-translate-y-1 transition duration-400">
              Start Training Now
            </button>
          </div>
        </WobbleCard>
      </div>
  </Container>
  );
});
  
 


