import React, { useState } from "react";
import { Link } from "react-router-dom";

const NaveItems = (props) => {
  const [filterItem, setfilterItem] = useState();
  const [subfilterItem, setsubfilterItem] = useState();
  const FilterFun = (data) => {
    setfilterItem(data);
  };
  const SubFilter = (data) => {
    setsubfilterItem(data);
  };
  return (
    <>
      {!props.all ? (
        <li className="has-dropdown">
          <Link
            to={`/shop/${props?.item?.slug}`}
            className="main-menu-link"
            // onMouseLeave={() => setfilterItem([])}
          >
            {props.item.name} {/* {props.item.children.length > 0 && ( */}
            <i className="fa fa-angle-down"></i>
            {/* )} */}
          </Link>
          {props?.item?.subcategories?.length > 0 && (
            <>
              <ul
                className={`sub-menu ${props.Index > 3 && "singlemenu"} ${
                  filterItem?.length > 0 && "megamenu"
                } ${
                  props.Index > 3 && filterItem?.length > 0 && "navsubmenu"
                } bg-clr`}
              >
                <div>
                  {props?.item?.subcategories
                    ?.slice(0, 10)
                    ?.map((data, index) => (
                      <li
                        key={index}
                        title={data.name}
                        onMouseEnter={() => FilterFun(data.products)}
                      >
                        <Link>{data.name}</Link>
                      </li>
                    ))}
                </div>
                <div>
                  {filterItem?.slice(0, 10)?.map((datas, index) => (
                    <li key={index} title={datas.name}>
                      <Link to={`/product-details-one/${datas.slug}`}>
                        {datas.name}
                      </Link>
                    </li>
                  ))}
                </div>
              </ul>
            </>
          )}
        </li>
      ) : (
        <li className="has-dropdown">
          <Link
            // to={`/all-category`}
            className="main-menu-link"
            onMouseLeave={() => setfilterItem([])}
          >
            {"All "}
            <i className="fa fa-angle-down"></i>
          </Link>

          {/* {props?.item?.subcategories?.length > 0 && ( */}
          <>
            <ul
              className={`sub-menu ${props.Index > 3 && "singlemenu"} ${
                filterItem?.length > 0 && "megamenu"
              } bg-clr`}
            >
              <div>
                {props?.item?.slice(0, 10)?.map((data, index) => (
                  <li
                    key={index}
                    title={data.name}
                    onMouseEnter={() => FilterFun(data.subcategories)}
                  >
                    <Link to={`/shop/${data?.slug}`}>{data.name}</Link>
                  </li>
                ))}
              </div>
              <div>
                {filterItem?.slice(0, 10)?.map((datas, index) => (
                  <li
                    key={index}
                    title={datas.name}
                    onMouseEnter={() => SubFilter(datas?.products)}
                  >
                    <Link>{datas.name}</Link>
                  </li>
                ))}
              </div>
              <div>
                {subfilterItem?.slice(0, 10)?.map((datas, index) => (
                  <li key={index} title={datas.name}>
                    <Link to={`/product-details-one/${datas.slug}`}>
                      {datas.name}
                    </Link>
                  </li>
                ))}
              </div>
            </ul>
          </>
          {/* )} */}
        </li>
      )}
    </>
  );
};

export default NaveItems;
