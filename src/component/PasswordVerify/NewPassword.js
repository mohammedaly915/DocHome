import React from 'react'
import { Link } from 'react-router-dom'

const NewPassword = () => {
  return (
    <div className='back'>
    <div className='box'>
        <h1>New password</h1>
        <p>Here you can set new password for signing in to DocHome</p>
        <form>
            <input type='password' className='inputs' placeholder='New Password'/>
            <input type='text' className='inputs' placeholder='Confirm Password'/>
            <Link to='/login' className='button'>Send</Link>
        </form>
    </div>
</div>
  )
}

export default NewPassword