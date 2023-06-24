"use client";

import axios from "axios";
import { useRef, useState, useEffect } from "react";
import useConversation from "@/src/hooks/useConversation";
import { FullMessageType } from "@/src/types";
import MessageBox from "./MessageBox";

interface BodyProps {
  initialMessage: FullMessageType[];
}

const Body = ({ initialMessage }: BodyProps) => {
  const [messages, setMessages] = useState(initialMessage);
  const bottomRef = useRef<HTMLDivElement>(null);
  const { conversationId } = useConversation();

  useEffect(() => {
    axios.post(`/api/conversations/${conversationId}/seen`);
  }, [conversationId]);

  return (
    <div className="flex-1 overflow-y-auto">
      {messages.map((message, i) => (
        <MessageBox
          isLast={i === messages.length - 1}
          key={message.id}
          data={message}
        />
      ))}
      <div ref={bottomRef} className="pt-24" />
    </div>
  );
};

export default Body;
