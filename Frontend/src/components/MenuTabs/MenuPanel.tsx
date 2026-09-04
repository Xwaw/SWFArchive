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
      <div
        className="
          flex items-center
          w-full h-[35px]
          bg-no-repeat bg-center bg-[length:100%_100%]
          drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)]
        "
        style={{
          backgroundImage: 'url("/images/menu_bar/MenuBar.png")',
        }}
      >
        <span className="w-full px-2 font-bold">{title}</span>
      </div>

      <div className="flex flex-col justify-center">
        {items.map((item, index) => (
          <div key={index}>
            <button
              type="button"
              onClick={item.onClick}
              className={`
                w-full
                flex items-center
                gap-1
                text-left
                cursor-pointer
                p-0.5
                ${typeof item.label === "string" ? "hover:underline" : ""}
              `}
            >
              {typeof item.label === "string" && (
                <img
                  src="/images/icons/menu_arrow.png"
                  alt=""
                  className="h-[15px] aspect-square object-contain shrink-0"
                />
              )}

              {item.label}
            </button>

            <div
              className="w-full h-0.5"
              style={{
                background:
                  "linear-gradient(to right, #4d4c4b 0%, #52504a 55%, #6c6642 100%)",
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}