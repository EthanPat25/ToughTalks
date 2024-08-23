import React from "react";
import styled from "styled-components";
import { gsap } from "gsap";
import { motion } from "framer-motion";
import { WobbleCard } from "./ui/wobble-card";
import { Headset } from 'lucide-react';
import { Speech } from 'lucide-react';
import { Handshake } from 'lucide-react';


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

export function ScenarioSection() {
  return (
    <Container className="flex flex-col">
      <ScenarioIntro className="flex-grow-1">
        <div style={{width: "50%", display: "flex", flexDirection: "column", alignItems: "start", justifyContent: "center"}}>
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
            Try From Our Scenarios
            </motion.h1>
        </div>
        <div style={{width: "50%", display: "flex", alignItems: "center", justifyContent: "center"}}>
          <p style={{fontWeight: "400", color: "#74758f", fontSize: "18px"}}>Develop Important Soft Skills</p>
        </div>
      </ScenarioIntro>
      <div className="grid grid-cols-2 gap-6 gap-y-6 p-6 flex-grow-3">
        <WobbleCard containerClassName = " flex min-h-[400px] bg-[rgb(122,87,207)]" >
          <div className="flex justify-center">
            <div className="flex justify-center">
              <Headset size={50}/>
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
              <button className="px-6 py-2 bg-[rgb(58,80,244)] text-white rounded-lg font-bold transform hover:-translate-y-1 transition duration-400">
                Start Training Now
              </button>
            </div>
        </WobbleCard>
        <WobbleCard containerClassName = "min-h-[400px] bg-[rgb(90,159,243)]">
          <div className="flex justify-center">
          <Speech size={50} />
          </div>
          <div className="">
            <div className="flex justify-center mb-2">
            <h1 className="font-bold">Employee Feedback Training Module</h1>
            </div>
              <p>Learn how to give constructive feedback that truly motivates and inspires. 
                Get real-time insights from our AI to help you fine-tune your approach 
                and avoid common mistakes.
              </p>
          </div>
          <div className="flex justify-center mt-7">
            <button className="px-6 py-2 bg-[rgb(58,80,244)] text-white rounded-lg font-bold transform hover:-translate-y-1 transition duration-400">
              Start Training Now
            </button>
          </div>
        </WobbleCard>
        <WobbleCard containerClassName = "col-span-2 min-h-[500px] bg-[rgb(124,143,191)] ">
          <div className="flex justify-center">
          <Handshake size={50}/>
          </div>
          <div>
            <div className="flex justify-center">
            <h1 className="font-bold">Conflict Resolution Training Module</h1>
            </div>
            <p>Build your skills in navigating tough workplace conflicts.
               Our AI guides you through real-life scenarios, where you'll 
               be asked to identify the cause of the conflict and suggest 
               practical ways to bring the conflict to a resolution</p>
          </div>
          <div className="flex justify-center mt-12">
            <button className="px-6 py-2 bg-[rgb(58,80,244)] text-white rounded-lg font-bold transform hover:-translate-y-1 transition duration-400">
              Start Training Now
            </button>
          </div>
        </WobbleCard>
      </div>
  </Container>
  );
}


