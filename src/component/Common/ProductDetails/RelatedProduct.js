import React from 'react'
import ProductCard from '../Product/ProductCard'
import { useSelector } from "react-redux";
import Heading from '../../Fashion/Heading'
const RelatedProduct = () => {
    let products = useSelector((state) => state.products.products);
    return (
        <>
            <section id="related_product" className="pb-50">
                <div className="container">
                    <Heading heading="You Might Also Like" para="Mauris luctus nisi sapien tristique dignissim ornare" />
                    <div className="row">
                        {products.slice(0, 12).map((data, index) => (
                            <div className="col-lg-2 col-md-4 col-sm-6 col-6" key={index} >
                                <ProductCard data={data} />
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    )
}

export default RelatedProduct