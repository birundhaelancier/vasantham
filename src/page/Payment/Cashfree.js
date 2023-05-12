import { cashfreeSandbox, cashfreeProd } from "cashfree-dropjs";
import { useState, useEffect } from "react";
import Header from "../../component/Common/Header";
import Footer from "../../component/Common/Footer";
import { dropinComponents } from "../../helpers/ListData";
function CashfreePayment() {
  const [orderToken, setOrderToken] = useState("7RyleyCOzRftapYCmSDb");
  const [checkedState, setCheckedState] = useState(
    new Array(dropinComponents.length).fill(false)
  );
  const [style, setStyle] = useState({});
  const [isProd, setIsProd] = useState(false);
  const [components, setComponents] = useState([]);
  const cbs = (data) => {
    if (data.order && data.order.status === "PAID") {
      // alert('order is paid. Call api to verify');
    }
  };
  const cbf = (data) => {
    // alert(data.order.errorText || 'AAAA');
  };
  const renderDropin = () => {
    if (orderToken === "") {
      // alert('Order Token is empty');
      return;
    }
    if (!components.length) {
      // alert('No drop in specified');
      return;
    }
    let parent = document.getElementById("drop_in_container");
    parent.innerHTML = "";
    let cashfree;
    if (isProd) {
      cashfree = new cashfreeProd.Cashfree();
    } else {
      cashfree = new cashfreeSandbox.Cashfree();
    }
    cashfree.initialiseDropin(parent, {
      orderToken,
      onSuccess: cbs,
      onFailure: cbf,
      components,
      style,
    });
  };

  // const handleOnChange = (position) => {
  //   const updatedCheckedState = checkedState.map((item, index) =>
  //     index === position ? !item : item
  //   );
  //   setCheckedState(updatedCheckedState);
  //   let comp = [];
  //   updatedCheckedState.forEach((item, index) => {
  //     if (item) {
  //       comp.push(dropinComponents[index].id);

  //     }
  //   });

  //   setComponents(comp);
  // };

  const handleStyleChange = () => (e) => {
    setStyle({
      ...style,
      [e.target.id]: e.target.value,
    });
  };

  useEffect(() => {
    let comp = [];
    dropinComponents.forEach((item, index) => {
      if (item) {
        comp.push(item.id);
      }
    });
    setComponents(comp);
  }, [dropinComponents]);
  return (
    <div>
      <Header />
      <div
        className="container dropin-parent pt-3"
        style={{ maxwidth: "800px", width: "800px" }}
        id="drop_in_container"
      >
        {renderDropin()}
      </div>
      <Footer />
    </div>
  );
}

export default CashfreePayment;
