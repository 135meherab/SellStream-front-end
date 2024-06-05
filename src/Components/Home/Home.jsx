import React from 'react'
import Navbars from './Navbar'
import Carousel from './Banner'
import Services from './Services'
import Pricing from './Pricing'
// import Review from './Review'
import Subscribe from './Subscribe'
import Footer from './Footer'
import About from './about'
import '../css/landpage.css'; // Assuming your CSS is in Navbar.css
import FAQ from './answer'

function Home() {
  return (
    <div>
        <Navbars/>
        <Carousel/>
        <About/>
        <Services/>
        <Pricing/>
        <FAQ/>
        {/* <Subscribe/> */}
        {/* <Review/> */}
        <Footer/>
    </div>
  )
}

export default Home