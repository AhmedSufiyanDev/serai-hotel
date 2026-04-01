import React, { useState, useEffect, useRef } from 'react' 
import { Link as RouterLink } from 'react-router-dom';
import '../../../assets/scss/roomDetails.scss';
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
// import OwlCarousel from 'react-owl-carousel';
// import 'owl.carousel/dist/assets/owl.carousel.css';
// import 'owl.carousel/dist/assets/owl.theme.default.css';
import moment from 'moment';
import { Loader,CustomSeparator} from "../../../components/index";
import {InputError} from "../../../components/index";
import { Helmet } from "react-helmet";
import UseAnalyticsEventTracker from '../../../components/googleAnalytics';
import TouristSpots from '../home/touristSpots';
import "../scss/general.scss";
import "../scss/home.scss";
import { useCart } from '../layout/cartContext'
import CartModal from '../layout/cart'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { currency } from '../../../environment';

import { 
    squarefe,bookingList,roomCatImage,roomDetail
  } from "../../../assets/images/images";
import { Container, Grid,Box,Link } from '@material-ui/core'; 
const Features = ["MountainView", "AirConditioning", "Terrace", "MiniBar","CityView","FreeWifi", "Intercom", "FlatScreenTV", "Wardrobe",'Patio','Dishwasher','EntireApartment','Kitchen','Garden','FreeParking','DailyHousekeeping','LuggageStorage','Heating']

function RoomDetails(props) {  
    const classes = useStyles();
    const [checkInDateError, setCheckInDateError] = useState(null);
    const [roomData, setRoomData] = useState([]);
    const [home,setHome] = useState(props.location.home);
    const isSmallScreen = window.innerWidth < 768;

    const queryParams = new URLSearchParams(props.location.search);
    const [checkInDate, setCheckInDate] = useState();
    const [checkOutDate, setCheckOutDate] = useState();
    const [numOfAdults, setNumOfAdults] = useState();
    const [numOfChildren, setNumOfChildren] = useState();
    const [breadCrumbID, setBreadCrumbID] = useState();
    const [roomCatID, setRoomCatID] = useState();

    console.log("room",roomCatID,'breadCrumb',breadCrumbID)

    // const [checkInDate, setCheckInDate] = useState(props.location.fromDate);
    // const [checkOutDate, setCheckOutDate] = useState(props.location.toDate);
    // const [numOfAdults, setNumOfAdults] = useState(props.location.numOfAdults);
    // const [numOfChildren, setNumOfChildren] = useState(props.location.numOfChildren);
    const [openFilteredItems, setOpenFilteredItems] = React.useState(false);
    const [openModalCart, setOpenModalCart] = useState(false);
    const {addToCart} =  useCart();
    const [breadCrumbsList, setBreadCrumbsList] = useState(breadCrumbID==1?[
        {text: 'Home', url: '/'},
        {text: 'Room Details', url: ''},
      ]:[
        {text: 'Home', url: '/'},
        {text: 'Room Categories', url:'home/booking/booking-list'},
        {text: 'Room Details', url: ''},
      ]);

    const fetchRoomData = (id) => {
        console.log("id is",id)
        props.getRoomCatStart({id:id})
    };

    useEffect(() => {
        props.getParamsData({sessionID:localStorage.getItem('sessionId')})
    }, [props.location.pathname]);

    useEffect(() => {
        if (props?.successParam && props?.paramData.length!=0) {
            console.log("props?.successParam",props?.successParam,"props?.paramData.length",props?.paramData.length)
            setRoomCatID(props?.location?.RoomCatID?props.location.RoomCatID:props.paramData[0].RoomCatID)
            setCheckInDate(new moment(props.paramData[0].FromDate))
            setCheckOutDate(new moment(props.paramData[0].ToDate));
            setNumOfAdults(props.paramData[0].NumofAdult);
            setNumOfChildren(props.paramData[0].NumOfChildren);
            setBreadCrumbID(props.paramData[0].BreadCrumb);
            fetchRoomData(props?.location?.RoomCatID?props.location.RoomCatID:props.paramData[0].RoomCatID)

            setBreadCrumbsList(props.paramData[0].BreadCrumb==1?
                [
                    {text: 'Home', url: '/'},
                    {text: 'Room Details', url: ''},
                  ]:[
                    {text: 'Home', url: '/'},
                    {text: 'Room Categories', url:'home/booking/booking-list'},
                    {text: 'Room Details', url: ''},
                  ]                
                )
        }
    }, [props?.successParam]);

    useEffect(() => {
        if(roomCatID){
            console.log("room cat id is",roomCatID)
            fetchRoomData(roomCatID)
        }
    }, [roomCatID]);


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
        if(props?.successRoomCatData){
            setRoomData(props?.categoryData[0])
        }
    }, [props?.successRoomCatData]);

    useEffect(() => {
        setTimeout(() => {
            props.errorHandlerSuccess()
        }, 100) 
    }, [props?.successSetParam]);

    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };

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
    const [focusedInput, setFocusedInput] = useState(false);
    const [openAdultsChildren, setOpenAdultsChildren] = React.useState(false);

    const handleClosePicker = () => {
        setFocusedInput(null);
    };

    // const formatPrice = (amount) => {
    //     const formattedAmount = (Number(amount)).toLocaleString('en-PK', {
    //         style: 'currency',
    //         currency:currency,
    //         minimumFractionDigits: 0,
    //         maximumFractionDigits: 0,
    //     });

    //     return formattedAmount
    // }

    // useEffect(() => {
    //     var url = document.URL.split("/");
    //     window.onpopstate = () => {
    //         window.location.replace(url[0] + '//' + url[2]);
    //     };
    // });

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }, [props.location.pathname]);

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

    const renderCalendarInfo = () => {
        return (
          <div className="custom-calendar-info">
            <button className="custom-close-button" onClick={handleClosePicker}>
              X
            </button>
          </div>
        );
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
        data.RoomCatID = roomCatID
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
        data.RoomCatID = roomCatID
        data.numOfChildren = (numOfChildren > 0  && operator == 0)?numOfChildren-1:numOfChildren+1
        data.sessionID=localStorage.getItem('sessionId')
        let fd = new FormData();
        for (let item in data)
        fd.append(item, data[item]);
        props.setParamDataStart(fd);
    }


    const handleGoBack = () => {
       props.history.goBack(); 
      };

    const cartItem = () => {
        // const cartItem =  { ...room,count:1,room_category:{Name:home==1?roomData.Name:roomData.room_category.Name,Price:home==1?roomData.Price:roomData.room_category.Price,id:home==1?roomData.id:roomData.room_category.id}}
        // const cartItem =  { ...room,count:1,Name:home==1?roomData.Name:roomData.room_category.Name,Price:home==1?roomData.Price:roomData.room_category.Price,id:home==1?roomData.id:roomData.room_category.id,room_category:{Name:home==1?roomData.Name:roomData.room_category.Name,Price:home==1?roomData.Price:roomData.room_category.Price,id:home==1?roomData.id:roomData.room_category.id}}
        const cartItem =  { ...roomData,count:1,Name:roomData.Name,Price:roomData.Price,id:roomData.id,room_category:{Name:roomData.Name,Price:roomData.Price,id:roomData.id}}
        setOpenModalCart(true);
        addToCart(cartItem,checkInDate,checkOutDate,numOfAdults,numOfChildren)
        setOpenModalCart(true);
        // props.history.push({pathname:`/booking-detail`});

    }
    
    return (
        <div className="booking">
            <div className="header-heigt-fixss">
                <Container fixed>
                    <Grid container>
                        <Grid item xs={12} md={12} lg={12} >
                            <CustomSeparator
                                breadCrumbsList={breadCrumbsList}
                                {...props}
                                setBreadCrumbsList={setBreadCrumbsList}
                            />
                            {/* <RouterLink to={{ pathname:'/'}}>
                                <span className='breadcrum'>
                                    Home /
                                </span>
                            </RouterLink>
                            <span className='breadcrum' onClick={handleGoBack}>
                                Booking List /
                            </span>
                            <span className='breadcrum'>
                                Room-details
                            </span> */}
                        </Grid>
                    </Grid>
                </Container>             
            </div>
            <section className='section-margin'>
            {props?.loadingCategory || props?.getParamLoading ?
                <Loader/>:
                <Container fixed>
                    <div className='d-flex justify-content-between'>
                        <div className='room-title'>
                            <h1>
                              {roomData?.Name}
                            </h1>
                        </div>
                        <div>
                            <div className='room-txt'>
                                <p>Per Night</p>
                            </div>
                            <div className='room-price'>
                                <p> {roomData?.Price}</p>
                            </div>
                        </div>
                    </div>
                    <Grid container spacing={5}>
                        <Grid item xs={12} md={12} lg={8}>
                            <Slider className="bluedots dots-slick" {...settings}
                                // responsive={{
                                //     0: {
                                //         stagePadding: 20,
                                //         items: 1,
                                //         margin: 10,
                                //         dots: false
                                //     },
                                //     600: {
                                //         items: 1,
                                //         margin: 15,
                                //         dots: true
                                //     },
                                //     991: {
                                //         items: 1,
                                //         margin: 40,
                                //         dots: true    
                                //     },
                                //     1000: {
                                //         items: 1,
                                //         margin: 40,
                                //         dots: true    
                                //     },
                                //     1200: {
                                //         items: 1,
                                //         margin: 23,
                                //         dots: true    
                                //     },
                                //     1366: {
                                //         items: 1,
                                //         margin: 23,
                                //         dots: true    
                                //     },
                                //     1600: {
                                //         items: 1,
                                //         margin: 23,
                                //         nav: true,
                                //         dots: true    
                                //     },
                                //     1920: {
                                //         items: 1,
                                //         margin: 23,
                                //         dots: true    
                                //     }
                                // }}
                            >
                            {roomData?.category_gallery?.map((img,index) => (    
                                <img
                                    key={index}
                                    className="tns-lazy-img img-responsive-cat"
                                    src={img.image}
                                    alt=""
                                />

                             ))}
                            </Slider>   
                        </Grid>
                        <Grid item xs={12} md={12} lg={4}>
                          <div className='booking-details'>
                                <div className='room-date-guest'>
                                    <h1>Select Dates & Guests</h1>
                                </div>
                                <div className='d-flex justify-content-between'>
                                    <div className='dates-div'>
                                        <div className="home-page form-control-transparent home-date-picker border-bb-mb form-fs-md d-flex  flex-wrap align-items-center margin-date">
                                            <i className={`${classes.checkinSvg} search-svg1 norepeat-img me-3`}></i>
                                            <div>
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
                                        </div>
                                        <div className="form-control-transparent  flex-wrap form-fs-md d-flex align-items-center positionRelative">
                                            <i className={`${classes.guestSvg} guest-svg norepeat-img me-3 cursor-button`} onClick={() => setOpenAdultsChildren(true)}></i>
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
                                                    <span className="guests-ch-btn1" onClick={()=>numberAdults(0)}>
                                                        <button
                                                        className="btn btn-default value-control minus-btn cursor-button"
                                                        data-action="minus"
                                                        data-target="font-size"
                                                        >
                                                        <span className={`${classes.minusSvg} minus-svg norepeat-img`}></span>
                                                        </button>
                                                    </span>
                                                    <span>{numOfAdults}</span>
                                                    <span className="guests-ch-btn1" onClick={()=>numberAdults(1)}>
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
                                                    <span className="guests-ch-btn1" onClick={()=>numberChild(0)}>
                                                        <button
                                                        className="btn btn-default value-control minus-btn cursor-button"
                                                        data-action="minus"
                                                        data-target="font-size"
                                                        >
                                                        <span className={`${classes.minusSvg} minus-svg norepeat-img`}></span>
                                                        </button>
                                                    </span>
                                                    <span>{numOfChildren}</span>
                                                    <span className="guests-ch-btn1" onClick={()=>numberChild(1)}>
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
                                       {roomData?.BookingStatus==2?
                                        <div className="search-btn ms-auto">
                                            <button className="btn btn-serach-available cursor-button">
                                                <span class="hh-btn">Not Available</span>
                                            </button>
                                        </div>
                                        :                    
                                       <div className="search-btn ms-auto" onClick={cartItem}>
                                            <button className="btn btn-serach-detail cursor-button">
                                                <span class="hh-btn">BOOK NOW</span>
                                            </button>
                                        </div>
                                       }  
                                    </div>
                                </div>
                          </div> 
                        </Grid>
                    </Grid>
                    <div className='room-services'>
                        <h1>Amenities</h1>
                        <div className='room-features'>
                            <div className='features-div-room'>
                            {roomData?.room_features?.map(item => (     
                                 <div className='features-inner-div'>
                                    <div className='feature-svg'>
                                        <span dangerouslySetInnerHTML={{__html:item.feature.Icon}} />
                                    </div>
                                    <div className='feature-name'>
                                        <p>{item.feature.Title}</p>
                                    </div>
                                 </div>
                             ))}

                               
                                {/* <div className='features-inner-div'>
                                    <div className='feature-svg'>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="53" height="49" viewBox="0 0 53 49" fill="none">
                                            <path d="M50.483 25.1697H48.6758C48.5066 22.422 47.8374 19.7699 46.6792 17.2768C46.5024 16.8951 46.0496 16.7299 45.668 16.9066C45.2863 17.0838 45.1206 17.5366 45.2978 17.9183C46.3618 20.2096 46.9826 22.6456 47.1495 25.1697H12.2662C11.8456 25.1697 11.5048 25.5105 11.5048 25.9311C11.5048 26.3517 11.8456 26.6925 12.2662 26.6925H50.483C50.8683 26.6925 51.1813 27.0059 51.1813 27.3911V28.3206C51.1813 28.7058 50.8683 29.0192 50.483 29.0192H2.86599C2.48072 29.0192 2.16774 28.7058 2.16774 28.3206V27.3911C2.16774 27.0059 2.48072 26.6925 2.86599 26.6925H8.71654C9.13716 26.6925 9.47835 26.3517 9.47835 25.9311C9.47835 25.5105 9.13716 25.1697 8.71654 25.1697H6.19958C6.5352 20.1107 8.70463 15.4045 12.3611 11.8449C15.885 8.41479 20.4383 6.3955 25.3046 6.07537C25.3074 6.07537 25.3102 6.07576 25.313 6.07537C25.5203 6.06186 25.7252 6.05153 25.9278 6.04399C25.9683 6.0428 26.0084 6.04081 26.0489 6.03962C26.1212 6.03724 26.1931 6.03565 26.2642 6.03406C26.4009 6.03167 26.5375 6.02929 26.6745 6.02929C26.8564 6.02929 27.0383 6.03287 27.2199 6.03763C27.2735 6.03922 27.3267 6.04081 27.3807 6.0424C27.5205 6.04716 27.6599 6.05431 27.7993 6.06186C27.8732 6.06583 27.9471 6.0698 28.0214 6.07457C34.2735 6.48526 40.0255 9.73663 43.605 14.9501C43.8429 15.2964 44.3171 15.385 44.6639 15.1467C45.0106 14.9088 45.0988 14.4345 44.8605 14.0878C41.3382 8.95735 35.8559 5.59715 29.7964 4.73049C30.1761 4.14107 30.3894 3.44718 30.3894 2.72033C30.3894 2.30647 30.2047 1.54347 28.9679 1.0883C28.3502 0.861106 27.5356 0.735596 26.6745 0.735596C25.813 0.735596 24.9984 0.861106 24.3808 1.0883C23.1439 1.54347 22.9596 2.30647 22.9596 2.72033C22.9596 3.4452 23.1721 4.13789 23.5495 4.72612C18.9489 5.37711 14.6819 7.45996 11.2986 10.7534C7.34625 14.601 5.01119 19.6961 4.67319 25.1693H2.86599C1.64107 25.1697 0.644531 26.1662 0.644531 27.3911V28.3206C0.644531 29.5459 1.64107 30.5424 2.86599 30.5424H11.0699C10.6604 30.8228 10.268 31.1374 9.90055 31.4865L9.88546 31.5008C9.86203 31.5227 9.83979 31.5461 9.81953 31.5711L6.20394 35.9616C5.75036 35.6737 5.21336 35.5688 4.68352 35.6705C4.13103 35.7761 3.65322 36.0907 3.33785 36.5562L1.91592 38.653C1.26573 39.6122 1.51675 40.9225 2.47516 41.5735L12.205 48.1834C12.5577 48.4229 12.9652 48.5477 13.3827 48.5477C13.5153 48.5477 13.6492 48.535 13.7827 48.5095C14.3347 48.4039 14.8126 48.0893 15.1279 47.6238L16.5498 45.5271C17.2 44.5679 16.9494 43.2575 15.991 42.6066L15.9354 42.5688C16.6126 41.8003 17.5154 41.2494 18.4976 41.0222C20.5674 40.5428 23.0029 40.8514 24.6548 41.125C26.6983 41.4635 28.8447 41.3479 30.862 40.7906L33.6662 40.0157C35.5341 39.4994 37.2532 38.6299 38.776 37.4312C38.7875 37.4221 38.7986 37.4129 38.8097 37.403L43.624 33.1392C44.4446 32.5113 44.6234 31.4238 44.3402 30.5424H50.483C51.708 30.5424 52.7045 29.5459 52.7045 28.321V27.3911C52.7045 26.1662 51.708 25.1697 50.483 25.1697ZM26.6745 2.2588C27.957 2.2588 28.7256 2.57616 28.8662 2.75251C28.8559 3.47499 28.4904 4.14147 27.8959 4.54104C27.7461 4.53309 27.5984 4.52674 27.451 4.52118C27.4014 4.51959 27.3517 4.5172 27.3021 4.51601C27.0896 4.50966 26.8799 4.50648 26.6745 4.50648C26.5287 4.50648 26.3802 4.50847 26.2305 4.51164C26.1582 4.51284 26.0855 4.51482 26.0128 4.5172C25.9262 4.51998 25.8388 4.52276 25.7515 4.52634C25.6518 4.53071 25.5521 4.53508 25.4528 4.54064C24.8582 4.14107 24.4932 3.47459 24.4828 2.75251C24.6234 2.57616 25.392 2.2588 26.6745 2.2588ZM32.1358 30.9098C32.079 30.7811 32.0111 30.6588 31.9345 30.5424H39.2391L36.0807 32.6328L31.5786 33.9352L31.4257 33.9388C32.2923 33.2163 32.6085 31.9826 32.1358 30.9098ZM23.8775 30.5424L22.7785 30.7716L21.9289 30.5424H23.8775ZM15.2892 44.6723L13.8676 46.7691C13.7807 46.8978 13.6488 46.9843 13.4963 47.0137C13.3442 47.0427 13.1893 47.0109 13.061 46.9236L3.3311 40.3136C3.06657 40.1341 2.99746 39.7726 3.17699 39.5081L4.59892 37.411C4.6859 37.2827 4.81737 37.1957 4.96989 37.1667C5.00683 37.1595 5.04376 37.156 5.08031 37.156C5.19549 37.156 5.30789 37.1905 5.4052 37.2569L15.1351 43.8664C15.3996 44.046 15.4687 44.4078 15.2892 44.6723ZM42.6895 31.9365C42.6712 31.9497 42.6537 31.964 42.6366 31.979L37.8172 36.248C36.4584 37.3136 34.9253 38.0874 33.2607 38.5473L30.4565 39.3222C28.6509 39.8215 26.7309 39.9251 24.9043 39.6225C23.1241 39.3278 20.4883 38.9977 18.1541 39.5383C16.8021 39.8513 15.5676 40.6282 14.6696 41.7085L7.47136 36.8188L10.965 32.576C12.2865 31.3285 13.9622 30.5877 15.5668 30.5424H15.5978C16.0955 30.5341 16.6221 30.6806 17.1794 30.8367C17.2914 30.8677 17.403 30.8991 17.515 30.9293L22.5577 32.2896C22.6733 32.3206 22.7944 32.3242 22.9116 32.2996L29.516 30.9225C29.8155 30.8606 30.13 30.9213 30.3791 31.0901C30.5399 31.1994 30.6654 31.3495 30.7421 31.5239C30.9685 32.0374 30.7552 32.6404 30.2492 32.9009L27.996 34.0941C27.6842 34.2593 27.5269 34.6168 27.6154 34.9583C27.7044 35.3003 28.0154 35.5331 28.3689 35.5283L31.7112 35.456C31.7776 35.4544 31.8431 35.4445 31.9062 35.4262L36.6157 34.0639C36.69 34.0424 36.7603 34.0099 36.8246 33.9674L41.5757 30.8224C41.9745 30.5762 42.5052 30.3736 42.7876 30.7903C43.0076 31.1144 43.0128 31.6978 42.6895 31.9365Z" fill="#AA8453"/>
                                        </svg>
                                    </div>
                                    <div className='feature-name'>
                                        <p>Hotel Dine In</p>
                                    </div>
                                </div>  
                                <div className='features-inner-div'>
                                    <div className='feature-svg'>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="52" height="49" viewBox="0 0 52 49" fill="none">
                                            <path d="M49.3251 26.1612H48.4713V8.2317C48.4713 3.96273 45.0562 0.547607 40.7873 0.547607C37.0082 0.547607 34.2903 3.3497 33.9862 7.45539C32.0023 7.83039 30.5418 9.5391 30.5418 11.6468C30.5418 12.1591 30.8833 12.5006 31.3956 12.5006H38.2259C38.7382 12.5006 39.0796 12.1591 39.0796 11.6468C39.0796 9.56241 37.6515 7.86791 35.7011 7.46789C35.9563 4.75485 37.5857 2.25512 40.7873 2.25512C44.117 2.25512 46.7637 4.90183 46.7637 8.2316V26.1611H21.0676C20.6813 24.192 18.9786 22.746 16.8812 22.746C16.0275 21.7215 14.8321 21.0384 13.4661 21.0384C11.8439 21.0384 10.3925 21.9776 9.7094 23.3436C9.02634 23.0022 8.25793 22.746 7.48952 22.746C5.3921 22.746 3.68939 24.192 3.30319 26.1611H3.22054C1.76907 26.1611 0.65918 27.271 0.65918 28.7225C0.65918 30.174 1.76907 31.2839 3.22054 31.2839H4.24659L6.55032 40.4194C7.23338 43.0662 9.62395 44.9445 12.3561 44.9445H13.0392L11.9293 47.1644C11.6731 47.5914 11.8439 48.1036 12.2708 48.2743C12.3561 48.3597 12.5269 48.3597 12.6122 48.3597C12.9537 48.3597 13.2099 48.1889 13.3807 47.9327L14.8748 44.9445H38.5674L40.0188 47.8474C40.1896 48.1889 40.4458 48.3597 40.7873 48.3597C40.958 48.3597 41.0434 48.3597 41.1287 48.1889C41.4702 48.0181 41.641 47.5058 41.4702 47.079L40.4007 44.9399C43.0441 44.8461 45.33 42.9999 45.9953 40.5048L48.3206 31.2839H49.3251C50.7766 31.2839 51.8865 30.174 51.8865 28.7225C51.8865 27.2711 50.7766 26.1612 49.3251 26.1612ZM37.2867 10.7931H32.4201C32.7616 9.76852 33.7861 9.08545 34.8961 9.08545C36.0061 9.08545 36.9452 9.76852 37.2867 10.7931ZM7.48952 24.4536C8.25793 24.4536 8.94099 24.7951 9.53861 25.3928C9.7094 25.649 10.0509 25.7343 10.3924 25.649C10.7338 25.5636 10.9046 25.3075 10.99 24.9659C11.2461 23.6852 12.2707 22.746 13.5513 22.746C14.4905 22.746 15.3443 23.173 15.7712 24.0267C15.942 24.3682 16.3688 24.539 16.7104 24.4536C16.7958 24.4536 16.8812 24.4536 16.9666 24.4536C18.0765 24.4536 19.0157 25.1367 19.3571 26.1612H5.09884C5.44043 25.1367 6.37953 24.4536 7.48952 24.4536ZM44.4585 39.9926C43.9462 41.8709 42.2386 43.237 40.275 43.237H12.4415C10.4777 43.237 8.7702 41.871 8.25793 39.9926L6.03804 31.284H46.5076L44.4585 39.9926ZM49.3251 29.5764H47.6175H4.92815H3.22054C2.70827 29.5764 2.36679 29.2349 2.36679 28.7226C2.36679 28.2103 2.70827 27.8689 3.22054 27.8689H4.0743H20.2962H49.3251C49.8374 27.8689 50.1789 28.2103 50.1789 28.7226C50.1789 29.2349 49.8374 29.5764 49.3251 29.5764Z" fill="#AA8453"/>
                                            <path d="M31.3957 16.3426C31.908 16.3426 32.2495 16.0011 32.2495 15.4888V15.0619C32.2495 14.5496 31.908 14.2081 31.3957 14.2081C30.8835 14.2081 30.542 14.5496 30.542 15.0619V15.4888C30.542 16.0011 30.8835 16.3426 31.3957 16.3426Z" fill="#AA8453"/>
                                            <path d="M31.3957 20.2697C31.908 20.2697 32.2495 19.8428 32.2495 19.4159V18.4767C32.2495 17.9645 31.908 17.623 31.3957 17.623C30.8835 17.623 30.542 17.9645 30.542 18.4767V19.4159C30.542 19.9281 30.8835 20.2697 31.3957 20.2697Z" fill="#AA8453"/>
                                            <path d="M31.3957 23.5996C31.908 23.5996 32.2495 23.2582 32.2495 22.7459V22.319C32.2495 21.8067 31.908 21.4652 31.3957 21.4652C30.8835 21.4652 30.542 21.8067 30.542 22.319V22.7459C30.542 23.2581 30.8835 23.5996 31.3957 23.5996Z" fill="#AA8453"/>
                                            <path d="M34.8108 16.3426C35.3231 16.3426 35.6645 16.0011 35.6645 15.4888V15.0619C35.6645 14.5496 35.3231 14.2081 34.8108 14.2081C34.2985 14.2081 33.957 14.5496 33.957 15.0619V15.4888C33.957 16.0011 34.2985 16.3426 34.8108 16.3426Z" fill="#AA8453"/>
                                            <path d="M33.957 19.4159C33.957 19.9282 34.2985 20.2697 34.8108 20.2697C35.3231 20.2697 35.6645 19.8428 35.6645 19.4159V18.4767C35.6645 17.9645 35.3231 17.623 34.8108 17.623C34.2985 17.623 33.957 17.9645 33.957 18.4767V19.4159Z" fill="#AA8453"/>
                                            <path d="M33.957 22.7459C33.957 23.2582 34.2985 23.5996 34.8108 23.5996C35.3231 23.5996 35.6645 23.2582 35.6645 22.7459V22.319C35.6645 21.8067 35.3231 21.4652 34.8108 21.4652C34.2985 21.4652 33.957 21.8067 33.957 22.319V22.7459Z" fill="#AA8453"/>
                                            <path d="M38.2258 16.3426C38.7381 16.3426 39.0796 16.0011 39.0796 15.4888V15.0619C39.0796 14.5496 38.7381 14.2081 38.2258 14.2081C37.7136 14.2081 37.3721 14.5496 37.3721 15.0619V15.4888C37.372 16.0011 37.7136 16.3426 38.2258 16.3426Z" fill="#AA8453"/>
                                            <path d="M37.3721 19.4159C37.3721 19.9282 37.7136 20.2697 38.2258 20.2697C38.7381 20.2697 39.0797 19.8429 39.0797 19.4159V18.4767C39.0797 17.9645 38.7382 17.623 38.2259 17.623C37.7137 17.623 37.3722 17.9645 37.3722 18.4767L37.3721 19.4159Z" fill="#AA8453"/>
                                            <path d="M37.3721 22.7459C37.3721 23.2582 37.7136 23.5996 38.2258 23.5996C38.7381 23.5996 39.0796 23.2582 39.0796 22.7459V22.319C39.0796 21.8067 38.7381 21.4652 38.2258 21.4652C37.7136 21.4652 37.3721 21.8067 37.3721 22.319V22.7459Z" fill="#AA8453"/>
                                        </svg>
                                    </div>
                                    <div className='feature-name'>
                                        <p>Private Bathroom</p>
                                    </div>
                                </div>
                                <div className='features-inner-div'>
                                    <div className='feature-svg'>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="56" height="49" viewBox="0 0 56 49" fill="none">
                                            <path d="M27.9716 23.2426C22.6119 23.2278 17.3929 25.1923 13.0999 28.8407C12.9944 28.9307 12.9054 29.0435 12.8382 29.1726C12.771 29.3017 12.7268 29.4446 12.7081 29.5931C12.6704 29.8931 12.7391 30.1978 12.899 30.4402C13.0589 30.6826 13.2969 30.8428 13.5607 30.8857C13.6914 30.9069 13.8244 30.8987 13.9522 30.8614C14.08 30.8242 14.2002 30.7587 14.3057 30.6687C18.2569 27.3301 23.0488 25.5272 27.9716 25.5272C32.8945 25.5272 37.6864 27.3301 41.6375 30.6687C41.8107 30.8185 42.0228 30.8989 42.2404 30.8972C42.3961 30.8954 42.5495 30.8534 42.6888 30.7742C42.8281 30.695 42.9496 30.5808 43.0443 30.4402C43.2042 30.1978 43.2729 29.8931 43.2352 29.5931C43.1975 29.2932 43.0565 29.0225 42.8433 28.8407C38.5503 25.1923 33.3313 23.2278 27.9716 23.2426ZM27.9716 11.9779C20.4679 11.9579 13.1638 14.7261 7.17135 19.8609C6.95814 20.0457 6.81825 20.3193 6.78245 20.6214C6.74664 20.9235 6.81786 21.2294 6.98042 21.4718C7.14299 21.7142 7.38359 21.8732 7.6493 21.914C7.91501 21.9547 8.18405 21.8737 8.39726 21.6889C14.0426 16.8688 20.9117 14.2628 27.9716 14.2628C35.0316 14.2628 41.9007 16.8688 47.546 21.6889C47.7192 21.8387 47.9313 21.919 48.1489 21.9174C48.3055 21.9211 48.4605 21.8814 48.6005 21.8018C48.7406 21.7222 48.8615 21.605 48.9528 21.4604C49.1149 21.2208 49.1868 20.9179 49.1529 20.6182C49.119 20.3184 48.982 20.0461 48.7719 19.8609C42.7794 14.7261 35.4754 11.9579 27.9716 11.9779ZM54.7005 10.8582C47.0049 4.25014 37.6153 0.694296 27.9716 0.735958C18.3279 0.694296 8.93837 4.25014 1.24276 10.8582C1.02956 11.04 0.888613 11.3107 0.850924 11.6106C0.813235 11.9106 0.881892 12.2153 1.04179 12.4577C1.20169 12.7001 1.43974 12.8604 1.70356 12.9032C1.96739 12.9461 2.23537 12.868 2.44858 12.6862C9.81356 6.41209 18.7687 3.02089 27.9716 3.02089C37.1746 3.02089 46.1297 6.41209 53.4947 12.6862C53.6679 12.836 53.8799 12.9164 54.0976 12.9147C54.2533 12.913 54.4066 12.8709 54.5459 12.7917C54.6852 12.7125 54.8068 12.5983 54.9015 12.4577C55.0614 12.2153 55.13 11.9106 55.0923 11.6106C55.0546 11.3107 54.9137 11.04 54.7005 10.8582Z" fill="#AA8453"/>
                                            <circle cx="27.9716" cy="41.1123" r="6.43544" stroke="#AA8453" stroke-width="2"/>
                                        </svg>
                                    </div>
                                    <div className='feature-name'>
                                        <p>Free Wi-Fi</p>
                                    </div>
                                </div>  
                                <div className='features-inner-div'>
                                    <div className='feature-svg'>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="49" viewBox="0 0 48 49" fill="none">
                                            <g clip-path="url(#clip0_1547_1975)">
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M18.2711 0.735596C21.8912 0.735596 25.1014 2.74093 25.1014 6.42715C25.3469 8.95223 22.7492 13.9949 22.825 16.6769C22.825 17.4122 22.9114 18.1913 23.0822 19.0152C23.4717 18.9533 23.8954 18.9373 24.2935 18.9586C26.7482 11.4634 30.413 7.56589 35.3469 7.56589C41.4461 7.56589 47.8687 13.5605 47.8687 18.9501C47.8687 22.5701 45.8634 25.7804 42.1772 25.7804C39.4589 25.9874 34.6542 23.4282 31.9274 23.504C31.1921 23.504 30.413 23.5904 29.5891 23.7612C29.651 24.1507 29.6638 24.5744 29.6457 24.9746C37.1387 27.4271 41.0384 31.092 41.0384 36.0258C41.0384 42.125 35.0438 48.5477 29.6542 48.5477C26.0342 48.5477 22.8239 46.5423 22.8239 42.8561C22.6468 39.9938 25.1761 35.3727 25.1003 32.6064C25.1003 31.8711 25.0139 31.092 24.8431 30.2681C24.4536 30.33 24.0278 30.346 23.6297 30.3246C21.1772 37.8198 17.5123 41.7174 12.5785 41.7174C6.47925 41.7174 0.0566406 35.7227 0.0566406 30.3332C0.0566406 26.7131 2.06197 23.5029 5.7482 23.5029C8.61052 23.3257 13.2316 25.8551 15.9979 25.7793C16.7332 25.7793 17.5123 25.6929 18.3362 25.5221C18.2743 25.1326 18.2583 24.7089 18.2797 24.3087C10.7866 21.8561 6.88694 18.1913 6.88694 13.2574C6.88694 7.15821 12.8816 0.735596 18.2711 0.735596ZM29.0587 27.1752C28.5966 28.1112 27.8752 28.9031 26.9958 29.4591C27.2508 30.5562 27.3778 31.6043 27.3778 32.6053C27.6233 35.1325 25.0256 40.1731 25.1014 42.855C25.1014 45.0023 27.1324 46.2702 29.6553 46.2702C33.7513 46.2702 38.762 40.902 38.762 36.0247C38.762 32.314 35.6265 29.3449 29.0587 27.1752ZM5.74926 25.7793C3.60199 25.7793 2.33412 27.8102 2.33412 30.3332C2.33412 34.4292 7.7023 39.4399 12.5796 39.4399C16.2903 39.4399 19.2594 36.3044 21.4291 29.7366C20.4888 29.2724 19.6991 28.553 19.143 27.6715C18.0481 27.9287 17.0011 28.0568 15.999 28.0568C13.4718 28.3022 8.43122 25.7046 5.74926 25.7804M23.9637 21.2265C22.079 21.2265 20.5486 22.7569 20.5486 24.6416C20.5486 26.5264 22.079 28.0568 23.9637 28.0568C25.8485 28.0568 27.3789 26.5264 27.3789 24.6416C27.3789 22.7569 25.8485 21.2265 23.9637 21.2265ZM35.3479 9.8423C31.6371 9.8423 28.6681 12.9778 26.4984 19.5413C27.4365 20.0098 28.2284 20.7302 28.7844 21.6107C29.8773 21.3535 30.9264 21.2254 31.9285 21.2254C34.4557 20.9799 39.4963 23.5776 42.1782 23.5018C44.3234 23.5018 45.5934 21.4709 45.5934 18.9479C45.5934 14.8519 40.2252 9.84123 35.3479 9.84123M18.2711 3.01201C14.1751 3.01201 9.16441 8.38019 9.16441 13.2574C9.16441 16.9682 12.2999 19.9373 18.8656 22.1069C19.3319 21.1667 20.0513 20.377 20.9328 19.8209C20.6756 18.726 20.5475 17.679 20.5475 16.6769C20.3021 14.1497 22.8997 9.10911 22.8239 6.42715C22.8239 4.27988 20.793 3.01201 18.2701 3.01201" fill="#AA8453"/>
                                            </g>
                                            <defs>
                                            <clipPath id="clip0_1547_1975">
                                            <rect width="47.8121" height="47.8121" fill="white" transform="translate(0.0566406 0.735596)"/>
                                            </clipPath>
                                            </defs>
                                        </svg>
                                    </div>
                                    <div className='feature-name'>
                                        <p>Air Condition</p>
                                    </div>
                                </div>
                                <div className='features-inner-div'>
                                    <div className='feature-svg'>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="49" height="49" viewBox="0 0 49 49" fill="none">
                                                <g clip-path="url(#clip0_1547_1934)">
                                                <path d="M39.7886 0.735352C35.703 0.735352 32.3904 4.04797 32.3904 8.13352V12.0534H14.8336V8.13352C14.8336 5.15217 17.2628 2.72292 20.2442 2.72292C23.2255 2.72292 25.6548 5.15217 25.6548 8.13352C25.6548 8.68563 26.0965 9.12731 26.6486 9.12731C27.2007 9.12731 27.6423 8.68563 27.6423 8.13352C27.6423 4.04797 24.3297 0.735352 20.2442 0.735352C16.1586 0.735352 12.846 4.04797 12.846 8.13352V33.2542C12.7908 33.8063 13.2877 34.3032 13.8398 34.3032C14.3919 34.3032 14.8336 33.8615 14.8336 33.3094V30.8249H32.4456V33.3094C32.4456 33.8615 32.8873 34.3032 33.4394 34.3032C33.9915 34.3032 34.4332 33.8615 34.4332 33.3094V8.13352C34.4332 5.15217 36.8625 2.72292 39.8438 2.72292C42.8252 2.72292 45.1992 5.15217 45.1992 8.13352C45.1992 8.68563 45.6409 9.12731 46.193 9.12731C46.7451 9.12731 47.1868 8.68563 47.1868 8.13352C47.1868 4.04797 43.8742 0.735352 39.7886 0.735352ZM32.4456 28.7269H14.8336V25.1935H32.4456V28.7269ZM32.4456 23.2059H14.8336V19.6725H32.4456V23.2059ZM32.4456 17.5745H14.8336V14.041H32.4456V17.5745Z" fill="#AA8453"/>
                                                <path d="M44.7028 38.1679C44.4819 37.671 43.8746 37.395 43.3777 37.671C38.4088 39.8242 35.9795 38.7752 33.3847 37.671C30.7346 36.5668 28.0293 35.4074 23.226 37.671C18.257 39.8242 15.8278 38.7752 13.2329 37.671C10.5828 36.5668 7.82231 35.4074 3.01902 37.671C2.52213 37.8918 2.30129 38.4992 2.52213 38.9961C2.74297 39.4929 3.35028 39.7138 3.84717 39.4929C7.87752 37.6158 9.97551 38.4992 12.4048 39.5482C14.0059 40.2107 15.7174 40.9284 17.981 40.9284C19.6373 40.9284 21.5697 40.5419 23.9989 39.4929C28.0293 37.6158 30.1272 38.4992 32.5565 39.5482C34.1576 40.2107 35.8691 40.9284 38.1327 40.9284C39.789 40.9284 41.7214 40.5419 44.1507 39.4929C44.6475 39.2721 44.9236 38.6648 44.7028 38.1679Z" fill="#AA8453"/>
                                                <path d="M44.6471 45.7869C44.4262 45.29 43.8189 45.014 43.322 45.29C38.3531 47.4432 35.9239 46.3942 33.329 45.29C30.6789 44.1858 27.9736 43.0264 23.1703 45.29C18.2014 47.4432 15.7721 46.3942 13.1772 45.29C10.5272 44.1858 7.82186 43.0264 2.96336 45.29C2.46646 45.5109 2.24562 46.1182 2.46646 46.6151C2.74252 47.112 3.34983 47.3328 3.84672 47.112C7.87707 45.2348 9.97506 46.1182 12.4043 47.1672C14.0054 47.8297 15.7169 48.5474 17.9805 48.5474C19.6368 48.5474 21.5692 48.161 23.9985 47.112C28.0288 45.2348 30.1268 46.1182 32.556 47.1672C34.1571 47.8297 35.8687 48.5474 38.1323 48.5474C39.7886 48.5474 41.7209 48.161 44.1502 47.112C44.6471 46.8911 44.9231 46.2838 44.6471 45.7869Z" fill="#AA8453"/>
                                                </g>
                                                <defs>
                                                <clipPath id="clip0_1547_1934">
                                                <rect width="47.8121" height="47.8121" fill="white" transform="translate(0.87793 0.735352)"/>
                                                </clipPath>
                                                </defs>
                                        </svg>
                                    </div>
                                    <div className='feature-name'>
                                        <p>Swimming Pool</p>
                                    </div>
                                </div>
                                <div className='features-inner-div'>
                                    <div className='feature-svg'>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="53" height="49" viewBox="0 0 53 49" fill="none">
                                            <path d="M50.483 25.1697H48.6758C48.5066 22.422 47.8374 19.7699 46.6792 17.2768C46.5024 16.8951 46.0496 16.7299 45.668 16.9066C45.2863 17.0838 45.1206 17.5366 45.2978 17.9183C46.3618 20.2096 46.9826 22.6456 47.1495 25.1697H12.2662C11.8456 25.1697 11.5048 25.5105 11.5048 25.9311C11.5048 26.3517 11.8456 26.6925 12.2662 26.6925H50.483C50.8683 26.6925 51.1813 27.0059 51.1813 27.3911V28.3206C51.1813 28.7058 50.8683 29.0192 50.483 29.0192H2.86599C2.48072 29.0192 2.16774 28.7058 2.16774 28.3206V27.3911C2.16774 27.0059 2.48072 26.6925 2.86599 26.6925H8.71654C9.13716 26.6925 9.47835 26.3517 9.47835 25.9311C9.47835 25.5105 9.13716 25.1697 8.71654 25.1697H6.19958C6.5352 20.1107 8.70463 15.4045 12.3611 11.8449C15.885 8.41479 20.4383 6.3955 25.3046 6.07537C25.3074 6.07537 25.3102 6.07576 25.313 6.07537C25.5203 6.06186 25.7252 6.05153 25.9278 6.04399C25.9683 6.0428 26.0084 6.04081 26.0489 6.03962C26.1212 6.03724 26.1931 6.03565 26.2642 6.03406C26.4009 6.03167 26.5375 6.02929 26.6745 6.02929C26.8564 6.02929 27.0383 6.03287 27.2199 6.03763C27.2735 6.03922 27.3267 6.04081 27.3807 6.0424C27.5205 6.04716 27.6599 6.05431 27.7993 6.06186C27.8732 6.06583 27.9471 6.0698 28.0214 6.07457C34.2735 6.48526 40.0255 9.73663 43.605 14.9501C43.8429 15.2964 44.3171 15.385 44.6639 15.1467C45.0106 14.9088 45.0988 14.4345 44.8605 14.0878C41.3382 8.95735 35.8559 5.59715 29.7964 4.73049C30.1761 4.14107 30.3894 3.44718 30.3894 2.72033C30.3894 2.30647 30.2047 1.54347 28.9679 1.0883C28.3502 0.861106 27.5356 0.735596 26.6745 0.735596C25.813 0.735596 24.9984 0.861106 24.3808 1.0883C23.1439 1.54347 22.9596 2.30647 22.9596 2.72033C22.9596 3.4452 23.1721 4.13789 23.5495 4.72612C18.9489 5.37711 14.6819 7.45996 11.2986 10.7534C7.34625 14.601 5.01119 19.6961 4.67319 25.1693H2.86599C1.64107 25.1697 0.644531 26.1662 0.644531 27.3911V28.3206C0.644531 29.5459 1.64107 30.5424 2.86599 30.5424H11.0699C10.6604 30.8228 10.268 31.1374 9.90055 31.4865L9.88546 31.5008C9.86203 31.5227 9.83979 31.5461 9.81953 31.5711L6.20394 35.9616C5.75036 35.6737 5.21336 35.5688 4.68352 35.6705C4.13103 35.7761 3.65322 36.0907 3.33785 36.5562L1.91592 38.653C1.26573 39.6122 1.51675 40.9225 2.47516 41.5735L12.205 48.1834C12.5577 48.4229 12.9652 48.5477 13.3827 48.5477C13.5153 48.5477 13.6492 48.535 13.7827 48.5095C14.3347 48.4039 14.8126 48.0893 15.1279 47.6238L16.5498 45.5271C17.2 44.5679 16.9494 43.2575 15.991 42.6066L15.9354 42.5688C16.6126 41.8003 17.5154 41.2494 18.4976 41.0222C20.5674 40.5428 23.0029 40.8514 24.6548 41.125C26.6983 41.4635 28.8447 41.3479 30.862 40.7906L33.6662 40.0157C35.5341 39.4994 37.2532 38.6299 38.776 37.4312C38.7875 37.4221 38.7986 37.4129 38.8097 37.403L43.624 33.1392C44.4446 32.5113 44.6234 31.4238 44.3402 30.5424H50.483C51.708 30.5424 52.7045 29.5459 52.7045 28.321V27.3911C52.7045 26.1662 51.708 25.1697 50.483 25.1697ZM26.6745 2.2588C27.957 2.2588 28.7256 2.57616 28.8662 2.75251C28.8559 3.47499 28.4904 4.14147 27.8959 4.54104C27.7461 4.53309 27.5984 4.52674 27.451 4.52118C27.4014 4.51959 27.3517 4.5172 27.3021 4.51601C27.0896 4.50966 26.8799 4.50648 26.6745 4.50648C26.5287 4.50648 26.3802 4.50847 26.2305 4.51164C26.1582 4.51284 26.0855 4.51482 26.0128 4.5172C25.9262 4.51998 25.8388 4.52276 25.7515 4.52634C25.6518 4.53071 25.5521 4.53508 25.4528 4.54064C24.8582 4.14107 24.4932 3.47459 24.4828 2.75251C24.6234 2.57616 25.392 2.2588 26.6745 2.2588ZM32.1358 30.9098C32.079 30.7811 32.0111 30.6588 31.9345 30.5424H39.2391L36.0807 32.6328L31.5786 33.9352L31.4257 33.9388C32.2923 33.2163 32.6085 31.9826 32.1358 30.9098ZM23.8775 30.5424L22.7785 30.7716L21.9289 30.5424H23.8775ZM15.2892 44.6723L13.8676 46.7691C13.7807 46.8978 13.6488 46.9843 13.4963 47.0137C13.3442 47.0427 13.1893 47.0109 13.061 46.9236L3.3311 40.3136C3.06657 40.1341 2.99746 39.7726 3.17699 39.5081L4.59892 37.411C4.6859 37.2827 4.81737 37.1957 4.96989 37.1667C5.00683 37.1595 5.04376 37.156 5.08031 37.156C5.19549 37.156 5.30789 37.1905 5.4052 37.2569L15.1351 43.8664C15.3996 44.046 15.4687 44.4078 15.2892 44.6723ZM42.6895 31.9365C42.6712 31.9497 42.6537 31.964 42.6366 31.979L37.8172 36.248C36.4584 37.3136 34.9253 38.0874 33.2607 38.5473L30.4565 39.3222C28.6509 39.8215 26.7309 39.9251 24.9043 39.6225C23.1241 39.3278 20.4883 38.9977 18.1541 39.5383C16.8021 39.8513 15.5676 40.6282 14.6696 41.7085L7.47136 36.8188L10.965 32.576C12.2865 31.3285 13.9622 30.5877 15.5668 30.5424H15.5978C16.0955 30.5341 16.6221 30.6806 17.1794 30.8367C17.2914 30.8677 17.403 30.8991 17.515 30.9293L22.5577 32.2896C22.6733 32.3206 22.7944 32.3242 22.9116 32.2996L29.516 30.9225C29.8155 30.8606 30.13 30.9213 30.3791 31.0901C30.5399 31.1994 30.6654 31.3495 30.7421 31.5239C30.9685 32.0374 30.7552 32.6404 30.2492 32.9009L27.996 34.0941C27.6842 34.2593 27.5269 34.6168 27.6154 34.9583C27.7044 35.3003 28.0154 35.5331 28.3689 35.5283L31.7112 35.456C31.7776 35.4544 31.8431 35.4445 31.9062 35.4262L36.6157 34.0639C36.69 34.0424 36.7603 34.0099 36.8246 33.9674L41.5757 30.8224C41.9745 30.5762 42.5052 30.3736 42.7876 30.7903C43.0076 31.1144 43.0128 31.6978 42.6895 31.9365Z" fill="#AA8453"/>
                                        </svg>
                                    </div>
                                    <div className='feature-name'>
                                        <p>Hotel Dine In</p>
                                    </div>
                                </div>  
                                <div className='features-inner-div'>
                                    <div className='feature-svg'>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="52" height="49" viewBox="0 0 52 49" fill="none">
                                            <path d="M49.3251 26.1612H48.4713V8.2317C48.4713 3.96273 45.0562 0.547607 40.7873 0.547607C37.0082 0.547607 34.2903 3.3497 33.9862 7.45539C32.0023 7.83039 30.5418 9.5391 30.5418 11.6468C30.5418 12.1591 30.8833 12.5006 31.3956 12.5006H38.2259C38.7382 12.5006 39.0796 12.1591 39.0796 11.6468C39.0796 9.56241 37.6515 7.86791 35.7011 7.46789C35.9563 4.75485 37.5857 2.25512 40.7873 2.25512C44.117 2.25512 46.7637 4.90183 46.7637 8.2316V26.1611H21.0676C20.6813 24.192 18.9786 22.746 16.8812 22.746C16.0275 21.7215 14.8321 21.0384 13.4661 21.0384C11.8439 21.0384 10.3925 21.9776 9.7094 23.3436C9.02634 23.0022 8.25793 22.746 7.48952 22.746C5.3921 22.746 3.68939 24.192 3.30319 26.1611H3.22054C1.76907 26.1611 0.65918 27.271 0.65918 28.7225C0.65918 30.174 1.76907 31.2839 3.22054 31.2839H4.24659L6.55032 40.4194C7.23338 43.0662 9.62395 44.9445 12.3561 44.9445H13.0392L11.9293 47.1644C11.6731 47.5914 11.8439 48.1036 12.2708 48.2743C12.3561 48.3597 12.5269 48.3597 12.6122 48.3597C12.9537 48.3597 13.2099 48.1889 13.3807 47.9327L14.8748 44.9445H38.5674L40.0188 47.8474C40.1896 48.1889 40.4458 48.3597 40.7873 48.3597C40.958 48.3597 41.0434 48.3597 41.1287 48.1889C41.4702 48.0181 41.641 47.5058 41.4702 47.079L40.4007 44.9399C43.0441 44.8461 45.33 42.9999 45.9953 40.5048L48.3206 31.2839H49.3251C50.7766 31.2839 51.8865 30.174 51.8865 28.7225C51.8865 27.2711 50.7766 26.1612 49.3251 26.1612ZM37.2867 10.7931H32.4201C32.7616 9.76852 33.7861 9.08545 34.8961 9.08545C36.0061 9.08545 36.9452 9.76852 37.2867 10.7931ZM7.48952 24.4536C8.25793 24.4536 8.94099 24.7951 9.53861 25.3928C9.7094 25.649 10.0509 25.7343 10.3924 25.649C10.7338 25.5636 10.9046 25.3075 10.99 24.9659C11.2461 23.6852 12.2707 22.746 13.5513 22.746C14.4905 22.746 15.3443 23.173 15.7712 24.0267C15.942 24.3682 16.3688 24.539 16.7104 24.4536C16.7958 24.4536 16.8812 24.4536 16.9666 24.4536C18.0765 24.4536 19.0157 25.1367 19.3571 26.1612H5.09884C5.44043 25.1367 6.37953 24.4536 7.48952 24.4536ZM44.4585 39.9926C43.9462 41.8709 42.2386 43.237 40.275 43.237H12.4415C10.4777 43.237 8.7702 41.871 8.25793 39.9926L6.03804 31.284H46.5076L44.4585 39.9926ZM49.3251 29.5764H47.6175H4.92815H3.22054C2.70827 29.5764 2.36679 29.2349 2.36679 28.7226C2.36679 28.2103 2.70827 27.8689 3.22054 27.8689H4.0743H20.2962H49.3251C49.8374 27.8689 50.1789 28.2103 50.1789 28.7226C50.1789 29.2349 49.8374 29.5764 49.3251 29.5764Z" fill="#AA8453"/>
                                            <path d="M31.3957 16.3426C31.908 16.3426 32.2495 16.0011 32.2495 15.4888V15.0619C32.2495 14.5496 31.908 14.2081 31.3957 14.2081C30.8835 14.2081 30.542 14.5496 30.542 15.0619V15.4888C30.542 16.0011 30.8835 16.3426 31.3957 16.3426Z" fill="#AA8453"/>
                                            <path d="M31.3957 20.2697C31.908 20.2697 32.2495 19.8428 32.2495 19.4159V18.4767C32.2495 17.9645 31.908 17.623 31.3957 17.623C30.8835 17.623 30.542 17.9645 30.542 18.4767V19.4159C30.542 19.9281 30.8835 20.2697 31.3957 20.2697Z" fill="#AA8453"/>
                                            <path d="M31.3957 23.5996C31.908 23.5996 32.2495 23.2582 32.2495 22.7459V22.319C32.2495 21.8067 31.908 21.4652 31.3957 21.4652C30.8835 21.4652 30.542 21.8067 30.542 22.319V22.7459C30.542 23.2581 30.8835 23.5996 31.3957 23.5996Z" fill="#AA8453"/>
                                            <path d="M34.8108 16.3426C35.3231 16.3426 35.6645 16.0011 35.6645 15.4888V15.0619C35.6645 14.5496 35.3231 14.2081 34.8108 14.2081C34.2985 14.2081 33.957 14.5496 33.957 15.0619V15.4888C33.957 16.0011 34.2985 16.3426 34.8108 16.3426Z" fill="#AA8453"/>
                                            <path d="M33.957 19.4159C33.957 19.9282 34.2985 20.2697 34.8108 20.2697C35.3231 20.2697 35.6645 19.8428 35.6645 19.4159V18.4767C35.6645 17.9645 35.3231 17.623 34.8108 17.623C34.2985 17.623 33.957 17.9645 33.957 18.4767V19.4159Z" fill="#AA8453"/>
                                            <path d="M33.957 22.7459C33.957 23.2582 34.2985 23.5996 34.8108 23.5996C35.3231 23.5996 35.6645 23.2582 35.6645 22.7459V22.319C35.6645 21.8067 35.3231 21.4652 34.8108 21.4652C34.2985 21.4652 33.957 21.8067 33.957 22.319V22.7459Z" fill="#AA8453"/>
                                            <path d="M38.2258 16.3426C38.7381 16.3426 39.0796 16.0011 39.0796 15.4888V15.0619C39.0796 14.5496 38.7381 14.2081 38.2258 14.2081C37.7136 14.2081 37.3721 14.5496 37.3721 15.0619V15.4888C37.372 16.0011 37.7136 16.3426 38.2258 16.3426Z" fill="#AA8453"/>
                                            <path d="M37.3721 19.4159C37.3721 19.9282 37.7136 20.2697 38.2258 20.2697C38.7381 20.2697 39.0797 19.8429 39.0797 19.4159V18.4767C39.0797 17.9645 38.7382 17.623 38.2259 17.623C37.7137 17.623 37.3722 17.9645 37.3722 18.4767L37.3721 19.4159Z" fill="#AA8453"/>
                                            <path d="M37.3721 22.7459C37.3721 23.2582 37.7136 23.5996 38.2258 23.5996C38.7381 23.5996 39.0796 23.2582 39.0796 22.7459V22.319C39.0796 21.8067 38.7381 21.4652 38.2258 21.4652C37.7136 21.4652 37.3721 21.8067 37.3721 22.319V22.7459Z" fill="#AA8453"/>
                                        </svg>
                                    </div>
                                    <div className='feature-name'>
                                        <p>Private Bathroom</p>
                                    </div>
                                </div>
                                <div className='features-inner-div'>
                                    <div className='feature-svg'>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="56" height="49" viewBox="0 0 56 49" fill="none">
                                            <path d="M27.9716 23.2426C22.6119 23.2278 17.3929 25.1923 13.0999 28.8407C12.9944 28.9307 12.9054 29.0435 12.8382 29.1726C12.771 29.3017 12.7268 29.4446 12.7081 29.5931C12.6704 29.8931 12.7391 30.1978 12.899 30.4402C13.0589 30.6826 13.2969 30.8428 13.5607 30.8857C13.6914 30.9069 13.8244 30.8987 13.9522 30.8614C14.08 30.8242 14.2002 30.7587 14.3057 30.6687C18.2569 27.3301 23.0488 25.5272 27.9716 25.5272C32.8945 25.5272 37.6864 27.3301 41.6375 30.6687C41.8107 30.8185 42.0228 30.8989 42.2404 30.8972C42.3961 30.8954 42.5495 30.8534 42.6888 30.7742C42.8281 30.695 42.9496 30.5808 43.0443 30.4402C43.2042 30.1978 43.2729 29.8931 43.2352 29.5931C43.1975 29.2932 43.0565 29.0225 42.8433 28.8407C38.5503 25.1923 33.3313 23.2278 27.9716 23.2426ZM27.9716 11.9779C20.4679 11.9579 13.1638 14.7261 7.17135 19.8609C6.95814 20.0457 6.81825 20.3193 6.78245 20.6214C6.74664 20.9235 6.81786 21.2294 6.98042 21.4718C7.14299 21.7142 7.38359 21.8732 7.6493 21.914C7.91501 21.9547 8.18405 21.8737 8.39726 21.6889C14.0426 16.8688 20.9117 14.2628 27.9716 14.2628C35.0316 14.2628 41.9007 16.8688 47.546 21.6889C47.7192 21.8387 47.9313 21.919 48.1489 21.9174C48.3055 21.9211 48.4605 21.8814 48.6005 21.8018C48.7406 21.7222 48.8615 21.605 48.9528 21.4604C49.1149 21.2208 49.1868 20.9179 49.1529 20.6182C49.119 20.3184 48.982 20.0461 48.7719 19.8609C42.7794 14.7261 35.4754 11.9579 27.9716 11.9779ZM54.7005 10.8582C47.0049 4.25014 37.6153 0.694296 27.9716 0.735958C18.3279 0.694296 8.93837 4.25014 1.24276 10.8582C1.02956 11.04 0.888613 11.3107 0.850924 11.6106C0.813235 11.9106 0.881892 12.2153 1.04179 12.4577C1.20169 12.7001 1.43974 12.8604 1.70356 12.9032C1.96739 12.9461 2.23537 12.868 2.44858 12.6862C9.81356 6.41209 18.7687 3.02089 27.9716 3.02089C37.1746 3.02089 46.1297 6.41209 53.4947 12.6862C53.6679 12.836 53.8799 12.9164 54.0976 12.9147C54.2533 12.913 54.4066 12.8709 54.5459 12.7917C54.6852 12.7125 54.8068 12.5983 54.9015 12.4577C55.0614 12.2153 55.13 11.9106 55.0923 11.6106C55.0546 11.3107 54.9137 11.04 54.7005 10.8582Z" fill="#AA8453"/>
                                            <circle cx="27.9716" cy="41.1123" r="6.43544" stroke="#AA8453" stroke-width="2"/>
                                        </svg>
                                    </div>
                                    <div className='feature-name'>
                                        <p>Free Wi-Fi</p>
                                    </div>
                                </div>  
                                <div className='features-inner-div'>
                                    <div className='feature-svg'>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="49" viewBox="0 0 48 49" fill="none">
                                            <g clip-path="url(#clip0_1547_1975)">
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M18.2711 0.735596C21.8912 0.735596 25.1014 2.74093 25.1014 6.42715C25.3469 8.95223 22.7492 13.9949 22.825 16.6769C22.825 17.4122 22.9114 18.1913 23.0822 19.0152C23.4717 18.9533 23.8954 18.9373 24.2935 18.9586C26.7482 11.4634 30.413 7.56589 35.3469 7.56589C41.4461 7.56589 47.8687 13.5605 47.8687 18.9501C47.8687 22.5701 45.8634 25.7804 42.1772 25.7804C39.4589 25.9874 34.6542 23.4282 31.9274 23.504C31.1921 23.504 30.413 23.5904 29.5891 23.7612C29.651 24.1507 29.6638 24.5744 29.6457 24.9746C37.1387 27.4271 41.0384 31.092 41.0384 36.0258C41.0384 42.125 35.0438 48.5477 29.6542 48.5477C26.0342 48.5477 22.8239 46.5423 22.8239 42.8561C22.6468 39.9938 25.1761 35.3727 25.1003 32.6064C25.1003 31.8711 25.0139 31.092 24.8431 30.2681C24.4536 30.33 24.0278 30.346 23.6297 30.3246C21.1772 37.8198 17.5123 41.7174 12.5785 41.7174C6.47925 41.7174 0.0566406 35.7227 0.0566406 30.3332C0.0566406 26.7131 2.06197 23.5029 5.7482 23.5029C8.61052 23.3257 13.2316 25.8551 15.9979 25.7793C16.7332 25.7793 17.5123 25.6929 18.3362 25.5221C18.2743 25.1326 18.2583 24.7089 18.2797 24.3087C10.7866 21.8561 6.88694 18.1913 6.88694 13.2574C6.88694 7.15821 12.8816 0.735596 18.2711 0.735596ZM29.0587 27.1752C28.5966 28.1112 27.8752 28.9031 26.9958 29.4591C27.2508 30.5562 27.3778 31.6043 27.3778 32.6053C27.6233 35.1325 25.0256 40.1731 25.1014 42.855C25.1014 45.0023 27.1324 46.2702 29.6553 46.2702C33.7513 46.2702 38.762 40.902 38.762 36.0247C38.762 32.314 35.6265 29.3449 29.0587 27.1752ZM5.74926 25.7793C3.60199 25.7793 2.33412 27.8102 2.33412 30.3332C2.33412 34.4292 7.7023 39.4399 12.5796 39.4399C16.2903 39.4399 19.2594 36.3044 21.4291 29.7366C20.4888 29.2724 19.6991 28.553 19.143 27.6715C18.0481 27.9287 17.0011 28.0568 15.999 28.0568C13.4718 28.3022 8.43122 25.7046 5.74926 25.7804M23.9637 21.2265C22.079 21.2265 20.5486 22.7569 20.5486 24.6416C20.5486 26.5264 22.079 28.0568 23.9637 28.0568C25.8485 28.0568 27.3789 26.5264 27.3789 24.6416C27.3789 22.7569 25.8485 21.2265 23.9637 21.2265ZM35.3479 9.8423C31.6371 9.8423 28.6681 12.9778 26.4984 19.5413C27.4365 20.0098 28.2284 20.7302 28.7844 21.6107C29.8773 21.3535 30.9264 21.2254 31.9285 21.2254C34.4557 20.9799 39.4963 23.5776 42.1782 23.5018C44.3234 23.5018 45.5934 21.4709 45.5934 18.9479C45.5934 14.8519 40.2252 9.84123 35.3479 9.84123M18.2711 3.01201C14.1751 3.01201 9.16441 8.38019 9.16441 13.2574C9.16441 16.9682 12.2999 19.9373 18.8656 22.1069C19.3319 21.1667 20.0513 20.377 20.9328 19.8209C20.6756 18.726 20.5475 17.679 20.5475 16.6769C20.3021 14.1497 22.8997 9.10911 22.8239 6.42715C22.8239 4.27988 20.793 3.01201 18.2701 3.01201" fill="#AA8453"/>
                                            </g>
                                            <defs>
                                            <clipPath id="clip0_1547_1975">
                                            <rect width="47.8121" height="47.8121" fill="white" transform="translate(0.0566406 0.735596)"/>
                                            </clipPath>
                                            </defs>
                                        </svg>
                                    </div>
                                    <div className='feature-name'>
                                        <p>Air Condition</p>
                                    </div>
                                </div>
                                <div className='features-inner-div'>
                                    <div className='feature-svg'>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="52" height="49" viewBox="0 0 52 49" fill="none">
                                            <path d="M49.3251 26.1612H48.4713V8.2317C48.4713 3.96273 45.0562 0.547607 40.7873 0.547607C37.0082 0.547607 34.2903 3.3497 33.9862 7.45539C32.0023 7.83039 30.5418 9.5391 30.5418 11.6468C30.5418 12.1591 30.8833 12.5006 31.3956 12.5006H38.2259C38.7382 12.5006 39.0796 12.1591 39.0796 11.6468C39.0796 9.56241 37.6515 7.86791 35.7011 7.46789C35.9563 4.75485 37.5857 2.25512 40.7873 2.25512C44.117 2.25512 46.7637 4.90183 46.7637 8.2316V26.1611H21.0676C20.6813 24.192 18.9786 22.746 16.8812 22.746C16.0275 21.7215 14.8321 21.0384 13.4661 21.0384C11.8439 21.0384 10.3925 21.9776 9.7094 23.3436C9.02634 23.0022 8.25793 22.746 7.48952 22.746C5.3921 22.746 3.68939 24.192 3.30319 26.1611H3.22054C1.76907 26.1611 0.65918 27.271 0.65918 28.7225C0.65918 30.174 1.76907 31.2839 3.22054 31.2839H4.24659L6.55032 40.4194C7.23338 43.0662 9.62395 44.9445 12.3561 44.9445H13.0392L11.9293 47.1644C11.6731 47.5914 11.8439 48.1036 12.2708 48.2743C12.3561 48.3597 12.5269 48.3597 12.6122 48.3597C12.9537 48.3597 13.2099 48.1889 13.3807 47.9327L14.8748 44.9445H38.5674L40.0188 47.8474C40.1896 48.1889 40.4458 48.3597 40.7873 48.3597C40.958 48.3597 41.0434 48.3597 41.1287 48.1889C41.4702 48.0181 41.641 47.5058 41.4702 47.079L40.4007 44.9399C43.0441 44.8461 45.33 42.9999 45.9953 40.5048L48.3206 31.2839H49.3251C50.7766 31.2839 51.8865 30.174 51.8865 28.7225C51.8865 27.2711 50.7766 26.1612 49.3251 26.1612ZM37.2867 10.7931H32.4201C32.7616 9.76852 33.7861 9.08545 34.8961 9.08545C36.0061 9.08545 36.9452 9.76852 37.2867 10.7931ZM7.48952 24.4536C8.25793 24.4536 8.94099 24.7951 9.53861 25.3928C9.7094 25.649 10.0509 25.7343 10.3924 25.649C10.7338 25.5636 10.9046 25.3075 10.99 24.9659C11.2461 23.6852 12.2707 22.746 13.5513 22.746C14.4905 22.746 15.3443 23.173 15.7712 24.0267C15.942 24.3682 16.3688 24.539 16.7104 24.4536C16.7958 24.4536 16.8812 24.4536 16.9666 24.4536C18.0765 24.4536 19.0157 25.1367 19.3571 26.1612H5.09884C5.44043 25.1367 6.37953 24.4536 7.48952 24.4536ZM44.4585 39.9926C43.9462 41.8709 42.2386 43.237 40.275 43.237H12.4415C10.4777 43.237 8.7702 41.871 8.25793 39.9926L6.03804 31.284H46.5076L44.4585 39.9926ZM49.3251 29.5764H47.6175H4.92815H3.22054C2.70827 29.5764 2.36679 29.2349 2.36679 28.7226C2.36679 28.2103 2.70827 27.8689 3.22054 27.8689H4.0743H20.2962H49.3251C49.8374 27.8689 50.1789 28.2103 50.1789 28.7226C50.1789 29.2349 49.8374 29.5764 49.3251 29.5764Z" fill="#AA8453"/>
                                            <path d="M31.3957 16.3426C31.908 16.3426 32.2495 16.0011 32.2495 15.4888V15.0619C32.2495 14.5496 31.908 14.2081 31.3957 14.2081C30.8835 14.2081 30.542 14.5496 30.542 15.0619V15.4888C30.542 16.0011 30.8835 16.3426 31.3957 16.3426Z" fill="#AA8453"/>
                                            <path d="M31.3957 20.2697C31.908 20.2697 32.2495 19.8428 32.2495 19.4159V18.4767C32.2495 17.9645 31.908 17.623 31.3957 17.623C30.8835 17.623 30.542 17.9645 30.542 18.4767V19.4159C30.542 19.9281 30.8835 20.2697 31.3957 20.2697Z" fill="#AA8453"/>
                                            <path d="M31.3957 23.5996C31.908 23.5996 32.2495 23.2582 32.2495 22.7459V22.319C32.2495 21.8067 31.908 21.4652 31.3957 21.4652C30.8835 21.4652 30.542 21.8067 30.542 22.319V22.7459C30.542 23.2581 30.8835 23.5996 31.3957 23.5996Z" fill="#AA8453"/>
                                            <path d="M34.8108 16.3426C35.3231 16.3426 35.6645 16.0011 35.6645 15.4888V15.0619C35.6645 14.5496 35.3231 14.2081 34.8108 14.2081C34.2985 14.2081 33.957 14.5496 33.957 15.0619V15.4888C33.957 16.0011 34.2985 16.3426 34.8108 16.3426Z" fill="#AA8453"/>
                                            <path d="M33.957 19.4159C33.957 19.9282 34.2985 20.2697 34.8108 20.2697C35.3231 20.2697 35.6645 19.8428 35.6645 19.4159V18.4767C35.6645 17.9645 35.3231 17.623 34.8108 17.623C34.2985 17.623 33.957 17.9645 33.957 18.4767V19.4159Z" fill="#AA8453"/>
                                            <path d="M33.957 22.7459C33.957 23.2582 34.2985 23.5996 34.8108 23.5996C35.3231 23.5996 35.6645 23.2582 35.6645 22.7459V22.319C35.6645 21.8067 35.3231 21.4652 34.8108 21.4652C34.2985 21.4652 33.957 21.8067 33.957 22.319V22.7459Z" fill="#AA8453"/>
                                            <path d="M38.2258 16.3426C38.7381 16.3426 39.0796 16.0011 39.0796 15.4888V15.0619C39.0796 14.5496 38.7381 14.2081 38.2258 14.2081C37.7136 14.2081 37.3721 14.5496 37.3721 15.0619V15.4888C37.372 16.0011 37.7136 16.3426 38.2258 16.3426Z" fill="#AA8453"/>
                                            <path d="M37.3721 19.4159C37.3721 19.9282 37.7136 20.2697 38.2258 20.2697C38.7381 20.2697 39.0797 19.8429 39.0797 19.4159V18.4767C39.0797 17.9645 38.7382 17.623 38.2259 17.623C37.7137 17.623 37.3722 17.9645 37.3722 18.4767L37.3721 19.4159Z" fill="#AA8453"/>
                                            <path d="M37.3721 22.7459C37.3721 23.2582 37.7136 23.5996 38.2258 23.5996C38.7381 23.5996 39.0796 23.2582 39.0796 22.7459V22.319C39.0796 21.8067 38.7381 21.4652 38.2258 21.4652C37.7136 21.4652 37.3721 21.8067 37.3721 22.319V22.7459Z" fill="#AA8453"/>
                                        </svg>
                                    </div>
                                    <div className='feature-name'>
                                        <p>Private Bathroom</p>
                                    </div>
                                </div>
                                <div className='features-inner-div'>
                                    <div className='feature-svg'>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="56" height="49" viewBox="0 0 56 49" fill="none">
                                            <path d="M27.9716 23.2426C22.6119 23.2278 17.3929 25.1923 13.0999 28.8407C12.9944 28.9307 12.9054 29.0435 12.8382 29.1726C12.771 29.3017 12.7268 29.4446 12.7081 29.5931C12.6704 29.8931 12.7391 30.1978 12.899 30.4402C13.0589 30.6826 13.2969 30.8428 13.5607 30.8857C13.6914 30.9069 13.8244 30.8987 13.9522 30.8614C14.08 30.8242 14.2002 30.7587 14.3057 30.6687C18.2569 27.3301 23.0488 25.5272 27.9716 25.5272C32.8945 25.5272 37.6864 27.3301 41.6375 30.6687C41.8107 30.8185 42.0228 30.8989 42.2404 30.8972C42.3961 30.8954 42.5495 30.8534 42.6888 30.7742C42.8281 30.695 42.9496 30.5808 43.0443 30.4402C43.2042 30.1978 43.2729 29.8931 43.2352 29.5931C43.1975 29.2932 43.0565 29.0225 42.8433 28.8407C38.5503 25.1923 33.3313 23.2278 27.9716 23.2426ZM27.9716 11.9779C20.4679 11.9579 13.1638 14.7261 7.17135 19.8609C6.95814 20.0457 6.81825 20.3193 6.78245 20.6214C6.74664 20.9235 6.81786 21.2294 6.98042 21.4718C7.14299 21.7142 7.38359 21.8732 7.6493 21.914C7.91501 21.9547 8.18405 21.8737 8.39726 21.6889C14.0426 16.8688 20.9117 14.2628 27.9716 14.2628C35.0316 14.2628 41.9007 16.8688 47.546 21.6889C47.7192 21.8387 47.9313 21.919 48.1489 21.9174C48.3055 21.9211 48.4605 21.8814 48.6005 21.8018C48.7406 21.7222 48.8615 21.605 48.9528 21.4604C49.1149 21.2208 49.1868 20.9179 49.1529 20.6182C49.119 20.3184 48.982 20.0461 48.7719 19.8609C42.7794 14.7261 35.4754 11.9579 27.9716 11.9779ZM54.7005 10.8582C47.0049 4.25014 37.6153 0.694296 27.9716 0.735958C18.3279 0.694296 8.93837 4.25014 1.24276 10.8582C1.02956 11.04 0.888613 11.3107 0.850924 11.6106C0.813235 11.9106 0.881892 12.2153 1.04179 12.4577C1.20169 12.7001 1.43974 12.8604 1.70356 12.9032C1.96739 12.9461 2.23537 12.868 2.44858 12.6862C9.81356 6.41209 18.7687 3.02089 27.9716 3.02089C37.1746 3.02089 46.1297 6.41209 53.4947 12.6862C53.6679 12.836 53.8799 12.9164 54.0976 12.9147C54.2533 12.913 54.4066 12.8709 54.5459 12.7917C54.6852 12.7125 54.8068 12.5983 54.9015 12.4577C55.0614 12.2153 55.13 11.9106 55.0923 11.6106C55.0546 11.3107 54.9137 11.04 54.7005 10.8582Z" fill="#AA8453"/>
                                            <circle cx="27.9716" cy="41.1123" r="6.43544" stroke="#AA8453" stroke-width="2"/>
                                        </svg>
                                    </div>
                                    <div className='feature-name'>
                                        <p>Free Wi-Fi</p>
                                    </div>
                                </div>  
                                <div className='features-inner-div'>
                                    <div className='feature-svg'>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="49" viewBox="0 0 48 49" fill="none">
                                            <g clip-path="url(#clip0_1547_1975)">
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M18.2711 0.735596C21.8912 0.735596 25.1014 2.74093 25.1014 6.42715C25.3469 8.95223 22.7492 13.9949 22.825 16.6769C22.825 17.4122 22.9114 18.1913 23.0822 19.0152C23.4717 18.9533 23.8954 18.9373 24.2935 18.9586C26.7482 11.4634 30.413 7.56589 35.3469 7.56589C41.4461 7.56589 47.8687 13.5605 47.8687 18.9501C47.8687 22.5701 45.8634 25.7804 42.1772 25.7804C39.4589 25.9874 34.6542 23.4282 31.9274 23.504C31.1921 23.504 30.413 23.5904 29.5891 23.7612C29.651 24.1507 29.6638 24.5744 29.6457 24.9746C37.1387 27.4271 41.0384 31.092 41.0384 36.0258C41.0384 42.125 35.0438 48.5477 29.6542 48.5477C26.0342 48.5477 22.8239 46.5423 22.8239 42.8561C22.6468 39.9938 25.1761 35.3727 25.1003 32.6064C25.1003 31.8711 25.0139 31.092 24.8431 30.2681C24.4536 30.33 24.0278 30.346 23.6297 30.3246C21.1772 37.8198 17.5123 41.7174 12.5785 41.7174C6.47925 41.7174 0.0566406 35.7227 0.0566406 30.3332C0.0566406 26.7131 2.06197 23.5029 5.7482 23.5029C8.61052 23.3257 13.2316 25.8551 15.9979 25.7793C16.7332 25.7793 17.5123 25.6929 18.3362 25.5221C18.2743 25.1326 18.2583 24.7089 18.2797 24.3087C10.7866 21.8561 6.88694 18.1913 6.88694 13.2574C6.88694 7.15821 12.8816 0.735596 18.2711 0.735596ZM29.0587 27.1752C28.5966 28.1112 27.8752 28.9031 26.9958 29.4591C27.2508 30.5562 27.3778 31.6043 27.3778 32.6053C27.6233 35.1325 25.0256 40.1731 25.1014 42.855C25.1014 45.0023 27.1324 46.2702 29.6553 46.2702C33.7513 46.2702 38.762 40.902 38.762 36.0247C38.762 32.314 35.6265 29.3449 29.0587 27.1752ZM5.74926 25.7793C3.60199 25.7793 2.33412 27.8102 2.33412 30.3332C2.33412 34.4292 7.7023 39.4399 12.5796 39.4399C16.2903 39.4399 19.2594 36.3044 21.4291 29.7366C20.4888 29.2724 19.6991 28.553 19.143 27.6715C18.0481 27.9287 17.0011 28.0568 15.999 28.0568C13.4718 28.3022 8.43122 25.7046 5.74926 25.7804M23.9637 21.2265C22.079 21.2265 20.5486 22.7569 20.5486 24.6416C20.5486 26.5264 22.079 28.0568 23.9637 28.0568C25.8485 28.0568 27.3789 26.5264 27.3789 24.6416C27.3789 22.7569 25.8485 21.2265 23.9637 21.2265ZM35.3479 9.8423C31.6371 9.8423 28.6681 12.9778 26.4984 19.5413C27.4365 20.0098 28.2284 20.7302 28.7844 21.6107C29.8773 21.3535 30.9264 21.2254 31.9285 21.2254C34.4557 20.9799 39.4963 23.5776 42.1782 23.5018C44.3234 23.5018 45.5934 21.4709 45.5934 18.9479C45.5934 14.8519 40.2252 9.84123 35.3479 9.84123M18.2711 3.01201C14.1751 3.01201 9.16441 8.38019 9.16441 13.2574C9.16441 16.9682 12.2999 19.9373 18.8656 22.1069C19.3319 21.1667 20.0513 20.377 20.9328 19.8209C20.6756 18.726 20.5475 17.679 20.5475 16.6769C20.3021 14.1497 22.8997 9.10911 22.8239 6.42715C22.8239 4.27988 20.793 3.01201 18.2701 3.01201" fill="#AA8453"/>
                                            </g>
                                            <defs>
                                            <clipPath id="clip0_1547_1975">
                                            <rect width="47.8121" height="47.8121" fill="white" transform="translate(0.0566406 0.735596)"/>
                                            </clipPath>
                                            </defs>
                                        </svg>
                                    </div>
                                    <div className='feature-name'>
                                        <p>Air Condition</p>
                                    </div>
                                </div>          */}
                            </div>
                        </div>
                        <div className='room-desc'>
                            <h1>{roomData?.id==4?'About THE APARTMENT':'About THE ROOM'}</h1>
                            <span dangerouslySetInnerHTML={{__html:roomData?.Description}} />
                            {/* <p>{home?roomData.Description:roomData.room_category.Description}</p> */}
                            <h1>Tourist Attractions Near Serai</h1>
                            <TouristSpots/>
                        </div>
                    </div>
                </Container>   
            }     
            </section>
            {openModalCart &&
                <CartModal openModalCart={true} />
            }
        </div>
    )
}

// //what is needed at start
const mapStateToProps = ({cmsReducer}) => {
    const { loading, error, successRoomCatData, categoryData,successParam,paramData,successSetParam, loadingCategory,getParamLoading} = cmsReducer;
    return { loading, error, successRoomCatData, categoryData,successParam,paramData,successSetParam,loadingCategory,getParamLoading};
};
//which actions our function can dispatch
const mapDispatchToProps = (dispatch) => {
    return {
        getParamsData: (data) => dispatch(actions.getParam(data)),
        getRoomCatStart: (data) => dispatch(actions.roomCategoryData(data)),
        setParamDataStart: (data) => dispatch(actions.setParam(data)),
        errorHandlerSuccess: () => dispatch(actions.cmsHandlerSuccess())



    };
};

export default connect(mapStateToProps, mapDispatchToProps)(RoomDetails);