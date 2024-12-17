"use client"

import React from 'react';
import { Player } from '@lordicon/react';
import dynamic from 'next/dynamic';

const ICON = require('../../../public/ConflictResolution.json');

interface airlineprops {
    animate: boolean;
}

export default function ConflictResolution({animate}: airlineprops) {    
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

