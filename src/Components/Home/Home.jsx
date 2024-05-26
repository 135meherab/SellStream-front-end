import React from 'react'
import Navbar from './Navbar'
import Banner from './Banner'
import Services from './Services'
import Pricing from './Pricing'
// import Review from './Review'
import Subscribe from './Subscribe'
import Footer from './Footer'

function Home() {
  return (
    <div>
        <Navbar/>
        <Banner/>
        <Services/>
        <Pricing/>
        <Subscribe/>
        {/* <Review/> */}
        <Footer/>
    </div>
  )
}

export default Home