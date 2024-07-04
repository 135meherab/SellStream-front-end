// src/components/Services.jsx
import React from 'react';
// import three from '../../assets/three.png'
import credit from '../../assets/creadit.png'
import arrow from '../../assets/arrow (1).png'

const Services = () => {
  return (
    <section className="sellstream-section">
      <div className="credit-container">
        <div className="sellstream-text">
          <p>Who Can Use Our Sellstream</p>
          <h1>Our Software is Capable for a Wide Range</h1>
          <h1>of Businesses and Industries</h1>
          <div className="divider">
            <ul className="arrow-list">
              <li>
                <span className="arrow-icon">
                  <img src={arrow} alt="" />
                </span>
                <span className="arrow-text">Retail Stores</span>
              </li>
              <li>
                <span className="arrow-icon">
                  <img src={arrow} alt="" />
                </span>
                <span className="arrow-text">Restaurants and Cafes</span>
              </li>
              <li>
                <span className="arrow-icon">
                  <img src={arrow} alt="" />
                </span>
                <span className="arrow-text">eCommerce Businesses</span>
              </li>
              <li>
                <span className="arrow-icon">
                  <img src={arrow} alt="" />
                </span>
                <span className="arrow-text">Grocery Stores</span>
              </li>
              <li>
                <span className="arrow-icon">
                  <img src={arrow} alt="" />
                </span>
                <span className="arrow-text">Hospitality and Hotels</span>
              </li>
              <li>
                <span className="arrow-icon">
                  <img src={arrow} alt="" />
                </span>
                <span className="arrow-text">And Many More..</span>
              </li>
            </ul>
          </div>
        </div >
        <img  className="credit-img" src={credit} alt="Credit Image" />
      </div>
    </section>
  );
};

export default Services;
