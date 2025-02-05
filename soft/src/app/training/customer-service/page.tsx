"use client"
import React, { useRef } from "react"
import styled from "styled-components"


export const Page = styled.div`

`

export default function ChatPage() {

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

        /*

    React.useEffect(() => {
        if (msgref.current !== null) {
            msgref.current.scrollIntoView(true)
        }

    }, [conversation_History])

    */
    
    return (
        <Page>
               {/*
            <ChatArea className={`${chatvisibility} p-16 overflow-scroll box-border grow-[3] shrink-[1] basis-0`}>  
                {conversation_History?.slice(1).map((element) => (
                    <ChatBox ref = {msgref} messageContent= {element.content} UserOrManager= {element.role} disabled = {true}></ChatBox>
                )
            )}
            </ChatArea>
            */}
        </Page>
    );
}
