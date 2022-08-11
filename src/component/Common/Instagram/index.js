import React,{useEffect,useState} from 'react'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { InstgramData } from './InstgramData';
import Heading from '../../Furniture/Heading'
import HeadingTwo from '../../Fashion/Heading'
import axios from 'axios'
import { apiurl, ImageUrl } from '../../../Redux/Utils/baseurl';
import { AdvertisementDetails } from '../../../Redux/Action/allActions';
import { useDispatch, useSelector } from 'react-redux';
import { Skeleton } from '@mui/material';
const InstgramSlider = ({ Images }) => {
  let dispatch=useDispatch()
  const [Products,setProducts]=useState([])
  const Advertisement=useSelector(state=>state.AllReducer.Advertisement)
  useEffect(()=>{
    dispatch(AdvertisementDetails())
  },[]) 

  return (
    <div className='advedisement-content'>
      <div className="container">
      {Advertisement.length>0 ? <div className="row">
          {Advertisement.slice(0,1).map((data) => {
            return (
              <>
              <div className='col-lg-6 ads-image'>
                <img src={ImageUrl+data.image1} />
              </div>
              <div className='col-lg-6 ads-image'>
                <img src={ImageUrl+data.image2} />
              </div>
              </>
            )
          })}
        </div>:
        <div className="row">
           {[...Array(2)].map(()=>
            <div className='col-lg-6 ads-image'>
           <Skeleton variant="rectangular"  height={300}  />
           </div>)}
        </div>
           }

      </div>
    </div>
  )
}

export default InstgramSlider