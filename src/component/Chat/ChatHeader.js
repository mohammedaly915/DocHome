import React from 'react'
//import VideoChat from '@mui/icons-material/VideoChat';
import MoreVert from '@mui/icons-material/MoreVert';
import Call from '@mui/icons-material/Call';
const ChatHeader = () => {
  
  
  return (
    <>
        <div className='user-info'>
            <img src='https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' alt=''/>
            <div className='username'>
                <h3>Muhammed Aly</h3>
                <div className='status'>
                    <span className="dot online">online</span>
                </div>
            </div>
        </div>
        <div className='contact'>
            <Call className='call button'/>
            <MoreVert className='more button'/>
        </div>
    </>
  )
}

export default ChatHeader