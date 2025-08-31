import FlashGameComponent from "./FlashGameComponent";

export default function SwfPlayerLayout() {
  return (
    <div style={{ width: "800px", height: "600px" }}>
      <FlashGameComponent src="/electricman2.swf" />
    </div>
  );
}
