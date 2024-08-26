import React from 'react'
import { useSelector } from 'react-redux';
import HeaderComponent from './HeaderComponent';
import Intro from './Intro';
import About from './About';
import Experience from './Experience';
import Certifications from './Certifications';
import Projects from './Projects';
import Collab from './Collab';
import FooterComponent from './FooterComponent';
function Home() {
  const {portfolioData} = useSelector((state)=>state.root);

  return (
    <div>
      <HeaderComponent isContact={false}/>
      <Intro/>
      <About/>
      <Experience/>
      <Certifications/>

      {/* <Projects/> */}
      <Collab/>
      <FooterComponent/>
    </div>
  )
}

export default Home
