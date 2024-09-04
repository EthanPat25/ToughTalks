import React from 'react';
import { Player } from '@lordicon/react';
const ICON = require('../../../public/retail.json');
export default function Retailanimation() {    
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