import { QrReader } from "react-qr-reader";
import React, { useState } from "react";
import ModalComp from "./helpers/Modal";
export default function App() {
  const [data, setData] = useState("");
  const [error, seterror] = useState(false);
  const [scan, setscan] = useState(false);

  const OnResult = (result, error) => {
    if (!!result) {
      setscan(true);
      if ("https://vasanthamhypermart.netlify.app/offers" === result?.text) {
        window.open(result?.text);
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
            // style={{ height: 240, width: 200 }}
            style={{ width: "200px", heigth: "100px" }}
            constraints={{
              facingMode: "environment",
            }}
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
