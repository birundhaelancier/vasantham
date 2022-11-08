import React,{useEffect, useState} from 'react'
import { useSelector } from "react-redux";
import { apiurl, ImageUrl } from '../../../Redux/Utils/baseurl';
import axios from 'axios'
import Heading from '../../Heading';
import ProductCard from '../../Common/Product/ProductCard'
const TopPRoduct = () => {
    const [headings,setheadings]=useState([])

    const [Products,setProducts]=useState({
        best:{
            product:[],
            advertisement:[]
        },
        feature:{
            product:[],
            advertisement:[]
        },
        flash_deal:{
            product:[],
            advertisement:[]
        },
        new:{
            product:[],
            advertisement:[]
        },
        top:{
            product:[],
            advertisement:[]
        },
       
    })

   

    const [productList, setProductList]=useState([])

    useEffect(()=>{
        axios({
            method: 'get',
            url:apiurl+"homeAds",
        })
        .then((response)=>{
            response?.data?.map((val)=>{
                Object.keys(Products).map((data)=>{
                if(val.id===FilterDataFun(data)){
                  Products[data].advertisement.push(val)
                }
                })
                setProducts((prevState) => ({
                    ...prevState,
                }));
            })
        })

        axios({
            method: 'post',
            url:apiurl+"homeProduct",
            data:{"type":"hot"}
        })
        .then((response) => {
            let array=[]
            setheadings(response?.data?.heading)
            response?.data?.products.map((val)=>{
            if(val.is_type!=="new"){
                Object.keys(Products).filter((data)=>{
                    if(val.is_type===data){
                      Products[data].product?.push(val)
                    }
                })
            }
                setProducts((prevState) => ({
                    ...prevState,
                }));
            })
            setProductList(array)
           
        })
        },[]) 

        const FilterDataFun=(value)=>{
            switch (value) {
                case "top":return 6;
                case "best":return 2;
                case "flash_deal":return 4;
                case "feature":return 3;
                // case "new":return 5;
                default:return "";
            }           
       }
       const HeaderFun=(value)=>{
        switch (value) {
            case "top":return "Top Products";
            case "best":return "Best Products";
            case "flash_deal":return "Flash Deals";
            case "feature":return "Featured Products";
            // case "new":return "New Arrivals";
            default:return "";
        }           
      }

    return (
        <>
            <section id="electronics_top_product" className="pb-30 products container">
                <div className="container">
                         <div className="row">
                        <div className="col-lg-12">
                            <div className="tabs_el_wrapper">
                                <div className="tab-content">
                                    <div  className="tab-pane fade show in active">
                                        <div className="row lists_product">
                                        {Object.keys(Products).map((data,dd)=>
                                        <>
                                        {/* hheader */}
                                            <div className="col-lg-12">
                                              <div className="left_heading_three">
                                              <Heading heading={HeaderFun(headings[dd]?.is_type)} para="Mauris luctus nisi sapien tristique dignissim" />
                                              </div>
                                               </div>
                                        {/* header end */}
                                                 {Products[data]["product"].map((pro,ind)=>
                                                <div className="col-lg-2 col-md-4 col-sm-6 col-6" key={ind}>
                                                    <ProductCard data={pro} />
                                                </div>
                                                )}

                                                      <div className='advedisement-content'>
                                                                                      <div className="container">
                                                                    <div className="row">
                                                                    {Products[data].advertisement.map((val,index)=>{
                                                                       
                                                                    return (
                                                                        <>
                                                                    <div className='col-lg-6   ads-image'>
                                                                    <img src={ImageUrl+val.image1} />
                                                                    </div>
                                                                    <div className='col-lg-6  ads-image'>
                                                                    <img src={ImageUrl+val.image2} />
                                                                    </div>
                                                                       </>
                                                                    )
                                                                    })}
                                                               </div>
                                                              </div>
                                                             </div> 
                                            </>
                                            )}

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


               


                    {/* </>
                        )})} */}
                </div>
            </section>
        </>
    )
}

export default TopPRoduct