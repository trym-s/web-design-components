import { QuestionnaireDemo as E0 } from "./examples/questionnaire-demo";
import { QuestionnaireMultiple as E1 } from "./examples/questionnaire-multiple";
import { QuestionnaireFreeform as E2 } from "./examples/questionnaire-freeform";
import { QuestionnaireSkipExample as E3 } from "./examples/questionnaire-skip";
import { QuestionnaireShortcuts as E4 } from "./examples/questionnaire-shortcuts";
import { QuestionnaireValidation as E5 } from "./examples/questionnaire-validation";
import { QuestionnaireControlled as E6 } from "./examples/questionnaire-controlled";
import { QuestionnaireResume as E7 } from "./examples/questionnaire-resume";
import { QuestionnaireConditional as E8 } from "./examples/questionnaire-conditional";
import { QuestionnaireNavigationState as E9 } from "./examples/questionnaire-navigation-state";
import { QuestionnaireProgressExample as E10 } from "./examples/questionnaire-progress";
import { QuestionnaireAnimated as E11 } from "./examples/questionnaire-animated";
import { QuestionnaireCard as E12 } from "./examples/questionnaire-card";
import { QuestionnaireDialog as E13 } from "./examples/questionnaire-dialog";
import { ShadcnFrame } from "../../../_sources/shadcn/frame";

const examples = [
  { name: "questionnaire-demo", title: "Questionnaire Demo", component: E0 },
  { name: "questionnaire-multiple", title: "Questionnaire Multiple", component: E1 },
  { name: "questionnaire-freeform", title: "Questionnaire Freeform", component: E2 },
  { name: "questionnaire-skip", title: "Questionnaire Skip", component: E3 },
  { name: "questionnaire-shortcuts", title: "Questionnaire Shortcuts", component: E4 },
  { name: "questionnaire-validation", title: "Questionnaire Validation", component: E5 },
  { name: "questionnaire-controlled", title: "Questionnaire Controlled", component: E6 },
  { name: "questionnaire-resume", title: "Questionnaire Resume", component: E7 },
  { name: "questionnaire-conditional", title: "Questionnaire Conditional", component: E8 },
  { name: "questionnaire-navigation-state", title: "Questionnaire Navigation State", component: E9 },
  { name: "questionnaire-progress", title: "Questionnaire Progress", component: E10 },
  { name: "questionnaire-animated", title: "Questionnaire Animated", component: E11 },
  { name: "questionnaire-card", title: "Questionnaire Card", component: E12 },
  { name: "questionnaire-dialog", title: "Questionnaire Dialog", component: E13 },
];

export default function Demo() {
  return <ShadcnFrame examples={examples} />;
}
