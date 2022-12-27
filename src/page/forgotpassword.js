import React from 'react'
import Header from '../component/Common/Header'
import Banner from '../component/Common/Banner'
import Forgot from '../component/Login/forgotpassword'
import Footer from '../component/Common/Footer'
const ForgotComp = () => {
    return (
        <>
            <Header />
            {/* <Banner title="Login" /> */}
            <Forgot />
            <Footer hide={true}/>
        </>
    )
}

export default ForgotComp