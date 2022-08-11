import React, { useEffect } from 'react'
import Header from '../component/Common/Header'
import Banner from '../component/Electronics/Banner'
import BannerBootom from '../component/Electronics/BannerBottom'
import TopPRoduct from '../component/Electronics/TotProduct'
import Offer from '../component/Electronics/Offer'
import DealProduct from '../component/Electronics/DealProduct'
import InstgramSlider from '../component/Common/Instagram'
import ProductSliderV4 from '../component/Electronics/Imagesbg/index'
import Footer from '../component/Common/Footer'
import NewArrival from '../component/Common/ProductDetails/NewArrivals';
import { GetTypes } from '../Redux/Action/allActions';
import { useDispatch } from 'react-redux'
import CategoryComp from '../component/Common/Header/CategoryMobile'

const Electronics = () => {
    let dispatch = useDispatch
    // useEffect(() => {
    //     dispatch(GetTypes())
    // }, [])
    const botlink = "https://www.jiomart.com/images/cms/aw_rbslider/slides/1624041574_web_static.jpg";
    const top = "https://www.jiomart.com/images/cms/aw_rbslider/slides/1641391589_Free-Home-delivery-Strip-Design-1250-X-150.jpg";

    const gridImages = [
        {
            img: "https://www.jiomart.com/images/cms/aw_rbslider/slides/1646413337_600x350-Cheesy-Specials.jpg"
        },
        {
            img: "https://www.jiomart.com/images/cms/aw_rbslider/slides/1641895879_Dry_Fruits__Seeds_600x350.jpg"
        },
        
    ]


    const gridView = [{
        img: "https://www.jiomart.com/images/cms/aw_rbslider/slides/1644180093_600x350.jpg"
    },
    {
        img: "https://www.jiomart.com/images/cms/aw_rbslider/slides/1646412486_Jio-Mart-Banner-600x350-Opt3.jpg"
    }
  ]

    return (
        <>
            <Header />
            <CategoryComp/>
            <Banner />
            <NewArrival />
            <InstgramSlider />
            <TopPRoduct />
            {/* <InstgramSlider Images={gridView} /> */}

            {/* <ProductSliderV4 image={botlink} /> */}
            <DealProduct />
            {/* <Offer /> */}
            {/* <ProductSliderV4 image={top} /> */}
            {/* <DealProduct /> */}
            <Footer />
        </>
    )
}

export default Electronics