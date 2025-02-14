"use client"

import React from "react";
import Loading from "../loadingAnimation"
import { Conversation } from "@/app/api/conversations/[id]/route";

interface LoadingContextProps {
  feedbackSess: Conversation | undefined;
  updateFeedbackSession: React.Dispatch<React.SetStateAction<Conversation | undefined>>;
  currentPage: number;
  updateCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  ScenarioCount: number;
  updateScenariocount: any;
}

export const LoadingContext = React.createContext<LoadingContextProps>({
    feedbackSess: undefined,
    updateFeedbackSession: () => {}, 
    currentPage: 1, 
    updateCurrentPage: () => {},
    ScenarioCount: 4,
    updateScenariocount: () => {},
});

interface LoadingWrapperProps {
    children: React.ReactNode; 
}

  
export default function LoadingWrapper({ children }: LoadingWrapperProps) {

    const [isFetched, setIsFetched] = React.useState(false);
    const [currentPage, updateCurrentPage] = React.useState<number>(1);
    const [feedbackSess, updateFeedbackSession] = React.useState<Conversation | undefined>(); 
    const [ScenarioCount, updateScenariocount] = React.useState<number>();
    
    const conversationApi: () => Promise<Conversation> = async () => {
        const response = await fetch(`/api/conversations/${currentPage}`, {
            method: 'GET',
        });
        return await response.json();
    };
    
    const ScenarioCountApi: () => Promise<Array<Conversation>> = async () => {
        const response = await fetch(`/api/conversations/all`, {
            method: 'GET',
        });
        return await response.json();
    }

    React.useEffect(() => {
        const fetchData = async () => {
            const data = await conversationApi();
            updateFeedbackSession(data); 
        };

        fetchData();
    }, [currentPage]);
    
    
    React.useEffect(() => {
        const fetchData = async () => {
            const data = await ScenarioCountApi();
            console.log("lenght " + data.length);
            updateScenariocount(data.length); 
        };
        fetchData();
    }, []);

    React.useEffect(() => {
        if (!feedbackSess) {
            setTimeout(() => {
                setIsFetched(true)  
            }, 4500);
        }
    },[feedbackSess])

    return (
        isFetched && ScenarioCount ? (
            <LoadingContext.Provider
      value={{
        feedbackSess,
        updateFeedbackSession,
        currentPage,
        updateCurrentPage,
        ScenarioCount,
        updateScenariocount,
      }}
    >
      {children} {}
    </LoadingContext.Provider>
          
            
        ) : (
         <Loading></Loading>
        )  
    );
    
}
