"use client"

import React from 'react';
import dynamic from 'next/dynamic';
const ICON = require('../../../public/animation.json');

export default function Convo() {    

  const Player: any = dynamic(
    () => import('@lordicon/react').then((mod) => mod.Player),
    { ssr: false }
  );
  const [windowsize, updatewindowsize] = React.useState(window.innerWidth)
  const [size,updatesize] = React.useState(400) 
  const playerRef = React.useRef<any>(null);

  const resize = () => {
      updatewindowsize(window.innerWidth);
  }

  React.useEffect(() => {
      window.addEventListener('resize', resize)
      return () => (
          window.removeEventListener('resize', resize)
      );

  },[])

  React.useEffect(() => {

    if (windowsize >= 3200) {
      updatesize(600)
    } else if (windowsize >= 2560) {
      updatesize(550)
    } else if (windowsize >= 1920) {
      updatesize(500)
    } else if (windowsize >= 1536) {
      updatesize(450)
    } else if (windowsize <= 667) {
      updatesize(250)
    } else if (windowsize <= 1024) {
      updatesize(350)
    }

      console.log(windowsize + " Thats was it")
    },[windowsize])

    return (
        <Player 
            size={size}
            icon={ ICON }
            ref={(instance: typeof Player) => {
                if (instance) {
                  playerRef.current = instance;
                  playerRef.current.playFromBeginning?.();
                   // Assign ref
                }
              }}
        />
    );
}

