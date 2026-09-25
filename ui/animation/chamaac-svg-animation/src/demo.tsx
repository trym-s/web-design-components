import { Brain, Code, FileText, Languages, MessageCircle, PenLine } from "lucide-react";
import SvgAnimation from "./svg-animation";
import gpt from "./demo-assets/gpt.jpg";

const trends = [
  { id: "textgeneration", name: "Text Generation", icon: PenLine },
  { id: "codegeneration", name: "Code Generation", icon: Code },
  { id: "translation", name: "Translation", icon: Languages },
  { id: "chat", name: "Chat & Conversation", icon: MessageCircle },
  { id: "contentcreation", name: "Content Creation", icon: FileText },
  { id: "reasoning", name: "Reasoning & Analysis", icon: Brain },
];

// Upstream renders this on black; `dark` switches the shadcn tokens for this subtree.
export default function Demo() {
  return <SvgAnimation className="dark" trends={trends} imageSrc={gpt} imageAlt="Trends" onSelect={(id) => console.log(id)} />;
}
