/**
 * Warning: Opening too many live preview tabs will slow down performance.
 * We recommend closing them after you're done.
 */
'use client'
import React, { SetStateAction, createContext, useState } from "react";
import "../global.css";
import dynamic from 'next/dynamic';
import {  Room } from "../../types/Room.type.ts";

const PubSubClient = dynamic(() => import('./pubsub-client.tsx'), {
  ssr: false,
})


type GameContext = {
    listRoom : Room[],
    setRoom : React.Dispatch<SetStateAction<Room[]>> ,
    currentRoom : Room|undefined , 
    setCurrentRoom :  React.Dispatch<SetStateAction<Room|undefined>> ,
    // connectId : string,
    // setConnectId : React.Dispatch<SetStateAction<string>>,
}

export const GameContext=  createContext<GameContext>({
  listRoom : [],
  setRoom : ()=> {},
  currentRoom : undefined,
  setCurrentRoom : ()=> {},
  // connectId : '',
  // setConnectId : ()=>{}
})


const PubSub = () => {

  const [listRoom , setRoom] = useState<Room[]>([])   
  const [currentRoom , setCurrentRoom] = useState<Room|undefined>()
  const [members , setMembers] = useState()
  const [connectId , setConnectId] = useState('')
  return (
      <>
        {/* <Sidebar pageId={pageId} /> */}
        <GameContext.Provider value={{listRoom, setRoom , currentRoom , setCurrentRoom  }}>
            <PubSubClient />
        </GameContext.Provider>
      </>
      
  )
}

export default PubSub;
