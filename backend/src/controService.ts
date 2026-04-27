import express from "express";
import type { Request, Response } from "express";
import { getGroqChatResponse } from "./ai.js";

import type { Router } from "express";

const router: Router = express.Router();

router.post("/chat", async (req: Request, res: Response) => {
    const { userInput } = req.body;
   if(!userInput) {
    return res.status(400).json({ error: "userInput is required" });
   }
   
    try {
        const aiResponse = await getGroqChatResponse(userInput);
        res.json({ message:  aiResponse });

    } catch (error) {
        // console.error("Error fetching AI response:", error);

        res.status(500).json({ error: "Failed to fetch AI response" });
    }
});
export default router;