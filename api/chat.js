// Vercel serverless function: POST /api/chat
import { chat, errorResponse } from "../lib/agent.js";

export const config = { maxDuration: 60 };

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }
  try {
    const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body || {};
    res.status(200).json(await chat(body));
  } catch (err) {
    console.error("chat error:", err);
    const { status, msg } = errorResponse(err);
    res.status(status).json({ error: msg });
  }
}
