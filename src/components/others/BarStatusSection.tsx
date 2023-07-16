import { IBarStatus } from "../../types/Type";

export function BarStatusSection({
  currentValue,
  maximumValue,
  onChangeCurrent,
  onChangeMaximum,
  onKeyUpMaximum,
}: IBarStatus) {
  let CALC = (currentValue / maximumValue) * 100;

  return (
    <div
      className="w-full h-4 bg-gray-200 rounded relative
      xl:h-5
      2xl:h-6
      "
      style={{ background: "#6e0b00" }}
    >
      <div
        className="rounded h-full"
        style={{ width: `${CALC}%`, background: "#d41500" }}
      >
        <div
          className="w-full h-full text-sm absolute flex items-center justify-center gap-1
          xl:text-xl
          2xl:text-xl
        "
        >
          <input
            type="number"
            className="w-24 h-full text-end bg-transparent"
            defaultValue={currentValue}
            onChange={onChangeCurrent}
            // onKeyUp={onKeyUpCurrent}
          />
          <span className="flex items-center">/</span>
          <input
            type="number"
            className="w-24 h-full bg-transparent"
            defaultValue={maximumValue}
            onChange={onChangeMaximum}
            onKeyUp={onKeyUpMaximum}
          />
        </div>
      </div>
    </div>
  );
}
