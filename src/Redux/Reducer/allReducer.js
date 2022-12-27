import {
  GET_SLIDER_LIST,
  GET_HOMEPRODUCT_LIST,
  WISHLIST_FAVORITES,
  GET_CATEGORY_LISTITEM,
  GET_PACKAGE,
  GET_CITY_LIST,
  GET_PROFILE_DATA,
  GET_WISH_LIST,
  GET_SINGLEPRODUCT_LIST,
  GET_SHIPPING_LIST,
  GET_COUPONCODE,
  USER_ORDERS,
  GET_ADDRESS_LIST,
  GET_POST_LIST,
  FARMER_POST_LIST,
  STOCK_LIST,
  FAQ_LIST,
  ORDER_LIST,
  RELATED_LIST,
  ADDITIONAL_CHARGES,
  RAZORPAY_DETAILS,
  ADVISOR_VISIT,
  ADVERTISEMENT_DETAIL,
  BILLING_INFORMATION,
  REWARD_POINTS,
  COUPONCODE,
  CATEGORY_LIST,
  CART_TOTAL,
  CONTACT_US,
  MYBILLS,
  REDEEM_POINT_HISTORY,
  NOTIFICATIONS,
  GET_HOTPRODUCT_LIST,
  SEARCH_CATEGORY,
} from "../Utils/constant";
const initialState = {
  Slider_list: [],
  Products: [],
  Wish_Fav_List: [],
  Category_List: [],
  City_List: [],
  Package_list: [],
  ProfileData: [],
  WishList: [],
  SingleProduct: [],
  Shipping: [],
  coupon_code: [],
  Orders: [],
  Address_list: [],
  Post_list: [],
  Farmer_Posts: [],
  Stock_list: [],
  Faq_List: [],
  order_list: [],
  Related_list: [],
  AdditionalCharges: [],
  KeyDetails: [],
  Advisor_visit: [],
  Advertisement: [],
  RewardPoints: [],
  Coupon: "",
  AllCategory: [],
  Cart_Total_Value: 0,
  Contact_us: [],
  MyBills: [],
  RedeemPoint: [],
  Notify: [],
  HotProducts: [],
  Verification: "",
  Mobilenumber: "",
  SearchValue: "",
  SearchResults: [],
  CartLists: [],
  Branchlists: [],
};
export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_SLIDER_LIST:
      return { ...state, Slider_list: payload };
    case GET_HOMEPRODUCT_LIST:
      return { ...state, Products: payload };
    case GET_HOTPRODUCT_LIST:
      return { ...state, HotProducts: payload };
    case WISHLIST_FAVORITES:
      return { ...state, Wish_Fav_List: payload };
    case GET_CATEGORY_LISTITEM:
      return { ...state, Category_List: payload };
    case GET_PACKAGE:
      return { ...state, Package_list: payload };
    case GET_CITY_LIST:
      return { ...state, City_List: payload };
    case GET_PROFILE_DATA:
      return { ...state, ProfileData: payload };
    case GET_WISH_LIST:
      return { ...state, WishList: payload };
    case GET_SINGLEPRODUCT_LIST:
      return { ...state, SingleProduct: payload };
    case GET_SHIPPING_LIST:
      return { ...state, Shipping: payload };
    case GET_COUPONCODE:
      return { ...state, coupon_code: payload };
    case USER_ORDERS:
      return { ...state, Orders: payload };
    case GET_ADDRESS_LIST:
      return { ...state, Address_list: payload };
    case GET_POST_LIST:
      return { ...state, Post_list: payload };
    case FARMER_POST_LIST:
      return { ...state, Farmer_Posts: payload };
    case STOCK_LIST:
      return { ...state, Stock_list: payload };
    case FAQ_LIST:
      return { ...state, Faq_List: payload };
    case RELATED_LIST:
      return { ...state, Related_list: payload };
    case ORDER_LIST:
      return { ...state, order_list: payload };
    case ADDITIONAL_CHARGES:
      return { ...state, AdditionalCharges: payload };
    case RAZORPAY_DETAILS:
      return { ...state, KeyDetails: payload };
    case ADVISOR_VISIT:
      return { ...state, Advisor_visit: payload };
    case ADVERTISEMENT_DETAIL:
      return { ...state, Advertisement: payload };
    case BILLING_INFORMATION:
      return { ...state, BillingInformation: payload };
    case REWARD_POINTS:
      return { ...state, RewardPoints: payload };
    case COUPONCODE:
      return { ...state, Coupon: payload };
    case CATEGORY_LIST:
      return { ...state, AllCategory: payload };
    case CART_TOTAL:
      return { ...state, Cart_Total_Value: payload };
    case CONTACT_US:
      return { ...state, Contact_us: payload };
    case MYBILLS:
      return { ...state, Mybills: payload };
    case REDEEM_POINT_HISTORY:
      return { ...state, RedeemPoint: payload };
    case NOTIFICATIONS:
      return { ...state, Notify: payload };
    case SEARCH_CATEGORY:
      return { ...state, SearchResults: payload };
    case "VERIFICATION":
      return { ...state, Verification: payload };
    case "REGISTER_MOBILENUMBER":
      return { ...state, Mobilenumber: payload };
    case "HandleSearch":
      return { ...state, SearchValue: payload };
    case "CART_LIST":
      return { ...state, CartLists: payload };
    case "BranchList":
      return { ...state, Branchlists: payload };

    default:
      return state;
  }
}
