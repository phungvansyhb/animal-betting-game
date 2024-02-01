"use client";

import * as Ably from "ably";
import { AblyProvider, useAbly } from "ably/react";
import CreateRoom from "./CreateRoom";
import { useContext, useEffect, useMemo } from "react";
import { GameContext } from "./page";
import GameRoom from "./GameRoom";

export default function PubSubClient() {
  const client = useMemo(()=> new Ably.Realtime.Promise({
    authUrl: "/token",
    authMethod: "POST",
  }),[]);
  const { currentRoom  } = useContext(GameContext);
  return (
    <AblyProvider client={client}>
      {currentRoom ? <GameRoom /> : <CreateRoom />}
    </AblyProvider>
  );
}
