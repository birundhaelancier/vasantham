import React, { useEffect, useState } from 'react'


import { Skeleton } from '@mui/material';

 const EmptyProductLoading = (props) => {

    return (
        <>
            <section id="product_single_one" className="ptb-5 mb-5">
                <div className="container">
                    <div className="row area_boxed">
                    <div className="col-lg-2 mbl">
                      
                        </div>
                        <div className="col-lg-3">
                            <div className="product_single_one_img">
                            <Skeleton variant="rectangular"  height={310}  />   
                            </div>
                        </div>
                     
                        <div className="col-lg-4">
                            <div className="product_details_right_one d-flex align-items-center justify-content-center h-100">

                           <div className='w-100 '>  
                             <Skeleton animation="wave" height={15} />
                             {[...Array(5)].map(()=>
                             <Skeleton animation="wave" height={15} style={{ marginTop:25 }} />
                             )}
                           </div>  

                            </div>
                        </div>
                    </div>
                    <div className="col-lg-2 mbl">
                            
                   </div>
                      
                </div>
            </section>

 
        </>
    )
}


export default EmptyProductLoading;