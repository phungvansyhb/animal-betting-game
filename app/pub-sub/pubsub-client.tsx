'use client'

import * as Ably from 'ably';
import { AblyProvider, useAbly, useChannel , getContext } from "ably/react"
import { MouseEventHandler, MouseEvent, useState, useContext, createContext } from 'react'
import Logger, { LogEntry } from '../../components/logger';
import SampleHeader from '../../components/SampleHeader';
import { TOPIC } from '../constant';


export default function PubSubClient() {

  const client = new Ably.Realtime.Promise ({ authUrl: '/token', authMethod: 'POST' });
  client.channels.get('á')
  return (
    <AblyProvider client={ client }>
        <CreateRoom/>
        <PubSubMessages/>
    </AblyProvider>
  )
}

function CreateRoom(){
  const [roomName , setRoomName] = useState('')
  const {ably , channel} = useChannel(TOPIC.GAME_ROOM.CREATE);

  const handleCreateRoom: MouseEventHandler = (_event: MouseEvent<HTMLButtonElement>) => {
    if(channel === null) return
    
    channel.publish(TOPIC.GAME_ROOM.CREATE, {text: 'room create'} )
  }

  return <div>
    <input value={roomName} onChange={e=>setRoomName(e.target.value)}></input>
    <button onClick={handleCreateRoom}>Create</button>
  </div>
}


function PubSubMessages() {

  const [logs, setLogs] = useState<Array<LogEntry>>([])

  const { channel  } = useChannel(TOPIC.GAME_ROOM.CREATE, (message: Ably.Types.Message) => {
    setLogs(prev => [...prev, new LogEntry(`✉️ event name: ${message.name} text: ${message.data.text}`)])
  });
  const [messageText, setMessageText] = useState<string>('A message')
  

  // const publicFromClientHandler: MouseEventHandler = (_event: MouseEvent<HTMLButtonElement>) => {
  //   if(channel === null) return
  //   channel.publish('update-from-client', {text: `${messageText} @ ${new Date().toISOString()}`} )
  // }

  return (
    <>
      <div className="flex flex-col justify-start items-start gap-4 h-[138px]">
        <div className="font-manrope text-sm min-w-[113px] whitespace-nowrap text-black text-opacity-100 leading-4 uppercase tracking-widest font-medium">
          <span className="uppercase">Message text</span>
        </div>
        <input className="font-manrope px-3 rounded-md items-center text-base min-w-[720px] w-[752px] whitespace-nowrap text-zinc-800 text-opacity-100 leading-6 font-light h-12 border-zinc-300 border-solid border bg-neutral-100" value={messageText}  onChange={e => setMessageText(e.target.value)} />
        {/* <div className="flex flex-row justify-start items-start gap-4 w-[368px]">
          <div className="flex justify-center items-center rounded-md w-44 h-10 bg-black">
            <div className="font-manrope text-base min-w-[136px] whitespace-nowrap text-white text-opacity-100 leading-4 font-medium">
              <button onClick={publicFromClientHandler}>Publish from Client</button>
            </div>
          </div>
        </div> */}
      </div>
      <Logger logEntries={logs} displayHeader={true}/>
    </>
  )
}