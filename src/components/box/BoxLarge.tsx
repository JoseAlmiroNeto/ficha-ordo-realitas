import { Box } from "../../types/Type";

export function BoxLarge({ children }: Box) {
  return (
    <div className="border border-zinc-800 rounded p-4 flex flex-col items-center justify-around
    xl:w-[1100px] xl:h-[650px]
    2xl:w-[1400px] 2xl:h-[720px]
    ">
      {children}
    </div>
  );
}
