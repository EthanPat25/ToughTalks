"use client"
import React, { useRef } from "react"
import styled from "styled-components"
import { message } from "../../../components/Home/main";
import { Textarea }  from "../../../components/ui/TextArea"
import { Button } from "../../../components/ui/button"
import Joshua from "@/components/Training_module_Components/Joshua";
import { Progress } from "../../../components/ui/ProgressBar"
import Ryan from "@/components/Training_module_Components/Ryan";
import { useScroll, useSpring, useTransform} from "motion/react";
import { useForm} from "react-hook-form"
import FeedBack from "./FeedBack";
import {openAiStructuretype} from "../../../utils/openai"
import {responseError} from "../../../utils/openai"
import { Suspense } from 'react'
import { Conversation } from "@/app/api/conversations/route";
import { DialogWithAvatarProps } from "@/app/api/conversations/route";
import { DialogWithAvatar } from "./DialogWithAvatar";
import { ConflictOverview } from "./ConflictOverview";
import { IconArrowNarrowRight, IconArrowNarrowLeft } from "@tabler/icons-react";


localStorage.setItem("ConversationStatus", "closed");
localStorage.clear();

interface scenario {
    identifier: number;
    title: string;
    prompt: string;
}

export const Page = styled.div`
`

export const ChatArea = styled.div`
    height: 75%;
`

const ChatInput = styled.div`
    height: 15%;
`

const ScenarioOverview = styled.div`
    height: 10%;
`

const ScenarioArea = styled.div`

`
type Input = {
    Answer: string
}

export default function ChatPage() {
    const [button_disabled, update_button_disabeld] = React.useState(false);
    const [chatvisibility, updatechatvisibility] = React.useState<string | null>(null)
    const [feedBackResponse, updateFeedBackResponse] = React.useState<openAiStructuretype | responseError>(({
        feedBack: '',
        score: 0,
        satisfactoryCompletion: false
      }));
    const [feedBackDialogState, updateFeedBackDialogState] = React.useState<boolean>(false);
    const [hasApiResponded, updatehasApiResponded] = React.useState<boolean>(false);
    const [feedbackSess, updateFeedbackSession] = React.useState<Conversation>(); 
    const [buttoncounter, updatebuttoncounter] = React.useState<number>(1);
    const pageRef = useRef(null);
    const { scrollYProgress } = useScroll({
        container: pageRef});
    const transform = useTransform(scrollYProgress, [0, 1], [0.03, 1]);
    const scaleX = useSpring(transform, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
      })

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<Input>()

    const ApiRequest = async (data: Input) => {

        updateFeedBackDialogState(true);

        let message_array: Array<message> = [];
        let userAnswer: message  = {
            role: "user",
            content: data.Answer
        }
        
        let systemPrompt: message = {
            role: "system",
            content: feedbackSess?.feedback.prompt ?? "undefined"
        }

        message_array.push(systemPrompt);
        message_array.push(userAnswer);

        try {
            console.log("Data: " + data.Answer);
            const response = await fetch('/api/openai', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json', // Ensure JSON content type
              },
              body: JSON.stringify(message_array)
            });

            const responseData = await response.json();
            if (!response.ok) {
                updateFeedBackResponse(responseData);
            } else {
                updateFeedBackResponse(responseData);
            }
            updatehasApiResponded(true);
        } catch {
            console.log("await error");
        } finally {
            update_button_disabeld(false);
        }
    }
    

    const conversationApi: () => Promise<Conversation> = async () => {
        const response = await fetch("/api/conversations", {
            method: 'GET',
        });
        return await response.json();
    };

    React.useEffect(() => {
        const fetchData = async () => {
            const data = await conversationApi();
            updateFeedbackSession(data); 
        };

        fetchData();
    }, []);

    return (
        <Page ref={pageRef} className="bg-white h-full w-full flex-grow flex flex-col overflow-scroll" id="hello">
            <ScenarioOverview className="bg-white flex justify-center items-center grow-[1] shrink-[1] basis-0 w-full rounded-br-lg rounded-bl-lg sticky top-0 z-50">
                <Progress scaleX = {scaleX} className="w-1/5 mb-10 sticky top-1 mt-10" />
                <h1 className="font-extrabold text-xl absolute top-7 right-40">{buttoncounter}/5</h1>
                <button className=" absolute top-5 right-20 w-10 h-10 flex items-center mx-2 justify-center bg-[rgb(248,248,248)] dark:bg-neutral-800 border-3 border-transparent rounded-full focus:border-[#6D64F7] focus:outline-none hover:-translate-y-0.5 active:translate-y-0.5 transition duration-200 ml-5"
                onClick={() => {
                    updatebuttoncounter(buttoncounter + 1);
                }}
                >
                    <IconArrowNarrowRight className="text-neutral-600 dark:text-neutral-200" />
            </button>
            </ScenarioOverview>

            <ConflictOverview scenario={feedbackSess?.conflictDescription.title} context= {feedbackSess?.conflictDescription.description}></ConflictOverview>

            <div className=" lg:ml-32 lg:mr-32 xl:ml-52 xl:mr-52 2xl:mr-96 2xl:ml-96 p-10 grow-[3] shrink-[1] basis-0 flex flex-col z-40">
                {
                    feedbackSess?.DialogWithAvatar.map((element: DialogWithAvatarProps, index) => {
                        console.log(element.alignment);
                        return <DialogWithAvatar alignment = {element.alignment} Avatar = {Joshua} name = {element.avatarName} conversation = {element.conversation} key={index}></DialogWithAvatar>
                    })
                }
            </div>


            <div className="w-full flex justify-center items-center grow-[2] shrink-[1] basis-0">
                <div className="bg-[rgb(248,248,248)] w-1/2 h-3/4 rounded-lg shadow-inner flex-row p-3 mb-20 mt-20 lg:p-5">
                    <div className="flex flex-col items-center justify-center mb-5">
                        <h1 className="font-bold">Resolve the Conflict</h1>
                        <p className="text-justify mt-3 tracking-tighter">It Seems theres been a mistunderstanding between Joshua and Ryan. which has created the risk of workplace Conflict. Answer the following questions to help Joshua and Ryan resolve the issue and move forward:</p>
                    </div>
                    <div className="flex flex-row justify-center mb-3 mt-14">
                        <h1 className="font-bold tracking-tighter text-center">How Can Joshua and Ryan Resolve This Misunderstanding?</h1>
                    </div>

                    <form onSubmit={handleSubmit(ApiRequest)}>
                        <ChatInput className={`${chatvisibility} flex-col flex items-center justify-center`}>
                            <div className="grid w-full gap-2">
                                <Textarea {...register('Answer')} placeholder="Type Your Response" className="resize-none rounded-lg"/>
                                <Button className="mt-3 bg-[rgb(74,144,226)]">Check</Button>
                            </div>
                        </ChatInput>
                    </form>
                </div>
            </div>
      
            <Suspense fallback={<p>Loading feed...</p>}>
                <FeedBack response = {feedBackResponse} isDialogTriggered = {feedBackDialogState} hasApiResponded = {hasApiResponded} updatehasApiResponded = {updatehasApiResponded} updateisDialogTriggered = {updateFeedBackDialogState} ></FeedBack>
            </Suspense>

        </Page>
    );
}
