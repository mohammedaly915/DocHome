import React from 'react'
import FileUpload from '@mui/icons-material/FileUpload';
const CustomUpload = ({i}) => {
  return (
    <div className='custom_upload'>
        <input id={`upload${i}`} type='file'/>
        <label htmlFor={`upload${i}`} className='upload'><FileUpload/>upload</label>
    </div>
  )
}

export default CustomUpload