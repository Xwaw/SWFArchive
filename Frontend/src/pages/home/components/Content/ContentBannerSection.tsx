export default function ContentBannerSection() {
  return (
<section
  className="w-full h-[250px] flex"
  style={{
    border: 1,
    borderTop: "2px solid #770000",
    borderLeft: "2px solid #770000",
    borderRight: "2px solid #DD7777",
    borderBottom: "2px solid #AA9999",
  }}
>
  <div
    className="w-full h-full"
    style={{
      backgroundImage: `url("/test/images/banners/1.png")`,
      backgroundSize: "cover",
      backgroundPosition: "center",
    }}
  ></div>
</section>
  );
}
