import React from 'react'
import './Banner.css'
function Banner() {
  return (

    <div className="hero">
    <img className="hero-bg" src="https://source.unsplash.com/random/1920x1080" alt="Background Image"/>
    <div className="hero-content">
      <h1 className="hero-title">Welcome to Our Bylaws Website</h1>
      <p className="hero-description">Discover and Explore the Society's Bylaws</p>
    </div>
  </div>
     )
}

export default Banner