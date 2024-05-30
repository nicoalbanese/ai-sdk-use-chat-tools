"use client";

import { useChat } from "ai/react";

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    experimental_maxAutomaticRoundtrips: 1,
  });
  return (
    <div>
      {messages.map((m) => (
        <div key={m.id}>
          {m.toolInvocations ? (
            <div>[tool call: {m.toolInvocations[0].toolName}]</div>
          ) : (
            <div>
              {m.role}:{"\n"}
              {m.content}
            </div>
          )}
        </div>
      ))}
      <form onSubmit={handleSubmit}>
        <input
          value={input}
          placeholder="Say something..."
          onChange={handleInputChange}
        />
      </form>
    </div>
  );
}
