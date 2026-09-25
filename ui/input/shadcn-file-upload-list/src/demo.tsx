import { FileUploadList as E0 } from "./examples/file-upload-list";
import { ShadcnFrame } from "../../../_sources/shadcn/frame";

const examples = [
  { name: "file-upload-list", title: "File Upload List · not on docs page", component: E0 },
];

export default function Demo() {
  return <ShadcnFrame examples={examples} />;
}
