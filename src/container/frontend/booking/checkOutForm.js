import { PaymentElement } from "@stripe/react-stripe-js";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import { connect } from "react-redux";
import React, { useEffect, useState } from "react";
import * as actions from "../../../store/actions";
import { useHistory } from "react-router-dom"

function CheckoutForm(props) {
  const stripe = useStripe();
  const elements = useElements();
  const history = useHistory();

  const [message, setMessage] = useState(null);
  const [roomCatError, setRoomCatError] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // props.submitBooking(2);
  };

//   useEffect(() => {
//         if (!stripe || !elements) {
//           console.log(elements,"errorrrrrrrrrrrrrrrrrr",stripe)
//       // Stripe.js has not yet loaded.
//       // Make sure to disable form submission until Stripe.js has loaded.
//       return;
//     }
// }, [props?.roomData]);


  useEffect( async () => {
    if (props?.roomData?.Status == 201) {
        setRoomCatError(props?.roomData.RoomCatName)
    }
    else if (props?.roomData?.Status == 200) {
        if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
        }

    setIsProcessing(true);

    const response = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
      },
      redirect: 'if_required'
    });
    console.log("resposne is===================",response)
    if (response.error && response.error.type === "card_error" || response.error && response.error.type === "validation_error") {
        setMessage(response.error.message);
        history.push({
            pathname: `/no-data`,
            errorMessage: response.error.message
        })
    } else if(response.paymentIntent.id) {
        props.submitBooking()
        const sessionID = localStorage.getItem('sessionId')
            history.push({
                pathname: `/booking-confirm/${sessionID}`,
        })
    }
        setIsProcessing(false);
    }
}, [props?.roomData]);

  return (
    <div className="payment-ele">
      <form id="payment-form">
        <PaymentElement id="payment-element" />
        {/* <button disabled={isProcessing || !stripe || !elements} onClick={handleSubmit} id="submit">
          <span id="button-text">
            {isProcessing ? "Processing ... " : "Pay now"}
          </span>
        </button>
        {roomCatError && <div id="payment-message">{roomCatError}</div>} */}
      </form>
    </div>
  );
}

const mapStateToProps = ({ cmsReducer }) => {
    const { loading, error, successRoom, roomData} = cmsReducer;
    return { loading, error, successRoom, roomData};

};
//which actions our function can dispatch
const mapDispatchToProps = (dispatch) => {
    return {
        getRoomDataStart: (data) => dispatch(actions.getRoomData(data)),
        errorHandlerSuccess: () => dispatch(actions.errorHandlerSuccess()),
        //cmsMessageHandler: () => dispatch(actions.cmsMessageHandler()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutForm);