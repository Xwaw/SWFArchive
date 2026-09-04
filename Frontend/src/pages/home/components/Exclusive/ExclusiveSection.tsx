export default function ExclusiveSection() {
  return (
<section
  className="w-full h-[350px] flex bg-black"
  style={{
    border: 1,
    borderTop: "2px solid #770000",
    borderLeft: "2px solid #770000",
    borderRight: "2px solid #AA9999",
    borderBottom: "2px solid #770000",
  }}
>
  <div className="w-[45%] h-full flex">
    <div
      className="flex-1 min-w-0 h-full"
      style={{
        backgroundImage: "url('/test/images/banners/1.png')",
      }}
    >
      <div className="w-[3%] h-full flex items-center justify-center overflow-hidden">
        <p
          className="-rotate-90 whitespace-nowrap"
          style={{
            fontFamily: "Robot_Font",
            WebkitTextStroke: "0.7px black",
          }}
        >
          SEE MORE ON{" "}
          <span
            style={{
              fontFamily: "Gamez",
              color: "red",
              WebkitTextStrokeColor: "orange",
            }}
          >
            SWFARCHIVE
          </span>
        </p>
      </div>
    </div>
  </div>

  <div className="flex-1 min-w-0 h-full p-2">ARTICLE / TEXT</div>
</section>
  );
}
