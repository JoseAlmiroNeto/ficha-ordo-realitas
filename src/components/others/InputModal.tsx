import { Inputs } from "../../types/Type";

export function InputModal({
  title,
  value,
  onChange,
  placeholder,
  type,
}: Inputs) {
  return (
    <div className="w-full">
      <p className="font-semibold">{title}</p>
      <input
        type={type}
        className="w-full bg-transparent border-b border-zinc-800 pl-2"
        defaultValue={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
  );
}
