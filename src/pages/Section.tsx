import { Sheets } from "../components/Cards/section/Sheets";
import { Header } from "../components/others/Header";
import { Iniciative } from "../components/Cards/section/Iniciative";
import { Npcs } from "../components/Cards/section/Npcs";
import { Creatures } from "../components/Cards/section/Creatures";

export function Section() {
  return (
    <div>
      <Header />
      <div className="flex flex-wrap px-4 py-10 gap-5">
        <Sheets />
        <Iniciative />
        <Npcs />
        <Creatures />
      </div>
    </div>
  );
}
