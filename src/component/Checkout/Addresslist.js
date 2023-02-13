import React, { useState, useEffect } from "react";
import { useDispatch, connect, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  Profile_Details,
  Get_Address_List,
} from "../../Redux/Action/allActions";
const AddressDetail = (props) => {
  let dispatch = useDispatch();
  const Address_list = useSelector((state) => state.AllReducer.Address_list);
  const profileDetails = useSelector(
    (state) => state.AllReducer.ProfileData?.users
  );
  const City_List = useSelector((state) => state.AllReducer.City_List);
  const [filterCity, setfilterCity] = useState();

  const ProfileData = {
    first_name: "First Name",
    last_name: "Last Name",
    email: "Email",
    phone: "Phone Number",
    City: "City",
    pincode: "Pincode",
    address: "Address",
  };

  useEffect(() => {
    dispatch(Profile_Details());
    dispatch(Get_Address_List());
  }, []);
  useEffect(() => {
    City_List.find((res) => {
      if (res.id === Number(props?.Address_list[0]?.city)) {
        setfilterCity(res.name);
      }
    });
  }, [Address_list, City_List]);

  return (
    <div className="Address_detail">
      <div className="vendors_profiles">
        <ul>
          {Object.keys(ProfileData).map((data) => {
            return (
              <li>
                <div className="profils_details_vendor">
                  <div className="profile_left">
                    <h4>{ProfileData[data]}</h4>
                  </div>
                  <div className="profile_right">
                    <h4>
                      {data === "City"
                        ? filterCity
                        : data === "pincode" || data === "address"
                        ? Address_list[0] && Address_list[0][data]
                        : (profileDetails && profileDetails[data]) || "-"}
                    </h4>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  ProfileData: state.AllReducer.ProfileData || [],
  Address_list: state.AllReducer.Address_list || [],
});
export default connect(mapStateToProps)(AddressDetail);
