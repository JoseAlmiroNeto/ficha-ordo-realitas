import { ISelect } from "../../types/Type";

export function SelectModal({ options, value, onChange, title }: ISelect) {
  return (
    <div>
      <p className="font-semibold">{title}</p>
      <select
        className="w-full bg-transparent border-b border-zinc-800 pl-1"
        value={value}
        onChange={onChange}
      >
        <option value="" disabled selected hidden>
          Selecione uma opção
        </option>
        {options.map((option, index: number) => (
          <option
            className="bg-black-100 text-white"
            key={index}
            defaultValue={option.label}
            data-extra1={option.value}
          >
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
