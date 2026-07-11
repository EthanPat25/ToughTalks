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

interface CarouselSlideProps extends SlideInterface {
  updateIsTryNowTriggered: (value: boolean) => void;
}

export const CarouselSlide = React.forwardRef<HTMLHeadingElement, CarouselSlideProps>(
  ({ title, index, AnimationComponent, inView, link, buttonColor, completed, updateIsTryNowTriggered}, ref) => {
    console.log("CurrentSlide: " + index + " SlidesInView: " + inView);

    return (
      <>
        <div className="flex-[0.7] flex items-center">
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

          {

    
        completed ? (

          <Link href={link}>

          <button
            className="px-8 py-2 rounded-md text-white font-bold transition duration-200 hover:bg-white hover:text-black border-2 border-transparent"
            style={{
              backgroundColor: buttonColor,
              borderColor: buttonColor,
            }}
           
          >
            Try Now
             </button>
          
          </Link>

        ) : (
          <>
          <button
            className="px-8 py-2 rounded-md text-white font-bold transition duration-200 hover:bg-white hover:text-black border-2 border-transparent"
            style={{
              backgroundColor: buttonColor,
              borderColor: buttonColor,
            }}
            onClick={() => {
              if (!completed) {
                updateIsTryNowTriggered(true)
              }
            }}
          >
            Try Now

</button>

<Tag name = "Coming Soon"></Tag>

</>

        )

      }

        </div>
      </>
    );
  }
);

