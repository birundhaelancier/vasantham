import React from 'react'
import Header from '../component/Common/Header'
import Footer from '../component/Common/Footer'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { ImageUrl } from '../Redux/Utils/baseurl'
import { useEffect } from 'react'
import { Contact_Us } from '../Redux/Action/allActions'
const ContactUs = () => {
    let dispatch=useDispatch()
    // const ContactDet=useSelector(state=>state.AllReducer.Contact_us)

    useEffect(()=>{
        dispatch(Contact_Us())
    },[])

    const ContactDet=[
        {
            branch: "Bypass",
            address: "Vasantham Hyper Mart\r\n30-C, Rakesh Towers,\r\nBypass Road, Madurai - 625016.",
            phone: "9047053288"
        },
        {
            branch: "Kalavasal",
            address: "Vasantham Super Mart\r\n90/1, Theni Main Road,\r\nKalavasal, Madurai - 625016.",
            phone: "0452 - 3500828,9095230051"
        },
        {
            branch: "Virattipathu",
            address: "Vasantham Hyper Mart\r\n123/10, Theni  Main Road,\r\nVirattipathu, Madurai - 625016",
            phone: "0452 - 2323288"
        },
        {
            branch: "K pudur",
            address: "Vasantham Mini Mart\r\n20/1, Matha kovil Main Road,\r\nK.Pudur, Madurai - 625007.",
            phone: "0452 - 3559364"
        },
        {
            branch: "Vilangudi",
            address: " 23,Meenakshi Nagar,Solaimalai Building Basement, Vilangudi Madurai-625018",
            phone: "9786660174"
        },
        {
            branch: "SHANTHI NAGAR",
            address: "VASANTHAM SUPER MARKET NO.48,PALAMEDU MAIN ROAD,SHANTHI NAGAR,MADURAI-625018 ",
            phone: "9786660114"
        },
        {
            branch: "Sikkandar Chavadi",
            address: "3/305,Alanganallur main road, Sikkandar Chavadi,Madurai-625018.",
            phone: "9786660711"
        },
        {
            branch: "Moondrumavadi,K pudur",
            address: "Moondrumavadi , Vasantham Hyper Mart 7, Annai Nagar 2 nd Street, parasurampatti Madurai North, Moondrumavadi, K pudur, Madurai - 625007",
            phone: "8925802417"
        }
    ]

    return (
        <>
            <Header />
            <div className='container'>
            <h4 className='pt-3 pb-4 text-center'>Contact Us</h4>
               <div className='row'>
               {ContactDet?.map((item) => {
								return (
								 <div className='contact_div'>
                                   <label>{item.branch}</label>
                                   <label><i class="fa fa-map-marker" aria-hidden="true"></i> {item.address}</label>
                                   <label><i class="fa fa-phone" aria-hidden="true"></i> <a href={`tel:${item.phone}`}><tel>{item.phone}</tel></a></label>
                                 </div>
								)
							})}
                             <div className='contact_div'>
                                   <div>Other</div>
                                   <label><i class="fa fa-phone" aria-hidden="true"></i> Diwali Surprise: <a href={`tel:${"9047183288"}`}><tel>{"9047183288"}</tel></a></label>
                                   <label><i class="fa fa-phone" aria-hidden="true"></i> Whatsapp Order: <a href={`tel:${"9095230051"}`}><tel>{"9095230051"}</tel></a></label>
                                   <label><i class="fa fa-phone" aria-hidden="true"></i> Customer Care:  <a href={`tel:${"6381594409"}`}><tel>{"6381594409"}</tel></a></label>
                            </div>
              </div>
              </div>
            <Footer />
        </>
    )
}

export default ContactUs