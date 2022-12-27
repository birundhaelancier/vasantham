
import React,{useEffect} from 'react'
import Heading from '../../Fashion/Heading';
import { Get_HomeProduct_List } from '../../../Redux/Action/allActions' 
import { useDispatch, useSelector } from 'react-redux' 
 import ProductCards from '../Product/ProductCard'
 import { Skeleton } from '@mui/material';
import axios from 'axios'
const RelatedProducts = (props) => {
    let dispatch=useDispatch()
    const ArrivalList=useSelector((state)=>state.AllReducer.Products)
    useEffect(()=>{
        dispatch(Get_HomeProduct_List("new"))
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