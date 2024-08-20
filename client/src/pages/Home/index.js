import React from 'react'
import { useSelector } from 'react-redux';

function Home() {
  const {portfolioData} = useSelector((state)=>state.root);

  return (
    <div>
      Home
      <pre>{JSON.stringify(portfolioData, null, 2)}</pre>   
       </div>
  )
}

export default Home
