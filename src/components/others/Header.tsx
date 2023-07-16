import { useHistory } from "react-router-dom";
import { ButtonSignOut } from "./ButtonSignOut";
import firebase from "firebase/app";
import "firebase/auth";
import { db } from "./../../auth/Config";
import { IProfile } from "../../types/Type";
import { useState, useEffect } from "react";
import UserPhoto from "../../assets/userPhoto.webp"
import Logo from "../../assets/logoHeader.webp"

export function Header() {
  const currentUser = firebase.auth().currentUser;
  const uid = currentUser ? currentUser.uid : "";

  const [user, setUser] = useState<IProfile | null>(null);

  const history = useHistory();

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

  const handleClickSection = () => {
    history.push(`/sections`);
  };

  const handleClickHome = () => {
    history.push(`/`);
  };

  const handleClickProfile = () => {
    history.push(`/profile`);
  };

  return (
    <div className="bg-zinc-800 h-14 flex items-center justify-between px-3 ">
      <div className="flex items-center gap-12">
        <img src={Logo} alt="logo" className="w-[45px]" />
        <div className="flex gap-5">
          <button onClick={handleClickHome} className="flex items-center gap-1">
            <lord-icon
              src="https://cdn.lordicon.com/eszyyflr.json"
              trigger="hover"
              colors="primary:#ffffff,secondary:#ffffff"
              style={{ width: "34px", height: "34px" }}
            />
            <p>Personagem</p>
          </button>
          <button
            onClick={handleClickSection}
            className="flex items-center gap-1"
          >
            <lord-icon
              src="https://cdn.lordicon.com/soseozvi.json"
              trigger="hover"
              colors="primary:#ffffff,secondary:#ffffff"
              style={{ width: "34px", height: "34px" }}
            />
            <p>Seção</p>
          </button>
        </div>
      </div>
      <div className="flex items-center gap-5">
        <div
          onClick={handleClickProfile}
          className="rounded-full w-[38px] h-[38px] border cursor-pointer "
        >
          <img
            src={user?.photoUrl ? user.photoUrl : UserPhoto}
            alt="profile photo"
            className="object-cover object-center w-full h-full rounded-full"
          />
        </div>
        <ButtonSignOut />
      </div>
    </div>
  );
}
