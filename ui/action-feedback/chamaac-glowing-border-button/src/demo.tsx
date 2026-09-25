import GlowingBorderButton from "./glowing-border-button";

export default function Demo() {
  return (
    <div className="flex h-[300px] w-full items-center justify-center bg-background">
      <GlowingBorderButton onClick={() => console.log("Button clicked")}>Book a Call</GlowingBorderButton>
    </div>
  );
}
