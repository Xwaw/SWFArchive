interface SelectProps{
    children: React.ReactNode,
    elements: string[],
    value: string,
    onChange: (value: string) => void;
}

export default function Select({children, elements, value, onChange}: SelectProps) {
  return (
    <div>
      <p>{children}</p>

      <select className="border-1 border-white" value={value} onChange={(e) => onChange(e.currentTarget.value)}>
        {elements.map((value, index) => {
          return <option key={index} value={value}>{value}</option>;
        })}
      </select>
    </div>
  );
}
