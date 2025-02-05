"use client"

import React from "react";
import styled from "styled-components";
import { WobbleCard } from "../ui/wobble-card";
import ScenarioPopUp from "./ScenarioPopUp";
import Customer from "./Customer";
import ConflictResolution from "./ConflictResolution";
import Flight_attendant from '@/components/Training_module_Components/flightattendantanimation'
import Retailanimation from '@/components/Training_module_Components/retailanimation'
import TechSupport from './TechSupport'
import Conflict from "./Conflict";
import { WordPullUp } from "../ui/wordPullUp";
import { FadeText } from "../ui/fadeText";


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


const CustomerServiceSlides = [
    {
      title: "Airline Scenario",
      index: 0,
      AnimationComponent: Flight_attendant,
      inView: false,
      link: "/chat",
      buttonColor: "rgb(145,20,12)",
      completed: false
    },
    {
      title: "Retail Scenario",
      index: 1,
      AnimationComponent: Retailanimation,
      inView: false,
      link: "/chat",
      buttonColor: "rgb(255,146,72)",
      completed: false
    },
    {
      title: "IT Support Scenario",
      index: 2,
      AnimationComponent: TechSupport,
      inView: false,
      link: "/chat",
      buttonColor: "rgb(17,10,92)",
      completed: false
    }
  ]


const ConflictResolutionSlides = [
  {
    title: "WorkPlace Misunderstandings",
    index: 0,
    AnimationComponent: Conflict,
    inView: false,
    link: "/training/conflict-resolution",
    buttonColor: "rgb(145,20,12)",
    completed: true
  },
]
 

export const ScenarioSection = React.forwardRef<HTMLDivElement | null>(({}, ref) => {

  return (
    <Container className="flex flex-col">
      <ScenarioIntro className="flex-grow-1">
        
        <div ref={ref} className="xxs:w-[95%] xs:w-[90%] sm:w-1/2" style={{display: "flex", flexDirection: "column", alignItems: "start", justifyContent: "center"}}>
          <WordPullUp> The Journey Begins</WordPullUp>
            <FadeText
              className="xxs:text-[30px] sm:text-[48px] leading-normal font-bold text-[RGB(24,25,69)]"
              direction="right"
              framerProps={{
                show: { transition: { delay: 0.4 } },
              }}
              text="Choose a Learning Module"
            />
        </div>
        <div className = "text-center xxs:hidden sm:flex" style={{width: "50%", alignItems: "center", justifyContent: "center"}}>
          <p className="ml-5 font-medium text-left mb-5" style={{color: "#74758f", fontSize: "18px"}}>
            Develop Important Soft Skills. Our Learning modules are tailored towards industry relevant scenarios, 
            helping you to improve communication, and problem-solving in the workplace.
            </p>
        </div>
      </ScenarioIntro>
      <div className="grid grid-cols-2 gap-6 gap-y-6 p-6 flex-grow-3 xxs:flex xxs:flex-wrap lg:flex-nowrap lg:flex-none">
        <WobbleCard containerClassName = " flex min-h-[400px] bg-[rgb(122,87,207)]" slides = {CustomerServiceSlides}>
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
            </div>
        </WobbleCard>

        <WobbleCard containerClassName = "min-h-[400px] bg-[rgb(90,159,243)]" slides = {ConflictResolutionSlides}>
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
        </WobbleCard>

      </div>
  </Container>
  );
});
  
 


