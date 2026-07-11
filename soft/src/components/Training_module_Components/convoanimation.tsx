"use client";

import React from "react";
import dynamic from "next/dynamic";
const ICON = require("../../../public/animation.json");

export default function Convo() {
  const Player: any = dynamic(
    () => import("@lordicon/react").then((mod) => mod.Player),
    { ssr: false }
  );

  const [windowsize, setWindowsize] = React.useState(0);
  const [size, setSize] = React.useState(600);
  const playerRef = React.useRef<any>(null);

  React.useEffect(() => {
    const handleResize = () => setWindowsize(window.innerWidth);
    handleResize(); // set initial size once client loads
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  React.useEffect(() => {
    if (windowsize >= 3200) setSize(600);
    else if (windowsize >= 2560) setSize(550);
    else if (windowsize >= 1920) setSize(500);
    else if (windowsize >= 1536) setSize(500);
    else if (windowsize >= 1024) setSize(450);
    else if (windowsize >= 668) setSize(350);
    else if (windowsize > 0) setSize(250);
  }, [windowsize]);

  return (
    <Player
      size={size}
      icon={ICON}
      ref={(instance: typeof Player) => {
        if (instance) {
          playerRef.current = instance;
          playerRef.current.playFromBeginning?.();
        }
      }}
    />
  );
}
