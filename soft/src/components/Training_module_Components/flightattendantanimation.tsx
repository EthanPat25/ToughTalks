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
  const [size,updatesize] = React.useState(180)
    React.useEffect(() => {
        if (animate == true) {
            playerRef.current?.playFromBeginning();
        }
    }, [])

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
        if (windowsize > 640) {
            updatesize(400)
        } 
        else if (windowsize <= 640) {
            updatesize(250)
        } 
    },[windowsize])

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
