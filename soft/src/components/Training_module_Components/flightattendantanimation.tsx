"use client";

import React from "react";
import dynamic from "next/dynamic";
const ICON = require("../../../public/flight_attendant.json");

interface AirlineProps {
  animate: boolean;
}

export default function Flight_attendant({ animate }: AirlineProps) {
  const Player: any = dynamic(
    () => import("@lordicon/react").then((mod) => mod.Player),
    { ssr: false }
  );

  const playerRef = React.useRef<any>(null);
  const [size, setSize] = React.useState(200);

  React.useEffect(() => {
    let timeout: NodeJS.Timeout;

    const handleResize = () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        const scale = Math.min(
          window.innerWidth * 0.5, // 20% of width
          window.innerHeight * 0.5 // 20% of height
        );
        setSize(scale);
      }, 100); // debounce
    };

    handleResize(); // set initial
    window.addEventListener("resize", handleResize);

    return () => {
      clearTimeout(timeout);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="h-full w-full flex items-center justify-center">
      <Player
        size={size}
        icon={ICON}
        ref={(instance: typeof Player) => {
          if (instance) {
            playerRef.current = instance;
            if (animate) {
              playerRef.current.playFromBeginning?.();
            }
          }
        }}
      />
    </div>
  );
}
