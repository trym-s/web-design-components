import HoverArrowButton from "./hover-arrow-button";

export default function Demo() {
  return (
    <div className="flex items-center justify-center">
      <HoverArrowButton text="Get Started" duration={0.3} iconSize={20} onClick={() => console.log("Clicked!")} />
    </div>
  );
}
