import { Check } from "../../types/Type";

export function CheckBox({ value, name }: Check) {
  return (
    <div className="sm:text-xs xl:text-base 2xl:text-base flex items-center">
      <input
        className="
        sm:w-[10px] sm:h-[10px]
        xl:w-[15px] xl:h-[15px]
        2xl:w-[30px] 2xl:h-[15px]
        "
        type="checkbox"
        defaultChecked={value}
      />
      <span
        className="
      sm:h-[10px] 
      xl:h-[20px]
      2xl:h-[20px]
      "
      >
        {name}
      </span>
    </div>
  );
}
