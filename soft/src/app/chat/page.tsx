"use client"
import React, { useRef } from "react"
import styled from "styled-components"
import  ChatBox  from "../../components/Chat_Components/chatbox";
import { message } from "../../components/Home/main";
import { Input }  from "../../components/ui/textinput"
import { Button } from "../../components/ui/button"
import { FlipText } from "../../components/ui/flip_textEffect";
import Joshua from "@/components/Training_module_Components/Joshua";
import { Progress } from "../../components/ui/ProgressBar"
import Ryan from "@/components/Training_module_Components/Ryan";
import { InView } from 'react-intersection-observer';
import { motion, useScroll, useSpring, useTransform} from "motion/react";


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

export default function ChatPage() {
    const msgref = useRef<HTMLDivElement | null>(null);
    const [button_disabled, update_button_disabeld] = React.useState(false);
    const [UserInput, updateUserInput] = React.useState('');
    const [toggleOne, updatetoggleOne] = React.useState<string | null>('tab-active')
    const [toggleTwo, updatetoggleTwo] = React.useState<string | null>(null)
    const [chatvisibility, updatechatvisibility] = React.useState<string | null>(null)
    const [scenariovisibility, updatescenariovisibility] = React.useState<string | null>('hidden');
    const pageRef = useRef(null);
    const { scrollYProgress } = useScroll({
        container: pageRef});
    const transform = useTransform(scrollYProgress, [0, 1], [0.03, 1]);
    const scaleX = useSpring(transform, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
      })

    const [conversation_History, update_Conversation_History] = React.useState(() => {
        let messages_array: Array<message> = [];
        let scenario: message = {
            role: "system",
            content: `Let’s role-play a phone call. You are a manager, and your employee, sonia, who is an occupational therapist, has been with the company for 2 months. 
                They are requesting a reference for a new job. Please ensure that you consider their job as an occupational therapist when responding, taking into account any specific responsibilities or impact this role may have. 
                Reflect on how this might influence your frustration or concern as a manager.
                Instructions: Speak naturally and conversationally, reflecting your frustration and the employee’s need for a reference. Use casual, everyday language. 
                For the response, try something like: 
                'Hey rachel, I just heard you’re asking for a reference. 
                Can you tell me why you’re looking to leave so soon? 
                You have't been here very long."`
        }
        messages_array.push(scenario)
        return messages_array as Array<message>
    });


    const user_Input_Change = (event: any) => {
        updateUserInput(event.target.value)
    }

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
    React.useEffect(() => {
        if (msgref.current !== null) {
            msgref.current.scrollIntoView(true)
        }

    }, [conversation_History])

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
            <ScenarioOverview className="bg-white flex justify-center items-center grow-[1] shrink-[1] basis-0 w-full rounded-br-lg rounded-bl-lg sticky top-0">
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

            <div className="ml-60 mr-60 mt-5">
                <h1 className="font-extrabold text-xl mb-5">Scenario: "Who Was Supposed to Send it?"</h1>
                <p>Joshua and Ryan are working on a team project and have mistaken each others responsibilities. As a result, a deadline was missed.</p>
                <h2 className="font-extrabold text-xl mt-5">Conversation:</h2>
            </div>
            <div className=" ml-52 mr-52 p-10 grow-[3] shrink-[1] basis-0 flex flex-col">
                <InView>
                <div className="flex flex-row" id="Hello"> 
                    <div>
                        <div><Joshua animate = {true}></Joshua></div>
                        <h2 className="text-center font-semibold">Joshua</h2>
                    </div>
                    <div className="pr-72">
                    <div className="chat chat-start">
                        <p className="chat-bubble">Jamie, did you send the report to the client yesterday?</p>
                        </div>
                    </div>
                </div>
                </InView>
                <div className="flex flex-row-reverse" id="Hello">
                <div>
                    <div><Ryan animate = {true}></Ryan></div>
                        <h2 className="text-center font-semibold">Ryan</h2>
                    </div>
                    <div className="pl-72">
                    <div className="chat chat-end">
                        <p className="chat-bubble">Jamie, did you send the report to the client yesterday?</p>
                    </div>
                    </div>
                </div>
                <div className="flex flex-row" id="Hello">
                <div>
                    <div><Joshua animate = {true}></Joshua></div>
                        <h2 className="text-center font-semibold">Joshua</h2>
                    </div>
                    <div className="pr-72">
                    <div className="chat chat-start">
                        <p className="chat-bubble">Jamie, did you send the report to the client yesterday?</p>
                    </div>
                    </div>
                </div>
                <div className="flex flex-row-reverse" id="Hello">
                <div>
                    <div><Ryan animate = {true}></Ryan></div>
                        <h2 className="text-center font-semibold">Ryan</h2>
                    </div>
                    <div className="pl-72">
                    <div className="chat chat-end">
                        <p className="chat-bubble">Jamie, did you send the report to the client yesterday?</p>
                        </div>
                    </div>
                </div>
                <div className="flex flex-row" id="Hello">
                <div>
                    <div><Joshua animate = {true}></Joshua></div>
                        <h2 className="text-center font-semibold">Joshua</h2>
                    </div>
                    <div className="pr-72">
                        <div className="chat chat-start">
                        <p className="chat-bubble">Jamie, did you send the report to the client yesterday?</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="w-full flex justify-center items-center grow-[2] shrink-[1] basis-0">
            <div className="bg-[rgb(248,248,248)] w-1/2 h-3/4 rounded-lg shadow-inner flex-row p-3 mb-20 mt-20">
            <div className="flex flex-col items-center justify-center mb-5">
                <h1 className="font-bold">Your Answer</h1>
                <p className="text-center">It Seems theres been a mistunderstanding between Joshua and Ryan. which has created the risk of workplace Conflict. Answer the following questions to help Joshua and Ryan resolve the issue and move forward:</p>
            </div>
                <FlipText
                    className="text-md text-black dark:text-white font-bold"
                    word="What Was The Miscommunication?"
                />
                <ChatInput className={`${chatvisibility} flex items-center justify-center mt-3`}>
                <div className="flex w-full max-w-sm items-center space-x-2">
                    <Input type="email" placeholder="Type Your Response"  onChange={user_Input_Change}/>
                    <Button disabled = {button_disabled}  onClick={Click} type="submit" variant="outline">Check</Button>
                </div>
                </ChatInput>
                <FlipText
                    className="text-md text-black dark:text-white mt-8 font-bold"
                    word="How can Joshua and Ryan resolve this misunderstanding?"
                />
                <ChatInput className={`${chatvisibility} flex items-center justify-center mt-3`}>
                <div className="flex w-full max-w-sm items-center space-x-2">
                    <Input type="email" placeholder="Type Your Response"  onChange={user_Input_Change}/>
                    <Button className = "rounded-xl" disabled = {button_disabled}  onClick={Click} type="submit" variant="outline">Check</Button>
                </div>
                </ChatInput>
            </div>
            </div>
        </Page>
    );
}
