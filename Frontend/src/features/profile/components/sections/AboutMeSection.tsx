
export default function AboutMeSection({ children }: {children: React.ReactNode}) {
  return (
    <div className="w-full h-full overflow-y-hidden">
      <div className="w-full h-10 p-2 flex items-center justify-center bg-red-900">
        ABOUT ME
      </div>
      <div
        data-section="aboutme-body"
        className="p-2 w-full max-w-full overflow-hidden whitespace-pre-wrap break-words"
      >
        <div>
          {children}
        </div>
      </div>
    </div>
  );
}
