import { useHistory } from "react-router-dom";
import { IIdentidication } from "../../types/Type";
import { InfoIdentificationCard } from "./InfoIdentificationCard";
import UserPhoto from "../../assets/userPhoto.webp";
import { useState, useEffect } from "react";

export function IdentificationCard({ record }: IIdentidication) {
  const history = useHistory();
  const [birthDate, setBirthDate] = useState<Date | undefined>();

  const handleClick = () => {
    history.push(`/ficha/${record.uid}`);
  };

  useEffect(() => {
    getBirthdateFromAge();
  }, []);

  function getBirthdateFromAge() {
    const today = new Date();
    const birthYear = today.getFullYear() - record.PersonalDetails.age;
    const birthdate = new Date(birthYear, today.getMinutes(), today.getDate());
    setBirthDate(birthdate);
  }

  return (
    <div
      onClick={handleClick}
      className="cursor-pointer w-[400px] h-[210px] bg-backgroundCard bg-cover rounded relative px-3 flex justify-between"
    >
      <img
        src="./logoCard.webp"
        alt=""
        className="w-[152px] h-[163px] absolute top-0 bottom-0 left-0 m-auto ml-[90px]"
      />
      <div className="h-full flex flex-col justify-around">
        <InfoIdentificationCard
          label="NOME"
          value={record.PersonalDetails.name}
        />
        <InfoIdentificationCard
          label="PATENTE"
          value={record.PersonalDetails.patent}
        />
        <InfoIdentificationCard
          label="CLASSE"
          value={record.PersonalDetails.class}
        />
        <InfoIdentificationCard label="NASCIMENTO" value={birthDate} />
        <InfoIdentificationCard
          label="REGISTRO"
          value={`#${record.identificationNumber || "0123611"}`}
        />
      </div>
      <div className="h-full flex items-center">
        <div className="w-[146px] h-[198px] border-2 border-black-100 bg-cover bg-center rounded">
          <img
            src={record.imgUrl ? record.imgUrl : UserPhoto}
            alt="profile photo"
            className="object-cover object-center w-full h-full"
          />
        </div>
      </div>
    </div>
  );
}
