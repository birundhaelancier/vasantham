import React from 'react'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { InstgramData } from './InstgramData';
import Heading from '../../Furniture/Heading'
import HeadingTwo from '../../Fashion/Heading'

const InstgramSlider = ({ Images }) => {
  console.log(Images,"Images")

  return (
    <div className='advedisement-content'>
      <div className="container">
        <div className="row">
          {Images && Images.map((data) => {
            return (
              <div className='col-lg-6  ads-image'>
                <img src={data.img} />
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default InstgramSlider