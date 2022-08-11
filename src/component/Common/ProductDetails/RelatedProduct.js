

import React,{useEffect,useState} from 'react'
import { Link } from 'react-router-dom'
import Heading from '../../Fashion/Heading';
 import ProductCards from '../Product/ProductCard'
import axios from 'axios'
const RelatedProducts = ({RelatedProduct}) => {

    return (
        <>
        {RelatedProduct.length>0 &&
        <section id="product_variation_one" className="pt-2 sort_list">
        <div className="container-fluid">
        <Heading heading="Related Products"/>

                <div className="row">
                 {RelatedProduct&&RelatedProduct.slice(0,6).map((data,index)=>{
                     return(
                        <div className="col-lg-2 col-md-4 col-sm-6 col-6" key={index} >
                             <ProductCards data={data} />
                        </div>
                    )})}
               </div>
        </div>
        </section>}
        </>
    )
}

export default RelatedProducts;