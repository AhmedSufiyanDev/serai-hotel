import React, { useState, useEffect, useRef } from 'react'
import '../../../assets/scss/bookingList.scss';
import '../../frontend/scss/general.scss';
import '../../frontend/scss/home.scss';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import './styles'
import { useStyles } from './styles';
import * as actions from "../../../store/actions";
import { connect } from "react-redux";
import { DateRangePicker } from 'react-dates';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import { Loader } from "../../../components/index";
import { InputError } from "../../../components/index";
import { Helmet } from "react-helmet";
// import OwlCarousel from 'react-owl-carousel';
// import 'owl.carousel/dist/assets/owl.carousel.css';
// import 'owl.carousel/dist/assets/owl.theme.default.css';
import UseAnalyticsEventTracker from '../../../components/googleAnalytics';
import ReactPixel from 'react-facebook-pixel';
import { useMediaQuery } from "@material-ui/core";
import CartModal from '../layout/cart'
import {
    squarefe, bookingList, roomCatImage
} from "../../../assets/images/images";
import { Container, Grid, Box, Link } from '@material-ui/core';
import Tooltip from "react-simple-tooltip"
import { useCart } from '../layout/cartContext'
import moment from 'moment';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { currency } from '../../../environment';
const Features = ["MountainView", "AirConditioning", "Terrace", "MiniBar", "CityView", "FreeWifi", "Intercom", "FlatScreenTV", "Wardrobe", 'Patio', 'Dishwasher', 'EntireApartment', 'Kitchen', 'Garden', 'FreeParking', 'DailyHousekeeping', 'LuggageStorage', 'Heating']

function BookingList(props) {
    //const gaEventTracker = UseAnalyticsEventTracker('Booking-List');
    UseAnalyticsEventTracker('BookingList');
    ReactPixel.trackCustom('BookingList');
    const classes = useStyles();
    const [sortBy, setSortBy] = React.useState('Select');
    const isSmallScreen = window.innerWidth < 768;
    const smallRoom = useMediaQuery('(max-width: 1199px)');
    const [focusedInput, setFocusedInput] = useState(false);
    const queryParams = new URLSearchParams(props.location.search);
    const [locationQuery, setLocationQuery] = useState('Islamabad');
    const [checkInDate, setCheckInDate] = useState(props?.location?.fromDate?props?.location?.fromDate:moment());
    const [checkOutDate, setCheckOutDate] = useState(props?.location?.toDate?props?.location?.toDate:moment().add(1, 'day'));
    const [numOfAdults, setNumOfAdults] = useState(props?.location?.numOfAdults?props?.location?.numOfAdults:2);
    const [numOfChildren, setNumOfChildren] = useState(props?.location?.numOfChildren?props?.location?.numOfChildren:0);
    //const [lowerPriceLimit, setLowerPriceLimit] = useState(15000);
    const [higherPriceLimit, setHigherPriceLimit] = useState(15000);
    const [checkInDateError, setCheckInDateError] = useState(null);
    const [checkOutDateError, setCheckOutDateError] = useState(null);
    const [counter, setCounter] = useState([]);
    const [count, setCounterApartment] = useState(1);
    const [nomadCount, setNomadCount] = useState(1);
    const [bulgariaCount, setBulgariaCount] = useState(1);
    const [countError, setCountError] = useState([]);
    const [countApartment, setErrorApartment] = useState(false);
    const [countNomad, setErrorNomad] = useState(false);
    const [countBulgaria, setErrorBulgaria] = useState(false);

    const [featureName, setFetureName] = useState('');
    const [showTitle, setShowTitle] = useState(false);
    const { addToCart, cartItems } = useCart();


    const [openAdultsChildren, setOpenAdultsChildren] = React.useState(false);


    const handleIncrement = (index, total, room, isApartment) => {

        const newCounts = [...counter];
        if (newCounts[index] < total) {
            newCounts[index] = newCounts[index] + 1;
            setCounter(newCounts);
            const cartItem = { ...room, count: isApartment ? count + 1 : counter[index] + 1, Name: room.room_category.Name, Price: room.room_category.Price, id: room.room_category.id }
            setOpenModalCart(true);
            addToCart(cartItem, checkInDate, checkOutDate, numOfAdults, numOfChildren)
        }
        else {
            setCountError((prevErrorStates) => {
                const newErrorStates = [...prevErrorStates];
                newErrorStates[index] = true;
                return newErrorStates;
            });
        }
    };

    const handleDecrement = (index, total, room, isApartment) => {
        setCountError((prevErrorStates) => {
            const newErrorStates = [...prevErrorStates];
            newErrorStates[index] = false;
            return newErrorStates;
        });
        const newCounts = [...counter];
        if (counter[index] > 1) {
            newCounts[index] = newCounts[index] - 1;
            setCounter(newCounts);
            const cartItem = { ...room, count: isApartment ? count - 1 : counter[index] - 1, Name: room.room_category.Name, Price: room.room_category.Price, id: room.room_category.id }
            setOpenModalCart(true);
            addToCart(cartItem, checkInDate, checkOutDate, numOfAdults, numOfChildren)
        }
    };

    const handleApartmentInc = (total) => {
        if (count < total) {
            setCounterApartment(count + 1);
        }
        else {
            setErrorApartment(true)
        }
    }

    const handleApartmentDec = (total) => {
        setErrorApartment(false)
        if (count > 1) {
            setCounterApartment(count - 1);
        }
    }

    const handleNomadInc = (total) => {
        if (nomadCount < total) {
            setNomadCount(nomadCount + 1);
        }
        else {
            setErrorNomad(true)
        }
    }

    const handleNomadDec = (total) => {
        setErrorNomad(false)
        if (nomadCount > 1) {
            setNomadCount(nomadCount - 1);
        }
    }

    const handleBulgariaInc = (total) => {
        if (bulgariaCount < total) {
            setBulgariaCount(bulgariaCount + 1);
        }
        else {
            setErrorBulgaria(true)
        }
    }

    const handleBulgariaDec = (total) => {
        setErrorBulgaria(false)
        if (bulgariaCount > 1) {
            setBulgariaCount(bulgariaCount - 1);
        }
    }

    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };
    /** Code for location */
    const [filteredData, setFilteredData] = useState([]);
    const [openFilteredItems, setOpenFilteredItems] = React.useState(false);
    const [roomCatID, setRoomCatID] = useState();
    const dataSource = ['Islamabad'];
    const roomCatIDs = cartItems.map(cartItem => cartItem.room_category ? cartItem.room_category.id : cartItem.RoomCatID);
    const filterData = (input) => {
        const filtered = dataSource.filter((item) => {
            return item.toLowerCase().includes(input.toLowerCase());
        });
        return filtered;
    };

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }, [props.location.pathname]);

    useEffect(() => {
        setFilteredData(filterData(locationQuery));
    }, [locationQuery]);

    useEffect(() => {
        if (props?.success) {
            const initialCounts = Array(props?.cmsRoomData?.length).fill(1);
            const initialError = Array(props?.cmsRoomData?.length).fill(false);
            setCounter(initialCounts)
            setCountError(initialError)
        }
    }, [props?.success]);


    useEffect(() => {
        if (props?.paramDataSuccess && props?.paramData.length!=0) {
            setCheckInDate(new moment(props.paramData[0].FromDate))
            setCheckOutDate(new moment(props.paramData[0].ToDate));
            setNumOfAdults(props.paramData[0].NumofAdult);
            setNumOfChildren(props.paramData[0].NumOfChildren);
        }
    }, [props?.paramDataSuccess]);

    const setDataQuery = (event) => {
        setOpenFilteredItems(true);
        setLocationQuery(event.target.value)
    }
    let searchInputRef = useRef();

    useEffect(() => {
        function handleClickOutside(event) {
            if (searchInputRef.current && !searchInputRef.current.contains(event.target)) {
                setOpenFilteredItems(false);
            }
        }
        window.addEventListener("click", handleClickOutside);
        return () => {
            window.removeEventListener("click", handleClickOutside);
        };
    }, [searchInputRef]);

    const openFilteredItemsDiv = () => {
        setOpenFilteredItems(true);
    }
    /** Code for location */

    useEffect(() => {
        function handleClickOutside(event) {
            const clickedButton = event.target.closest('.drop-icon');
            const clickedInside = event.target.closest('.adults-children-div');
            if (!clickedButton && !clickedInside) {
                setOpenAdultsChildren(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const sortByOptions = [
        { value: 'Select', label: 'Select' },
        { value: 'MaxPrice', label: 'Maximum Price' },
        { value: 'MinPrice', label: 'Minimum Price' }
    ];

    const handleDatesChange = ({ startDate, endDate }) => {
        let data ={}
        setCheckInDate(startDate);
        setCheckOutDate(endDate);

        data.fromDate = startDate?startDate.format("YYYY-MM-D") :checkInDate.format("YYYY-MM-D") 
        data.toDate = endDate?endDate.format("YYYY-MM-D") :checkOutDate.format("YYYY-MM-D")
        data.numOfAdults = numOfAdults
        data.numOfChildren = numOfChildren
        data.sessionID=localStorage.getItem('sessionId')
        let fd = new FormData();
        for (let item in data)
            fd.append(item, data[item]);
        props.setParamDataStart(fd);
    };

    const handleChange = (event) => {
        setSortBy(event.target.value);
    };


    const numberAdults = (operator) => {
        
        if (numOfAdults > 0 && operator == 0) {
            setNumOfAdults(numOfAdults - 1); // Update the count state
            }
        else{
            setNumOfAdults(numOfAdults + 1)
        }
        let data ={}
        data.fromDate = checkInDate.format("YYYY-MM-D") 
        data.toDate = checkOutDate.format("YYYY-MM-D") 
        data.numOfAdults = (numOfAdults > 0 && operator == 0)?numOfAdults-1:numOfAdults+1
        data.numOfChildren = numOfChildren
        data.sessionID=localStorage.getItem('sessionId')
        let fd = new FormData();
        for (let item in data)
        fd.append(item, data[item]);
        props.setParamDataStart(fd);
    }

    const numberChild = (operator) => {
        if (numOfChildren > 0  && operator == 0) {
            setNumOfChildren(numOfChildren - 1); // Update the count state 
        }
        else{
            setNumOfChildren(numOfChildren + 1)
        }
        let data ={}
        data.fromDate = checkInDate.format("YYYY-MM-D") 
        data.toDate = checkOutDate.format("YYYY-MM-D") 
        data.numOfAdults = numOfAdults
        data.numOfChildren = (numOfChildren > 0  && operator == 0)?numOfChildren-1:numOfChildren+1
        data.sessionID=localStorage.getItem('sessionId')
        let fd = new FormData();
        for (let item in data)
        fd.append(item, data[item]);
        props.setParamDataStart(fd);
    }


    const handleBooking = (room) => {
        UseAnalyticsEventTracker('BookNow');
        ReactPixel.trackCustom('BookNow');
        //gaEventTracker("Book-Now");
        // console.log("room data is",room);
        if (!checkInDate || !checkOutDate) {
            !checkInDate && setCheckInDateError('Check-in date is required');
            !checkOutDate && setCheckOutDateError('Check-out date is required');
        }
        else {
            setCheckInDateError(null);
            setCheckOutDateError(null);
            props.history.push({ pathname: `/booking-detail`, booking: room, fromDate: checkInDate, toDate: checkOutDate, configData: props?.configData[0], numOfAdults: numOfAdults, numOfChildren: numOfChildren });
        }

        // window.location.pathname = '/booking-detail';
    };

    useEffect(() => {
        // fetchRoom();
        props.getParamsData({sessionID:localStorage.getItem('sessionId')})
    }, [props.location.pathname]);

    // useEffect(() => {
    //     fetchRoom();
    // }, [locationQuery, checkInDate, checkOutDate, higherPriceLimit, numOfAdults, sortBy]);

    useEffect(() => {
        function handleClickOutside(event) {
            const clickedInside = event.target.closest('.cart-div');
            if (!clickedInside) {
                setOpenModalCart(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    useEffect(() => {
        fetchRoom();   
    }, [locationQuery, checkInDate, checkOutDate,numOfChildren,numOfAdults]);

    useEffect(() => {
        if(props?.paramDataSuccess){
            setTimeout(() => {
                props.errorHandlerSuccess()
            }, 100) 
        }
    }, [props?.paramDataSuccess]);

    const fetchRoom = () => {
        props.getRoomDataStart({ address: locationQuery, fromDate: checkInDate, toDate: checkOutDate,sortBy, numOfAdults: numOfAdults,numOfChildren: numOfChildren,sessionID:localStorage.getItem('sessionId')});
        // props.getRoomDataStart({address: locationQuery, fromDate: checkInDate, toDate: checkOutDate, lowerPriceLimit, higherPriceLimit, numOfAdults, sortBy});
    };

    const handleClosePicker = () => {
        setFocusedInput(null);
    };

    const handleRoomDetials = (room) => {
        UseAnalyticsEventTracker('FullInfo'+' '+ room.room_category.Name);
        ReactPixel.trackCustom('FullInfo'+' '+ room.room_category.Name);
        // const queryParams = {
        //     // roomData: encodedJson, 
        //     RoomCatID:room.room_category.id,
        //     fromDate: checkInDate,
        //     toDate: checkOutDate, 
        //     numOfAdults: numOfAdults, 
        //     numOfChildren: numOfChildren, 
        // };
        // const searchString = new URLSearchParams(queryParams).toString();
        // const breadCrumbs = [
        //     {text: 'Home', url: '/'},
        //     {text: 'Room Categories', url:''},
        //     {text: 'Room Details', url: ''},
        //   ];
        // const jsonBreadCrumbs = JSON.stringify(breadCrumbs);
        let data ={}
        data.address = locationQuery
        data.fromDate = checkInDate.format("YYYY-MM-D") 
        data.toDate = checkOutDate.format("YYYY-MM-D") 
        data.numOfAdults = numOfAdults
        data.numOfChildren = numOfChildren
        data.sessionID=localStorage.getItem('sessionId')
        data.RoomCatID=room.room_category.id
  
        let fd = new FormData();
        for (let item in data)
            fd.append(item, data[item]);
        props.setParamDataStart(fd);
        setRoomCatID(room.id)
        props.history.push({pathname: `/home/room/room-details`,RoomCatID:room.id});
        // props.history.push({ pathname: `/home/room/room-details`,search: `?${searchString}&breadcrumbs=${jsonBreadCrumbs}`});
    }

    const handleMouseEnter = (title) => {
        console.log('Mouse entered');
        setFetureName(title)
        setShowTitle(true);
      };
    
      const handleMouseLeave = (title) => {
        console.log('Mouse left');
        setFetureName(title)
        setShowTitle(false);
      };

    const formatNumber = (num) => {
        return num < 10 ? `0${num}` : num;
      };

    const [cart, setCart] = useState([]);
    const [openModalCart, setOpenModalCart] = useState(false);

    const cartItem = (room, index, isApartment, isNomad, isBulgaria) => {
        UseAnalyticsEventTracker('Add to cart'+" "+room.room_category.Name);
        ReactPixel.trackCustom('Add to cart'+" "+room.room_category.Name);
        const cartItem = { ...room, count: isApartment ? count : isNomad ? nomadCount : isBulgaria ? bulgariaCount : counter[index], Name: room.room_category.Name, Price: room.room_category.Price, id: room.room_category.id }
        console.log(cartItem, 'cartitemmmmmmm');
        setOpenModalCart(true);
        addToCart(cartItem, checkInDate, checkOutDate, numOfAdults, numOfChildren)
        // setCart([...cart, cartItem]);
    }

    const renderCalendarInfo = () => {
        return (
            <div className="custom-calendar-info">
                <button className="custom-close-button" onClick={handleClosePicker}>
                    X
                </button>
            </div>
        );
    };

    return (
        <div className="booking">
            <Helmet>
                <title>{'Discover the perfect hotel in Islamabad – Easy Hotel Booking'}</title>
                <meta name='description' content='Find the best rate for Deluxe Rooms in Islamabad. Experience easy hotel booking with safe & secure reservations at Serai.com.pk Discover your perfect hotel Now.' />
                <meta name="keywords" content='Find the best rate for Deluxe Rooms in Islamabad,  Serai Boutique Hotel Islamabad, Luxury hotel Islamabad, Hotel in Islamabad, Private Dining, guest house in Islamabad, Rockville house, room in Islamabad, Best guest house in Islamabad, Islamabad room services, hotels in F-6 islamabad, book hotels in Islamabad, best hotel Islamabad, Islamabad hotel booking' />
            </Helmet>
            <div className="header-heigt-fix"></div>

            <div className={`${classes.banner_main} banner-main-subpage`}>
                <div className={classes.banner_overlay}></div>
                <Container fixed>
                    <Grid container>
                        <Grid item xs={12} sm={12} lg={12}>
                            <div className="banner-booking-list">
                                <h1>Available Rooms</h1>
                            </div>
                        </Grid>
                    </Grid>
                </Container>
            </div>
            <Container fixed className="top-filter-box" >
                <Grid container className="waroper-formss">
                    <Grid item xs className="position-relative">
                        <div className="card form-card-search align-items-center ">
                            <Grid className="from-box-search">
                                <Grid item xs>
                                    <Grid container alignItems="center" spacing={3} >
                                        <Grid item sm={12} lg={3}>
                                            <div className="form-control-transparent form-fs-md d-flex align-items-center positionRelative border-bb-mb">
                                                <i className={`${classes.locationSvg} search-svg1 norepeat-img me-3`}></i>
                                                <div class="input-wrapper">
                                                    <input
                                                        ref={searchInputRef}
                                                        type="text"
                                                        className="form-control custom-form-search montserrat"
                                                        id="search"
                                                        placeholder=""
                                                        value={locationQuery}
                                                        onChange={(e) => setDataQuery(e)}
                                                        onFocus={() => openFilteredItemsDiv()}
                                                        autoComplete="off"
                                                    />
                                                    <label for="search" class="placeholder-label">Select the Location</label>
                                                </div>
                                                {
                                                    openFilteredItems &&
                                                    <div className="filter-items">
                                                        {filteredData.map((item, index) => (
                                                            <div className="cursor-button" key={index} onClick={() => setLocationQuery(item)}>
                                                                {item}
                                                            </div>
                                                        ))}
                                                    </div>
                                                }
                                                <span className="spacer-vert-search"></span>
                                            </div>
                                        </Grid>
                                        <Grid item sm={12} lg={4}>
                                            <div className="home-page form-control-transparent home-date-picker border-bb-mb form-fs-md d-flex  flex-wrap align-items-center">
                                                <i className={`${classes.checkinSvg} search-svg1 norepeat-img me-3`}></i>
                                                <div >
                                                    <DateRangePicker
                                                        className='montserrat'
                                                        startDate={checkInDate} // momentPropTypes.momentObj or null,
                                                        endDate={checkOutDate} // momentPropTypes.momentObj or null,
                                                        startDatePlaceholderText="Check-in"
                                                        endDatePlaceholderText="Check-out"
                                                        noBorder
                                                        keepOpenOnDateSelect={true}
                                                        onDatesChange={handleDatesChange} // PropTypes.func.isRequired,
                                                        focusedInput={focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
                                                        onFocusChange={focusedInput => setFocusedInput(focusedInput)} // PropTypes.func.isRequired,
                                                        renderCalendarInfo={renderCalendarInfo}
                                                        // customInputIcon={
                                                        //   <i className={`${classes.checkinSvg} checkin-svg cursor-pointer norepeat-img me-3`}></i>
                                                        // }
                                                        customArrowIcon={
                                                            <i className={`${classes.checkoutSvg} checkout-svg norepeat-img`}></i>
                                                        }
                                                        displayFormat="ddd, MMM D"
                                                        orientation={isSmallScreen ? 'vertical' : 'horizontal'}
                                                    />
                                                    <div className='date-field'>
                                                        <label for="checkInDate" class="date-colour">Check In Date</label>
                                                        <label for="checkInDate" class="date-colour margin-field">Check Out Date</label>
                                                    </div>

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
                                                <span className="spacer-vert-search spacer-vert-search-left"></span>
                                            </div>
                                        </Grid>
                                        <Grid item sm={12} lg={5}>
                                            <div className="form-control-transparent  flex-wrap form-fs-md d-flex align-items-center positionRelative">
                                                <i className={`${classes.guestSvg} guest-svg-list norepeat-img me-3 cursor-button`} onClick={() => setOpenAdultsChildren(true)}></i>
                                                <div id="adult-child-field" onClick={() => setOpenAdultsChildren(true)}>
                                                    <div>
                                                        <label className="form-label form-label-custome cursor-button montserrat">
                                                            {numOfAdults} Adult{numOfAdults > 1 && 's'} - {numOfChildren} {numOfChildren > 1 ? 'Children' : 'Child'}
                                                        </label>
                                                        <div>
                                                            <label for="noOfGuest" class="date-colour ">Number of Guests</label>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="drop-icon cursor-button" onClick={() => setOpenAdultsChildren(true)}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="10" viewBox="0 0 18 10" fill="none">
                                                        <path d="M16.9318 1.45129L10.4118 7.97129C9.6418 8.74129 8.3818 8.74129 7.6118 7.97129L1.0918 1.45129" stroke="#797979" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                                    </svg>
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
                                                                <span className="guests-ch-btn" onClick={() => numberAdults(0)}>
                                                                    <button
                                                                        className="btn btn-default value-control minus-btn cursor-button"
                                                                        data-action="minus"
                                                                        data-target="font-size"
                                                                    >
                                                                        <span className={`${classes.minusSvg} minus-svg norepeat-img`}></span>
                                                                    </button>
                                                                </span>
                                                                <span>{numOfAdults}</span>
                                                                <span className="guests-ch-btn" onClick={() => numberAdults(1)}>
                                                                    <button
                                                                        className="btn btn-default value-control plus-btn cursor-button"
                                                                        data-action="plus"
                                                                        data-target="font-size"
                                                                    >
                                                                        <span className={`${classes.plusSvg} plus-svg norepeat-img`}></span>
                                                                    </button>
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
                                                                <span className="guests-ch-btn" onClick={()=>numberChild(0)}>
                                                                    <button
                                                                        className="btn btn-default value-control minus-btn cursor-button"
                                                                        data-action="minus"
                                                                        data-target="font-size"
                                                                    >
                                                                        <span className={`${classes.minusSvg} minus-svg norepeat-img`}></span>
                                                                    </button>
                                                                </span>
                                                                <span>{numOfChildren}</span>
                                                                <span className="guests-ch-btn" onClick={()=>numberChild(1)}>
                                                                    <button
                                                                        className="btn btn-default value-control plus-btn cursor-button"
                                                                        data-action="plus"
                                                                        data-target="font-size"
                                                                    >
                                                                        <span className={`${classes.plusSvg} plus-svg norepeat-img`}></span>
                                                                    </button>
                                                                </span>
                                                            </Grid>
                                                        </Grid>
                                                    </div>
                                                }

                                            </div>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </div>
                    </Grid>
                </Grid>
            </Container>
            {props?.loading ? <Loader /> :
                <div>
                    <section className='room-availabe-section'>
                        <Container fixed>
                            <div className='room-section'>
                                <div className='d-flex align-items-center room-section-title'>
                                    <h1>Rockville House</h1>
                                    <span className='location-span'>Located in F-6/3</span>
                                </div>
                                <p>CLEAN, Comfortable & Gorgeous Accommodations for every type of vacations</p>
                            </div>
                            <Grid container spacing={5}>
                                {
                                    props?.cmsRoomData?.map((room, index) => {
                                        // const formattedPrice = (Number((room.room_category?.Price).replace(/[^\d.]/g, ''))).toLocaleString('en-PK', {
                                        //     style: 'currency',
                                        //     currency:currency,
                                        //     minimumFractionDigits: 0,
                                        //     maximumFractionDigits: 0,
                                        // });
                                        return (
                                            <Grid item xs={12} sm={8} lg={4} spacing={smallRoom ? 2 : 5}>
                                                <div className='card-room'>
                                                    <div className='positionRelative'>
                                                        <Slider className="bluedots" {...settings}
                                                            // responsive={{
                                                            //     0: {
                                                            //         stagePadding: 0,
                                                            //         items: 1,
                                                            //         margin: 0,
                                                            //         dots: true
                                                            //     },
                                                            //     600: {
                                                            //         items: 1,
                                                            //         margin: 0,
                                                            //         dots: true
                                                            //     },
                                                            //     991: {
                                                            //         items: 1,
                                                            //         margin: 0,
                                                            //         dots: true
                                                            //     }
                                                            // }}
                                                        >
                                                            {room?.category_gallery.map(img => (
                                                                <img
                                                                    className="tns-lazy-img img-responsive-cat"
                                                                    src={img.image}
                                                                    alt=""
                                                                />

                                                            ))}
                                                        </Slider>
                                                        <div className="price-tag-list">
                                                            <div className="price">
                                                                <div className="title-price">
                                                                    Starting From
                                                                </div>
                                                                <div className="amount">
                                                                    {room.room_category?.Price}
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="counts-tag">
                                                            {formatNumber(room.total)}<span className='rooms-check-avail'>{room.total == 1 ? 'Room' : 'Rooms'} Available</span>

                                                        </div>
                                                    </div>

                                                    <div className="card-body about-content-body-list">
                                                        <h5 className="card-title">{room?.room_category?.Name}</h5>
                                                        <div className='room-details'>
                                                            <div className='guest-details'>
                                                                <div className='svg-margin'>
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="21" viewBox="0 0 20 21" fill="none">
                                                                        <path d="M10.0002 10.1948C8.15158 10.1948 6.64746 8.6907 6.64746 6.84209C6.64746 4.99347 8.15158 3.48935 10.0002 3.48935C11.8488 3.48935 13.3529 4.99347 13.3529 6.84209C13.3529 8.6907 11.8488 10.1948 10.0002 10.1948Z" stroke="#AA8453" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                                                                        <path d="M3.74121 17.5696C3.74163 17.5641 3.74205 17.5587 3.74289 17.5532C4.04673 14.3648 6.73223 11.8712 10.0004 11.8712C13.2684 11.8712 15.9535 14.3644 16.2582 17.5528" stroke="#AA8453" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                                                                        <circle cx="10" cy="10.5293" r="9.5" stroke="#AA8453" />
                                                                    </svg>
                                                                </div>
                                                                <div className='card-inner-details'>
                                                                    2 guests
                                                                </div>
                                                            </div>
                                                            <div className='area-details'>
                                                                <div className='svg-margin'>
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 21 21" fill="none">
                                                                        <path d="M20.5632 18.7472C20.4639 18.7472 20.3687 18.7867 20.2985 18.8569C20.2283 18.9271 20.1889 19.0223 20.1889 19.1216V20.0307H19.2798C19.1805 20.0307 19.0853 20.0701 19.0151 20.1403C18.9449 20.2105 18.9054 20.3057 18.9054 20.405C18.9054 20.5043 18.9449 20.5995 19.0151 20.6697C19.0853 20.7399 19.1805 20.7793 19.2798 20.7793H20.5632C20.6625 20.7793 20.7577 20.7399 20.8279 20.6697C20.8981 20.5995 20.9375 20.5043 20.9375 20.405V19.1216C20.9375 19.0223 20.8981 18.9271 20.8279 18.8569C20.7577 18.7867 20.6625 18.7472 20.5632 18.7472Z" fill="#AA8453" />
                                                                        <path d="M16.8962 20.0306H14.5127C14.4134 20.0306 14.3182 20.07 14.248 20.1402C14.1778 20.2104 14.1384 20.3057 14.1384 20.4049C14.1384 20.5042 14.1778 20.5994 14.248 20.6696C14.3182 20.7398 14.4134 20.7793 14.5127 20.7793H16.8962C16.9955 20.7793 17.0907 20.7398 17.1609 20.6696C17.2311 20.5994 17.2706 20.5042 17.2706 20.4049C17.2706 20.3057 17.2311 20.2104 17.1609 20.1402C17.0907 20.07 16.9955 20.0306 16.8962 20.0306Z" fill="#AA8453" />
                                                                        <path d="M12.1292 20.0306H10.5463V11.5453C10.5463 11.446 10.5068 11.3508 10.4366 11.2806C10.3664 11.2104 10.2712 11.171 10.1719 11.171H1.68616V9.58808C1.68616 9.4888 1.64672 9.39359 1.57652 9.32338C1.50632 9.25318 1.41111 9.21375 1.31183 9.21375C1.21255 9.21375 1.11734 9.25318 1.04714 9.32338C0.976939 9.39359 0.9375 9.4888 0.9375 9.58808V20.405C0.9375 20.5043 0.976939 20.5995 1.04714 20.6697C1.11734 20.7399 1.21255 20.7793 1.31183 20.7793H12.1292C12.2284 20.7793 12.3236 20.7399 12.3938 20.6697C12.464 20.5995 12.5035 20.5043 12.5035 20.405C12.5035 20.3057 12.464 20.2105 12.3938 20.1403C12.3236 20.0701 12.2284 20.0306 12.1292 20.0306ZM1.68616 20.0306V11.9196H9.79718V20.0306H1.68616Z" fill="#AA8453" />
                                                                        <path d="M1.31183 7.57847C1.41111 7.57847 1.50632 7.53903 1.57652 7.46883C1.64672 7.39863 1.68616 7.30342 1.68616 7.20414V4.82082C1.68616 4.72155 1.64672 4.62633 1.57652 4.55613C1.50632 4.48593 1.41111 4.44649 1.31183 4.44649C1.21255 4.44649 1.11734 4.48593 1.04714 4.55613C0.976939 4.62633 0.9375 4.72155 0.9375 4.82082V7.20414C0.9375 7.30342 0.976939 7.39863 1.04714 7.46883C1.11734 7.53903 1.21255 7.57847 1.31183 7.57847Z" fill="#AA8453" />
                                                                        <path d="M1.31183 2.81138C1.41111 2.81138 1.50632 2.77194 1.57652 2.70174C1.64672 2.63154 1.68616 2.53633 1.68616 2.43705V1.52796H2.59525C2.69453 1.52796 2.78975 1.48852 2.85995 1.41832C2.93015 1.34812 2.96959 1.25291 2.96959 1.15363C2.96959 1.05435 2.93015 0.959137 2.85995 0.888936C2.78975 0.818735 2.69453 0.779297 2.59525 0.779297H1.31183C1.21255 0.779297 1.11734 0.818735 1.04714 0.888936C0.976939 0.959137 0.9375 1.05435 0.9375 1.15363V2.43705C0.9375 2.53633 0.976939 2.63154 1.04714 2.70174C1.11734 2.77194 1.21255 2.81138 1.31183 2.81138Z" fill="#AA8453" />
                                                                        <path d="M14.5127 1.52796H16.8962C16.9955 1.52796 17.0907 1.48852 17.1609 1.41832C17.2311 1.34812 17.2706 1.25291 17.2706 1.15363C17.2706 1.05435 17.2311 0.959137 17.1609 0.888936C17.0907 0.818735 16.9955 0.779297 16.8962 0.779297H14.5127C14.4134 0.779297 14.3182 0.818735 14.248 0.888936C14.1778 0.959137 14.1384 1.05435 14.1384 1.15363C14.1384 1.25291 14.1778 1.34812 14.248 1.41832C14.3182 1.48852 14.4134 1.52796 14.5127 1.52796Z" fill="#AA8453" />
                                                                        <path d="M9.74587 1.52796H12.1294C12.2287 1.52796 12.3239 1.48852 12.3941 1.41832C12.4643 1.34812 12.5037 1.25291 12.5037 1.15363C12.5037 1.05435 12.4643 0.959137 12.3941 0.888936C12.3239 0.818735 12.2287 0.779297 12.1294 0.779297H9.74587C9.64659 0.779297 9.55138 0.818735 9.48118 0.888936C9.41098 0.959137 9.37154 1.05435 9.37154 1.15363C9.37154 1.25291 9.41098 1.34812 9.48118 1.41832C9.55138 1.48852 9.64659 1.52796 9.74587 1.52796Z" fill="#AA8453" />
                                                                        <path d="M4.97877 1.52796H7.3623C7.46158 1.52796 7.55679 1.48852 7.62699 1.41832C7.6972 1.34812 7.73663 1.25291 7.73663 1.15363C7.73663 1.05435 7.6972 0.959137 7.62699 0.888936C7.55679 0.818735 7.46158 0.779297 7.3623 0.779297H4.97877C4.87949 0.779297 4.78428 0.818735 4.71408 0.888936C4.64388 0.959137 4.60444 1.05435 4.60444 1.15363C4.60444 1.25291 4.64388 1.34812 4.71408 1.41832C4.78428 1.48852 4.87949 1.52796 4.97877 1.52796Z" fill="#AA8453" />
                                                                        <path d="M20.5632 0.779297H19.2798C19.1805 0.779297 19.0853 0.818735 19.0151 0.888936C18.9449 0.959137 18.9054 1.05435 18.9054 1.15363C18.9054 1.25291 18.9449 1.34812 19.0151 1.41832C19.0853 1.48852 19.1805 1.52796 19.2798 1.52796H20.1889V2.43705C20.1889 2.53633 20.2283 2.63154 20.2985 2.70174C20.3687 2.77194 20.4639 2.81138 20.5632 2.81138C20.6625 2.81138 20.7577 2.77194 20.8279 2.70174C20.8981 2.63154 20.9375 2.53633 20.9375 2.43705V1.15363C20.9375 1.05435 20.8981 0.959137 20.8279 0.888936C20.7577 0.818735 20.6625 0.779297 20.5632 0.779297Z" fill="#AA8453" />
                                                                        <path d="M20.5632 9.21334C20.4639 9.21334 20.3687 9.25278 20.2985 9.32298C20.2283 9.39318 20.1889 9.48839 20.1889 9.58767V11.971C20.1889 12.0703 20.2283 12.1655 20.2985 12.2357C20.3687 12.3059 20.4639 12.3453 20.5632 12.3453C20.6625 12.3453 20.7577 12.3059 20.8279 12.2357C20.8981 12.1655 20.9375 12.0703 20.9375 11.971V9.58767C20.9375 9.48839 20.8981 9.39318 20.8279 9.32298C20.7577 9.25278 20.6625 9.21334 20.5632 9.21334Z" fill="#AA8453" />
                                                                        <path d="M20.5632 4.44629C20.4639 4.44629 20.3687 4.48573 20.2985 4.55593C20.2283 4.62613 20.1889 4.72134 20.1889 4.82062V7.20394C20.1889 7.30321 20.2283 7.39843 20.2985 7.46863C20.3687 7.53883 20.4639 7.57827 20.5632 7.57827C20.6625 7.57827 20.7577 7.53883 20.8279 7.46863C20.8981 7.39843 20.9375 7.30321 20.9375 7.20394V4.82062C20.9375 4.72134 20.8981 4.62613 20.8279 4.55593C20.7577 4.48573 20.6625 4.44629 20.5632 4.44629Z" fill="#AA8453" />
                                                                        <path d="M20.5632 13.9802C20.4639 13.9802 20.3687 14.0196 20.2985 14.0898C20.2283 14.16 20.1889 14.2552 20.1889 14.3545V16.7378C20.1889 16.8371 20.2283 16.9323 20.2985 17.0025C20.3687 17.0727 20.4639 17.1122 20.5632 17.1122C20.6625 17.1122 20.7577 17.0727 20.8279 17.0025C20.8981 16.9323 20.9375 16.8371 20.9375 16.7378V14.3545C20.9375 14.2552 20.8981 14.16 20.8279 14.0898C20.7577 14.0196 20.6625 13.9802 20.5632 13.9802Z" fill="#AA8453" />
                                                                        <path d="M18.2284 3.35681H16.3086C16.2094 3.35681 16.1141 3.39625 16.0439 3.46645C15.9737 3.53665 15.9343 3.63186 15.9343 3.73114C15.9343 3.83042 15.9737 3.92563 16.0439 3.99584C16.1141 4.06604 16.2094 4.10547 16.3086 4.10547H17.3247L12.3302 9.09949V8.08408C12.3302 7.98481 12.2908 7.88959 12.2206 7.81939C12.1504 7.74919 12.0552 7.70975 11.9559 7.70975C11.8566 7.70975 11.7614 7.74919 11.6912 7.81939C11.621 7.88959 11.5816 7.98481 11.5816 8.08408V10.0037C11.5815 10.0528 11.5912 10.1015 11.61 10.1469C11.6288 10.1924 11.6564 10.2336 11.6911 10.2684C11.7259 10.3032 11.7672 10.3307 11.8126 10.3496C11.858 10.3684 11.9067 10.378 11.9559 10.378H13.8757C13.975 10.378 14.0702 10.3385 14.1404 10.2683C14.2106 10.1981 14.25 10.1029 14.25 10.0037C14.25 9.90438 14.2106 9.80916 14.1404 9.73896C14.0702 9.66876 13.975 9.62932 13.8757 9.62932H12.8596L17.8541 4.63424V5.65029C17.8541 5.74957 17.8935 5.84478 17.9637 5.91498C18.0339 5.98518 18.1291 6.02462 18.2284 6.02462C18.3277 6.02462 18.4229 5.98518 18.4931 5.91498C18.5633 5.84478 18.6027 5.74957 18.6027 5.65029V3.7305C18.6026 3.63133 18.5631 3.53629 18.4929 3.46622C18.4227 3.39616 18.3276 3.35681 18.2284 3.35681Z" fill="#AA8453" />
                                                                    </svg>
                                                                </div>
                                                                <div className='card-inner-details'>
                                                                    {room.room_category?.room_detail.Area} Square feet
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <p>
                                                         <span dangerouslySetInnerHTML={{__html:room.room_category?.Description}}></span>
                                                        </p>
                                                        {countError[index] &&
                                                            <div className='error-count' key={index}>Not enough rooms are available</div>
                                                        }
                                                        {room.total != 0 && room.room_category?.BookingStatus!=2?
                                                            <div>
                                                                <div className='btn-cart' >
                                                                    <div className='cart-div-booking'>
                                                                        <div className='add-cart-margin' onClick={() => cartItem(room, index, 0, 0, 0)}>
                                                                            {(roomCatIDs.includes(room.RoomCatID)) ?
                                                                                <div className="text">Add More...</div> :
                                                                                <div className="text">Add Room to Cart</div>
                                                                            }
                                                                        </div>
                                                                        <div className='counter-div'>
                                                                            <div className="btn-counter" onClick={() => handleDecrement(index, room.total, room, 0)}>
                                                                                <svg xmlns="http://www.w3.org/2000/svg" width="23" viewBox="0 0 23 23" fill="none">
                                                                                    <circle cx="11.6358" cy="11.6928" r="10.4737" fill="white" stroke="#DCE1E5" stroke-width="0.5" />
                                                                                    <path d="M9.13574 12.2769V11.2769H14.1357V12.2769H9.13574Z" fill="#7E7E7E" />
                                                                                </svg>
                                                                            </div>
                                                                            <div key={index} className="counter">{counter[index]}</div>
                                                                            <div className="btn-counter" onClick={() => handleIncrement(index, room.total, room, 0)}>
                                                                                <svg xmlns="http://www.w3.org/2000/svg" width="23" viewBox="0 0 23 23" fill="none">
                                                                                    <circle cx="11.3438" cy="11.6928" r="10.4737" fill="white" stroke="#DCE1E5" stroke-width="0.5" />
                                                                                    <path d="M10.9275 15.5968V12.0448H7.43945V11.2448H10.9275V7.78882H11.7595V11.2448H15.2475V12.0448H11.7595V15.5968H10.9275Z" fill="#7E7E7E" />
                                                                                </svg>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div> :
                                                            <div>
                                                                <div className='btn-cart no-room-available'>
                                                                    <div className='cart-div-booking'>
                                                                        <div className='add-cart-margin'>
                                                                            <span className="text">{room.room_category?.BookingStatus!=2?'Already Booked':'Not Available'}</span>
                                                                        </div>
                                                                        <div className='counter-div'>
                                                                            <div className="btn-counter">
                                                                                <svg xmlns="http://www.w3.org/2000/svg" width="23" viewBox="0 0 23 23" fill="none">
                                                                                    <circle cx="11.6358" cy="11.6928" r="10.4737" fill="white" stroke="#DCE1E5" stroke-width="0.5" />
                                                                                    <path d="M9.13574 12.2769V11.2769H14.1357V12.2769H9.13574Z" fill="#7E7E7E" />
                                                                                </svg>
                                                                            </div>
                                                                            <div key={index} className="counter">{counter[index]}</div>
                                                                            <div className="btn-counter">
                                                                                <svg xmlns="http://www.w3.org/2000/svg" width="23" viewBox="0 0 23 23" fill="none">
                                                                                    <circle cx="11.3438" cy="11.6928" r="10.4737" fill="white" stroke="#DCE1E5" stroke-width="0.5" />
                                                                                    <path d="M10.9275 15.5968V12.0448H7.43945V11.2448H10.9275V7.78882H11.7595V11.2448H15.2475V12.0448H11.7595V15.5968H10.9275Z" fill="#7E7E7E" />
                                                                                </svg>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        }

                                                    </div>
                                                    <div className='features-div'>
                                                        <div className='d-flex-features'>
                                                        {room?.room_features.slice(0,5).map((feature,ind) => (
                                                            <Tooltip content={feature.feature.Title}>
                                                                <div className='features-svg'>
                                                                 <span className='svg-style' dangerouslySetInnerHTML={{__html:feature.feature.Icon}}></span>
                                                                </div>
                                                             </Tooltip>     
                                                        ))}
                                                        {/* {showTitle && <div className='item-title'>{featureName}</div>} */}
                                                           
                                                        </div>
                                                        <div className='room-info' onClick={() => handleRoomDetials(room)}>
                                                            <span className='info-room-txt'>
                                                                Full info
                                                                <span className='info-svg'>
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="8" height="14" viewBox="0 0 8 14" fill="none">
                                                                        <path d="M1.33984 1.16333L7.33984 7.16333L1.33984 13.1633" stroke="#7E7E7E" stroke-linecap="round" stroke-linejoin="round" />
                                                                    </svg>
                                                                </span>
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Grid>
                                        )
                                    })
                                }
                            </Grid>

                            {/* <Grid container>
                                <Grid item xs={8} sm={8} lg={12}>
                                
                                </Grid>
                            </Grid> */}
                        </Container>
                    </section>
                    <section className='apartment-availabe-section'>
                        <Container fixed>
                            <div className='room-section'>
                                <div className='d-flex align-items-center'>
                                    <h1>Rockville Apartment</h1>
                                    <span className='location-span'>Located in F-6/2</span>
                                </div>
                                <p>CLEAN, Comfortable & Gorgeous Accommodations for every type of vacations</p>
                            </div>
                            <Grid container spacing={5}>
                                {
                                    props?.cmsApartmentData?.map((item) => {
                                        // const formattedPrice = (Number(item.room_category.Price)).toLocaleString('en-PK', {
                                        //     style: 'currency',
                                        //     currency:currency,
                                        //     minimumFractionDigits: 0,
                                        //     maximumFractionDigits: 0,
                                        // });
                                        return (
                                            <Grid item xs={12} sm={8} lg={4}>
                                                <div className='card-room'>
                                                  <div className='positionRelative'>
                                                        <Slider  {...settings} className="bluedots" 
                                                            // responsive={{
                                                            //     0: {
                                                            //         stagePadding: 0,
                                                            //         items: 1,
                                                            //         margin: 0,
                                                            //         dots: true
                                                            //     },
                                                            //     600: {
                                                            //         items: 1,
                                                            //         margin: 0,
                                                            //         dots: true
                                                            //     },
                                                            //     991: {
                                                            //         items: 1,
                                                            //         margin: 0,
                                                            //         dots: true
                                                            //     }
                                                            // }}
                                                        >
                                                            {item?.category_gallery.map(img => (
                                                                <img
                                                                    className="tns-lazy-img img-responsive-cat"
                                                                    src={img.image}
                                                                    alt=""
                                                                />

                                                            ))}
                                                        </Slider>

                                                        <div className="price-tag-list">
                                                            <div className="price">
                                                                <div className="title-price">
                                                                    Starting From
                                                                </div>
                                                                <div className="amount">
                                                                    {item.room_category.Price}
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="counts-tag">
                                                            {formatNumber(item.total)}<span className='rooms-check-avail'>{item.total == 1 ? 'Room' : 'Rooms'} Available</span>
                                                        </div>
                                                    </div>
                                                    <div className="card-body about-content-body-list">
                                                        <h5 className="card-title">{item?.room_category.Name}</h5>
                                                        <div className='room-details'>
                                                            <div className='guest-details'>
                                                                <div className='svg-margin'>
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="21" viewBox="0 0 20 21" fill="none">
                                                                        <path d="M10.0002 10.1948C8.15158 10.1948 6.64746 8.6907 6.64746 6.84209C6.64746 4.99347 8.15158 3.48935 10.0002 3.48935C11.8488 3.48935 13.3529 4.99347 13.3529 6.84209C13.3529 8.6907 11.8488 10.1948 10.0002 10.1948Z" stroke="#AA8453" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                                                                        <path d="M3.74121 17.5696C3.74163 17.5641 3.74205 17.5587 3.74289 17.5532C4.04673 14.3648 6.73223 11.8712 10.0004 11.8712C13.2684 11.8712 15.9535 14.3644 16.2582 17.5528" stroke="#AA8453" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                                                                        <circle cx="10" cy="10.5293" r="9.5" stroke="#AA8453" />
                                                                    </svg>
                                                                </div>
                                                                <div className='card-inner-details'>
                                                                    2 guests
                                                                </div>
                                                            </div>
                                                            <div className='area-details'>
                                                                <div className='svg-margin'>
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 21 21" fill="none">
                                                                        <path d="M20.5632 18.7472C20.4639 18.7472 20.3687 18.7867 20.2985 18.8569C20.2283 18.9271 20.1889 19.0223 20.1889 19.1216V20.0307H19.2798C19.1805 20.0307 19.0853 20.0701 19.0151 20.1403C18.9449 20.2105 18.9054 20.3057 18.9054 20.405C18.9054 20.5043 18.9449 20.5995 19.0151 20.6697C19.0853 20.7399 19.1805 20.7793 19.2798 20.7793H20.5632C20.6625 20.7793 20.7577 20.7399 20.8279 20.6697C20.8981 20.5995 20.9375 20.5043 20.9375 20.405V19.1216C20.9375 19.0223 20.8981 18.9271 20.8279 18.8569C20.7577 18.7867 20.6625 18.7472 20.5632 18.7472Z" fill="#AA8453" />
                                                                        <path d="M16.8962 20.0306H14.5127C14.4134 20.0306 14.3182 20.07 14.248 20.1402C14.1778 20.2104 14.1384 20.3057 14.1384 20.4049C14.1384 20.5042 14.1778 20.5994 14.248 20.6696C14.3182 20.7398 14.4134 20.7793 14.5127 20.7793H16.8962C16.9955 20.7793 17.0907 20.7398 17.1609 20.6696C17.2311 20.5994 17.2706 20.5042 17.2706 20.4049C17.2706 20.3057 17.2311 20.2104 17.1609 20.1402C17.0907 20.07 16.9955 20.0306 16.8962 20.0306Z" fill="#AA8453" />
                                                                        <path d="M12.1292 20.0306H10.5463V11.5453C10.5463 11.446 10.5068 11.3508 10.4366 11.2806C10.3664 11.2104 10.2712 11.171 10.1719 11.171H1.68616V9.58808C1.68616 9.4888 1.64672 9.39359 1.57652 9.32338C1.50632 9.25318 1.41111 9.21375 1.31183 9.21375C1.21255 9.21375 1.11734 9.25318 1.04714 9.32338C0.976939 9.39359 0.9375 9.4888 0.9375 9.58808V20.405C0.9375 20.5043 0.976939 20.5995 1.04714 20.6697C1.11734 20.7399 1.21255 20.7793 1.31183 20.7793H12.1292C12.2284 20.7793 12.3236 20.7399 12.3938 20.6697C12.464 20.5995 12.5035 20.5043 12.5035 20.405C12.5035 20.3057 12.464 20.2105 12.3938 20.1403C12.3236 20.0701 12.2284 20.0306 12.1292 20.0306ZM1.68616 20.0306V11.9196H9.79718V20.0306H1.68616Z" fill="#AA8453" />
                                                                        <path d="M1.31183 7.57847C1.41111 7.57847 1.50632 7.53903 1.57652 7.46883C1.64672 7.39863 1.68616 7.30342 1.68616 7.20414V4.82082C1.68616 4.72155 1.64672 4.62633 1.57652 4.55613C1.50632 4.48593 1.41111 4.44649 1.31183 4.44649C1.21255 4.44649 1.11734 4.48593 1.04714 4.55613C0.976939 4.62633 0.9375 4.72155 0.9375 4.82082V7.20414C0.9375 7.30342 0.976939 7.39863 1.04714 7.46883C1.11734 7.53903 1.21255 7.57847 1.31183 7.57847Z" fill="#AA8453" />
                                                                        <path d="M1.31183 2.81138C1.41111 2.81138 1.50632 2.77194 1.57652 2.70174C1.64672 2.63154 1.68616 2.53633 1.68616 2.43705V1.52796H2.59525C2.69453 1.52796 2.78975 1.48852 2.85995 1.41832C2.93015 1.34812 2.96959 1.25291 2.96959 1.15363C2.96959 1.05435 2.93015 0.959137 2.85995 0.888936C2.78975 0.818735 2.69453 0.779297 2.59525 0.779297H1.31183C1.21255 0.779297 1.11734 0.818735 1.04714 0.888936C0.976939 0.959137 0.9375 1.05435 0.9375 1.15363V2.43705C0.9375 2.53633 0.976939 2.63154 1.04714 2.70174C1.11734 2.77194 1.21255 2.81138 1.31183 2.81138Z" fill="#AA8453" />
                                                                        <path d="M14.5127 1.52796H16.8962C16.9955 1.52796 17.0907 1.48852 17.1609 1.41832C17.2311 1.34812 17.2706 1.25291 17.2706 1.15363C17.2706 1.05435 17.2311 0.959137 17.1609 0.888936C17.0907 0.818735 16.9955 0.779297 16.8962 0.779297H14.5127C14.4134 0.779297 14.3182 0.818735 14.248 0.888936C14.1778 0.959137 14.1384 1.05435 14.1384 1.15363C14.1384 1.25291 14.1778 1.34812 14.248 1.41832C14.3182 1.48852 14.4134 1.52796 14.5127 1.52796Z" fill="#AA8453" />
                                                                        <path d="M9.74587 1.52796H12.1294C12.2287 1.52796 12.3239 1.48852 12.3941 1.41832C12.4643 1.34812 12.5037 1.25291 12.5037 1.15363C12.5037 1.05435 12.4643 0.959137 12.3941 0.888936C12.3239 0.818735 12.2287 0.779297 12.1294 0.779297H9.74587C9.64659 0.779297 9.55138 0.818735 9.48118 0.888936C9.41098 0.959137 9.37154 1.05435 9.37154 1.15363C9.37154 1.25291 9.41098 1.34812 9.48118 1.41832C9.55138 1.48852 9.64659 1.52796 9.74587 1.52796Z" fill="#AA8453" />
                                                                        <path d="M4.97877 1.52796H7.3623C7.46158 1.52796 7.55679 1.48852 7.62699 1.41832C7.6972 1.34812 7.73663 1.25291 7.73663 1.15363C7.73663 1.05435 7.6972 0.959137 7.62699 0.888936C7.55679 0.818735 7.46158 0.779297 7.3623 0.779297H4.97877C4.87949 0.779297 4.78428 0.818735 4.71408 0.888936C4.64388 0.959137 4.60444 1.05435 4.60444 1.15363C4.60444 1.25291 4.64388 1.34812 4.71408 1.41832C4.78428 1.48852 4.87949 1.52796 4.97877 1.52796Z" fill="#AA8453" />
                                                                        <path d="M20.5632 0.779297H19.2798C19.1805 0.779297 19.0853 0.818735 19.0151 0.888936C18.9449 0.959137 18.9054 1.05435 18.9054 1.15363C18.9054 1.25291 18.9449 1.34812 19.0151 1.41832C19.0853 1.48852 19.1805 1.52796 19.2798 1.52796H20.1889V2.43705C20.1889 2.53633 20.2283 2.63154 20.2985 2.70174C20.3687 2.77194 20.4639 2.81138 20.5632 2.81138C20.6625 2.81138 20.7577 2.77194 20.8279 2.70174C20.8981 2.63154 20.9375 2.53633 20.9375 2.43705V1.15363C20.9375 1.05435 20.8981 0.959137 20.8279 0.888936C20.7577 0.818735 20.6625 0.779297 20.5632 0.779297Z" fill="#AA8453" />
                                                                        <path d="M20.5632 9.21334C20.4639 9.21334 20.3687 9.25278 20.2985 9.32298C20.2283 9.39318 20.1889 9.48839 20.1889 9.58767V11.971C20.1889 12.0703 20.2283 12.1655 20.2985 12.2357C20.3687 12.3059 20.4639 12.3453 20.5632 12.3453C20.6625 12.3453 20.7577 12.3059 20.8279 12.2357C20.8981 12.1655 20.9375 12.0703 20.9375 11.971V9.58767C20.9375 9.48839 20.8981 9.39318 20.8279 9.32298C20.7577 9.25278 20.6625 9.21334 20.5632 9.21334Z" fill="#AA8453" />
                                                                        <path d="M20.5632 4.44629C20.4639 4.44629 20.3687 4.48573 20.2985 4.55593C20.2283 4.62613 20.1889 4.72134 20.1889 4.82062V7.20394C20.1889 7.30321 20.2283 7.39843 20.2985 7.46863C20.3687 7.53883 20.4639 7.57827 20.5632 7.57827C20.6625 7.57827 20.7577 7.53883 20.8279 7.46863C20.8981 7.39843 20.9375 7.30321 20.9375 7.20394V4.82062C20.9375 4.72134 20.8981 4.62613 20.8279 4.55593C20.7577 4.48573 20.6625 4.44629 20.5632 4.44629Z" fill="#AA8453" />
                                                                        <path d="M20.5632 13.9802C20.4639 13.9802 20.3687 14.0196 20.2985 14.0898C20.2283 14.16 20.1889 14.2552 20.1889 14.3545V16.7378C20.1889 16.8371 20.2283 16.9323 20.2985 17.0025C20.3687 17.0727 20.4639 17.1122 20.5632 17.1122C20.6625 17.1122 20.7577 17.0727 20.8279 17.0025C20.8981 16.9323 20.9375 16.8371 20.9375 16.7378V14.3545C20.9375 14.2552 20.8981 14.16 20.8279 14.0898C20.7577 14.0196 20.6625 13.9802 20.5632 13.9802Z" fill="#AA8453" />
                                                                        <path d="M18.2284 3.35681H16.3086C16.2094 3.35681 16.1141 3.39625 16.0439 3.46645C15.9737 3.53665 15.9343 3.63186 15.9343 3.73114C15.9343 3.83042 15.9737 3.92563 16.0439 3.99584C16.1141 4.06604 16.2094 4.10547 16.3086 4.10547H17.3247L12.3302 9.09949V8.08408C12.3302 7.98481 12.2908 7.88959 12.2206 7.81939C12.1504 7.74919 12.0552 7.70975 11.9559 7.70975C11.8566 7.70975 11.7614 7.74919 11.6912 7.81939C11.621 7.88959 11.5816 7.98481 11.5816 8.08408V10.0037C11.5815 10.0528 11.5912 10.1015 11.61 10.1469C11.6288 10.1924 11.6564 10.2336 11.6911 10.2684C11.7259 10.3032 11.7672 10.3307 11.8126 10.3496C11.858 10.3684 11.9067 10.378 11.9559 10.378H13.8757C13.975 10.378 14.0702 10.3385 14.1404 10.2683C14.2106 10.1981 14.25 10.1029 14.25 10.0037C14.25 9.90438 14.2106 9.80916 14.1404 9.73896C14.0702 9.66876 13.975 9.62932 13.8757 9.62932H12.8596L17.8541 4.63424V5.65029C17.8541 5.74957 17.8935 5.84478 17.9637 5.91498C18.0339 5.98518 18.1291 6.02462 18.2284 6.02462C18.3277 6.02462 18.4229 5.98518 18.4931 5.91498C18.5633 5.84478 18.6027 5.74957 18.6027 5.65029V3.7305C18.6026 3.63133 18.5631 3.53629 18.4929 3.46622C18.4227 3.39616 18.3276 3.35681 18.2284 3.35681Z" fill="#AA8453" />
                                                                    </svg>
                                                                </div>
                                                                <div className='card-inner-details'>
                                                                    {item.room_category.room_detail.Area} Square feet
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <p>
                                                         <span dangerouslySetInnerHTML={{__html:item.room_category.Description}}></span>
                                                        </p>
                                                        {countApartment &&
                                                            <div className='error-count'>Not enough rooms are available</div>
                                                        }
                                                        {item.total != 0 ?
                                                            <div>
                                                                <div className='btn-cart'>
                                                                    <div className='cart-div-booking'>
                                                                        <div className='add-cart-margin' onClick={() => cartItem(item, count, 1, 0, 0)}>
                                                                            {(roomCatIDs.includes(item.RoomCatID)) ?
                                                                                <div className="text">Add More...</div> :
                                                                                <div className="text">Add Room to Cart</div>
                                                                            }
                                                                        </div>
                                                                        <div className='counter-div'>
                                                                            <div className="btn-counter" onClick={() => handleApartmentDec(item.total)}>
                                                                                <svg xmlns="http://www.w3.org/2000/svg" width="23" viewBox="0 0 23 23" fill="none">
                                                                                    <circle cx="11.6358" cy="11.6928" r="10.4737" fill="white" stroke="#DCE1E5" stroke-width="0.5" />
                                                                                    <path d="M9.13574 12.2769V11.2769H14.1357V12.2769H9.13574Z" fill="#7E7E7E" />
                                                                                </svg>
                                                                            </div>
                                                                            <div className="counter">{count}</div>
                                                                            <div className="btn-counter" onClick={() => handleApartmentInc(item.total)}>
                                                                                <svg xmlns="http://www.w3.org/2000/svg" width="23" viewBox="0 0 23 23" fill="none">
                                                                                    <circle cx="11.3438" cy="11.6928" r="10.4737" fill="white" stroke="#DCE1E5" stroke-width="0.5" />
                                                                                    <path d="M10.9275 15.5968V12.0448H7.43945V11.2448H10.9275V7.78882H11.7595V11.2448H15.2475V12.0448H11.7595V15.5968H10.9275Z" fill="#7E7E7E" />
                                                                                </svg>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div> :
                                                            <div>
                                                                <div className='btn-cart no-room-available'>
                                                                    <div className='cart-div-booking '>
                                                                        <div className='add-cart-margin'>
                                                                            <span className="text">Already Booked</span>
                                                                        </div>
                                                                        <div className='counter-div'>
                                                                            <div className="btn-counter">
                                                                                <svg xmlns="http://www.w3.org/2000/svg" width="23" viewBox="0 0 23 23" fill="none">
                                                                                    <circle cx="11.6358" cy="11.6928" r="10.4737" fill="white" stroke="#DCE1E5" stroke-width="0.5" />
                                                                                    <path d="M9.13574 12.2769V11.2769H14.1357V12.2769H9.13574Z" fill="#7E7E7E" />
                                                                                </svg>
                                                                            </div>
                                                                            <div className="counter">{count}</div>
                                                                            <div className="btn-counter">
                                                                                <svg xmlns="http://www.w3.org/2000/svg" width="23" viewBox="0 0 23 23" fill="none">
                                                                                    <circle cx="11.3438" cy="11.6928" r="10.4737" fill="white" stroke="#DCE1E5" stroke-width="0.5" />
                                                                                    <path d="M10.9275 15.5968V12.0448H7.43945V11.2448H10.9275V7.78882H11.7595V11.2448H15.2475V12.0448H11.7595V15.5968H10.9275Z" fill="#7E7E7E" />
                                                                                </svg>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        }

                                                    </div>
                                                    <div className='features-div'>
                                                        <div className='d-flex-features'>
                                                            {item?.room_features.slice(0,5).map(feature => (
                                                                 <Tooltip content={feature.feature.Title}>
                                                                    <div className='features-svg'>
                                                                        <span className='svg-style' dangerouslySetInnerHTML={{__html:feature.feature.Icon}}></span>
                                                                    </div>
                                                                 </Tooltip>
                                                            ))}
                                                        </div>
                                                        <div className='room-info' onClick={() => handleRoomDetials(item)}>
                                                            <span className='info-room-txt'>
                                                                Full info
                                                                <span className='info-svg'>
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="8" height="14" viewBox="0 0 8 14" fill="none">
                                                                        <path d="M1.33984 1.16333L7.33984 7.16333L1.33984 13.1633" stroke="#7E7E7E" stroke-linecap="round" stroke-linejoin="round" />
                                                                    </svg>
                                                                </span>
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Grid>
                                        )
                                    })
                                }
                            </Grid>

                            {/* <Grid container>
                                <Grid item xs={8} sm={8} lg={12}>
                                
                                </Grid>
                            </Grid> */}
                        </Container>
                    </section>
                    <section className='room-availabe-section'>
                        <Container fixed>
                            <div className='room-section'>
                                <div className='d-flex align-items-center room-section-title'>
                                    <h1>Nomad Residence</h1>
                                    <span className='location-span'>Located in F-6/2</span>
                                    <span style={{color:'red', paddingLeft: '10px'}}>For Female Only</span>
                                </div>
                                <p>CLEAN, Comfortable & Gorgeous Accommodations for every type of vacations</p>
                            </div>
                            <Grid container spacing={5}>
                                {
                                    props?.cmsNomadData?.map((room, index) => {
                                        // const formattedPrice = (Number((room.room_category?.Price).replace(/[^\d.]/g, ''))).toLocaleString('en-PK', {
                                        //     style: 'currency',
                                        //     currency:currency,
                                        //     minimumFractionDigits: 0,
                                        //     maximumFractionDigits: 0,
                                        // });
                                        return (
                                            <Grid item xs={12} sm={8} lg={4} spacing={smallRoom ? 2 : 5}>
                                                <div className='card-room'>
                                                    <div className='positionRelative'>
                                                        <Slider className="bluedots" {...settings}
                                                            // responsive={{
                                                            //     0: {
                                                            //         stagePadding: 0,
                                                            //         items: 1,
                                                            //         margin: 0,
                                                            //         dots: true
                                                            //     },
                                                            //     600: {
                                                            //         items: 1,
                                                            //         margin: 0,
                                                            //         dots: true
                                                            //     },
                                                            //     991: {
                                                            //         items: 1,
                                                            //         margin: 0,
                                                            //         dots: true
                                                            //     }
                                                            // }}
                                                        >
                                                            {room?.category_gallery.map(img => (
                                                                <img
                                                                    className="tns-lazy-img img-responsive-cat"
                                                                    src={img.image}
                                                                    alt=""
                                                                />

                                                            ))}
                                                        </Slider>
                                                        <div className="price-tag-list">
                                                            <div className="price">
                                                                <div className="title-price">
                                                                    Starting From
                                                                </div>
                                                                <div className="amount">
                                                                    {room.room_category?.Price}
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="counts-tag">
                                                            {formatNumber(room.total)}<span className='rooms-check-avail'>{room.total == 1 ? 'Room' : 'Rooms'} Available</span>

                                                        </div>
                                                    </div>

                                                    <div className="card-body about-content-body-list">
                                                        <h5 className="card-title">{room?.room_category?.Name}</h5>
                                                        <div className='room-details'>
                                                            <div className='guest-details'>
                                                                <div className='svg-margin'>
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="21" viewBox="0 0 20 21" fill="none">
                                                                        <path d="M10.0002 10.1948C8.15158 10.1948 6.64746 8.6907 6.64746 6.84209C6.64746 4.99347 8.15158 3.48935 10.0002 3.48935C11.8488 3.48935 13.3529 4.99347 13.3529 6.84209C13.3529 8.6907 11.8488 10.1948 10.0002 10.1948Z" stroke="#AA8453" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                                                                        <path d="M3.74121 17.5696C3.74163 17.5641 3.74205 17.5587 3.74289 17.5532C4.04673 14.3648 6.73223 11.8712 10.0004 11.8712C13.2684 11.8712 15.9535 14.3644 16.2582 17.5528" stroke="#AA8453" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                                                                        <circle cx="10" cy="10.5293" r="9.5" stroke="#AA8453" />
                                                                    </svg>
                                                                </div>
                                                                <div className='card-inner-details'>
                                                                    2 guests
                                                                </div>
                                                            </div>
                                                            <div className='area-details'>
                                                                <div className='svg-margin'>
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 21 21" fill="none">
                                                                        <path d="M20.5632 18.7472C20.4639 18.7472 20.3687 18.7867 20.2985 18.8569C20.2283 18.9271 20.1889 19.0223 20.1889 19.1216V20.0307H19.2798C19.1805 20.0307 19.0853 20.0701 19.0151 20.1403C18.9449 20.2105 18.9054 20.3057 18.9054 20.405C18.9054 20.5043 18.9449 20.5995 19.0151 20.6697C19.0853 20.7399 19.1805 20.7793 19.2798 20.7793H20.5632C20.6625 20.7793 20.7577 20.7399 20.8279 20.6697C20.8981 20.5995 20.9375 20.5043 20.9375 20.405V19.1216C20.9375 19.0223 20.8981 18.9271 20.8279 18.8569C20.7577 18.7867 20.6625 18.7472 20.5632 18.7472Z" fill="#AA8453" />
                                                                        <path d="M16.8962 20.0306H14.5127C14.4134 20.0306 14.3182 20.07 14.248 20.1402C14.1778 20.2104 14.1384 20.3057 14.1384 20.4049C14.1384 20.5042 14.1778 20.5994 14.248 20.6696C14.3182 20.7398 14.4134 20.7793 14.5127 20.7793H16.8962C16.9955 20.7793 17.0907 20.7398 17.1609 20.6696C17.2311 20.5994 17.2706 20.5042 17.2706 20.4049C17.2706 20.3057 17.2311 20.2104 17.1609 20.1402C17.0907 20.07 16.9955 20.0306 16.8962 20.0306Z" fill="#AA8453" />
                                                                        <path d="M12.1292 20.0306H10.5463V11.5453C10.5463 11.446 10.5068 11.3508 10.4366 11.2806C10.3664 11.2104 10.2712 11.171 10.1719 11.171H1.68616V9.58808C1.68616 9.4888 1.64672 9.39359 1.57652 9.32338C1.50632 9.25318 1.41111 9.21375 1.31183 9.21375C1.21255 9.21375 1.11734 9.25318 1.04714 9.32338C0.976939 9.39359 0.9375 9.4888 0.9375 9.58808V20.405C0.9375 20.5043 0.976939 20.5995 1.04714 20.6697C1.11734 20.7399 1.21255 20.7793 1.31183 20.7793H12.1292C12.2284 20.7793 12.3236 20.7399 12.3938 20.6697C12.464 20.5995 12.5035 20.5043 12.5035 20.405C12.5035 20.3057 12.464 20.2105 12.3938 20.1403C12.3236 20.0701 12.2284 20.0306 12.1292 20.0306ZM1.68616 20.0306V11.9196H9.79718V20.0306H1.68616Z" fill="#AA8453" />
                                                                        <path d="M1.31183 7.57847C1.41111 7.57847 1.50632 7.53903 1.57652 7.46883C1.64672 7.39863 1.68616 7.30342 1.68616 7.20414V4.82082C1.68616 4.72155 1.64672 4.62633 1.57652 4.55613C1.50632 4.48593 1.41111 4.44649 1.31183 4.44649C1.21255 4.44649 1.11734 4.48593 1.04714 4.55613C0.976939 4.62633 0.9375 4.72155 0.9375 4.82082V7.20414C0.9375 7.30342 0.976939 7.39863 1.04714 7.46883C1.11734 7.53903 1.21255 7.57847 1.31183 7.57847Z" fill="#AA8453" />
                                                                        <path d="M1.31183 2.81138C1.41111 2.81138 1.50632 2.77194 1.57652 2.70174C1.64672 2.63154 1.68616 2.53633 1.68616 2.43705V1.52796H2.59525C2.69453 1.52796 2.78975 1.48852 2.85995 1.41832C2.93015 1.34812 2.96959 1.25291 2.96959 1.15363C2.96959 1.05435 2.93015 0.959137 2.85995 0.888936C2.78975 0.818735 2.69453 0.779297 2.59525 0.779297H1.31183C1.21255 0.779297 1.11734 0.818735 1.04714 0.888936C0.976939 0.959137 0.9375 1.05435 0.9375 1.15363V2.43705C0.9375 2.53633 0.976939 2.63154 1.04714 2.70174C1.11734 2.77194 1.21255 2.81138 1.31183 2.81138Z" fill="#AA8453" />
                                                                        <path d="M14.5127 1.52796H16.8962C16.9955 1.52796 17.0907 1.48852 17.1609 1.41832C17.2311 1.34812 17.2706 1.25291 17.2706 1.15363C17.2706 1.05435 17.2311 0.959137 17.1609 0.888936C17.0907 0.818735 16.9955 0.779297 16.8962 0.779297H14.5127C14.4134 0.779297 14.3182 0.818735 14.248 0.888936C14.1778 0.959137 14.1384 1.05435 14.1384 1.15363C14.1384 1.25291 14.1778 1.34812 14.248 1.41832C14.3182 1.48852 14.4134 1.52796 14.5127 1.52796Z" fill="#AA8453" />
                                                                        <path d="M9.74587 1.52796H12.1294C12.2287 1.52796 12.3239 1.48852 12.3941 1.41832C12.4643 1.34812 12.5037 1.25291 12.5037 1.15363C12.5037 1.05435 12.4643 0.959137 12.3941 0.888936C12.3239 0.818735 12.2287 0.779297 12.1294 0.779297H9.74587C9.64659 0.779297 9.55138 0.818735 9.48118 0.888936C9.41098 0.959137 9.37154 1.05435 9.37154 1.15363C9.37154 1.25291 9.41098 1.34812 9.48118 1.41832C9.55138 1.48852 9.64659 1.52796 9.74587 1.52796Z" fill="#AA8453" />
                                                                        <path d="M4.97877 1.52796H7.3623C7.46158 1.52796 7.55679 1.48852 7.62699 1.41832C7.6972 1.34812 7.73663 1.25291 7.73663 1.15363C7.73663 1.05435 7.6972 0.959137 7.62699 0.888936C7.55679 0.818735 7.46158 0.779297 7.3623 0.779297H4.97877C4.87949 0.779297 4.78428 0.818735 4.71408 0.888936C4.64388 0.959137 4.60444 1.05435 4.60444 1.15363C4.60444 1.25291 4.64388 1.34812 4.71408 1.41832C4.78428 1.48852 4.87949 1.52796 4.97877 1.52796Z" fill="#AA8453" />
                                                                        <path d="M20.5632 0.779297H19.2798C19.1805 0.779297 19.0853 0.818735 19.0151 0.888936C18.9449 0.959137 18.9054 1.05435 18.9054 1.15363C18.9054 1.25291 18.9449 1.34812 19.0151 1.41832C19.0853 1.48852 19.1805 1.52796 19.2798 1.52796H20.1889V2.43705C20.1889 2.53633 20.2283 2.63154 20.2985 2.70174C20.3687 2.77194 20.4639 2.81138 20.5632 2.81138C20.6625 2.81138 20.7577 2.77194 20.8279 2.70174C20.8981 2.63154 20.9375 2.53633 20.9375 2.43705V1.15363C20.9375 1.05435 20.8981 0.959137 20.8279 0.888936C20.7577 0.818735 20.6625 0.779297 20.5632 0.779297Z" fill="#AA8453" />
                                                                        <path d="M20.5632 9.21334C20.4639 9.21334 20.3687 9.25278 20.2985 9.32298C20.2283 9.39318 20.1889 9.48839 20.1889 9.58767V11.971C20.1889 12.0703 20.2283 12.1655 20.2985 12.2357C20.3687 12.3059 20.4639 12.3453 20.5632 12.3453C20.6625 12.3453 20.7577 12.3059 20.8279 12.2357C20.8981 12.1655 20.9375 12.0703 20.9375 11.971V9.58767C20.9375 9.48839 20.8981 9.39318 20.8279 9.32298C20.7577 9.25278 20.6625 9.21334 20.5632 9.21334Z" fill="#AA8453" />
                                                                        <path d="M20.5632 4.44629C20.4639 4.44629 20.3687 4.48573 20.2985 4.55593C20.2283 4.62613 20.1889 4.72134 20.1889 4.82062V7.20394C20.1889 7.30321 20.2283 7.39843 20.2985 7.46863C20.3687 7.53883 20.4639 7.57827 20.5632 7.57827C20.6625 7.57827 20.7577 7.53883 20.8279 7.46863C20.8981 7.39843 20.9375 7.30321 20.9375 7.20394V4.82062C20.9375 4.72134 20.8981 4.62613 20.8279 4.55593C20.7577 4.48573 20.6625 4.44629 20.5632 4.44629Z" fill="#AA8453" />
                                                                        <path d="M20.5632 13.9802C20.4639 13.9802 20.3687 14.0196 20.2985 14.0898C20.2283 14.16 20.1889 14.2552 20.1889 14.3545V16.7378C20.1889 16.8371 20.2283 16.9323 20.2985 17.0025C20.3687 17.0727 20.4639 17.1122 20.5632 17.1122C20.6625 17.1122 20.7577 17.0727 20.8279 17.0025C20.8981 16.9323 20.9375 16.8371 20.9375 16.7378V14.3545C20.9375 14.2552 20.8981 14.16 20.8279 14.0898C20.7577 14.0196 20.6625 13.9802 20.5632 13.9802Z" fill="#AA8453" />
                                                                        <path d="M18.2284 3.35681H16.3086C16.2094 3.35681 16.1141 3.39625 16.0439 3.46645C15.9737 3.53665 15.9343 3.63186 15.9343 3.73114C15.9343 3.83042 15.9737 3.92563 16.0439 3.99584C16.1141 4.06604 16.2094 4.10547 16.3086 4.10547H17.3247L12.3302 9.09949V8.08408C12.3302 7.98481 12.2908 7.88959 12.2206 7.81939C12.1504 7.74919 12.0552 7.70975 11.9559 7.70975C11.8566 7.70975 11.7614 7.74919 11.6912 7.81939C11.621 7.88959 11.5816 7.98481 11.5816 8.08408V10.0037C11.5815 10.0528 11.5912 10.1015 11.61 10.1469C11.6288 10.1924 11.6564 10.2336 11.6911 10.2684C11.7259 10.3032 11.7672 10.3307 11.8126 10.3496C11.858 10.3684 11.9067 10.378 11.9559 10.378H13.8757C13.975 10.378 14.0702 10.3385 14.1404 10.2683C14.2106 10.1981 14.25 10.1029 14.25 10.0037C14.25 9.90438 14.2106 9.80916 14.1404 9.73896C14.0702 9.66876 13.975 9.62932 13.8757 9.62932H12.8596L17.8541 4.63424V5.65029C17.8541 5.74957 17.8935 5.84478 17.9637 5.91498C18.0339 5.98518 18.1291 6.02462 18.2284 6.02462C18.3277 6.02462 18.4229 5.98518 18.4931 5.91498C18.5633 5.84478 18.6027 5.74957 18.6027 5.65029V3.7305C18.6026 3.63133 18.5631 3.53629 18.4929 3.46622C18.4227 3.39616 18.3276 3.35681 18.2284 3.35681Z" fill="#AA8453" />
                                                                    </svg>
                                                                </div>
                                                                <div className='card-inner-details'>
                                                                    {room.room_category?.room_detail.Area} Square feet
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <p>
                                                         <span dangerouslySetInnerHTML={{__html:room.room_category?.Description}}></span>
                                                        </p>
                                                        {countNomad &&
                                                            <div className='error-count' key={index}>Not enough rooms are available</div>
                                                        }
                                                        {room.total != 0 && room.room_category?.BookingStatus!=2?
                                                            <div>
                                                                <div className='btn-cart' >
                                                                    <div className='cart-div-booking'>
                                                                        <div className='add-cart-margin' onClick={() => cartItem(room, nomadCount, 0, 1, 0)}>
                                                                            {(roomCatIDs.includes(room.RoomCatID)) ?
                                                                                <div className="text">Add More...</div> :
                                                                                <div className="text">Add Room to Cart</div>
                                                                            }
                                                                        </div>
                                                                        <div className='counter-div'>
                                                                            <div className="btn-counter" onClick={() => handleNomadDec(room.total)}>
                                                                                <svg xmlns="http://www.w3.org/2000/svg" width="23" viewBox="0 0 23 23" fill="none">
                                                                                    <circle cx="11.6358" cy="11.6928" r="10.4737" fill="white" stroke="#DCE1E5" stroke-width="0.5" />
                                                                                    <path d="M9.13574 12.2769V11.2769H14.1357V12.2769H9.13574Z" fill="#7E7E7E" />
                                                                                </svg>
                                                                            </div>
                                                                            <div key={index} className="counter">{nomadCount}</div>
                                                                            <div className="btn-counter" onClick={() => handleNomadInc(room.total)}>
                                                                                <svg xmlns="http://www.w3.org/2000/svg" width="23" viewBox="0 0 23 23" fill="none">
                                                                                    <circle cx="11.3438" cy="11.6928" r="10.4737" fill="white" stroke="#DCE1E5" stroke-width="0.5" />
                                                                                    <path d="M10.9275 15.5968V12.0448H7.43945V11.2448H10.9275V7.78882H11.7595V11.2448H15.2475V12.0448H11.7595V15.5968H10.9275Z" fill="#7E7E7E" />
                                                                                </svg>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div> :
                                                            <div>
                                                                <div className='btn-cart no-room-available'>
                                                                    <div className='cart-div-booking'>
                                                                        <div className='add-cart-margin'>
                                                                            <span className="text">{room.room_category?.BookingStatus!=2?'Already Booked':'Not Available'}</span>
                                                                        </div>
                                                                        <div className='counter-div'>
                                                                            <div className="btn-counter">
                                                                                <svg xmlns="http://www.w3.org/2000/svg" width="23" viewBox="0 0 23 23" fill="none">
                                                                                    <circle cx="11.6358" cy="11.6928" r="10.4737" fill="white" stroke="#DCE1E5" stroke-width="0.5" />
                                                                                    <path d="M9.13574 12.2769V11.2769H14.1357V12.2769H9.13574Z" fill="#7E7E7E" />
                                                                                </svg>
                                                                            </div>
                                                                            <div key={index} className="counter">{counter[index]}</div>
                                                                            <div className="btn-counter">
                                                                                <svg xmlns="http://www.w3.org/2000/svg" width="23" viewBox="0 0 23 23" fill="none">
                                                                                    <circle cx="11.3438" cy="11.6928" r="10.4737" fill="white" stroke="#DCE1E5" stroke-width="0.5" />
                                                                                    <path d="M10.9275 15.5968V12.0448H7.43945V11.2448H10.9275V7.78882H11.7595V11.2448H15.2475V12.0448H11.7595V15.5968H10.9275Z" fill="#7E7E7E" />
                                                                                </svg>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        }

                                                    </div>
                                                    <div className='features-div'>
                                                        <div className='d-flex-features'>
                                                        {room?.room_features.slice(0,5).map((feature,ind) => (
                                                            <Tooltip content={feature.feature.Title}>
                                                                <div className='features-svg'>
                                                                 <span className='svg-style' dangerouslySetInnerHTML={{__html:feature.feature.Icon}}></span>
                                                                </div>
                                                             </Tooltip>     
                                                        ))}
                                                        {/* {showTitle && <div className='item-title'>{featureName}</div>} */}
                                                           
                                                        </div>
                                                        <div className='room-info' onClick={() => handleRoomDetials(room)}>
                                                            <span className='info-room-txt'>
                                                                Full info
                                                                <span className='info-svg'>
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="8" height="14" viewBox="0 0 8 14" fill="none">
                                                                        <path d="M1.33984 1.16333L7.33984 7.16333L1.33984 13.1633" stroke="#7E7E7E" stroke-linecap="round" stroke-linejoin="round" />
                                                                    </svg>
                                                                </span>
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Grid>
                                        )
                                    })
                                }
                            </Grid>

                            {/* <Grid container>
                                <Grid item xs={8} sm={8} lg={12}>
                                
                                </Grid>
                            </Grid> */}
                        </Container>
                    </section>
                    <section className='room-availabe-section'>
                        <Container fixed>
                            <div className='room-section'>
                                <div className='d-flex align-items-center room-section-title'>
                                    <h1>Bulgaria Apartment</h1>
                                    <span className='location-span'>Sofia, Bulgaria</span>
                                </div>
                                <p>CLEAN, Comfortable & Gorgeous Accommodations for every type of vacations</p>
                            </div>
                            <Grid container spacing={5}>
                                {
                                    props?.cmsBulgariaData?.map((room, index) => {
                                        // const formattedPrice = (Number((room.room_category?.Price).replace(/[^\d.]/g, ''))).toLocaleString('en-PK', {
                                        //     style: 'currency',
                                        //     currency:currency,
                                        //     minimumFractionDigits: 0,
                                        //     maximumFractionDigits: 0,
                                        // });
                                        return (
                                            <Grid item xs={12} sm={8} lg={4} spacing={smallRoom ? 2 : 5}>
                                                <div className='card-room'>
                                                    <div className='positionRelative'>
                                                        <Slider className="bluedots" {...settings}
                                                            // responsive={{
                                                            //     0: {
                                                            //         stagePadding: 0,
                                                            //         items: 1,
                                                            //         margin: 0,
                                                            //         dots: true
                                                            //     },
                                                            //     600: {
                                                            //         items: 1,
                                                            //         margin: 0,
                                                            //         dots: true
                                                            //     },
                                                            //     991: {
                                                            //         items: 1,
                                                            //         margin: 0,
                                                            //         dots: true
                                                            //     }
                                                            // }}
                                                        >
                                                            {room?.category_gallery.map(img => (
                                                                <img
                                                                    className="tns-lazy-img img-responsive-cat"
                                                                    src={img.image}
                                                                    alt=""
                                                                />

                                                            ))}
                                                        </Slider>
                                                        <div className="price-tag-list">
                                                            <div className="price">
                                                                <div className="title-price">
                                                                    Starting From
                                                                </div>
                                                                <div className="amount">
                                                                    {room.room_category?.Price}
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="counts-tag">
                                                            {formatNumber(room.total)}<span className='rooms-check-avail'>{room.total == 1 ? 'Room' : 'Rooms'} Available</span>

                                                        </div>
                                                    </div>

                                                    <div className="card-body about-content-body-list">
                                                        <h5 className="card-title">{room?.room_category?.Name}</h5>
                                                        <div className='room-details'>
                                                            <div className='guest-details'>
                                                                <div className='svg-margin'>
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="21" viewBox="0 0 20 21" fill="none">
                                                                        <path d="M10.0002 10.1948C8.15158 10.1948 6.64746 8.6907 6.64746 6.84209C6.64746 4.99347 8.15158 3.48935 10.0002 3.48935C11.8488 3.48935 13.3529 4.99347 13.3529 6.84209C13.3529 8.6907 11.8488 10.1948 10.0002 10.1948Z" stroke="#AA8453" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                                                                        <path d="M3.74121 17.5696C3.74163 17.5641 3.74205 17.5587 3.74289 17.5532C4.04673 14.3648 6.73223 11.8712 10.0004 11.8712C13.2684 11.8712 15.9535 14.3644 16.2582 17.5528" stroke="#AA8453" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                                                                        <circle cx="10" cy="10.5293" r="9.5" stroke="#AA8453" />
                                                                    </svg>
                                                                </div>
                                                                <div className='card-inner-details'>
                                                                    2 guests
                                                                </div>
                                                            </div>
                                                            <div className='area-details'>
                                                                <div className='svg-margin'>
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 21 21" fill="none">
                                                                        <path d="M20.5632 18.7472C20.4639 18.7472 20.3687 18.7867 20.2985 18.8569C20.2283 18.9271 20.1889 19.0223 20.1889 19.1216V20.0307H19.2798C19.1805 20.0307 19.0853 20.0701 19.0151 20.1403C18.9449 20.2105 18.9054 20.3057 18.9054 20.405C18.9054 20.5043 18.9449 20.5995 19.0151 20.6697C19.0853 20.7399 19.1805 20.7793 19.2798 20.7793H20.5632C20.6625 20.7793 20.7577 20.7399 20.8279 20.6697C20.8981 20.5995 20.9375 20.5043 20.9375 20.405V19.1216C20.9375 19.0223 20.8981 18.9271 20.8279 18.8569C20.7577 18.7867 20.6625 18.7472 20.5632 18.7472Z" fill="#AA8453" />
                                                                        <path d="M16.8962 20.0306H14.5127C14.4134 20.0306 14.3182 20.07 14.248 20.1402C14.1778 20.2104 14.1384 20.3057 14.1384 20.4049C14.1384 20.5042 14.1778 20.5994 14.248 20.6696C14.3182 20.7398 14.4134 20.7793 14.5127 20.7793H16.8962C16.9955 20.7793 17.0907 20.7398 17.1609 20.6696C17.2311 20.5994 17.2706 20.5042 17.2706 20.4049C17.2706 20.3057 17.2311 20.2104 17.1609 20.1402C17.0907 20.07 16.9955 20.0306 16.8962 20.0306Z" fill="#AA8453" />
                                                                        <path d="M12.1292 20.0306H10.5463V11.5453C10.5463 11.446 10.5068 11.3508 10.4366 11.2806C10.3664 11.2104 10.2712 11.171 10.1719 11.171H1.68616V9.58808C1.68616 9.4888 1.64672 9.39359 1.57652 9.32338C1.50632 9.25318 1.41111 9.21375 1.31183 9.21375C1.21255 9.21375 1.11734 9.25318 1.04714 9.32338C0.976939 9.39359 0.9375 9.4888 0.9375 9.58808V20.405C0.9375 20.5043 0.976939 20.5995 1.04714 20.6697C1.11734 20.7399 1.21255 20.7793 1.31183 20.7793H12.1292C12.2284 20.7793 12.3236 20.7399 12.3938 20.6697C12.464 20.5995 12.5035 20.5043 12.5035 20.405C12.5035 20.3057 12.464 20.2105 12.3938 20.1403C12.3236 20.0701 12.2284 20.0306 12.1292 20.0306ZM1.68616 20.0306V11.9196H9.79718V20.0306H1.68616Z" fill="#AA8453" />
                                                                        <path d="M1.31183 7.57847C1.41111 7.57847 1.50632 7.53903 1.57652 7.46883C1.64672 7.39863 1.68616 7.30342 1.68616 7.20414V4.82082C1.68616 4.72155 1.64672 4.62633 1.57652 4.55613C1.50632 4.48593 1.41111 4.44649 1.31183 4.44649C1.21255 4.44649 1.11734 4.48593 1.04714 4.55613C0.976939 4.62633 0.9375 4.72155 0.9375 4.82082V7.20414C0.9375 7.30342 0.976939 7.39863 1.04714 7.46883C1.11734 7.53903 1.21255 7.57847 1.31183 7.57847Z" fill="#AA8453" />
                                                                        <path d="M1.31183 2.81138C1.41111 2.81138 1.50632 2.77194 1.57652 2.70174C1.64672 2.63154 1.68616 2.53633 1.68616 2.43705V1.52796H2.59525C2.69453 1.52796 2.78975 1.48852 2.85995 1.41832C2.93015 1.34812 2.96959 1.25291 2.96959 1.15363C2.96959 1.05435 2.93015 0.959137 2.85995 0.888936C2.78975 0.818735 2.69453 0.779297 2.59525 0.779297H1.31183C1.21255 0.779297 1.11734 0.818735 1.04714 0.888936C0.976939 0.959137 0.9375 1.05435 0.9375 1.15363V2.43705C0.9375 2.53633 0.976939 2.63154 1.04714 2.70174C1.11734 2.77194 1.21255 2.81138 1.31183 2.81138Z" fill="#AA8453" />
                                                                        <path d="M14.5127 1.52796H16.8962C16.9955 1.52796 17.0907 1.48852 17.1609 1.41832C17.2311 1.34812 17.2706 1.25291 17.2706 1.15363C17.2706 1.05435 17.2311 0.959137 17.1609 0.888936C17.0907 0.818735 16.9955 0.779297 16.8962 0.779297H14.5127C14.4134 0.779297 14.3182 0.818735 14.248 0.888936C14.1778 0.959137 14.1384 1.05435 14.1384 1.15363C14.1384 1.25291 14.1778 1.34812 14.248 1.41832C14.3182 1.48852 14.4134 1.52796 14.5127 1.52796Z" fill="#AA8453" />
                                                                        <path d="M9.74587 1.52796H12.1294C12.2287 1.52796 12.3239 1.48852 12.3941 1.41832C12.4643 1.34812 12.5037 1.25291 12.5037 1.15363C12.5037 1.05435 12.4643 0.959137 12.3941 0.888936C12.3239 0.818735 12.2287 0.779297 12.1294 0.779297H9.74587C9.64659 0.779297 9.55138 0.818735 9.48118 0.888936C9.41098 0.959137 9.37154 1.05435 9.37154 1.15363C9.37154 1.25291 9.41098 1.34812 9.48118 1.41832C9.55138 1.48852 9.64659 1.52796 9.74587 1.52796Z" fill="#AA8453" />
                                                                        <path d="M4.97877 1.52796H7.3623C7.46158 1.52796 7.55679 1.48852 7.62699 1.41832C7.6972 1.34812 7.73663 1.25291 7.73663 1.15363C7.73663 1.05435 7.6972 0.959137 7.62699 0.888936C7.55679 0.818735 7.46158 0.779297 7.3623 0.779297H4.97877C4.87949 0.779297 4.78428 0.818735 4.71408 0.888936C4.64388 0.959137 4.60444 1.05435 4.60444 1.15363C4.60444 1.25291 4.64388 1.34812 4.71408 1.41832C4.78428 1.48852 4.87949 1.52796 4.97877 1.52796Z" fill="#AA8453" />
                                                                        <path d="M20.5632 0.779297H19.2798C19.1805 0.779297 19.0853 0.818735 19.0151 0.888936C18.9449 0.959137 18.9054 1.05435 18.9054 1.15363C18.9054 1.25291 18.9449 1.34812 19.0151 1.41832C19.0853 1.48852 19.1805 1.52796 19.2798 1.52796H20.1889V2.43705C20.1889 2.53633 20.2283 2.63154 20.2985 2.70174C20.3687 2.77194 20.4639 2.81138 20.5632 2.81138C20.6625 2.81138 20.7577 2.77194 20.8279 2.70174C20.8981 2.63154 20.9375 2.53633 20.9375 2.43705V1.15363C20.9375 1.05435 20.8981 0.959137 20.8279 0.888936C20.7577 0.818735 20.6625 0.779297 20.5632 0.779297Z" fill="#AA8453" />
                                                                        <path d="M20.5632 9.21334C20.4639 9.21334 20.3687 9.25278 20.2985 9.32298C20.2283 9.39318 20.1889 9.48839 20.1889 9.58767V11.971C20.1889 12.0703 20.2283 12.1655 20.2985 12.2357C20.3687 12.3059 20.4639 12.3453 20.5632 12.3453C20.6625 12.3453 20.7577 12.3059 20.8279 12.2357C20.8981 12.1655 20.9375 12.0703 20.9375 11.971V9.58767C20.9375 9.48839 20.8981 9.39318 20.8279 9.32298C20.7577 9.25278 20.6625 9.21334 20.5632 9.21334Z" fill="#AA8453" />
                                                                        <path d="M20.5632 4.44629C20.4639 4.44629 20.3687 4.48573 20.2985 4.55593C20.2283 4.62613 20.1889 4.72134 20.1889 4.82062V7.20394C20.1889 7.30321 20.2283 7.39843 20.2985 7.46863C20.3687 7.53883 20.4639 7.57827 20.5632 7.57827C20.6625 7.57827 20.7577 7.53883 20.8279 7.46863C20.8981 7.39843 20.9375 7.30321 20.9375 7.20394V4.82062C20.9375 4.72134 20.8981 4.62613 20.8279 4.55593C20.7577 4.48573 20.6625 4.44629 20.5632 4.44629Z" fill="#AA8453" />
                                                                        <path d="M20.5632 13.9802C20.4639 13.9802 20.3687 14.0196 20.2985 14.0898C20.2283 14.16 20.1889 14.2552 20.1889 14.3545V16.7378C20.1889 16.8371 20.2283 16.9323 20.2985 17.0025C20.3687 17.0727 20.4639 17.1122 20.5632 17.1122C20.6625 17.1122 20.7577 17.0727 20.8279 17.0025C20.8981 16.9323 20.9375 16.8371 20.9375 16.7378V14.3545C20.9375 14.2552 20.8981 14.16 20.8279 14.0898C20.7577 14.0196 20.6625 13.9802 20.5632 13.9802Z" fill="#AA8453" />
                                                                        <path d="M18.2284 3.35681H16.3086C16.2094 3.35681 16.1141 3.39625 16.0439 3.46645C15.9737 3.53665 15.9343 3.63186 15.9343 3.73114C15.9343 3.83042 15.9737 3.92563 16.0439 3.99584C16.1141 4.06604 16.2094 4.10547 16.3086 4.10547H17.3247L12.3302 9.09949V8.08408C12.3302 7.98481 12.2908 7.88959 12.2206 7.81939C12.1504 7.74919 12.0552 7.70975 11.9559 7.70975C11.8566 7.70975 11.7614 7.74919 11.6912 7.81939C11.621 7.88959 11.5816 7.98481 11.5816 8.08408V10.0037C11.5815 10.0528 11.5912 10.1015 11.61 10.1469C11.6288 10.1924 11.6564 10.2336 11.6911 10.2684C11.7259 10.3032 11.7672 10.3307 11.8126 10.3496C11.858 10.3684 11.9067 10.378 11.9559 10.378H13.8757C13.975 10.378 14.0702 10.3385 14.1404 10.2683C14.2106 10.1981 14.25 10.1029 14.25 10.0037C14.25 9.90438 14.2106 9.80916 14.1404 9.73896C14.0702 9.66876 13.975 9.62932 13.8757 9.62932H12.8596L17.8541 4.63424V5.65029C17.8541 5.74957 17.8935 5.84478 17.9637 5.91498C18.0339 5.98518 18.1291 6.02462 18.2284 6.02462C18.3277 6.02462 18.4229 5.98518 18.4931 5.91498C18.5633 5.84478 18.6027 5.74957 18.6027 5.65029V3.7305C18.6026 3.63133 18.5631 3.53629 18.4929 3.46622C18.4227 3.39616 18.3276 3.35681 18.2284 3.35681Z" fill="#AA8453" />
                                                                    </svg>
                                                                </div>
                                                                <div className='card-inner-details'>
                                                                    {room.room_category?.room_detail.Area} Square feet
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <p>
                                                         <span dangerouslySetInnerHTML={{__html:room.room_category?.Description}}></span>
                                                        </p>
                                                        {countBulgaria &&
                                                            <div className='error-count' key={index}>Not enough rooms are available</div>
                                                        }
                                                        {room.total != 0 && room.room_category?.BookingStatus!=2?
                                                            <div>
                                                                <div className='btn-cart' >
                                                                    <div className='cart-div-booking'>
                                                                        <div className='add-cart-margin' onClick={() => cartItem(room, bulgariaCount, 0, 0, 1)}>
                                                                            {(roomCatIDs.includes(room.RoomCatID)) ?
                                                                                <div className="text">Add More...</div> :
                                                                                <div className="text">Add Room to Cart</div>
                                                                            }
                                                                        </div>
                                                                        <div className='counter-div'>
                                                                            <div className="btn-counter" onClick={() => handleBulgariaDec(room.total)}>
                                                                                <svg xmlns="http://www.w3.org/2000/svg" width="23" viewBox="0 0 23 23" fill="none">
                                                                                    <circle cx="11.6358" cy="11.6928" r="10.4737" fill="white" stroke="#DCE1E5" stroke-width="0.5" />
                                                                                    <path d="M9.13574 12.2769V11.2769H14.1357V12.2769H9.13574Z" fill="#7E7E7E" />
                                                                                </svg>
                                                                            </div>
                                                                            <div key={index} className="counter">{bulgariaCount}</div>
                                                                            <div className="btn-counter" onClick={() => handleBulgariaInc(room.total)}>
                                                                                <svg xmlns="http://www.w3.org/2000/svg" width="23" viewBox="0 0 23 23" fill="none">
                                                                                    <circle cx="11.3438" cy="11.6928" r="10.4737" fill="white" stroke="#DCE1E5" stroke-width="0.5" />
                                                                                    <path d="M10.9275 15.5968V12.0448H7.43945V11.2448H10.9275V7.78882H11.7595V11.2448H15.2475V12.0448H11.7595V15.5968H10.9275Z" fill="#7E7E7E" />
                                                                                </svg>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div> :
                                                            <div>
                                                                <div className='btn-cart no-room-available'>
                                                                    <div className='cart-div-booking'>
                                                                        <div className='add-cart-margin'>
                                                                            <span className="text">{room.room_category?.BookingStatus!=2?'Already Booked':'Not Available'}</span>
                                                                        </div>
                                                                        <div className='counter-div'>
                                                                            <div className="btn-counter">
                                                                                <svg xmlns="http://www.w3.org/2000/svg" width="23" viewBox="0 0 23 23" fill="none">
                                                                                    <circle cx="11.6358" cy="11.6928" r="10.4737" fill="white" stroke="#DCE1E5" stroke-width="0.5" />
                                                                                    <path d="M9.13574 12.2769V11.2769H14.1357V12.2769H9.13574Z" fill="#7E7E7E" />
                                                                                </svg>
                                                                            </div>
                                                                            <div key={index} className="counter">{counter[index]}</div>
                                                                            <div className="btn-counter">
                                                                                <svg xmlns="http://www.w3.org/2000/svg" width="23" viewBox="0 0 23 23" fill="none">
                                                                                    <circle cx="11.3438" cy="11.6928" r="10.4737" fill="white" stroke="#DCE1E5" stroke-width="0.5" />
                                                                                    <path d="M10.9275 15.5968V12.0448H7.43945V11.2448H10.9275V7.78882H11.7595V11.2448H15.2475V12.0448H11.7595V15.5968H10.9275Z" fill="#7E7E7E" />
                                                                                </svg>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        }

                                                    </div>
                                                    <div className='features-div'>
                                                        <div className='d-flex-features'>
                                                        {room?.room_features.slice(0,5).map((feature,ind) => (
                                                            <Tooltip content={feature.feature.Title}>
                                                                <div className='features-svg'>
                                                                 <span className='svg-style' dangerouslySetInnerHTML={{__html:feature.feature.Icon}}></span>
                                                                </div>
                                                             </Tooltip>     
                                                        ))}
                                                        {/* {showTitle && <div className='item-title'>{featureName}</div>} */}
                                                           
                                                        </div>
                                                        <div className='room-info' onClick={() => handleRoomDetials(room)}>
                                                            <span className='info-room-txt'>
                                                                Full info
                                                                <span className='info-svg'>
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="8" height="14" viewBox="0 0 8 14" fill="none">
                                                                        <path d="M1.33984 1.16333L7.33984 7.16333L1.33984 13.1633" stroke="#7E7E7E" stroke-linecap="round" stroke-linejoin="round" />
                                                                    </svg>
                                                                </span>
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Grid>
                                        )
                                    })
                                }
                            </Grid>

                            {/* <Grid container>
                                <Grid item xs={8} sm={8} lg={12}>
                                
                                </Grid>
                            </Grid> */}
                        </Container>
                    </section>
                </div>

            }
            {/* <div>
                <div style={{ marginTop: '50px' }}>
                    <Grid container spacing={2} >
                       
                        <Grid item xs={12} sm="auto" md="auto" className="positionRelative">
                            <input
                                ref={searchInputRef}
                                type="text"
                                className="custom-form-search custom-det-field-2"
                                id="search"
                                placeholder="Select a Hotel Location"
                                value={locationQuery}
                                onChange={(e) => setDataQuery(e)}
                                onFocus={() => openFilteredItemsDiv()}
                                autoComplete="off"
                            />
                            {
                                openFilteredItems &&
                                <div className="filter-items">
                                    {filteredData.map((item, index) => (
                                        <div className="cursor-button" key={index} onClick={() => setLocationQuery(item)}>
                                            {item}
                                        </div>
                                    ))}
                                </div>
                            }
                        </Grid>
                        <Grid item xs={12} sm="auto" md="auto" >
                            <div className="booking-list-page custom-det-field-2 booking-date-picker d-flex align-items-center">
                                <DateRangePicker
                                    startDate={checkInDate} 
                                    endDate={checkOutDate} 
                                    startDatePlaceholderText="Check-in"
                                    endDatePlaceholderText="Check-out"
                                    noBorder
                                    keepOpenOnDateSelect={true}
                                    onDatesChange={handleDatesChange} 
                                    focusedInput={focusedInput} 
                                    onFocusChange={focusedInput => setFocusedInput(focusedInput)} 
                                    customArrowIcon={
                                    <i className={`${classes.checkoutSvg} checkout-svg norepeat-img`}></i>
                                    }
                                    displayFormat="ddd, MMM D"
                                    orientation={isSmallScreen ? 'vertical' : 'horizontal'}
                                    renderCalendarInfo={renderCalendarInfo}

                                />
                            </div>
                        </Grid>
                        <Grid item xs={12} sm="auto" md="auto" >
                            <div className='custom-det-field-2 d-flex align-items-center positionRelative'>
                                <i className={`${classes.guestSvg} guest-svg norepeat-img me-3`}></i>
                                <div>
                                    <label className="form-label form-label-custome">
                                    {numOfAdults} Adult{numOfAdults > 1 && 's'} - {numOfChildren} {numOfChildren > 1 ? 'Children' : 'Child'}
                                    </label>
                                </div>
                                <div className="drop-icon cursor-button" onClick={() => setOpenAdultsChildren(true)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="10" viewBox="0 0 18 10" fill="none">
                                    <path d="M16.9318 1.45129L10.4118 7.97129C9.6418 8.74129 8.3818 8.74129 7.6118 7.97129L1.0918 1.45129" stroke="#797979" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
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
                                        <span className="guests-ch-btn" onClick={() => setNumOfAdults(numOfAdults-1)}>
                                            <button
                                            className="btn btn-default value-control minus-btn cursor-button"
                                            data-action="minus"
                                            data-target="font-size"
                                            >
                                            <span className={`${classes.minusSvg} minus-svg norepeat-img`}></span>
                                            </button>
                                        </span>
                                        <span>{numOfAdults}</span>
                                        <span className="guests-ch-btn" onClick={() => setNumOfAdults(numOfAdults+1)}>
                                            <button
                                            className="btn btn-default value-control plus-btn cursor-button"
                                            data-action="plus"
                                            data-target="font-size"
                                            >
                                            <span className={`${classes.plusSvg} plus-svg norepeat-img`}></span>
                                            </button>
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
                                        <span className="guests-ch-btn" onClick={() => setNumOfChildren(numOfChildren-1)}>
                                            <button
                                            className="btn btn-default value-control minus-btn cursor-button"
                                            data-action="minus"
                                            data-target="font-size"
                                            >
                                            <span className={`${classes.minusSvg} minus-svg norepeat-img`}></span>
                                            </button>
                                        </span>
                                        <span>{numOfChildren}</span>
                                        <span className="guests-ch-btn" onClick={() => setNumOfChildren(numOfChildren+1)}>
                                            <button
                                            className="btn btn-default value-control plus-btn cursor-button"
                                            data-action="plus"
                                            data-target="font-size"
                                            >
                                            <span className={`${classes.plusSvg} plus-svg norepeat-img`}></span>
                                            </button>
                                        </span>
                                        </Grid>
                                    </Grid>
                                    </div>
                                }
                            </div>
                        </Grid>
                        <Grid item xs={12} sm="auto" md="auto" >
                            <div className='custom-det-field-2 d-flex align-items-center'>
                                Price
                                <div>
                                    <FormControl className={classes.priceDropdown}>
                                        <Select
                                            value={higherPriceLimit}
                                            onChange={(e) => setHigherPriceLimit(e.target.value)}
                                        >                                              
                                            <MenuItem value={15000}>15000</MenuItem>
                                            <MenuItem value={20000}>20000</MenuItem>
                                            <MenuItem value={25000}>25000</MenuItem>
                                            <MenuItem value={30000}>30000</MenuItem>
                                            <MenuItem value={35000}>35000</MenuItem>
                                        </Select>
                                    </FormControl>
                                </div>
                            </div>
                        </Grid>
                    </Grid>
                </div>
                <section>
                    <div className='defalut-heading-hotel'>
                        <h2>{props.numOfHotels} Hotel{props.numOfHotels > 1 && 's'} in {locationQuery}</h2>
                        <div className='main-rel'>
                            <span className='sort-by-style'>Sort by</span>
                            <FormControl className={classes.root}>
                                <Select
                                    value={sortBy}
                                    onChange={handleChange}
                                >
                                    {sortByOptions.map(option => (
                                        <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
                                    ))}

                                </Select>
                            </FormControl>
                        </div>
                    </div>
                    {
                        props?.loading &&
                        <Loader />
                    }
                    {
                        props?.cmsRoomData?.map(room => {
                            return ( 
                                <div className='card-seclect-ht'>
                                    <Grid container spacing={0}>
                                        <Grid item xs={12} sm={12} md={12} lg={5}>
                                            {
                                                room.room_category.room_detail.room_gallery.length > 0 && 
                                                <div>
                                                    <img className='img-responsive img-full img-margin-bottom img-border' src={room.room_category.room_detail.room_gallery[0].image} />
                                                </div>
                                            }
                                        </Grid>
                                        <Grid className="positionRelative" item xs={12} sm={12} md={12} lg={7}>
                                            <Grid container spacing={0}>
                                                <Grid className="rm-square-body" item md={8}>
                                                    <div className="card-body">
                                                        <h5 className="card-title">{room.room_category.Name} 
                                                        </h5>
                                                        <div className="rm-square d-flex flex-wrap align-items-center">
                                                            <div className="list-item">
                                                                <span>{room.total} Room Available</span>
                                                            </div>
                                                            {
                                                                room.room_category.room_detail.Area && 
                                                                <div className="list-item">
                                                                    <img className="img-align" src={squarefe} />
                                                                    <span>{room.room_category.room_detail.Area} Sq ft</span>
                                                                </div>
                                                            }
                                                        </div>
                                                        <div className="rm-feature">
                                                            <div> 
                                                                <h3>Features</h3>
                                                            </div> 
                                                            <div className="rm-featurelist">
                                                                <Grid container>
                                                                    {Features.map((item, index) => (
                                                                        room.room_category.room_detail[item] == 1 &&
                                                                        <Grid className="item" item xs={12} sm={6}>
                                                                            {item === "MountainView" && "Mountain View"}
                                                                            {item === "AirConditioning" && "Air Conditioning"}
                                                                            {item === "MiniBar" && "Mini Bar"}
                                                                            {item === "FreeWifi" && "Free Wifi"}
                                                                            {item === "Intercom" && "Intercom"}
                                                                            {item === "FlatScreenTV" && "Flat-screen TV"}
                                                                            {item === "Wardrobe" && "Wardrobe"}
                                                                            {item === "CityView" && "City View"}
                                                                            {item === "Terrace" && "Terrace"}
                                                                            {item === "EntireApartment" && "Entire Apartment"}
                                                                            {item === "Kitchen" && "Kitchen"}
                                                                            {item === "Garden" && "Garden"}
                                                                            {item === "FreeParking" && "Free Parking"}
                                                                            {item === "DailyHousekeeping" && "Daily Housekeeping"}
                                                                            {item === "LuggageStorage" && "Luggage Storage"}
                                                                            {item === "Heating" && "Heating"}
                                                                            {item === "Patio" && "Patio"}
                                                                            {item === "Dishwasher" && "Dishwasher"}
                                                                        </Grid>
                                                                    ))}
                                                                </Grid>                                                                                        
                                                            </div>
                                                        </div>  
                                                    </div>
                                                </Grid>
                                                <Grid className="rm-square-body-right" item xs={12} md={4}>
                                                    <div className="card-body">
                                                        <div className="pp-price">
                                                        <span>{props?.configData[0].Currency} <strong>{room.room_category.room_detail.Price}</strong></span>
                                                        </div>
                                                        <div className="pp-txt">
                                                        <span>Per night without taxes</span>
                                                        </div>
                                                        
                                                        <div className="htrm-bok align-self-center cursor-button" onClick={()=>handleBooking(room)}>
                                                            <div className="btn booknw-ht">Book now</div>
                                                            <div className="date-required-error">
                                                                {(!checkOutDate && checkOutDateError) && 
                                                                <InputError
                                                                    message={checkOutDateError}
                                                                />
                                                                }
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>                                                        
                                </div>  
                            )
                            
                        })
                    }
                </section>
            </div> */}
            {openModalCart &&
                <CartModal openModalCart={true} cartItem={cart} />
            }
        </div>
    )
}

// //what is needed at start
const mapStateToProps = ({ cmsReducer, authReducer }) => {
    if (cmsReducer.roomData || cmsReducer.getParamLoading) {
        if (cmsReducer.roomData || cmsReducer.paramData ) {
            return {
                //   cmsRoomData: cmsReducer.roomData[1],
                cmsRoomData: cmsReducer.roomData[0].filter((item) => item.RoomCatID !== 4 && item.RoomCatID !== 5 && item.RoomCatID !== 6),
                cmsApartmentData: cmsReducer.roomData[0].filter((item) => item.RoomCatID == 4),
                cmsNomadData: cmsReducer.roomData[0].filter((item) => item.RoomCatID == 5),
                cmsBulgariaData: cmsReducer.roomData[0].filter((item) => item.RoomCatID == 6),
                numOfHotels: Object.keys(cmsReducer.roomData[1]).length,
                paramData:cmsReducer.paramData,
                paramDataSuccess:cmsReducer.successParam,
                successSetParam:cmsReducer.successSetParam,
                configData: cmsReducer.roomData[2],
                loading: cmsReducer.getParamLoading,
                success: cmsReducer.successRoom
            };
        } else
            return {
                loading: cmsReducer.getParamLoading,
            };
    } else if (authReducer.dataGetConfig || authReducer.successGetConfig) {
        return {
            dataGetConfig: authReducer.dataGetConfig,
            successGetConfig: authReducer.successGetConfig,
        };
    }
};
//which actions our function can dispatch
const mapDispatchToProps = (dispatch) => {
    return {
        getRoomDataStart: (data) => dispatch(actions.getRoomData(data)),
        getParamsData: (data) => dispatch(actions.getParam(data)),
        setParamDataStart: (data) => dispatch(actions.setParam(data)),
        errorHandlerSuccess: () => dispatch(actions.cmsHandlerSuccess())

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingList);