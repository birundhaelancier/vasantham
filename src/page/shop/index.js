import React,{useState,useEffect} from 'react'
import Header from '../../component/Common/Header'
import Shop from '../../component/Shop/Shop'
import InstgramSlider from '../../component/Common/Instagram'
import Footer from '../../component/Common/Footer'
import { useParams } from 'react-router-dom'
import { useDispatch,connect } from 'react-redux'
import { CategoryList_api } from '../../Redux/Action/allActions'
import Banner from '../../component/Electronics/Banner'

const ShopGrid = (props) => {
    let { slug } =useParams()
    let dispatch=useDispatch()
    const [Products,setProducts]=useState([])
    useEffect(()=>{
        dispatch(CategoryList_api(slug))
    },[slug])    
    useEffect(()=>{
     setProducts(props.Category_List)
    },[props.Category_List])
    return (
        <>
            <Header />
            {/* <Banner title="Shop" /> */}
            <Shop ProductsData={Products}/>
            {/* <InstgramSlider /> */}
            <Footer />
        </>
    )
}


const mapStateToProps = (state) =>
({
    Category_List: state.AllReducer.Category_List || [],
});
export default connect(mapStateToProps)(ShopGrid);
