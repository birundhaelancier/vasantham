import React from 'react'
import { Link , useLocation } from 'react-router-dom';

const SideBar = () => {
    const location = useLocation()
    return (
        <>
            <div className="col-sm-12 col-md-12 col-lg-3">
                    <div className="dashboard_tab_button">
                        <ul role="tablist" className="nav flex-column dashboard-list">
                            <li><Link to="/vendor-dashboard" className={location.pathname === '/vendor-dashboard'?'active':null}><i className="fa fa-tachometer"></i>  Producrts List</Link></li>

                            <li> <Link to="/vendor/all-product" className={location.pathname === '/vendor/all-product'?'active':null}><i className="fa fa-shopping-cart"></i>Product Details</Link></li>

                            {/* <li><Link to="/vendor/all-order" className={location.pathname === '/vendor/all-order'?'active':null}><i className="fa fa-shopping-bag"></i>Check Out</Link></li> */}

                            <li><Link to="/cart" className={location.pathname === '/cart'?'active':null}><i className="fa fa-id-badge"></i>Cart</Link></li>

                            <li><Link to="/vendor/all-order" className={location.pathname === '/vendor/all-order'?'active':null}><i className="fa fa-cart-plus "></i>Orders</Link></li>

                            <li><Link to="/vendor/vendor-profile" className={location.pathname === '/vendor/vendor-profile'?'active':null}><i className="fa fa-user-circle"></i>My Account</Link></li>

                            <li><Link to="/contact-two" className={location.pathname === '/contact-two'?'active':null}><i className="fa fa-user"></i>Order trancking</Link></li>
                        </ul>
                    </div>
                </div>
        </>
    )
}

export default SideBar
