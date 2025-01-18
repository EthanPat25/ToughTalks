import React from 'react'
import ReactPlayer from 'react-player'
 
export default function Video() {

    return (   
        // Render a YouTube video player

        <div className="rounded-lg overflow-hidden">
  <video className="w-full h-auto" controls>
    <source src="https://www.youtube.com/watch?v=LXb3EKWsInQ" type="video/mp4" />
    Your browser does not support the video tag.
  </video>
</div>

    );
}