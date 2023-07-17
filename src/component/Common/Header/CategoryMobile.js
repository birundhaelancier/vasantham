import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import { useDispatch, useSelector } from "react-redux";
import { Category_List } from "../../../Redux/Action/allActions";
import Image from "../../../assets/img/dummy.jpg";
import { ImageUrl } from "../../../Redux/Utils/baseurl";
import { useHistory } from "react-router-dom";
import { BrowserView, MobileView } from "react-device-detect";
import ProductCardOne from "../Product/ProductCardOne";
import Carosal from "../../Carosal";
import Heading from "../../Heading";
import { colorSet } from "../../../helpers/ListData";
const CategoryComp = () => {
  const MenuCategories = useSelector(
    (state) => state.AllReducer.MenuCategories
  );
  let dispatch = useDispatch();
  let history = useHistory();
  const [Products, setProducts] = useState([]);
  const [slideNumber, setSlideNumber] = useState(3);
  var settings = {
    arrows: false,
    // autoplay:true,
    dots: false,
    infinite: false,
    swipeToSlide: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 1,
        },
      },
    ],
  };

  useEffect(() => {
    if (window.innerWidth >= 550 && window.innerWidth <= 1000) {
      setSlideNumber(2);
    } else if (window.innerWidth < 549) {
      setSlideNumber(1);
    } else if (window.innerWidth >= 1001) {
      setSlideNumber(3);
    }
  }, [slideNumber]);

  useEffect(() => {
    let Data = [];
    MenuCategories?.filter((value) => {
      // if (value.home === 1) {
      Data.push(value);
      // }
    });
    setProducts(Data);
  }, [MenuCategories]);
  const Colors = ["back1", "back2", "back3", "back4", "back5", "back6"];
  return (
    <>
      <MobileView>
        <div className="ltn__testimonial-area section-bg-1--- bg-image-top pt-115 pb-70 mblcart">
          <div className="product-slider-container pt-2">
            <Slider {...settings}>
              {Products.map((item) => {
                return (
                  <div className="pl-2 pr-2 mobile_category">
                    <div onClick={() => history.push(`/shop/${item.slug}`)}>
                      <img src={ImageUrl + item.photo || Image} />
                    </div>
                    <p>{item.name}</p>
                  </div>
                );
              })}
            </Slider>
          </div>
        </div>
      </MobileView>
      <BrowserView>
        <section
          id="product_variation_one"
          className="pt-4 sort_list container"
        >
          <div className="container-fluid">
            <Heading heading="Top Categories" />
            <div
              className="viewall"
              onClick={() => history.push(`/view-detail/category-list`)}
            >
              View All
            </div>
            {Products?.length > 0 && (
              <div>
                <Carosal
                  content={Products?.map((data, index) => {
                    return (
                      <div key={index} className={"p-2"}>
                        <ProductCardOne
                          data={data}
                          key={index}
                          classNames={colorSet()}
                          customcss="mobile-category customfont"
                        />
                      </div>
                    );
                  })}
                />
              </div>
            )}
          </div>
        </section>
      </BrowserView>
    </>
  );
};

export default CategoryComp;
