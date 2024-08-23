import React from "react";

import { AnimatePresence, motion } from "framer-motion";
import { CanvasRevealEffect } from "../canvas-reveal-effect";
import styled from "styled-components"
import {Navbar} from "./NavBar"
import {Typewriter} from "./Type"
import {ScenarioSection} from "./Scenarios"
import { WobbleCard } from "./ui/wobble-card";
// import {SendMessage} from "../app/app"

const Container = styled.div`
    height: 110vh;
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
          <StartNow className = "flex flex-col items-center">
            <div className="flex-grow: 1">
            <Typewriter></Typewriter>
            </div>
            <div className="flex-grow: 1">
            <p style={{color: "#181945", marginTop: "30px", marginBottom: "25px"}}>
              Master difficult conversations with ease.
              Whether you're negotiating a raise, addressing 
              an unhappy client, or learning to assert yourself, 
              ToughTalks leverages AI to provide realistic simulations 
              across unqiue scenarios. Navigate your professional challenges confidently with ToughTalks.
            </p>
            </div>
            <div className="flex-grow: 1">
            <button onClick={Click} className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg btn-primary">Try Now</button>
            </div>
          </StartNow>
          <InfoGraphic>
          </InfoGraphic>
        </Blueframe>
    </Container>
      <ScenarioSection>
      </ScenarioSection>
      </section>
  );
}