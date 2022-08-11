import React,{useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import logo from '../assets/img/vasanth1.jpg'
import { Profile_Details, RazorpayDetails } from '../Redux/Action/allActions';
export default function RazorpayPayment({show,OrderPlace}) {

    let dispatch=useDispatch()
    const Razorpay=useSelector(state=>state.AllReducer.KeyDetails)
    const ProfileData=useSelector(state=>state.AllReducer.Profile_Details)
    useEffect(()=>{
        dispatch(RazorpayDetails())
        dispatch(Profile_Details())
    },[])

    const options = {
        key: Razorpay?.information?.key || "rzp_test_cDBuRdcX87VjyC",
        amount:100*100, //  = INR 1
        name: 'Agam',
        description: 'Pay Money',
        image:logo,
        handler: function(response) {
            OrderPlace(response)
        },
        prefill: {
            name:ProfileData?.users?.first_name,
            contact:ProfileData?.users?.phone,
            email:ProfileData?.users?.email
        },
        notes: {
            address:"address"
        },
        theme: {
            color: '#007a58',
            hide_topbar: false
        }
      };
      
      const openPayModal = () => {
        var rzp1 = new window.Razorpay(options);
        rzp1.on('payment.failed', function (response){
            show(false)
            Swal.fire({
                icon:"failed",
                title: 'Failed!',
                text: 'Payment Failed Please try again',
                showConfirmButton: false,
                timer: 1500
            })
        });   
        rzp1.open();
    }

      useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.async = true;
        document.body.appendChild(script);
      }, []);
   
  return (
    <div>
       { show ? openPayModal() : ""}
    </div>
  )
}
