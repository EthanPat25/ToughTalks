import React from "react";
import styled from "styled-components"
import {Typewriter} from "./Type"
import {ScenarioSection} from "../Training_module_Components/Scenarios"
import dynamic from 'next/dynamic';
import ScenarioPopUp from '../Training_module_Components/ScenarioPopUp'
import Conflict from "../Training_module_Components/Conflict";


const Container = styled.div`
    height: 90vh;
    width: 100vw;
    display: flex;
    flex-direction: column;
    align-items: center;
`


const Blueframe = styled.div`
    height: 100%;
    width: 96%;
    background-color: #dbeffa;
    border-radius: 60px;
    display: flex;
`



const InfoGraphic = styled.div`
  height: 100%;
`


const StartNow = styled.div`
  height: 100%;
`


interface BaseMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

interface FunctionMessage {
  role: 'function';
  content: string;
  name: string;
}

const ConflictResolutionSlides = [
  {
    title: "WorkPlace Misunderstandings",
    index: 0,
    AnimationComponent: Conflict,
    inView: false,
    link: "/chat",
    buttonColor: "rgb(145,20,12)"
  },
]

export type message = BaseMessage | FunctionMessage;


export function Main() {

  const sub_title = React.useRef<HTMLDivElement | null>(null);

// Dynamically import your component with SSR disabled
const Convo = dynamic(() => import("../Training_module_Components/convoanimation"), { ssr: false });

  return (
    <section>
    <Container>
       <Blueframe className="xs:portrait:flex-col">
          <StartNow id="startnow" className = "flex flex-col items-start xs:portrait:w-full xs:portrait:pr-[10%] xs:w-1/2 xs:p-[10%] xs:pr-0">
            <div className="grow-[0.5] shrink-[1]">
              <Typewriter></Typewriter>
            </div>
            <div className="grow-[2]">
              <p className = "xs:hidden lg:block text-xl text-pretty" style={{color: "#181945", marginTop: "30px", marginBottom: "25px"}}>
                Master difficult conversations with ease.
                Whether you're negotiating a raise, addressing 
                an unhappy client, or learning to assert yourself, 
                ToughTalks leverages AI to provide realistic simulations 
                across unqiue scenarios. Navigate your professional challenges confidently with ToughTalks.
              </p>
            </div>
             <div className="flex flex-1 justify-around w-full">
             <ScenarioPopUp slides = {ConflictResolutionSlides} className = {"xs:portrait:hidden px-8 py-2 lg:w-52 lg:h-14 bg-[rgb(123,97,355)] text-white text-sm rounded-lg font-semibold hover:bg-[rgb(123,97,355)]/[0.8] hover:shadow-lg"} text = {"Try Now"}></ScenarioPopUp>   
            <button onClick={() => {sub_title.current?.scrollIntoView({behavior: "smooth"})}} className="xs:portrait:hidden px-8 py-2 lg:w-52 lg:h-14 bg-[rgb(74,144,226)] text-white text-sm rounded-lg font-semibold hover:bg-[rgb(74,144,226)]/[0.8] hover:shadow-lg mr-16">
            Learn More
            </button>           
              </div>
          </StartNow>
          <InfoGraphic className="flex w-1/2 xs:portrait:w-full xs:portrait:flex-col justify-center items-center">
            <Convo></Convo>
            <div className="hidden xs:portrait:flex xs:portrait:items-center xs:portrait:justify-center">
              <ScenarioPopUp slides = {ConflictResolutionSlides} className = {"hidden xs:portrait:inline-block px-8 py-2 lg:w-52 lg:h-14 bg-[rgb(123,97,355)] text-white text-sm rounded-lg font-semibold hover:bg-[rgb(123,97,355)]/[0.8] hover:shadow-lg"} text = {"Try Now"}></ScenarioPopUp>   
              <button onClick={() => {sub_title.current?.scrollIntoView({behavior: "smooth"})}} className=" hidden xs:portrait:inline-block px-8 py-2 lg:w-52 lg:h-14 bg-[rgb(74,144,226)] text-white text-sm rounded-lg font-semibold hover:bg-[rgb(74,144,226)]/[0.8] hover:shadow-lg mr-16">
              Learn More
              </button>  
            </div>
\          </InfoGraphic>
        </Blueframe>
      </Container>
      <ScenarioSection ref = {sub_title}>
      </ScenarioSection>
      </section>
  );
}
