import React from "react";
import styled from "styled-components"
import TypingAnimation from "./ui/typinganimaiton";

interface ChatBoxProps {
  messageContent: string,
  UserOrManager: string,
  disabled: boolean,
}

export function ChatBox({messageContent, UserOrManager, disabled}: ChatBoxProps ) {

  let chat_position ='chat chat-start';

  if (UserOrManager === 'user') {
    chat_position = 'chat chat-end';
    disabled = false;
  } 
  return (
    <div className={chat_position}>
      { disabled ? ( 
              <div className="chat-bubble"><TypingAnimation duration={30} text ={messageContent}/></div> 
            ): (
              <div className="chat-bubble">{messageContent}</div>
            )}
        <div className="chat-footer opacity-50">Delivered</div>
    </div>
  );
}