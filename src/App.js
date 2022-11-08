import React,{useState,useEffect} from 'react';
import { BrowserRouter as Router, Switch, Route,  Redirect } from 'react-router-dom';
import { AuthContext } from './context/auth' 
import AddressList from './component/MyAccountDashboard/AddressList';
import EditAddressListComp from './component/MyAccountDashboard/EditAddressDetails';
import TermsAndCondition from './page/terms'
import ProductDetails from './page/product'
import Cart from './page/cart'
import EmptyCarts from './page/cart/empty-cart'
import CheckoutOne from './page/checkout'
import WishLists from './page/shop/wishList'
import OrderComplete from './page/order/order-complete'
import OrderSuccesses from './page/order/order-success'
import InvoiceOne from './page/invoice'
import MyAccounts from './page/my-account'
import CustomerOrder from './page/my-account/customer-order'
import CustomerAddress from './page/my-account/customer-address'
import CustomerAccountDetails from './page/my-account/customer-account-details'
import AccountEdit from './page/vendor/account-edit'
import Login from './page/login'
import Register from './page/register'
import Error from './page/error'
import PrivacyPolicy from './page/privacy-policy'
import Faqs from './page/faqs'
import Electronics from './page/electronics'
import ScrollToTop from './component/Common/ScrollToTop'
import ShopGrid from './page/shop'
import Refund from './page/refund'
import AllCategory from './page/AllCategory';
import { BrowserView, MobileView } from 'react-device-detect';
import NotificationComp from './page/notification'
import ContactUs from './page/contactus'
import MyBillsComp from './page/mybills';
import RedeemHistoryComp from './page/redeemhistory';
import MaintenceModal from './page/modal'
import './assets/css/style.scss'
import PullToRefresh from 'react-simple-pull-to-refresh';
import Routes from './Routes';
const App = () => {
  const [refresh,setrefresh]=useState(false)
  const [loading,setloading]=useState(true)
  const existingTokens = JSON.parse(localStorage.getItem("data"));
  const [authTokens, setAuthTokens] = useState(existingTokens);
  const setTokens=(data)=>{
    localStorage.setItem("data",JSON.stringify(data))
    localStorage.setItem("UserId",JSON.stringify(data.id))
    setAuthTokens(data);
  }
  useEffect(()=> {
    fakeRequest().then(() => {
      const el = document.querySelector(".loader-container");
      if (el) {
        el.remove();  // removing the spinner element
        setloading(false)
      }
    })
  },[])
  const fakeRequest = () => {
    return new Promise(resolve => setTimeout(() => resolve(), 2000));
  }
  if(loading){
    return null;
  }


  const handleRefresh=()=>{
    setrefresh(true)
  }
  return (
    <div>
      <BrowserView>
      <AuthContext.Provider value={{ authTokens,setAuthTokens: setTokens }}>   
         <Routes/>
      </AuthContext.Provider>
      {/* <MaintenceModal showModal={true}/> */}
      </BrowserView>
      <MobileView>
      <PullToRefresh onRefresh={handleRefresh}>
      <AuthContext.Provider value={{ authTokens,setAuthTokens: setTokens }}>   
         <Routes/>
      </AuthContext.Provider>
      {/* <MaintenceModal showModal={true}/> */}
      </PullToRefresh>
      </MobileView>
    </div>
  );
}

export default App;