"use client";
import React, { useEffect, useRef, useState } from "react";
import { useMotionValueEvent, useScroll } from "framer-motion";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const StickyScroll = ({
  content,
  contentClassName,
  endContent,
}: {
  content: {
    title: string;
    description: string;
    content?: React.ReactNode | any;
  }[];
  contentClassName?: string;
  endContent?: any;
}) => {
  const [activeCard, setActiveCard] = React.useState(0);
  const ref = useRef<any>(null);
  const { scrollYProgress } = useScroll({
    // uncomment line 22 and comment line 23 if you DONT want the overflow container and want to have it change on the entire page scroll
    // target: ref
    container: ref,
    offset: ["start start", "end start"],
  });
  const cardLength = content.length + 1.5;

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const cardsBreakpoints = content.map((_, index) => index / cardLength);
    const closestBreakpointIndex = cardsBreakpoints.reduce(
      (acc, breakpoint, index) => {
        const distance = Math.abs(latest - breakpoint);
        if (distance < Math.abs(latest - cardsBreakpoints[acc])) {
          return index;
        }
        return acc;
      },
      0
    );
    setActiveCard(closestBreakpointIndex);
  });

  const backgroundColors = ["slate-50", "slate-50", "slate-50)"];
  const linearGradients = [
    "linear-gradient(to bottom right, var(--cyan-500), var(--emerald-500))",
    "linear-gradient(to bottom right, var(--pink-500), var(--indigo-500))",
    "linear-gradient(to bottom right, var(--orange-500), var(--yellow-500))",
  ];

  const [backgroundGradient, setBackgroundGradient] = useState(
    linearGradients[0]
  );

  useEffect(() => {
    setBackgroundGradient(linearGradients[activeCard % linearGradients.length]);
  }, [activeCard]);

  return (
    <>
      <motion.div
        animate={{
          backgroundColor:
            backgroundColors[activeCard % backgroundColors.length],
        }}
        className="h-full overflow-y-auto justify-center relative rounded-md p-10"
        ref={ref}
      >
        <div className="w-full flex justify-center items-center">
          <h1 className="text-center font-bold">Quick Start</h1>
        </div>
        <div className="flex space-x-10">
          <div className="div relative flex items-start px-4">
            <div className="max-w-2xl">
              {content.map((item, index, arr) => (
                <div
                  key={item.title + index}
                  className={index === arr.length - 1 ? "mt-20 mb-10" : "my-20"}
                >
                  <motion.h2
                    initial={{
                      opacity: 0,
                    }}
                    animate={{
                      opacity: activeCard === index ? 1 : 0.3,
                    }}
                    className="text-2xl font-bold text-[RGB(10,10,10)]"
                  >
                    {item.title}
                  </motion.h2>
                  <motion.p
                    initial={{
                      opacity: 0,
                    }}
                    animate={{
                      opacity: activeCard === index ? 1 : 0.3,
                    }}
                    className="text-kg text-[#74758f] max-w-sm mt-10"
                  >
                    {item.description}
                  </motion.p>
                </div>
              ))}
            </div>
          </div>
          <div
            style={{ background: backgroundGradient }}
            className={cn(
              "hidden lg:block h-60 w-80 rounded-md bg-white sticky top-10 overflow-hidden",
              contentClassName
            )}
          >
            {content[activeCard].content ?? null}
          </div>
        </div>
        {endContent()}
      </motion.div>
    </>
  );
};
