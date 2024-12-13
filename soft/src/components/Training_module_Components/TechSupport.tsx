"use client"

import React from 'react';
import { Player } from '@lordicon/react';
const ICON = require('../../../public/TechSupport.json');

interface airlineprops {
    animate: boolean;
}

export default function TechSupport({animate}: airlineprops) {    
  const playerRef = React.useRef<Player>(null);
    React.useEffect(() => {
        playerRef.current?.playFromBeginning();
    }, [])

    return (
        <Player 
            size={400}
            ref={playerRef} 
            icon={ ICON }
        />
    );
}