import { useAbly, useChannel } from "ably/react";
import {
  MouseEvent,
  MouseEventHandler,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { DB_PATH, TOPIC } from "../constant";
import { Types } from "ably";
import { GameContext } from "./page";
import { Room } from "../../types/Room.type";
import { firebaseGetData } from "../../firebase/firebaseGetData";
import useGetDataFireBase from "../../firebase/useGetDataFireBase";
import { firebaseAddData } from "../../firebase/firebaseAddData";
import { Button, TextInput } from "flowbite-react";

/*  TODO : user can create room, search room by name. When user create room succes will move to screen gameroom */

export default function CreateRoom() {
  const { setCurrentRoom } = useContext(GameContext);
  const { connection } = useAbly();
  const [roomName, setRoomName] = useState("");

  const { data, loading } = useGetDataFireBase<Record<string, Room>>({
    path: DB_PATH.ROOM,
  });

  console.log("room", data);
  const handleCreateRoom: MouseEventHandler = (
    e: MouseEvent<HTMLButtonElement>
  ) => {
    const room = {
      name: roomName,
      id: crypto.randomUUID(),
      hostId: connection.id!,
    };
    setCurrentRoom({ ...room });
    firebaseAddData(DB_PATH.ROOM + room.id, room);
  };
  function handleJoinRoom(room: Room) {
    setCurrentRoom(room);
  }
  return (
    <div>
      <form
        className="flex flex-col lg:flex-row w-full  gap-4 flex-wrap"
        onSubmit={(e) => e.preventDefault()}
      >
        <label htmlFor="roomName" className="font-semibold text-xl mr-4">
          Create a Room:{" "}
        </label>
        <TextInput
          id="roomName"
          value={roomName}
          onChange={(e) => setRoomName(e.target.value)}
          className="border rounded p-3 grow"
          required
          placeholder="Enter your room name..."
        ></TextInput>
        <Button
          type="submit"
          color="red"
          onClick={handleCreateRoom}
          className=" p-3 font-bold text-white rounded text-xl"
        >
          👻
        </Button>
        {/* TODO user can create or type room to join */}
      </form>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 my-8">
        {loading && (
          <div className="w-full text-center mx-auto">Loading ...</div>
        )}
        {data &&
          Object.values(data).map((room) => (
            <div
              key={room.id}
              className="font-bold text-xl p-4 border rounded flex items-center justify-center w-full h-40 cursor-pointer"
              onClick={() => handleJoinRoom(room)}
            >
              {room.name}
            </div>
          ))}
      </div>
    </div>
  );
}
