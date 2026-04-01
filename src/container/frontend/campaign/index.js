import React, { useState, useEffect } from 'react'
import UseAnalyticsEventTracker from '../../../components/googleAnalytics';
import ReactPixel from 'react-facebook-pixel';

function Compaign(props) {

    useEffect(() => {
        UseAnalyticsEventTracker('Campaign');
        ReactPixel.trackCustom('Campaign');
        window.location.replace('https://www.booking.com/hotel/pk/serai-boutique-islamabad.en-gb.html?aid=356980&label=gog235jc-1DCAsotQFCGHNlcmFpLWJvdXRpcXVlLWlzbGFtYWJhZEgzWANotQGIAQGYAQm4ARfIAQzYAQPoAQGIAgGoAgO4Aov2kasGwAIB0gIkOTU4ZmQ2ZmEtMjcwYy00MWJjLWI4ZGUtNTJjODEyNmEyMTAz2AIE4AIB&sid=2a1533c89bb7ac943f477e8931ce0678&dist=0&keep_landing=1&sb_price_type=total&type=total&');
    }, []);


    return (
       <></>
    )
}

// //what is needed at start
const mapStateToProps = ({ cmsReducer, authReducer }) => {
   
};
//which actions our function can dispatch
const mapDispatchToProps = (dispatch) => {
    return {
     
    };
};

export default Compaign;