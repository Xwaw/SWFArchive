export default function BadgesSection({ badges }: { badges: string[] }) {
  return (
    <div className="w-full h-full">
      <div className="w-full h-10 p-2 flex items-center justify-center bg-red-900">
        BADGES
      </div>
      <div
        data-section="badges-body"
        className="p-2 w-full max-w-full overflow-hidden whitespace-pre-wrap break-words"
      >
        <div className="w-full h-full grid grid-cols-3 auto-rows-max gap-3">
          {badges.map((value, index) => {
            return (
              <div
                key={index}
                className="h-30 aspect-square"
                style={{
                  backgroundImage: `url('${value}')`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
