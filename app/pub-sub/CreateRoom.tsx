import { useChannel } from "ably/react";
import { MouseEvent, MouseEventHandler, useContext, useState } from "react";
import { TOPIC } from "../constant";
import * as Ably from "ably";
import { GameContext } from "./page";

export default function CreateRoom() {
  const { listRoom, setRoom } = useContext(GameContext);
  const [roomName, setRoomName] = useState("");
  const { channel, ably } = useChannel(
    TOPIC.GAME_ROOM.CREATE,
    (message: Ably.Types.Message) => {
      /* TODO  case add room => add to listRoom*/
      /* TODO  case remove room => remove from listRoom*/
      setRoom((cur) => [
        ...cur,
        { name: message.data.roomName, id: message.id },
      ]);
    }
  );

  const handleCreateRoom: MouseEventHandler = (
    e: MouseEvent<HTMLButtonElement>
  ) => {
    if (channel === null) return;
    (channel as Ably.Types.RealtimeChannelPromise).publish(
      TOPIC.GAME_ROOM.CREATE,
      { roomName: roomName }
    );
  };

  return (
    <div>
      <input
        value={roomName}
        onChange={(e) => setRoomName(e.target.value)}
        className="border rounded p-4"
      ></input>
      <button
        onClick={handleCreateRoom}
        className="bg-blue-400 p-4 font-bold text-white rounded ml-4"
      >
        Create Room
      </button>

      <div className="grid grid-cols-4 gap-4 my-8">
        {listRoom.map((room) => (
          <div
            key={room.id}
            className="font-bold text-xl p-4 border rounded flex items-center justify-center w-40 h-40"
          >
            {room.name}
          </div>
        ))}
      </div>
    </div>
  );
}
