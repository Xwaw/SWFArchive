
import type { RankingType } from "./RankingsSection";

interface RankingsTabsProps {
  selectedType: RankingType;
  onTypeChange: (type: RankingType) => void;
}

const tabs: { label: string; type: RankingType }[] = [
  { label: "OVERALL", type: "overall" },
  { label: "TODAY", type: "today" },
  { label: "THIS MONTH", type: "month" },
  { label: "THIS YEAR", type: "year" },
];

export default function RankingsTabs({
  selectedType,
  onTypeChange,
}: RankingsTabsProps) {
  return (
    <div
      style={{
        background: "linear-gradient(to top, darkred, black)",
      }}
    >
      <div className="w-full h-[120px] flex items-end justify-center gap-[2%] px-[1%]">
        {tabs.map((tab) => {
          const isSelected = selectedType === tab.type;

          return (
            <button
              key={tab.type}
              type="button"
              onClick={() => onTypeChange(tab.type)}
              className="h-[80px] cursor-pointer"
              style={{
                width: "21%",
                backgroundImage: `url("/images/buttons/tabs/${
                  isSelected ? "normal" : "blocked"
                }.png")`,
                backgroundSize: "100% 100%",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center bottom",
              }}
            >
              <span
                className="w-full h-full flex justify-center items-center"
                style={{
                  fontFamily: "Gamez",
                  color: "black",
                  fontSize: "20px",
                }}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>

      <div
        className="w-full h-[32px] flex items-center px-2"
        style={{
          background:
            "linear-gradient(to bottom, #555 0%, #353535 50%, #272727 100%)",
          borderTop: "1px solid #777",
          borderBottom: "2px solid #111",
          color: "#888",
          fontSize: 14,
        }}
      >
        Rankings based on information requests on SWFArchive
      </div>
    </div>
  );
}
