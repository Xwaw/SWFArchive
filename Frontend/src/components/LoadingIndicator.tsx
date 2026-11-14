interface LoadingIndicatorProps {
  label?: string;
  size?: number;
  showLabel?: boolean;
}

export default function LoadingIndicator({ label = "Loading...", size = 80, showLabel = false }: LoadingIndicatorProps) {
  return (
    <span role="status" aria-label={label} className="inline-flex w-full flex-col items-center justify-center gap-0 p-1 text-white">
      <img src="/gifs/loading.gif" alt="" width={size} height={size} style={{ width: size, height: size }} className="max-w-full object-contain" />
      {showLabel && <span className="-mt-2 text-sm font-semibold leading-tight" style={{ textShadow: "0 1px 3px #000" }}>{label}</span>}
    </span>
  );
}
