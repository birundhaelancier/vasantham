import React,{useEffect,useState} from 'react'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import ProductCard from '../../Common/Product/ProductCard'
import { useSelector } from "react-redux";
import axios from 'axios'
import { apiurl } from '../../../Redux/Utils/baseurl';
const DealProduct = () => {
  let products = useSelector((state) => state?.products?.products);
  products = products?.filter(item => item?.category === 'electronics')
	// const [slideNumber, setSlideNumber] = useState(3)
  let settings = {
    arrows: false,
    dots: false,
    margin: 30,
    infinite: false,
    autoplay: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 2,
    responsive: [{

      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
      }
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 2,
      }
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 2,
      }
    },
    ]
  };
  const [Products,setProducts]=useState([])
  useEffect(()=>{
      axios({
          method: 'post',
          url:apiurl+"homeProduct",
          data:{"type":"deal"}
      })
      .then((response) => {
          setProducts(response.data)
      })
      },[]) 
  return (
    <>
       {Products.length>0 &&<section id="elce_weekly_deal" className="slider_arrows_one">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className="left_heading_three">
              <h2>Deals Products</h2>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <div className="elce_weekly_slider">
                <Slider {...settings}>
                  {Products?.map((data, index) => (
                    <ProductCard data={data} key={index} styles={"slider"} />
                  ))}
                </Slider>
              </div>
            </div>
          </div>
        </div>
      </section>}
    </>
  )
}

export default DealProduct