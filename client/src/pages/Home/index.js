import React from 'react'
import { useSelector } from 'react-redux';
import HeaderComponent from './HeaderComponent';
import Intro from './Intro';
import About from './About';
function Home() {
  const {portfolioData} = useSelector((state)=>state.root);

  return (
    <div>
      <HeaderComponent/>
      <Intro/>
      <About/>
    </div>
  )
}

export default Home
