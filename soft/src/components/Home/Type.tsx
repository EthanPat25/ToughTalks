"use client";
import { TypewriterEffect } from "../../components/ui/typewriter-effect";

export function Typewriter() {
  const words = [
    {
      text: "Practice",
      className:
        "text-#181945-500 dark:text-#181945-500 xxs:portrait:text-3xl md:portrait:text-6xl lg:text-4xl xl:text-5xl 1.5xl:text-6xl 3xl:text-7xl 4xl:text-8xl",
    },
    {
      text: "Difficult",
      className:
        "text-#181945-500 dark:text-#181945-500 xxs:portrait:text-3xl md:portrait:text-6xl lg:text-4xl xl:text-5xl 1.5xl:text-6xl 3xl:text-7xl 4xl:text-8xl",
    },
    {
      text: "Conversations",
      className:
        "text-blue-500 dark:text-blue-500 xxs:portrait:text-3xl md:portrait:text-6xl lg:text-4xl xl:text-5xl 1.5xl:text-6xl 3xl:text-7xl 4xl:text-8xl",
    },
  ];
  return (
    <div
      className=" flex text-left items-start justify-start"
      style={{ color: "#181945", textAlign: "start" }}
    >
      <TypewriterEffect words={words} />
    </div>
  );
}
