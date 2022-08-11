import React, { useState, useEffect } from 'react';
import Slider from "react-slick";
import { useDispatch, useSelector } from 'react-redux';
import { Category_List } from '../../../Redux/Action/allActions';
import Image from '../../../assets/img/dummy.jpg'
import { ImageUrl } from '../../../Redux/Utils/baseurl';
const CategoryComp = ({ home_offers }) => {
    const AllCategory=useSelector(state=>state.AllReducer.AllCategory)
    let dispatch = useDispatch();
	const [feed_list,setFeed_list]=useState([])
	let imagealt = 'image';
	const [slideNumber, setSlideNumber] = useState(3)
	var settings = {
		arrows:false,
		autoplay:true,
		dots: false,
		infinite: false,
		speed: 500,
		slidesToShow: 5,
		slidesToScroll: 1
	};

	useEffect(() => {
		if (window.innerWidth >= 550 && window.innerWidth <= 1000) {
		  setSlideNumber(2)
		} else if (window.innerWidth < 549) {
		  setSlideNumber(1)
		} else if (window.innerWidth >= 1001) {
		  setSlideNumber(3)
		}
	  }, [slideNumber])

	useEffect(()=>{
		dispatch(Category_List())
	},[])

	return (
		<div className="ltn__testimonial-area section-bg-1--- bg-image-top pt-115 pb-70 mblcart">
				{/* <div className="row ltn__testimonial-slider-5-active slick-arrow-1"> */}
				<div className="">
					<div className='product-slider-container pt-2'>
						<Slider {...settings}>
							{AllCategory.map((item) => {
								return (
									<div className="pl-2 pr-2 mobile_category">
										{/* <div className="ltn__testimonial-item ltn__testimonial-item-7">
											<div className="ltn__testimoni-info"> */}
                                            <div><img src={ImageUrl+item.photo || Image}/></div>
												<p>
												{item.name} 
												</p>
												
											{/* </div>
										</div> */}
									</div>
								)
							})}
						</Slider>
					</div>

				</div>
			</div>
	)
}

export default CategoryComp;