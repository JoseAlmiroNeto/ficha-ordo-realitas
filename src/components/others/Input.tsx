import { Inputs } from "../../types/Type";

export function Input({ title, value, onChange, type, onKeyUp }: Inputs) {
  return (
    <div className="flex flex-col">
      <p className="font-semibold
      sm:text-xs
      xl:text-lg
      2xl:text-xl
      ">{title}</p>
      <input
        type={type}
        className="w-full bg-transparent border-b border-zinc-800 pl-2
        sm:text-[10px]
        xl:text-base
        2xl:text-lg
        "
        defaultValue={value}
        onChange={onChange}
        onKeyUp={onKeyUp}
      />
    </div>
  );
}
