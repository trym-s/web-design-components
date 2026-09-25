import { useState } from "react";
import { BookOpen, Globe, Image as ImageIcon, Layout, Paperclip, Sparkles, Video } from "lucide-react";
import { AIInput, type Message } from "./ai-input";

const models = [
  { id: "gpt-4o", name: "GPT-4o", label: "GPT-4o", icon: Sparkles },
  { id: "gpt-4-turbo", name: "GPT-4 Turbo", label: "GPT-4 Turbo", icon: Sparkles },
  { id: "claude-3-5", name: "Claude 3.5", label: "Claude 3.5", icon: Sparkles },
  { id: "gemini-pro", name: "Gemini Pro", label: "Gemini Pro", icon: Sparkles },
];

const tools = [
  { icon: Globe, label: "Deep Research" },
  { icon: Video, label: "Create videos" },
  { icon: ImageIcon, label: "Create images" },
  { icon: Layout, label: "Canvas" },
  { icon: BookOpen, label: "Guided Learning" },
];

const plusMenu = [
  { id: "files", icon: Paperclip, label: "Upload photos & files" },
  { id: "videos", icon: Video, label: "Upload Videos" },
];

// Demo wiring only: a canned reply stands in for the model call the host would make.
export default function Demo() {
  const [messages, setMessages] = useState<Message[]>([]);
  return (
    <AIInput
      className="h-[600px]"
      models={models}
      tools={tools}
      plusMenuItems={plusMenu}
      placeholder="Ask anything..."
      messages={messages}
      onSubmit={(content, attachments) => {
        setMessages((prev) => [...prev, { id: `u-${Date.now()}`, role: "user", content, attachments: attachments.length ? attachments : undefined }]);
        setTimeout(() => setMessages((prev) => [...prev, { id: `a-${Date.now()}`, role: "ai", content: "Your response content here..." }]), 500);
      }}
    />
  );
}
