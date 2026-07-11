"use client";
import React, { useRef, Suspense } from "react";
import styled from "styled-components";
import { message } from "../../../components/Home/main";
import { Textarea } from "../../../components/ui/TextArea";
import { Button } from "../../../components/ui/button";
import { Joshua } from "@/components/Training_module_Components/Joshua";
import { Progress } from "../../../components/ui/ProgressBar";
import { useScroll, useSpring, useTransform } from "motion/react";
import { useForm } from "react-hook-form";
import FeedBack from "./FeedBack";
import { openAiStructuretype } from "../../../utils/openai";
import { responseError } from "../../../utils/openai";
import { DialogWithAvatarProps } from "@/app/api/conversations/[id]/route";
import { DialogWithAvatar } from "./DialogWithAvatar";
import { IconArrowNarrowRight, IconArrowNarrowLeft } from "@tabler/icons-react";
import { LoadingContext } from "./LoadingWrapper";
import { IntroductionDialog } from "@/components/Training_module_Components/IntroductionDialog";
import { Lightbulb, Brain, Send, CheckCircle, Target } from "lucide-react";

localStorage.setItem("ConversationStatus", "closed");
localStorage.clear();

export const Page = styled.div``;
export const ChatArea = styled.div`
  height: 75%;
`;
const ChatInput = styled.div`
  height: 15%;
`;
const ScenarioOverview = styled.div`
  height: 10%;
`;
const ScenarioArea = styled.div``;

type Input = {
  Answer: string;
};

export default function ChatPage({ params }: any) {
  const context = React.useContext(LoadingContext);
  const { feedbackSess, currentPage, updateCurrentPage, ScenarioCount } =
    context;

  const [button_disabled, update_button_disabeld] = React.useState(false);
  const [feedBackResponse, updateFeedBackResponse] = React.useState<
    openAiStructuretype | responseError
  >({
    feedBack: "",
    score: 0,
    satisfactoryCompletion: false,
  });
  const [feedBackDialogState, updateFeedBackDialogState] =
    React.useState<boolean>(false);
  const [hasApiResponded, updatehasApiResponded] =
    React.useState<boolean>(false);
  const [buttoncounter, updatebuttoncounter] = React.useState<number>(1);
  const pageRef = useRef(null);
  const [scrollReady, setScrollReady] = React.useState(false);
  const [popup, updatePopup] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (feedbackSess) setScrollReady(true);
  }, [feedbackSess]);

  const { scrollYProgress } = useScroll({
    container: scrollReady ? pageRef : null,
  });

  const transform = useTransform(scrollYProgress, [0, 1], [0.03, 1]);
  const scaleX = useSpring(transform, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const { register, handleSubmit } = useForm<Input>();

  const ApiRequest = async (data: Input) => {
    updateFeedBackDialogState(true);

    let message_array: Array<message> = [];
    let userAnswer: message = { role: "user", content: data.Answer };
    let systemPrompt: message = {
      role: "system",
      content: feedbackSess?.feedback.prompt ?? "undefined",
    };

    message_array.push(systemPrompt);
    message_array.push(userAnswer);

    try {
      const response = await fetch("/api/openai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(message_array),
      });

      const responseData = await response.json();
      updateFeedBackResponse(responseData);
      updatehasApiResponded(true);
    } catch {
      console.log("await error");
    } finally {
      update_button_disabeld(false);
    }
  };

  React.useEffect(() => {
    updatePopup(true);
  }, []);

  return (
    <Page
      ref={pageRef}
      className="bg-white h-full w-full flex-grow flex flex-col overflow-scroll"
      id="hello"
    >
      {/* Progress bar + nav */}
      <ScenarioOverview
        className={`bg-white flex items-center grow-[1] shrink-[1] basis-0 w-full rounded-br-lg rounded-bl-lg sticky top-5 z-50 ${
          scrollReady ? "flex" : "hidden"
        }`}
      >
        <div className="w-1/4 "></div>

        <div className="w-2/4 flex justify-center items-center">
          <Progress
            scaleX={scrollReady ? scaleX : 0}
            className=" xs:w-[13rem] md:w-[15rem] lg:w-[25rem] "
          />
        </div>

        <div className="w-1/4 flex justify-evenly items-center">
          <h1 className="font-extrabold text-lg">
            {buttoncounter}/{ScenarioCount}
          </h1>
          <div className="flex gap-2">
            <button
              disabled={buttoncounter - 1 === 0}
              className={`right-[6rem] xs:w-8 xs:h-8 md:w-9 md:h-9 flex items-center justify-center bg-[rgb(248,248,248)] dark:bg-neutral-800 rounded-full hover:-translate-y-0.5 transition duration-200 disabled:bg-gray-300 disabled:dark:bg-neutral-700
             disabled:cursor-not-allowed  ${
               buttoncounter - 1 === 0 ? "disabled" : "flex"
             }`}
              onClick={() => {
                updatebuttoncounter(buttoncounter - 1);
                updateCurrentPage(currentPage - 1);
              }}
            >
              <IconArrowNarrowLeft className="w-4 h-4 text-neutral-600 dark:text-neutral-200" />
            </button>
            <button
              disabled={buttoncounter === ScenarioCount}
              className={` right-[3rem] xs:w-8 xs:h-8 md:w-9 md:h-9 flex items-center justify-center bg-[rgb(248,248,248)] dark:bg-neutral-800 rounded-full hover:-translate-y-0.5 transition duration-200 disabled:bg-gray-300 disabled:dark:bg-neutral-700
             disabled:cursor-not-allowed `}
              onClick={() => {
                updatebuttoncounter(buttoncounter + 1);
                updateCurrentPage(currentPage + 1);
              }}
            >
              <IconArrowNarrowRight className="w-4 h-4 text-neutral-600 dark:text-neutral-200" />
            </button>
          </div>
        </div>
      </ScenarioOverview>

      {feedbackSess ? (
        <>
          {/* Conflict overview */}
          <div className="bg-white border-b border-gray-100">
            <div className="max-w-3xl mx-auto px-6 py-12 text-center">
              <div className="mb-4">
                <span className="inline-block px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium mb-3">
                  Workplace Scenario
                </span>
                <h1 className="text-xl font-semibold text-gray-900 mb-4">
                  {feedbackSess?.conflictDescription.title}
                </h1>
              </div>
              <p className="text-base text-gray-600 max-w-2xl mx-auto leading-relaxed mb-8">
                {feedbackSess?.conflictDescription.description}
              </p>
              <div className="inline-flex items-center gap-2 text-gray-500 text-xs">
                <div className="w-1.5 h-1.5 bg-gray-300 rounded-full"></div>
                <span>Read the conversation below</span>
                <div className="w-1.5 h-1.5 bg-gray-300 rounded-full"></div>
              </div>
            </div>
          </div>

          {/* Conversation */}
          <div className="lg:mx-32 xl:mx-52 2xl:mx-96 p-6 grow-[3] shrink-[1] basis-0 flex flex-col z-40">
            {feedbackSess?.DialogWithAvatar.map(
              (element: DialogWithAvatarProps, index) => (
                <DialogWithAvatar
                  alignment={element.alignment}
                  Avatar={Joshua}
                  name={element.avatarName}
                  conversation={element.conversation}
                  key={index}
                />
              )
            )}
          </div>

          {/* Resolution card with instructional phrasing */}
          <div className="w-full flex justify-center items-center grow-[2] shrink-[1] basis-0">
            <div className="max-w-3xl w-full mx-auto px-4">
              <div className="bg-white rounded-xl shadow-md border border-gray-200 p-5 mb-10 mt-6">
                <div className="text-center mb-4">
                  <div className="inline-flex items-center justify-center w-8 h-8 bg-blue-100 rounded-full mb-2">
                    <Lightbulb className="w-4 h-4 text-blue-600" />
                  </div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">
                    Your Resolution Strategy
                  </h2>
                  <p className="text-gray-600 text-sm leading-relaxed max-w-md mx-auto">
                    Read the conversation above and think through some possible
                    resolution steps before answering.
                  </p>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                  <h3 className="font-semibold text-blue-900 mb-2 flex items-center gap-2 text-sm">
                    <Brain className="w-4 h-4" />
                    Challenge Question:
                  </h3>
                  <p className="text-blue-800 leading-relaxed text-sm font-medium">
                    {feedbackSess?.feedback.question}
                  </p>
                </div>

                <form onSubmit={handleSubmit(ApiRequest)} className="space-y-4">
                  <Textarea
                    {...register("Answer")}
                    placeholder="Type your response..."
                    className="min-h-[80px] resize-none border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-lg text-sm"
                  />
                  <div className="flex justify-center">
                    <Button
                      type="submit"
                      className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm"
                      disabled={button_disabled}
                    >
                      <Send className="w-4 h-4 mr-2" />
                      Submit for AI Feedback
                    </Button>
                  </div>
                </form>

                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex items-center justify-center gap-6 text-xs text-gray-500">
                    <div className="flex items-center gap-1.5">
                      <CheckCircle className="w-3.5 h-3.5" /> AI-Powered
                      Analysis
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Brain className="w-3.5 h-3.5" /> Instant Feedback
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Target className="w-3.5 h-3.5" /> Skill Development
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Suspense fallback={<p>Loading feed...</p>}>
            <FeedBack
              response={feedBackResponse}
              isDialogTriggered={feedBackDialogState}
              hasApiResponded={hasApiResponded}
              updatehasApiResponded={updatehasApiResponded}
              updateisDialogTriggered={updateFeedBackDialogState}
            />
          </Suspense>
        </>
      ) : null}

      <IntroductionDialog open={popup} updatePopup={updatePopup} />
    </Page>
  );
}
