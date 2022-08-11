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
import { Autocomplete,InputAdornment,Box,TextField} from '@mui/material';
import { useDispatch, useSelector } from "react-redux";
import { apiurl, ImageUrl } from '../../../Redux/Utils/baseurl';
import Swal from 'sweetalert2';
import axios from 'axios';
import { Category_List, Get_Wishlist, Profile_Details, RewardPoints, SearchCategory } from '../../../Redux/Action/allActions';
import avater from '../../../assets/img/common/avater.png'
import Avatar from '@mui/material/Avatar';
// const MenuData = []
const Header = () => {
    let dispatch = useDispatch();
  
    const [click, setClick] = useState(false);
    const [show, setShow] = useState();
    const history = useHistory()
    const [Category,setCategory]=useState([])
    const [NewMenuData,setNewMenuData]=useState([])
    const [WishList,setWishList]=useState([])
    const ShoppingCarts=useSelector(state=>state.StoreProuct.ShoopingCarts)
    const profileDetails=useSelector(state=>state.AllReducer.ProfileData?.users)
    const AllCategory=useSelector(state=>state.AllReducer.AllCategory)
    
    const Reward=useSelector(state=>state.AllReducer.RewardPoints)
    const WishListData=useSelector(state=>state.AllReducer.WishList)
    let carts = useSelector((state) => state?.products?.carts);
    let favorites = useSelector((state) => state?.products?.favorites);
    const [FilterData,setFilterData]=useState([])
    const [searchValue,setsearchValue]=useState(null)
    const [login,setlogin]=useState(false)
    const [SearchList,setSearchList]=useState([])
    const SideMenus=[{title:"Home",url:"/"},{title:"All Category",url:"/"},{title:"My Account",url:"/my-account/customer-account-details"},{title:"My Orders",url:"/my-account/customer-order"},{title:"My Rewards",url:"/my-account"},{
        title:!JSON.parse(localStorage.getItem("UserId"))?
        <span onClick={()=>history.push("/login")}>Login</span>:<span onClick={()=>logout()}>Log Out</span>,
    }]
    
    const rmCartProduct = (id) => {
        dispatch({ type: "products/removeCart", payload: { id }});
    }

    const rmFavProduct = (id) => {
        dispatch({ type: "products/removeFav", payload: { id } });
    }

    const cartTotal = () => {
        return carts?.reduce(function (total, item) {
            return total + ((item.quantity || 1) * item.price)
        }, 0)
    }
    useEffect(()=>{
      dispatch(Profile_Details())
      dispatch(RewardPoints())
      dispatch(Category_List())
      dispatch(Get_Wishlist())
    },[])

    useEffect(()=>{
        var Data = WishListData.filter((data) => {
            return data !== null;
          });
          setWishList(Data);
    },[WishListData])

    const handleClick = () => {
        // if (click) {
        //     document.querySelector("#offcanvas-add-cart").style = ("transform: translateX(100%);")
        // } else {
        //     document.querySelector("#offcanvas-add-cart").style = ("transform: translateX(0%);")
        // }
        // setClick(!click);
        history.push("/wishlist")
    }
    const handleWish = () => {
        // if (click) {
        //     document.querySelector("/cart").style = ("transform: translateX(100%);")
        // } else {
        //     document.querySelector("/cart").style = ("transform: translateX(0);")
        // }
        // setClick(!click);
        history.push("/wishlist")
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

    const logout = () => {
        // Swal.fire({
        //     icon: 'success',
        //     title: 'Logout Sucessfully',
        //     text: 'Thank You',
        //     showConfirmButton: false,
        //     timer: 1500
        // })
        localStorage.removeItem("UserId")
        // dispatch({ type: "user/logout" })
        history.push("/login");
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
        const header = document.querySelector(".mobile-section");
        const header2 = document.querySelector(".header-section");
        const scrollTop = window.scrollY;
        scrollTop >= 100
          ? header.classList.add("is-sticky")
          : header.classList.remove("is-sticky");
        scrollTop >= 100
          ? header2.classList.add("is-sticky")
          : header2.classList.remove("is-sticky");
    };

    useEffect(()=>{
        dispatch(Category_List()).then((res)=>{
        })
        axios({
            method: 'Get',
            url:apiurl+"category",
        })
        .then((response) => {
          
        })
        dispatch(SearchCategory()).then((res)=>{
          let Data=[]
          res.payload.product.concat(res.payload.category).map((data)=>{
             Data.push(data)
          })
        setFilterData(res.payload)
        setSearchList(Data)
      
        })
    },[])

useEffect(()=>{
    let array=[]
    let newmenu=[]
    AllCategory.map((val)=>{
        array.push({name:val.name,href:`/shop/${val.slug}`})
        if(val.home===1){
          newmenu.push({name:val.name,href:`/shop/${val.slug}`,children:[]})
        }
    })
    setCategory(AllCategory)
    MenuData[0].children=array
    setNewMenuData(newmenu)
},[AllCategory])

    const ChangeSearchList=(event,data)=>{
        setsearchValue(data)
        FilterData.category.filter((item)=>{
          if(data?.name===item?.name){
            history.push(`/shop/${item.slug}`)
          }
        })
        FilterData.product.filter((item)=>{
          if(data?.name===item?.name){
            history.push(`/product-details-one/${item.slug}/${data.id}`)
          }
        })
        
      }
    return (
        <>
            <TopHeader />
            <header className="header-section  d-xl-block">
                <div className="header-wrapper">
                    <div className="header-bottom header-bottom-color--golden section-fluid sticky-header sticky-color--golden">
                        <div className="container">
                            <div className="row">
                                <div className="col-12 d-flex align-items-center justify-content-between">
                                    <div className="agalogoImage">
                                        <div className="logo">
                                            <Link to="/"><img src={"https://elancier.in/vasantham/assets/images/1653572820logo.gif"} alt="logo" /></Link>
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
                                                {/* <div class="search-icon" >🔎︎</div>
                                                <input class="search" placeholder="Search for products" type="text"/> */}
                                                  <div className="input-group md-form form-sm form-1 pl-0 auto_search">
                                                <Autocomplete 
                                                  onChange={(event, newValue) =>ChangeSearchList(event,newValue)}
                                                renderOption={(props, option) => (
                            
                                                <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                                                      {option.photo&&<img
                                                       loading="lazy"
                                                        width="40"
                                                        style={{width:"40px",height:"40px"}}
                                                       src={ImageUrl+option?.photo}  /> }
                                                <span>{option?.name}</span>
                                                </Box>)}
                                              value={searchValue}
                                              options={SearchList}
                                              getOptionLabel={(option) => option.name}
                                              renderInput={(params) => (
                                              <TextField {...params} size="Normal"   InputLabelProps={{shrink:false}} placeholder="Search for products" InputProps={{...params.InputProps,type: 'search',
                                            //   startAdornment:
                                            //     <InputAdornment
                                            //         position="start">🔎︎</InputAdornment>,
                                               endAdornment: <InputAdornment>  Search </InputAdornment>,
                                               }}
                    />
                      )}
                      />
                          <div className="input-group-prepend">
                           
                          </div>
                        </div>
                                            </div>
                                        </div>
                                        {/* <div className="btnShow">
                                            <button className="submitBtn" type="submit" >search</button>
                                        </div> */}
                                        {/* <div>
                                            <button className='searchBtnShow'>Search</button>
                                        </div>*/}
                                    </div>
                                    <ul className="right_list">
                                        {!JSON.parse(localStorage.getItem("UserId"))?
                                        <li className="user__list"><Link to="/login"><i className="fa fa-user"></i> Login</Link></li>
                                        :
                                        <>
                                            <li className="after_login">
                                            {profileDetails?.photo===undefined || profileDetails?.photo===null ?
                                                   <Avatar src="/broken-image.jpg" className='avater_img' sx={{ height:"24px",width: '24px' }}/>:
                                                <img src={ImageUrl+profileDetails?.photo} alt="avater" />}
                                                <span className='pr-2 pl-2'><strong>{profileDetails?.first_name || "My Profile"  }</strong></span> <i className="fa fa-angle-down"></i>
                                                <ul className="custom_dropdown">
                                                    <li><Link to="/my-account"><i className="fa fa-tachometer"></i> Dashboard</Link></li>
                                                    <li><Link to="/my-account/customer-order"><i className="fa fa-product-hunt"></i><span>My Orders</span></Link></li>
                                                    <li><Link to="/my-account/customer-order"><i className="fa fa-user"></i><span> My Reward Points {Reward?.rewardpoint || 0}</span></Link></li>
                                                    <li><Link to="/my-account/addresslist"><i className="fa fa-address-card"></i><span>Address List</span></Link></li>
                                                    <li><Link onClick={() => { logout() }} ><i className="fa fa-sign-out"></i> Logout</Link></li>
                                                </ul>
                                              </li>
                                            </>
                                         }
                                    </ul>

                                    <ul className="header-action-link action-color--black action-hover-color--golden">
                                        <li>
                                            {ShoppingCarts?.length
                                                ? <Link to="/cart" className="offcanvas-icon"><i className="fa fa-shopping-cart"></i><span className="item-count">{ShoppingCarts?.length || 0}</span></Link>
                                                : <Link to="/cart" className="offcanvas-icon"><i className="fa fa-shopping-cart"></i><span className="item-count">{ShoppingCarts?.length || 0}</span></Link>
                                            }
                                        </li>
                                        {/* <li>fghjk</li> */}

                                        <li>
                                            {WishList?.length > 0
                                                ? <a className="offcanvas-toggle" onClick={handleClick}><i className="fa fa-heart"></i><span className="item-count">{WishList?.length || 0}</span></a>
                                                : <a className="offcanvas-toggle" onClick={handleClick}><i className="fa fa-heart"></i><span className="item-count">{WishList?.length || 0}</span></a>
                                            }
                                        </li>
                                    {/* <li onClick={()=>history.push("/login")}><i className="fa fa-user"></i> Login</li> */}

                                        {/* <li>
                                            <a href="#search" className="search_width" onClick={handleSearch} >
                                                <img src={svgsearch} alt="img" />
                                            </a>
                                        </li> */}
                                        {/* <li>
                                            <a href="#offcanvas-about" className="offacnvas offside-about offcanvas-toggle" onClick={handleabout}>
                                                <i className="fa fa-bars"></i>
                                            </a>
                                        </li> */}
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
                                <div className="main-menu menu-color--black menu-hover-color--golden  d-xl-block">
                                    <nav>
                                        <ul className='menus-list'>
                                            {MenuData.map((item, index) => (
                                                <NaveItems item={item} key={index} />
                                            ))}
                                             {NewMenuData.map((item, index) => (
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

            <div className="mobile-header sticky-header mobile-section sticky-color--golden mobile-header-bg-color--golden section-fluid  d-xl-none is-sticky">
                <div className="container">
                    <div className="row">
                        <div className="col-12 d-flex align-items-center justify-content-between">

                            <div className="mobile-header-left">
                                <ul className="mobile-menu-logo">
                                    <li>
                                        <a href="/">
                                            <div className="logo logospace ">
                                                <div className='logo_child'>
                                                <img src={"https://elancier.in/vasantham/assets/images/1653572820logo.gif"} alt="logo" />
                                                </div>
                                            </div>
                                        </a>
                                    </li>
                                </ul>
                            </div>

                            <div className="mobile-right-side">
                                
                                <ul className="header-action-link action-color--black action-hover-color--golden">
                                  
                                    <li>
                                        {ShoppingCarts?.length
                                            ? <Link to="/cart" className="offcanvas-icon" ><i className="fa fa-shopping-cart"></i><span className="item-count">{ShoppingCarts?.length || 0}</span></Link>
                                            : <Link to="/cart" className="offcanvas-icon"><i className="fa fa-shopping-cart"></i><span className="item-count">{ShoppingCarts?.length || 0}</span></Link>
                                        }
                                    </li>
                                    <li>
                                            {WishList?.length
                                                ? <a className="offcanvas-toggle" onClick={handleClick}><i className="fa fa-heart"></i><span className="item-count">{WishList?.length || 0}</span></a>
                                                : <a className="offcanvas-toggle" onClick={handleClick}><i className="fa fa-heart"></i><span className="item-count">{WishList?.length || 0}</span></a>
                                            }
                                        </li>
                                    <li>
                                        <a className="offcanvas-toggle offside-menu" onClick={handlemenu}>
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
                                       <div className='logo_child'>
                                                <img src={"https://elancier.in/vasantham/assets/images/1653572820logo.gif"} alt="logo" />
                                        </div>
                                    </div>
                    <button className="offcanvas-close" onClick={handlemenu}>
                        <img src={svg} alt="icon" />
                    </button>
                </div>
                <div className="offcanvas-mobile-menu-wrapper">
                    <div className="mobile-menu-bottom">
                        <div className="offcanvas-menu">
                            <ul>
                                {SideMenus.map((data)=>
                                <>
                                {data.title==="My Account" ? 
                                (!JSON.parse(localStorage.getItem("UserId")) ? "" :
                                <li><a  onClick={() => history.push(data.url)}><span>{data.title}</span></a></li>)
                                :
                                   <li>
                                        <a  onClick={() => history.push(data.url)}><span>{data.title}</span></a>
                                   </li>
                                }
                                </>
                                )}

                               
                                <li >
                                    {/* <a  onClick={() => handleShow("shop")}><span>All Category</span></a> */}
                                    {/* {
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
                                    } */}

                                </li>
                                {/* <li>
                                    <a  onClick={() => handleShow("home")}><span>My Account</span></a>
                                </li>
                                <li>
                                    <a  onClick={() => handleShow("home")}><span>My Orders</span></a>
                                </li>
                                <li>
                                    <a  onClick={() => handleShow("home")}><span>My Rewards</span></a>
                                </li>
                                <li>
                                    <a  onClick={() => handleShow("feature")}><span>Offer</span></a>
                                </li>
                                <li>
                                    <a  onClick={() => handleShow("blogs")}><span>Contact us</span></a>

                                </li>
                                <li className='d-flex'>
                                    <a href="/login" onClick={() => handleShow("feature")}><span>Sign  / </span></a> <a href="/register" onClick={() => handleShow("blogs")}><span> Sign Up</span></a>
                                </li>

                                <li>
                                    <a  onClick={() => handleShow("feature")}><span>Logout</span></a>
                                </li> */}

                            </ul>

                        </div>
                        <div>

                        </div>

                    </div>
                   
                </div>

            </div>
        
         
          
        </>
    )
}

export default Header