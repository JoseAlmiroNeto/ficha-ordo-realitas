import { IIdentificationCard } from "./../../types/Type";

export function InfoIdentificationCard({ label, value }: IIdentificationCard) {
  let valueString: string | number | undefined;
  if (value instanceof Date) {
    valueString = value.toLocaleDateString();
  } else {
    valueString = value;
  }

  return (
    <div>
      <p className="text-sm font-semibold text-black-100">{label}</p>
      <p className="text-sm font-Julee font-semibold text-red-600 pl-3">
        {valueString}
      </p>
    </div>
  );
}
