import React, { useState } from 'react'
import Modal from 'react-bootstrap/Modal';
import { useDispatch } from "react-redux";
import main_src from '../assets/img/main_mode.png'
const MaintenceModal = (props) => {
  
    return (
        <div className='my-modal'>
            <Modal {...props}
                size="md"
                aria-labelledby="contained-modal-title-vcenter" centered 
                show={props.showModal} 
                onHide={props.close}
                animation={true} 
                >
                <Modal.Body>
                    <div className="modal-dialog modal-dialog-centered modal-lg pb-2" role="document">
                        <div className="product_one_modal_top modal-content text-center">
                           <div><img src={main_src}/></div>
                           <h3 className='pt-3 pb-2'>Hang on! We are under maintenance</h3>
                           <p>It will not take a long time till we get the error fixed.We will live again</p>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default MaintenceModal