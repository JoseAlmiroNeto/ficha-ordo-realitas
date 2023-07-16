import { BoxLarge } from "../box/BoxLarge";
import { useEffect, useState } from "react";
import { db } from "./../../auth/Config";
import { INewRitual, IRituals } from "../../types/Type";
import { TitleCreate } from "./../others/TitleCreate";
import { ModalLarge, ModalSmall } from "../modal/Modal";
import { Title } from "../others/Title";
import { InputModal } from "../others/InputModal";
import { SelectModal } from "../others/SelectModal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  circle,
  elementRituals,
  iconMapRitual,
  reachRitual,
  resistance,
  ritual,
  scene,
} from "../others/DataBase";

export function Rituals(value: { uid: string }) {
  const [show, setShow] = useState(false);
  const [rituals, setRituals] = useState<IRituals | null>(null);
  const [isEditRitual, setIsEditRitual] = useState(false);
  const [indexRitual, setIndexRitual] = useState(0);
  const [newRitual, setNewRitual] = useState<INewRitual>({
    name: "",
    element: "",
    reach: "",
    duration: "",
    execution: "",
    target: "",
    resistance: "",
    circle: "",
    description: "",
    damage: "",
  });
  const [dataEditRitual, setDataEditRitual] = useState<INewRitual>({
    name: "",
    element: "",
    reach: "",
    duration: "",
    execution: "",
    target: "",
    resistance: "",
    circle: "",
    description: "",
    damage: "",
  });
  const [resultDamage, setResultDamage] = useState<{
    newValue: number;
    calc: string;
    sum: number[];
  }>();

  const notify = () => toast.success("Criado com sucesso!");
  const notifyEdit = () => toast.success("Ritual editado com sucesso!");
  const notifyDelete = () => toast.success("Ritual deletado com sucesso!");

  useEffect(() => {
    getDocRitual();
  }, []);

  async function getDocRitual() {
    const { docs } = await db
      .collection("rituals")
      .where("uid", "==", value.uid)
      .get();
    const data = docs[0].data() as IRituals;
    setRituals(data);
  }

  const handleClick = () => {
    setShow(false);
    setTimeout(() => {
      setShow(true);
    }, 2000);
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

  const {
    isOpen: isOpenModalRollDamage,
    handleOpenModal: handleOpenModalRollDamage,
    handleCloseModal: handleCloseModalRollDamage,
  } = useModal(false);

  async function CreateRitual() {
    const newArray = [...(rituals?.arrayRituals ?? []), newRitual];
    await db.collection("rituals").doc(value.uid).set(
      {
        arrayRituals: newArray,
      },
      { merge: true }
    );
    getDocRitual();
    handleCloseModalCreate();
    notify();
  }

  async function EditRitual() {
    const newArray = [...(rituals?.arrayRituals ?? [])];
    newArray[indexRitual] = dataEditRitual;
    await db.collection("rituals").doc(value.uid).set(
      {
        arrayRituals: newArray,
      },
      { merge: true }
    );
    getDocRitual();
    handleCloseModalEdit();
    notifyEdit();
    setIsEditRitual(false);
  }

  async function DeleteRitual() {
    const newArray = [...(rituals?.arrayRituals ?? [])];
    newArray.splice(indexRitual, 1);
    await db.collection("rituals").doc(value.uid).set(
      {
        arrayRituals: newArray,
      },
      { merge: true }
    );
    getDocRitual();
    handleCloseModalEdit();
    notifyDelete();
    setIsEditRitual(false);
  }

  function RollDamage(value: string) {
    const sum: number[] = [];
    const diceArray = value.split("+");
    diceArray.forEach((e) => {
      if (e.includes("d")) {
        const dado = parseInt(e.split("d")[1]);
        const roll = parseInt(e.split("d")[0]);
        sum.push(
          ...Array(roll)
            .fill(0)
            .map(() => Math.floor(Math.random() * dado + 1))
        );
      } else {
        const Int = parseInt(e);
        sum.push(Int);
      }
    });
    setResultDamage({
      ...resultDamage,
      newValue: sum.reduce((acc, currentValue) => acc + currentValue, 0),
      calc: value,
      sum: sum,
    });
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

      <ModalLarge isOpen={isOpenModalCreate} onClose={handleCloseModalCreate}>
        <div className="w-full h-full flex flex-col gap-2">
          <Title>Criar Ritual</Title>
          <div className="w-full h-full px-5 flex flex-col justify-between">
            <SelectModal
              title="Ritual:"
              options={ritual}
              value={newRitual.name}
              onChange={(event) =>
                setNewRitual({ ...newRitual, name: event.target.value })
              }
            />
            <SelectModal
              title="Elemento:"
              options={elementRituals}
              value={newRitual.element}
              onChange={(event) =>
                setNewRitual({ ...newRitual, element: event.target.value })
              }
            />
            <SelectModal
              title="Alcance:"
              options={reachRitual}
              value={newRitual.reach}
              onChange={(event) =>
                setNewRitual({ ...newRitual, reach: event.target.value })
              }
            />
            <SelectModal
              title="Duração:"
              options={scene}
              value={newRitual.duration}
              onChange={(event) =>
                setNewRitual({ ...newRitual, duration: event.target.value })
              }
            />
            <SelectModal
              title="Nivel do Círculo:"
              options={circle}
              value={newRitual.circle}
              onChange={(event) =>
                setNewRitual({ ...newRitual, circle: event.target.value })
              }
            />
            <SelectModal
              title="Resistência?"
              options={resistance}
              value={newRitual.resistance}
              onChange={(event) =>
                setNewRitual({ ...newRitual, resistance: event.target.value })
              }
            />
            <InputModal
              type="text"
              title="Alvo:"
              placeholder="Ex: 1 Acessório ou Arma de Fogo"
              onChange={(event) =>
                setNewRitual({ ...newRitual, target: event.target.value })
              }
            />
            <InputModal
              type="text"
              title="Execução:"
              placeholder="Ex: Padrão"
              onChange={(event) =>
                setNewRitual({ ...newRitual, execution: event.target.value })
              }
            />
            <InputModal
              type="text"
              title="Descrição:"
              placeholder="Ex: Você imbui o alvo com Energia, fazendo-o funcionar..."
              onChange={(event) =>
                setNewRitual({ ...newRitual, description: event.target.value })
              }
            />
            <InputModal
              type="text"
              title="Dano:"
              placeholder="Ex: 1d4+4"
              onChange={(event) =>
                setNewRitual({ ...newRitual, damage: event.target.value })
              }
            />
            <button
              onClick={CreateRitual}
              className="bg-red-1000 hover:bg-red-600 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
            >
              Criar
            </button>
          </div>
        </div>
      </ModalLarge>

      <ModalLarge isOpen={isOpenModalEdit} onClose={handleCloseModalEdit}>
        <div className="w-full h-full flex flex-col gap-2">
          <Title>Editar Ritual</Title>
          <div className="w-full h-full px-5 flex flex-col justify-between">
            <SelectModal
              title="Ritual:"
              options={ritual}
              value={dataEditRitual.name}
              onChange={(event) =>
                setDataEditRitual({
                  ...dataEditRitual,
                  name: event.target.value,
                })
              }
            />
            <SelectModal
              title="Elemento:"
              options={elementRituals}
              value={dataEditRitual.element}
              onChange={(event) =>
                setDataEditRitual({
                  ...dataEditRitual,
                  element: event.target.value,
                })
              }
            />
            <SelectModal
              title="Alcance:"
              options={reachRitual}
              value={dataEditRitual.reach}
              onChange={(event) =>
                setDataEditRitual({
                  ...dataEditRitual,
                  reach: event.target.value,
                })
              }
            />
            <SelectModal
              title="Duração:"
              options={scene}
              value={dataEditRitual.duration}
              onChange={(event) =>
                setDataEditRitual({
                  ...dataEditRitual,
                  duration: event.target.value,
                })
              }
            />
            <SelectModal
              title="Nivel do Círculo:"
              options={circle}
              value={dataEditRitual.circle}
              onChange={(event) =>
                setDataEditRitual({
                  ...dataEditRitual,
                  circle: event.target.value,
                })
              }
            />
            <SelectModal
              title="Resistência?"
              options={resistance}
              value={dataEditRitual.resistance}
              onChange={(event) =>
                setDataEditRitual({
                  ...dataEditRitual,
                  resistance: event.target.value,
                })
              }
            />
            <InputModal
              value={dataEditRitual.target}
              type="text"
              title="Alvo:"
              placeholder="Ex: 1 Acessório ou Arma de Fogo"
              onChange={(event) =>
                setDataEditRitual({
                  ...dataEditRitual,
                  target: event.target.value,
                })
              }
            />
            <InputModal
              value={dataEditRitual.execution}
              type="text"
              title="Execução:"
              placeholder="Ex: Padrão"
              onChange={(event) =>
                setDataEditRitual({
                  ...dataEditRitual,
                  execution: event.target.value,
                })
              }
            />
            <InputModal
              value={dataEditRitual.description}
              type="text"
              title="Descrição:"
              placeholder="Ex: Você imbui o alvo com Energia, fazendo-o funcionar..."
              onChange={(event) =>
                setDataEditRitual({
                  ...dataEditRitual,
                  description: event.target.value,
                })
              }
            />
            <InputModal
              value={dataEditRitual.damage}
              type="text"
              title="Dano:"
              placeholder="Ex: 1d4+4"
              onChange={(event) =>
                setDataEditRitual({
                  ...dataEditRitual,
                  damage: event.target.value,
                })
              }
            />
            <div className="w-full flex justify-around">
              <button
                onClick={EditRitual}
                className="bg-green-600 hover:bg-green-500 w-[40%] font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
              >
                Salvar
              </button>
              <button
                onClick={DeleteRitual}
                className="bg-red-1000 hover:bg-red-600 w-[40%] font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
              >
                Deletar
              </button>
            </div>
          </div>
        </div>
      </ModalLarge>

      <ModalSmall
        isOpen={isOpenModalRollDamage}
        onClose={handleCloseModalRollDamage}
      >
        <div className="w-full h-full flex flex-col gap-2">
          <Title>Rolagem de Dano</Title>
          <div className="w-full h-full px-5 flex items-center justify-center">
            {!show && (
              <div className="h-[80%] flex items-center">
                <div className="w-5 h-5 rounded-full bg-white animate-ping" />
              </div>
            )}
            {show && (
              <div className="flex flex-col items-center justify-center gap-4">
                <div>
                  <div className="flex">{resultDamage?.calc}</div>
                  <p className="flex">
                    (
                    {resultDamage?.sum.map((el, index) => {
                      return (
                        <p key={index}>
                          {el}
                          {index !== resultDamage.sum.length - 1 && "+"}
                        </p>
                      );
                    })}
                    )
                  </p>
                </div>
                <div className="text-5xl font-bold">
                  {resultDamage?.newValue}
                </div>
              </div>
            )}
          </div>
        </div>
      </ModalSmall>

      <BoxLarge>
        <TitleCreate>
          <div className="w-[67px]" />
          <p>RITUAIS</p>
          <div className="flex w-[67px] gap-2">
            <button
              className="w-[28px] h-[28px] border rounded cursor-pointer"
              onClick={handleOpenModalCreate}
            >
              <lord-icon
                src="https://cdn.lordicon.com/mrdiiocb.json"
                trigger="hover"
                colors="primary:#ffffff"
                style={{ width: "18px", height: "18px" }}
              />
            </button>
            <button
              className="w-[28px] h-[28px] border rounded"
              onClick={() => setIsEditRitual(!isEditRitual)}
            >
              <lord-icon
                src="https://cdn.lordicon.com/wloilxuq.json"
                trigger="hover"
                colors="primary:#ffffff,secondary:#ffffff"
                style={{ width: "24px", height: "24px" }}
              ></lord-icon>
            </button>
          </div>
        </TitleCreate>
        <div className="h-[642px] w-full flex flex-col gap-3">
          {rituals !== null &&
            rituals.arrayRituals.map((data, index: number) => {
              let COLOR = "";
              if (data.element === "Conhecimento") {
                COLOR = "#c29a65";
              } else if (data.element === "Energia") {
                COLOR = "#6121A8";
              } else if (data.element === "Morte") {
                COLOR = "#302a2b";
              } else if (data.element === "Sangue") {
                COLOR = "#630f0c";
              }

              return (
                <div
                  className={
                    isEditRitual
                      ? "border-[2px] border-zinc-800 w-full h-[230px] rounded-md cursor-pointer animate-pulse bg-zinc-900"
                      : "border-[2px] border-zinc-800 w-full h-[230px] rounded-md"
                  }
                  key={index}
                  onClick={() => {
                    if (isEditRitual) {
                      handleOpenModalEdit();
                      setIndexRitual(index);
                      setDataEditRitual(data);
                    }
                  }}
                >
                  <div className="w-full flex h-[63%] border-b-[2px] border-zinc-800">
                    <div
                      className="w-[11%] flex items-center justify-center cursor-pointer"
                      onClick={() => {
                        if (data.damage !== undefined) {
                          RollDamage(data.damage);
                          handleOpenModalRollDamage();
                          handleClick();
                        }
                      }}
                    >
                      {iconMapRitual[data.name]}
                    </div>
                    <div className="w-full flex items-center pl-4">
                      <div className="w-[50%] flex flex-col gap-2">
                        <p
                          className="font-bold text-xl"
                          style={{ color: `${COLOR}` }}
                        >
                          {data.name}
                        </p>
                        <p className="text-lg">
                          <span className="font-bold">Elemento:</span>{" "}
                          {data.element}
                        </p>
                        <p className="text-lg">
                          <span className="font-bold">Alcance:</span>{" "}
                          {data.reach}
                        </p>
                        <p className="text-lg">
                          <span className="font-bold">Duração:</span>{" "}
                          {data.duration}
                        </p>
                      </div>
                      <div className="w-[50%] flex flex-col gap-2">
                        <p className="text-lg">
                          <span className="font-bold">Execução:</span>{" "}
                          {data.execution}
                        </p>
                        <p className="text-lg">
                          <span className="font-bold">Alvo:</span> {data.target}
                        </p>
                        <p className="text-lg">
                          <span className="font-bold">Resistência:</span>{" "}
                          {data.resistance}
                        </p>
                        <p className="text-lg">
                          <span className="font-bold">Circulo:</span>{" "}
                          {data.circle}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="p-2 flex leading-relaxed">
                    {data.description}
                  </div>
                </div>
              );
            })}
        </div>
      </BoxLarge>
    </>
  );
}
