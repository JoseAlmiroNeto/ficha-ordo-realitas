import { BoxSmall } from "../box/BoxSmall";
import { Bar } from "../others/BarStatus";
import D100 from "../../assets/d100.png";
import { INewStatus } from "./../../types/Type";
import { CheckBox } from "./../others/CheckBox";
import { DefeatInputs } from "../others/DefeatsInputs";
import { useState, useEffect } from "react";
import { db, storage } from "../../auth/Config";
import PhotoUser from "../../assets/userPhoto.webp";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ModalSmall } from "../modal/Modal";
import { Title } from "../others/Title";

export function Status(value: { uid: string }) {
  const [record, setRecord] = useState([] as any);
  const [show, setShow] = useState(false);
  const [newStatus, setNewStatus] = useState<INewStatus>({
    currentLife: 0,
    currentEffort: 0,
    currentSanity: 0,
    maximumLife: 0,
    maximumEffort: 0,
    maximumSanity: 0,
    nex: 0,
    defense: 0,
    protection: 0,
    resistance: 0,
    displacement: "",
  });

  const notifyAwait = () => toast.info("Imagem sendo processada, Aguarde!");
  const notifySuccess = () => toast.success("Imagem pronta!");

  useEffect(() => {
    getDocStatus();
  }, []);

  async function getDocStatus() {
    const { docs } = await db
      .collection("record")
      .where("uid", "==", value.uid)
      .get();
    setRecord(docs[0].data());
  }

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (file) {
      notifyAwait();
      const storageRef = storage.ref();
      const fileRef = storageRef.child(`images/${file.name}`);
      await fileRef.put(file);
      const url = await fileRef.getDownloadURL();

      if (file && url !== undefined) {
        await db.collection("record").doc(value.uid).set(
          {
            imgUrl: url,
          },
          { merge: true }
        );
        getDocStatus();
        notifySuccess();
      }
    }
  };

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
    isOpen: isOpenModalRollD100,
    handleOpenModal: handleOpenModalRollD100,
    handleCloseModal: handleCloseModalRollD100,
  } = useModal(false);

  const {
    isOpen: isOpenModalRollSanity,
    handleOpenModal: handleOpenModalRollSanity,
    handleCloseModal: handleCloseModalRollSanity,
  } = useModal(false);

  function RollSanity() {
    handleOpenModalRollSanity();
    const roll = Math.floor(Math.random() * 100 + 1);
    return (
      <div className="flex flex-col justify-center items-center">
        <p
          className={
            roll <= record.Status.nex
              ? "text-5xl text-green-700"
              : "text-5xl text-red-800"
          }
        >
          {roll}
        </p>
        <p className="text-2xl">
          {roll <= record.Status.nex ? "Sucesso" : "Fracasso"}
        </p>
      </div>
    );
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
        isOpen={isOpenModalRollD100}
        onClose={handleCloseModalRollD100}
      >
        <div className="w-full h-full flex flex-col gap-2">
          <Title>Rolagem de D100</Title>
          <div className="w-full h-full px-5 flex items-center justify-center">
            {!show && (
              <div className="h-[80%] flex items-center">
                <div className="w-5 h-5 rounded-full bg-white animate-ping" />
              </div>
            )}
            {show && (
              <p className="text-5xl">{Math.floor(Math.random() * 100 + 1)}</p>
            )}
          </div>
        </div>
      </ModalSmall>

      <ModalSmall
        isOpen={isOpenModalRollSanity}
        onClose={handleCloseModalRollSanity}
      >
        <div className="w-full h-full flex flex-col gap-2">
          <Title>Rolagem de Sanidade D100</Title>
          <div className="w-full h-full px-5 flex items-center justify-center">
            {!show && (
              <div className="h-[80%] flex items-center">
                <div className="w-5 h-5 rounded-full bg-white animate-ping" />
              </div>
            )}
            {show && <RollSanity />}
          </div>
        </div>
      </ModalSmall>

      <BoxSmall>
        {record.Status !== undefined ? (
          <>
            <div className="flex w-full justify-around">
              <label
                htmlFor="img"
                className="cursor-pointer bg-cover bg-center rounded-full border border-zinc-900
                sm:w-[60px] sm:h-[60px]
                xl:w-[100px] xl:h-[100px]
                2xl:w-[140px] 2xl:h-[140px]
                "
              >
                <img
                  src={record.imgUrl ? record.imgUrl : PhotoUser}
                  alt=""
                  className="object-cover object-center w-full h-full rounded-full"
                />
                <input
                  id="img"
                  type="file"
                  className="hidden"
                  onChange={handleFileUpload}
                />
              </label>
              <img
                src={D100}
                alt="d100"
                className="rounded-full hover:animate-spin cursor-pointer
                sm:w-[50px] sm:h-[50px]
                xl:w-[90px] xl:h-[90px]
                2xl:w-[130px] 2xl:h-[130px]
                "
                onClick={() => {
                  handleOpenModalRollD100();
                  handleClick();
                }}
              />
            </div>
            <div className="w-full flex flex-col gap-1">
              <Bar
                typeBar="life"
                currentValue={
                  newStatus.currentLife || record.Status.currentLife
                }
                maximumValue={
                  newStatus.maximumLife || record.Status.maximumLife
                }
                onChangeCurrent={(e) =>
                  setNewStatus({
                    ...newStatus,
                    currentLife: parseInt(e.target.value),
                  })
                }
                onKeyUpCurrent={async () => {
                  await db
                    .collection("record")
                    .doc(record.uid)
                    .set(
                      {
                        Status: {
                          currentLife: newStatus.currentLife,
                        },
                      },
                      { merge: true }
                    );
                }}
                onChangeMaximum={(e) =>
                  setNewStatus({
                    ...newStatus,
                    maximumLife: parseInt(e.target.value),
                  })
                }
                onKeyUpMaximum={async () => {
                  await db
                    .collection("record")
                    .doc(record.uid)
                    .set(
                      {
                        Status: {
                          maximumLife: newStatus.maximumLife,
                        },
                      },
                      { merge: true }
                    );
                }}
              />
              <div className="flex w-full justify-around">
                <CheckBox
                  value={record.Status.seriousInjury}
                  name="Lesão Grave"
                />
                <CheckBox
                  value={record.Status.unconscious}
                  name="Inconciente"
                />
                <CheckBox value={record.Status.dying} name="Morrendo" />
              </div>
            </div>
            <div className="w-full flex flex-col gap-1">
              <div className="flex items-center gap-5">
                <Bar
                  typeBar="sanity"
                  currentValue={
                    newStatus.currentSanity || record.Status.currentSanity
                  }
                  maximumValue={
                    newStatus.maximumSanity || record.Status.maximumSanity
                  }
                  onChangeCurrent={(e) =>
                    setNewStatus({
                      ...newStatus,
                      currentSanity: parseInt(e.target.value),
                    })
                  }
                  onKeyUpCurrent={async () => {
                    await db
                      .collection("record")
                      .doc(record.uid)
                      .set(
                        {
                          Status: {
                            currentSanity: newStatus.currentSanity,
                          },
                        },
                        { merge: true }
                      );
                  }}
                  onChangeMaximum={(e) =>
                    setNewStatus({
                      ...newStatus,
                      maximumSanity: parseInt(e.target.value),
                    })
                  }
                  onKeyUpMaximum={async () => {
                    await db
                      .collection("record")
                      .doc(record.uid)
                      .set(
                        {
                          Status: {
                            maximumSanity: newStatus.maximumSanity,
                          },
                        },
                        { merge: true }
                      );
                  }}
                />
                <img
                  src={D100}
                  alt="d100"
                  className="rounded-full hover:animate-spin cursor-pointer
                  sm:h-5
                  xl:h-9
                  2xl:h-9
                  "
                  onClick={() => {
                    handleOpenModalRollSanity();
                    handleClick();
                  }}
                />
              </div>
              <div className="flex w-full justify-around">
                <CheckBox
                  value={record.Status.traumatized}
                  name="Traumatizado"
                />
                <CheckBox value={record.Status.maddened} name="Enlouquecido" />
              </div>
            </div>
            <div className="w-full flex flex-col gap-4">
              <Bar
                typeBar="effort"
                currentValue={
                  newStatus.currentEffort || record.Status.currentEffort
                }
                maximumValue={
                  newStatus.maximumEffort || record.Status.maximumEffort
                }
                onChangeCurrent={(e) =>
                  setNewStatus({
                    ...newStatus,
                    currentEffort: parseInt(e.target.value),
                  })
                }
                onKeyUpCurrent={async () => {
                  await db
                    .collection("record")
                    .doc(record.uid)
                    .set(
                      {
                        Status: {
                          currentEffort: newStatus.currentEffort,
                        },
                      },
                      { merge: true }
                    );
                }}
                onChangeMaximum={(e) =>
                  setNewStatus({
                    ...newStatus,
                    maximumEffort: parseInt(e.target.value),
                  })
                }
                onKeyUpMaximum={async () => {
                  await db
                    .collection("record")
                    .doc(record.uid)
                    .set(
                      {
                        Status: {
                          maximumEffort: newStatus.maximumEffort,
                        },
                      },
                      { merge: true }
                    );
                }}
              />
              <div className="flex w-full gap-1 justify-evenly">
                <DefeatInputs
                  type="number"
                  name="Defesa"
                  value={record.Status.defense}
                  onChange={(e) =>
                    setNewStatus({
                      ...newStatus,
                      defense: parseInt(e.target.value),
                    })
                  }
                  onKeyUp={async () => {
                    await db
                      .collection("record")
                      .doc(record.uid)
                      .set(
                        {
                          Status: {
                            defense: newStatus.defense,
                          },
                        },
                        { merge: true }
                      );
                  }}
                />
                <DefeatInputs
                  type="number"
                  name="Proteção"
                  value={record.Status.protection}
                  onChange={(e) =>
                    setNewStatus({
                      ...newStatus,
                      protection: parseInt(e.target.value),
                    })
                  }
                  onKeyUp={async () => {
                    await db
                      .collection("record")
                      .doc(record.uid)
                      .set(
                        {
                          Status: {
                            protection: newStatus.protection,
                          },
                        },
                        { merge: true }
                      );
                  }}
                />
                <DefeatInputs
                  type="number"
                  name="Resistência"
                  value={record.Status.resistance}
                  onChange={(e) =>
                    setNewStatus({
                      ...newStatus,
                      resistance: parseInt(e.target.value),
                    })
                  }
                  onKeyUp={async () => {
                    await db
                      .collection("record")
                      .doc(record.uid)
                      .set(
                        {
                          Status: {
                            resistance: newStatus.resistance,
                          },
                        },
                        { merge: true }
                      );
                  }}
                />
                <DefeatInputs
                  type="text"
                  name="Deslocamento"
                  value={record.Status.displacement}
                  onChange={(e) =>
                    setNewStatus({
                      ...newStatus,
                      displacement: e.target.value,
                    })
                  }
                  onKeyUp={async () => {
                    await db
                      .collection("record")
                      .doc(record.uid)
                      .set(
                        {
                          Status: {
                            displacement: newStatus.displacement,
                          },
                        },
                        { merge: true }
                      );
                  }}
                />
                <DefeatInputs
                  type="number"
                  name="Nex"
                  value={record.Status.nex}
                  onChange={(e) =>
                    setNewStatus({
                      ...newStatus,
                      nex: parseInt(e.target.value),
                    })
                  }
                  onKeyUp={async () => {
                    await db
                      .collection("record")
                      .doc(record.uid)
                      .set(
                        {
                          Status: {
                            nex: newStatus.nex,
                          },
                        },
                        { merge: true }
                      );
                  }}
                />
              </div>
            </div>
          </>
        ) : (
          <div />
        )}
      </BoxSmall>
    </>
  );
}
