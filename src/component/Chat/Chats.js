import React, { useRef, useState } from 'react'
import Send from '@mui/icons-material/Send';
import InsertEmoticon from '@mui/icons-material/InsertEmoticon';
import AttachFile from '@mui/icons-material/AttachFile';
import Message from './Message';
import ChatHeader from './ChatHeader';
import { messages } from './messages';

const Chats = () => {
  const [message,setMessage]=useState('');
  const inputRef=useRef();
  const date=new Date("2024-04-23T12:00:00Z");
  console.log(date);
  const time=date.getHours()+':'+date.getMinutes();
  const FUTURE=date.getFullYear()+'/ m'+date.getMonth()+'/ day :'+date.getDay();
  console.log(time);
  console.log(FUTURE);
  return (
    <>
      <div className='conv-header'>
          <ChatHeader/>
      </div>
      <div className='conv-content'>
        {messages.map((message)=><Message key={message.id} chat={message}/>)}
        
      </div>
      <div className='conv-tool'>
          <form>
            <input ref={inputRef} onChange={(e)=>setMessage(e.target.value)} type="text" placeholder='Type a message...'/>
            <Send  className='send tool' onClick={()=>{
              
              inputRef.current.value='';
              }}/>
            <InsertEmoticon className='emoji tool'/>
            <AttachFile className='attach tool'/>
          </form>
      </div>
    </>
  )
}

export default Chats