import { TitleCreate } from "../../others/TitleCreate";

export function Npcs() {
  return (
    <div
      className="w-[910px] h-[620px] border border-zinc-800 rounded px-2
      xl:w-[610px]
      2xl:w-[906px]
      "
    >
      <TitleCreate>
        <div className="w-[67px]" />
        <p>NPCs</p>
        <div className="flex w-[67px] justify-end">
          <div
            className="w-[28px] h-[28px] border rounded cursor-pointer"
            onClick={() => {}}
          >
            <lord-icon
              src="https://cdn.lordicon.com/mrdiiocb.json"
              trigger="hover"
              colors="primary:#ffffff"
              style={{ width: "18px", height: "18px" }}
            />
          </div>
        </div>
      </TitleCreate>
    </div>
  );
}
