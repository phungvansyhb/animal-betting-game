import React, { useContext } from "react";
import { GameContext } from "./page";
import { useChannel, usePresence } from "ably/react";
import { TOPIC } from "../constant";
import { STATUS_ENUM } from "../../types/Room.type";
import Image from "next/image";

type Props = {};

export default function GameRoom({}: Props) {
  const { currentRoom, connectId } = useContext(GameContext);
  const channelName = TOPIC.GAME_ROOM._ + ":" + currentRoom?.id;
  const { channel } = useChannel(channelName);
  const { presenceData, updateStatus } = usePresence(channelName, {
    id: connectId,
    status: STATUS_ENUM.ACTIVE,
    name: "Sypv",
  });
  /* create channel ingame:{currentRoom.name} and subcribe  */
  /* TODO : if user is room onwer => can delete room */
  /* TODO : subcribe channel game and query members */
  console.log(presenceData);
  return (
    <div className="h-screen ">
      <span className="text-xl font-bold leading-snug">
        {currentRoom?.name} ({currentRoom?.id})
      </span>
      <div className="flex justify-center">
        <div className="h-52 lg:h-64 w-[80vw] max-w-[600px] rounded-lg bg-slate-300 relative">
          {presenceData &&
            presenceData.map((user , i) => (
              /* TODO : tìm công thức để xếp user lên bàn */
              <div
                key={user.id}
                style={{
                  top : '80%' ,
                  left : '90%'
                }}
                className="flex-col justify-center items-center absolute"
              >
                <Image
                  width={20}
                  height={20}
                  src={"/icons/User.svg"}
                  alt="user-avatar"
                />
                <div className="font-semibold text-xs leading-tight">{user.data.name}</div>
              </div>
            ))}
            {/* TODO : thêm hoạt ảnh đổ xúc xắc */}
            {/* TODO : thêm hoạt ảnh đặt cược */}
            <div></div>
        </div>
      </div>
    </div>
  );
}
