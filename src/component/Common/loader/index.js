import React from 'react'
import img from '../../../assets/img/newlogo.png';
const Loader = () => {
    return (
        <>
            <div className="loader_wrapper">
                <img width="200px" src={img} alt="loader" />
            </div>
        </>
    )
}

export default Loader