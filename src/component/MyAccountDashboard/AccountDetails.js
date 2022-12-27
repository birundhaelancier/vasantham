import React,{useState,useEffect} from 'react'
import { useDispatch,connect, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Profile_Details } from '../../Redux/Action/allActions'
const Profile = (props) => {
    let dispatch=useDispatch()
    const profileDetails=useSelector(state=>state.AllReducer.ProfileData?.users)
    const ProfileData={
            first_name:"First Name",
            last_name:"Last Name",
            email:"Email",
            phone:"Phone Number"
    }
    useEffect(()=>{
     dispatch(Profile_Details())
    },[])
    return (
        <>
            <div className="vendors_profiles">
                <h4>Profile</h4>
                <ul>
                {Object.keys(ProfileData).map((data)=>{
                    return(
                    <li>
                    
                        <div className="profils_detail_acc">
                        <div className="row">
                            <div className="col-lg-2 col-md-2 col-sm-6 col-12">
                            <div className="profile_left">
                                <h4>{ProfileData[data] || "-"}:</h4>
                            </div>
                            </div>
                            <div className="col-lg-5 col-md-5 col-sm-6 col-12">
                            <div className="profile_right">
                                <h4>{profileDetails && profileDetails[data] || "-"}</h4>
                            </div>
                            </div>
                        </div>
                        </div>
                    </li>
                )})}
                </ul>
                <div className="btn_left_table">
                    <Link to="/account-edit" className="theme-btn-one bg-black btn_sm">Edit Profile</Link>
                </div>
            </div>
        </>
    )
}


export default Profile