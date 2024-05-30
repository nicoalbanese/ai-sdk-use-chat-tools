import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";
import { z } from "zod";

export async function POST(request: Request) {
  const { messages } = await request.json();
  const result = await streamText({
    model: openai("gpt-4o"),
    messages,
    tools: {
      weather: {
        description: "Get weather",
        parameters: z.object({ location: z.string() }),
        execute: async function () {
          return 24;
        },
      },
    },
  });
  return result.toAIStreamResponse();
}
