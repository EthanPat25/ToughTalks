"use client";
import { TypewriterEffect } from "../components/ui/typewriter-effect";
export function Typewriter() {
  const words = [
    {
      text: "Practice",
      className: "text-#181945-500 dark:text-#181945-500 size-3em",

    },
    {
      text: "Difficult",
      className: "text-#181945-500 dark:text-#181945-500",

    },
    {
      text: "Conversations",
      className: "text-blue-500 dark:text-blue-500",

    },
  ];
  return (
    <div className=" flex items-start justify-start" style={{color: "#181945", textAlign: 'start' }}>
      <TypewriterEffect words={words}/>
    </div>
  );
}
