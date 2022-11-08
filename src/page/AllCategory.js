import React from 'react'
import Header from '../component/Common/Header'
import Footer from '../component/Common/Footer'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { ImageUrl } from '../Redux/Utils/baseurl'
const AllCategory = () => {
    const AllCategory=useSelector(state=>state.AllReducer.AllCategory)
    let history=useHistory()
    return (
        <>
            <Header />
            <div className='container'>
            <h3 className='pt-3 pb-4 text-center'>All Category</h3>
               <div className='row'>
               {AllCategory.map((item) => {
								return (
									<div className="pl-2 pr-2 mobile_category  custom_category col-lg-3 col-4 mt-3 mb-3">
										{/* <div className="ltn__testimonial-item ltn__testimonial-item-7">
											<div className="ltn__testimoni-info"> */}
                                            <div onClick={()=>history.push(`/shop/${item.slug}`)}><img src={ImageUrl+item.photo || Image}/></div>
												<p>
												{item.name} 
												</p>	
											{/* </div>
										</div> */}
									</div>
								)
							})}
              </div>
              </div>
            <Footer />
        </>
    )
}

export default AllCategory