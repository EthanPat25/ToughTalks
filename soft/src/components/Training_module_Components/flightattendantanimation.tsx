"use client"

import React from 'react';
import dynamic from 'next/dynamic';
const ICON = require('../../../public/flight_attendant.json');

interface airlineprops {
    animate: boolean;
}

export default function Flight_attendant({animate}: airlineprops) {   

    const Player: any = dynamic(
        () => import('@lordicon/react').then((mod) => mod.Player),
        { ssr: false }
    );
  const playerRef = React.useRef<any>(null);
  const [windowsize, updatewindowsize] = React.useState(window.innerWidth)
  const [size,updatesize] = React.useState(400)

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
        } else if (windowsize <= 400) {
              updatesize(250)
        } else if (windowsize <= 667) {
            updatesize(300)
        } 
      
``  },[windowsize])

    return (
        <div className='h-full w-full'>
                  <Player 
            size={size}
            icon={ ICON }
            ref={(instance: typeof Player) => {
                if (instance) {
                  playerRef.current = instance; // Assign ref
                  playerRef.current.playFromBeginning?.(); // Trigger animation
                }
              }}
        />
        </div>
    );
}
