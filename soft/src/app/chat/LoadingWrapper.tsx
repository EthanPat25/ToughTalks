"use client"

import React from "react";
import Loading from "./loadingAnimation";

interface LoadingWrapperProps {
    ChildrenComponents: React.ReactNode; // Accept JSX (ReactNode) instead of a component
  }


export default function LoadingWrapper({ ChildrenComponents }: LoadingWrapperProps) {

    const [isReady, setIsReady] = React.useState(false);

    // Simulate any initialization/loading process
    React.useEffect(() => {
        const timer = setTimeout(() => {
            setIsReady(true); // Allow the page to render after 2 seconds
        }, 5000); // Replace with the time your animation needs

        return () => clearTimeout(timer);
    }, []);

    if (!isReady) {
        return <Loading></Loading>; // Show the loading animation
    }
    return <>{ChildrenComponents}</>;
}
