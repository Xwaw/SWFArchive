export default function DescriptionSection({
  Description,
}: {
  Description: string | undefined;
}) {
    if(!Description) return

  return (
    <div className="break-all w-full min-h-50 bg-gray-800 border-2 border-red-600 p-2" style={{ color: "white" }}>
      {Description}
    </div>
  );
}
