import React, { useEffect, useState } from 'react'
import footerLogoSrc from '../../assets/white-logo.png';
import mernLogoSrc from '../../assets/mern.png';

const socialLinks = [
    {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/nayakdarshan/",
    },
    {
        name: "GitHub",
        url: "https://github.com/nayakdarshan/",
    },
    {
        name: "Instagram",
        url: "https://twitter.com/nayakdarshan",
    },
    {
        name:'WhatsApp',
        url:'https://wa.me/919000000000'
    },
    {
        name:'facebook',
        url:'https://www.facebook.com/nayakdarshan/'
    }
]
function FooterComponent() {
    const [icons, setIcons] = useState([]);

    useEffect(() => {
      const loadIcons = async () => {
        const loadedIcons = await Promise.all(
          socialLinks.map(async (link) => {
            try {
              const icon = await import(`../../assets/${link.name.toLowerCase()}.svg`);
              return { name: link.name, src: icon.default };
            } catch (error) {
              console.warn(`Icon for ${link.name} not found.`);
              return { name: link.name, src: '' }; // Return empty string if not found
            }
          })
        );
        setIcons(loadedIcons);
      };
  
      loadIcons();
    }, []);
  
    return (
      <div>
        <div className="container-fluid px-0">
          <div className="footer-section pb-2">
            <div className="container mx-auto">
              <div className='footer'>
                <div className='footer-logo-container opacity-75'>
                  <img src={footerLogoSrc} alt="logo" className="footer-logo" />
                </div>
                <div className="fs-18 fw-500 text-center mb-5 w-75 mx-auto opacity-75">
                  Living, learning, & leveling up one day at a time.
                </div>
                <div className="social-icons-container d-flex justify-content-center mb-4">
                  {icons.map((icon, index) => (
                    icon.src ? (
                      <a key={index} href={socialLinks[index].url} target="_blank" rel="noopener noreferrer" className="social-icon-link">
                        <img src={icon.src} alt={icon.name} className="social-icon" />
                      </a>
                    ) : null
                  ))}
                </div>
                <div className="fs-14 fw-500 text-center mt-5 mb-3 w-75 mx-auto opacity-75">
                  Handcrafted by © Darshan Nayak
                </div>
                <div className="fs-12 fw-300 text-center mt-5 w-75 mx-auto opacity-75 mern-text">
                  Made with
                </div>
                <div className='footer-logo-container mb-0'>
                  <img src={mernLogoSrc} alt="logo" className=" mern-logo" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}

export default FooterComponent
