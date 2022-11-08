import React from 'react'
import Header from '../component/Common/Header'
import Footer from '../component/Common/Footer'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { ImageUrl } from '../Redux/Utils/baseurl'
import { useEffect } from 'react'
import Layout from '../component/MyAccountDashboard/Layout'
import { Contact_Us, MyBillsApi, RedeemedHistoryApi } from '../Redux/Action/allActions'
import { BrowserView,MobileView } from 'react-device-detect'
const RedeemHistoryComp = () => {
    let dispatch=useDispatch()
    const RedeemPoint=useSelector(state=>state.AllReducer.RedeemPoint)
    
    useEffect(()=>{
        dispatch(RedeemedHistoryApi())
    },[])


 
    return (
        <>
            <Header />
            <BrowserView>
            <Layout>
            <div className='container'>
            <h4 className='pt-3 pb-4 text-center'>Redeem History</h4>
               <div className='row'>
               <table className="table pending_table">
                            <thead className="thead-light">
                                <tr>
                                    <th scope="col">Date</th>
                                    <th scope="col">Redeem Points</th>
                                </tr>
                            </thead>
                           {RedeemPoint?.map((data)=>
                                <tbody>
                                <tr>
                                    <td><span>{data.date}</span></td>
                                    <td><span>{data.points_redeem}</span></td>
                                </tr>
                                </tbody>
                                )}
                        </table>
              </div>
              </div>
              </Layout>
              </BrowserView>

              <MobileView>
              <div className='container'>
            <h4 className='pt-3 pb-4 text-center'>Redeem History</h4>
               <div className='row'>
               <table className="table pending_table">
                            <thead className="thead-light">
                                <tr>
                                    <th scope="col">Date</th>
                                    <th scope="col">Redeem Points</th>
                                </tr>
                            </thead>
                           {RedeemPoint?.map((data)=>
                                <tbody>
                                <tr>
                                    <td><span>{data.date}</span></td>
                                    <td><span>{data.points_redeem}</span></td>
                                </tr>
                                </tbody>
                                )}
                        </table>
              </div>
              </div>
              </MobileView>
              
            <Footer />
        </>
    )
}

export default RedeemHistoryComp;