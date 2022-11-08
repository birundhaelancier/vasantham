import React, { useEffect, useState } from 'react'
import ProductCard from '../Common/Product/ProductCard'
import { useSelector,useDispatch,connect } from "react-redux";
import Slider from "react-slick";
import { useParams } from 'react-router-dom';
import { CategoryList_api } from '../../Redux/Action/allActions';

const Shop = (props) => {
  let { slug } =useParams()
  let [loading,setloading]=useState(true)
  const [products,setProducts]=useState([])
  let dispatch=useDispatch()
  const [product_slide,setproduct_slide]=useState(0)

  useEffect(()=>{
      setloading(true)
      dispatch(CategoryList_api(slug)).then((res)=>{
          if(res){
            setloading(false)
          }
      })
  },[slug])  

  useEffect(()=>{
    setProducts(props.Category_List)
    if(props.Category_List){
      setproduct_slide(0)
    }
   },[props.Category_List])


let settings = {
  customPaging:function(i) {
    return (        
      <div  className="pagination">
        <div className={`page-item ${i===product_slide? "active":""}`} onClick={()=>setproduct_slide(i)}><a className="page-link">{i+1}</a></div>
      </div>
    );
  },
  arrows: false,
  dots: true,
  infinite: false,
  slidesToShow:4,
  slidesToScroll: 1,
  accessibility: false,
  rows:products?.products?.length>6?2:1,
  responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,         

        }
      }, 
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          customPaging:function(i) {
            return (        
              <div  className="">
               <button className={`page-item ${i===product_slide? "active":""}`} onClick={()=>setproduct_slide(i)}>{i + 1}</button>
              </div>
            );
          },
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          customPaging:function(i) {
            return (        
              <div  className="">
               <button className={`page-item ${i===product_slide? "active":""}`} onClick={()=>setproduct_slide(i)}>{i + 1}</button>
              </div>
            );
          },
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          rows: 2,
          dots: true,
          customPaging:function(i) {
            return (        
              <div  className="">
               <button className={`page-item ${i===product_slide? "active":""}`} onClick={()=>setproduct_slide(i)}>{i + 1}</button>
              </div>
            );
          },
        }
      },
    ]
};

    return (
        <>
            <section id="shop_main_area" className="pt-4 pb-100 sort_list">
                <div className="container">
                    {!loading ?
                    <div>
                    <Slider {...settings}>
                        {products?.products?.map((data, index) => (
                                <ProductCard data={data} />
                        ))}
                        </Slider>
                      </div>
                      :
                      <div className='shop_loader'>
                         <i class="fa fa-circle-o-notch fa-spin"></i>
                      </div>  
                    }
                     
                </div>
            </section>
        </>
    )
}

const mapStateToProps = (state) =>
({
    Category_List: state.AllReducer.Category_List || [],
});
export default connect(mapStateToProps)(Shop);