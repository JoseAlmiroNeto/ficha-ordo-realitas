import { db } from "./../../auth/Config";
import { Title } from "../others/Title";
import { BoxLarge } from "./../box/BoxLarge";
import { InputModal } from "./../others/InputModal";
import { TitleCreate } from "./../others/TitleCreate";
import D20 from "../../assets/d20.svg";
import { ICombatWeapon, INewWeapon } from "../../types/Type";
import { useEffect, useState } from "react";
import { ModalLarge, ModalSmall } from "../modal/Modal";
import { SelectModal } from "../others/SelectModal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  ammunition,
  category,
  proficiency,
  reach,
  typeDamage,
} from "../others/DataBase";
import { ButtonTrash } from "../others/ButtonTrash";

export function Combat(value: { uid: string }) {
  const [combats, setCombats] = useState<ICombatWeapon | null>(null);
  const [show, setShow] = useState(false);
  const [editOnWeapon, setEditOnWeapon] = useState(false);
  const [resultDamage, setResultDamage] = useState<{
    newValue: number;
    calc: string;
    sum: number[];
  }>();
  const [newWeapon, setNewWeapon] = useState<INewWeapon>({
    name: "",
    type: "",
    ammunition: "",
    reach: "",
    critical: "",
    category: "",
    proficiency: "",
    damage: "",
  });
  const [dataEditWeapon, setDataEditWeapon] = useState<INewWeapon>({
    name: "",
    type: "",
    ammunition: "",
    reach: "",
    critical: "",
    category: "",
    proficiency: "",
    damage: "",
  });
  const [indexEdit, setIndexEdit] = useState<number>(0);

  const notify = () => toast.success("Criado com sucesso!");
  const notifyEdit = () => toast.success("Arma editada com sucesso!");

  useEffect(() => {
    getDocCombat();
  }, []);

  async function getDocCombat() {
    const { docs } = await db
      .collection("guns")
      .where("uid", "==", value.uid)
      .get();
    const data = docs[0].data() as ICombatWeapon;
    setCombats(data);
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
    isOpen: isOpenModalEditWeapon,
    handleOpenModal: handleOpenModalEditWeapon,
    handleCloseModal: handleCloseModalEditWeapon,
  } = useModal(false);

  const {
    isOpen: isOpenModalRollDamage,
    handleOpenModal: handleOpenModalRollDamage,
    handleCloseModal: handleCloseModalRollDamage,
  } = useModal(false);

  async function createWeapon() {
    const newArray = [...(combats?.arrayGuns ?? []), newWeapon];
    await db.collection("guns").doc(value.uid).set(
      {
        arrayGuns: newArray,
      },
      { merge: true }
    );
    getDocCombat();
    handleCloseModalCreate();
    notify();
  }

  async function editWeapon() {
    const newArray = [...(combats?.arrayGuns ?? [])];
    newArray[indexEdit] = dataEditWeapon;
    await db.collection("guns").doc(value.uid).set(
      {
        arrayGuns: newArray,
      },
      { merge: true }
    );
    getDocCombat();
    handleCloseModalEditWeapon();
    notifyEdit();
    setEditOnWeapon(false);
  }

  async function deletedWeapon(index: number) {
    const newArray = [...(combats?.arrayGuns ?? [])];
    newArray.splice(index, 1);
    await db.collection("guns").doc(value.uid).set(
      {
        arrayGuns: newArray,
      },
      { merge: true }
    );
    getDocCombat();
  }

  function rollDamage(value: string) {
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
          <Title>Criar Arma</Title>
          <div className="w-full h-full px-5 flex flex-col justify-between">
            <InputModal
              type="text"
              title="Nome:"
              placeholder="Ex: Revolver"
              onChange={(event) =>
                setNewWeapon({ ...newWeapon, name: event.target.value })
              }
            />
            <SelectModal
              title="Tipo:"
              options={typeDamage}
              value={newWeapon.type}
              onChange={(event) =>
                setNewWeapon({ ...newWeapon, type: event.target.value })
              }
            />
            <SelectModal
              title="Proficiência:"
              options={proficiency}
              value={newWeapon.proficiency}
              onChange={(event) =>
                setNewWeapon({ ...newWeapon, proficiency: event.target.value })
              }
            />
            <SelectModal
              title="Munição:"
              options={ammunition}
              value={newWeapon.ammunition}
              onChange={(event) =>
                setNewWeapon({ ...newWeapon, ammunition: event.target.value })
              }
            />
            <SelectModal
              title="Alcance:"
              options={reach}
              value={newWeapon.reach}
              onChange={(event) =>
                setNewWeapon({ ...newWeapon, reach: event.target.value })
              }
            />
            <SelectModal
              title="Categoria:"
              options={category}
              value={newWeapon.category}
              onChange={(event) =>
                setNewWeapon({ ...newWeapon, category: event.target.value })
              }
            />
            <InputModal
              type="text"
              title="Crítico:"
              placeholder="Ex: 2X"
              onChange={(event) =>
                setNewWeapon({ ...newWeapon, critical: event.target.value })
              }
            />
            <InputModal
              type="text"
              title="Dano:"
              placeholder="Ex: 2d4+5"
              onChange={(event) =>
                setNewWeapon({ ...newWeapon, damage: event.target.value })
              }
            />
            <button
              onClick={createWeapon}
              className="bg-red-1000 hover:bg-red-600 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
            >
              Criar
            </button>
          </div>
        </div>
      </ModalLarge>

      <ModalLarge
        isOpen={isOpenModalEditWeapon}
        onClose={handleCloseModalEditWeapon}
      >
        <div className="w-full h-full flex flex-col gap-2">
          <Title>Editar Arma</Title>
          <div className="w-full h-full px-5 flex flex-col justify-between">
            <InputModal
              value={dataEditWeapon?.name}
              type="text"
              title="Nome:"
              placeholder="Ex: Revolver"
              onChange={(event) =>
                setDataEditWeapon({
                  ...dataEditWeapon,
                  name: event.target.value,
                })
              }
            />
            <SelectModal
              title="Tipo:"
              options={typeDamage}
              value={dataEditWeapon?.type}
              onChange={(event) =>
                setDataEditWeapon({
                  ...dataEditWeapon,
                  type: event.target.value,
                })
              }
            />
            <SelectModal
              title="Proficiência:"
              options={proficiency}
              value={dataEditWeapon?.proficiency}
              onChange={(event) =>
                setDataEditWeapon({
                  ...dataEditWeapon,
                  proficiency: event.target.value,
                })
              }
            />
            <SelectModal
              title="Munição:"
              options={ammunition}
              value={dataEditWeapon?.ammunition}
              onChange={(event) =>
                setDataEditWeapon({
                  ...dataEditWeapon,
                  ammunition: event.target.value,
                })
              }
            />
            <SelectModal
              title="Alcance:"
              options={reach}
              value={dataEditWeapon?.reach}
              onChange={(event) =>
                setDataEditWeapon({
                  ...dataEditWeapon,
                  reach: event.target.value,
                })
              }
            />
            <SelectModal
              title="Categoria:"
              options={category}
              value={dataEditWeapon?.category}
              onChange={(event) =>
                setDataEditWeapon({
                  ...dataEditWeapon,
                  category: event.target.value,
                })
              }
            />
            <InputModal
              value={dataEditWeapon?.critical}
              type="text"
              title="Crítico:"
              placeholder="Ex: 2X"
              onChange={(event) =>
                setDataEditWeapon({
                  ...dataEditWeapon,
                  critical: event.target.value,
                })
              }
            />
            <InputModal
              value={dataEditWeapon?.damage}
              type="text"
              title="Dano:"
              placeholder="Ex: 2d6+5"
              onChange={(event) =>
                setDataEditWeapon({
                  ...dataEditWeapon,
                  damage: event.target.value,
                })
              }
            />
            <button
              onClick={editWeapon}
              className="bg-red-1000 hover:bg-red-600 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
            >
              Salvar
            </button>
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
          <p>COMBATE</p>
          <div className="flex w-[67px] gap-2">
            <div
              className="w-[28px] h-[28px] border rounded cursor-pointer"
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
              className="w-[28px] h-[28px] border rounded cursor-pointer"
              onClick={() => setEditOnWeapon(!editOnWeapon)}
            >
              <lord-icon
                src="https://cdn.lordicon.com/wloilxuq.json"
                trigger="hover"
                colors="primary:#ffffff,secondary:#ffffff"
                style={{ width: "24px", height: "24px" }}
              />
            </div>
          </div>
        </TitleCreate>
        <div
          className="h-[642px] w-full flex flex-col text-xs
          xl:text-sm 
          2xl:text-base"
        >
          <div className="w-full h-12 flex border-b border-zinc-800">
            <div className="flex w-[60%] justify-between items-end">
              <p className="w-[35%]">Arma</p>
              <p className="w-[25%]">Tipo</p>
              <p className="w-[25%]">Dano</p>
            </div>
            <div className="flex w-[40%] justify-between text-center items-end">
              <p className="w-[23%]">Munição</p>
              <p className="w-[23%]">Alcance</p>
              <p className="w-[23%]">Crítico</p>
              <p className="w-[23%]">Categoria</p>
            </div>
          </div>
          {combats !== null &&
            combats.arrayGuns.map((data, index: number) => {
              return (
                <div
                  className={
                    editOnWeapon
                      ? "w-full h-12 flex border-b border-zinc-900 animate-pulse cursor-pointer bg-zinc-900 rounded"
                      : "w-full h-12 flex border-b border-zinc-900"
                  }
                  key={index}
                  onClick={() => {
                    if (editOnWeapon) {
                      handleOpenModalEditWeapon();
                      setDataEditWeapon(data);
                      setIndexEdit(index);
                    }
                  }}
                >
                  <div className="flex w-[60%] justify-between items-center">
                    <div className="w-[35%] h-8 flex items-center gap-2">
                      <ButtonTrash onClick={() => deletedWeapon(index)} />
                      <p>{data.name}</p>
                    </div>
                    <p className="w-[25%]">{data.type}</p>
                    <div className="w-[25%] flex items-center gap-1">
                      <img
                        src={D20}
                        alt="d20"
                        className="w-[25px] cursor-pointer hover:animate-spin"
                        onClick={() => {
                          rollDamage(data.damage);
                          handleOpenModalRollDamage();
                          handleClick();
                        }}
                      />
                      <p className="flex">{data.damage}</p>
                    </div>
                  </div>
                  <div className="flex w-[40%] justify-between text-center items-center">
                    <p className="w-[23%] truncate">
                      {data.ammunition.split("-")[0]}
                    </p>
                    <p className="w-[23%]">{data.reach}</p>
                    <p className="w-[23%]">{data.critical}</p>
                    <p className="w-[23%]">{data.category}</p>
                  </div>
                </div>
              );
            })}
        </div>
      </BoxLarge>
    </>
  );
}
