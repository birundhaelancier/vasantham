// import React from 'react'
// import { Link } from 'react-router-dom';
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import Slider from "react-slick";
// import Image1 from '../../../assets/img/ban_02.jpg'
// const Banner = () => {
//   let settings = {
//     arrows: false,
//     dots: false,
//     infinite: true,
//     autoplay: true,
//     autoplaySpeed: 5000,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     responsive: [{
//       breakpoint: 1024,
//       settings: {
//         slidesToShow: 1,
//       }

//     },
//     {
//       breakpoint: 600,
//       settings: {
//         slidesToShow: 1,
//       }
//     },
//     {
//       breakpoint: 480,
//       settings: {
//         slidesToShow: 1,
//       }
//     }
//     ]
//   };
//   return (
//     <>
//       <section id="electronics_banner">
//         <div className="electronics_slider_box">
//           <Slider {...settings}>
//             <div className="electronics_slider el_bg_1" style={{backgroundImage:`url(${Image1})`}}>
//               <div className="container">
//                 <div className="row">
//                   <div className="col-lg-6 col-md-8 col-sm-12 col-12">
//                     <div className="electronics_slider_content">
//                       <h5> NEW TRENDING</h5>
//                       <h2>Collection <span>Headphone</span></h2>
//                       <h4>Introducing Apple Watch Series 4</h4>
//                       <Link to="/shop" className="theme-btn-one bg-black btn_sm">Shop Now</Link>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             <div className="electronics_slider el_bg_2">
//               <div className="container">
//                 <div className="row">
//                   <div className="col-lg-6">
//                     <div className="electronics_slider_content">
//                       <h5> NEW TRENDING</h5>
//                       <h2>Collection <span>Headphone</span></h2>
//                       <h4>Anti-Falling Of Design Sweatproof</h4>
//                       <Link to="/shop" className="theme-btn-one bg-black btn_sm">Shop Now</Link>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>

//           </Slider>
//         </div>
//       </section>
//     </>
//   )
// }

// export default Banner



import React, { useEffect,useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch,connect } from "react-redux";
import { Get_Slider_List } from '../../../Redux/Action/allActions' 
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
                    <a className="theme-btn-one bg-black btn_sm" onClick={()=>window.open(data.link)}>Shop Now</a>
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




