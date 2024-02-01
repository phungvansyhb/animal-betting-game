import { useAbly, useChannel } from "ably/react";
import {
  MouseEvent,
  MouseEventHandler,
  useContext,
  useEffect,
  useState,
} from "react";
import { DB_PATH, TOPIC } from "../constant";
import {Types} from "ably";
import { GameContext } from "./page";
import {  Room } from "../../types/Room.type";
import firebaseAddData from "../../firebase/firebaseAddData";

/*  TODO : user can create room, search room by name. When user create room succes will move to screen gameroom */

export default function CreateRoom() {
  const { listRoom, setRoom, setCurrentRoom  } = useContext(GameContext);
  const {connection} = useAbly()
  const [roomName, setRoomName] = useState("");
  /* TODO : add options to query history message */
  const { channel } = useChannel(
    TOPIC.GAME_ROOM.CREATE,
    (message: Types.Message) => {
      const room: Room = {
        name: message.data.name,
        id: message.data.id,
        hostId: message.connectionId!,
      };
      setRoom((cur) => [...cur, room]);
    }
  );
  
  useEffect(() => {
    if (channel) {
      channel.history().then((data) => {
        const historyRoom:Room[] = data.items.map((item) => ({
          name: item.data.name ,
          id: item.data.id,
          hostId: item.connectionId!,
          
        }));
        setRoom((cur) => [...cur, ...historyRoom]);
      });
    }
  }, [channel]);

  const handleCreateRoom: MouseEventHandler = (
    e: MouseEvent<HTMLButtonElement>
  ) => {
    const room = { name: roomName, id: crypto.randomUUID(), hostId : connection.id! };
    if (channel === null) return;
    channel.publish(TOPIC.GAME_ROOM.CREATE, room);
    setCurrentRoom({...room });
    firebaseAddData(DB_PATH.ROOM+room.id , room)
  };
  function handleJoinRoom(room: Room) {
    /* TODO : pusblish event join room to push user to roomData */
    const currentRoom:Room = {...room }
    setCurrentRoom(room);
  }
  return (
    <div>
      <form
        className="flex flex-col lg:flex-row gap-4 flex-wrap"
        onSubmit={(e) => e.preventDefault()}
      >
        <label htmlFor="roomName" className="font-semibold text-xl mr-4">
          Create a Room:{" "}
        </label>
        <input
          id="roomName"
          value={roomName}
          onChange={(e) => setRoomName(e.target.value)}
          className="border rounded p-3"
          required
          placeholder="Enter your room name..."
        ></input>
        <button
          type="submit"
          onClick={handleCreateRoom}
          className="bg-slate-300 p-3 font-bold text-white rounded text-xl"
        >
          👻
        </button>
        {/* TODO user can create or type room to join */}
      </form>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 my-8">
        {listRoom.map((room) => (
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
