"use client"

import React from 'react';
import { Player } from '@lordicon/react';
const ICON = require('../../../public/customer_service.json');

interface airlineprops {
    animate: boolean;
}

export default function Customer({animate}: airlineprops) {    
  const playerRef = React.useRef<Player>(null);
    React.useEffect(() => {
        playerRef.current?.playFromBeginning();
    }, [])

    return (
        <Player 
            size={200}
            ref={playerRef} 
            icon={ ICON }
        />
    );
}