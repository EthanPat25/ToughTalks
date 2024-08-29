import React from "react";
import styled from "styled-components"
import {Typewriter} from "./Type"
import {ScenarioSection} from "./Scenarios"
// import {SendMessage} from "../app/app"
import Convo from "./convoanimation";

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
  width: 50%;
  background-color: #dbeffa;
  border-top-right-radius: 60px;
  border-bottom-right-radius: 60px;
`

const StartNow = styled.div`
  height: 100%;
  width: 50%;
  background-color: #dbeffa;
  padding: 10%;
  padding-right: 0;
  border-top-left-radius: 60px;
  border-bottom-left-radius: 60px;
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

export type message = BaseMessage | FunctionMessage;


export function Main() {
  const Click =  async () => {
    try {
      const response = await fetch('/api/openai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Ensure JSON content type
        },
        body: JSON.stringify({Message: "Let's role-play a phone call. You are an upset manager, who lacks respect for boundaries.  You have received a call from your employee of 2 months, who is asking for a reference to apply for a new job. You want an explanation from this employee.  I am the employee. You'll start the first sentence, as you are the one answering the phonecall."})
      });
      console.log( await response.json()); 
    } catch {
      console.log(" await error");
    }
  }

  return (
    <section>
    <Container>
        <Blueframe>
          <StartNow id="startnow" className = "flex flex-col items-start">
            <div className="grow-[0.5] shrink-[1]">
              <Typewriter></Typewriter>
            </div>
            <div className="grow-[2]">
              <p className = "text-xl text-pretty" style={{color: "#181945", marginTop: "30px", marginBottom: "25px"}}>
                Master difficult conversations with ease.
                Whether you're negotiating a raise, addressing 
                an unhappy client, or learning to assert yourself, 
                ToughTalks leverages AI to provide realistic simulations 
                across unqiue scenarios. Navigate your professional challenges confidently with ToughTalks.
              </p>
            </div>
             <div className=" flex flex-1 justify-around w-full">
             <button onClick={Click} className="px-8 py-2 lg:w-52 lg:h-14 bg-[rgb(123,97,355)] text-white text-sm rounded-lg font-semibold hover:bg-[rgb(123,97,355)]/[0.8] hover:shadow-lg">
             Try Now
            </button>     
            <button onClick={Click} className="px-8 py-2 lg:w-52 lg:h-14 bg-[rgb(74,144,226)] text-white text-sm rounded-lg font-semibold hover:bg-[rgb(74,144,226)]/[0.8] hover:shadow-lg mr-16">
            Learn More
            </button>           
              </div>
          </StartNow>
          <InfoGraphic className="flex justify-center items-center">
            <Convo></Convo>
            <div className="rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 h-60"></div>
          </InfoGraphic>
        </Blueframe>
    </Container>
      <ScenarioSection>
      </ScenarioSection>
      </section>
  );
}