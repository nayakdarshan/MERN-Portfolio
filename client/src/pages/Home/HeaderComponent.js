import React from 'react';
import { useNavigate } from 'react-router-dom';
import logoSrc from '../../assets/purple-logo.png';
import closeSrc from '../../assets/close.svg';
const HeaderComponent = ({isContact}) => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/contact');
  };
  return (
    <div className='container-fluid'>
        <div className='d-flex align-items-center justify-content-between header h-10vh'>
            <div className="logo">
            <img src={logoSrc} alt="logo" className="portfolio-logo" />
            </div>
            {!isContact && (
              <div className="">
                <button className='primary-button' onClick={handleButtonClick}>Say Hello</button>
              </div>
            )}
            {isContact && (
              <div className="close-icon-container">
                <img src={closeSrc} alt="close" className="close-icon" />
              </div>
            )}
            
        </div>
    </div>
  )
}

export default HeaderComponent
