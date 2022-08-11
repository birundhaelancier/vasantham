import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom"
import Swal from 'sweetalert2';

const Sidebar = () => {
    const location = useLocation()
    let dispatch = useDispatch();
    const history = useHistory()
    const logout = () => {
        // Swal.fire({
        //     icon: 'success',
        //     title: 'Logout Sucessfully',
        //     text: 'Thank You',
        //     showConfirmButton: false,
        //     timer: 1000
        // })
        localStorage.removeItem("UserId")
        history.push("/");
    }
    return (
        <>
            <div className="col-sm-12 col-md-12 col-lg-3">
                <div className="dashboard_tab_button">
                    <ul role="tablist" className="nav flex-column dashboard-list">
                        <li><Link to="/my-account" className={location.pathname === '/my-account'?'active':null}><i className="fa fa-tachometer"></i>Dashboard</Link></li>

                        <li><Link to="/my-account/customer-order" className={location.pathname === '/my-account/customer-order'?'active':null}><i className="fa fa-product-hunt"></i>My Orders</Link></li>

                        <li><Link to="/my-account/customer-account-details" className={location.pathname === '/my-account/customer-account-details'?'active':null}><i className="fa fa-user"></i>My Account</Link></li>

                        <li><Link to="/my-account/addresslist" className={location.pathname === '/my-account/addresslist' || location.pathname.includes("/my-account/editaddresslist/")?'active':null}><i className="fa fa-address-card"></i>Address List</Link></li>

                        <li><Link  onClick={(e)=>{e.preventDefault();logout()}}><i className="fa fa-sign-out"></i>logout</Link></li>
                    </ul>
                </div>
            </div>
        </>
    )
}

export default Sidebar
