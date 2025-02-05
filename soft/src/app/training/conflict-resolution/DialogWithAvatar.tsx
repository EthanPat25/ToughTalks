"use client"

import { Daniel } from "@/components/Training_module_Components/Daniel";
import { Joshua } from "@/components/Training_module_Components/Joshua";
import { Ryan } from "@/components/Training_module_Components/Ryan";
import { Zoe } from "@/components/Training_module_Components/Zoe";
import React from "react";


export interface DialogWithAvatarProps {
    alignment: "left" | "right";
    Avatar: React.ComponentType<{animate: boolean}>;
    name: string;
    conversation: string;
}

interface alignment {
    avatarTailwind: string;
    chatBubbleTailwind: string;

}

const leftAlignment: alignment = {
    avatarTailwind: "flex flex-row",
    chatBubbleTailwind: "relative lg:right-8 lg:bottom-7 chat chat-start lg:pr-40 xl:pr-60"
}

const rightAlignment: alignment = {
    avatarTailwind: "flex flex-row-reverse",
    chatBubbleTailwind: "relative lg:left-8 bottom-7 chat chat-end lg:pl-40 xl:pl-60"
}


export function DialogWithAvatar({alignment, Avatar, name, conversation}:DialogWithAvatarProps) {

    const AvatarComponent = {
        Joshua: Joshua,
        Ryan: Ryan,
        Daniel: Daniel,
        Zoe: Zoe,
    }[name] || null;

    return (
        <div className={alignment === "right" ? (rightAlignment.avatarTailwind):(leftAlignment.avatarTailwind)}>
            <div className="relative">
                <div>
                    {
                        AvatarComponent ? <AvatarComponent animate={true} /> : <h1>Faailed to Load</h1>
                    }
                </div>
                <h2 className="text-center font-semibold">
                    {name}
                </h2>
            </div>
            <div>
                <div className={alignment === "right" ? (rightAlignment.chatBubbleTailwind):(leftAlignment.chatBubbleTailwind)}>
                    <p className="chat-bubble">
                        {conversation}
                    </p>
                </div>
            </div>
        </div>
    )
}