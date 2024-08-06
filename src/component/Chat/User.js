import React from 'react'

const User = () => {
  const msg="Send me a picture of the prescription";
  return (
    <div className='user'>
        <img src='https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' alt=''/>
        <div className='content'>
            <h2>Dr/John doe</h2>
            <div className='msg'>{msg.slice(0,20)}...</div>
        </div>

    </div>
  )
}

export default User