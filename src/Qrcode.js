import QRCode from "qrcode.react";
import { QrReader } from "react-qr-reader";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import ModalComp from "./helpers/Modal";
// import { QrScan } from "react-qr-reader";
export default function App() {
  const [data, setData] = useState("");
  let history = useHistory();
  const [error, seterror] = useState(false);
  const [scan, setscan] = useState(false);
  const Navigate = (data) => {
    window.open(data);
  };

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
      <div>
        {/* <QRCode
          value="https://www.instagram.com/"
          style={{ marginRight: 50 }}
        /> */}
        {/* <QrScan
          delay={300}
          //   onError={handleError}
          //   onScan={handleScan}
          style={{ height: 240, width: 320 }}
        /> */}
      </div>
      <div style={{ width: 500, height: "400" }}>
        {!scan && (
          <QrReader
            // style={{ height: 240, width: 200 }}
            style={{ width: "200px", heigth: "100px" }}
            constraints={{
              facingMode: "environment",
            }}
            // ViewFinder={function noRefCheck() {}}
            onResult={(result, error) => {
              OnResult(result, error);
            }}
          />
        )}
        {/* <p>
          <a href={data} style={{ color: "blue", fontSize: "10px" }}>
            {data}
          </a>
        </p> */}
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

// // // }

// // import React, { Component } from "react";
// // import QrReader from "react-qr-scanner";

// // export default class Test extends Component {
// //   constructor(props) {
// //     super(props);
// //     this.state = {
// //       delay: 100,
// //       result: "No result",
// //     };

// //     this.handleScan = this.handleScan.bind(this);
// //   }
// //   handleScan(data) {
// //     this.setState({
// //       result: data,
// //     });
// //   }
// //   handleError(err) {
// //     console.error(err);
// //   }
// //   render() {
// //     const previewStyle = {
// //       height: 240,
// //       width: 320,
// //     };

// //     return (
// //       <div>
// //         <QrReader
// //           delay={this.state.delay}
// //           style={previewStyle}
// //           onError={this.handleError}
// //           onScan={this.handleScan}
// //         />
// //         <p>{this.state.result}</p>
// //       </div>
// //     );
// //   }
// // }

// import React, { useState } from "react";
// import { Fab, TextareaAutosize } from "@material-ui/core";
// import { ArrowBack } from "@material-ui/icons";
// import { Link } from "react-router-dom";
// import { QrScan } from "react-qr-reader";
// // import { useToolProvider } from "../contexts/tool";

// const QRscanner = () => {
//   const [qrscan, setQrscan] = useState("no result");
//   // const { state, updateInventory } = useToolProvider();

//   const handleError = (err) => {
//     console.error(err);
//   };
//   const [scanResults, setScanResults] = useState();
//   const [scanTrigger, setScanTrigger] = useState(false);
//   const qrScanTrigger = () => {
//     setScanTrigger(true);
//   };
//   const handleScan = (data) => {
//     if (data) {
//       setScanResults(data);
//     }
//   };
//   const submit = () => {
//     // updateInventory(scanResults);
//   };

//   return (
//     <div>
//       <Link to="/">
//         <Fab style={{ marginRight: 10 }} color="primary">
//           <ArrowBack />
//         </Fab>
//       </Link>
//       <span>QR Scanner</span>

//       <center>
//         <div style={{ marginTop: 30 }}>
//           <QrScan
//             delay={300}
//             onError={handleError}
//             onScan={handleScan}
//             style={{ height: 240, width: 320 }}
//             reactivateTimeout={500}
//             onEvent={qrScanTrigger}
//           />
//         </div>
//       </center>

//       <TextareaAutosize
//         style={{ fontSize: 18, width: 320, height: 100, marginTop: 100 }}
//         rowsMax={4}
//         defaultValue={qrscan}
//         value={qrscan}
//       />
//       <div>
//         <h3>{scanResults}</h3>

//         {scanTrigger && <h1>it worked</h1>}
//         <button onClick={submit}>Submit</button>
//         {/* <p>{JSON.stringify(state)}</p> */}
//       </div>
//     </div>
//   );
// };

// export default QRscanner;
