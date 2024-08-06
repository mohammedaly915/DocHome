import React from 'react'
import './Chat.scss'
import User from '../../component/Chat/User'
import Chats from '../../component/Chat/Chats'
import Search from '@mui/icons-material/Search';

const Chat = () => {
  return (
    <div className='chat'>
        
        <div className='conversition'>
            <Chats/>
        </div>
        <div className='accounts'>
          <div className='header'>
              <Search className='search'/>
              <div className='title'>messages</div>
              <div className='img'>
                <img src='https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' alt='user'/>
              </div>
            </div>
          <div className='users-box'>
              <User/>
              <User/>
              <User/>
              <User/>
              <User/>
            </div>
        </div>

    </div>
  )
}

export default Chat