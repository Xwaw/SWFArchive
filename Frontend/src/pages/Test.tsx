import FriendSearch from "../features/friends/components/FriendSearch";

export default function Test() {
  

  return (
    <div className="w-screen h-screen flex justify-center items-center gap-20">
      <div
  className="w-full flex items-stretch"
  style={{
    background: "linear-gradient(to bottom, #000000 0.1%, #de3334 1%)",
  }}
>
  {/* ================= LEFT ================= */}

  <aside
    className="w-[230px] shrink-0 flex flex-col gap-1"
    style={{
      background: "linear-gradient(to right, #eb1e20 10%, #de3334 90%)",

      borderTop: "2px solid #650000",
      borderLeft: "2px solid #e8b0b0",

      // pierwsza połowa 3D łączenia
      borderRight: "2px solid #650000",

      borderBottom: "2px solid #3b0000",
    }}
  >
    LEFT SIDEBAR
  </aside>

  {/* ================= CENTER ================= */}

  <main
    className="
      flex-1 min-w-0
      flex flex-col gap-2
      pt-10
    "
    style={{
      // druga połowa 3D łączenia z LEFT
      borderLeft: "2px solid #e8b0b0",

      // pierwsza połowa 3D łączenia z RIGHT
      borderRight: "2px solid #650000",
    }}
  >
    CENTER
  </main>

  {/* ================= GAP ================= */}

  <div className="w-1 shrink-0 bg-black" />

  {/* ================= RIGHT ================= */}

  <aside
    className="w-[300px] shrink-0 flex flex-col gap-1"
    style={{
      // druga strona 3D łączenia
      borderLeft: "2px solid #e8b0b0",
    }}
  >
    RIGHT SIDEBAR
  </aside>
</div>
    </div>
  );
}
