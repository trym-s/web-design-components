import FocusButton from "./focus-button";

export default function Demo() {
  return (
    <div className="flex h-[300px] w-full items-center justify-center bg-background">
      <FocusButton onClick={() => console.log("Clicked!")}>Contact us</FocusButton>
    </div>
  );
}
