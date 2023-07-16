import { TitleCreate } from "../../others/TitleCreate";
import { useState, useEffect } from "react";
import { db } from "../../../auth/Config";
import { useParams } from "react-router-dom";
import { RxDoubleArrowDown, RxDoubleArrowUp } from "react-icons/rx";
import { IInitiative } from "../../../types/Type";
import { ButtonTrash } from "../../others/ButtonTrash";

export function Iniciative() {
  const { uid } = useParams<{ uid: string }>();
  const [initiatives, setInitiatives] = useState<Array<IInitiative>>([]);

  useEffect(() => {
    getDocInitiative();
  }, []);

  async function getDocInitiative() {
    const { docs } = await db
      .collection("sections")
      .where("uid", "==", uid)
      .get();
    const initiativesData = docs.flatMap((doc) => doc.data().initiative);
    setInitiatives(initiativesData);
  }

  async function createInitiative() {
    const newInitiative = {
      name: "Jogador",
      initiative: 0,
    };

    const newArray = [...initiatives, newInitiative];

    await db.collection("sections").doc(uid).set(
      {
        initiative: newArray,
      },
      { merge: true }
    );
    getDocInitiative();
  }

  async function deletedInitiative(index: number) {
    const newArray = [...(initiatives ?? [])];
    newArray.splice(index, 1);
    await db.collection("sections").doc(uid).set(
      {
        initiative: newArray,
      },
      { merge: true }
    );
    getDocInitiative();
  }

  const handleMoveUp = async (index: number) => {
    if (index === 0) return;
    const newInitiatives = [...initiatives];
    [newInitiatives[index], newInitiatives[index - 1]] = [
      newInitiatives[index - 1],
      newInitiatives[index],
    ];
    await db.collection("sections").doc(uid).set(
      {
        initiative: newInitiatives,
      },
      { merge: true }
    );
    setInitiatives(newInitiatives);
  };

  const handleMoveDown = async (index: number) => {
    if (index === initiatives.length - 1) return;
    const newInitiatives = [...initiatives];
    [newInitiatives[index], newInitiatives[index + 1]] = [
      newInitiatives[index + 1],
      newInitiatives[index],
    ];
    await db.collection("sections").doc(uid).set(
      {
        initiative: newInitiatives,
      },
      { merge: true }
    );
    setInitiatives(newInitiatives);
  };

  const handleInputName = async (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const updatedInitiatives = [...initiatives];
    updatedInitiatives[index].name = event.target.value;
    setInitiatives(updatedInitiatives);
    await db.collection("sections").doc(uid).set(
      {
        initiative: updatedInitiatives,
      },
      { merge: true }
    );
  };

  const handleInputInitiative = async (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const updatedInitiatives = [...initiatives];
    updatedInitiatives[index].initiative = parseInt(event.target.value);
    setInitiatives(updatedInitiatives);
    await db.collection("sections").doc(uid).set(
      {
        initiative: updatedInitiatives,
      },
      { merge: true }
    );
  };

  return (
    <div
      className="w-[910px] h-[620px] border border-zinc-800 rounded px-2
    xl:w-[610px]
    2xl:w-[906px]
    "
    >
      <TitleCreate>
        <div className="w-[67px]" />
        <p>INICIATIVA</p>
        <div className="flex w-[67px] justify-end">
          <div
            className="w-[28px] h-[28px] border rounded cursor-pointer"
            onClick={createInitiative}
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
      <div className="w-full h-full flex flex-col gap-2 pt-2">
        {initiatives.map((initiative, index: number) => {
          return (
            <div
              key={index}
              className="flex bg-zinc-700 justify-between px-4 rounded items-center"
            >
              <button
                className="w-[20px] flex items-center justify-center rounded hover:border"
                onClick={() => handleMoveUp(index)}
              >
                <RxDoubleArrowUp />
              </button>
              <p className="w-[150px] text-center">{index + 1}</p>
              <input
                type="text"
                value={initiative.name}
                onChange={(event) => handleInputName(event, index)}
                className="bg-transparent w-[150px] text-center"
              />
              <input
                type="number"
                value={initiative.initiative}
                onChange={(event) => handleInputInitiative(event, index)}
                className="bg-transparent w-[150px] text-center"
              />
              <button
                className="w-[20px] flex items-center justify-center rounded hover:border"
                onClick={() => handleMoveDown(index)}
              >
                <RxDoubleArrowDown />
              </button>
              <ButtonTrash onClick={() => deletedInitiative(index)} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
