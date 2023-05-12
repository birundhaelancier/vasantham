import { QrReader } from "react-qr-reader";
import React, { useEffect, useState } from "react";
import ModalComp from "./helpers/Modal";
import { useHistory } from "react-router-dom";
import { isMobile } from "react-device-detect";
export default function App() {
  const [data, setData] = useState("");
  const [error, seterror] = useState(false);
  const [scan, setscan] = useState(false);
  const history = useHistory();
  const OnResult = (result, error) => {
    if (!!result) {
      setscan(true);
      if ("https://vasanthamstore.com/offers" === result?.text) {
        history.push("/offers");
      } else {
        seterror(true);
        setData("");
      }
      setData(result?.text);
    }
  };

  return (
    <div
      style={{
        marginTop: 20,
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
      }}
      className="qrcodescann"
    >
      <div style={{ width: 500, height: "400" }}>
        {!scan && (
          <QrReader
            style={{ width: "200px", heigth: "100px" }}
            constraints={{
              facingMode: "environment",
            }}
            scanDelay={500}
            // videoStyle={{
            //   borderRadius: 15,
            // }}
            // videoId={"video"}
            deviceId={isMobile && 59}
            // videoContainerStyle={{
            //   position: "unset",
            //   paddingTop: "unset",
            // }}
            onResult={(result, error) => {
              OnResult(result, error);
            }}
          />
        )}
      </div>
      <ModalComp showmodal={error} title="Invalid Qr code" size={"350px"}>
        <div>
          <div className="mt-3 mb-3 p-3">
            Invalid QR code. Please refresh the page and try again
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-dismiss="modal"
              onClick={() => {
                seterror(false);
                setData("");
                history.push("/");
              }}
            >
              Ok
            </button>
          </div>
        </div>
      </ModalComp>
    </div>
  );
}
