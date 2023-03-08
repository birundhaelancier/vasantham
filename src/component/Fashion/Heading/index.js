import React from "react";

const Heading = (props) => {
  return (
    <>
      <div className="row">
        <div className="col-lg-12">
          <div className="center_heading">
            <h2>{props.heading}</h2>
            {props.para && <p>{props.para}</p>}
          </div>
        </div>
      </div>
    </>
  );
};

export default Heading;
