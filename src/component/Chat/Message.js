import React from 'react'

const Message = ({chat}) => {
  return (
    <>
      {/* <div className='otherMsg'>
           <img src='https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' className='avatar' alt='avatar'/> }
          <div className='msg'>
            <p className='content'>hi my dear</p>
          </div>
        </div> 
      */}
        {chat.messages.map((message)=>
        (<div className={message.sender_id===1? "myMsg":"otherMsg"}>
          <div className='msg'>
            <div className={message.sender_id !==1 && 'name'}>Dr/jone</div>
            <div className='content'>
                <p>{message.content}</p>
              </div>
            <div className='time'>20:10pm</div>
          </div>
        </div>))}
    </>
  )
}

export default Message