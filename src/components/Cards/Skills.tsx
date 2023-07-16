import { BoxLarge } from "../box/BoxLarge";
import { ChangeEvent, useEffect, useState } from "react";
import { db } from "./../../auth/Config";
import { IIconMap, INewSkill, IRecord, ISkills } from "../../types/Type";
import { TitleCreate } from "./../others/TitleCreate";
import { ModalMedium, ModalSmall } from "../modal/Modal";
import { Title } from "../others/Title";
import { InputModal } from "../others/InputModal";
import { SelectModal } from "../others/SelectModal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { iconMap, skillsArray, trainded } from "../others/DataBase";

export function Skills(value: { uid: string }) {
  const [show, setShow] = useState(false);
  const [skills, setSkills] = useState<ISkills | null>(null);
  const [records, setRecords] = useState<IRecord | null>(null);
  const [isEditSkill, setIsEditSkill] = useState(false);
  const [newSkill, setNewSkill] = useState<INewSkill>({
    skillName: "",
    keyAttribute: "",
    bonus: 0,
    other: 0,
    trained: "",
    trainedValue: 0,
  });
  const [dataEditSkill, setDataEditSkill] = useState<INewSkill>({
    skillName: "",
    keyAttribute: "",
    bonus: 0,
    other: 0,
    trained: "",
    trainedValue: 0,
  });
  const [skillData, setSkillData] = useState<INewSkill>();
  const [indexEdit, setIndexEdit] = useState<number>(0);

  const notifySucsses = () => toast.success("Perícia criado com sucesso!");
  const notifyEdit = () => toast.success("Editado com sucesso!");
  const notifyError = () =>
    toast.error("Preencha todas as informações necessarias corretamente!");
  const notifyDelete = () => toast.success("Ritual deletado com sucesso!");

  useEffect(() => {
    getDocSkills();
    getDocRecords();
  }, []);

  async function getDocSkills() {
    const { docs } = await db
      .collection("skills")
      .where("uid", "==", value.uid)
      .get();
    const data = docs[0].data() as ISkills;
    setSkills(data);
  }

  async function getDocRecords() {
    const { docs } = await db
      .collection("record")
      .where("uid", "==", value.uid)
      .get();
    const data = docs[0].data() as IRecord;
    setRecords(data);
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
    isOpen: isOpenModalRollSkill,
    handleOpenModal: handleOpenModalRollSkill,
    handleCloseModal: handleCloseModalRollSkill,
  } = useModal(false);

  const handleChangeSkillName = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedOption = event.target.selectedOptions[0];
    const dataExtra = selectedOption.getAttribute("data-extra1");
    setNewSkill({
      ...newSkill,
      skillName: selectedOption.value,
      keyAttribute: dataExtra ? dataExtra : "Sem Atributo",
    });
  };

  const handleChangeTrained = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedOption = event.target.selectedOptions[0];
    const dataExtra = selectedOption.getAttribute("data-extra1");
    setNewSkill({
      ...newSkill,
      trained: selectedOption.value,
      trainedValue: dataExtra ? parseInt(dataExtra) : 0,
    });
  };

  async function CreateNewSkills() {
    const newArray = [...(skills?.arraySkills ?? []), newSkill];
    await db.collection("skills").doc(value.uid).set(
      {
        arraySkills: newArray,
      },
      { merge: true }
    );
    notifySucsses();
    getDocSkills();
    handleCloseModalCreate();
    setNewSkill({
      skillName: "",
      keyAttribute: "",
      bonus: 0,
      other: 0,
      trained: "",
      trainedValue: 0,
    });
  }

  async function EditSkill() {
    const newArray = [...(skills?.arraySkills ?? [])];
    newArray[indexEdit] = dataEditSkill;
    await db.collection("skills").doc(value.uid).set(
      {
        arraySkills: newArray,
      },
      { merge: true }
    );
    getDocSkills();
    handleCloseModalEdit();
    notifyEdit();
    setIsEditSkill(false);
  }

  async function DeleteSkill() {
    const newArray = [...(skills?.arraySkills ?? [])];
    newArray.splice(indexEdit, 1);
    await db.collection("skills").doc(value.uid).set(
      {
        arraySkills: newArray,
      },
      { merge: true }
    );
    getDocSkills();
    handleCloseModalEdit();
    notifyDelete();
    setIsEditSkill(false);
  }

  function RollPeri(props: { skill: any }) {
    const skillKey = props.skill.keyAttribute;
    const keyAttribute =
      records?.Attributes[skillKey as keyof (typeof records)["Attributes"]];

    if (typeof keyAttribute !== "undefined") {
      const valueD20 = Array.from({ length: +keyAttribute ?? 0 }, () =>
        Math.floor(Math.random() * 20 + 1)
      );
      const maxValue = Math.max(...valueD20);
      const result =
        maxValue +
        +props.skill.trainedValue +
        +props.skill.other +
        +props.skill.bonus;

      return (
        <div className="flex flex-col items-center justify-center gap-5">
          <p className="text-xl font-bold">{props.skill.skillName}</p>
          <div>
            {`${keyAttribute}d20(${maxValue}) + ${
              props.skill.trained.split("(")[0]
            }(${props.skill.trainedValue}) + Outro(${
              props.skill.other
            }) + Bônus(${props.skill.bonus})`}
          </div>
          <div className="text-3xl font-bold">{result}</div>
        </div>
      );
    } else {
      return null;
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

      <ModalMedium isOpen={isOpenModalCreate} onClose={handleCloseModalCreate}>
        <div className="w-full h-full flex flex-col gap-2">
          <Title>Criar Perícia</Title>
          <div className="w-full h-full px-5 flex flex-col justify-between">
            <SelectModal
              title="Perícia:"
              options={skillsArray}
              value={newSkill.skillName}
              onChange={handleChangeSkillName}
            />
            <SelectModal
              title="Treinado?"
              options={trainded}
              value={newSkill.trained}
              onChange={handleChangeTrained}
            />
            <InputModal
              title="Bônus:"
              type="number"
              placeholder="Ex:5"
              onChange={(event) =>
                setNewSkill({
                  ...newSkill,
                  bonus: parseInt(event.target.value),
                })
              }
            />
            <InputModal
              title="Outro:"
              type="number"
              placeholder="Ex: 5"
              onChange={(event) =>
                setNewSkill({
                  ...newSkill,
                  other: parseInt(event.target.value),
                })
              }
            />
            <button
              onClick={() => {
                if (newSkill.skillName === "" || newSkill.trained === "") {
                  notifyError();
                } else {
                  CreateNewSkills();
                }
              }}
              className="bg-red-1000 hover:bg-red-600 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
            >
              Criar
            </button>
          </div>
        </div>
      </ModalMedium>

      <ModalMedium isOpen={isOpenModalEdit} onClose={handleCloseModalEdit}>
        <div className="w-full h-full flex flex-col gap-2">
          <Title>Editar Perícia</Title>
          <div className="w-full h-full px-5 flex flex-col justify-between">
            <SelectModal
              title="Perícia:"
              options={skillsArray}
              value={dataEditSkill.skillName}
              onChange={(event) =>
                setDataEditSkill({
                  ...dataEditSkill,
                  skillName: event.target.value,
                })
              }
            />
            <SelectModal
              title="Treinado?"
              options={trainded}
              value={dataEditSkill.trained}
              onChange={(event) =>
                setDataEditSkill({
                  ...dataEditSkill,
                  trained: event.target.value,
                })
              }
            />
            <InputModal
              title="Bônus:"
              type="number"
              placeholder="Ex:5"
              value={dataEditSkill.bonus}
              onChange={(event) =>
                setDataEditSkill({
                  ...dataEditSkill,
                  bonus: parseInt(event.target.value),
                })
              }
            />
            <InputModal
              title="Outro:"
              type="number"
              placeholder="Ex: 5"
              value={dataEditSkill.other}
              onChange={(event) =>
                setDataEditSkill({
                  ...dataEditSkill,
                  other: parseInt(event.target.value),
                })
              }
            />
            <div className="w-full flex justify-around">
              <button
                onClick={EditSkill}
                className="bg-green-600 hover:bg-green-500 w-[40%] font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
              >
                Salvar
              </button>
              <button
                onClick={DeleteSkill}
                className="bg-red-1000 hover:bg-red-600 w-[40%] font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
              >
                Deletar
              </button>
            </div>
          </div>
        </div>
      </ModalMedium>

      <ModalSmall
        isOpen={isOpenModalRollSkill}
        onClose={handleCloseModalRollSkill}
      >
        <div className="w-full h-full flex flex-col items-center justify-between">
          <div className="h-[20%] w-full flex items-center justify-center font-bold text-2xl border-b-[1px] border-white">
            Rolagem de Perícia
          </div>
          {!show && (
            <div className="h-[80%] flex items-center">
              <div className="w-5 h-5 rounded-full bg-white animate-ping" />
            </div>
          )}
          {show && (
            <div className="h-[80%] flex items-center">
              <RollPeri skill={skillData} />
            </div>
          )}
        </div>
      </ModalSmall>

      <BoxLarge>
        <TitleCreate>
          <div className="w-[67px]" />
          <p>PERÍCIAS</p>
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
              onClick={() => setIsEditSkill(!isEditSkill)}
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
        <div className="h-[642px] w-full py-2 overflow-y-scroll scrollbar">
          <div className="flex flex-wrap gap-4">
            {skills !== null &&
              skills.arraySkills.map((data, index: number) => {
                return (
                  <div
                    className={
                      isEditSkill
                        ? "cursor-pointer w-[320px] h-[112px] flex flex-col justify-center items-center border bg-zinc-900 border-zinc-900 rounded animate-pulse"
                        : "cursor-pointer w-[320px] h-[112px] flex flex-col justify-center items-center border border-zinc-900 rounded"
                    }
                    key={index}
                    onClick={() => {
                      if (isEditSkill === true) {
                        handleOpenModalEdit();
                        setDataEditSkill(data);
                        setIndexEdit(index);
                      } else {
                        handleOpenModalRollSkill();
                        handleClick();
                        setSkillData(data);
                      }
                    }}
                  >
                    {iconMap[data.skillName]}
                    <p>{data.skillName}</p>
                    <p>{data.trained}</p>
                  </div>
                );
              })}
          </div>
        </div>
      </BoxLarge>
    </>
  );
}
