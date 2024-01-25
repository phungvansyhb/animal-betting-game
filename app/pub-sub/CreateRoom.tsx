import { useChannel } from "ably/react";
import { MouseEvent, MouseEventHandler, useContext, useState } from "react";
import { TOPIC } from "../constant";
import *  as Ably from 'ably'
import { GameContext } from "./page";

export default function CreateRoom(){
    const {listRoom , setRoom} = useContext(GameContext)
    const [roomName , setRoomName] = useState('')
    const {channel , ably} = useChannel(TOPIC.GAME_ROOM.CREATE , (message: Ably.Types.Message)=>{
      /* TODO  case add room => add to listRoom*/
      /* TODO  case remove room => remove from listRoom*/

    });
  
    const handleCreateRoom: MouseEventHandler = (_event: MouseEvent<HTMLButtonElement>) => {
      if(channel === null) return
      
      (channel as Ably.Types.RealtimeChannelPromise).publish(TOPIC.GAME_ROOM.CREATE, {text: 'room create'} )
    }
  
    return <div>
      <input value={roomName} onChange={e=>setRoomName(e.target.value)}></input>
      <button onClick={handleCreateRoom}>Create</button>
      {/* TODO : display list room */}
    </div>
  }
  