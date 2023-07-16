import { useState } from "react";
import { useHistory } from "react-router-dom";
import { auth } from "../../auth/Config";
import { InputLogin } from "../../components/others/InputLogin";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../index.css";

export const Login = () => {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const notify = () => toast.error("Email ou senha incorretos!");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await auth.signInWithEmailAndPassword(email, password);
      history.push("/");
    } catch (error) {
      notify();
    }
  };

  const handleClickSignUp = () => {
    history.push(`/signup`);
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <div
        className="bg-backgroundLogo bg-cover w-full h-screen flex flex-col items-center justify-center relative
    xl:gap-3
    2xl:gap-5
    "
      >
        <div className="flex flex-col items-center">
          <img
            src="./Logo.svg"
            alt="logo"
            className="w-[130px]
        xl:w-[150px]
        2xl:w-[205px]
        "
          />
          <h1
            className="font-bold
        xl:text-xl
        2xl:text-3xl
        "
          >
            Ordo Realitas
          </h1>
          <span className="text-lg">
            Faça Login e comece a lutar contra o paranormal
          </span>
        </div>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col
      xl:gap-5
      2xl:gap-8
      "
        >
          <InputLogin
            placeholder="Email Valido"
            title="Email"
            type="email"
            onChange={(event) => setEmail(event.target.value)}
          />
          <InputLogin
            placeholder="*******"
            title="Password"
            type="password"
            onChange={(event) => setPassword(event.target.value)}
          />
          <button
            type="submit"
            className="button-glitch bg-[#3E110C] rounded
          xl:h-[40px] xl:text-lg
          2xl:h-[45px] 2xl:text-2xl
          "
          >
            Login
          </button>
        </form>
        <div className="cursor-pointer" onClick={handleClickSignUp}>
          Não possui conta? inscreva-se
        </div>
        <div className="w-[200px] absolute bottom-0 left-0 m-4 flex flex-col gap-2">
          <a
            href="https://github.com/JoseAlmiroNeto"
            target="_blank"
            className="bg-[#3E110C] flex items-center justify-center border-2 border-zinc-800 w-[200px] h-[38px] rounded text-lg"
          >
            CREDITS
          </a>
          <a
            href="https://github.com/JoseAlmiroNeto/ficha-ordo-realitas"
            target="_blank"
            className="bg-[#3E110C] flex items-center justify-center border-2 border-zinc-800 w-[200px] h-[38px] rounded text-lg"
          >
            ABOUT
          </a>
          <a
            href="https://fichasop.com/"
            target="_blank"
            className="bg-[#3E110C] flex items-center justify-center border-2 border-zinc-800 w-[200px] h-[38px] rounded text-lg"
          >
            OFFICIAL SITE DE OP
          </a>
        </div>
      </div>
    </>
  );
};
