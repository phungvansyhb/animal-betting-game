import React, { useContext, useEffect } from "react";
import { GameContext } from "./page";
import { useAbly, useChannel, usePresence } from "ably/react";
import { TOPIC } from "../constant";
import { STATUS_ENUM } from "../../types/Room.type";
import Image from "next/image";
import { faker } from "@faker-js/faker";

type Props = {};

function UserBadge({
  user,
  position,
}: {
  user: any;
  position: { top: string; left: string };
}) {
  return (
    <div
      key={user.id}
      style={position}
      className="flex-col justify-center items-center absolute"
    >
      <Image width={20} height={20} src={"/icons/User.svg"} alt="user-avatar" />
      <div className="font-semibold text-xs leading-tight">
        {user.data.name}
      </div>
    </div>
  );
}

export default function GameRoom({}: Props) {
  const { currentRoom } = useContext(GameContext);
  const channelName = TOPIC.GAME_ROOM._ + ":" + currentRoom?.id;
  const {channel , ably} = useChannel(channelName);
  
  const connection = ably.connection
  const { presenceData, updateStatus } = usePresence(channelName, {
    id: connection.id,
    status: STATUS_ENUM.ACTIVE,
    name: faker.person.firstName,
  });
  const isHost = currentRoom?.hostId === connection.id;
  
  /* TODO : if user is room onwer => can delete room  */
  useEffect(()=>{
    return ()=>{
      if(isHost) {
        /* TODO: is host quit then room has member => change host */
      }
    }
  },[])


  function handleQuitRoom(){
    
  }


  return (
    <div className="h-screen ">
      <span className="text-xl font-bold leading-snug">
        {currentRoom?.name} ({currentRoom?.id})
      </span>
      <div className="flex justify-center mt-4">
        <div className="h-52 lg:h-64 w-[80vw] max-w-[600px] rounded-lg bg-slate-300 relative">
          {presenceData &&
            presenceData.map((user, i) => {
              if (isHost)
                return (
                  <UserBadge
                    key={user.clientId}
                    user={user}
                    position={{ top: "0%", left: "50%" }}
                  />
                );
              if (!isHost && user.connectionId === connection.id) {
                return (
                  <UserBadge
                    key={user.clientId}
                    user={user}
                    position={{ top: "100%", left: "50%" }}
                  />
                );
              }
            })}
          {/* TODO : thêm hoạt ảnh đổ xúc xắc */}
          {/* TODO : thêm hoạt ảnh đặt cược */}
          <div></div>
        </div>
      </div>
    </div>
  );
}
