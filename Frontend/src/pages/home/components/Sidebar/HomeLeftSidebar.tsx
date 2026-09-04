import { useNavigate } from "react-router-dom";
import MenuPanel from "../../../../components/MenuTabs/MenuPanel";
import Button from "../../../../components/Buttons/Button";

export default function HomeLeftSidebar() {
  const navigate = useNavigate();

  return (
    <aside
      className="w-[230px] shrink-0 flex flex-col gap-5 pt-2 border-1"
      style={{
        background: "linear-gradient(to right, #eb1e20 10%, #de3334 90%)",
        borderTop: "2px solid #650000",
        borderLeft: "2px solid #e8b0b0",
        borderRight: "2px solid #650000",
        borderBottom: "2px solid #3b0000",
      }}
    >
      <MenuPanel
        title={"About My Site"}
        items={[
          { label: "About SWFArchive", onClick: () => navigate("/about") },
          { label: "About Me", onClick: () => navigate("/contact") },
          { label: "Privacy Policy", onClick: () => navigate("/privacy") },
        ]}
      />

      <MenuPanel
        title={"Find SWF"}
        items={[
          {
            label: (
              <div className="w-full h-full flex p-2 gap-2">
                <input
                  className="flex-1 min-w-0 text-black border-1 border-black bg-white outline-none focus:outline-none"
                  placeholder="Search By Title"
                  style={{
                    borderRadius: "4px",
                  }}
                />

                <Button style="search" width="2.5rem" height="1.6rem">
                  <span
                    style={{
                      fontFamily: "Robot_Font",
                      color: "#fa940f",
                      WebkitTextStroke: "0.5px black",
                      fontSize: "18px",
                      lineHeight: 1,
                      transform: "translateY(2px)",
                    }}
                  >
                    GO!
                  </span>
                </Button>
              </div>
            ),
          },
          { label: "Advanced Search" },
          { label: "New Releases" },
          { label: "Top Rated" },
          { label: "Most Popular" },
          { label: "Random" },
        ]}
      />
    </aside>
  );
}
