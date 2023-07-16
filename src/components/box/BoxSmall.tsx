import { Box } from "../../types/Type";

export function BoxSmall({ children }: Box) {
  return (
    <div
      className="border border-zinc-800 rounded flex flex-col items-center justify-around
    sm:w-[310px] sm:h-[340px] sm:p-2
    xl:w-[540px] xl:h-[570px] xl:p-5
    2xl:w-[690px] 2xl:h-[720px] 2xl:p-5
    "
    >
      {children}
    </div>
  );
}
