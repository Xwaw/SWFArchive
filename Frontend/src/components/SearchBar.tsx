interface searchProp {
  value: string;
  onChange: (value: string) => void;
  onSubmit: (value: string) => void;
}

export default function SearchBar({ value, onChange, onSubmit }: searchProp) {
  return (
    <div>
      <p>Search Your Game: </p>

      <input
        className="border-1 border-white"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            onSubmit(value);
          }
        }}
      />

      <button
        className="border-1 border-red-950 bg-red-700 hover:bg-green-500 hover:border-green-600"
        onClick={() => onSubmit(value)}
      >
        Search
      </button>
    </div>
  );
}
