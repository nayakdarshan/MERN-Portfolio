import React from 'react'
import HeaderComponent from '../Home/HeaderComponent'

const Contact =({iscontact}) =>{
  return (
    <div>
        <HeaderComponent isContact={iscontact || true}/>
        <pre>{iscontact}</pre>
    </div>
  )
}

export default Contact
