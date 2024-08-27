"use client"

         // Need Input form that is submitted when user enters their message, that then gets
         // added to messages array such that chatgpt is given the entire context of the conversation
         // the message the user sends, is of typscript type defined 'message', and has the following information in the object
         // include the role which will be 'user' and the message content as proeprty 'message'
         // local storage is also updated with new infomration as well as the user state for messages with the 
         // through functon updatmessahes (This will dynimcally render changes to the chatarea of the react component)
import React, { useRef } from "react"
import styled from "styled-components"
import  ChatBox  from "../../components/chatbox";
import { message } from "../../components/main";
import TypingAnimation from "../../components/ui/typinganimaiton";
import { RectangleEllipsis } from 'lucide-react';


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
    height: 80%;
`

const ChatInput = styled.div`
    height: 20%;
`

const ScenarioOverview = styled.div`
    height: 10%;
`

export default function ChatPage() {
    const msgref = useRef<HTMLDivElement | null>(null);
    const [button_disabled, update_button_disabeld] = React.useState(false);
    const [UserInput, updateUserInput] = React.useState('');
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

    return (
        <Page className="bg-white h-full w-full flex-grow" id="hello">
            <ChatArea className="p-16 overflow-scroll box-border">  
                {conversation_History?.slice(1).map((element) => (
                    <ChatBox ref = {msgref} messageContent= {element.content} UserOrManager= {element.role} disabled = {true}></ChatBox>
                )
            )}
            </ChatArea> 
            <ChatInput className="">
                <div className="flex justify-center">
                    <input className="input input-bordered input-primary w-full max-w-xs" onChange={user_Input_Change}></input>
                    <button disabled = {button_disabled} className="btn btn-outline" onClick={Click}>Submit</button>
                </div>
            </ChatInput>
        </Page>
    );
}
