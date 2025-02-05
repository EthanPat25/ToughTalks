"use client"

import React from "react";
import Loading from "./loadingAnimation";

interface LoadingWrapperProps {
    ChildrenComponents: React.ReactNode; 
  }


export default function LoadingWrapper({ ChildrenComponents }: LoadingWrapperProps) {

    const [isReady, setIsReady] = React.useState(false);

    React.useEffect(() => {
        const timer = setTimeout(() => {
            setIsReady(true); // Allow the page to render
        }, 5000); 

        return () => clearTimeout(timer);
    }, [ChildrenComponents])

    // Simulate any initialization/loading process

    if (!isReady) {
        return <Loading></Loading>; // Show the loading animation
    }
    return <>{ChildrenComponents}</>;
}
