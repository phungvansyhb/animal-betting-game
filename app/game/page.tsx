/**
 * Warning: Opening too many live preview tabs will slow down performance.
 * We recommend closing them after you're done.
 */
"use client";
import React, { SetStateAction, createContext, useState } from "react";
import "../global.css";
import dynamic from "next/dynamic";
import { Room } from "../../types/Room.type.ts";
import { Button, FileInput, Label, Modal, TextInput } from "flowbite-react";
import { getCookie, setCookie } from "cookies-next";
import { firebaseAddData } from "../../firebase/firebaseAddData.ts";
import { DB_PATH } from "../constant.ts";
import useGetDataFireBase from "../../firebase/useGetDataFireBase.ts";

const PubSubClient = dynamic(() => import("./pubsub-client.tsx"), {
  ssr: false,
});

type GameContext = {
  currentRoom: Room | undefined;
  setCurrentRoom: React.Dispatch<SetStateAction<Room | undefined>>;
  user: User | undefined;
};

export const GameContext = createContext<GameContext>({
  currentRoom: undefined,
  setCurrentRoom: () => {},
  user: undefined,
});
type User = { name?: string; avatar?: string; id?: string };
const PubSub = () => {
  const [currentRoom, setCurrentRoom] = useState<Room | undefined>();
  const userID = getCookie("bettting::userId");
  const [openModal, setOpenModal] = useState(userID ? false : true);
  const { data } = useGetDataFireBase<User>({
    path: DB_PATH.USER + userID,
    enable: !!userID,
  });
  console.log(data);
  const [form, setForm] = useState<User>();
  function handleFormChange(value: User) {
    setForm(value);
  }
  function handleSubmit() {
    const data = { ...form, id: crypto.randomUUID() };
    firebaseAddData(DB_PATH.USER + data.id, data)
      .then(() => {
        setOpenModal(false);
        setCookie("bettting::userId", data.id);
      })
      .catch((e) => console.log(e));
  }
  return (
    <>
      <GameContext.Provider value={{ currentRoom, setCurrentRoom, user: data }}>
        <PubSubClient />
      </GameContext.Provider>
      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>Chào mừng đến với bình nguyên vô tận</Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <div className=" block">
              <Label htmlFor="name" value="Tên của bạn là gì " />
            </div>
            <TextInput
              placeholder="Nhập tên của bạn"
              maxLength={12}
              id="name"
              onChange={(e) =>
                handleFormChange({ ...form, name: e.target.value })
              }
            />
            <div className=" block">
              <Label
                htmlFor="avatar"
                value="Chọn một cái avatar thật cool ngầu đi :"
              />
            </div>

            <FileInput
              placeholder="Chọn một cái avatar thật cool ngầu đi"
              maxLength={12}
              id="avatar"
              onChange={(e) => {
                const reader = new FileReader();
                if (e.target.files) {
                  reader.readAsDataURL(e.target.files[0]);
                  reader.onload = (e) => {
                    handleFormChange({
                      ...form,
                      avatar: e.target?.result as string,
                    });
                  };
                }
              }}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleSubmit}>Here we go</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default PubSub;
