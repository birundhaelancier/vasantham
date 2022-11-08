
import React, { useEffect,useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch,connect } from "react-redux";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ImageUrl } from '../../../Redux/Utils/baseurl';
import axios from 'axios'
import { apiurl } from '../../../Redux/Utils/baseurl';
import Skeleton from '@mui/material/Skeleton';
const Banner = (props) => {
    let dispatch=useDispatch()
    const [Sliderlist,setSliderlist]=useState([])
    let settings = {
        arrows: false,
        dots: false,
        infinite: true,
        autoplay: true,
        // autoplaySpeed:1000,
        speed: 1000,
        slidesToShow: 1,
        // slide: 'div',
        slidesToScroll: 1,
        swipeToSlide: true,
        responsive: [{
            breakpoint: 1024,
            settings: {
              slidesToShow: 1,
            }
       
          },
           {
            breakpoint: 600, 
            settings: {
              slidesToShow: 1,
            }
          },
           {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
            }
          }
        ]
      };

      useEffect(()=>{
          axios({
              method: 'get',
              url:apiurl+"slider",
          })
          .then((response) => {
              setSliderlist(response.data)
          })
      },[]) 

    return (
        <section id="furniture_banner" className='banner_slide'>
        <div className="furniture_slider_box">
        {Sliderlist.length>0?<Slider {...settings} autoplay={true}>
         {Sliderlist.map((data,index)=>{
              return(
           <div >        
          <div className="furniture_slider background_bg bg_1" style={{backgroundImage:`url(${ImageUrl+data?.photo})`}}>
            <div className="container">
              <div className="row">
                <div className="col-lg-9 col-md-9 col-sm-12 col-12">
                  <div className="furniture_slider_content">
                    {/* <h5> NEW TRENDING</h5> */}
                    <h2> {data.title}</h2>
                    <p>{data?.details}</p>
                    <a className="theme-btn-one bg-black btn_sm" href={data.link}>Shop Now</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          </div> 
      )})}
          </Slider>:
          <Skeleton variant="rectangular" width={"100%"} height={350} />}
        </div>
      </section>

    )
}


export default Banner;




