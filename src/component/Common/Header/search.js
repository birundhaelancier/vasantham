import React from "react";
import Header from "../../../component/Common/Header";
import Footer from "../../../component/Common/Footer";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { ImageUrl } from "../../../Redux/Utils/baseurl";
import dummy from "../../../assets/img/dummy.jpg";
import { useEffect } from "react";
import { SearchCategory } from "../../../Redux/Action/allActions";
const SearchComp = () => {
  let history = useHistory();
  let dispatch = useDispatch();
  const SearchValue = useSelector(
    (state) => state.AllReducer.SearchValue.search
  );
  const SearchResults = useSelector((state) => state.AllReducer.SearchResults);
  useEffect(() => {
    dispatch(SearchCategory(SearchValue));
  }, [SearchValue]);
  return (
    <>
      <Header />
      <div className="container">
        <h6 className="pt-3 pb-4 text-center">Search Results</h6>
        <div className="row">
          {SearchResults?.category?.map((item) => {
            return (
              <div className="pl-2 pr-2 mobile_category  custom_category col-lg-3 col-4 mt-3 mb-3">
                <div onClick={() => history.push(`/shop/${item.slug}`)}>
                  <img src={dummy} />
                </div>
                <p>{item.name}</p>
              </div>
            );
          })}

          {SearchResults?.product?.map((item) => {
            return (
              <div className="pl-2 pr-2 mobile_category  custom_category col-lg-3 col-4 mt-3 mb-3">
                <div
                  onClick={() =>
                    history.push(`/product-details-one/${item.slug}/${item.id}`)
                  }
                >
                  <img src={ImageUrl + item.photo || dummy} />
                </div>
                <p>{item.name}</p>
              </div>
            );
          })}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SearchComp;
