import React from 'react';
import { Player } from '@lordicon/react';
const ICON = require('../../public/flight_attendant.json');

interface airlineprops {
    animate: boolean;
}

export default function Flight_attendant({animate}: airlineprops) {    
  const playerRef = React.useRef<Player>(null);
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
            updatesize(250)
        } 
        else if (windowsize <= 640) {
            updatesize(180)
        } 
    },[windowsize])

    return (
        <div className='h-full w-full'>
        <Player 
            size={size}
            ref={playerRef} 
            icon={ ICON }
        />
        </div>
    );
}