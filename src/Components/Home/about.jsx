import React from "react";
// import shop from '../../assets/shop.svg'
// import setup from '../../assets/setup.svg'
// import price from '../../assets/price.svg'
// import ui from '../../assets/ui.svg'
import shop from '../../assets/shop.svg'
import setup from '../../assets/setup.svg'
import price from '../../assets/price_bar.svg'
import ui from '../../assets/ui.svg'


const About = () =>{
    return (
        <section className="p-0 m-0">
            <div className="grow">
                <h5>Grow Your Business with Sellstream</h5>
                <h1>Delightfully Simple And Deceptively </h1>
                <h1>Our Point of Sell System</h1>
            </div>
            <div className="type">
                <div className="card">
                    <img src={shop} alt="" />
                    <h5>Suitable For All Types Businesses</h5>
                    <p>Our POS system is super easy for any business. It's simple, hassle-free, and works great for everyone, no stress.</p>
                </div>
                <div className="card">
                    <img src={setup} alt="" />
                    <h5>Cost Effective With Affordable Price</h5>
                    <p>Great value for your money with our affordable POS solution, designed to meet all your business needs efficiently.</p>
                </div>
                <div className="card">
                    <img src={price} alt="" />
                    <h5>Easy to Setup & No IT knowledge Needed</h5>
                    <p>Simplify your operations with our user-friendly POS system, designed for effortless setup and no need for IT expertise.</p>
                </div>
                <div className="card">
                    <img src={ui} alt="" />
                    <h5>Modern & Attractive User Dashboard</h5>
                    <p>Our POS system has a cool and easy dashboard that helps you do your work quickly and easily.</p>
                </div>
            </div>
        </section>
    );
};

export default About