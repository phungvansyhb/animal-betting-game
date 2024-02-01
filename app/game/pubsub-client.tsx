"use client";

import * as Ably from "ably";
import { AblyProvider } from "ably/react";
import CreateRoom from "./CreateRoom";
import { useContext, useEffect, useMemo } from "react";
import { GameContext } from "./page";
import GameRoom from "./GameRoom";

export default function PubSubClient() {
  const client = useMemo(()=> new Ably.Realtime.Promise({
    authUrl: "/token",
    authMethod: "POST",
  }),[]);
  const { currentRoom , setConnectId } = useContext(GameContext);
  useEffect(()=>{
    if(client.connection.id) setConnectId(client.connection.id)
  },[client, setConnectId])
  return (
    <AblyProvider client={client}>
      {currentRoom ? <GameRoom /> : <CreateRoom />}
    </AblyProvider>
  );
}
