export function Title(value: { children: string }) {
  return <div className="border-b border-zinc-700 w-full text-center
  sm:h-[28px] sm:text-sm
  xl:h-[30px] xl:text-2xl
  2xl:h-[38px] 2xl:text-2xl
  ">{value.children}</div>;
}
