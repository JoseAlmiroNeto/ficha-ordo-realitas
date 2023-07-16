import { useEffect, useRef, useState } from "react";
import { Redirect, useParams } from "react-router-dom";
import { Attributes } from "../components/Cards/Attributes";
import { Combat } from "../components/Cards/Combat";
import { Inventory } from "../components/Cards/Inventory";
import { ProfileSheet } from "../components/Cards/ProfileSheet";
import { Rituals } from "../components/Cards/Rituals";
import { Skills } from "../components/Cards/Skills";
import { Status } from "../components/Cards/Status";
import { db } from "./../auth/Config";
import { Ability } from "./../components/Cards/Ability";
import { HeaderSheet } from "./../components/others/HeaderSheet";
import { NaviBar } from "../components/others/NaviBar";
import { Header } from "../components/others/Header";
import firebase from "firebase/app";
import "firebase/auth";

export function Sheet() {
  const { uid } = useParams<{ uid: string }>();
  const currentUser = firebase.auth().currentUser;

  const [records, setRecords] = useState([] as any);

  const profileRef = useRef<HTMLDivElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);
  const attributesRef = useRef<HTMLDivElement>(null);
  const abilitysRef = useRef<HTMLDivElement>(null);
  const combatRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const inventoryRef = useRef<HTMLDivElement>(null);
  const ritualsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    getDocRecord();
  }, []);

  async function getDocRecord() {
    const { docs } = await db
      .collection("record")
      .where("uid", "==", uid)
      .get();
    setRecords(docs[0].data());
  }

  if (records.length !== 0 && currentUser?.uid !== records?.user) {
    return <Redirect to="/" />;
  }

  const handleProfileButtonClick = () => {
    if (profileRef.current) {
      profileRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  };

  const handleStatusButtonClick = () => {
    if (statusRef.current) {
      statusRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  };

  const handleAttriButtonClick = () => {
    if (attributesRef.current) {
      attributesRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  };

  const handleAbilityButtonClick = () => {
    if (abilitysRef.current) {
      abilitysRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  };

  const handleCombatButtonClick = () => {
    if (combatRef.current) {
      combatRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  };

  const handleSkillsButtonClick = () => {
    if (skillsRef.current) {
      skillsRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  };

  const handleInventoryButtonClick = () => {
    if (inventoryRef.current) {
      inventoryRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  };

  const handleRitualsButtonClick = () => {
    if (ritualsRef.current) {
      ritualsRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  };

  return (
    <>
      <Header />
      <div className="flex flex-col relative w-full gap-5">
        <HeaderSheet />
        <div className="flex w-full justify-center gap-5">
          <div ref={profileRef}>
            <ProfileSheet objPersonal={records.PersonalDetails} uid={uid} />
          </div>
          <div ref={statusRef}>
            <Status uid={uid} />
          </div>
        </div>
        <div className="flex w-full justify-center gap-5">
          <div ref={attributesRef}>
            <Attributes uid={uid} />
          </div>
          <div ref={abilitysRef}>
            <Ability uid={uid} />
          </div>
        </div>
        <div className="w-full flex justify-center" ref={combatRef}>
          <Combat uid={uid} />
        </div>
        <div className="w-full flex justify-center" ref={skillsRef}>
          <Skills uid={uid} />
        </div>
        <div className="w-full flex justify-center" ref={inventoryRef}>
          <Inventory uid={uid} />
        </div>
        <div className="w-full flex justify-center" ref={ritualsRef}>
          <Rituals uid={uid} />
        </div>

        <div className="fixed z-50 w-full h-16 max-w-3xl -translate-x-1/2 bg-white border border-gray-200 rounded-full bottom-4 left-1/2 dark:bg-gray-700 dark:border-gray-600">
          <div className="grid h-full grid-cols-8 mx-auto">
            <button
              type="button"
              onClick={handleProfileButtonClick}
              className="inline-flex flex-col items-center justify-center px-5 rounded-l-full hover:bg-gray-50 dark:hover:bg-gray-800 group"
            >
              <lord-icon
                src="https://cdn.lordicon.com/eszyyflr.json"
                trigger="hover"
                colors="primary:#ffffff,secondary:#ffffff"
                style={{ width: "24px", height: "24px" }}
              />
              <span>Profile</span>
            </button>
            <button
              onClick={handleStatusButtonClick}
              type="button"
              className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group"
            >
              <lord-icon
                src="https://cdn.lordicon.com/rjzlnunf.json"
                trigger="hover"
                colors="primary:#ffffff,secondary:#ffffff"
                style={{ width: "24px", height: "24px" }}
              />
              <span>Status</span>
            </button>
            <button
              onClick={handleAttriButtonClick}
              type="button"
              className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group"
            >
              <lord-icon
                src="https://cdn.lordicon.com/nocovwne.json"
                trigger="hover"
                colors="primary:#ffffff,secondary:#ffffff"
                style={{ width: "24px", height: "24px" }}
              />
              <span>Atibutos</span>
            </button>
            <button
              onClick={handleAbilityButtonClick}
              type="button"
              className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group"
            >
              <lord-icon
                src="https://cdn.lordicon.com/hovbgwmd.json"
                trigger="hover"
                colors="primary:#ffffff,secondary:#ffffff"
                style={{ width: "24px", height: "24px" }}
              />
              <span>Habilidades</span>
            </button>
            <button
              onClick={handleCombatButtonClick}
              type="button"
              className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group"
            >
              <lord-icon
                src="https://cdn.lordicon.com/rqsvgwdj.json"
                trigger="hover"
                colors="primary:#ffffff,secondary:#ffffff"
                style={{ width: "24px", height: "24px" }}
              />
              <span>Combate</span>
            </button>
            <button
              onClick={handleSkillsButtonClick}
              type="button"
              className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group"
            >
              <lord-icon
                src="https://cdn.lordicon.com/wxnxiano.json"
                trigger="hover"
                colors="primary:#ffffff,secondary:#ffffff"
                style={{ width: "24px", height: "24px" }}
              />
              <span>Peícias</span>
            </button>
            <button
              onClick={handleInventoryButtonClick}
              type="button"
              className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group"
            >
              <lord-icon
                src="https://cdn.lordicon.com/fhtaantg.json"
                trigger="hover"
                colors="primary:#ffffff,secondary:#ffffff"
                style={{ width: "24px", height: "24px" }}
              />
              <span>Inventario</span>
            </button>
            <button
              onClick={handleRitualsButtonClick}
              type="button"
              className="inline-flex flex-col items-center justify-center px-5 rounded-r-full hover:bg-gray-50 dark:hover:bg-gray-800 group"
            >
              <lord-icon
                src="https://cdn.lordicon.com/nsbufguq.json"
                trigger="hover"
                colors="primary:#ffffff,secondary:#ffffff"
                style={{ width: "24px", height: "24px" }}
              />
              <span>Rituais</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
