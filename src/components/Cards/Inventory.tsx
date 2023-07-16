import { BoxLarge } from "./../box/BoxLarge";
import { useEffect, useState } from "react";
import { db } from "./../../auth/Config";
import { IInventory, INewItem } from "./../../types/Type";
import { TitleCreate } from "./../others/TitleCreate";
import { ModalMedium } from "./../modal/Modal";
import { Title } from "../others/Title";
import { SelectModal } from "../others/SelectModal";
import { InputModal } from "../others/InputModal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ButtonTrash } from "../others/ButtonTrash";
import { category } from "../others/DataBase";

export function Inventory(value: { uid: string }) {
  const [inventory, setInventory] = useState<IInventory | null>(null);
  const [isEditItem, setIsEditItem] = useState(false);
  const [indexItem, setIndexItem] = useState(0);
  const [newItem, setNewItem] = useState<INewItem>({
    name: "",
    description: "",
    category: "",
    spaces: 0,
  });
  const [dataEditItem, setDataEditItem] = useState<INewItem>({
    name: "",
    description: "",
    category: "",
    spaces: 0,
  });

  const notify = () => toast.success("Criado com sucesso!");
  const notifyDelete = () => toast.success("Item deletado com sucesso!");
  const notifyEdit = () => toast.success("Item editado com sucesso!");

  useEffect(() => {
    getDocInventory();
  }, []);

  async function getDocInventory() {
    const { docs } = await db
      .collection("inventory")
      .where("uid", "==", value.uid)
      .get();
    const data = docs[0].data() as IInventory;
    setInventory(data);
  }

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

  async function CreateItems() {
    const newArray = [...(inventory?.arrayItem ?? []), newItem];
    await db.collection("inventory").doc(value.uid).set(
      {
        arrayItem: newArray,
      },
      { merge: true }
    );
    getDocInventory();
    handleCloseModalCreate();
    notify();
  }

  async function EditItem() {
    const newArray = [...(inventory?.arrayItem ?? [])];
    newArray[indexItem] = dataEditItem;
    await db.collection("inventory").doc(value.uid).set(
      {
        arrayItem: newArray,
      },
      { merge: true }
    );
    getDocInventory();
    handleCloseModalEdit();
    notifyEdit();
    setIsEditItem(false);
  }

  async function DeleteItem(index: number) {
    const newArray = [...(inventory?.arrayItem ?? [])];
    newArray.splice(index, 1);
    await db.collection("inventory").doc(value.uid).set(
      {
        arrayItem: newArray,
      },
      { merge: true }
    );
    getDocInventory();
    notifyDelete();
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
          <Title>Criar Item</Title>
          <div className="w-full h-full px-5 flex flex-col justify-between">
            <InputModal
              title="Nome:"
              type="text"
              placeholder="Ex: Carta com simbolos"
              onChange={(event) =>
                setNewItem({ ...newItem, name: event.target.value })
              }
            />
            <InputModal
              title="Descrição:"
              type="text"
              placeholder="Ex:Pista sobre o assassinato"
              onChange={(event) =>
                setNewItem({ ...newItem, description: event.target.value })
              }
            />
            <InputModal
              title="Espaços:"
              type="number"
              placeholder="Ex: 2"
              onChange={(event) =>
                setNewItem({ ...newItem, spaces: parseInt(event.target.value) })
              }
            />
            <SelectModal
              title="Categoria:"
              options={category}
              value={newItem.category}
              onChange={(event) =>
                setNewItem({ ...newItem, category: event.target.value })
              }
            />
            <button
              onClick={CreateItems}
              className="bg-red-1000 hover:bg-red-600 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
            >
              Criar
            </button>
          </div>
        </div>
      </ModalMedium>

      <ModalMedium isOpen={isOpenModalEdit} onClose={handleCloseModalEdit}>
        <div className="w-full h-full flex flex-col gap-2">
          <Title>Editar Item</Title>
          <div className="w-full h-full px-5 flex flex-col justify-between">
            <InputModal
              value={dataEditItem.name}
              title="Nome:"
              type="text"
              placeholder="Ex: Carta com simbolos"
              onChange={(event) =>
                setDataEditItem({ ...dataEditItem, name: event.target.value })
              }
            />
            <InputModal
              value={dataEditItem.description}
              title="Descrição:"
              type="text"
              placeholder="Ex:Pista sobre o assassinato"
              onChange={(event) =>
                setDataEditItem({
                  ...dataEditItem,
                  description: event.target.value,
                })
              }
            />
            <InputModal
              value={dataEditItem.spaces}
              title="Espaços:"
              type="number"
              placeholder="Ex: 2"
              onChange={(event) =>
                setDataEditItem({
                  ...dataEditItem,
                  spaces: parseInt(event.target.value),
                })
              }
            />
            <SelectModal
              title="Categoria:"
              options={category}
              value={dataEditItem.category}
              onChange={(event) =>
                setDataEditItem({
                  ...dataEditItem,
                  category: event.target.value,
                })
              }
            />
            <button
              onClick={EditItem}
              className="bg-red-1000 hover:bg-red-600 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
            >
              Salvar
            </button>
          </div>
        </div>
      </ModalMedium>

      <BoxLarge>
        <TitleCreate>
          <div className="w-[67px]" />
          <p>INVENTARIO</p>
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
              onClick={() => setIsEditItem(!isEditItem)}
            >
              <lord-icon
                src="https://cdn.lordicon.com/wloilxuq.json"
                trigger="hover"
                colors="primary:#ffffff,secondary:#ffffff"
                style={{ width: "24px", height: "24px" }}
              ></lord-icon>
            </div>
          </div>
        </TitleCreate>
        <div className="h-[642px] w-full flex flex-col gap-2">
          <div className="w-full h-12 flex border-b border-zinc-800">
            <div className="flex w-[70%] justify-between items-end">
              <p className="w-[35%]">Nome</p>
              <p className="w-[60%]">Descrição</p>
            </div>
            <div className="flex w-[30%] justify-evenly text-center items-end">
              <p className="w-[23%]">Espaços</p>
              <p className="w-[23%]">Categoria</p>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            {inventory !== null &&
              inventory.arrayItem.map((data, index: number) => {
                return (
                  <div
                    className={
                      isEditItem
                        ? "w-full h-8 flex border-b border-zinc-900 bg-zinc-900 animate-pulse rounded cursor-pointer"
                        : "w-full h-8 flex border-b border-zinc-900"
                    }
                    key={index}
                    onClick={() => {
                      if (isEditItem) {
                        handleOpenModalEdit();
                        setIndexItem(index);
                        setDataEditItem(data);
                      }
                    }}
                  >
                    <div className="flex w-[70%] justify-between items-end">
                      <div className="w-[35%] h-8 flex items-end gap-2">
                        <ButtonTrash onClick={() => DeleteItem(index)} />
                        <p>{data.name}</p>
                      </div>
                      <p className="w-[60%]">{data.description}</p>
                    </div>
                    <div className="flex w-[30%] justify-evenly text-center items-end">
                      <p className="w-[23%]">{data.spaces}</p>
                      <p className="w-[23%]">{data.category}</p>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </BoxLarge>
    </>
  );
}
