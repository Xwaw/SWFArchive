import Avatar from "../Avatar";

export default function UserStatusSection({}) {
  return (
    <div className="flex p-2 w-full h-1/3 bg-red-900">
      <div>
        <Avatar image={undefined}></Avatar>
      </div>

      <div className="flex flex-col min-w-0 justify-center p-5">
        <span
        className="truncate font-bold text-white"
        style={{ fontSize: 25 }}
        >
        Xwaw
        </span>
        <div className="">
            [O] ONLINE
        </div>
      </div>
    </div>
  );
}
