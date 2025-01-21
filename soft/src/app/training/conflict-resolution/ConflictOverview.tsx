import React from "react"
import { StringValidation } from "zod";

interface ConflictOverviewProps {
    scenario: string | undefined;
    context: string | undefined;
}

export function ConflictOverview({scenario, context}:ConflictOverviewProps) {
    return (
        <div className="lg:ml-32 lg:mr-32 xl:ml-60 xl:mr-60 lg:mt-5 z-40 2xl:mr-96 2xl:ml-96">
            <h1 className="font-extrabold text-xl mb-5">{scenario}</h1>
            <p>{context}</p>
            <h2 className="font-extrabold text-xl mt-5">Conversation:</h2>
        </div>
    )
}