import { IBarStatus } from "../../types/Type";

export function Bar({
  typeBar,
  currentValue,
  maximumValue,
  onChangeCurrent,
  onChangeMaximum,
  onKeyUpCurrent,
  onKeyUpMaximum,
}: IBarStatus) {
  let CALC = (currentValue / maximumValue) * 100;

  let COLOR = "";
  let BG_COLOR = "";
  if (typeBar === "life") {
    BG_COLOR = "#601518";
    COLOR = "#D41500";
  } else if (typeBar === "sanity") {
    BG_COLOR = "#011550";
    COLOR = "#001C77";
  } else if (typeBar === "effort") {
    BG_COLOR = "#582C87";
    COLOR = "#743AAE";
  }

  return (
    <div
      className="w-full bg-gray-200 h-5 rounded relative
      sm:h-5
      xl:h-8
      2xl:h-9
      "
      style={{ background: `${BG_COLOR}` }}
    >
      <div
        className="rounded h-full"
        style={{ width: `${CALC}%`, background: `${COLOR}` }}
      >
        <div
          className="w-full h-full absolute flex items-center justify-center gap-1
          sm:text-sm
          xl:text-2xl
          2xl:text-2xl
        "
        >
          <input
            type="number"
            className="w-24 h-full text-end bg-transparent"
            defaultValue={currentValue}
            onChange={onChangeCurrent}
            onKeyUp={onKeyUpCurrent}
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
