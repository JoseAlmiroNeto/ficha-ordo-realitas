import { db } from "../../auth/Config";
import { IInfoPlayer, ObjPersonal } from "../../types/Type";
import { BoxSmall } from "../box/BoxSmall";
import { Input } from "../others/Input";
import { Title } from "../others/Title";
import { useState } from "react";

export function ProfileSheet({ objPersonal, uid }: ObjPersonal) {
  const [newInfo, setNewInfo] = useState<IInfoPlayer>({
    name: "",
    player: "",
    origin: "",
    age: 0,
    genre: "",
    birthplace: "",
    placeResidence: "",
    class: "",
    patent: "",
  });

  return (
    <BoxSmall>
      {objPersonal !== undefined ? (
        <>
          <Title>DETALHES PESSOAIS</Title>
          <div className="w-full h-full flex flex-col justify-evenly">
            <Input
              type="text"
              title="Nome"
              value={objPersonal.name}
              onChange={(e) => setNewInfo({ ...newInfo, name: e.target.value })}
              onKeyUp={async () => {
                await db
                  .collection("record")
                  .doc(uid)
                  .set(
                    {
                      PersonalDetails: {
                        name: newInfo.name,
                      },
                    },
                    { merge: true }
                  );
              }}
            />
            <Input
              type="text"
              title="Jogador"
              value={objPersonal.player}
              onChange={(e) =>
                setNewInfo({ ...newInfo, player: e.target.value })
              }
              onKeyUp={async () => {
                await db
                  .collection("record")
                  .doc(uid)
                  .set(
                    {
                      PersonalDetails: {
                        player: newInfo.player,
                      },
                    },
                    { merge: true }
                  );
              }}
            />
            <Input
              type="number"
              title="Idade"
              value={objPersonal.age}
              onChange={(e) =>
                setNewInfo({ ...newInfo, age: parseInt(e.target.value) })
              }
              onKeyUp={async () => {
                await db
                  .collection("record")
                  .doc(uid)
                  .set(
                    {
                      PersonalDetails: {
                        age: newInfo.age,
                      },
                    },
                    { merge: true }
                  );
              }}
            />
            <Input
              type="text"
              title="Gênero"
              value={objPersonal.genre}
              onChange={(e) =>
                setNewInfo({ ...newInfo, genre: e.target.value })
              }
              onKeyUp={async () => {
                await db
                  .collection("record")
                  .doc(uid)
                  .set(
                    {
                      PersonalDetails: {
                        genre: newInfo.genre,
                      },
                    },
                    { merge: true }
                  );
              }}
            />
            <Input
              type="text"
              title="Origem"
              value={objPersonal.origin}
              onChange={(e) =>
                setNewInfo({ ...newInfo, origin: e.target.value })
              }
              onKeyUp={async () => {
                await db
                  .collection("record")
                  .doc(uid)
                  .set(
                    {
                      PersonalDetails: {
                        origin: newInfo.origin,
                      },
                    },
                    { merge: true }
                  );
              }}
            />
            <Input
              type="text"
              title="Classe"
              value={objPersonal.class}
              onChange={(e) =>
                setNewInfo({ ...newInfo, class: e.target.value })
              }
              onKeyUp={async () => {
                await db
                  .collection("record")
                  .doc(uid)
                  .set(
                    {
                      PersonalDetails: {
                        class: newInfo.class,
                      },
                    },
                    { merge: true }
                  );
              }}
            />
            <Input
              type="text"
              title="Patente"
              value={objPersonal.patent}
              onChange={(e) =>
                setNewInfo({ ...newInfo, patent: e.target.value })
              }
              onKeyUp={async () => {
                await db
                  .collection("record")
                  .doc(uid)
                  .set(
                    {
                      PersonalDetails: {
                        patent: newInfo.patent,
                      },
                    },
                    { merge: true }
                  );
              }}
            />
            <Input
              type="text"
              title="Local de nascimento"
              value={objPersonal.birthplace}
              onChange={(e) =>
                setNewInfo({ ...newInfo, birthplace: e.target.value })
              }
              onKeyUp={async () => {
                await db
                  .collection("record")
                  .doc(uid)
                  .set(
                    {
                      PersonalDetails: {
                        birthplace: newInfo.birthplace,
                      },
                    },
                    { merge: true }
                  );
              }}
            />
            <Input
              type="text"
              title="Local de residência"
              value={objPersonal.placeResidence}
              onChange={(e) =>
                setNewInfo({ ...newInfo, placeResidence: e.target.value })
              }
              onKeyUp={async () => {
                await db
                  .collection("record")
                  .doc(uid)
                  .set(
                    {
                      PersonalDetails: {
                        placeResidence: newInfo.placeResidence,
                      },
                    },
                    { merge: true }
                  );
              }}
            />
          </div>
        </>
      ) : (
        <div />
      )}
    </BoxSmall>
  );
}
