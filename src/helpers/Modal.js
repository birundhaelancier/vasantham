import { Radio } from "antd";
import React from "react";
import Modal from "react-bootstrap/Modal";
export default function ModalComp(props) {
  return (
    <div>
      <Modal
        show={props.showmodal}
        role="dialog"
        className={props.customClass ? props.customClass : "spin_modal"}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        size={props.size}
      >
        <i
          className="fa fa-close close_mod"
          onClick={() => props.handleClose(false)}
        />
        <Modal.Body className="newsleetre_modal">
          <div className="h6 text-center title__txt">{props.title}</div>
          {props.children}
        </Modal.Body>
      </Modal>
    </div>
  );
}
