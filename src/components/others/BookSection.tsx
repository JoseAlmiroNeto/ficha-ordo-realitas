import { useHistory } from "react-router-dom";
import { IProfile, IPropsSection } from "../../types/Type";
import { db, storage } from "./../../auth/Config";
import { useState, useEffect } from "react";
import firebase from "firebase/app";
import "firebase/auth";
import { ModalMedium } from "./../modal/Modal";
import { Title } from "./Title";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BookCover from "../../assets/bookBg.webp";

export function BookSection({ section }: IPropsSection) {
  const currentUser = firebase.auth().currentUser;
  const uid = currentUser ? currentUser.uid : "";

  const [user, setUser] = useState<IProfile | null>(null);
  const [awaitUpdateImg, setAwaitUpdateImg] = useState(false);
  const [newEditSection, setNewEditSection] = useState({
    name: "",
    description: "",
  });
  const [photoUrl, setPhotoUrl] = useState("");

  const history = useHistory();

  const notifyAwait = () => toast.info("Aguarde a imagem ficar pronta!");
  const notifySuccess = () => toast.success("Imagem pronta!");

  const handleClick = () => {
    history.push(`/section/${section.uid}`);
  };

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
    isOpen: isOpenModalConfig,
    handleOpenModal: handleOpenModalConfig,
    handleCloseModal: handleCloseModalConfig,
  } = useModal(false);

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (file) {
      setAwaitUpdateImg(true);
      notifyAwait();
      const storageRef = storage.ref();
      const fileRef = storageRef.child(`images/${file.name}`);
      await fileRef.put(file);
      const url = await fileRef.getDownloadURL();
      setPhotoUrl(url);
    }
    if (file && photoUrl !== undefined) {
      notifySuccess();
      setAwaitUpdateImg(false);
    }
  };

  async function saveEditSection() {
    await db.collection("sections").doc(section.uid).set(
      {
        name: newEditSection.name,
        description: newEditSection.description,
        imgUrl: photoUrl,
      },
      { merge: true }
    );
    getDocUser();
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

      <ModalMedium isOpen={isOpenModalConfig} onClose={handleCloseModalConfig}>
        <div className="w-full h-full flex flex-col gap-2">
          <Title>Editar Seção</Title>
          <div className="w-full h-full px-5 flex flex-col justify-between">
            <div className="flex flex-col">
              <label className="text-white text-xl text-start">
                Nome da Seção
              </label>
              <input
                type="text"
                className="w-full bg-transparent border-b border-zinc-800 pl-2"
                defaultValue={section.name}
                onChange={(event) =>
                  setNewEditSection({
                    ...newEditSection,
                    name: event.target.value,
                  })
                }
              />
            </div>
            <div className="flex flex-col">
              <label className="text-white text-xl text-start">
                Descrição da Seção
              </label>
              <input
                type="text"
                className="w-full bg-transparent border-b border-zinc-800 pl-2"
                defaultValue={section.description}
                onChange={(event) =>
                  setNewEditSection({
                    ...newEditSection,
                    description: event.target.value,
                  })
                }
              />
            </div>
            <div className="flex flex-col">
              <label className="text-white text-xl text-start">
                Capa de fundo da Seção
              </label>
              <input
                className="rounded-md border border-zinc-700"
                type="file"
                onChange={handleFileUpload}
              />
            </div>
            <div className="w-full flex justify-center">
              <button
                disabled={awaitUpdateImg}
                onClick={saveEditSection}
                className="bg-green-600 hover:bg-green-500 font-medium rounded-lg text-base px-5 py-2.5 text-center mr-2 mb-2 w-[45%]"
              >
                Salvar
              </button>
              <button
                // onClick={createWeapon}
                className="bg-red-1000 hover:bg-red-600 font-medium rounded-lg text-base px-5 py-2.5 text-center mr-2 mb-2 w-[45%]"
              >
                Excluir
              </button>
            </div>
          </div>
        </div>
      </ModalMedium>

      <div className="w-[260px] h-[330px] bg-zinc-900 relative rounded flex border-r-[3px] cursor-pointer hover:shadow-xl hover:shadow-zinc-700">
        <div className="w-full h-full cursor-pointer absolute z-0">
          <img
            src={section.imgUrl ? section.imgUrl : BookCover}
            alt="profile photo"
            className="object-cover object-center w-full h-full rounded"
          />
        </div>
        <button
          className="absolute top-0 right-0 py-2 px-2 z-30"
          onClick={handleOpenModalConfig}
        >
          <lord-icon
            src="https://cdn.lordicon.com/dycatgju.json"
            trigger="hover"
            colors="primary:#ffffff"
            style={{ width: "24px", height: "24px" }}
          />
        </button>
        <div
          className="py-3 z-10 flex flex-col justify-between"
          onClick={handleClick}
        >
          <div className="w-full text-center">
            <p className="text-xl text-red-300 font-semibold">OP</p>
            <p className="font-Julee text-xl font-bold">{section.name}</p>
          </div>
          <div className="flex flex-col gap-10">
            <div className="w-[94px] h-[23px] bg-red-200 text-center">
              {section.players.length} players
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-[13px] h-[35px] text-center px-3 text-ellipsis overflow-hidden">
                {section.description
                  ? section.description
                  : "Este histria é sobre um grupo da ordem que busca descobrir misterios sobre..."}
              </p>
              <p className="text-[11px] text-center">
                Criado por{" "}
                <span className="font-Julee font-bold">{user?.name}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
