
import React from 'react'
import Modal from 'react-bootstrap/Modal';
import './loading.scss'
const Loading = ({show}) => {
    return (
        <div className='spinner_modal'>
    <Modal show={show}
           role="dialog"
           className="spin_modal"
           aria-labelledby="contained-modal-title-vcenter" centered >
    <Modal.Body className="newsleetre_modal">
        <span className='spinner_load'><i class="fa fa-circle-o-notch fa-spin"></i><div className='process_load'>Processing please wait...</div></span>
   </Modal.Body>
   </Modal>

        </div>
    )
}

export default Loading;