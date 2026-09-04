import SimpleMenuPanel from "../../../../components/MenuTabs/SimpleMenuPanel";

export default function FeaturedSection() {
  return (
<section className="w-full h-[300px] flex">
  {/* GAME BANNER */}

  <div className="w-[75%] h-full flex flex-col">
    <img
      src="/test/images/banners/1.png"
      alt="NO BANNER FOUND"
      className="w-full h-full object-cover object-center"
    />
  </div>

  {/* NEWS / ABOUT */}

  <SimpleMenuPanel
    className="flex-1 h-fit"
    title={"LATEST NEWS"}
    items={[
      { label: "Test" },
      { label: "Test" },
      { label: "Test" },
      { label: "Test" },
      { label: "Test" },
    ]}
  ></SimpleMenuPanel>
</section>
  );
}
