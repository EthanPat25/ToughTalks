import React from "react";
import Link from "next/link";
import { Tag } from "../ui/Tag";

export interface SlideInterface {
    title: string;
    index: number;
    AnimationComponent: React.ComponentType<{ animate: boolean }>;
    inView: boolean;
    link: string;
    buttonColor: string;
    completed: boolean;
}

export const Slide = React.forwardRef<HTMLHeadingElement, SlideInterface>(
  ({ title, index, AnimationComponent, inView, link, buttonColor, completed}, ref) => {
    console.log("CurrentSlide: " + index + " SlidesInView: " + inView);

    return (
      <>
        <div className="flex-[0.7] flex items-center">
          {/* Apply the ref here */}
          <h1 ref={ref} className="text-xl font-semibold">{title}</h1>
        </div>
        <div className="flex-[4]">
          {inView ? (
            <AnimationComponent animate={true} />
          ) : (
            <></>
          )}
        </div>
        <div className="flex-[0.5] flex justify-center items-center relative">
          <button
            className="px-8 py-2 rounded-md text-white font-bold transition duration-200 hover:bg-white hover:text-black border-2 border-transparent"
            style={{
              backgroundColor: buttonColor,
              borderColor: buttonColor,
            }}
          >
            <Link href={link}>Try Now</Link>
          </button>
          {
            completed ? (
              <></>
            ) : (
              <Tag name = "Coming Soon"></Tag>
            )
          }
        </div>
      </>
    );
  }
);

