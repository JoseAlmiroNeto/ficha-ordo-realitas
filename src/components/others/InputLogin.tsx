import { IInputLogin } from "../../types/Type";

export function InputLogin({
  title,
  type,
  onChange,
  placeholder,
}: IInputLogin) {
  return (
    <div className="text-center">
      <p className="text-white text-xl text-start">{title}</p>
      <input
        placeholder={placeholder}
        type={type}
        className="bg-[#3E110C] border-2 border-zinc-800 w-[300px] h-[23px] text-lg pl-2 text-[#C69672] rounded
        xl:w-[350px] xl:h-[35px]
        2xl:w-[400px] 2xl:h-[43px]
        "
        onChange={onChange}
      />
    </div>
  );
}
