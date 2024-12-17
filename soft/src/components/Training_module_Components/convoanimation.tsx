"use client"

import React from 'react';
import dynamic from 'next/dynamic';
const ICON = require('../../../public/animation.json');
export default function Convo() {    
    const Player: any = dynamic(
        () => import('@lordicon/react').then((mod) => mod.Player),
        { ssr: false }
      );
  const playerRef = React.useRef<any>(null);

    React.useEffect(() => {
        playerRef.current?.playFromBeginning();
   
    }, [Player])

    return (
        <Player 
            size={400}
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

