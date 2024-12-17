"use client"

import React from 'react';
import dynamic from 'next/dynamic';
const ICON = require('../../../public/Joshua.json');

interface airlineprops {
    animate: boolean;
}

export default function Joshua({animate}: airlineprops) {    
    const Player: any = dynamic(
        () => import('@lordicon/react').then((mod) => mod.Player),
        { ssr: false }
      );
  const playerRef = React.useRef<any>(null);
    React.useEffect(() => {
        playerRef.current?.playFromBeginning();
    }, [])

    return (
        <Player 
            size={200}
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
