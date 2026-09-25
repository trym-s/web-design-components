import { CheckboxCheck } from "./checkbox-check";

export default function Demo() {
  return (
    <div className="flex h-[260px] w-[296px] items-center justify-center rounded-xl bg-muted/40 p-4">
      <label className="flex cursor-pointer items-center gap-2.5 text-sm font-medium">
        <CheckboxCheck />
        Notify me
      </label>
    </div>
  );
}
