import React,{useEffect,useState} from 'react'
import Header from '../../component/Common/Header'
import Banner from '../../component/Common/Banner'
import ProductDetailsOne from '../../component/Common/ProductDetails/ProductDetails'
import RelatedProductComp from '../../component/Common/ProductDetails/RelatedProduct'
import Footer from '../../component/Common/Footer'
import { Related_Products } from '../../Redux/Action/allActions'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

const ProductDetails = () => {
    let { productid } =useParams()
    let dispatch=useDispatch()
    const Related_list=useSelector(state=>state.AllReducer.Related_list)

    useEffect(()=>{
        dispatch(Related_Products(productid))
    },[productid])

    return (
        <>
            <Header />
            {/* <Banner title="Product Details" /> */}
            <ProductDetailsOne />
            <RelatedProductComp RelatedProduct={Related_list}/>
            <Footer />
        </>
    )
}

export default ProductDetails