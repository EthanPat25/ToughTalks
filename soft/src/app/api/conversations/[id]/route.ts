import type { NextRequest } from 'next/server'

interface conflictDescriptionProps {
    title: string;
    description: string;
}

export interface DialogWithAvatarProps {
    alignment: "left" | "right";
    avatarName: string;
    conversation: string;
}

interface Feedback {
    question: string;
    prompt: string;
}

export interface Conversation {
    conflictDescription: conflictDescriptionProps;
    DialogWithAvatar: Array<DialogWithAvatarProps>;
    feedback: Feedback;
}

const conversations: Array<Conversation> = [
    { 
        conflictDescription:{
            title: "Who Was Supposed to Send it?",
            description: "Joshua and Ryan are working on a team project and have mistaken each others responsibilities. As a result, a deadline was missed.",
        },

        DialogWithAvatar: [
            {
                alignment: "left",
                avatarName: "Joshua",
                conversation: "Ryan, did you send the report to the client yesterday?"
            },
            {
                alignment: "right",
                avatarName: "Ryan",
                conversation: "Wait, I thought you were sending it. You’ve always been the one who handles submissions!"
            },
            {
                alignment: "left",
                avatarName: "Joshua",
                conversation: "That’s true, but you were finishing the draft last week, so I assumed you’d send it this time."
            },
            {
                alignment: "right",
                avatarName: "Ryan",
                conversation: "Well, if I knew you weren’t planning to send it, I would’ve done it myself. Why didn’t you check with me?"
            },
            {
                alignment: "left",
                avatarName: "Joshua",
                conversation: "Why didn’t you check with me? I thought we were on the same page."
            },
        ],

        feedback: {
            question: "How Can Joshua and Ryan Resolve This Misunderstanding?",
            prompt: ` You are tasked with providing concise, simple, and constructive feedback to the user's answer. 
                The context is workplace conflict resolution. At the end of your feedback, you will assign:
                1. A score out of 10 for the user's response.
                2. A Boolean field indicating whether the attempt was satisfactory (true) or unsatisfactory (false).

                The Boolean field is determined as follows:
                - If the user's response makes a reasonable attempt to address the scenario and provides relevant suggestions for resolving workplace conflict, mark it as "true."
                - If the response is unrelated or fails to address the scenario constructively, mark it as "false."

                ### Scoring Guidelines:
                - **0 points**: Completely unrelated or nonsensical responses (e.g., "Can you give me a pizza recipe?").
                - **1-3 points**: Responses that are provocative, unhelpful, or assign undue blame without suggesting constructive solutions.
                - **4-6 points**: Responses that provide minimal or vague suggestions, focus on the problem instead of solutions, or assign blame while making a minor effort to address the conflict.
                - **7-8 points**: Responses that emphasize cooperation, shared responsibility, and practical solutions but may lack depth or fail to address long-term prevention.
                - **9-10 points**: Exemplary responses that focus on immediate problem resolution, suggest cooperation and delegation of responsibilities, avoid assigning blame, and include a forward-looking strategy to prevent similar issues.

                ### Key Principles to Emphasize:
                - Avoid assigning blame in the immediate situation. Focus on solutions instead.
                - Encourage cooperation and shared responsibility.
                - Suggest actionable steps, such as a meeting to clarify roles and responsibilities.
                - Highlight the importance of moving quickly to resolve the current issue rather than dwelling on the mistake.
                - Acknowledge that, at a later date, a discussion on how to prevent similar misunderstandings is valuable.
                - Encourage both parties to accept partial responsibility to maintain a collaborative tone.

                ### Scenario Context:
                Joshua and Ryan missed a project deadline due to a misunderstanding about responsibilities. The discussion revolves around resolving this conflict effectively.

                **Scenario**: 
                "Who Was Supposed to Send it?"
                Joshua and Ryan are working on a team project and have mistaken each others' responsibilities. As a result, a deadline was missed.
                - Joshua: Ryan, did you send the report to the client yesterday?
                - Ryan: Wait, I thought you were sending it. You’ve always been the one who handles submissions!
                - Joshua: That’s true, but you were finishing the draft last week, so I assumed you’d send it this time.
                - Ryan: Well, if I knew you weren’t planning to send it, I would’ve done it myself. Why didn’t you check with me?
                - Joshua: Why didn’t you check with me? I thought we were on the same page.

                **User's Answer**:
                The user's response will be provided to you. If the user's answer is unrelated to resolving this conflict, assign a score of 0, mark "Satisfactory Completion" as false, and give feedback stating, "Your response was unrelated to the question. Please provide an answer relevant to resolving workplace conflict."

                ### Format Requirements:
                Always structure your response in the following strict JSON format:
                1. **Feedback:** Provide clear, constructive feedback. This field must ONLY contain feedback text and must NOT include the "score" or "satisfactoryCompletion" values.
                2. **Score:** Provide a numerical score out of 10. This field must remain separate and must NOT be referenced or repeated in the "feedback" field.
                3. **Satisfactory Completion:** Return a Boolean value, "true" for a satisfactory attempt or "false" for an unsatisfactory attempt. This field must remain separate and must NOT be referenced or repeated in the "feedback" field.

                **All three fields (Feedback, Score, Satisfactory Completion) must always be filled and strictly follow the format to allow consistent parsing.**`,
          },
    },
    { 
        conflictDescription:{
            title: "I Wasn’t Ready for That Responsibility",
            description: "A junior team member, Zoe, was assigned a task without enough guidance. Her manager, Daniel, realizes it wasn’t completed as expected.",
        },

        DialogWithAvatar: [
            {
                alignment: "left",
                avatarName: "Daniel",
                conversation: "Zoe, why didn’t you finish the client presentation? It’s due tomorrow."
            },
            {
                alignment: "right",
                avatarName: "Zoe",
                conversation: "I wasn’t sure how to structure it. I didn’t want to mess it up, so I thought it’d be better to wait for your input."
            },
            {
                alignment: "left",
                avatarName: "Daniel",
                conversation: "You should’ve reached out. I assumed you’d let me know if you were stuck."
            },
            {
                alignment: "right",
                avatarName: "Zoe",
                conversation: "I didn’t want to bother you. I think I need clearer instructions next time."
            },
        ],

        feedback: {
            question: "How can Daniel support Zoe’s growth while ensuring tasks are completed on time?",
            prompt: `You are tasked with providing concise, simple, and constructive feedback to the user's answer. 

        **User Question:** "How can Daniel support Zoe’s growth while ensuring tasks are completed on time?"  
        
        The context is **both a misunderstanding and a mentorship challenge** in the workplace. At the end of your feedback, you will assign:
        1. A score out of 10 for the user's response.
        2. A Boolean field indicating whether the attempt was satisfactory (true) or unsatisfactory (false).

        The Boolean field is determined as follows:
        - If the user's response makes a reasonable attempt to address the **misunderstanding** and **mentorship challenge**, mark it as "true."
        - If the response is unrelated or fails to address the scenario constructively, mark it as "false."

        ### Scoring Guidelines:
        - **0 points**: Completely unrelated or nonsensical responses (e.g., "Can you give me a pizza recipe?").
        - **1-3 points**: Responses that focus only on blame, fail to suggest any solutions, or ignore key elements of the scenario.
        - **4-6 points**: Responses that acknowledge the issue but provide vague or minimal solutions, without addressing both misunderstanding and mentorship.
        - **7-8 points**: Responses that offer practical solutions for **improving communication** and **clarifying expectations** but may not suggest a structured mentorship approach.
        - **9-10 points**: Exemplary responses that balance **resolving the misunderstanding, ensuring task completion, and fostering professional growth.** 

        ### Key Principles to Emphasize:
        - **Clarify expectations upfront**: Daniel should ensure Zoe understands task scope and deadlines clearly.
        - **Encourage open communication**: Zoe should feel comfortable reaching out if she needs help.
        - **Implement a mentorship approach**: Daniel should provide **support and guidance** while allowing Zoe to take responsibility.
        - **Find a balanced solution**: Daniel should avoid micromanaging but also ensure Zoe is **set up for success** with the right level of support.
        - **Prevent future misunderstandings**: They should establish a system for **checking in on progress before deadlines**.

        ### Scenario Context:
        Daniel, a manager, assigned a client presentation task to Zoe, a junior team member. However, Zoe was unsure how to complete it and hesitated to ask for help, leading to an unfinished task. Daniel wants to **avoid misunderstandings in the future** while **helping Zoe gain confidence in completing tasks independently**.

        **Scenario**:  
        - **Daniel**: "Zoe, why didn’t you finish the client presentation? It’s due tomorrow."  
        - **Zoe**: "I wasn’t sure how to structure it. I didn’t want to mess it up, so I thought it’d be better to wait for your input."  
        - **Daniel**: "You should’ve reached out. I assumed you’d let me know if you were stuck."  
        - **Zoe**: "I didn’t want to bother you. I think I need clearer instructions next time."  

        **User's Answer**:  
        The user's response will be provided to you. If the user's answer is unrelated to resolving this conflict, assign a score of 0, mark "Satisfactory Completion" as false, and give feedback stating, "Your response was unrelated to the question. Please provide an answer relevant to workplace communication and mentorship."

        ### Format Requirements:
        Always structure your response in the following strict JSON format:  
        1. **Feedback:** Provide clear, constructive feedback. This field must ONLY contain feedback text and must NOT include the "score" or "satisfactoryCompletion" values.  
        2. **Score:** Provide a numerical score out of 10. This field must remain separate and must NOT be referenced or repeated in the "feedback" field.  
        3. **Satisfactory Completion:** Return a Boolean value, "true" for a satisfactory attempt or "false" for an unsatisfactory attempt. This field must remain separate and must NOT be referenced or repeated in the "feedback" field.  

        **All three fields (Feedback, Score, Satisfactory Completion) must always be filled and strictly follow the format to allow consistent parsing.**`,
          },
    },
];

export async function GET(req: NextRequest, {params}:any) {
    console.log("sjdsj" + (await params)?.id);
    const id = (await params)?.id;

    if (id === 'all') {

        return new Response(JSON.stringify(conversations), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
        })
    }
    return new Response(JSON.stringify(conversations[id - 1]), {
        status: 200,
        headers: {
            'Content-Type': 'application/json',
        },
    })
}
