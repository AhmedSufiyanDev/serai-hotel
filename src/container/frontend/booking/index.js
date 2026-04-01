import { connect } from "react-redux";
import React, { useEffect, useState } from "react";
import { generalStyles } from "../general/general";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import "../scss/general.scss";
import "../scss/booking.scss";
import { Loader,CustomSeparator} from "../../../components/index";
import { Button, FormControl, MenuItem, Select, TextField, Box, Card } from "@material-ui/core";
import { InputError } from '../../../components';
import CheckoutForm from "./checkOutForm";
import { cartImage1, cartImage2 } from "../../../assets/images/images";

import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import AuthModal from '../auth/authModal';
import moment from 'moment';
import { validateInputs } from "../../../services/utils";
import { validateConfirmPassword } from "../../../services/utils";
import * as actions from "../../../store/actions";
import { Alert } from '../../../components'
import ResetModal from '../auth/resetModal';
import { Helmet } from "react-helmet";
import UseAnalyticsEventTracker from '../../../components/googleAnalytics';
import ReactPixel from 'react-facebook-pixel';
import { bankIcon, visaIcon, whiteCircle1,  whiteCircle2 } from '../../../assets/images/images';
import { DateRangePicker } from 'react-dates';
import { useStyles } from "./styles";
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import { useCart } from '../layout/cartContext'
import { currency } from "../../../environment";
import {loadStripe} from '@stripe/stripe-js';
import {getFormattedDate} from '../../../environment';
import Stripe from "./stripe"
import {
  PaymentElement,
  Elements,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';


// const myCart = [
//     { image: cartImage1, title: 'Super Deluxe Family Suite', loc: 'F10 , Islamabad, Pakistan.' },
//     { image: cartImage2, title: 'Super Deluxe Family Suite', loc: 'F10 , Islamabad, Pakistan.' },
// ]
// const stripePromise = loadStripe('pk_test_iHoTJQXkhsogRq5jfJs1Qj1f');

function Booking(props) {
    const generalClasses = generalStyles();
    const classes = useStyles();
    const { clearCart, cartItems, checkInDateRoom, checkOutDateRoom, numOfAdultsRoom, numOfChildrenRoom } = useCart();
    const [paymentMethod, setpaymentMethod] = useState([]);
    const [clientSecret, setClientSecret] = useState("");
    const [taxPer, setTax] = useState(16);
    const priceType = cartItems.map((item) => item.Price.match(/([^\d]*)(\d+)/)).find((match) => match !== null)?. [1];
    console.log("priceTypepriceTypepriceTypepriceType",priceType)
    const myCart = cartItems.map((item, index) => (
        { image: item.category_gallery[0].image, title: item.Name, loc: 'F6 , Islamabad.' }
    ))


    //const gaEventTracker = UseAnalyticsEventTracker('Booking-Detail');
   
    const [hasAccount, setHasAccount] = useState(false);
    const [hasPolicy, setHasPolicy] = useState(false);
    const [activeCard, setActiveCard] = useState(null);
    
    const [checkInDate, setCheckInDate] = useState(moment());
    const [checkInDateError, setCheckInDateError] = useState(null);
    const [userID, setUserID] = useState();
    const [checkOutDate, setCheckOutDate] = useState(moment().add(1, 'day'));

    const [checkOutDateError, setCheckOutDateError] = useState(null);

    const [openModal, setOpenModal] = useState(false);

    const [month, setMonth] = useState("");
    const [day, setDay] = useState("");
    const [year, setYear] = useState("");
    const [coupons, setCoupons] = useState("");
    const [couponDiscount, setCouponDiscount] = useState(0);
    const [discountObj, setDiscount] = useState(0);
    const [couponMsg, setCouponMsg] = useState("");
    const [newDiscount, setNewDiscount] = useState(0);
    const [discountCount, setDiscountCount] = useState(0);
    const [couponCount, setCouponCount] = useState(0);
    const [couponID, setCouponID] = useState(0);
    const [genericDiscount, setGenericDiscount] = useState(0);
    const [checkPaymentMethod, setCheckPaymentMethod] = useState(0);
    const [paymentIntent, setPaymentIntent] = useState(0);
    const [radioArray, setRadioArray] = useState([]);
    const [errorRoom, setErrorRoom] = useState(false);
    const date1 = moment(checkInDate);//CheckInDate
    // const date1 = moment(props?.location?.fromDate._d);//CheckInDate
    const formattedDate1 = date1.format("ddd, MMM D");
    const date2 = moment(checkOutDate);
    const formattedDate2 = date2.format("ddd, MMM D");//CheckOutDate
    const nights = date2.diff(date1, "days");

    const totalPrice = cartItems.reduce((total, item) => total + (item.Price).replace(/\D/g, '') * item.count, 0);
    // const percentValue = totalPrice * (paymentMethod?.tax / 100);
    const roomTotal = (totalPrice * nights);
    const percentagePrice = roomTotal * (taxPer / 100);
    const totalDiscount = (roomTotal + percentagePrice) * (newDiscount/100);
    const totalCpnDiscount = (roomTotal + percentagePrice) * (couponDiscount/100);
    const subTotal = (roomTotal + percentagePrice) - totalDiscount - totalCpnDiscount;
    // const taxAmount = ((props?.location?.configData.tax)/100)*(props?.location?.booking?.room_category.room_detail.Price*nights)
    // const totatAmount = taxAmount + (props?.location?.booking?.room_category.room_detail.Price*nights)
    const [selectedOption, setSelectedOption] = useState('1');
    const [values, setValues] = useState({
        Email: '',
        FName: '',
        Adult: '',
        Children: '',
        checkInDates: '',
        CheckOutDates: '',
        Phone: '',
        Password: '',
        confirm_password: '',
        Policy: '',
        RecNews: 0,
    });
    const [showError, setShowError] = useState(false);
    const [errors, setErrors] = React.useState({
        Email: '',
        FName: '',
        Phone: '',
        Adult: '',
        Children: '',
        checkInDates: '',
        CheckOutDates: '',
        confirm_password: '',
        Policy: ''
    });
    const isSmallScreen = window.innerWidth < 768;



    const [focusedInput, setFocusedInput] = useState(false);

    const [openAdultsChildren, setOpenAdultsChildren] = React.useState(false);
    const [numOfAdults, setNumOfAdults] = useState(numOfAdultsRoom);
    const [numOfChildren, setNumOfChildren] = useState(numOfChildrenRoom);
    const [formData, setFormData] = useState([]);
    const [roomCatError, setRoomCatError] = useState('');
    

    const handleDatesChange = ({ startDate, endDate }, discount) => {
        
        let sDate = startDate ? startDate : checkInDate
        let eDate = endDate ? endDate : checkOutDate
        setNewDiscount(discount ? discount?.Discount : 0)
        if (discount) {
            console.log('discountObj is ', discount);
            setCouponID(discountObj.id);
        }
        if (discount?.Discount > 0) {
            setDiscountCount(discountCount + 1);
            setGenericDiscount(discount?.Discount);
        }else{
            setDiscountCount(0);
        }
        setCheckInDate(sDate);
        setCheckOutDate(eDate);
        setPaymentIntent(paymentIntent+1)
        
        let data ={}
        data.address = 'Islamabad'
        data.fromDate = sDate.format("YYYY-MM-D") 
        data.toDate = eDate.format("YYYY-MM-D") 
        data.numOfAdults = numOfAdults
        data.numOfChildren = numOfChildren
        data.sessionID=localStorage.getItem('sessionId')
        let fd = new FormData();
        for (let item in data)
            fd.append(item, data[item]);
        props.setParamDataStart(fd);
        
    };

    const handleCouponCode = () => {
        if (coupons.length) {
            props.getUserData({ coupon: coupons })
        }
    };

    const couponIntent = () => {
        let sDate = checkInDate
        let eDate = checkOutDate
        setNewDiscount(0)
        if (couponDiscount > 0) {
            setCouponCount(couponCount + 1);
        }else{
            setCouponCount(0);
        }
        setCheckInDate(sDate);
        setCheckOutDate(eDate);
        setPaymentIntent(paymentIntent+1)
        
        let data ={}
        data.address = 'Islamabad'
        data.fromDate = sDate.format("YYYY-MM-D") 
        data.toDate = eDate.format("YYYY-MM-D") 
        data.numOfAdults = numOfAdults
        data.numOfChildren = numOfChildren
        data.sessionID=localStorage.getItem('sessionId')
        let fd = new FormData();
        for (let item in data)
            fd.append(item, data[item]);
        props.setParamDataStart(fd);
    }

    useEffect(() => {
        if(props.successUser){
            if (props?.userData?.status === 200) {
                setCouponDiscount(props?.userData?.data.Discount)
                setCouponMsg("");
                couponIntent();
                setCouponID(props?.userData?.data.id);
                setGenericDiscount(props?.userData?.data.Discount);
            }else{
                setCouponMsg(props?.userData?.data);
            }
        }
    }, [props?.successUser]);
    
    const [breadCrumbsList, setBreadCrumbsList] = useState([
        {text: 'Home', url: '/'},
        {text: 'Booking Details', url: ''},
    ]);

    const renderCalendarInfo = () => {
        return (
            <div className="custom-calendar-info">
                <button className="custom-close-button" onClick={handleClosePicker}>
                    X
                </button>
            </div>
        );
    };

    const onChangeInput = (value) => {
        setCoupons(value);
    }

    useEffect(() => {
        function handleClickOutside(event) {
            const clickedPersonIcon = event.target.closest('.guest-svg');
            const clickedAdultChildField = event.target.closest('#adult-child-field');
            const clickedButton = event.target.closest('.drop-icon');
            const clickedInside = event.target.closest('.adults-children-div');
            if (!clickedPersonIcon && !clickedAdultChildField && !clickedButton && !clickedInside) {
                setOpenAdultsChildren(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleClosePicker = () => {
        setFocusedInput(null);
    };

    const handleOpen = () => {
        setOpenModal(true);
    };

    const handleClose = () => {
        setOpenModal(false);
    };

    useEffect(() => {
        if(props.successpaymentData){
            setpaymentMethod(props?.paymentData)
            setTax(props?.paymentData?.tax)
            setDiscount(props?.paymentData?.coupons);
            setCheckPaymentMethod(props?.paymentData?.countryCode);
           
            if (props?.paymentData?.countryCode === 1) {
                setRadioArray([{ id: 1, title: 'UBL', icon: bankIcon }]);
            } else {
                setRadioArray([{ id: 2, title: 'Stripe', icon: visaIcon }]);
            }
        }
    }, [props?.successpaymentData]);
    
    useEffect(() => {
        props.getParamsData({sessionID:localStorage.getItem('sessionId')})
        props.getPaymentGateway();
        UseAnalyticsEventTracker('BookingDetail');
        ReactPixel.trackCustom('BookingDetail');
    }, []);

    useEffect(() => {
        if (props?.successParam && props.paramData.length!=0) {
            setCheckInDate(new moment(props.paramData[0].FromDate))
            setCheckOutDate(new moment(props.paramData[0].ToDate));
            setNumOfAdults(props.paramData[0].NumofAdult);
            setNumOfChildren(props.paramData[0].NumOfChildren);
            setPaymentIntent(paymentIntent+1)
        }
        else if(props?.successParam && props.paramData.length==0){
            setPaymentIntent(paymentIntent+1)

        }
        setTimeout(() => {
          props.errorHandlerSuccess()
      }, 500)   
    }, [props?.successParam]);

    

    useEffect(() => {
        var url = document.URL.split("/");

        window.onpopstate = () => {
            window.location.replace(url[0] + '//' + url[2]);
        };
    });

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }, [props.location.pathname]);

    useEffect(() => {
        if (props?.roomData?.Status == 201) {
            setRoomCatError(props?.roomData.RoomCatName)
        }
        else if (props?.roomData?.Status == 200) {
            formData.append('CheckInDate', checkInDate.format("YYYY-MM-D"))
            formData.append('CheckOutDate', checkOutDate.format("YYYY-MM-D"))
            formData.append('adult', numOfAdults)
            formData.append('children', numOfChildren)
            // const submissionData = {...formData,CheckInDate:date1.format("YYYY-MM-D") + ' ' + paymentMethod?.arrivalTime, CheckOutDate:date2.format("YYYY-MM-D") + ' ' + paymentMethod?.departureTime, adult:numOfAdults, children:numOfChildren}
            props.submitBookingData(formData)
        }
    }, [props?.roomData]);

    const submitData = () => {
        props.submitBookingData(formData)
    }

    useEffect(() => {
        const user = localStorage.getItem('guest')
        const userObject = JSON.parse(user);

        if (user) {
            const userID = userObject.UserID
            console.log("userID is", userID)
            setUserID(userID)
        }

    }, []);
    useEffect(() => {
        if (props?.successBooking == 200) {
            setShowError(false)
            window.location.href = props?.paymentUrl
            console.log("paymentUrl",props?.paymentUrl)
            // localStorage.removeItem('cart');
            // localStorage.removeItem('sessionId');
            // props.history.push({
            //     pathname: `/booking-confirm`,
            //     Name: props?.guestName,
            //     Phone: props?.guestPhone,
            //     Email: props?.guestEmail,
            //     bookingData: props?.bookingData
            // });

            // clearCart()
        }
        else if(props?.successBooking == 202){
        //     const sessionID = localStorage.getItem('sessionId')
        //     console.log("sessionID========",sessionID)
        //     props.history.push({
        //         pathname: `/booking-confirm/${sessionID}`,
        // })
    }
        else if (props?.successBooking == 400) {
            setShowError(true);
        }
    }, [props?.successBooking]);

    // const formatPrice = (amount) => {
    //     const formattedAmount =(Math.ceil(Number(amount))).toLocaleString('en-PK', {
    //         style: 'currency',
    //         currency:currency,
    //         minimumFractionDigits: 0,
    //         maximumFractionDigits: 0,
    //     });
    //     return formattedAmount
    // }

    // useEffect(() => {
    //     // Create PaymentIntent as soon as the page loads
    //     fetch("http://localhost:8000/api/v1/create-payment-intent", {
    //         method: "POST",
    //         headers: { "Content-Type": "application/json" },
    //         body: JSON.stringify({ items:JSON.stringify(cartItems.map(item => (
    //             { RoomCatID: item?.RoomCatID ? item?.RoomCatID : item?.room_category.id, NoOfRooms: item?.count, Rate: item?.Price ? item.Price : item.room_category.Price }
    //         )))}),
    //       })
    //       .then((res) => res.json())
    //       .then((data) => setClientSecret(data.clientSecret));
    //   }, []);
    
    //   const appearance = {
    //     theme: 'stripe',
    //   };
    //   const options = {
    //     clientSecret,
    //     appearance,
    //   };



    // const months = [
    //     "January", "February","March","April",
    //     "May","June","July","August","September",
    //     "October","November","December",
    //   ];
    // // let token = props.location.pathname.split('/')[2];

    //   const days = [...Array(31).keys()].map((day) => day + 1);

    //   const currentYear = new Date().getFullYear();
    //   const years = [...Array(100).keys()].map((year) => currentYear - year);


    const handleChange = (prop) => (event) => {
        if (prop == "Policy") {
            setValues({ ...values, [prop]: (event.target.checked) ? 1 : '' });
        }
        else {
            setValues({ ...values, [prop]: event.target.value });
        }

        if (prop === 'NoOfRooms') {
            const inputValue = event.target.value;
            const maxValue = props?.location?.booking.total;

            if (inputValue === '' || parseInt(inputValue) > maxValue) {
                setErrorRoom(true)
            }
            else {
                setErrorRoom(false)
            }
        }

        setErrors({
            ...errors,
            [prop]: ''
        });

    };

    const handleOptionChange = (event) => {
        console.log("button is clicked", event.target.value)
        setSelectedOption(event.target.value);
    };
    const numberAdults = () => {
        if (numOfAdults > 0) {
            setNumOfAdults(numOfAdults - 1); // Update the count state
        }
    }
    const numberChild = () => {
        if (numOfChildren > 0) {
            setNumOfChildren(numOfChildren - 1); // Update the count state
        }
    }


    const submitBooking = (value) => {
        UseAnalyticsEventTracker('Booking');
        ReactPixel.trackCustom('Booking');
        //gaEventTracker("Submit-Booking");
        let { Email, FName, Phone } = values;
        let data = { Email, FName, Phone, }
        let recordedErrors = validateInputs(data);
        console.log('recordedErrors ', recordedErrors);
        let passwordErrors = validateConfirmPassword(values.Password, values.confirm_password);

        if (Object.keys(recordedErrors).length > 0) {
            if (recordedErrors.Policy) {
                recordedErrors['Policy'] = "Policy should be selected";
            }
            setErrors(recordedErrors);
        }
        else if (Object.keys(recordedErrors).length === 0 && values.Password.length < 8 && hasAccount) {
            setErrors({
                ...errors,
                confirm_password: "Password should be greater than 8 characters"
            });
        }
        else if (Object.keys(recordedErrors).length === 0 && !passwordErrors && hasAccount) {
            setErrors({
                ...errors,
                confirm_password: "Passwords do not match"
            });
        }

        else if (errorRoom) {
            setErrors({
                ...errors,
                NoOfRooms: "Enter Valid Room No"
            });
        }
        // else if (!/^03\d{9}$/.test(Phone)) {
        //     setErrors({
        //         ...errors,
        //         Phone: "Mobile number should start with 03 and be 11 digits long"
        //     });
        // }

        else {
            data.Name = FName
            data.HotelID = 1
            data.SessionID = localStorage.getItem('sessionId')
            if (userID) {
                data.UserID = userID
            }
            // data.CheckInDate = date1.format("YYYY-MM-D") + ' ' + paymentMethod?.arrivalTime
            // data.CheckOutDate = date2.format("YYYY-MM-D") + ' ' + paymentMethod?.departureTime
            // data.adult = numOfAdults
            // data.children = numOfChildren
            data.IsPaid = 2
            data.TaxInclude = 1
            data.IsCms = 0
            data.BookingPrice = subTotal
            data.CouponID = couponID
            data.coupon = coupons
            data.discount = newDiscount
            data.paymentMethod = checkPaymentMethod
            data.NoOfRooms = cartItems.reduce((acc, room) => acc + room.count, 0);
            data.room = JSON.stringify(cartItems.map(item => (
                { RoomCatID: item?.RoomCatID ? item?.RoomCatID : item?.room_category.id, NoOfRooms: item?.count, Rate: item?.Price ? item.Price : item.room_category.Price }
            )));
            data.roomCartItem = data.room
            if (hasAccount) {
                data.Password = values.Password
                data.register = 1;
            }
            let fd = new FormData();
            for (let item in data)
                fd.append(item, data[item]);

            //gaEventTracker("Process-Payments");
            UseAnalyticsEventTracker('GoToPayments');
            ReactPixel.trackCustom('GoToPayments');
            setFormData(fd)
            // console.log("data to submit is", paymentIntent+1); return;
            props.getRoomDataStart({ address: 'Islamabad', fromDate: checkInDate, toDate: checkOutDate, RoomCatID: JSON.stringify(cartItems.map(item => ({ RoomCatID: item?.RoomCatID ? item?.RoomCatID : item?.room_category.id, CatName: item?.Name ? item.Name : item?.room_category.Name, NoOfRooms: item?.count })))});

            // if(roomsAvailable){
            //     props.submitBookingData(fd);
            // }
        }
    };

    return (
        <div className="booking" style={{ marginBottom: "50px" }}>
            <Helmet>
                <title>{'Book Hotel in Islamabad | Easy Booking, Secure and Best Rates'}</title>
                <meta name='description' content='Discover Best hotels in Islamabad at Serai.com.pk. Enjoy hassle-free & secure hotel booking for Deluxe Rooms at the best rates. Experience comfort & convenience' />
                <meta name="keywords" content='Book Hotel in Islamabad,  Serai Boutique Hotel Islamabad, Luxury hotel Islamabad, Hotel in Islamabad, Private Dining, guest house in Islamabad, Rockville house, room in Islamabad, Best guest house in Islamabad, Islamabad room services, hotels in F-6 islamabad, book hotels in Islamabad, best hotel Islamabad, Islamabad hotel booking' />
            </Helmet>
            <div className="header-heigt-fix"></div>
            <div className="header-blog-fixes">
                <Container fixed>
                    <Grid container>
                        <Grid item xs={12} md={12} lg={12} >
                            <CustomSeparator
                                        breadCrumbsList={breadCrumbsList}
                                        {...props}
                                        setBreadCrumbsList={setBreadCrumbsList}
                            />
                            {/* <span className='breadcrum-blogs'>
                                Serai / booking-information </span> */}
                        </Grid>
                    </Grid>
                </Container>
            </div>
            <Container fixed>
                <div className="">
                    <h2 className="book-detail-heading">Booking Detail </h2>
                    {/* <p className="form-top-para">Are you returning customer? <span className="cursor-button" onClick={() => handleOpen()}>Click here to Login</span></p> */}
                    <p className="booking-detail-descp">Please provide the necessary details for your booking reservation</p>
                </div>
            </Container>

            <Container fixed>
                <Grid container spacing={5}>
                    <Grid item lg={8}>
                        <form id="contactForm" className="needs-validation form-custom-vn" novalidate="" style={{ borderRadius: '22px', background: "#F3F8FC" }}>
                            <div className="user-info-detail">
                                {/* <i className="me-3">
                                <svg width="24" height="30" viewBox="0 0 24 30" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M23.25 30.0007H20.75V23.697C20.749 22.717 20.3593 21.7774 19.6663 21.0844C18.9733 20.3915 18.0338 20.0017 17.0537 20.0007H6.94625C5.96625 20.0017 5.02667 20.3915 4.3337 21.0844C3.64074 21.7774 3.25099 22.717 3.25 23.697V30.0007H0.75V23.697C0.751985 22.0542 1.40544 20.4793 2.56703 19.3177C3.72862 18.1562 5.30351 17.5027 6.94625 17.5007H17.0537C18.6965 17.5027 20.2714 18.1562 21.433 19.3177C22.5946 20.4793 23.248 22.0542 23.25 23.697V30.0007Z" fill="#E6B022"/><path d="M11.9999 14.9999C10.5166 14.9999 9.06652 14.56 7.83315 13.7359C6.59978 12.9118 5.63849 11.7405 5.07083 10.37C4.50317 8.99956 4.35465 7.49156 4.64404 6.0367C4.93343 4.58185 5.64773 3.24547 6.69663 2.19658C7.74552 1.14769 9.08189 0.433381 10.5368 0.143992C11.9916 -0.145397 13.4996 0.00312757 14.8701 0.570785C16.2405 1.13844 17.4118 2.09974 18.236 3.3331C19.0601 4.56647 19.4999 6.01652 19.4999 7.49988C19.4979 9.4884 18.7071 11.3949 17.301 12.801C15.8949 14.2071 13.9884 14.9979 11.9999 14.9999ZM11.9999 2.49988C11.011 2.49988 10.0443 2.79313 9.22208 3.34253C8.39983 3.89194 7.75897 4.67283 7.38053 5.58646C7.00209 6.50009 6.90307 7.50543 7.096 8.47533C7.28893 9.44524 7.76513 10.3362 8.46439 11.0354C9.16366 11.7347 10.0546 12.2109 11.0245 12.4038C11.9944 12.5967 12.9997 12.4977 13.9133 12.1193C14.827 11.7408 15.6079 11.1 16.1573 10.2777C16.7067 9.45549 16.9999 8.48879 16.9999 7.49988C16.9999 6.1738 16.4731 4.90203 15.5355 3.96435C14.5978 3.02667 13.326 2.49988 11.9999 2.49988Z" fill="#E6B022"/></svg>
                            </i> */}
                                <div className="user-info-style">
                                    <span>User Information</span>
                                </div>
                            </div>
                            <div className="card boking-wrap-forms">
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={12} md={6} className="p-10" style={{ width: '40%' }}>
                                        <FormControl className={`${generalClasses.fullWidth} positionRelative`}>
                                            <label className="form-label-bokdetail ">Full Name<span className="compl-error">*</span></label>
                                            <TextField type="text" className="form-control-custome form-control-customer" placeholder="Enter Your First Name" value={values.FName} onChange={handleChange('FName')} variant="outlined" />
                                        </FormControl>
                                        <span className="err-text">{errors?.FName && <InputError message={"First Name is required"} />}</span>
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={6} className="p-10" style={{ width: '40%' }}>
                                        <FormControl className={`${generalClasses.fullWidth} positionRelative`}>
                                            <label className="form-label-bokdetail "> Email <span className="compl-error">*</span></label>
                                            <TextField
                                                type="text"
                                                className="form-control-custome form-control-customer"
                                                placeholder="Enter Your Email"
                                                value={values.Email}
                                                onChange={handleChange('Email')}
                                                required
                                                variant="outlined"
                                            />
                                        </FormControl>
                                        <span className="err-text"> {errors?.Email && <InputError message={errors['Email']} />}</span>
                                    </Grid>

                                    {/* <Grid item xs={12} sm={12} md={6} className="p-10" style={{ width: '40%' }}> */}
                                    {/* <FormControl className={`${generalClasses.fullWidth} positionRelative`}> */}
                                    {/* <label className="form-label-bokdetail ">Last Name</label> */}
                                    {/* <TextField type="text" className="form-control-custome " placeholder="Enter Your Last Name" value={values.LName} onChange={handleChange('LName')} variant="outlined" /> */}
                                    {/* <InputError message="Valid first name is required." /> */}
                                    {/* </FormControl> */}
                                    {/* </Grid> */}

                                    {/* <Grid item xs={12} sm={12} md={6} className="p-10" style={{width:'40%'}}>
                                    <FormControl className={`${generalClasses.fullWidth} positionRelative`}>
                                        <label className="form-label-bokdetail ">Confirm Email<span className="compl-error">*</span></label>
                                        <TextField type="text" className="form-control-custome "  placeholder="Confirm Email" value="" required variant="outlined" />
                                        <InputError message="Valid first name is required." />                    
                                    </FormControl>
                                </Grid> */}
                                    <Grid item xs={12} sm={12} md={6} className="p-10" style={{ width: '40%' }}>
                                        <FormControl className={`${generalClasses.fullWidth} positionRelative`}>
                                            <label className="form-label-bokdetail">Phone Number <span className="compl-error">*</span></label>
                                            <TextField type="text" className="form-control-custome form-control-customer" placeholder="Phone Number" value={values.Phone} onChange={handleChange('Phone')} variant="outlined" />
                                        </FormControl>
                                        <span className="err-text">{errors?.Phone && <InputError message={errors?.Phone} />}</span>
                                    </Grid>
                                    {/* <Grid item xs={12} sm={12} md={6} className="p-10" style={{ width: '40%' }}>
                                        <FormControl className={`${generalClasses.fullWidth} positionRelative`}>
                                            <label className="form-label-bokdetail ">Address</label>
                                            <TextField type="text" className="form-control-custome " placeholder="Enter Your Address" value={values.Address} onChange={handleChange('Address')} variant="outlined" />
                                        </FormControl>
                                    </Grid> */}
                                    {/* <Grid item xs={12} sm={12} md={6} className="p-10" style={{ width: '40%' }}>
                                        <FormControl className={`${generalClasses.fullWidth} positionRelative`}>
                                            <label className="form-label-bokdetail ">Number of Rooms</label>
                                            <TextField type="number" className="form-control-custome " placeholder="No of Rooms" value={values.NoOfRooms} onChange={handleChange('NoOfRooms')} variant="outlined"
                                                inputProps={{
                                                    min: 1,
                                                    // max: props?.location?.booking.total
                                                }}
                                            />
                                            {errorRoom && <InputError message="Enter Valid Room No" />}
                                        </FormControl>
                                    </Grid> */}


                                    {/* <Grid item xs={12} sm={12} md={3} className="p-10" style={{width:'40%'}}>
                                    <label className="form-label-bokdetail " style={{display:'block'}}>Country Code<span className="compl-error">*</span></label>
                                    <FormControl className={`${generalClasses.fullWidth} positionRelative`}>
                                        <Select value="1" variant="outlined" className="select-dropdown form-control-custome select-drarrow">
                                            <MenuItem value="1">PAK +92</MenuItem>
                                            <MenuItem value="">Option 1</MenuItem>
                                            <MenuItem value="">Option 2</MenuItem>
                                            <MenuItem value="">Option 3</MenuItem>
                                            <MenuItem value="">Option 4</MenuItem>
                                            <MenuItem value="">Option 5</MenuItem>
                                            <MenuItem value="">Option 6</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid> */}

                                    {/* <Grid item xs={12} sm={12} md={12} className="p-10" style={{width:'100%'}}>
                                    <FormControl className={`${generalClasses.fullWidth} positionRelative`}>
                                        <label className="form-label-bokdetail ">Birth Day <span className="compl-error">*</span></label>
                                        <Grid container spacing={2}>
                                            <Grid item xs={12} sm={12} md={4}>
                                                <Select variant="outlined" value={values.Month} onChange={handleChange('Month')} className={`${generalClasses.fullWidth} select-dropdown form-control-custome select-drarrow`}>
                                                    <MenuItem value="0">Month</MenuItem>
                                                    {months.map((month, index) => (
                                                         <MenuItem key={index} value={month}>
                                                            {month}
                                                         </MenuItem>
                                                    ))}
                                                </Select>  
                                            </Grid>
                                            <Grid item xs={12} sm={12} md={4}>
                                                <Select variant="outlined" value={values.Day} onChange={handleChange('Day')} className={`${generalClasses.fullWidth} select-dropdown form-control-custome select-drarrow`}>
                                                    <MenuItem value="0">Day</MenuItem>
                                                    {days.map((day, index) => (
                                                         <MenuItem key={index} value={day}>
                                                            {day}
                                                         </MenuItem>
                                                    ))}
                                                </Select>
                                            </Grid>
                                            <Grid item xs={12} sm={12} md={4}>
                                                <Select variant="outlined" value={values.Year} onChange={handleChange('Year')} className={`${generalClasses.fullWidth} select-dropdown form-control-custome select-drarrow`}>
                                                    <MenuItem value="0">Year</MenuItem>
                                                    {years.map((year, index) => (
                                                         <MenuItem key={index} value={year}>
                                                            {year}
                                                         </MenuItem>
                                                    ))}
                                                </Select>   
                                            </Grid>
                                        </Grid>
                                        {errors?.Month && <InputError message={errors['Month']}/> || errors?.Day && <InputError message={errors['Day']}/> || errors?.Year && <InputError message={errors['Year']}/>}
                                    </FormControl>
                                </Grid> */}
                                    {!userID &&
                                        <Grid item xs={12} sm={12} md={12} lg={7} className="p-10">
                                            <div className="account-checkbox-div">
                                                <div className="checkbox">
                                                    <div className="round">
                                                        <input type="checkbox" onClick={() => setHasAccount(true)} checked={hasAccount} id="checkbox2" />
                                                        <label for="checkbox2"></label>
                                                    </div>
                                                    <span>Create Account</span>
                                                </div>
                                                <span className="or-span">OR</span>
                                                <div className="checkbox">
                                                    <div className="round">
                                                        <input type="checkbox" onClick={() => setHasAccount(false)} checked={!hasAccount} id="checkbox1" />
                                                        <label for="checkbox1"></label>
                                                    </div>
                                                    <span>Continue As Guest</span>
                                                </div>
                                            </div>
                                        </Grid>
                                    }
                                    {
                                        hasAccount &&
                                        <Grid item xs={12} sm={12} md={6} className="p-10 password-div" style={{ width: '40%' }}>
                                            <FormControl className={`${generalClasses.fullWidth} positionRelative`}>
                                                <label className="form-label-bokdetail ">Password<span className="compl-error">*</span></label>
                                                <TextField type="password" className="form-control-custome form-control-customer" placeholder="Create Password" value={values.Password} onChange={handleChange('Password')} variant="outlined" />
                                                <div className="inform-feedback">
                                                    (8-30 characters, no spaces)
                                                </div>
                                                {errors?.confirm_password && <InputError message={errors?.confirm_password} />}
                                            </FormControl>
                                        </Grid>
                                    }
                                    {
                                        hasAccount &&
                                        <Grid item xs={12} sm={12} md={6} className="p-10 confirm-password-div" style={{ width: '40%' }}>
                                            <FormControl className={`${generalClasses.fullWidth} positionRelative`}>
                                                <label className="form-label-bokdetail ">Confirm Password<span className="compl-error">*</span></label>
                                                <TextField type="password" className="form-control-custome form-control-customer" placeholder="Confirm Password" value={values.confirm_password} onChange={handleChange('confirm_password')} variant="outlined" />
                                                {/* <InputError message="Valid first name is required." />                                                                                     */}
                                            </FormControl>
                                        </Grid>
                                    }
                                    <Grid item xs={12} sm={12} md={12} className="p-10" style={{ width: '100%' }}>
                                        {/* <div className="form-check custome-checkbox">
                                        <input className="form-check-input" type="checkbox" value="" id="flexCheck2" checked/>
                                        <label className="form-check-label" for="flexCheck2">
                                        Receive occasional news about Serai, new locations, and special deals.
                                        </label>
                                    </div> */}
                                    </Grid>
                                </Grid>
                                <hr className="dash-line"></hr>
                            </div>
                            <section className="boking-wrap-forms" style={{ marginBottom: '40px' }}>
                                <div>
                                    <h2 className="book-info-font-style"> Booking Information</h2>
                                </div>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={12} md={6} className="p-10" >
                                        <div className=" home-date-picker ">
                                            <div>
                                                <div>
                                                    <label for="checkInDate" class="date-colour" className="form-label-boking-check">Check In/Check out</label>
                                                </div>
                                                <Box className="date-range-picker-container">
                                                    <DateRangePicker
                                                        className='montserrat'
                                                        startDate={checkInDate}
                                                        endDate={checkOutDate}
                                                        startDatePlaceholderText="Check-in"
                                                        endDatePlaceholderText="Check-out"
                                                        noBorder
                                                        keepOpenOnDateSelect={true}
                                                        onDatesChange={handleDatesChange}
                                                        focusedInput={focusedInput}
                                                        onFocusChange={focusedInput => setFocusedInput(focusedInput)}
                                                        renderCalendarInfo={renderCalendarInfo}
                                                        customArrowIcon={<i className={`${classes.checkoutSvgIcon} checkout-svg-icon norepeat-img-icon`}></i>}
                                                        displayFormat="ddd, MMM D"
                                                        orientation={isSmallScreen ? 'vertical' : 'horizontal'}
                                                    />
                                                </Box>
                                            </div>
                                            <div className="date-required-error">
                                                {(!checkInDate && checkInDateError) &&
                                                    <InputError
                                                        message={checkInDateError}
                                                    />
                                                }
                                                {(!checkOutDate && checkOutDateError) &&
                                                    <InputError
                                                        message={checkOutDateError}
                                                    />
                                                }
                                            </div>
                                            {/* <span className="spacer-vert-search spacer-vert-search-left"></span> */}
                                        </div>
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={5} lg={6}>
                                        <div className="positionRelative">
                                            {/* <i className={`${classes.guestSvg} guest-svg norepeat-img me-3 cursor-button`} onClick={() => setOpenAdultsChildren(true)}></i> */}
                                            <div id="adult-child-field" onClick={() => setOpenAdultsChildren(true)}>
                                                <label className="no-guest-style">Number of Guests</label>
                                                <div className="selected-modal cursor-button">
                                                    <div className="drop-icon cursor-button" onClick={() => setOpenAdultsChildren(true)}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="10" viewBox="0 0 18 10" fill="none">
                                                            <path d="M16.9318 1.45129L10.4118 7.97129C9.6418 8.74129 8.3818 8.74129 7.6118 7.97129L1.0918 1.45129" stroke="#797979" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                                        </svg>
                                                    </div>
                                                    <label className="form-labels form-label-customes cursor-button montserrat">
                                                        {numOfAdults} Adult{numOfAdults > 1 && 's'} - {numOfChildren} {numOfChildren > 1 ? 'Children' : 'Child'}
                                                    </label>
                                                    <div>
                                                        {/* <label for="noOfGuest" class="date-colour ">Number of Guests</label> */}
                                                    </div>
                                                </div>
                                            </div>
                                            {
                                                openAdultsChildren &&
                                                <div className="adults-children-div">
                                                    <Grid container>
                                                        <Grid item xs={8} sm={8} lg={8}>
                                                            <div className="age-group">
                                                                <p>Adults</p>
                                                                <span>Age 13 or above</span>
                                                            </div>
                                                        </Grid>
                                                        <Grid className="d-flex align-items-center justify-content-between" item xs={4} sm={4} lg={4}>
                                                            {/* <Button onClick={() => setNumOfAdults(numOfAdults - 1)}>add</Button> */}
                                                            <span className="guests-ch-btn" onClick={numberAdults}>
                                                                <Button
                                                                    className="btn btn-default value-control minus-btn cursor-button"
                                                                    data-action="minus"
                                                                    data-target="font-size"
                                                                >
                                                                    <span className={`${classes.minusSvg} minus-svg norepeat-img`}></span>
                                                                </Button>
                                                            </span>
                                                            <span>{numOfAdults}</span>
                                                            <span className="guests-ch-btn" onClick={() => setNumOfAdults(numOfAdults + 1)}>
                                                                <Button
                                                                    className="btn btn-default value-control plus-btn cursor-button"
                                                                    data-action="plus"
                                                                    data-target="font-size"
                                                                >
                                                                    <span className={`${classes.plusSvg} plus-svg norepeat-img`}></span>
                                                                </Button>
                                                            </span>
                                                        </Grid>
                                                    </Grid>
                                                    <div className="border-div" />
                                                    <Grid container>
                                                        <Grid item xs={8} sm={8} lg={8}>
                                                            <div className="age-group">
                                                                <p>Children</p>
                                                                <span>Age 2-12</span>
                                                            </div>
                                                        </Grid>
                                                        <Grid className="d-flex align-items-center justify-content-between" item xs={4} sm={4} lg={4}>
                                                            <span className="guests-ch-btn" onClick={numberChild}>
                                                                <Button
                                                                    className="btn btn-default value-control minus-btn cursor-button"
                                                                    data-action="minus"
                                                                    data-target="font-size"
                                                                >
                                                                    <span className={`${classes.minusSvg} minus-svg norepeat-img`}></span>
                                                                </Button>
                                                            </span>
                                                            <span>{numOfChildren}</span>
                                                            <span className="guests-ch-btn" onClick={() => setNumOfChildren(numOfChildren + 1)}>
                                                                <Button
                                                                    className="btn btn-default value-control plus-btn cursor-button"
                                                                    data-action="plus"
                                                                    data-target="font-size"
                                                                >
                                                                    <span className={`${classes.plusSvg} plus-svg norepeat-img`}></span>
                                                                </Button>
                                                            </span>
                                                        </Grid>
                                                    </Grid>
                                                </div>
                                            }
                                        </div>
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={12} lg={12}></Grid>
                                </Grid>
                                {/* <Box sx={{ mt: 2 }}>
                                    <hr className="dash-line"></hr>
                                </Box> */}


                            </section>
                            {showError &&
                                <div>
                                    <Alert type={'error'} message={"User Already Exists"} />
                                </div>
                            }
                                
                            <div className="payment-method-style">
                                <span>Payment Method</span>
                            </div>

                            <div className="card boking-wrap-forms">
                                <Grid item xs={12} sm={12} md={12} lg={12} >
                                    <div className="account-checkbox-div">
                                        <Grid container spacing={2}>
                                            {radioArray?.map((option, index) => (
                                                <Grid item xm={12} sm={12} md={6} lg={6}>
                                                    <Card className={`card-design-bank ${checkPaymentMethod == option.id ? 'active-card-design-bank' : ''}`}>
                                                        <div className="checkbox">
                                                            <div className="round">
                                                                <input type="checkbox"
                                                                    value={option.id}
                                                                    id={option.id}
                                                                    checked={checkPaymentMethod}
                                                                    // checked={selectedOption.includes(option.id)}
                                                                    onChange={handleOptionChange}
                                                                />
                                                                <label for={option.id}></label>
                                                            </div>
                                                            <span><img src={option.icon} /></span><br></br>
                                                        </div>
                                                        <span className="bank-title-style">{option.title}</span>
                                                    </Card>
                                                </Grid>
                                            ))}
                                        </Grid>
                                    </div>
                                </Grid>
                                {checkPaymentMethod == 2 &&
                                    <div className="bank-transfer-div-style">
                                        <Grid container spacing={8}>
                                                <Stripe 
                                                roomItem={JSON.stringify(cartItems.map(item => (
                                                    { RoomCatID: item?.RoomCatID ? item?.RoomCatID : item?.room_category.id, NoOfRooms: item?.count}
                                                )))}
                                                roomCheckIn= {checkInDate}
                                                roomCheckOut = {checkOutDate}
                                                paymentInt = {paymentIntent}
                                                discount = {newDiscount}
                                                coupon = {couponDiscount > 0 ? coupons : ''}
                                                submitData={submitData}
                                                /> 
                                            
                                        </Grid>
                                    </div>
                                }
                                {/* <Grid item xs={12} sm={12} md={12} lg={12}>
                                    <div style={{ marginTop: '30px' }}>
                                        {selectedOption == 2 &&
                                            <div>
                                                <Grid item xs={12} sm={12} md={12} lg={12} >
                                                    <Grid container spacing={2}>
                                                        <Grid item xs={12} sm={12} md={6} className="p-10" >
                                                            <FormControl className={`${generalClasses.fullWidth} positionRelative`}>
                                                                <label className="form-label-bokdetail ">Card Holder Name<span className="compl-error"></span></label>
                                                                <TextField type="text" className="form-control-custome " placeholder="Enter First Name" value="" required variant="outlined" />
                                                            </FormControl>
                                                        </Grid>
                                                        <Grid item xs={12} sm={12} md={6} className="p-10" >
                                                            <FormControl className={`${generalClasses.fullWidth} positionRelative`}>
                                                                <label className="form-label-bokdetail ">Card Number<span className="compl-error"></span></label>
                                                                <TextField type="text" className="form-control-custome card-number-padd " style={{ width: '100%' }} placeholder="1234 1234 1234 1234" value="" required variant="outlined" />
                                                            </FormControl>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                                <Grid container spacing={2}>
                                                    <Grid item xs={12} sm={12} md={6} className="p-10" >
                                                        <FormControl className={`${generalClasses.fullWidth} positionRelative`}>
                                                            <label className="form-label-bokdetail ">Expiration<span className="compl-error"></span></label>
                                                            <TextField type="text" className="form-control-custome " placeholder="Enter Card Expiration" value="" required variant="outlined" />
                                                        </FormControl>
                                                    </Grid>
                                                    <Grid item xs={12} sm={12} md={6} className="p-10" >
                                                        <FormControl className={`${generalClasses.fullWidth} positionRelative`}>
                                                            <label className="form-label-bokdetail  d-block">CVC<span className="compl-error">*</span></label>
                                                            <TextField type="text" className="form-control-custome " placeholder="CVC Code" value="" required variant="outlined" />
                                                        </FormControl>
                                                    </Grid>
                                                    <Grid item xs={12} sm={12} md={12} className="p-10" ></Grid>
                                                </Grid>
                                            </div>
                                        }
                                    </div>

                                    <Grid item xs={12} sm={12} md={12} className="text-center d-grid" style={{ display: 'contents' }}>
                                        <div className='display-emp' style={{ width: '100%', marginTop: 10 }}>
                                        </div>

                                        
                                    </Grid>
                                </Grid> */}
                            </div>
                        </form>

                    </Grid>

                    {/** old code of second grid */}

                    {/* <Grid item xs={12} sm={9} md={7} lg={4}> */}
                    {/* <Box className="card boking-final-card" > */}
                    {/* <img src={props?.location?.booking?.room_category.room_detail.room_gallery[0]?.image} className="img-responsive card-img-top" alt="..." /> */}
                    {/* <div className="card-body"> */}
                    {/* <div className="cat-div"> */}
                    {/* <h5 className="card-title">{'room 1'}</h5> */}
                    {/* <span className="cat-span">{'room 2'} Rooms Available</span> */}

                    {/* <h5 className="card-title">{props?.location?.booking?.room_category.Name}</h5>
                                <span className="cat-span">{props?.location?.booking.total} Rooms Available</span> */}
                    {/* </div> */}
                    {/* <p className="card-text">{'demo'}</p> */}
                    {/* <p className="card-text">{'21'} - {'22'} ({'2'} nights)</p> */}

                    {/* <p className="card-text">{props?.location?.booking?.room_category.room_detail.room_hotel.Address}</p>
                            <p className="card-text">{formattedDate1} - {formattedDate2} ({nights} nights)</p> */}
                    {/* </div> */}
                    {/* <div className="card-body"> */}
                    {/* <table className="table table-borderless"> */}
                    {/* <tbody> */}
                    {/* <tr> */}
                    {/* <td>{props?.location?.booking?.room_category.room_detail.Price} x {nights} nights</td> */}
                    {/* <td className="text-alignright"><strong>{props?.location?.configData.Currency}.{(props?.location?.booking?.room_category.room_detail.Price) * (nights)}</strong></td> */}
                    {/* </tr> */}
                    {/* <tr> */}
                    {/* <td>10% off - member rate </td>
                                    <td className="text-alignright"><strong>Rs. 6,300</strong></td> */}
                    {/* </tr> */}
                    {/* <tr> */}
                    {/* <td>Tax {props?.location?.configData.tax}%</td> */}
                    {/* <td className="text-alignright"><strong>{'taxAmount'}</strong></td> */}
                    {/* </tr> */}

                    {/* </tbody> */}

                    {/* </table> */}
                    {/* </div> */}
                    {/* <div className="card-body"> */}
                    {/* <table className="table table-borderless"> */}
                    {/* <tbody> */}
                    {/* <tr> */}
                    {/* <td className="tb-total">Total</td> */}
                    {/* <td className="text-alignright tb-total-sum"><strong>{'2200'}.{'totatAmount'}</strong></td> */}
                    {/* <td className="text-alignright tb-total-sum"><strong>{props?.location?.configData.Currency}.{'totatAmount'}</strong></td> */}
                    {/* </tr> */}
                    {/* </tbody> */}
                    {/* </table> */}
                    {/* <div className="conditin-text"> */}
                    {/* * This price is converted to show you the approximate cost in USD. You'll pay in EUR. The exchange rate might change before you pay. Keep in mind that your card issuer may charge you a foreign transaction fee */}
                    {/* </div> */}
                    {/* </div> */}
                    {/* </Box> */}

                    {/* </Grid> */}
                    <Grid item xs={12} sm={9} md={7} lg={4} style={{ marginTop: "-10px" }}>
                        <Box className="cart-detail-final">
                            <div className="cart-final-head">
                                <h2>my cart</h2>
                            </div>
                            {myCart.map((item, index) => (
                                <div className="add-cart-detail">
                                    <div >
                                        <img className="img-cart" src={item.image} />
                                    </div>
                                    <ul className="list-type-styles">
                                        <li>
                                            {item.title}
                                        </li>
                                        <li>
                                            <span className="loc-style">{item.loc}</span></li>
                                    </ul>
                                </div>
                            ))}
                            <div className="bottom-div">
                                {cartItems.map((item) => (
                                    <div className="billing-div-row">
                                        <span className="left-span">{item.Price} X {item.count} {item.count > 1 ? 'rooms' : 'room'} X {nights} {nights > 1 ? 'nights' : 'night'}</span>
                                        <span className="right-span">{item.Price} X {item.count} X {nights}</span>
                                    </div>
                                ))}

                                {/* <div className="billing-div-row">
                                    <span className="left-span">{'10% off - member rate'}</span>
                                    <span className="right-span">{'Rs. 1000'}</span>
                                </div> */}
                                <div className="billing-div-row">
                                    <span className="left-span">{'BookingTax'}</span>
                                    <span className="right-span">{taxPer}%</span>
                                </div>
                            </div>
                            <div className="bottom-div-total">
                                <div className="billing-div-row">
                                    <span className="left-span">{'Sub Total'}</span>
                                    <span className="right-span">{priceType} {subTotal.toLocaleString('en-US', { style: 'decimal', minimumFractionDigits:0, maximumFractionDigits: 0 })}</span>
                                </div>
                                <hr className="dashes-style" />
                            </div>
                            {((discountCount === 0) && (couponDiscount === 0) && discountObj) ? 
                            <div className="coupon-offer">
                                <div style={{paddingLeft:'30px', paddingTop:'20px'}}>
                                    <div className="coupon-header-text">
                                        <span>{'First Customer’s Booking'}</span>
                                    </div>
                                    <div className="coupon-off">
                                        <span>{discountObj?.Discount }{'% Off '}</span>
                                    </div>
                                    <div className="valid-till">
                                        <span>{'Valid Till:'} {getFormattedDate(discountObj?.Validity)}</span>
                                    </div>
                                    <div className="collect-div">
                                        <button className="collect-btn" onClick={()=>handleDatesChange({ startDate: checkInDate, endDate: checkOutDate }, discountObj)}>{'collect'}</button>
                                    </div>
                                </div>
                                <div className="circle1-coupon">
                                    <img src={whiteCircle1} className="circle1-coupon-img" />
                                </div>
                                <div className="circle1-coupon">
                                    <img src={whiteCircle2} className="circle2-coupon-img" />
                                </div>
                            </div> 
                            : (discountObj || couponDiscount) ?  
                            <div className="coupon-offer">
                                <div style={{paddingLeft:'30px', paddingTop:'20px'}}>
                                    <div className="coupon-header-text">
                                        <span>{'First Customer’s Booking'}</span>
                                    </div>
                                    <div className="coupon-off">
                                        <span>{'Coupon Collected!'}</span>
                                    </div>
                                    <div>
                                        <span className="coupon-collect"><span>{'Coupon has been added and you get the '}{ genericDiscount }{'% discounted amount'}</span></span>
                                    </div>
                                </div>
                                <div className="circle1-coupon">
                                    <img src={whiteCircle1} className="circle1-coupon-img" />
                                </div>
                                <div className="circle1-coupon">
                                    <img src={whiteCircle2} className="circle2-coupon-img" />
                                </div>
                            </div>
                            : ''
                            }
                             {((discountCount === 0) && (couponDiscount === 0)) ? 
                             <div>                         
                                <div className="bottom-div-total" style={{paddingTop:'10px'}}>
                                    <hr className="dashes-style" />
                                    <div className="coupon-code-txt">{'Or you have the coupon code'}</div>
                                </div>
                                <div className="bottom-div-total">
                                    <TextField
                                        onChange={(event) => onChangeInput(event.target.value)}
                                        style={{borderRadius:'10px', background:'#fff'}}
                                        className={`${classes.fieldBorder} input-style`}
                                        variant="outlined"
                                        placeholder="Add Coupons"
                                        fullWidth
                                        InputProps={{
                                            endAdornment: (
                                                <Button variant="contained" className={`btn-add ${classes.buttonNoHover}`}  onClick={()=>handleCouponCode()}>
                                                    Add
                                                </Button>
                                            ),
                                        }}
                                    />
                                    <div>
                                        <span className="text-danger">{couponMsg}</span>
                                    </div>
                                </div>
                            </div> 
                            : '' }
                            <div className="loader-div">
                                <div className="bottom-div-total">
                                    <div className="billing-div-row">
                                        <span className="left-span">{'Total'}</span>
                                        <span className="right-span" style={{fontSize:'24px'}}>{priceType} {subTotal.toLocaleString('en-US', { style: 'decimal', minimumFractionDigits:0, maximumFractionDigits: 0 })}</span>
                                    </div>
                                    <Button className={`btn-pay-now ${classes.buttonNoHover}`} variant="contained" onClick={()=>submitBooking(2)} type="button">Pay Now</Button>
                                </div>
                                {props.loading &&
                                    <div className="loader-position">
                                        <Loader />
                                    </div>
                                }
                                {props?.roomData?.Status == 201 &&
                                    <div className="roomError">
                                        <span className="error-color">{roomCatError} Not Available</span>
                                    </div>
                                }

                            </div>
                            <div className="bottom-div-total">
                                <p>This price is converted to show you the approximate cost in PKR. The exchange rate might change before you pay. Keep in mind that your card issuer may charge you a foreign transaction fee</p>
                            </div>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
            <Modal
                open={openModal}
                onClose={handleClose}
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                BackdropComponent={Backdrop}
            >
                <Fade in={openModal}>
                    <AuthModal setOpen={setOpenModal} setClose={handleClose} openModal={openModal} />
                </Fade>
            </Modal>
            {/* <Modal
            open={token != null ? true : false}
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
        >
            <Fade in={token != null ? true : false}>
                <ResetModal token={token} />
            </Fade>
        </Modal> */}
        </div>
    );
}

const mapStateToProps = ({ cmsReducer }) => {
    const { loading, error, successRoom, roomData, successBooking, paymentUrl,guestName, guestEmail,successParam, paramData,guestPhone, bookingData, paymentData, successpaymentData, successUser, userData } = cmsReducer;
    return { loading, error, successRoom, roomData, successBooking,paymentUrl, guestName, guestEmail,successParam, paramData,guestPhone, bookingData, paymentData, successpaymentData, successUser, userData };

};
//which actions our function can dispatch
const mapDispatchToProps = (dispatch) => {
    return {
        submitBookingData: (data) => dispatch(actions.submitBooking(data)),
        getPaymentGateway: (data) => dispatch(actions.getPaymentMethod(data)),
        getRoomDataStart: (data) => dispatch(actions.getRoomData(data)),
        errorHandlerSuccess: () => dispatch(actions.errorHandlerSuccess()),
        getParamsData: (data) => dispatch(actions.getParam(data)),
        setParamDataStart: (data) => dispatch(actions.setParam(data)),
        getUserData: (data) => dispatch(actions.getUser(data)),
        //cmsMessageHandler: () => dispatch(actions.cmsMessageHandler()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Booking);