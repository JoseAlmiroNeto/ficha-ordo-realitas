import { useParams } from "react-router-dom";
import { db } from "../../../auth/Config";
import { ModalLarge, ModalMedium, ModalSmall } from "../../modal/Modal";
import { InputModal } from "../../others/InputModal";
import { Title } from "../../others/Title";
import { TitleCreate } from "../../others/TitleCreate";
import { useState, useEffect, ChangeEvent } from "react";
import { DisplayState, ICreatures } from "../../../types/Type";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BarStatusSection } from "../../others/BarStatusSection";
import { skillsArray, trainded } from "../../others/DataBase";
import { SelectModal } from "../../others/SelectModal";

export function Creatures() {
  const { uid } = useParams<{ uid: string }>();
  const [creatures, setCreatures] = useState<ICreatures[]>([]);
  const [activeTabs, setActiveTabs] = useState<Array<number>>([]);
  const [show, setShow] = useState(false);
  const [display, setDisplay] = useState<DisplayState>({});
  const [indexCreature, setIndexCreature] = useState(0);
  const [creatureData, setCreatureData] = useState<ICreatures>();
  const [attriRoll, setAttriRoll] = useState(0);
  const [totalityDamage, setTotalityDamage] = useState({
    rollValue: [0],
    sumAttack: 0,
    dices: "",
  });
  const [newAttack, setNewAttack] = useState({
    name: "",
    type: "",
    reach: "",
    damage: "",
    valueTest: "",
  });
  const [newCreature, setNewCreature] = useState({
    name: "",
    description: "",
    defeat: 0,
    attributes: {
      agility: 0,
      energy: 0,
      force: 0,
      intelligence: 0,
      presence: 0,
    },
    status: {
      currentLife: 0,
      maximumLife: 0,
      displacement: "",
    },
    skills: [],
    damages: [],
    ability: [],
  });
  const [resistance, setResistance] = useState([
    { name: "Energia", value: 0 },
    { name: "Morte", value: 0 },
    { name: "Sangue", value: 0 },
    { name: "Física", value: 0 },
    { name: "Balística", value: 0 },
    { name: "Mental", value: 0 },
  ]);
  const [newSkill, setNewSkill] = useState({
    skillName: "",
    keyAttribute: "",
    trained: "",
    trainedValue: 0,
  });
  const [skillData, setSkillData] = useState({
    skillName: "",
    keyAttribute: "",
    trained: "",
    trainedValue: 0,
  });

  const notifyCreatureAdd = () => toast.success("Criatura criada com sucesso!");
  const notifyAttackAdd = () => toast.success("Ataque criado com sucesso!");
  const notifySucsses = () => toast.success("Perícia criado com sucesso!");
  const notifyError = () =>
    toast.error("Preencha todas as informações necessarias corretamente!");

  useEffect(() => {
    getCreatureData();
  }, []);

  useEffect(() => {
    setActiveTabs(Array(creatures.length).fill(0));
  }, [creatures]);

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
    isOpen: isOpenModalNewCreature,
    handleOpenModal: handleOpenModalNewCreature,
    handleCloseModal: handleCloseModalNewCreature,
  } = useModal(false);
  const {
    isOpen: isOpenModalRollAttack,
    handleOpenModal: handleOpenModalRollAttack,
    handleCloseModal: handleCloseModalRollAttack,
  } = useModal(false);
  const {
    isOpen: isOpenModalCreateAttack,
    handleOpenModal: handleOpenModalCreateAttack,
    handleCloseModal: handleCloseModalCreateAttack,
  } = useModal(false);
  const {
    isOpen: isOpenModalCreateSkill,
    handleOpenModal: handleOpenModalCreateSkill,
    handleCloseModal: handleCloseModalCreateSkill,
  } = useModal(false);
  const {
    isOpen: isOpenModalRollSkill,
    handleOpenModal: handleOpenModalRollSkill,
    handleCloseModal: handleCloseModalRollSkill,
  } = useModal(false);
  const {
    isOpen: isOpenModalRollAttribute,
    handleOpenModal: handleOpenModalRollAttribute,
    handleCloseModal: handleCloseModalRollAttribute,
  } = useModal(false);

  const handleClick = () => {
    setShow(false);
    setTimeout(() => {
      setShow(true);
    }, 2000);
  };

  const toggleDisplay = (index: number) => {
    setDisplay({
      ...display,
      [index]: !display[index],
    });
  };

  async function getCreatureData() {
    const { docs } = await db
      .collection("sections")
      .where("uid", "==", uid)
      .get();
    const creaturesArray = docs.flatMap((doc) => doc.data().creatures);
    setCreatures(creaturesArray);
  }

  const handleInputChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newResistance = [...resistance];
    newResistance[index].value = Number(event.target.value);
    setResistance(newResistance);
  };

  function setActiveTab(tabIndex: number, creatureIndex: number) {
    setActiveTabs((prevTabs) => {
      const newTabs = [...prevTabs];
      newTabs[creatureIndex] = tabIndex;
      return newTabs;
    });
  }

  async function updateCurrentLifeBar(index: number, newCurrentLife: number) {
    const newCreatures = creatures.map((creature, i) => {
      if (i === index) {
        return {
          ...creature,
          status: {
            ...creature.status,
            currentLife: newCurrentLife,
          },
        };
      } else {
        return creature;
      }
    });

    db.collection("sections").doc(uid).set(
      {
        creatures: newCreatures,
      },
      { merge: true }
    );
    getCreatureData();
  }

  async function updateMaximumLifeBar(index: number, newMaximumLife: number) {
    const newCreatures = creatures.map((creature, i) => {
      if (i === index) {
        return {
          ...creature,
          status: {
            ...creature.status,
            maximumLife: newMaximumLife,
          },
        };
      } else {
        return creature;
      }
    });

    db.collection("sections").doc(uid).set(
      {
        creatures: newCreatures,
      },
      { merge: true }
    );
    getCreatureData();
  }

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

  async function addNewCreature() {
    const resistances = [...resistance];
    const newObjCreature = { ...newCreature, resistances };
    const newArray = [...creatures, newObjCreature];
    await db.collection("sections").doc(uid).set(
      {
        creatures: newArray,
      },
      { merge: true }
    );
    getCreatureData();
    handleCloseModalNewCreature();
    notifyCreatureAdd();
  }

  async function addNewAttackCreature() {
    creatures[indexCreature].damages.push(newAttack);
    await db.collection("sections").doc(uid).set(
      {
        creatures: creatures,
      },
      { merge: true }
    );
    getCreatureData();
    handleCloseModalCreateAttack();
    notifyAttackAdd();
  }

  async function CreateNewSkills() {
    creatures[indexCreature].skills.push(newSkill);
    await db.collection("sections").doc(uid).set(
      {
        creatures: creatures,
      },
      { merge: true }
    );
    getCreatureData();
    handleCloseModalCreateSkill();
    notifySucsses();
    setNewSkill({
      skillName: "",
      keyAttribute: "",
      trained: "",
      trainedValue: 0,
    });
  }

  function RollAttack(damage: string) {
    let sum: number[] = [];
    const diceArray = damage.split("+");
    diceArray.forEach((value) => {
      if (value.includes("d")) {
        const roll = parseInt(value.split("d")[0]);
        const dado = parseInt(value.split("d")[1]);
        sum.push(
          ...Array(roll)
            .fill(0)
            .map(() => Math.floor(Math.random() * dado + 1))
        );
      } else {
        const Int = parseInt(value);
        sum.push(Int);
      }
    });
    setTotalityDamage({
      ...totalityDamage,
      rollValue: sum,
      sumAttack: sum.reduce(
        (acctualValue, currentValue) => acctualValue + currentValue,
        0
      ),
      dices: damage,
    });
  }

  function RollPeri() {
    const skillKey = skillData.keyAttribute;
    const keyAttribute =
      creatureData?.attributes[
        skillKey as keyof (typeof creatureData)["attributes"]
      ];

    if (typeof keyAttribute !== "undefined") {
      const valueD20 = Array.from({ length: +keyAttribute ?? 0 }, () =>
        Math.floor(Math.random() * 20 + 1)
      );
      const maxValue = Math.max(...valueD20);
      const result = maxValue + skillData.trainedValue;

      return (
        <div className="flex flex-col items-center justify-center gap-5">
          <p className="text-xl font-bold">{skillData.skillName}</p>
          <div>
            {`${keyAttribute}d20(${maxValue}) + ${
              skillData.trained.split("(")[0]
            }(${skillData.trainedValue})`}
          </div>
          <div className="text-3xl font-bold">{result}</div>
        </div>
      );
    } else {
      return null;
    }
  }

  function RollAttribute() {
    if (typeof attriRoll !== "undefined") {
      const valueD20 = Array.from({ length: +attriRoll ?? 0 }, () =>
        Math.floor(Math.random() * 20 + 1)
      );
      const maxValue = Math.max(...valueD20);

      return (
        <div className="flex flex-col items-center justify-center gap-5">
          <div>{`${attriRoll}d20(${valueD20})`}</div>
          <div className="text-3xl font-bold">{maxValue}</div>
        </div>
      );
    } else {
      return null;
    }
  }

  return (
    <>
      <ModalLarge
        isOpen={isOpenModalNewCreature}
        onClose={handleCloseModalNewCreature}
      >
        <div className="w-full h-full flex flex-col gap-2">
          <Title>Criar Criatura</Title>
          <div className="w-full h-full px-5 flex flex-col justify-between">
            <InputModal
              type="text"
              title="Nome da criatura:"
              placeholder="Ex: Sucal"
              onChange={(event) =>
                setNewCreature({ ...newCreature, name: event.target.value })
              }
            />
            <div>
              <h2 className="font-bold">Atributos:</h2>
              <div className="flex gap-2">
                <InputModal
                  type="number"
                  title="AGI:"
                  placeholder="Ex: 2"
                  onChange={(event) =>
                    setNewCreature({
                      ...newCreature,
                      attributes: {
                        ...newCreature.attributes,
                        agility: parseInt(event.target.value),
                      },
                    })
                  }
                />
                <InputModal
                  type="number"
                  title="FOR:"
                  placeholder="Ex: 5"
                  onChange={(event) =>
                    setNewCreature({
                      ...newCreature,
                      attributes: {
                        ...newCreature.attributes,
                        force: parseInt(event.target.value),
                      },
                    })
                  }
                />
                <InputModal
                  type="number"
                  title="INT:"
                  placeholder="Ex: 3"
                  onChange={(event) =>
                    setNewCreature({
                      ...newCreature,
                      attributes: {
                        ...newCreature.attributes,
                        intelligence: parseInt(event.target.value),
                      },
                    })
                  }
                />
                <InputModal
                  type="number"
                  title="PRE:"
                  placeholder="Ex: 1"
                  onChange={(event) =>
                    setNewCreature({
                      ...newCreature,
                      attributes: {
                        ...newCreature.attributes,
                        presence: parseInt(event.target.value),
                      },
                    })
                  }
                />
                <InputModal
                  type="number"
                  title="VIG:"
                  placeholder="Ex: 2"
                  onChange={(event) =>
                    setNewCreature({
                      ...newCreature,
                      attributes: {
                        ...newCreature.attributes,
                        energy: parseInt(event.target.value),
                      },
                    })
                  }
                />
              </div>
            </div>
            <div>
              <h2 className="font-bold">Status:</h2>
              <div className="flex gap-2">
                <InputModal
                  type="number"
                  title="Vida:"
                  placeholder="Ex: 22"
                  onChange={(event) =>
                    setNewCreature({
                      ...newCreature,
                      status: {
                        ...newCreature.status,
                        currentLife: parseInt(event.target.value),
                        maximumLife: parseInt(event.target.value),
                      },
                    })
                  }
                />
                <InputModal
                  type="number"
                  title="Defesa:"
                  placeholder="Ex: 7"
                  onChange={(event) =>
                    setNewCreature({
                      ...newCreature,
                      defeat: parseInt(event.target.value),
                    })
                  }
                />
                <InputModal
                  type="text"
                  title="Deslocamento:"
                  placeholder="Ex: 9m"
                  onChange={(event) =>
                    setNewCreature({
                      ...newCreature,
                      status: {
                        ...newCreature.status,
                        displacement: event.target.value,
                      },
                    })
                  }
                />
              </div>
            </div>
            <div>
              <h2 className="font-bold">Resistências:</h2>
              <div className="flex gap-2">
                {resistance.map((item, index) => (
                  <div key={index}>
                    <InputModal
                      type="number"
                      title={item.name}
                      placeholder="Ex: 12"
                      onChange={(event) => handleInputChange(index, event)}
                    />
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h2 className="font-bold">Detalhes:</h2>
              <textarea
                className="w-full bg-transparent border-b border-zinc-800 pl-2"
                rows={8}
                onChange={(event) =>
                  setNewCreature({
                    ...newCreature,
                    description: event.target.value,
                  })
                }
              />
            </div>
            <button
              onClick={addNewCreature}
              className="bg-red-1000 hover:bg-red-600 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
            >
              Criar
            </button>
          </div>
        </div>
      </ModalLarge>

      <ModalSmall
        isOpen={isOpenModalRollAttack}
        onClose={handleCloseModalRollAttack}
      >
        <div className="w-full h-full flex flex-col gap-2">
          <Title>Rolagem</Title>
          <div className="w-full h-full px-5 flex items-center justify-center">
            {!show && (
              <div className="h-[80%] flex items-center">
                <div className="w-5 h-5 rounded-full bg-white animate-ping" />
              </div>
            )}
            {show && (
              <div className="flex flex-col items-center justify-center gap-4">
                <strong>{totalityDamage.dices}</strong>
                <div className="flex gap-1">
                  (
                  {totalityDamage.rollValue.map((value, index: number) => {
                    return (
                      <strong className="text-xl" key={index}>
                        {value}
                        {index !== totalityDamage.rollValue.length - 1 && "+"}
                      </strong>
                    );
                  })}
                  )
                </div>
                <p className="text-5xl">{totalityDamage.sumAttack}</p>
              </div>
            )}
          </div>
        </div>
      </ModalSmall>

      <ModalMedium
        isOpen={isOpenModalCreateAttack}
        onClose={handleCloseModalCreateAttack}
      >
        <div className="w-full h-full flex flex-col gap-2">
          <Title>Criar ataque</Title>
          <div className="w-full h-full px-5 flex items-center justify-center">
            <div className="w-full h-full px-5 flex flex-col justify-between">
              <InputModal
                type="text"
                title="Nome do ataque:"
                placeholder="Ex: Agarrão"
                onChange={(event) =>
                  setNewAttack({ ...newAttack, name: event.target.value })
                }
              />
              <InputModal
                type="text"
                title="Distancia:"
                placeholder="Ex: 18m"
                onChange={(event) =>
                  setNewAttack({ ...newAttack, reach: event.target.value })
                }
              />
              <InputModal
                type="text"
                title="Tipo de dano:"
                placeholder="Ex: sangue"
                onChange={(event) =>
                  setNewAttack({ ...newAttack, type: event.target.value })
                }
              />
              <InputModal
                type="text"
                title="Teste de ataque:"
                placeholder="Ex: 2d8+4"
                onChange={(event) =>
                  setNewAttack({ ...newAttack, valueTest: event.target.value })
                }
              />
              <InputModal
                type="text"
                title="Dano:"
                placeholder="Ex: 2d4+6"
                onChange={(event) =>
                  setNewAttack({ ...newAttack, damage: event.target.value })
                }
              />
              <button
                onClick={addNewAttackCreature}
                className="bg-red-1000 hover:bg-red-600 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
              >
                Criar
              </button>
            </div>
          </div>
        </div>
      </ModalMedium>

      <ModalSmall
        isOpen={isOpenModalCreateSkill}
        onClose={handleCloseModalCreateSkill}
      >
        <div className="w-full h-full flex flex-col gap-2">
          <Title>Adicionar Perícia</Title>
          <div className="w-full h-full px-5 flex flex-col justify-between">
            <SelectModal
              title="Perícia:"
              options={skillsArray}
              value={newSkill.skillName}
              onChange={handleChangeSkillName}
            />
            <SelectModal
              title="Treinado:"
              options={trainded}
              value={newSkill.trained}
              onChange={handleChangeTrained}
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
      </ModalSmall>

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
              <RollPeri />
            </div>
          )}
        </div>
      </ModalSmall>

      <ModalSmall
        isOpen={isOpenModalRollAttribute}
        onClose={handleCloseModalRollAttribute}
      >
        <div className="w-full h-full flex flex-col items-center justify-between">
          <div className="h-[20%] w-full flex items-center justify-center font-bold text-2xl border-b-[1px] border-white">
            Rolagem de Atributo
          </div>
          {!show && (
            <div className="h-[80%] flex items-center">
              <div className="w-5 h-5 rounded-full bg-white animate-ping" />
            </div>
          )}
          {show && (
            <div className="h-[80%] flex items-center">
              <RollAttribute />
            </div>
          )}
        </div>
      </ModalSmall>

      <div className="w-[910px] h-[620px] border border-zinc-800 rounded px-2 xl:w-[610px] 2xl:w-[906px]">
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
        <TitleCreate>
          <div className="w-[67px]" />
          <p>CRIATURAS</p>
          <div className="flex w-[67px] justify-end">
            <div
              className="w-[28px] h-[28px] border rounded cursor-pointer"
              onClick={handleOpenModalNewCreature}
            >
              <lord-icon
                src="https://cdn.lordicon.com/mrdiiocb.json"
                trigger="hover"
                colors="primary:#ffffff"
                style={{ width: "18px", height: "18px" }}
              />
            </div>
          </div>
        </TitleCreate>
        <div className="flex flex-wrap w-full h-[92%] gap-3 overflow-y-scroll scrollbar pt-4">
          {creatures.map((dataCreature, index: number) => {
            const activeTab = activeTabs[index];
            let component;
            switch (activeTab) {
              case 0:
                component = (
                  <div className="flex flex-col justify-around w-full h-[70%]">
                    <div className="flex flex-col items-center">
                      <h2 className="font-semibold">Atributos</h2>
                      <div className="flex w-full justify-center gap-1">
                        <button
                          className="bg-zinc-800 rounded py-1 px-2 w-16"
                          onClick={() => {
                            handleClick();
                            handleOpenModalRollAttribute();
                            setAttriRoll(dataCreature.attributes.force);
                          }}
                        >
                          FOR:{dataCreature.attributes.force}
                        </button>
                        <button
                          className="bg-zinc-800 rounded py-1 px-2 w-16"
                          onClick={() => {
                            handleClick();
                            handleOpenModalRollAttribute();
                            setAttriRoll(dataCreature.attributes.agility);
                          }}
                        >
                          AGI:{dataCreature.attributes.agility}
                        </button>
                        <button
                          className="bg-zinc-800 rounded py-1 px-2 w-16"
                          onClick={() => {
                            handleClick();
                            handleOpenModalRollAttribute();
                            setAttriRoll(dataCreature.attributes.intelligence);
                          }}
                        >
                          INT:{dataCreature.attributes.intelligence}
                        </button>
                        <button
                          className="bg-zinc-800 rounded py-1 px-2 w-16"
                          onClick={() => {
                            handleClick();
                            handleOpenModalRollAttribute();
                            setAttriRoll(dataCreature.attributes.presence);
                          }}
                        >
                          PRE:{dataCreature.attributes.presence}
                        </button>
                        <button
                          className="bg-zinc-800 rounded py-1 px-2 w-16"
                          onClick={() => {
                            handleClick();
                            handleOpenModalRollAttribute();
                            setAttriRoll(dataCreature.attributes.energy);
                          }}
                        >
                          VIG:{dataCreature.attributes.energy}
                        </button>
                      </div>
                    </div>
                    <div className="flex flex-col items-center px-4">
                      <h2>Vida</h2>
                      <BarStatusSection
                        currentValue={dataCreature.status.currentLife}
                        maximumValue={dataCreature.status.maximumLife}
                        onChangeCurrent={(event) =>
                          updateCurrentLifeBar(
                            index,
                            parseInt(event.target.value)
                          )
                        }
                        onChangeMaximum={(event) =>
                          updateMaximumLifeBar(
                            index,
                            parseInt(event.target.value)
                          )
                        }
                      />
                    </div>
                  </div>
                );
                break;
              case 1:
                component = (
                  <div className="flex flex-col justify-around w-full h-[70%] px-8">
                    <div className="flex flex-col items-center">
                      <h2>Defesa</h2>
                      <strong>{dataCreature.defeat}</strong>
                    </div>
                    <div className="flex flex-col items-center">
                      <h2>Resistências</h2>
                      <div className="flex flex-wrap gap-2 justify-center">
                        {dataCreature.resistances.map((resi, index: number) => {
                          let BG_COLOR = "";
                          if (resi.name === "Energia") {
                            BG_COLOR =
                              "radial-gradient(circle, rgba(53,0,134,1) 0%, rgba(11,0,31,1) 100%)";
                          } else if (resi.name === "Morte") {
                            BG_COLOR =
                              "linear-gradient(45deg, #333333, #660000, #222222)";
                          } else if (resi.name === "Sangue") {
                            BG_COLOR =
                              "linear-gradient(180deg, rgba(205,0,0,1) 0%, rgba(134,0,0,1) 48%, rgba(59,0,0,1) 100%)";
                          } else if (resi.name === "Física") {
                            BG_COLOR =
                              "linear-gradient(to right, #3d3d3d, #575757, #7c7c7c)";
                          } else if (resi.name === "Balística") {
                            BG_COLOR =
                              "linear-gradient(to bottom, #2f343d, #3c414d, #4a4f5e, #59606f, #687181)";
                          } else if (resi.name === "Mental") {
                            BG_COLOR =
                              "linear-gradient(135deg, #283048 0%, #9ECEFF 100%)";
                          }

                          return (
                            <div
                              key={index}
                              className="rounded px-2 py-1 w-28 text-center"
                              style={{ background: `${BG_COLOR}` }}
                            >
                              {resi.name}: {resi.value}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                );
                break;
              case 2:
                component = (
                  <div className="flex flex-col justify-around w-full h-[72%] relative">
                    <button
                      className="w-[20px] h-[20px] flex items-center justify-center border rounded cursor-pointer absolute right-0 top-0 m-1"
                      onClick={() => {
                        handleOpenModalCreateSkill();
                        setIndexCreature(index);
                      }}
                    >
                      <lord-icon
                        src="https://cdn.lordicon.com/mrdiiocb.json"
                        trigger="hover"
                        colors="primary:#ffffff"
                        style={{ width: "14px", height: "14px" }}
                      />
                    </button>
                    <div className="w-full h-full py-8 px-4 flex flex-wrap">
                      {dataCreature.skills.map((skillData, index: number) => {
                        return (
                          <p
                            key={index}
                            className="px-2 py-1 bg-zinc-800 rounded w-28 h-7 text-center cursor-pointer"
                            onClick={() => {
                              handleOpenModalRollSkill();
                              handleClick();
                              setCreatureData(dataCreature);
                              setSkillData(skillData);
                            }}
                          >
                            {skillData.skillName.split("(")[0]}(+
                            {skillData.trainedValue})
                          </p>
                        );
                      })}
                    </div>
                  </div>
                );
                break;
              case 3:
                component = (
                  <div className="w-full h-[76%] flex p-1">
                    <div className="w-[50%] h-full border-r relative">
                      <button
                        className="w-[20px] h-[20px] flex items-center justify-center border rounded cursor-pointer absolute right-0 top-0 m-1"
                        onClick={() => {
                          handleOpenModalCreateAttack();
                          setIndexCreature(index);
                        }}
                      >
                        <lord-icon
                          src="https://cdn.lordicon.com/mrdiiocb.json"
                          trigger="hover"
                          colors="primary:#ffffff"
                          style={{ width: "14px", height: "14px" }}
                        />
                      </button>
                      <div className="mt-5 h-[85%] flex flex-col gap-2 overflow-y-scroll scrollbar">
                        {dataCreature.damages.map((attack, index: number) => {
                          return (
                            <div
                              key={index}
                              className="border-b-2 border-zinc-700"
                            >
                              <div className="flex gap-2">
                                <strong
                                  onClick={() => toggleDisplay(index)}
                                  className="cursor-pointer"
                                >
                                  {attack.name}
                                </strong>
                                <span>{attack.reach}</span>
                              </div>
                              {display[index] && (
                                <div className="flex gap-2">
                                  <div className="flex gap-1">
                                    <button
                                      className="font-semibold hover:text-red-400"
                                      onClick={() => {
                                        RollAttack(attack.valueTest);
                                        handleOpenModalRollAttack();
                                        handleClick();
                                      }}
                                    >
                                      Teste
                                    </button>
                                    {attack.valueTest}
                                  </div>
                                  |
                                  <div className="flex gap-1">
                                    <button
                                      className="font-semibold hover:text-red-400"
                                      onClick={() => {
                                        RollAttack(attack.damage);
                                        handleOpenModalRollAttack();
                                        handleClick();
                                      }}
                                    >
                                      Dano
                                    </button>
                                    {attack.damage}
                                  </div>
                                </div>
                              )}
                              {/* <div className="flex gap-2">
                                <div className="flex gap-1">
                                  <button
                                    className="font-semibold hover:text-red-400"
                                    onClick={() => {
                                      RollAttack(attack.valueTest);
                                      handleOpenModalRollAttack();
                                      handleClick();
                                    }}
                                  >
                                    Teste
                                  </button>
                                  {attack.valueTest}
                                </div>
                                |
                                <div className="flex gap-1">
                                  <button
                                    className="font-semibold hover:text-red-400"
                                    onClick={() => {
                                      RollAttack(attack.damage);
                                      handleOpenModalRollAttack();
                                      handleClick();
                                    }}
                                  >
                                    Dano
                                  </button>
                                  {attack.damage}
                                </div>
                              </div> */}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                    <div className="w-[50%] h-full border-l relative">
                      <div
                        className="w-[20px] h-[20px] flex items-center justify-center border rounded cursor-pointer absolute right-0 top-0 m-1"
                        onClick={handleOpenModalNewCreature}
                      >
                        <lord-icon
                          src="https://cdn.lordicon.com/mrdiiocb.json"
                          trigger="hover"
                          colors="primary:#ffffff"
                          style={{ width: "14px", height: "14px" }}
                        />
                      </div>
                    </div>
                  </div>
                );
                break;
              case 4:
                component = (
                  <div className="w-full h-[70%] overflow-y-scroll scrollbar p-4">
                    <p className="h-full">{dataCreature.description}</p>
                  </div>
                );
                break;
              default:
                break;
            }
            return (
              <div key={index} className="w-[430px] h-60 bg-zinc-900 rounded">
                <h2 className="text-center bg-zinc-800 rounded-t text-xl">
                  {dataCreature.name}
                </h2>
                <nav className="w-full h-8 flex justify-evenly border-b">
                  <button
                    onClick={() => setActiveTab(0, index)}
                    className={
                      activeTabs[index] === 0
                        ? "px-2 border-t border-x rounded-t w-20"
                        : "px-2 w-20"
                    }
                  >
                    Status
                  </button>
                  <button
                    onClick={() => setActiveTab(1, index)}
                    className={
                      activeTabs[index] === 1
                        ? "px-2 border-t border-x rounded-t w-20"
                        : "px-2 w-20"
                    }
                  >
                    Defesa
                  </button>
                  <button
                    onClick={() => setActiveTab(2, index)}
                    className={
                      activeTabs[index] === 2
                        ? "px-2 border-t border-x rounded-t w-20"
                        : "px-2 w-20"
                    }
                  >
                    Perícias
                  </button>
                  <button
                    onClick={() => setActiveTab(3, index)}
                    className={
                      activeTabs[index] === 3
                        ? "px-2 border-t border-x rounded-t w-20"
                        : "px-2 w-20"
                    }
                  >
                    Ataques
                  </button>
                  <button
                    onClick={() => setActiveTab(4, index)}
                    className={
                      activeTabs[index] === 4
                        ? "px-2 border-t border-x rounded-t w-20"
                        : "px-2 w-20"
                    }
                  >
                    Outros
                  </button>
                </nav>
                <div className="w-full h-full">{component}</div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
