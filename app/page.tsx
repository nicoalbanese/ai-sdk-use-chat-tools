"use client";

import { useChat } from "ai/react";

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    onToolCall({ toolCall }) {
      console.log(toolCall, "hello");
      return "Hello";
    },
  });
  return (
    <div>
      {messages.map((m) => (
        <div key={m.id}>
          {m.role}:{"\n"}
          {m.content}
          <pre>{JSON.stringify(m, null, 2)}</pre>
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
