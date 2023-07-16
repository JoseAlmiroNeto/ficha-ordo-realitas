import { Defeat } from "../../types/Type";

export function DefeatInputs({ name, value, onChange, onKeyUp, type }: Defeat) {
  return (
    <div
      className="flex flex-col
    sm:text-xs
    xl:text-base
    2xl:text-base
    "
    >
      <span
        className="truncate text-center
      sm:w-10
      xl:w-24
      2xl:w-24
      "
      >
        {name}
      </span>
      <input
        type={type}
        defaultValue={value}
        className="bg-transparent text-center border-b
        sm:w-10 sm:h-6 sm:text-base
        xl:w-24 xl:h-11 xl:text-3xl
        2xl:w-24 2xl:h-11 2xl:text-3xl
        "
        onChange={onChange}
        onKeyUp={onKeyUp}
      />
    </div>
  );
}
