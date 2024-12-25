"use client"

import React from 'react';
import dynamic from 'next/dynamic';

const ICON = require('../../../public/conflict.json');

interface airlineprops {
    animate: boolean;
}

export default function Conflict({animate}: airlineprops) {  
const [windowsize, updatewindowsize] = React.useState(window.innerWidth)
const [size,updatesize] = React.useState(180) 
const Player: any = dynamic(
        () => import('@lordicon/react').then((mod) => mod.Player),
        { ssr: false }
      );   
  const playerRef = React.useRef<any>(null);
    React.useEffect(() => {
        playerRef.current?.playFromBeginning();
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
            if (windowsize > 768) {
                updatesize(400)
            } 
            else if (windowsize <= 768) {
                updatesize(250)
            } 
        },[windowsize])

    return (
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
    );
}
