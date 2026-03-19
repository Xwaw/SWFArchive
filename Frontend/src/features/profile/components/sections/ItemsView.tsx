export default function ItemsView({
  items,
  name,
}: {
  items: string[];
  name: string;
}) {
  return (
    <div className="">
      <div className="w-full p-2 flex items-center justify-center bg-red-900">
        {name}
      </div>
      <div className="w-full h-30 flex justify-start bg-gray-700 overflow-x-scroll">
        {items.map((index) => {
          return (
            <div key={index} className="h-full aspect-square bg-red-500 group">
              <div
                className="w-full h-full group-hover:brightness-75"
                style={{
                  backgroundImage: `url("/src/assets/no_avatar.png")`,
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                }}
              >
                a
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
