import React, { useEffect,useState } from 'react'
import { Faq_List } from '../../Redux/Action/allActions'
import { useDispatch,connect } from 'react-redux'
const FaqsArea = (props) => {
    let dispatch=useDispatch()
    const [Faq_Data,setFaq_Data]=useState([])
    useEffect(()=>{
     dispatch(Faq_List())
    },[])
    useEffect(()=>{
     setFaq_Data(props.Faq_List)
    },[props.Faq_List])
    return (
        <>
            <section id="faqs_arae" className="pt-5 pb-5 sort_list">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                        <h4 className='pb-7 pb-5 text-center'>FREQUENTLY ASKED QUESTIONS</h4>
                            <div className="faqs_area_wrapper">
                                <div className="accordion md-accordion" id="accordionEx" role="tablist" aria-multiselectable="true">
                                    {Faq_Data.map((data, index) => (
                                        <div className="card_items_area" key={index}>
                                            <div className="card-header" role="tab" id="headingOne1">
                                                <a data-toggle="collapse" data-parent="#accordionEx" href={"#collapse" + index} aria-expanded="true">
                                                    <h5 className="mb-0">
                                                        {data.title}<i className="fa fa-angle-down rotate-icon"></i>
                                                    </h5>
                                                </a>
                                            </div>
                                            <div id={"collapse" + index} className={index === 0 ? "collapse show active" : "collapse"}
                                                role="tabpanel" data-parent="#accordionEx">
                                                <div className="card-body">
                                                    {data.details}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}


const mapStateToProps = (state) =>
({
    Faq_List: state.AllReducer.Faq_List || [],
});
export default connect(mapStateToProps)(FaqsArea);