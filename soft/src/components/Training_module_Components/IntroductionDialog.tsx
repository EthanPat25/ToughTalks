"use client";
import React from "react";
import { StickyScroll } from "../ui/sticky-scroll-reveal";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { ChatBubble } from "./ChatBubbe";
import { AnswerQuestion } from "./AnswerQuestion";
import { FeedbackAnimation } from "./FeedbackAnimation";

interface introductionDialogProp {
  open: boolean;
  updatePopup: React.Dispatch<React.SetStateAction<boolean>>;
}

const content = [
  {
    title: "Step 1: Read the Conversation",
    description:
      "Work together in real time with your team, clients, and stakeholders. Collaborate on documents, share ideas, and make decisions quickly. With our platform, you can streamline your workflow and increase productivity.",
    content: (
      <div className="h-full w-full bg-[linear-gradient(to_bottom_right,var(--cyan-500),var(--emerald-500))] flex items-center justify-center text-white">
        <ChatBubble animate={true}></ChatBubble>
      </div>
    ),
  },
  {
    title: "Step 2: Answer the Question",
    description: "Receive personalized feedback tailored to your response",
    content: (
      <div className="h-full w-full  flex items-center justify-center text-white">
        <AnswerQuestion animate={true}></AnswerQuestion>
      </div>
    ),
  },
  {
    title: "Step 3: Get AI Feedback & Score",
    description:
      "Experience real-time updates and never stress about version control again. Our platform ensures that you're always working on the most recent version of your project, eliminating the need for constant manual updates. Stay in the loop, keep your team aligned, and maintain the flow of your work without any interruptions.",
    content: (
      <div className="h-full w-full bg-[linear-gradient(to_bottom_right,var(--orange-500),var(--yellow-500))] flex items-center justify-center text-white">
        <FeedbackAnimation animate={true}></FeedbackAnimation>
      </div>
    ),
  },
];
export function IntroductionDialog({
  open,
  updatePopup,
}: introductionDialogProp) {
  const onClose = () => {
    updatePopup(false);
  };

  const Button = () => {
    return (
      <div className="flex justify-center items-center">
        <button
          onClick={() => updatePopup(false)}
          className="w-5/6 h-12 bg-slate-800 text-white text-center"
        >
          Understood
        </button>
      </div>
    );
  };

  return (
    <Dialog modal={true} open={open}>
      <DialogTitle className="hidden"></DialogTitle>
      <DialogTrigger asChild></DialogTrigger>
      <DialogContent
        onClose={onClose}
        className="h-[33rem] w-[46rem] rounded-3xl"
      >
        <div className="w-full h-[33rem]">
          <StickyScroll content={content} endContent={Button} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
