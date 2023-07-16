import { Box } from "./../../types/Type";

export function NaviBar({ children }: Box) {
  return (
    <div className="bg-zinc-900 border border-zinc-800 w-[40%] h-[55px] rounded-lg fixed bottom-0 z-20 mb-1 flex items-center justify-around">
      {children}
    </div>
  );
}
