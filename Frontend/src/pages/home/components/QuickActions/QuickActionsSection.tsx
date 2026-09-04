export default function QuickActionsSection() {
  return (
<section
  className="w-full"
  style={{
    background: "linear-gradient(to bottom, #000000 1%, #AA0000 80%)",
    border: 1,
    borderTop: "2px solid #450000",
    borderLeft: "2px solid #450000",
    borderRight: "2px solid #450000",
    borderBottom: "2px solid #e8b0b0",
  }}
>
  <div className="w-full text-center">
    <span
      style={{
        fontFamily: "Gamez",
        color: "#FF0000",
        WebkitTextStroke: "1px black",
      }}
    >
      JUMP BACK INTO YOUR ACTIONS
    </span>
  </div>

  <div className="w-full h-[80px] flex justify-evenly items-center">
    {[1, 2, 3, 4, 5].map((event) => (
      <div
        key={event}
        className="h-full aspect-square flex items-center justify-center"
        style={{
          backgroundImage: `url("/test/images/3d/1.png")`,
          backgroundSize: "contain",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />
    ))}
  </div>
</section>
  );
}
