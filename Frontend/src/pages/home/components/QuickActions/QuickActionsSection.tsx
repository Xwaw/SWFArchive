import { useNavigate } from "react-router-dom";

export default function QuickActionsSection() {
  const navigate = useNavigate();

  const buttons = [
    {
      img: 1,
      navigate: "/archive",
      name: "Last Played",
    },
    {
      img: 2,
      navigate: "/friends",
      name: "Last Chat",
    },
    {
      img: 3,
      navigate: "/invite",
      name: "Invites",
    },
    {
      img: 4,
      navigate: "/archive/game",
      name: "Last Viewed Game",
    },
    {
      img: 5,
      navigate: "/archive/game/uploaded",
      name: "Last Uploaded",
    },
  ];

  return (
    <section className="w-full h-full flex items-center">
      <div className="w-full h-full flex items-center px-[4%]">
        {buttons.map((button) => (
          <div
            key={button.img}
            className="
              relative
              group

              w-1/5
              h-full

              flex
              items-center
              justify-center
            "
          >
            {/* ICON */}
            <div
              onClick={() => navigate(button.navigate)}
              className="
                relative

                h-[70%]
                aspect-square
                shrink-0

                cursor-pointer
                select-none

                bg-contain
                bg-center
                bg-no-repeat

                transition-all
                duration-200
                ease-out

                group-hover:h-[88%]
                group-hover:drop-shadow-[0_0_6px_rgba(255,255,255,0.8)]

                group-active:h-[76%]
                group-active:brightness-75
                group-active:drop-shadow-[0_0_3px_rgba(255,255,255,0.5)]
              "
              style={{
                backgroundImage: `url("/images/buttons/quickevents/${button.img}.png")`,
              }}
            />

            {/* TOOLTIP */}
            <div
              className="
                absolute
                left-1/2
                -translate-x-1/2

                bottom-[3%]

                hidden
                group-hover:block

                whitespace-nowrap

                px-2
                py-[2px]

                bg-gradient-to-b
                from-[#505050]
                via-[#252525]
                to-[#0d0d0d]

                border
                border-white

                text-white
                text-[11px]

                pointer-events-none
                select-none
                z-50
              "
              style={{
                fontFamily: "Arial",
              }}
            >
              {button.name}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}