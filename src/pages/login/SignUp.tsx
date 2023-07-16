import { useState } from "react";
import { useHistory } from "react-router-dom";
import { auth, storage } from "../../auth/Config";
import { InputLogin } from "../../components/others/InputLogin";
import "../../index.css";
import { db } from "./../../auth/Config";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface MyError extends Error {
  code: string;
}

export function SignUp() {
  const history = useHistory();
  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");

  const notify = () => toast.error("Email já cadastrado!");

  const notifyUserName = () =>
    toast.error("Esse nome de usuário já existe, tente outro.");

  const checkIfUsernameExists = async (name: string) => {
    const querySnapshot = await db
      .collection("user")
      .where("name", "==", name)
      .get();

    return !querySnapshot.empty;
  };

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (file) {
      const storageRef = storage.ref();
      const fileRef = storageRef.child(`images/${file.name}`);
      await fileRef.put(file);
      const url = await fileRef.getDownloadURL();
      setPhotoUrl(url);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const usernameExists = await checkIfUsernameExists(userName);
    if (usernameExists) {
      notifyUserName();
      return;
    }

    try {
      const userCredential = await auth.createUserWithEmailAndPassword(
        email,
        password
      );

      if (userCredential.user) {
        const uid = userCredential.user.uid;
        await db.collection("user").doc(uid).set({
          name,
          userName,
          email,
          uid,
          photoUrl,
        });
      }

      history.push("/");
    } catch (error: MyError | any) {
      if (error.code === "auth/email-already-in-use") {
        notify();
      }
    }
  };

  const handleClickSignIn = () => {
    history.push(`/login`);
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
            Crie sua conta e junte-se à luta contra o paranormal
          </span>
        </div>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-3
          xl:gap-4
          2xl:gap-8
          "
        >
          <InputLogin
            placeholder="Paulo Enrique"
            title="Nome"
            type="text"
            onChange={(event) => setName(event.target.value)}
          />
          <InputLogin
            placeholder="paulo_mensigno"
            title="Nome de Usúario"
            type="text"
            onChange={(event) => setUserName(event.target.value)}
          />
          <InputLogin
            placeholder="Email Valido"
            title="Email"
            type="email"
            onChange={(event) => setEmail(event.target.value)}
          />
          <InputLogin
            placeholder="Minimo 6 caracteres."
            title="Password"
            type="password"
            onChange={(event) => setPassword(event.target.value)}
          />
          {/* <div>
          <p className="text-white text-xl text-start">Foto de Perfil</p>
          <input
            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-600 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
            aria-describedby="file_input_help"
            id="file_input"
            type="file"
            accept="image/png, image/jpeg"
            onChange={handleFileUpload}
          />
          <p
            className="mt-1 text-sm text-gray-500 dark:text-gray-300"
            id="file_input_help"
          >
            PNG or JPG (MAX. 300x300px).
          </p>
        </div> */}
          <div className="flex flex-col">
            <label className="text-white text-xl text-start">
              Foto de perfil
            </label>
            <input
              className="bg-[#3E110C] rounded-md border border-zinc-700"
              type="file"
              onChange={handleFileUpload}
            />
          </div>
          <button
            type="submit"
            className="button-glitch bg-[#3E110C] rounded
            xl:h-[40px] xl:text-lg
            2xl:h-[45px] 2xl:text-2xl
            "
          >
            Criar Conta
          </button>
        </form>
        <div className="cursor-pointer" onClick={handleClickSignIn}>
          Já possui conta? Faça login.
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
}
