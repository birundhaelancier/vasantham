// import React,{ useState,useEffect } from 'react'
// import ProductCard from '../Product/ProductCard'
// import { useSelector } from "react-redux";
// import Heading from '../../Fashion/Heading'
// import axios from 'axios'
// import { apiurl } from '../../../Redux/Utils/baseurl';
// const RelatedProduct = () => {
//     const [Products,setProducts]=useState([])
//     useEffect(()=>{
//         axios({
//             method: 'post',
//             url:apiurl+"homeProduct",
//             data:{"type":"hot"}
//         })
//         .then((response) => {
//             setProducts(response.data.products)
//         })
//     },[]) 
//     console.log(Products,"Productsdddddddddddd")
//     return (
//         <>
//             <section id="related_product" className="pb-50">
//                 <div className="container">
//                     <Heading heading="You Might Also Like" para="Mauris luctus nisi sapien tristique dignissim ornare" />
//                     <div className="row">
//                         {Products.length>0 && Products?.map((data, index) => (
//                             <div className="col-lg-2 col-md-4 col-sm-6 col-6" key={index} >
//                                 <ProductCard data={data} />
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//             </section>
//         </>
//     )
// }

// export default RelatedProduct

import React,{useEffect,useState} from 'react'
import { Link } from 'react-router-dom'
import Heading from '../../Fashion/Heading';
import { Get_HomeProduct_List } from '../../../Redux/Action/allActions' 
import { connect,useDispatch } from 'react-redux' 
import { apiurl, ImageUrl } from '../../../Redux/Utils/baseurl'
 import ProductCards from '../Product/ProductCard'
 import { Skeleton } from '@mui/material';
import axios from 'axios'
const RelatedProducts = (props) => {
    const [ArrivalList,setArrivalList]=useState([])

    useEffect(()=>{
        axios({
            method: 'post',
            url:apiurl+"homeProduct",
            data:{
                type:"new"
            }
        })
        .then((response) => {
            setArrivalList(response?.data)
        })
    },[])  
    
    return (
        <>
        <section id="product_variation_one" className="pt-4 sort_list container">
        <div className="container-fluid">
        <Heading heading="New Arrivals" />

        {ArrivalList.length>0 ? 
        <div className="row">
                 {ArrivalList.slice(0,12).map((data,index)=>{
                     return(
                        <div className="col-lg-2 col-md-4 col-sm-6 col-6" key={index} >
                             <ProductCards data={data} />
                        </div>
                    )})}
               </div>:

               <div className="row pt-4">
                              {[...Array(6)].map(()=>{
                              return(
                                 <div className="col-lg-2 col-md-6 col-sm-6 col-xs-6 col-6">
                                     <Skeleton variant="rectangular"  height={200}  />
                                     <Skeleton animation="wave" height={15} style={{ marginTop:8 }} />
                                     <div style={{textAlign:"center",display:"flex",justifyContent:"center"  }}><Skeleton animation="wave" height={15} width="80%" style={{ marginTop:8,textAlign:"center"  }}/></div>
                                 </div>
                               )
                        })}
            </div>
            
            }
        </div>
        </section>
        </>
    )
}

export default RelatedProducts;