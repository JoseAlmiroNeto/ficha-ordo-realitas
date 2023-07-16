import { Header } from "../components/others/Header";
import { useEffect, useState } from "react";
import { IProfile } from "../types/Type";
import { db } from "./../auth/Config";
import firebase from "firebase/app";
import "firebase/auth";
import { CheckBox } from "./../components/others/CheckBox";
import { AiOutlineInstagram, AiOutlineYoutube } from "react-icons/ai";
import { CiTwitter } from "react-icons/ci";
import { BsTwitch } from "react-icons/bs";
import UserPhoto from "../assets/userPhoto.webp";

export function Profile() {
  const currentUser = firebase.auth().currentUser;
  const uid = currentUser ? currentUser.uid : "";

  const [user, setUser] = useState<IProfile | null>(null);

  useEffect(() => {
    getDocUser();
  }, []);

  async function getDocUser() {
    const { docs } = await db.collection("user").where("uid", "==", uid).get();
    const doc = docs[0];
    if (doc) {
      const data = doc.data();
      const newRecord: IProfile = {
        name: data.name,
        email: data.email,
        uid: data.uid,
        photoUrl: data.photoUrl,
      };
      setUser(newRecord);
    }
  }

  return (
    <div className="w-full h-screen relative">
      <Header />
      <div className="w-full h-[94%] flex items-center">
        <div className="bg-zinc-900 w-[30%] h-full flex flex-col items-center pt-10">
          <div className="flex flex-col items-center gap-5">
            <div className="rounded-full w-[180px] h-[180px] border cursor-pointer ">
              <img
                src={user?.photoUrl ? user.photoUrl : UserPhoto}
                alt="profile photo"
                className="object-cover object-center w-full h-full rounded-full"
              />
            </div>
            <p className="text-2xl">{user?.name}</p>
          </div>
          <div className="flex flex-col gap-1">
            <h2>Redes Sociais:</h2>
            <div className="flex gap-2">
              <AiOutlineInstagram />
              <p>{user?.name}</p>
            </div>
            <div className="flex gap-2">
              <CiTwitter />
              <p>{user?.name}</p>
            </div>
            <div className="flex gap-2">
              <AiOutlineYoutube />
              <p>{user?.name}</p>
            </div>
            <div className="flex gap-2">
              <BsTwitch />
              <p>{user?.name}</p>
            </div>
          </div>
        </div>
        <div className="w-[70%] h-full flex flex-col items-center p-10 gap-5">
          <div className="w-full">
            <p className="text-start w-full text-xl">Sobre mim:</p>
            <textarea
              cols={10}
              rows={10}
              className="bg-transparent border border-zinc-800 rounded w-full"
            />
          </div>
          <div className="w-full">
            <p className="text-start w-full text-xl">Dias para jogar:</p>
            <div className="flex gap-4">
              <CheckBox value={false} name="Seg" />
              <CheckBox value={false} name="Ter" />
              <CheckBox value={false} name="Qua" />
              <CheckBox value={false} name="Qui" />
              <CheckBox value={false} name="Sex" />
              <CheckBox value={false} name="Sab" />
              <CheckBox value={false} name="Dom" />
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 mr-auto ml-auto w-[25%] h-[50px] rounded-t-xl bg-zinc-800 flex items-center justify-center text-2xl">
        Aréa em Desenvolvimento!!!
      </div>
    </div>
  );
}
