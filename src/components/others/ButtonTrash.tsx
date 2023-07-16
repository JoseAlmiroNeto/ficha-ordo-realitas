import { IButtonTrash } from "../../types/Type";

export function ButtonTrash({ onClick }: IButtonTrash) {
  return (
    <button
      className="border rounded w-7 h-full flex items-center justify-center cursor-pointer"
      onClick={onClick}
    >
      <lord-icon
        src="https://cdn.lordicon.com/jmkrnisz.json"
        trigger="hover"
        colors="primary:#ffffff"
        style={{ height: "20px" }}
      />
    </button>
  );
}
