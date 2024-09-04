import { message } from "../components/Home/main";
import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export const SendMessage =  async (data: Array<message>): Promise<string | null> => {
    try {
        console.log(data);

        const completion = await openai.chat.completions.create({
            messages: data,
            model: "gpt-4o",
        });
        // Add Logic for when openai returns back not a string
        return completion.choices[0].message.content;
    } catch (error) {
        console.log("Await operation failed");
        throw error; 
    }
}
