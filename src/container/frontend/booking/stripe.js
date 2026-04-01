import React, { useEffect, useState } from 'react';
import {loadStripe} from '@stripe/stripe-js';
import {Elements} from '@stripe/react-stripe-js';
import CheckoutForm from './checkOutForm';
import { STRIPE_PAYMENT } from '../../../../src/environment';
import { STRIPE_PUB_KEY } from '../../../../src/environment';

import axios from 'axios';

function Stripe(props) {
    // const stripePromise = loadStripe(STRIPE_PUB_KEY);
    const [clientSecret, setClientSecret] = useState("");
    const roomCartItem  = props.roomItem
    const fromDate = props.roomCheckIn
    const toDate =props.roomCheckOut
    const discount = props.discount
    const coupon = props.coupon
    const sessionID = localStorage.getItem('sessionId')
    const [stripePromise, setStripe] = useState(null);

    useEffect(() => {
        // Initialize Stripe.js with publishable key
        setStripe(window.Stripe(STRIPE_PUB_KEY));
      }, []);

    useEffect(() => {
        if(props.paymentInt){
            fetchClientSecret();
            console.log("called intent",props.paymentInt)

        }     
    }, [props.paymentInt]);
    
    const fetchClientSecret = async () => {
        try {
            const response = await axios.post(STRIPE_PAYMENT, {
                roomCartItem,fromDate,toDate,sessionID,discount,coupon
                
            });
            setClientSecret(response.data.clientSecret);
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <>
            {
                stripePromise && clientSecret && <Elements key={clientSecret} stripe={stripePromise} options={{clientSecret}}>
                    <CheckoutForm 
                        submitBooking={props.submitData} 
                    />
                </Elements>
            }
        </>
    );
};

export default Stripe;
