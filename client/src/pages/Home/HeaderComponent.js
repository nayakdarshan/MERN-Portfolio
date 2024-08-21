import React from 'react'

function HeaderComponent() {
  return (
    <div className='container-fluid'>
        <div className='d-flex align-items-center justify-content-between header h-10vh'>
            <div className="logo">
                logo
            </div>
            <div className="">
                <button className='primary-button'>Say Hello</button>
            </div>
        </div>
    </div>
  )
}

export default HeaderComponent
