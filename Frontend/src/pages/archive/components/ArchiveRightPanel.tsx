import Button from "../../../components/Buttons/Button";
import SimpleMenuPanel from "../../../components/MenuTabs/SimpleMenuPanel";
import "./archive-right-panel.css";

export default function HomeRightSidebar() {
  const latestUploadedGames = [
    { label: "Game 1" },
    { label: "Game 2" },
    { label: "Game 3" },
    { label: "Game 4" },
  ];

  return (
    <aside className="home-sidebar-right w-[300px] shrink-0 flex flex-col gap-2 p-1">
      <div className="archive-upload-button mt-4 mb-5 w-full items-center justify-center px-2">
        <Button
          width={"85%"}
          height={"56px"}
          style={"upload"}
          font={'"Robot_Font", Tahoma, sans-serif'}
        >
          <span className="inline-flex items-center justify-center gap-2">
            <span className="text-[18px] leading-none font-normal tracking-wide text-[#173509] uppercase [text-shadow:0_1px_0_#d4ff9a]">
              Upload Game
            </span>
            <img
              src="/images/icons/upload_arrow.png"
              alt=""
              aria-hidden="true"
              draggable={false}
              className="h-12 w-9 shrink-0 object-contain"
            />
          </span>
        </Button>
      </div>

      <SimpleMenuPanel
        title="Latest Uploaded Games"
        items={
          latestUploadedGames.map((game) => ({
            label: game.label,
          })) ?? []
        }
      />
    </aside>
  );
}
