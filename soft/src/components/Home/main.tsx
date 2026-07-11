import React from "react";
import styled from "styled-components";
import { Typewriter } from "./Type";
import { ScenarioSection } from "../Training_module_Components/Scenarios";
import dynamic from "next/dynamic";
import TrainingModuleDialog from "../Training_module_Components/TrainingModuleDialog";
import Conflict from "../Training_module_Components/Conflict";
import { IntroductionDialog } from "../Training_module_Components/IntroductionDialog";

const Container = styled.div`
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Blueframe = styled.div`
  background-color: #dbeffa;
  border-radius: 60px;
  display: flex;
`;

const InfoGraphic = styled.div``;

const StartNow = styled.div``;

interface BaseMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

interface FunctionMessage {
  role: "function";
  content: string;
  name: string;
}

const ConflictResolutionSlides = [
  {
    title: "WorkPlace Misunderstandings",
    index: 0,
    AnimationComponent: Conflict,
    inView: false,
    link: "/training/conflict-resolution",
    buttonColor: "rgb(145,20,12)",
    completed: true,
  },
];

export type message = BaseMessage | FunctionMessage;

export function Main() {
  const sub_title = React.useRef<HTMLDivElement | null>(null);

  // Dynamically import your component with SSR disabled
  const Convo = dynamic(
    () => import("../Training_module_Components/convoanimation"),
    { ssr: false }
  );

  return (
    <>
      <section>
        <Container className="h-[90dvh] xxs:portrait:h-[70dvh]">
          <Blueframe className="xxs:portrait:flex-col h-full w-[95%]">
            <StartNow
              id="startnow"
              className="flex flex-col items-start xxs:portrait:w-full xxs:w-1/2 xxs:pt-[6.5rem] xxs:pb-[6.5rem] xxs:pl-[8rem] sm:pr-0 h-full xxs:portrait:h-32"
            >
              <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-white/40 mb-6">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                <span
                  className="text-sm font-medium"
                  style={{ color: "#181945" }}
                >
                  Student-Built AI Demo
                </span>
              </div>

              <div className="grow-[0.5] shrink-[1]">
                <Typewriter></Typewriter>
              </div>
              <div className="grow-[2]">
                <p
                  className="xxs:hidden lg:block md:text-[0.5rem] lg:text-[1rem] xl:text-[1.3rem] font-semibold text-pretty"
                  style={{
                    color: "#181945",
                    marginTop: "30px",
                    marginBottom: "25px",
                  }}
                >
                  A portfolio project showcasing AI-powered workplace
                  communication training. Built with Next.js, TypeScript, OpenAI
                  API, and structured feedback via Zod.
                </p>
              </div>
              <div className="flex justify-start gap-10 w-full mb-7">
                <div className="flex-col justify-center items-center">
                  <h1 className="xs:text-base xl:text-lg font-semibold text-center">
                    3+
                  </h1>
                  <p className="xs:text-[0.6rem] xl:text-[0.8rem]">
                    Realistic Scenarios
                  </p>
                </div>
                <div className="flex-col justify-center items-center">
                  <h1 className="xs:text-base text-lg font-semibold text-center">
                    AI
                  </h1>
                  <p className="xs:text-[0.6rem] xl:text-[0.8rem]">
                    Powered Feedback
                  </p>
                </div>
                <div className="flex-col justify-center items-center">
                  <h1 className="xs:text-base text-lg font-semibold text-center">
                    100%
                  </h1>
                  <p className="xs:text-[0.6rem] xl:text-[0.8rem]">
                    Open Source
                  </p>
                </div>
              </div>
              <div className="flex flex-1 justify-start w-full">
                <TrainingModuleDialog
                  slides={ConflictResolutionSlides}
                  className={
                    "xxs:portrait:hidden px-8 py-2 w-40 h-11 sm:w-48 sm:h-12 xl:w-52 xl:h-14 bg-[rgb(123,97,355)] text-white text-sm rounded-lg font-semibold hover:bg-[rgb(123,97,355)]/[0.8] hover:shadow-lg"
                  }
                  text={"Try Now"}
                ></TrainingModuleDialog>
                <button
                  onClick={() => {
                    sub_title.current?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="xxs:portrait:hidden px-8 py-2 w-40 h-11 sm:w-48 sm:h-12 xl:w-52 xl:h-14 bg-[rgb(74,144,226)] text-white text-sm rounded-lg font-semibold hover:bg-[rgb(74,144,226)]/[0.8] hover:shadow-lg mr-16 ml-5"
                >
                  Learn More
                </button>
              </div>
            </StartNow>
            <InfoGraphic className="flex w-1/2 xxs:portrait:w-full xxs:portrait:flex-col justify-center items-center h-full xxs:portrait:flex-1">
              <Convo></Convo>
              <div className="hidden xxs:portrait:flex xxs:portrait:items-center xxs:portrait:justify-evenly h-32 w-full">
                <TrainingModuleDialog
                  slides={ConflictResolutionSlides}
                  className={
                    "hidden xxs:portrait:inline-block px-8 py-2 bg-[rgb(123,97,355)] text-white text-sm rounded-lg font-semibold hover:bg-[rgb(123,97,355)]/[0.8] hover:shadow-lg"
                  }
                  text={"Try Now"}
                ></TrainingModuleDialog>
                <button
                  onClick={() => {
                    sub_title.current?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className=" hidden xxs:portrait:inline-block px-8 py-2  xs:h-11 xs:w-45 md:w-50 md:h-13 xl:w-52 xl:h-14 bg-[rgb(74,144,226)] text-white text-sm rounded-lg font-semibold hover:bg-[rgb(74,144,226)]/[0.8] hover:shadow-lg"
                >
                  Learn More
                </button>
              </div>
            </InfoGraphic>
          </Blueframe>
        </Container>
        <ScenarioSection ref={sub_title}></ScenarioSection>
      </section>
    </>
  );
}
