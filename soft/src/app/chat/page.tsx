"use client"
import React, { useRef } from "react"
import styled from "styled-components"
import  ChatBox  from "../../components/Chat_Components/chatbox";
import { message } from "../../components/Home/main";
import { Input }  from "../../components/ui/textinput"
import { Button } from "../../components/ui/button"


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
    const [scenariovisibility, updatescenariovisibility] = React.useState<string | null>('hidden')
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
        <Page className="bg-white h-full w-full flex-grow flex flex-col" id="hello">
            <ScenarioOverview className=" flex w-full justify-center items-center">
            <div role="tablist" className="tabs tabs-boxed w-2/5">
                <a role="tab" className={`tab bg-neutral-content ${toggleOne}`} onClick={() => {toggle(1)}}>Chat</a>
                <a role="tab" className={`tab bg-neutral-content ${toggleTwo}`} onClick={() => {toggle(2)}}>Scenario</a>
            </div>
            </ScenarioOverview>
            <ChatArea className={`${chatvisibility} p-16 overflow-scroll box-border`}>  
                {conversation_History?.slice(1).map((element) => (
                    <ChatBox ref = {msgref} messageContent= {element.content} UserOrManager= {element.role} disabled = {true}></ChatBox>
                )
            )}
            </ChatArea>
            <ScenarioArea className={`${scenariovisibility}`}>
            </ScenarioArea>    
            <ChatInput className={`${chatvisibility} flex items-center justify-center`}>

            <div className="flex w-full max-w-sm items-center space-x-2">
                <Input type="email" placeholder="Send Message"  onChange={user_Input_Change}/>
                 <Button disabled = {button_disabled}  onClick={Click} type="submit" variant="outline">Send</Button>
            </div>

            <Button disabled = {button_disabled} type="submit" variant="outline" size= "icon" className="rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 17h.01"/><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7z"/><path d="M9.1 9a3 3 0 0 1 5.82 1c0 2-3 3-3 3"/></svg>
            </Button>

            </ChatInput>
        </Page>
    );
}



