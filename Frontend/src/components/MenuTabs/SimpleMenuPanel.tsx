interface MenuPanelItem {
  label: string | React.ReactNode;
  onClick?: () => void;
}

interface MenuPanelProps {
  title: string;
  items: MenuPanelItem[];
  className?: string;
}

export default function MenuPanel({
  title,
  items,
  className = "",
}: MenuPanelProps) {
  return (
    <div className={`w-full ${className}`}>
      {/* HEADER */}
      <div className="w-full h-[40px] border-[2px] border-black">
        <div
        className="w-full h-full flex items-center justify-center"
          style={{
            background: `linear-gradient(to bottom, #777777 5%, #252525 90%)`,
            borderBottom: "2px solid #555555",
            borderTop: "2px solid #aaaaaa",
            borderLeft: "2px solid #aaaaaa",
            borderRight: "2px solid #555555",
          }}
        >
          <p className="w-full h-full font-bold flex items-center justify-center" style={{
            fontFamily: "sans-serif",
            WebkitTextStroke: "1px black",
            fontSize: 20
          }}>{title}</p>
        </div>
      </div>

      <div className="flex flex-col text-[#e6e19d]" style={{
        background: `linear-gradient(to bottom, #202020 10%, #303030 90%)`
      }}>
        {items.map((item, index) => (
          <div className="" style={{
            borderRight: "3px solid #999999",
            borderLeft: "2px solid #050505"
          }}>
            <button
              key={index}
              type="button"
              onClick={item.onClick}
              className={`
                w-full
                flex
                text-left
                cursor-pointer
                ${typeof item.label === "string" ? "hover:underline" : ""} {item.label}
                p-0.5
                pl-2
              `}
            >
              {typeof item.label === "string" ? <div>{"> "}</div> : ""} {item.label}
            </button>
            <div className="w-full h-0.5 bg-[#777777]" />
          </div>
        ))}
      </div>
      <div className="w-full h-[35px] bg-[#151515] text-[#e6e19d] flex justify-center items-center" style={{
            borderRight: "3px solid #999999",
            borderLeft: "2px solid #050505"
          }}>
        <p> BIIIIIIIG TEST </p>
      </div>
    </div>
  );
}
