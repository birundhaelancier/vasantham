import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import HeadingTwo from '../../Fashion/Heading';
import { Carousel } from 'antd';

import img1 from '../../../assets/img/gracery/product10.jpg'
import img2 from '../../../assets/img/gracery/product12.jpg'
import img3 from '../../../assets/img/gracery/product10.jpg'
import img4 from '../../../assets/img/gracery/product4.jpg'
import img5 from '../../../assets/img/gracery/product5.jpg'
import img6 from '../../../assets/img/gracery/product6.jpg'
import img7 from '../../../assets/img/gracery/product7.jpg'
import img8 from '../../../assets/img/gracery/product8.jpg'
import img9 from '../../../assets/img/gracery/product12.jpg'
import img10 from '../../../assets/img/gracery/product9.jpg'
import img11 from '../../../assets/img/gracery/product10.jpg'
import offer from '../../../assets/img/gracery/offerimg.png'


const ProductSliderV4 = ({ image }) => {
	const InstgramData = [
		{
			img: img1,
			icon: "name",
			amt: "20.00"
		},
		{
			img: img4,
			icon: "name",
			amt: "20.00"
		},
		{
			img: img5,
			icon: "name",
			amt: "20.00"
		},
		{
			img: img6,
			icon: "name",
			amt: "20.00"
		},

	]
	const InstgramData1 = [

		{
			img: img3,
			icon: "name",
			amt: "20.00"
		},
		{
			img: img8,
			icon: "name",
			amt: "20.00"
		},
		{
			img: img9,
			icon: "name",
			amt: "20.00"
		},
		{
			img: img10,
			icon: "name",
			amt: "20.00"
		},

	]


	return (
		<div className="container">
			<div className="row">
				{/* <Carousel autoplay> */}
				<div className='add-view col-lg-12'>
					<img src={image} />
				</div>
				{/* </Carousel>, */}
			</div>
		</div>
	)
}

export default ProductSliderV4