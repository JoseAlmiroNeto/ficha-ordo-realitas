import { Header } from "../components/others/Header";
import { IdentificationCard } from "../components/others/IdentificationCard";
import firebase from "firebase/app";
import "firebase/auth";
import { useEffect, useState } from "react";
import { db } from "../auth/Config";
import { IRecord } from "../types/Type";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Title } from "../components/others/Title";
import { ModalSmall } from "../components/modal/Modal";
import { InputModal } from "../components/others/InputModal";

export function Home() {
  const currentUser = firebase.auth().currentUser;
  const uid = currentUser ? currentUser.uid : "";

  const [records, setRecords] = useState<IRecord[]>([]);
  const [indexRecord, setIndexRecord] = useState(0);
  const [editRecord, setEditRecord] = useState({
    identificationNumber: 0,
    dateOfBirth: "",
  });

  const notify = () => toast.error("Erro ao criar a ficha!");
  const notifySuccess = () => toast.success("Ficha criada com sucesso");
  const notifyDelete = () =>
    toast.success("Todos os documentos foram deletados com sucesso!");

  useEffect(() => {
    getDocRecords();
  }, []);

  async function getDocRecords() {
    const { docs } = await db
      .collection("record")
      .where("user", "==", uid)
      .get();

    const newRecords = docs.map((doc) => {
      const data = doc.data();
      const newRecord: IRecord = {
        Attributes: data.Attributes,
        Configuration: data.Configuration,
        PersonalDetails: data.PersonalDetails,
        Status: data.Status,
        background: data.background,
        dinner: data.dinner,
        investigation: data.investigation,
        uid: data.uid,
        user: data.user,
        imgUrl: data.imgUrl,
        identificationNumber: data.identificationNumber,
      };
      return newRecord;
    });

    setRecords(newRecords);
  }

  const useModal = (initialIsOpen = false) => {
    const [isOpen, setIsOpen] = useState(initialIsOpen);

    const handleOpenModal = () => {
      setIsOpen(true);
    };

    const handleCloseModal = () => {
      setIsOpen(false);
    };

    return {
      isOpen,
      handleOpenModal,
      handleCloseModal,
    };
  };

  const {
    isOpen: isOpenModalEditRecord,
    handleOpenModal: handleOpenModalEditRecord,
    handleCloseModal: handleCloseModalEditRecord,
  } = useModal(false);

  async function createNewRecord() {
    let id = firebase.database().ref().child("record").push().key;

    if (id) {
      await db
        .collection("record")
        .doc(id)
        .set({
          Attributes: {
            force: 0,
            intelligence: 0,
            presence: 0,
            agility: 0,
            energy: 0,
          },
          PersonalDetails: {
            name: "Desconhecido",
            player: "",
            origin: "",
            age: 0,
            genre: "",
            birthplace: "",
            placeResidence: "",
            class: "",
            patent: "",
          },
          Status: {
            dying: false,
            currentLife: 0,
            currentSanity: 0,
            currentEffort: 0,
            maximumLife: 0,
            maximumSanity: 0,
            maximumEffort: 0,
            maddened: false,
            seriousInjury: false,
            traumatized: false,
            unconscious: false,
            nex: 5,
            defense: 0,
            protection: 0,
            resistance: 0,
            displacement: 0,
          },
          Configuration: {
            exposed: "No",
            timeToPlay: "",
            daysToPlay: {
              seg: false,
              ter: false,
              qua: false,
              qui: false,
              sex: false,
              sab: false,
              dom: false,
            },
          },
          investigation: "",
          background: "",
          user: uid,
          uid: id,
          dinner: "",
        });
      db.collection("inventory").doc(id).set({
        arrayItem: [],
        uid: id,
      });
      db.collection("guns").doc(id).set({
        arrayGuns: [],
        uid: id,
      });
      db.collection("abiliity").doc(id).set({
        arrayAbiliity: [],
        uid: id,
      });
      db.collection("skills").doc(id).set({
        arraySkills: [],
        uid: id,
      });
      db.collection("rituals").doc(id).set({
        arrayRituals: [],
        uid: id,
      });
      notifySuccess();
      getDocRecords();
    } else {
      notify();
    }
  }

  async function EditRecord() {
    const newArray = [...records];
    const uidRecord = newArray[indexRecord].uid;

    await db.collection("record").doc(uidRecord).set(
      {
        identificationNumber: editRecord.identificationNumber,
      },
      { merge: true }
    );
    getDocRecords();
    handleCloseModalEditRecord();
  }

  async function DeletRecord() {
    const newArray = [...records];
    const uidRecord = newArray[indexRecord].uid;

    const docRefs = [
      db.collection("record").doc(uidRecord),
      db.collection("abiliity").doc(uidRecord),
      db.collection("guns").doc(uidRecord),
      db.collection("inventory").doc(uidRecord),
      db.collection("rituals").doc(uidRecord),
      db.collection("skills").doc(uidRecord),
    ];
    await Promise.all(docRefs.map((docRef) => docRef.delete()));

    getDocRecords();
    handleCloseModalEditRecord();
    notifyDelete();
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

      <ModalSmall
        isOpen={isOpenModalEditRecord}
        onClose={handleCloseModalEditRecord}
      >
        <div className="w-full h-full flex flex-col gap-2">
          <Title>Editar Ficha</Title>
          <div className="w-full h-full px-12 flex flex-col items-center justify-around">
            <InputModal
              value={editRecord.identificationNumber}
              type="text"
              title="Numéro do Registro:"
              placeholder="Ex: Revolver"
              onChange={(event) =>
                setEditRecord({
                  ...editRecord,
                  identificationNumber: parseInt(event.target.value),
                })
              }
            />
            <div>
              <button
                onClick={EditRecord}
                className="bg-green-600 hover:bg-green-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
              >
                Salvar
              </button>
              <button
                onClick={DeletRecord}
                className="bg-red-1000 hover:bg-red-600 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
              >
                Deletar
              </button>
            </div>
          </div>
        </div>
      </ModalSmall>

      <div className="w-full">
        <Header />
        <div className="w-full flex flex-col items-center">
          <div className="w-[95%] flex items-center gap-1 py-3">
            <button
              onClick={createNewRecord}
              className="cursor-pointer w-[160px] flex items-center justify-center gap-1 px-2 py-2 border border-zinc-800 rounded-lg hover:bg-zinc-800"
            >
              <lord-icon
                src="https://cdn.lordicon.com/mrdiiocb.json"
                trigger="hover"
                colors="primary:#ffffff,secondary:#ffffff"
                style={{ width: "30px", height: "30px" }}
              />
              <p className="text-xl">Nova Ficha</p>
            </button>
          </div>
          <div className="w-[95%] flex flex-wrap gap-5 py-3">
            {records !== undefined &&
              records.map((record, index: number) => {
                return (
                  <div key={index} className="relative group">
                    <button
                      className="absolute top-0 right-0 z-20 invisible group-hover:visible"
                      onClick={() => {
                        handleOpenModalEditRecord();
                        setIndexRecord(index);
                      }}
                    >
                      <lord-icon
                        src="https://cdn.lordicon.com/dycatgju.json"
                        trigger="hover"
                        style={{ width: "30px", height: "30px" }}
                      />
                    </button>
                    <IdentificationCard record={record} />
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </>
  );
}
