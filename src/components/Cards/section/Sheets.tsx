import { useParams } from "react-router-dom";
import { TitleCreate } from "../../others/TitleCreate";
import { db } from "../../../auth/Config";
import { useState, useEffect } from "react";
import { IRecord, ISheetsArray, ISkills } from "../../../types/Type";
import UserPhoto from "../../../assets/userPhoto.webp";
import { ModalSmall } from "../../modal/Modal";
import { Title } from "../../others/Title";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function Sheets() {
  const { uid } = useParams<{ uid: string }>();
  const [sheetPlayers, setSheetPlayers] = useState<string[]>([]);
  const [sheetsArray, setSheetsArray] = useState<ISheetsArray[]>([]);
  const [activeTabs, setActiveTabs] = useState<Array<number>>([]);
  const [newPlayer, setNewPlayer] = useState("");

  const notify = () => toast.success("Player Adicionado com Sucesso!");

  useEffect(() => {
    getPlayerData();
  }, []);

  useEffect(() => {
    if (sheetPlayers) {
      searchPlayerData();
    }
  }, [sheetPlayers]);

  useEffect(() => {
    const interval = setInterval(() => {
      getPlayerData();
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setActiveTabs(Array(sheetsArray.length).fill(0));
  }, [sheetsArray]);

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
    isOpen: isOpenModalAddPlayer,
    handleOpenModal: handleOpenModalAddPlayer,
    handleCloseModal: handleCloseModalAddPlayer,
  } = useModal(false);

  async function getPlayerData() {
    const { docs } = await db
      .collection("sections")
      .where("uid", "==", uid)
      .get();
    const uidPlayersData = docs.flatMap((doc) => doc.data().players);
    setSheetPlayers(uidPlayersData);
  }

  const searchPlayerData = async () => {
    const recordsData: IRecord[] = [];
    const skillsData: ISkills[] = [];

    for (const uid of sheetPlayers) {
      const { docs } = await db
        .collection("record")
        .where("uid", "==", uid)
        .get();
      if (docs.length === 0) {
      } else {
        recordsData.push(docs[0].data() as IRecord);
      }
    }

    for (const uid of sheetPlayers) {
      const { docs } = await db
        .collection("skills")
        .where("uid", "==", uid)
        .get();
      if (docs.length === 0) {
      } else {
        skillsData.push(docs[0].data() as ISkills);
      }
    }

    const combinedArray = recordsData.reduce((acc: ISheetsArray[], curr) => {
      const matchingObj = skillsData.find((obj) => obj.uid === curr.uid);
      const sheetData: ISheetsArray = {
        ...curr,
        arraySkills: matchingObj?.arraySkills || [],
      };
      return [...acc, sheetData];
    }, []);

    setSheetsArray(combinedArray);
  };

  async function addPlayer() {
    const newArray = [...sheetPlayers, newPlayer];
    await db.collection("sections").doc(uid).set(
      {
        players: newArray,
      },
      { merge: true }
    );
    handleCloseModalAddPlayer();
    getPlayerData();
    notify();
  }

  function setActiveTab(tabIndex: number, creatureIndex: number) {
    setActiveTabs((prevTabs) => {
      const newTabs = [...prevTabs];
      newTabs[creatureIndex] = tabIndex;
      return newTabs;
    });
  }

  return (
    <>
      <ModalSmall
        isOpen={isOpenModalAddPlayer}
        onClose={handleCloseModalAddPlayer}
      >
        <div className="w-full h-full flex flex-col gap-2">
          <Title>Adicionar Player</Title>
          <div className="w-full h-full px-5 flex flex-col items-center justify-center">
            <div className="w-[70%] h-full flex flex-col justify-center">
              <p className="text-[0.8vw]">UID do Player:</p>
              <input
                className="bg-transparent w-full border-b-[2px] border-gray-900 focus:outline-none"
                placeholder="Ex: -NWUnsi39_suUWC397W"
                onChange={(event) => setNewPlayer(event.target.value)}
              />
            </div>
            <button
              onClick={addPlayer}
              className="bg-red-1000 hover:bg-red-600 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
            >
              Adicionar
            </button>
          </div>
        </div>
      </ModalSmall>

      <div
        className="w-[910px] h-[620px] border border-zinc-800 rounded px-2
        xl:w-[610px]
        2xl:w-[906px]
        "
      >
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
          <div className="w-[66px]" />
          <p>FICHAS</p>
          <div className="flex w-[66px] justify-end">
            <div
              className="w-[28px] h-[28px] border rounded cursor-pointer"
              onClick={handleOpenModalAddPlayer}
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
        <div className="w-full h-[92%] flex flex-wrap gap-4 py-2 overflow-y-scroll scrollbar">
          {sheetsArray.map((sheet, index: number) => {
            const activeTab = activeTabs[index];
            let component;

            switch (activeTab) {
              case 0:
                component = (
                  <div className="w-full h-full flex flex-col items-center justify-evenly">
                    <div className="w-[72px] h-[72px] bg-cover bg-center rounded-full">
                      <img
                        src={sheet?.imgUrl ? sheet.imgUrl : UserPhoto}
                        alt="profile photo"
                        className="object-cover object-center w-full h-full rounded-full"
                      />
                    </div>
                    <p>{sheet.PersonalDetails.name}</p>
                    <div className="text-center">
                      <p className="text-red-300">
                        {sheet.Status.currentLife}/{sheet.Status.maximumLife}
                      </p>
                      <p>Vida</p>
                    </div>
                    <div className="text-center">
                      <p className="text-blue-600">
                        {sheet.Status.currentSanity}/
                        {sheet.Status.maximumSanity}
                      </p>
                      <p>Sanidade</p>
                    </div>
                    <div className="text-center">
                      <p className="text-purple-500">
                        {sheet.Status.currentEffort}/
                        {sheet.Status.maximumEffort}
                      </p>
                      <p>P.E</p>
                    </div>
                    <div className="text-center">
                      <p>{sheet.Status.nex}</p>
                      <p>Nex</p>
                    </div>
                  </div>
                );
                break;
              case 1:
                component = (
                  <div className="w-full h-full flex flex-col justify-evenly items-center">
                    <button className="px-2 py-1 rounded bg-zinc-800">
                      Força: <strong>{sheet.Attributes.force}</strong>
                    </button>
                    <button className="px-2 py-1 rounded bg-zinc-800">
                      Agilidade: <strong>{sheet.Attributes.agility}</strong>
                    </button>
                    <button className="px-2 py-1 rounded bg-zinc-800">
                      Inteligencia:{" "}
                      <strong>{sheet.Attributes.intelligence}</strong>
                    </button>
                    <button className="px-2 py-1 rounded bg-zinc-800">
                      Presença: <strong>{sheet.Attributes.presence}</strong>
                    </button>
                    <button className="px-2 py-1 rounded bg-zinc-800">
                      Vigor: <strong>{sheet.Attributes.energy}</strong>
                    </button>
                  </div>
                );
                break;
              case 2:
                component = (
                  <div className="w-full h-full p-2 flex flex-wrap items-center gap-2 overflow-y-scroll scrollbar">
                    {sheet.arraySkills?.map((skill, index: number) => {
                      return (
                        <p
                          key={index}
                          className="px-2 py-1 bg-zinc-800 rounded w-28 h-7 text-center"
                        >
                          {skill.skillName.split("(")[0]}
                        </p>
                      );
                    })}
                  </div>
                );
                break;
              default:
                break;
            }

            return (
              <div
                key={index}
                className="w-[274px] h-[392px] bg-zinc-900 rounded"
              >
                <nav className="w-full h-6 border-b border-zinc-800 rounded flex justify-evenly">
                  <button
                    className={
                      activeTabs[index] === 0
                        ? "w-20 rounded-t-lg bg-zinc-600"
                        : "w-20 rounded-t-lg bg-zinc-800"
                    }
                    onClick={() => setActiveTab(0, index)}
                  >
                    Info
                  </button>
                  <button
                    className={
                      activeTabs[index] === 1
                        ? "w-20 rounded-t-lg bg-zinc-600"
                        : "w-20 rounded-t-lg bg-zinc-800"
                    }
                    onClick={() => setActiveTab(1, index)}
                  >
                    Dados
                  </button>
                  <button
                    className={
                      activeTabs[index] === 2
                        ? "w-20 rounded-t-lg bg-zinc-600"
                        : "w-20 rounded-t-lg bg-zinc-800"
                    }
                    onClick={() => setActiveTab(2, index)}
                  >
                    Perícias
                  </button>
                </nav>
                <div className="w-full h-[364px]">{component}</div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
