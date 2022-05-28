import React from 'react'
import BlogCard from './BlogCard'
import { BlogData } from './BlogData'
const RelatedPost = () => {
    return (
        <>
            <div className="related_blogs">
                <div className="row">
                    {BlogData.slice(0, 2).map((data, index) => (
                        // para={data.para} 
                        <BlogCard img={data.img} title={data.title} date={data.date} className="col-lg-6 col-md-6 col-sm-6 col-12" button={data.button} key={index} />
                    ))}
                </div>
            </div>
        </>
    )
}

export default RelatedPost