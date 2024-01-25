/**
 * Warning: Opening too many live preview tabs will slow down performance.
 * We recommend closing them after you're done.
 */
import React, { SetStateAction, createContext, useState } from "react";
import "../global.css";
import dynamic from 'next/dynamic';
import Sidebar from "../../components/Sidebar.tsx";
import { Room } from "../../types/Room.type.ts";

const PubSubClient = dynamic(() => import('./pubsub-client.tsx'), {
  ssr: false,
})


type GameContext = {
    listRoom : Room[],
    setRoom : React.Dispatch<SetStateAction<Room[]>> 
}

export const GameContext=  createContext<GameContext>({
  listRoom : [],
  setRoom : ()=> {}
})


const PubSub = () => {

  const pageId="PubSubChannels"
  const [listRoom , setRoom] = useState<Room[]>([])   
  const [currentRoom , setCurrentRoom] = useState()
  const [members , setMembers] = useState()

  return (
      <>
        <Sidebar pageId={pageId} />
        <GameContext.Provider value={{listRoom, setRoom}}>
          <div className="flex flex-col grow gap-6 pt-12 pr-12 pb-12 pl-12 rounded-2xl border-slate-100 border-t border-b border-l border-r border-solid border h-[864px] bg-slate-50">
            <PubSubClient />
          </div>
        </GameContext.Provider>
      </>
      
  )
}

export default PubSub;
