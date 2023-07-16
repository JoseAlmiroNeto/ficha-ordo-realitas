import { Header } from "../components/others/Header";
import { useEffect, useState } from "react";
import { db } from "../auth/Config";
import firebase from "firebase/app";
import "firebase/auth";
import { ISection } from "../types/Type";
import { BookSection } from "../components/others/BookSection";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function ShowSections() {
  const currentUser = firebase.auth().currentUser;
  const uid = currentUser ? currentUser.uid : "";

  const [sections, setSections] = useState<ISection[]>([]);

  const notify = () => toast.error("Erro ao criar a ficha!");
  const notifySuccess = () => toast.success("Ficha criada com sucesso");

  useEffect(() => {
    getDocRecords();
  }, []);

  async function getDocRecords() {
    const { docs } = await db
      .collection("sections")
      .where("user", "==", uid)
      .get();

    const sectionsData = docs.map((doc) => {
      const data = doc.data();
      const sectionArr: ISection = {
        creatures: data.creatures,
        initiative: data.initiative,
        name: data.name,
        npc: data.npc,
        players: data.players,
        uid: data.uid,
        user: data.user,
        description: data.description,
        imgUrl: data.imgUrl,
      };
      return sectionArr;
    });

    setSections(sectionsData);
  }

  async function createNewSection() {
    let id = firebase.database().ref().child("sections").push().key;

    if (id) {
      await db.collection("sections").doc(id).set({
        creatures: [],
        imgUrl: "",
        initiative: [],
        name: "Ordo Realitas",
        npc: [],
        players: [],
        uid: id,
        user: uid,
      });
      notifySuccess();
      getDocRecords();
    } else {
      notify();
    }
  }

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

      <div className="w-full">
        <Header />
        <div className="w-full flex items-center gap-1 py-3 px-5">
          <button
            onClick={createNewSection}
            className="cursor-pointer w-[160px] flex items-center justify-center gap-1 px-2 py-2 border border-zinc-800 rounded-lg hover:bg-zinc-800"
          >
            <lord-icon
              src="https://cdn.lordicon.com/mrdiiocb.json"
              trigger="hover"
              colors="primary:#ffffff,secondary:#ffffff"
              style={{ width: "30px", height: "30px" }}
            />
            <p className="text-xl">Nova Seção</p>
          </button>
        </div>
        <div className="w-full flex flex-wrap gap-5 px-10 py-10">
          {sections !== undefined &&
            sections.map((section, index: number) => {
              return (
                <div key={index}>
                  <BookSection section={section} />
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
}
