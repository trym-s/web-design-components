import { ApprovalCard, type ApprovalQuestion } from "./approval-card";

const QUESTIONS: ApprovalQuestion[] = [
  { question: "How many flavors should we launch?", type: "single", options: ["Three (core line)", "Five (full case)", "Just one hero"] },
  { question: "Which mix-ins should we stock?", type: "multiple", options: ["Chocolate chips", "Waffle bits", "Sprinkles"] },
  { question: "Which market do we enter first?", type: "single", options: ["Food trucks", "Grocery freezers", "Scoop shops"] },
];

export default function Demo() {
  return <ApprovalCard questions={QUESTIONS} onSubmit={(answers) => console.log("answers", answers)} />;
}
