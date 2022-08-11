import React, { useEffect, useState } from 'react'
import ProductCard from '../Common/Product/ProductCard'
import Filter from './Filter'
import { useSelector,useDispatch,connect } from "react-redux";
import { CategoryList_api } from '../../Redux/Action/allActions'
import Slider from "react-slick";

const Shop = (props) => {
     let dispatch=useDispatch()
    const [products, setProducts] = useState([])
    const [product_slide,setproduct_slide]=useState(0)
    const [FilterProduct,setFilterProduct]=useState([])
    const [page, setPage] = useState(1)
    // let allData = [...useSelector((state) => state.products.products)];

    const randProduct = (page) => {
        if (page) {
            let data = products?.products.sort((a, b) => 0.5 - Math.random())
            setFilterProduct(data);
            setPage(page);
        }
    }
    
useEffect(()=>{
 setProducts(props.ProductsData)
 if(props.ProductsData){
  setproduct_slide(0)
 }
},[props.ProductsData])

let settings = {
  customPaging: function(i) {
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
  // variableWidth:true,
  rows:products?.products?.length>6?2:1,
  // slidesPerRow: 2,
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
          rows: 2,
        }
      },
    ]
};
    return (
        <>
            <section id="shop_main_area" className="pt-4 pb-100 sort_list">
                <div className="container">
                    {/* <Filter filterEvent={randProduct}/> */}
                    {/* <div className="row"> */}
                    {products?.products?.length>0 && 
                    <div>
                    <Slider {...settings}>
                        {products?.products?.map((data, index) => (
                            // <div className="col-lg-3 col-md-4 col-sm-6 col-12" key={index}>
                                <ProductCard data={data} />
                            //  </div>
                        ))}
                        </Slider>
                      </div>
                        }
                         {/* <div className="col-lg-12">
                            <ul className="pagination">
                                <li className="page-item" onClick={(e) => { randProduct(page > 1 ? page - 1 : 0) }}>
                                    <a className="page-link" href="#!" aria-label="Previous">
                                        <span aria-hidden="true">«</span>
                                    </a>
                                </li>
                                <li className={"page-item " + (page === 1 ? "active" : null)} onClick={(e) => { randProduct(1) }}><a className="page-link" href="#!">1</a></li>
                                <li className={"page-item " + (page === 2 ? "active" : null)} onClick={(e) => { randProduct(2) }}><a className="page-link" href="#!">2</a></li>
                                <li className={"page-item " + (page === 3 ? "active" : null)} onClick={(e) => { randProduct(3) }}><a className="page-link" href="#!">3</a></li>
                                <li className="page-item" onClick={(e) => { randProduct(page < 3 ? page + 1 : 0) }}>
                                    <a className="page-link" href="#!" aria-label="Next">
                                        <span aria-hidden="true">»</span>
                                    </a>
                                </li>
                            </ul>
                        </div>  */}
                     {/* </div>  */}
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