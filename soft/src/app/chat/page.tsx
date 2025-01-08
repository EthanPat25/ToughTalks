"use client"
import React, { useRef } from "react"
import styled from "styled-components"
import  ChatBox  from "../../components/Chat_Components/chatbox";
import { message } from "../../components/Home/main";
import { Textarea }  from "../../components/ui/TextArea"
import { Button } from "../../components/ui/button"
import { FlipText } from "../../components/ui/flip_textEffect";
import Joshua from "@/components/Training_module_Components/Joshua";
import { Progress } from "../../components/ui/ProgressBar"
import Ryan from "@/components/Training_module_Components/Ryan";
import { InView } from 'react-intersection-observer';
import { motion, useScroll, useSpring, useTransform} from "motion/react";
import { usePathname, useSearchParams } from 'next/navigation';
import { useForm, SubmitHandler } from "react-hook-form"
import FeedBack from "./FeedBack";
import {openAiStructuretype} from "../../utils/openai"
import {responseError} from "../../utils/openai"
import { Suspense } from 'react'


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

    const pathname = usePathname()
    const msgref = useRef<HTMLDivElement | null>(null);
    const [button_disabled, update_button_disabeld] = React.useState(false);
    const [UserInput, updateUserInput] = React.useState('');
    const [toggleOne, updatetoggleOne] = React.useState<string | null>('tab-active')
    const [toggleTwo, updatetoggleTwo] = React.useState<string | null>(null)
    const [chatvisibility, updatechatvisibility] = React.useState<string | null>(null)
    const [scenariovisibility, updatescenariovisibility] = React.useState<string | null>('hidden');
    const [feedBackResponse, updateFeedBackResponse] = React.useState<openAiStructuretype | responseError>(({
        feedBack: '',
        score: 0,
        satisfactoryCompletion: false
      }));
    const [feedBackDialogState, updateFeedBackDialogState] = React.useState<boolean>(false);
    const [hasApiResponded, updatehasApiResponded] = React.useState<boolean>(false);

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
      const onSubmit: SubmitHandler<Input> = (data) => console.log(data)

    const [conversation_History, update_Conversation_History] = React.useState(() => {
        let messages_array: Array<message> = [];
        let scenario: message = {
            role: "system",
            content: `

            You are tasked with providing concise, simple, and constructive feedback to the user's answer. 
The context is workplace conflict resolution. At the end of your feedback, you will assign:
1. A score out of 10 for the user's response.
2. A Boolean field indicating whether the attempt was satisfactory (true) or unsatisfactory (false).

The Boolean field is determined as follows:
- If the user's response makes a reasonable attempt to address the scenario and provides relevant suggestions for resolving workplace conflict, mark it as "true."
- If the response is unrelated or fails to address the scenario constructively, mark it as "false."

### Scoring Guidelines:
- **0 points**: Completely unrelated or nonsensical responses (e.g., "Can you give me a pizza recipe?").
- **1-3 points**: Responses that are provocative, unhelpful, or assign undue blame without suggesting constructive solutions.
- **4-6 points**: Responses that provide minimal or vague suggestions, focus on the problem instead of solutions, or assign blame while making a minor effort to address the conflict.
- **7-8 points**: Responses that emphasize cooperation, shared responsibility, and practical solutions but may lack depth or fail to address long-term prevention.
- **9-10 points**: Exemplary responses that focus on immediate problem resolution, suggest cooperation and delegation of responsibilities, avoid assigning blame, and include a forward-looking strategy to prevent similar issues.

### Key Principles to Emphasize:
- Avoid assigning blame in the immediate situation. Focus on solutions instead.
- Encourage cooperation and shared responsibility.
- Suggest actionable steps, such as a meeting to clarify roles and responsibilities.
- Highlight the importance of moving quickly to resolve the current issue rather than dwelling on the mistake.
- Acknowledge that, at a later date, a discussion on how to prevent similar misunderstandings is valuable.
- Encourage both parties to accept partial responsibility to maintain a collaborative tone.

### Scenario Context:
Joshua and Ryan missed a project deadline due to a misunderstanding about responsibilities. The discussion revolves around resolving this conflict effectively.

**Scenario**: 
"Who Was Supposed to Send it?"
Joshua and Ryan are working on a team project and have mistaken each others' responsibilities. As a result, a deadline was missed.
- Joshua: Ryan, did you send the report to the client yesterday?
- Ryan: Wait, I thought you were sending it. You’ve always been the one who handles submissions!
- Joshua: That’s true, but you were finishing the draft last week, so I assumed you’d send it this time.
- Ryan: Well, if I knew you weren’t planning to send it, I would’ve done it myself. Why didn’t you check with me?
- Joshua: Why didn’t you check with me? I thought we were on the same page.

**User's Answer**:
The user's response will be provided to you. If the user's answer is unrelated to resolving this conflict, assign a score of 0, mark "Satisfactory Completion" as false, and give feedback stating, "Your response was unrelated to the question. Please provide an answer relevant to resolving workplace conflict."

### Format Requirements:
Always structure your response in the following strict JSON format:
1. **Feedback:** Provide clear, constructive feedback. This field must ONLY contain feedback text and must NOT include the "score" or "satisfactoryCompletion" values.
2. **Score:** Provide a numerical score out of 10. This field must remain separate and must NOT be referenced or repeated in the "feedback" field.
3. **Satisfactory Completion:** Return a Boolean value, "true" for a satisfactory attempt or "false" for an unsatisfactory attempt. This field must remain separate and must NOT be referenced or repeated in the "feedback" field.

**All three fields (Feedback, Score, Satisfactory Completion) must always be filled and strictly follow the format to allow consistent parsing.**
          `
        }
        messages_array.push(scenario)
        return messages_array as Array<message>
    });

    /*

    const Click =  async () => {
        update_button_disabeld(true)
        let user_message: message  = {
            role: "user",
            content: UserInput
        }
        let message_array: Array<message> = [...conversation_History];
        message_array.push(user_message);
        update_Conversation_History(message_array)

        try {
          const response = await fetch('/api/openai', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json', // Ensure JSON content type
            },
            body: JSON.stringify(message_array)
          });

          let assistant_message: message  = {
            role: "assistant",
            content: await response.json()
          }

          update_Conversation_History(() => {
                let message: Array<message> = [...message_array];
                message.push(assistant_message);
                localStorage.setItem("ConversationHistory", JSON.stringify(message_array));
                return message as Array<message>;
          })
        } catch {
          console.log("await error");
        } finally {
            update_button_disabeld(false)
        }
    }

*/

    const ApiRequest = async (data: Input) => {

        updateFeedBackDialogState(true)

        let userAnswer: message  = {
            role: "user",
            content: data.Answer
        }
        
        let message_array: Array<message> = [...conversation_History];
        message_array.push(userAnswer);


        message_array.forEach((element) => {
            console.log("Array ellement" + element.content);
        })

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

    /*

    React.useEffect(() => {
        if (msgref.current !== null) {
            msgref.current.scrollIntoView(true)
        }

    }, [conversation_History])

    */

    const toggle = (toggle: number) => {
        if (toggle === 1 && toggleTwo !== null) {
            updatetoggleTwo(null);
            updatetoggleOne('tab-active')
            updatechatvisibility(null)
            updatescenariovisibility('hidden')
            return;

        } else if (toggle === 2 && toggleOne !== null) {
            updatetoggleTwo('tab-active');
            updatetoggleOne(null)
            updatescenariovisibility(null)
            updatechatvisibility('hidden')
            return;
        }
    }
    
    return (
        <Page ref={pageRef}
       // Directly animating the Page component
       className="bg-white h-full w-full flex-grow flex flex-col overflow-scroll" id="hello">
            <ScenarioOverview className="bg-white flex justify-center items-center grow-[1] shrink-[1] basis-0 w-full rounded-br-lg rounded-bl-lg sticky top-0 z-50">
                <Progress scaleX = {scaleX} className="w-1/5 mb-10 sticky top-1 mt-10" />
            </ScenarioOverview>
            {/*
            <ChatArea className={`${chatvisibility} p-16 overflow-scroll box-border grow-[3] shrink-[1] basis-0`}>  
                {conversation_History?.slice(1).map((element) => (
                    <ChatBox ref = {msgref} messageContent= {element.content} UserOrManager= {element.role} disabled = {true}></ChatBox>
                )
            )}
            </ChatArea>
            */}

            <div className="lg:ml-32 lg:mr-32 xl:ml-60 xl:mr-60 lg:mt-5 z-40 2xl:mr-96 2xl:ml-96">
                <h1 className="font-extrabold text-xl mb-5">Scenario: "Who Was Supposed to Send it?"</h1>
                <p>Joshua and Ryan are working on a team project and have mistaken each others responsibilities. As a result, a deadline was missed.</p>
                <h2 className="font-extrabold text-xl mt-5">Conversation:</h2>
            </div>
            <div className=" lg:ml-32 lg:mr-32 xl:ml-52 xl:mr-52 2xl:mr-96 2xl:ml-96 p-10 grow-[3] shrink-[1] basis-0 flex flex-col z-40">

                <InView>
                    <div className="flex flex-row" id="Hello"> 
                        <div className="relative">
                            <div>
                                <Joshua animate = {true}></Joshua>
                            </div>
                            <h2 className="text-center font-semibold">Joshua</h2>
                        </div>

                        <div>
                            <div className="relative lg:right-8 lg:bottom-7 chat chat-start lg:pr-40 xl:pr-60">
                                <p className="chat-bubble">Ryan, did you send the report to the client yesterday?</p>
                            </div>
                        </div>
                    </div>
                </InView>
                
                <div className="flex flex-row-reverse" id="Hello">
                    <div className="relative">
                        <div>
                            <Ryan animate = {true}></Ryan>
                        </div>
                        <h2 className="text-center font-semibold">
                            Ryan
                        </h2>
                    </div>
                    <div>
                        <div className="relative lg:left-8 bottom-7 chat chat-end lg:pl-40 xl:pl-60">
                            <p className="chat-bubble">Wait, I thought you were sending it. You’ve always been the one who handles submissions!</p>
                        </div>
                    </div>
                </div>

                <div className="flex flex-row" id="Hello">
                    <div className="relative">
                        <div>
                            <Joshua animate = {true}></Joshua>
                        </div>
                            <h2 className="text-center font-semibold">
                                Joshua
                            </h2>
                    </div>
                    <div>
                        <div className="relative lg:right-8 lg:bottom-7 chat chat-start lg:pr-40 xl:pr-60">
                            <p className="chat-bubble">That’s true, but you were finishing the draft last week, so I assumed you’d send it this time.</p>
                        </div>
                    </div>
                </div>

                <div className="flex flex-row-reverse" id="Hello">
                    <div>
                        <div>
                            <Ryan animate = {true}></Ryan>
                        </div>
                            <h2 className="text-center font-semibold">
                                Ryan
                            </h2>
                        </div>
                    <div>
                    <div className="relative lg:left-8 bottom-7 chat chat-end lg:pl-40 xl:pl-60">
                        <p className="chat-bubble">Well, if I knew you weren’t planning to send it, I would’ve done it myself. Why didn’t you check with me?</p>
                        </div>
                    </div>
                </div>

                <div className="flex flex-row" id="Hello">
                <div>
                    <div>
                        <Joshua animate = {true}></Joshua>
                    </div>
                        <h2 className="text-center font-semibold">Joshua</h2>
                    </div>
                    <div>
                        <div className="chat chat-start relative lg:right-8 lg:bottom-7 lg:pr-40 xl:pr-60">
                        <p className="chat-bubble">Why didn’t you check with me? I thought we were on the same page.</p>
                        </div>
                    </div>
                </div>
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
