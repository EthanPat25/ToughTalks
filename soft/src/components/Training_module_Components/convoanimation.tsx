import React from 'react';
import { Player } from '@lordicon/react';
const ICON = require('../../../public/animation.json');
export default function Convo() {    
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