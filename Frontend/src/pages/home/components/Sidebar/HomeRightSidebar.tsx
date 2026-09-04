import SimpleMenuPanel from "../../../../components/MenuTabs/SimpleMenuPanel";

export default function HomeRightSidebar() {
  return (
<aside className="w-[300px] shrink-0 flex flex-col gap-2 p-1">
  <div className="w-full h-[800px] border-4">
    <img
      className="w-full h-full bg-cover"
      src="/test/images/banners/1.png"
      alt=""
    />
  </div>

  {/* PANEL */}

  <SimpleMenuPanel title={"Most Recent Updates"} items={[
    {label: "something"},
    {label: "something"},
    {label: "something"},
    {label: "something"},
    {label: "something"},
    {label: "something"},
    {label: "something"},
    {label: "something"},
    {label: "something"},
    {label: "something"},
    {label: "something"},
    {label: "something"},
    {label: "something"},
    {label: "something"},
    {label: "something"},
    {label: "something"},
    {label: "something"},
    {label: "something"},
    {label: "something"},
    {label: "something"},
    {label: "something"},
    {label: "something"},
    {label: "something"},
    {label: "something"},
  ]}></SimpleMenuPanel>
</aside>
  );
}
