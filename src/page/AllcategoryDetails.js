import { Collapse } from "antd";
import { useSelector } from "react-redux";
import Header from "../component/Common/Header";
import Footer from "../component/Common/Footer";
import { ImageUrl } from "../Redux/Utils/baseurl";
import dummy from "../assets/img/dummy.jpg";
import { useHistory } from "react-router-dom";
const { Panel } = Collapse;

const AllcategoryDetails = () => {
  let history = useHistory();
  const MenuCategories = useSelector(
    (state) => state.AllReducer.MenuCategories
  );

  const para =
    "In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content";
  return (
    <>
      <Header />
      <div className="all-cat-par">
        <Collapse
          // defaultActiveKey={["1"]}
          expandIconPosition={"end"}
          bordered={false}
        >
          {MenuCategories?.map((data, index) => (
            <Panel
              header={
                <div className="allcat-parn">
                  <div>
                    <img
                      src={data?.photo ? ImageUrl + data?.photo : dummy}
                      style={{ width: "80px" }}
                    />
                  </div>
                  <div>
                    <p>{data.name}</p>
                    <p>{para}</p>
                  </div>
                </div>
              }
              key={index}
            >
              {/* <p>{text}</p> */}
              <Collapse
                expandIconPosition={"end"}
                bordered={false}
                style={{
                  margin: "0px 15px",
                }}
              >
                {data?.subcategories?.map((sub, subindex) => (
                  <Panel
                    showArrow={sub?.products?.length > 0 ? true : false}
                    header={
                      <div className="allcat-parn second-child">
                        <div>
                          <img src={dummy} style={{ width: "80px" }} />
                        </div>
                        <div>
                          <p>{sub.name}</p>
                          {/* <p>{para}</p> */}
                        </div>
                      </div>
                    }
                    key={subindex}
                  >
                    {sub?.products?.length > 0 && (
                      <Collapse
                        expandIconPosition={"end"}
                        bordered={false}
                        style={{
                          margin: "0px 15px",
                        }}
                        accordion={false}
                      >
                        {sub?.products?.map((csub, csubindex) => (
                          <Panel
                            showArrow={false}
                            disabled
                            style={{ cursor: "pointer" }}
                            header={
                              <div
                                className="allcat-parn third-child"
                                style={{ cursor: "pointer" }}
                                onClick={() =>
                                  history.push(
                                    `/product-details-one/${csub?.slug}/${csub?.id}`
                                  )
                                }
                              >
                                <div>
                                  <img
                                    src={ImageUrl + csub.photo}
                                    style={{ width: "80px" }}
                                  />
                                </div>
                                <div>
                                  <p>{csub.name}</p>
                                </div>
                              </div>
                            }
                            key={csubindex}
                          >
                            <p>{para}</p>
                          </Panel>
                        ))}
                      </Collapse>
                    )}
                  </Panel>
                ))}
              </Collapse>
            </Panel>
          ))}
        </Collapse>
      </div>
      <Footer />
    </>
  );
};
export default AllcategoryDetails;
