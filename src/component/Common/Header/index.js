import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import logo from '../../../assets/img/vasanth1.jpg'
import logoWhite from '../../../assets/img/vasanth1.jpg';
import { MenuData } from './MenuData'
import NaveItems from './NaveItems'
import TopHeader from './TopHeader'
import { useHistory } from "react-router-dom"
import svg from '../../../assets/img/svg/cancel.svg'
import svgsearch from '../../../assets/img/svg/search.svg'
import logotest from '../../../assets/img/vasanthlogo.png';

import { useDispatch, useSelector } from "react-redux";
import Swal from 'sweetalert2';
import { GetTypes } from '../../../Redux/Action/allActions';

// const MenuData = []
const Header = () => {
    let dispatch = useDispatch();
    useEffect(() => {
        dispatch(GetTypes())
    }, [])
    const [click, setClick] = useState(false);
    const [show, setShow] = useState();
    const history = useHistory()
    let carts = useSelector((state) => state.products.carts);
    let favorites = useSelector((state) => state.products.favorites);

    const rmCartProduct = (id) => {
        dispatch({ type: "products/removeCart", payload: { id } });
    }

    const rmFavProduct = (id) => {
        dispatch({ type: "products/removeFav", payload: { id } });
    }

    const cartTotal = () => {
        return carts.reduce(function (total, item) {
            return total + ((item.quantity || 1) * item.price)
        }, 0)
    }

    const handleClick = () => {
        if (click) {
            document.querySelector("#offcanvas-add-cart").style = ("transform: translateX(100%);")
        } else {
            document.querySelector("#offcanvas-add-cart").style = ("transform: translateX(0%);")
        }
        setClick(!click);
    }
    const handleWish = () => {
        if (click) {
            document.querySelector("/cart").style = ("transform: translateX(100%);")
        } else {
            document.querySelector("/cart").style = ("transform: translateX(0);")
        }
        setClick(!click);
    }

    const handleSearch = () => {
        if (click) {
            document.querySelector("#search").style = ("transform: translate(-100%, 0); opacity: 0")
        } else {
            document.querySelector("#search").style = ("transform: translate(0px, 0px); opacity: 1")
        }
        setClick(!click);
    }
    const handleabout = () => {
        if (click) {
            document.querySelector("#offcanvas-about").style = ("transform: translateX(100%);")
        } else {
            document.querySelector("#offcanvas-about").style = ("transform: translateX(0%);")
        }
        setClick(!click);
    }
    const handlemenu = () => {
        if (click) {
            document.querySelector("#mobile-menu-offcanvas").style = ("transform: translateX(100%);")
        } else {
            document.querySelector("#mobile-menu-offcanvas").style = ("transform: translateX(0%);")
        }
        setClick(!click);
    }

    const handleShow = (value) => {
        value === show ? setShow("") : setShow(value)
    }

    // Sticky Menu Area
    useEffect(() => {
        window.addEventListener('scroll', isSticky);
        return () => {
            window.removeEventListener('scroll', isSticky);
        };
    });

    const isSticky = (e) => {
        const header = document.querySelector('.header-section');
        const scrollTop = window.scrollY;
        scrollTop >= 250 ? header.classList.add('is-sticky') : header.classList.remove('is-sticky');
    };
    console.log(MenuData, "MenuData?.children")

    return (
        <>
            <TopHeader />
            <header className="header-section d-none d-xl-block">
                <div className="header-wrapper">
                    <div className="header-bottom header-bottom-color--golden section-fluid sticky-header sticky-color--golden">
                        <div className="container">
                            <div className="row">
                                <div className="col-12 d-flex align-items-center justify-content-between">
                                    <div className="agalogoImage">
                                        <div className="logo">
                                            <Link to="/"><img src={logotest} alt="logo" /></Link>
                                        </div>
                                    </div>
                                    {/* <div className="main-menu menu-color--black menu-hover-color--golden d-none d-xl-block">
                                        <nav>
                                            <ul>
                                                {MenuData.map((item, index) => (
                                                    <NaveItems item={item} key={index} />
                                                ))}
                                            </ul>
                                        </nav>
                                    </div> */}
                                    <div className='SearchView'>
                                        <div className="search_space">
                                            <div class="wrapper">
                                                <div class="search-icon" >🔎︎</div>
                                                <input class="search" placeholder="Search for products" type="text"
                                                // onChange={(event) => onchangeSearch(event.target.value)}
                                                //  onKeyDown={handleKeyDown} 
                                                />
                                            </div>
                                        </div>
                                        <div className="btnShow">
                                            <button className="submitBtn" type="submit" >search</button>
                                        </div>
                                        {/* <div>
                                            <button className='searchBtnShow'>Search</button>
                                        </div>*/}
                                    </div>
                                    <ul className="right_list">
                                        <li><Link to="/login"><i className="fa fa-user"></i> Login</Link></li>
                                        <li><Link to="/register"><i className="fa fa-lock"></i> Register</Link></li>
                                    </ul>

                                    <ul className="header-action-link action-color--black action-hover-color--golden">
                                        <li>
                                            {favorites.length
                                                ? <a href="/cart" className="offcanvas-icon" onClick={handleWish}><i className="fa fa-shopping-cart"></i><span className="item-count">{favorites.length}</span></a>
                                                : <a href="/cart" className="offcanvas-icon"><i className="fa fa-shopping-cart"></i><span className="item-count">{favorites.length}</span></a>
                                            }
                                        </li>
                                        {/* <li>
                                            {carts.length
                                                ? <a href="#!" className="offcanvas-toggle" onClick={handleClick}><i className="fa fa-shopping-bag"></i><span className="item-count">{carts.length}</span></a>
                                                : <a href="#!" className="offcanvas-toggle"><i className="fa fa-shopping-bag"></i><span className="item-count">{carts.length}</span></a>
                                            }
                                        </li> */}
                                        {/* <li>
                                            <a href="#search" className="search_width" onClick={handleSearch} >
                                                <img src={svgsearch} alt="img" />
                                            </a>
                                        </li> */}
                                        <li>
                                            <a href="#offcanvas-about" className="offacnvas offside-about offcanvas-toggle" onClick={handleabout}>
                                                <i className="fa fa-bars"></i>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="header-wrappers">
                    {/* <div className="header-bottom header-bottom-color--golden section-fluid sticky-header sticky-color--golden"> */}
                    <div className="container">
                        <div className="row">
                            <div className="col-12 d-flex align-items-center justify-content-start">
                                <div className="main-menu menu-color--black menu-hover-color--golden d-none d-xl-block">
                                    <nav>
                                        <ul className='menus-list'>
                                            {MenuData.map((item, index) => (
                                                <NaveItems item={item} key={index} />
                                            ))}
                                        </ul>
                                    </nav>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* </div> */}
                </div>
            </header>

            <div className="mobile-header sticky-header sticky-color--golden mobile-header-bg-color--golden section-fluid d-lg-block d-xl-none is-sticky">
                <div className="container">
                    <div className="row">
                        <div className="col-12 d-flex align-items-center justify-content-between">

                            <div className="mobile-header-left">
                                <ul className="mobile-menu-logo">
                                    <li>
                                        <a href="/">
                                            <div className="logo logospace ">
                                                <img src={logo} alt="logo" />
                                            </div>
                                        </a>
                                    </li>
                                </ul>
                            </div>

                            <div className="mobile-right-side">
                                <ul className="header-action-link action-color--black action-hover-color--golden">
                                    {/* <li>
                                        <a href="#!" className="search_width" onClick={handleSearch}>
                                            <img src={svgsearch} alt="img" />
                                        </a>
                                    </li> */}
                                    <li>
                                        {/* <a href="#offcanvas-wishlish" className="offcanvas-icon" onClick={handleWish}><i className="fa fa-shopping-cart"></i><span className="item-count">{favorites.length}</span></a> */}
                                        {favorites.length
                                            ? <a href="/cart" className="offcanvas-icon" onClick={handleWish}><i className="fa fa-shopping-cart"></i><span className="item-count">{favorites.length}</span></a>
                                            : <a href="/cart" className="offcanvas-icon"><i className="fa fa-shopping-cart"></i><span className="item-count">{favorites.length}</span></a>
                                        }
                                    </li>
                                    {/* <li>
                                        {carts.length
                                            ? <a href="#!" className="offcanvas-toggle" onClick={handleClick}><i className="fa fa-shopping-bag"></i><span className="item-count">{carts.length}</span></a>
                                            : <a href="#!" className="offcanvas-toggle"><i className="fa fa-shopping-bag"></i><span className="item-count">{carts.length}</span></a>
                                        }
                                    </li> */}
                                    <li>
                                        <a href="#!" className="offcanvas-toggle offside-menu" onClick={handlemenu}>
                                            <i className="fa fa-bars"></i>
                                        </a>
                                    </li>
                                </ul>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

            <div id="mobile-menu-offcanvas" className="offcanvas offcanvas-rightside offcanvas-mobile-menu-section">

                <div className="offcanvas-header text-right menu_header_view">
                    <div className="logo logospace">
                        <Link to="/"><img src={logoWhite} alt="img" /></Link>
                    </div>
                    <button className="offcanvas-close" onClick={handlemenu}>
                        <img src={svg} alt="icon" />
                    </button>
                </div>
                <div className="offcanvas-mobile-menu-wrapper">
                    <div className="mobile-menu-bottom">
                        <div className="offcanvas-menu">
                            <ul>
                                <li>
                                    <a href="/" onClick={() => handleShow("home")}><span>Home</span></a>
                                </li>
                                <li >
                                    <a href="#!" onClick={() => handleShow("shop")}><span>Category</span></a>
                                    {
                                        show === "shop" ? <>
                                            <ul className="mobile-sub-menu">
                                                <li>
                                                    { }
                                                    <ul className="mobile-sub-menu">
                                                        {MenuData[0].children.map((item, index) => (
                                                            <li><Link to={item.href}>{item.name}</Link></li>
                                                        ))}
                                                    </ul>
                                                </li>
                                            </ul>
                                        </> : null
                                    }

                                </li>
                                <li>
                                    <a href="#!" onClick={() => handleShow("feature")}><span>Offer</span></a>
                                </li>
                                <li>
                                    <a href="#!" onClick={() => handleShow("blogs")}><span>Contact us</span></a>

                                </li>
                                <li className='d-flex'>
                                    <a href="/login" onClick={() => handleShow("feature")}><span>Sign  / </span></a> <a href="/register" onClick={() => handleShow("blogs")}><span> Sign Up</span></a>
                                </li>

                                <li>
                                    <a href="#!" onClick={() => handleShow("feature")}><span>Logout</span></a>
                                </li>

                            </ul>

                        </div>
                        <div>

                        </div>

                    </div>
                    <div className="mobile-contact-info">
                        <ul className="user-link">
                            <li><Link to="/wishlist">Wishlist</Link></li>
                            <li><Link to="/cart">Cart</Link></li>
                            <li><Link to="/checkout-one">Checkout</Link></li>
                        </ul>
                        <address className="address">
                            <span>Address: Your address goes here.</span>
                            <span>Call Us: 0123456789, 0123456789</span>
                            <span>Email: demo@example.com</span>
                        </address>
                        <ul className="social-link">
                            <li>
                                <a href="#!"><i className="fa fa-facebook"></i></a>
                            </li>
                            <li>
                                <a href="#!"><i className="fa fa-twitter"></i></a>
                            </li>
                            <li>
                                <a href="#!"><i className="fa fa-instagram"></i></a>
                            </li>
                            <li>
                                <a href="#!"><i className="fa fa-linkedin"></i></a>
                            </li>


                        </ul>

                        {/* <ul className="user-link">
                            <li><Link to="/wishlist">Wishlist</Link></li>
                            <li><Link to="/cart">Cart</Link></li>
                            <li><Link to="/checkout-one">Checkout</Link></li>
                        </ul> */}
                    </div>

                </div>

            </div>
            <div id="offcanvas-about" className="offcanvas offcanvas-rightside offcanvas-mobile-about-section">
                <div className="offcanvas-header text-right d-flex align-items-center justify-content-between">
                    <h5>About</h5>
                    <button className="offcanvas-close" onClick={handleabout}>
                        <img src={svg} alt="icon" />
                    </button>
                </div>
                <div className="mobile-contact-info">
                    <ul className="user-link">
                        <li><Link to="/wishlist">Wishlist</Link></li>
                        <li><Link to="/cart">Cart</Link></li>
                        <li><Link to="/checkout-one">Checkout</Link></li>
                    </ul>
                    <address className="address">
                        {/* <img src={logoWhite} alt="logo" /> */}
                        <span>Address: Your address goes here.</span>
                        <span>Call Us: 0123456789, 0123456789</span>
                        <span>Email: demo@example.com</span>
                    </address>
                    <ul className="social-link">
                        <li>
                            <a href="#!"><i className="fa fa-facebook"></i></a>
                        </li>
                        <li>
                            <a href="#!"><i className="fa fa-twitter"></i></a>
                        </li>
                        <li>
                            <a href="#!"><i className="fa fa-instagram"></i></a>
                        </li>
                        <li>
                            <a href="#!"><i className="fa fa-linkedin"></i></a>
                        </li>
                    </ul>

                </div>
            </div>

            <div id="offcanvas-add-cart" className="offcanvas offcanvas-rightside offcanvas-add-cart-section">
                <div className="offcanvas-header text-right">
                    <button className="offcanvas-close" onClick={handleClick}>
                        <img src={svg} alt="icon" />
                    </button>
                </div>
                <div className="offcanvas-add-cart-wrapper">
                    <h4 className="offcanvas-title">Shopping Cart</h4>
                    <ul className="offcanvas-cart">
                        {carts.map((data, index) => (
                            <li className="offcanvas-wishlist-item-single" key={index}>
                                <div className="offcanvas-wishlist-item-block">
                                    <Link to={`/product-details-one/${data.id}`} className="offcanvas-wishlist-item-image-link" >
                                        <img src={data.img} alt="img"
                                            className="offcanvas-wishlist-image" />
                                    </Link>
                                    <div className="offcanvas-wishlist-item-content">
                                        <Link to={`/product-details-one/${data.id}`} className="offcanvas-wishlist-item-link">{data.title}</Link>
                                        <div className="offcanvas-wishlist-item-details">
                                            <span className="offcanvas-wishlist-item-details-quantity">{data.quantity || 1} x
                                            </span>
                                            <span className="offcanvas-wishlist-item-details-price"> ₹{data.price}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="offcanvas-wishlist-item-delete text-right">
                                    <a href="#!" className="offcanvas-wishlist-item-delete" onClick={() => rmCartProduct(data.id)}><i className="fa fa-trash"></i></a>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <div className="offcanvas-cart-total-price">
                        <span className="offcanvas-cart-total-price-text">Subtotal:</span>
                        <span className="offcanvas-cart-total-price-value">₹{cartTotal()}.00</span>
                    </div>
                    <ul className="offcanvas-cart-action-button">
                        <li>
                            <Link to="/cart" className="theme-btn-one btn-black-overlay btn_md">View Cart</Link>
                        </li>
                        <li>
                            <Link to="/checkout-one" className="theme-btn-one btn-black-overlay btn_md">Checkout</Link>
                        </li>
                    </ul>
                </div>
            </div>

            <div id="offcanvas-wishlish" className="offcanvas offcanvas-rightside offcanvas-add-cart-section">
                <div className="offcanvas-header text-right wishlist_view d-flex align-items-center justify-content-between">
                    <h4 className="offcanv">Wishlist</h4>

                    <button className="offcanvas-close" onClick={handleWish}>
                        <img src={svg} alt="icon" />
                    </button>
                </div>
                <div className="offcanvas-wishlist-wrapper wishlist_view">

                    <ul className="offcanvas-wishlist wishlist_view">
                        {favorites.map((data, index) => (
                            <li className="offcanvas-wishlist-item-single" key={index}>
                                <div className="offcanvas-wishlist-item-block">
                                    <Link to={`/product-details-one/${data.id}`} className="offcanvas-wishlist-item-image-link" >
                                        <img src={data.img} alt="img"
                                            className="offcanvas-wishlist-image" />
                                    </Link>
                                    <div className="offcanvas-wishlist-item-content">
                                        <Link to={`/product-details-one/${data.id}`} className="offcanvas-wishlist-item-link">{data.title}</Link>
                                        <div className="offcanvas-wishlist-item-details">
                                            <span className="offcanvas-wishlist-item-details-quantity">1 x
                                            </span>
                                            <span className="offcanvas-wishlist-item-details-price">{data.price}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="offcanvas-wishlist-item-delete text-right">
                                    <a href="#!" className="offcanvas-wishlist-item-delete" onClick={() => rmFavProduct(data.id)}><i className="fa fa-trash"></i></a>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <ul className="offcanvas-wishlist-action-button">
                        <li>
                            <Link to="/wishlist" className="theme-btn-one btn-black-overlay btn_md">View wishlist</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    )
}

export default Header