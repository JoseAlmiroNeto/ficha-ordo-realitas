import { BoxSmall } from "./../box/BoxSmall";
import { Title } from "./../others/Title";
import { INewAttributes } from "../../types/Type";
import Attr from "./../../assets/attr.png";
import { useEffect } from "react";
import { useState } from "react";
import { db } from "./../../auth/Config";

export function Attributes(value: { uid: string }) {
  const [record, setRecord] = useState([] as any);
  const [newAttributes, setNewAttributes] = useState<INewAttributes>({
    agility: 0,
    energy: 0,
    force: 0,
    intelligence: 0,
    presence: 0,
  });

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

  return (
    <BoxSmall>
      {record.Attributes !== undefined ? (
        <>
          <Title>ATRIBUTOS</Title>
          <div className="h-[642px] w-full flex justify-center relative">
            <input
              defaultValue={record.Attributes.agility}
              type="number"
              className="z-10 w-[90px] h-[90px] bg-transparent text-center text-5xl mt-[17%] absolute
              sm:text-2xl
              xl:text-5xl
              2xl:text-5xl
              "
              onChange={(e) =>
                setNewAttributes({
                  ...newAttributes,
                  agility: parseInt(e.target.value),
                })
              }
              onKeyUp={async () => {
                await db
                  .collection("record")
                  .doc(record.uid)
                  .set(
                    {
                      Attributes: {
                        agility: newAttributes.agility,
                      },
                    },
                    { merge: true }
                  );
              }}
            />
            <input
              defaultValue={record.Attributes.force}
              type="number"
              className="z-10 w-[90px] h-[90px] bg-transparent text-center text-5xl mt-[35%] mr-[50%] absolute
              sm:text-2xl
              xl:text-5xl
              2xl:text-5xl
              "
              onChange={(e) =>
                setNewAttributes({
                  ...newAttributes,
                  force: parseInt(e.target.value),
                })
              }
              onKeyUp={async () => {
                await db
                  .collection("record")
                  .doc(record.uid)
                  .set(
                    {
                      Attributes: {
                        force: newAttributes.force,
                      },
                    },
                    { merge: true }
                  );
              }}
            />
            <input
              defaultValue={record.Attributes.intelligence}
              type="number"
              className="z-10 w-[90px] h-[90px] bg-transparent text-center text-5xl mt-[35%] ml-[51%] absolute
              sm:text-2xl
              xl:text-5xl
              2xl:text-5xl
              "
              onChange={(e) =>
                setNewAttributes({
                  ...newAttributes,
                  intelligence: parseInt(e.target.value),
                })
              }
              onKeyUp={async () => {
                await db
                  .collection("record")
                  .doc(record.uid)
                  .set(
                    {
                      Attributes: {
                        intelligence: newAttributes.intelligence,
                      },
                    },
                    { merge: true }
                  );
              }}
            />
            <input
              defaultValue={record.Attributes.presence}
              type="number"
              className="z-10 w-[90px] h-[90px] bg-transparent text-center text-5xl mt-[65%] mr-[35%] absolute
              sm:text-2xl
              xl:text-5xl
              2xl:text-5xl
              "
              onChange={(e) =>
                setNewAttributes({
                  ...newAttributes,
                  presence: parseInt(e.target.value),
                })
              }
              onKeyUp={async () => {
                await db
                  .collection("record")
                  .doc(record.uid)
                  .set(
                    {
                      Attributes: {
                        presence: newAttributes.presence,
                      },
                    },
                    { merge: true }
                  );
              }}
            />
            <input
              defaultValue={record.Attributes.energy}
              type="number"
              className="z-10 w-[90px] h-[90px] bg-transparent text-center text-5xl mt-[65%] ml-[32%] absolute
              sm:text-2xl
              xl:text-5xl
              2xl:text-5xl
              "
              onChange={(e) =>
                setNewAttributes({
                  ...newAttributes,
                  energy: parseInt(e.target.value),
                })
              }
              onKeyUp={async () => {
                await db
                  .collection("record")
                  .doc(record.uid)
                  .set(
                    {
                      Attributes: {
                        energy: newAttributes.energy,
                      },
                    },
                    { merge: true }
                  );
              }}
            />
            <img src={Attr} alt="atributos" className="h-full absolute z-0" />
          </div>
        </>
      ) : (
        <div />
      )}
    </BoxSmall>
  );
}
