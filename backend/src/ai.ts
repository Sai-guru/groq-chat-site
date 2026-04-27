import OpenAI from "openai";
import 'dotenv/config'; 

const client = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});

export const getGroqChatResponse = async (userInput: string) => {
  const res =  await client.chat.completions.create({
    model: "openai/gpt-oss-20b",
    messages: [
      {
        role: "user",
        content: userInput,
      },
    ],
  });
  return res.choices[0]?.message?.content ?? "";
};
