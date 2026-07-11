import { message } from "../components/Home/main";
import OpenAI from "openai";
import { z } from "zod";
import { zodResponseFormat } from "openai/helpers/zod";

const openai = new OpenAI();

export interface openAiStructuretype {
  feedBack: string;
  score: number;
  satisfactoryCompletion: boolean;
}

export interface responseError {
  error: string;
}

const openAiStructure = z.object({
  feedBack: z.string(),
  score: z.number(),
  satisfactoryCompletion: z.boolean(),
});

export const SendMessage = async (
  data: Array<message>
): Promise<openAiStructuretype | null> => {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: data,
      response_format: zodResponseFormat(openAiStructure, "Structure"),
    });
    // Add Logic for when openai returns back not a string
    return JSON.parse(completion.choices[0].message.content as string);
  } catch (error) {
    console.log("Error: " + error);
    console.log("Await operation failed");
    throw error;
  }
};
