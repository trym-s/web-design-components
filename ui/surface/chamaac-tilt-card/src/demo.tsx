import { Cpu, Sparkles, TrendingUp, Users } from "lucide-react";
import TiltCard from "./tilt-card";

export default function Demo() {
  return (
    <TiltCard
      features={[
        { icon: Sparkles, title: "Automate Intelligence", description: "AI-driven workflow automation." },
        { icon: TrendingUp, title: "Adaptive Learning", description: "Improves with every interaction." },
        { icon: Cpu, title: "Context-Aware Decisions", description: "Understands context before acting." },
        { icon: Users, title: "Collaborative Agents", description: "Coordinates multiple AI agents." },
      ]}
    />
  );
}
