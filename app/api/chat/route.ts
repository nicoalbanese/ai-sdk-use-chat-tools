import { openai } from "@ai-sdk/openai";
import { convertToCoreMessages, streamText, tool } from "ai";
import { z } from "zod";

export async function POST(request: Request) {
  const { messages } = await request.json();
  const result = await streamText({
    model: openai("gpt-4o"),
    messages: convertToCoreMessages(messages),
    tools: {
      weather: tool({
        description: "Get weather",
        parameters: z.object({
          location: z.string(),
          unit: z.enum(["celsius", "fahrenheit"]),
        }),
        execute: async ({ location, unit }) => {
          const locRes = await fetch(
            `https://nominatim.openstreetmap.org/search?q=${location}&format=json&limit=1`,
          );
          const loc = await locRes.json();
          const { lat, lon } = loc[0];
          const weatherRes = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m&temperature_unit=${unit}`,
          );
          const weather = await weatherRes.json();
          const temp = weather.current.temperature_2m;
          return { temperature: temp, unit };
        },
      }),
    },
  });
  return result.toAIStreamResponse();
}
