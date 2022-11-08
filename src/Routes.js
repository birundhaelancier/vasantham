import React from 'react'
import { BrowserRouter as Router, Switch, Route,  Redirect } from 'react-router-dom';
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
import { MobileView } from 'react-device-detect';
import NotificationComp from './page/notification'
import ContactUs from './page/contactus'
import MyBillsComp from './page/mybills';
import RedeemHistoryComp from './page/redeemhistory';
import MaintenceModal from './page/modal'
export default function Routes() {
    const PrivateRoute = ({ component: Component, ...rest }) => 
    (  
     <Route {...rest} render={props => 
    (
    localStorage.getItem('UserId') ? <Component {...props} /> : <Redirect to={{pathname: '/login'}}/>
    )}/>
    );
  return (
    <Router>
    <ScrollToTop />
    <Switch>
      <Route path='/' exact component={Electronics} />
      <Route path='/shop/:slug?' exact component={ShopGrid} />
      <Route path='/product-details-one/:id?/:productid?' exact component={ProductDetails} />
      <PrivateRoute path='/my-account/editaddresslist/:id?/:type?' exact component={EditAddressListComp} />
      <Route path='/cart' exact component={Cart} />
      <Route path='/empty-cart' exact component={EmptyCarts} />
      <Route path='/checkout-one' exact component={CheckoutOne} />
      <Route path='/wishlist' exact component={WishLists} />
      <PrivateRoute path='/order-complete' exact component={OrderComplete} />
      <Route path='/privacy-policy' exact component={PrivacyPolicy} />
      <Route path='/terms' component={TermsAndCondition}/>
      <Route path='/refund' component={Refund}/>
      <PrivateRoute path='/my-account/addresslist' exact component={AddressList} />
      <PrivateRoute path='/order-success/:id?' exact component={OrderSuccesses} />
      <PrivateRoute path='/invoice-one/:id?' exact component={InvoiceOne} />
      <PrivateRoute path='/my-account' exact component={MyAccounts} />
      <PrivateRoute path='/my-account/customer-order' exact component={CustomerOrder} />
      <PrivateRoute path='/my-account/customer-address' exact component={CustomerAddress} />
      <PrivateRoute path='/my-account/customer-account-details' exact component={CustomerAccountDetails} />
      <PrivateRoute path='/account-edit' exact component={AccountEdit} />
      <Route path='/login/:type?' exact component={Login} />
      <Route path='/register' exact component={Register} />
      <Route path='/privacy-policy' exact component={PrivacyPolicy} />
      <Route path='/faqs' exact component={Faqs} />
      <Route path='/notification' exact component={NotificationComp} />
      <Route path='/category' exact component={AllCategory}/>
      <Route path='/contactus' exact component={ContactUs} />
      <PrivateRoute path='/bills' exact component={MyBillsComp} />
      <PrivateRoute path='/redeemhistory' exact component={RedeemHistoryComp} />
      
      <Route exact path="/error" component={Error} />
    </Switch>
  </Router>
  )
}
