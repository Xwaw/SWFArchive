export default function RankingsTabs() {
  return (
    <>
      <div className="w-full h-[120px] flex shrink-0">
        <div className="flex-1 h-full">{/* TAB IMAGE 1 */}</div>
        <div className="flex-1 h-full">{/* TAB IMAGE 2 */}</div>
        <div className="flex-1 h-full">{/* TAB IMAGE 3 */}</div>
        <div className="flex-1 h-full">{/* TAB IMAGE 4 */}</div>
      </div>

      <div
        className="w-full h-[32px] flex items-center px-2"
        style={{
          background: "linear-gradient(to bottom, #555 0%, #353535 50%, #272727 100%)",
          borderTop: "1px solid #777",
          borderBottom: "2px solid #111",
          color: "#888",
          fontSize: 14,
        }}
      >
        Rankings based on information requests on SWFArchive
      </div>
    </>
  );
}
