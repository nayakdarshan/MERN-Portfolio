import React from 'react'
import profileImg from '../../assets/darshan.jpg';
import heroImg from '../../assets/hero-devices.svg';
function Intro() {
  return (
    <div className='container-fluid h-90vh'>
        <div className='d-flex align-items-center justify-content-center'>
            <div className='d-flex align-items-center justify-content-center flex-column'>
                {/* <div className='fs-24 fw-500 text-center'>Hello! I am</div> */}
                <div className='fs-80 fw-500 text-center font-new lh-80'>Full Stack Developer</div>
                <div className='fs-24 fw-500 text-center w-75 mb-2'>I design and code beautifully simple things, and I love what I do.</div>
                <div className='profile-img-container mt-5'>
                    <img src={profileImg} loading='lazy' alt='darshan' className='profile-img'/>
                </div>
            </div>
        </div>
        <div className='container intro-img-container text-center'>
            <img src={heroImg} loading='lazy' alt='hero' className='intro-img'/>
        </div>
    </div>
  )
}

export default Intro
