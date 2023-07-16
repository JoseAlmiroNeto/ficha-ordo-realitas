import { BoxSmall } from "../box/BoxSmall";
import { useEffect, useState } from "react";
import { db } from "./../../auth/Config";
import { DisplayState, EditAbility } from "./../../types/Type";
import { TitleCreate } from "./../others/TitleCreate";
import { ModalMedium } from "../modal/Modal";
import { Title } from "../others/Title";
import { InputModal } from "../others/InputModal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function Ability(value: { uid: string }) {
  const [abilityArr, setAbilityArr] = useState([] as any);
  const [display, setDisplay] = useState<DisplayState>({});
  const [editOnAbility, setEditOnAbility] = useState(false);
  const [selectedEditAbility, setSelectedEditAbility] = useState<EditAbility>({
    name: "",
    description: "",
    index: -1,
  });
  const [newAbility, setNewAbility] = useState({
    name: "",
    description: "",
  });

  const notify = () => toast.success("Criado com sucesso!");
  const notifyEdit = () => toast.success("Habilidade editada com sucesso!");
  const notifyDelete = () => toast.success("Habilidade excluida com sucesso!");

  useEffect(() => {
    getDocAbiliity();
  }, []);

  async function getDocAbiliity() {
    const { docs } = await db
      .collection("abiliity")
      .where("uid", "==", value.uid)
      .get();
    setAbilityArr(docs[0].data());
  }

  const toggleDisplay = (index: number) => {
    setDisplay({
      ...display,
      [index]: !display[index],
    });
  };

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
    isOpen: isOpenModalCreate,
    handleOpenModal: handleOpenModalCreate,
    handleCloseModal: handleCloseModalCreate,
  } = useModal(false);

  const {
    isOpen: isOpenModalEdit,
    handleOpenModal: handleOpenModalEdit,
    handleCloseModal: handleCloseModalEdit,
  } = useModal(false);

  async function createAbility() {
    const newArray = [...(abilityArr?.arrayAbiliity ?? []), newAbility];
    await db.collection("abiliity").doc(value.uid).set(
      {
        arrayAbiliity: newArray,
      },
      { merge: true }
    );
    getDocAbiliity();
    handleCloseModalCreate();
    notify();
  }

  async function saveEditAbility(index: number) {
    const newArray = [...(abilityArr?.arrayAbiliity ?? [])];
    newArray[index] = selectedEditAbility;
    await db.collection("abiliity").doc(value.uid).set(
      {
        arrayAbiliity: newArray,
      },
      { merge: true }
    );
    getDocAbiliity();
    handleCloseModalEdit();
    setEditOnAbility(false);
    notifyEdit();
  }

  async function deleteAbility(index: number) {
    const newArray = [...(abilityArr?.arrayAbiliity ?? [])];
    newArray.splice(index, 1);
    await db.collection("abiliity").doc(value.uid).set(
      {
        arrayAbiliity: newArray,
      },
      { merge: true }
    );
    getDocAbiliity();
    handleCloseModalEdit();
    setEditOnAbility(false);
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

      <ModalMedium isOpen={isOpenModalCreate} onClose={handleCloseModalCreate}>
        <div className="w-full h-full flex flex-col gap-2">
          <Title>Criar Habilidade</Title>
          <div className="w-full h-full px-5 flex flex-col justify-between">
            <div className="flex flex-col justify-evenly h-full">
              <InputModal
                title="Nome da Habilidade:"
                type="text"
                placeholder="Ex: Percepção Paranormal"
                onChange={(event) =>
                  setNewAbility({ ...newAbility, name: event.target.value })
                }
              />
              <div>
                <span className="font-semibold">Descrição</span>
                <textarea
                  className="w-full bg-transparent border-b border-zinc-800 pl-2"
                  rows={6}
                  placeholder="Descrição da Habilidade"
                  onChange={(event) =>
                    setNewAbility({
                      ...newAbility,
                      description: event.target.value,
                    })
                  }
                />
              </div>
            </div>
            <button
              onClick={createAbility}
              className="bg-red-1000 hover:bg-red-600 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
            >
              Criar
            </button>
          </div>
        </div>
      </ModalMedium>

      <ModalMedium isOpen={isOpenModalEdit} onClose={handleCloseModalEdit}>
        <div className="w-full h-full flex flex-col gap-2">
          <Title>Editar Habilidade</Title>
          <div className="w-full h-full px-5 flex flex-col justify-between">
            <div className="flex flex-col justify-evenly h-full">
              <InputModal
                title="Nome da Habilidade:"
                type="text"
                placeholder="Ex: Percepção Paranormal"
                value={selectedEditAbility?.name}
                onChange={(event) =>
                  setSelectedEditAbility({
                    ...selectedEditAbility,
                    name: event.target.value,
                  })
                }
              />
              <div>
                <span className="font-semibold">Descrição</span>
                <textarea
                  className="w-full bg-transparent border-b border-zinc-800 pl-2"
                  rows={6}
                  placeholder="Descrição da Habilidade"
                  defaultValue={selectedEditAbility?.description}
                  onChange={(event) =>
                    setSelectedEditAbility({
                      ...selectedEditAbility,
                      description: event.target.value,
                    })
                  }
                />
              </div>
            </div>
            <div className="w-full flex justify-around">
              <button
                onClick={() => saveEditAbility(selectedEditAbility?.index)}
                className="bg-green-600 hover:bg-green-500 w-[40%] font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
              >
                Salvar
              </button>
              <button
                onClick={() => deleteAbility(selectedEditAbility?.index)}
                className="bg-red-1000 hover:bg-red-600 w-[40%] font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
              >
                Deletar
              </button>
            </div>
          </div>
        </div>
      </ModalMedium>

      <BoxSmall>
        <>
          <TitleCreate>
            <div className="w-[67px]" />
            <p>HABILIDADES</p>
            <div className="flex justify-end w-[67px] gap-2">
              <div
                className="border rounded cursor-pointer
                sm:w-[20px] sm:h-[20px]
                xl:w-[28px] xl:[28px]
                2xl:w-[28px] 2xl:h-[28px]
                "
                onClick={handleOpenModalCreate}
              >
                <lord-icon
                  src="https://cdn.lordicon.com/mrdiiocb.json"
                  trigger="hover"
                  colors="primary:#ffffff"
                  style={{ width: "18px", height: "18px" }}
                />
              </div>
              <div
                className="border rounded cursor-pointer
                sm:w-[20px] sm:h-[20px]
                xl:w-[28px] xl:[28px]
                2xl:w-[28px] 2xl:h-[28px]"
                onClick={() => setEditOnAbility(!editOnAbility)}
              >
                <lord-icon
                  src="https://cdn.lordicon.com/wloilxuq.json"
                  trigger="hover"
                  colors="primary:#ffffff,secondary:#ffffff"
                  style={{ width: "18px", height: "18px" }}
                ></lord-icon>
              </div>
            </div>
          </TitleCreate>
          <div className="h-[642px] w-full flex flex-col relative gap-2 pt-2">
            {abilityArr.arrayAbiliity !== undefined &&
              abilityArr.arrayAbiliity.map(
                (abili: EditAbility, index: number) => {
                  return (
                    <div key={index}>
                      <h2
                        onClick={() => {
                          if (editOnAbility) {
                            setSelectedEditAbility({
                              name: abili.name,
                              description: abili.description,
                              index: index,
                            });
                            handleOpenModalEdit();
                          } else {
                            toggleDisplay(index);
                          }
                        }}
                        className={
                          editOnAbility
                            ? "cursor-pointer font-semibold sm:text-sm xl:text-lg 2xl:text-lg bg-zinc-800 rounded animate-pulse"
                            : "cursor-pointer font-semibold sm:text-sm xl:text-lg 2xl:text-lg"
                        }
                      >
                        {abili.name}
                      </h2>
                      {display[index] && (
                        <p
                          className="pl-3
                        sm:text-xs
                        xl:text-base
                        2xl:text-base
                        "
                        >
                          {abili.description}
                        </p>
                      )}
                    </div>
                  );
                }
              )}
          </div>
        </>
      </BoxSmall>
    </>
  );
}
