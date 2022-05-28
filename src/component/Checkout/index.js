import React from 'react'
import BillingsInfo from './BillingsInfo'
import Payment from './Payment'
import YourOrders from './YourOrders'
const Checkout = () => {
    return (
        <>
            <section id="checkout_one" className="">
                <div className="container">
                    <div className="row">
                        <BillingsInfo />
                        <div className="col-lg-6 col-md-12 col-sm-12 col-12">
                            <YourOrders />
                            <Payment />
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Checkout