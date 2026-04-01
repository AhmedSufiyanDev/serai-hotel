import React, { useEffect, useState, useRef } from "react";
import { useStyles } from "./styles";
import { useLocation } from "react-router";
import OurServices from "./ourServices";
import FaclitiesServices from "./seraiBotGal";
import TouristAttraction from "./toursitAttractions";
import { generalStyles } from "../general/general";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import { InputError } from "../../../components/index";
import { Alert } from "../../../components";
import { validateInputs } from "../../../services/utils";
import { Loader } from "../../../components/index";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { ImageList, ImageListItem } from "@mui/material";
// import OwlCarousel from "react-owl-carousel";
import * as actions from "../../../store/actions";
import { connect } from "react-redux";
import ResetModal from "../auth/resetModal";
import Link from "@material-ui/core/Link";
import {
  HomeBannerVideo,
  HomeBannerMobile,
} from "../../../assets/videos/videos";
import ReactPlayer from "react-player";
import Scrollbars from "react-custom-scrollbars";
import YouTube from "react-youtube";
import { useCart } from "../layout/cartContext";
import CartModal from "../layout/cart";
import ReactPixel from "react-facebook-pixel";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { currency } from "../../../environment";
import {
  seraiBanner,
  DuplexSuite2,
  rockvilleHouse,
  dots,
  blogImage,
  seraiBannerMobile,
  videoImage,
  seraiLogo1,
  gallery2_1,
  gallery2_2,
  gallery2_3,
  gallery2_4,
  monialThumb1,
  commentsDot,
  room1,
  room2,
  room3,
  luxuaryImgae1,
  luxuaryImgae2,
  luxuaryImgae3,
  monialThumb2,
  monialThumb3,
  rating,
  gallerybb1,
  gallerybb2,
  gallerybb3,
  gallerybb4,
  aboutImage1,
  aboutImage2,
  leftArrow1,
  rightArrow1,
  contactLeft,
  pak,
  uae,
  usa,
  england,
  newzeland,
} from "../../../assets/images/images";
import "../../../..//node_modules/react-modal-video/scss/modal-video.scss";
import "../scss/general.scss";
import "../scss/home.scss";
import "../scss/loader.scss";
import Helmet from "react-helmet";

import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { Typography, useMediaQuery } from "@material-ui/core";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/scss/image-gallery.scss";
import "react-image-gallery/styles/css/image-gallery.css";
import { DateRangePicker } from "react-dates";
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import moment from "moment";
import UseAnalyticsEventTracker from "../../../components/googleAnalytics";
import BannerImage from "./bannerImage";

const dataSource = ["Islamabad"];
const filterData = (input) => {
  const filtered = dataSource.filter((item) => {
    return item.toLowerCase().includes(input.toLowerCase());
  });
  return filtered;
};

function Home(props) {
  //const gaEventTracker = UseAnalyticsEventTracker('Home');
  //gaEventTracker("Home");
  //UseAnalyticsEventTracker('Home','Landing');
  const classes = useStyles();
  const generalClasses = generalStyles();
  const [videoPlay, setVideoPlay] = useState(false);
  const [redirect, setRedirect] = useState();
  const [roomCatID, setRoomCatID] = useState();
  const dateRangePickerRef = useRef(null);
  const matches = useMediaQuery("(max-width: 767px)");
  const smallScreen = useMediaQuery("(max-width: 959px)");
  const smallAccomodation = useMediaQuery("(max-width: 1199px)");
  const mediumScreen = useMediaQuery(
    "(min-width: 960px) and (max-width: 1279px)"
  );

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  var settingsLuxuary = {
    dots: false,
    infinite: true,
    autoplay: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  var settingsReview = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 500,
    centerMode: true,
    responsive: [
      {
        breakpoint: 0,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerPadding: "40px",
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerPadding: "40px",
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerPadding: "100px",
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          centerPadding: "30px",
        },
      },
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          centerPadding: "30px",
        },
      },
      {
        breakpoint: 1000,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          centerPadding: "30px",
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          centerPadding: "30px",
        },
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          centerPadding: "150px",
        },
      },
      {
        breakpoint: 1366,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          centerPadding: "100px",
        },
      },
      {
        breakpoint: 1600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          centerPadding: "100px",
        },
      },
      {
        breakpoint: 1900,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          centerPadding: "200px",
        },
      },
      {
        breakpoint: 2500,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          centerPadding: "200px",
        },
      },
    ],
  };

  let rvHouseGalCol = 3;

  let token = props.location.pathname.split("/")[2];
  console.log("token is", token);

  if (mediumScreen) rvHouseGalCol = 2;
  else if (smallScreen) rvHouseGalCol = 1;
  else rvHouseGalCol = 3;

  const [openFilteredItems, setOpenFilteredItems] = React.useState(false);
  const [openAdultsChildren, setOpenAdultsChildren] = React.useState(false);
  const [openModalCart, setOpenModalCart] = useState(false);
  const [locationQuery, setLocationQuery] = useState("Islamabad");
  const [locationQueryError, setLocationQueryError] = useState(null);

  const [filteredData, setFilteredData] = useState([]);
  const { addToCart } = useCart();

  const { query } = useLocation();

  useEffect(() => {
    props.roomCatListStart();
    props.getBlogStart({ latest: 1 });
    // const sessionId = localStorage.getItem('sessionId');
    // if (!sessionId) {
    //   props.getSessionIDStart();
    // }
  }, []);

  //  useEffect(() => {
  //     if(props?.success){
  //       console.log("data is",props.roomList)
  //     }
  // }, [props?.success]);
  useEffect(() => {
    function handleClickOutside(event) {
      const clickedInside = event.target.closest(".cart-div");
      if (!clickedInside) {
        setOpenModalCart(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (query) {
      let element, target;
      if (query == 0) {
        target = "root";
      } else if (query == 1) {
        target = "AboutUs";
      } else if (query == 2) {
        target = "Services";
      } else if (query == 3) {
        target = "Gallery";
      } else if (query == 4) {
        target = "Reviews";
      } else if (query == 5) {
        target = "ContactUs";
      } else if (query == 6) {
        target = "BookNow";
      }
      //gaEventTracker((target=="root")?"Home":target);

      let gaVal = target == "root" ? "HomePageLanding" : target;
      console.log("query is", gaVal);
      UseAnalyticsEventTracker(gaVal);
      ReactPixel.trackCustom(gaVal);
      element = window.document.getElementById(target);
      element &&
        element.scrollIntoView({
          behavior: "smooth",
          nearest: "block",
          block: "start",
        });
      window.history.pushState(target, target, "/");
    }
  }, [query]);

  useEffect(() => {
    setTimeout(() => {
      setVideoPlay(true);
    }, 2000);
  }, []);

  useEffect(() => {
    props.getParamsData({ sessionID: localStorage.getItem("sessionId") });
  }, []);

  useEffect(() => {
    if (props?.successParam && props.paramData.length != 0) {
      setCheckInDate(new moment(props.paramData[0].FromDate));
      setCheckOutDate(new moment(props.paramData[0].ToDate));
      setNumOfAdults(props.paramData[0].NumofAdult);
      setNumOfChildren(props.paramData[0].NumOfChildren);
    }
    setTimeout(() => {
      props.errorHandlerSuccess();
    }, 500);
  }, [props?.successParam]);

  useEffect(() => {
    setFilteredData(filterData(locationQuery));
  }, [locationQuery]);

  let searchInputRef = useRef();

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        searchInputRef.current &&
        !searchInputRef.current.contains(event.target)
      ) {
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
      const clickedPersonIcon = event.target.closest(".guest-svg");
      const clickedAdultChildField = event.target.closest("#adult-child-field");
      const clickedButton = event.target.closest(".drop-icon");
      const clickedInside = event.target.closest(".adults-children-div");
      if (
        !clickedPersonIcon &&
        !clickedAdultChildField &&
        !clickedButton &&
        !clickedInside
      ) {
        setOpenAdultsChildren(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const [openRvHouseGal, setOpenRvHouseGal] = React.useState(false);
  const [currentImageRvHouseGal, setCurrentImageRvHouseGal] = useState(0);

  const rvHouseGal = [gallerybb1, gallerybb2, gallerybb3, gallerybb4];

  const rvHouseGalSlide = rvHouseGal.map(function (item) {
    return { original: item, thumbnail: item };
  });

  const handleOpenRvHouseGal = (index) => {
    setCurrentImageRvHouseGal(index);
    setOpenRvHouseGal(true);
  };

  const handleCloseRvHouseGal = () => {
    setOpenRvHouseGal(false);
  };

  const openFilteredItemsDiv = () => {
    setOpenFilteredItems(true);
  };

  const [openSerBisGal, setOpenSerBisGal] = React.useState(false);
  const [currentImageSerBisGal, setCurrentImageSerBisGal] = useState(0);

  const serBisGal = [gallery2_1, gallery2_2, gallery2_3, gallery2_4];

  const serBisGalSlide = serBisGal.map(function (item) {
    return { original: item, thumbnail: item };
  });

  const handleOpenSerBisGal = (index) => {
    setCurrentImageSerBisGal(index);
    setOpenSerBisGal(true);
  };

  const handleCloseSerBisGal = () => {
    setOpenSerBisGal(false);
  };

  const setDataQuery = (event) => {
    setOpenFilteredItems(true);
    setLocationQuery(event.target.value);
  };

  const isSmallScreen = window.innerWidth < 768;

  const [checkInDate, setCheckInDate] = useState(moment());
  const [checkInDateError, setCheckInDateError] = useState(null);

  const [checkOutDate, setCheckOutDate] = useState(moment().add(1, "day"));
  const [checkOutDateError, setCheckOutDateError] = useState(null);

  const [loadingStates, setLoadingStates] = useState(
    new Array(props?.roomList).fill(false)
  );

  const [focusedInput, setFocusedInput] = useState(false);

  const handleDatesChange = ({ startDate, endDate }) => {
    setCheckInDate(startDate);
    setCheckOutDate(endDate);

    let data = {};
    data.address = locationQuery;
    data.fromDate = startDate.format("YYYY-MM-D");
    data.toDate = endDate.format("YYYY-MM-D");
    data.numOfAdults = numOfAdults;
    data.numOfChildren = numOfChildren;
    data.sessionID = localStorage.getItem("sessionId");
    let fd = new FormData();
    for (let item in data) fd.append(item, data[item]);
    props.setParamDataStart(fd);
  };

  const scrollToDatePicker = () => {
    const { top } = dateRangePickerRef.current.getBoundingClientRect();

    // Scroll down to the DateRangePicker div
    window.scrollTo({
      top,
      behavior: "smooth",
    });
  };

  const [isOpen, setIsOpen] = useState(false);
  const [videoLink, setVideoLink] = useState("");

  const [numOfAdults, setNumOfAdults] = useState(2);
  const [numOfChildren, setNumOfChildren] = useState(0);

  const searchRooms = () => {
    UseAnalyticsEventTracker("Search");
    ReactPixel.trackCustom("Search");
    //gaEventTracker("Search");
    if (!locationQuery || !checkInDate || !checkOutDate) {
      !locationQuery && setLocationQueryError("Location is required");
      !checkInDate && setCheckInDateError("Check-in date is required");
      !checkOutDate && setCheckOutDateError("Check-out date is required");
    } else {
      setLocationQueryError(null);
      setCheckInDateError(null);
      setCheckOutDateError(null);
      props.history.push({
        pathname: `/home/booking/booking-list`,
        fromDate: checkInDate,
        toDate: checkOutDate,
        numOfAdults: numOfAdults,
        numOfChildren: numOfChildren,
      });

      // const queryParams = {
      //   address: locationQuery,
      //   fromDate: checkInDate,
      //   toDate: checkOutDate,
      //   numOfAdults: numOfAdults,
      //   numOfChildren: numOfChildren
      // };
      // const searchString = new URLSearchParams(queryParams).toString();
      // props.history.push({ pathname: `/home/booking/booking-list`,search: `?${searchString}`});
      // let data ={}
      // data.address = locationQuery
      // data.fromDate = checkInDate.format("YYYY-MM-D")
      // data.toDate = checkOutDate.format("YYYY-MM-D")
      // data.numOfAdults = numOfAdults
      // data.numOfChildren = numOfChildren
      // data.sessionID=localStorage.getItem('sessionId')
      // let fd = new FormData();
      // for (let item in data)
      //     fd.append(item, data[item]);
      // props.setParamDataStart(fd);
      // setRedirect(1)

      // props.history.push({ pathname: `/home/booking/booking-list`,fromDate:checkInDate,toDate:checkOutDate,numOfAdults:numOfAdults,numOfChildren:numOfChildren});
    }
  };

  useEffect(() => {
    if (props?.successSetParam) {
      // if(redirect==1){
      //   props.history.push({ pathname: `/home/booking/booking-list`,fromDate:checkInDate,toDate:checkOutDate,numOfAdults:numOfAdults,numOfChildren:numOfChildren});
      // }
      if (redirect == 2) {
        props.history.push({
          pathname: `/home/room/room-details`,
          RoomCatID: roomCatID,
        });
      }
      setTimeout(() => {
        props.errorHandlerSuccess();
      }, 2000);
    }
  }, [props?.successSetParam]);

  const [values, setValues] = useState({
    name: "",
    phone: "",
    Email: "",
    message: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    phone: "",
    Email: "",
    message: "",
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
    setErrors({
      ...errors,
      [prop]: "",
    });
  };
  const numberAdults = () => {
    if (numOfAdults > 0) {
      setNumOfAdults(numOfAdults - 1); // Update the count state
    }
  };
  const numberChild = () => {
    if (numOfChildren > 0) {
      setNumOfChildren(numOfChildren - 1); // Update the count state
    }
  };
  const cartItem = (room) => {
    UseAnalyticsEventTracker("BookNow" + " " + room.Name);
    ReactPixel.trackCustom("BookNow" + " " + room.Name);
    const cartItem = {
      ...room,
      count: 1,
      room_category: { Name: room.Name, Price: room.Price, id: room.id },
    };
    setOpenModalCart(true);
    addToCart(cartItem, checkInDate, checkOutDate, numOfAdults, numOfChildren);
    // props.history.push({pathname:`/booking-detail`});
  };

  const submitContactUs = (e) => {
    e.preventDefault();
    let { name, Email, phone, message } = values;
    let data = { name, Email, phone, message };
    let recordedErrors = validateInputs(data);

    if (Object.keys(recordedErrors).length > 0) {
      setErrors(recordedErrors);
    } else {
      UseAnalyticsEventTracker("ContactUs");
      ReactPixel.trackCustom("ContactUs");
      //gaEventTracker("ContactUs-Submited");
      props.submitContactUsStart({ name, phone, email: Email, message });
    }
  };

  useEffect(() => {
    if (props?.successContactUs) {
      setValues({
        name: "",
        phone: "",
        Email: "",
        message: "",
      });
      setTimeout(() => {
        props.cmsHandlerSuccess();
      }, 3000);
    }
  }, [props?.successContactUs]);

  useEffect(() => {
    if (props?.error) {
      setTimeout(() => {
        props.cmsHandlerSuccess();
      }, 3000);
    }
  }, [props?.error]);

  const handleClosePicker = () => {
    setFocusedInput(null);
  };

  const openModal = (link) => {
    const videoId = getVideoIdFromLink(link);
    setVideoLink(videoId);
    setIsOpen(true);
  };

  const getVideoIdFromLink = (link) => {
    const url = new URL(link);
    const searchParams = new URLSearchParams(url.search);
    return searchParams.get("v");
  };

  const seraiVideo = () => {
    UseAnalyticsEventTracker("YoutubeVideo");
    ReactPixel.trackCustom("YoutubeVideo");
    openModal("https://www.youtube.com/watch?v=VoeH5R9vuaY");
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  // const bookingList = () => {
  //   props.history.push({ pathname: `/home/booking/booking-list`,fromDate:checkInDate,toDate:checkOutDate,numOfAdults:numOfAdults,numOfChildren:numOfChildren});
  // };

  const renderCalendarInfo = () => {
    return (
      <div className="custom-calendar-info">
        <button className="custom-close-button" onClick={handleClosePicker}>
          X
        </button>
      </div>
    );
  };

  const handleRoomDetials = (room, index) => {
    //   const queryParams = {
    //     // roomData: encodedJson,
    //     RoomCatID:room.id,
    //     fromDate: checkInDate,
    //     toDate: checkOutDate,
    //     numOfAdults: numOfAdults,
    //     numOfChildren: numOfChildren,
    // };
    //   const breadCrumbs = [
    //     {text: 'Home', url: '/'},
    //     {text: 'Room Details', url: ''},
    //   ];
    //   const jsonBreadCrumbs = JSON.stringify(breadCrumbs);

    //   const searchString = new URLSearchParams(queryParams).toString();
    const updatedLoadingStates = [...loadingStates];
    updatedLoadingStates[index] = true;
    setLoadingStates(updatedLoadingStates);

    let data = {};
    data.address = locationQuery;
    data.fromDate = checkInDate.format("YYYY-MM-D");
    data.toDate = checkOutDate.format("YYYY-MM-D");
    data.numOfAdults = numOfAdults;
    data.numOfChildren = numOfChildren;
    data.sessionID = localStorage.getItem("sessionId");
    data.RoomCatID = room.id;
    data.BreadCrumb = 1;

    let fd = new FormData();
    for (let item in data) fd.append(item, data[item]);
    props.setParamDataStart(fd);
    setRoomCatID(room.id);
    setRedirect(2);
    // props.history.push({ pathname: `/home/room/room-details`,search: `?${searchString}&breadcrumbs=${jsonBreadCrumbs}`});
  };

  const openBlog = () => {
    UseAnalyticsEventTracker("BlogReadNow");
    ReactPixel.trackCustom("BlogReadNow");

    const queryParams = {
      BlogID: props?.blog?.id,
    };

    const searchString = new URLSearchParams(queryParams).toString();
    props.history.push({ pathname: `/blog`, search: `?${searchString}` });
  };

  const blogIntroText = () => {
    // get first <p> tag data as intro text
    const htmlContent = props?.blog?.Description;
    if (!htmlContent) return "";

    const parser = new DOMParser();
    const parsedHTML = parser.parseFromString(htmlContent, "text/html");

    // Get the first p tag from the parsed HTML
    const firstPTag = parsedHTML.querySelector("p");

    return firstPTag ? firstPTag.outerHTML : ""; // Return the outerHTML of the first p tag
  };

  //code for BannerImage

  const [openBannerModal, setOpenBannerModal] = useState(false);
  // Reset the sessionStorage flag for subsequent visits
  //sessionStorage.removeItem("isPageRefreshed");
  useEffect(() => {
    //Check if the page is refreshed by looking at sessionStorage
    const isPageRefreshed = sessionStorage.getItem("isPageRefreshed");
    if (!isPageRefreshed) {
      sessionStorage.setItem("isPageRefreshed", "true");
      // Set openBannerModal to true after 2 seconds
      const timerId = setTimeout(() => {
        setOpenBannerModal(true);
      }, 1000);
      // Clear the timer to avoid memory leaks
      return () => clearTimeout(timerId);
    } else if (isPageRefreshed) {
      sessionStorage.removeItem("isPageRefreshed");
      setOpenBannerModal(false);
    }
    /*else {
      setOpenBannerModal(false);
    }*/
  }, []);

  const handleCloseModal = () => {
    // Close the modal
    setOpenBannerModal(false);
  };

  useEffect(() => {
    props.getBannerImage();
  }, []);

  return (
    <div className={generalClasses.root}>
      {props?.successContactUs && (
        <Alert type={"success"} message={props.successContactUs} />
      )}
      {props.error && <Alert type={"error"} message={props.error} />}
      <Helmet>
        <title>
          {"Serai Boutique Hotel Islamabad - Best Hotels in Islamabad"}
        </title>
        <meta
          name="description"
          content="Looking for the top hotels in Islamabad? Serai Boutique Hotel offers competitive room rates, exceptional service and a convenient online hotel booking system"
        />
        <meta
          name="keywords"
          content="Serai Boutique Hotel Islamabad, Luxury hotel Islamabad, Hotel in Islamabad, Private Dining, guest house in Islamabad, Rockville house, room in Islamabad, Best guest house in Islamabad, Islamabad room services, hotels in F-6 islamabad, book hotels in Islamabad, best hotel Islamabad, Islamabad hotel booking"
        />
      </Helmet>

      {/* <div className="header-heigt-fix"></div> */}
      <div className={`${classes.posRelative}`} id="BookNow">
        <Box sx={{ display: { xs: "none", md: "block" } }}>
          <div className={`${classes.banner_main} banner-main`}>
            <div className={classes.banner_overlay}></div>
            <div className="banner-content-text">
              <h1>Experience Luxury in Islamabad</h1>
            </div>
            <div
              style={{ display: videoPlay ? "block" : "none" }}
              className="ach-banner-vid"
            >
              <ReactPlayer
                width="100%"
                height="100%"
                url="https://rvt-videos.s3.ap-southeast-1.amazonaws.com/serai/web-serai-otel.mp4"
                muted
                playing
                loop
              />
            </div>
            <Box sx={{ display: { md: "none", lg: "block" } }}>
              <div className={classes.leftSocial}>
                <ul>
                  <li>
                    <Link
                      href="https://www.facebook.com/experienceserai"
                      target="_blank"
                    >
                      <span>
                        <svg
                          width="26"
                          height="26"
                          viewBox="0 0 26 26"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M11.2613 0.211729C8.40807 0.505172 5.71823 1.78698 3.66913 3.82961C2.06091 5.43279 0.903208 7.47631 0.365467 9.66127C0.124794 10.6393 0.0412544 11.2511 0.00710357 12.2861C-0.139054 16.7176 1.97707 20.7701 5.72093 23.2284C7.19814 24.1984 8.90876 24.8441 10.7468 25.1257C11.5776 25.253 13.4927 25.253 14.3236 25.1257C17.0616 24.7063 19.4708 23.4938 21.4003 21.5642C23.0437 19.9209 24.1588 17.9517 24.7082 15.7228C24.8852 15.0046 25.0294 14.135 25.0294 13.7859C25.0294 13.6764 25.0514 13.5732 25.0784 13.5565C25.1081 13.5382 25.1274 13.1794 25.1274 12.6443C25.1274 12.0688 25.1104 11.7729 25.0784 11.7926C25.0487 11.811 25.0294 11.7422 25.0294 11.6181C25.0294 11.2635 24.8863 10.398 24.7082 9.67539C24.0113 6.84802 22.3715 4.39033 20.0072 2.62987C18.1511 1.24782 16.0495 0.437899 13.7182 0.206291C13.1261 0.147445 11.8587 0.150287 11.2613 0.211729ZM11.5797 0.773087C9.66435 0.965694 7.91996 1.5248 6.42604 2.42492C3.24016 4.34442 1.23085 7.39242 0.670571 11.1557C0.571695 11.82 0.586198 13.7062 0.695657 14.404C1.1063 17.023 2.26238 19.3209 4.08791 21.1463C5.91363 22.9721 8.27332 24.1566 10.8472 24.5393C11.6517 24.6589 13.4098 24.6603 14.2039 24.542C19.5206 23.7495 23.5856 19.6845 24.3781 14.3678C24.495 13.5833 24.495 11.8149 24.3781 11.0303C23.8598 7.55333 21.931 4.54443 19.0006 2.64163C17.627 1.74969 15.9877 1.13366 14.2746 0.865593C13.8059 0.792245 12.004 0.730411 11.5797 0.773087ZM12.8537 6.31469C12.1543 6.40744 11.5298 6.77933 11.1421 7.33392C10.7347 7.91679 10.6739 8.17588 10.6736 9.33055L10.6733 10.2492H10.1795C9.69918 10.2492 9.68194 10.2531 9.54259 10.3925L9.39937 10.5357V11.5967V12.6576L9.54259 12.8009C9.68194 12.9402 9.69918 12.9441 10.1795 12.9441H10.6733V15.8811V18.8182L10.7915 18.9557L10.9098 19.0932H12.1869H13.4639L13.5997 18.9574L13.7356 18.8215L13.749 15.8828L13.7623 12.9441H14.4689C15.4901 12.9441 15.4679 12.973 15.5761 11.4959C15.6098 11.0362 15.6226 10.6011 15.6044 10.5291C15.5457 10.2951 15.3684 10.2492 14.522 10.2492H13.7601V9.69557C13.7601 9.33025 13.7801 9.12192 13.8189 9.08311C13.859 9.04303 14.0944 9.02431 14.5587 9.02431C15.3084 9.02431 15.5147 8.97081 15.6152 8.75018C15.651 8.67164 15.671 8.27618 15.671 7.64765C15.671 6.55325 15.6427 6.42944 15.3712 6.33478C15.2241 6.28353 13.2099 6.26741 12.8537 6.31469ZM12.8292 6.92401C12.2438 7.01985 11.6934 7.43417 11.4251 7.98083L11.2858 8.26486L11.2705 9.55103L11.2553 10.8372H10.6213H9.98733V11.5967V12.3561H10.6243H11.2613V15.444V18.5318L12.2044 18.5185L13.1476 18.5052L13.1603 15.4318L13.1729 12.3584L14.0422 12.345L14.9115 12.3316L14.9446 11.9151C14.9628 11.6861 14.9917 11.3499 15.0088 11.1679L15.0399 10.8372H14.1061H13.1721V9.91351C13.1721 9.03387 13.1774 8.98193 13.2836 8.82451C13.3448 8.73357 13.4693 8.60902 13.5603 8.54777C13.7125 8.44522 13.7795 8.43635 14.4043 8.43635H15.083V7.6524V6.86845L14.0908 6.87418C13.5451 6.87732 12.9774 6.89976 12.8292 6.92401ZM0.0122972 12.6991C0.0122972 13.1976 0.0195978 13.4016 0.0284662 13.1523C0.0373837 12.903 0.0373837 12.4951 0.0284662 12.2459C0.0195978 11.9966 0.0122972 12.2005 0.0122972 12.6991Z"
                            fill="white"
                          />
                        </svg>
                      </span>
                    </Link>
                  </li>
                  {/* <li>
                          <Link href="" target="_blank">
                              <span>
                                  <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                                      <path fillRule="evenodd" clipRule="evenodd" d="M11.2735 0.135892C7.44195 0.559421 4.13505 2.57202 2.02926 5.76191C1.02531 7.28283 0.382666 8.97131 0.0962299 10.8408C-0.031015 11.6717 -0.031015 13.5868 0.0962299 14.4176C0.515448 17.1541 1.72778 19.5614 3.65924 21.4929C5.7664 23.6001 8.42718 24.8458 11.4221 25.1274C12.1829 25.1989 13.6047 25.1611 14.3358 25.0497C17.9016 24.5068 20.9759 22.5491 22.9918 19.5378C24.0478 17.9602 24.7905 15.9299 24.9723 14.1236C25.0021 13.8272 25.0465 13.5464 25.0708 13.4996C25.1334 13.3794 25.1289 11.684 25.0661 11.7228C25.0364 11.7411 25.0171 11.6723 25.0171 11.5482C25.0171 11.2233 24.8786 10.3538 24.7249 9.71391C24.1786 7.43908 23.049 5.42506 21.388 3.76407C19.4679 1.84392 17.0387 0.618414 14.3358 0.206251C13.733 0.114333 11.8581 0.0712649 11.2735 0.135892ZM11.5674 0.7021C11.4866 0.713125 11.222 0.746296 10.9795 0.775841C8.42634 1.08643 5.94014 2.3114 4.07262 4.17897C2.20324 6.04835 1.06725 8.34616 0.658078 11.0858C0.570618 11.6716 0.570618 13.5869 0.658078 14.1726C1.07034 16.9328 2.20138 19.21 4.09928 21.1009C5.91241 22.9073 8.20885 24.0585 10.8179 24.4691C11.5956 24.5914 13.4502 24.5914 14.2278 24.4691C15.9781 24.1937 17.6045 23.5852 18.9834 22.6899C21.9114 20.7887 23.8115 17.8373 24.3627 14.3342C24.4851 13.5565 24.4851 11.7019 24.3627 10.9243C23.8502 7.66667 22.1776 4.89237 19.5685 2.97193C18.0255 1.83623 16.2679 1.11617 14.2523 0.794068C13.7978 0.721405 11.9017 0.656484 11.5674 0.7021ZM14.8443 6.65978C13.3211 6.82113 12.1309 8.2027 12.1309 9.80931C12.1309 10.0729 12.1133 10.1793 12.0697 10.1791C12.036 10.1789 11.7989 10.147 11.5429 10.1081C10.3168 9.9219 9.10309 9.28185 7.75332 8.1096C6.70905 7.20267 6.6747 7.17832 6.53227 7.24324C6.44848 7.28141 6.35921 7.40699 6.26083 7.62507C6.01163 8.17736 5.98262 8.31064 5.98247 8.90546C5.98228 9.54124 6.07581 9.91014 6.37729 10.4629C6.5136 10.7127 6.52742 10.7613 6.45049 10.7201C6.39836 10.6922 6.28758 10.6693 6.20428 10.6693C5.97821 10.6693 5.93392 10.8268 6.00144 11.3901C6.09669 12.1851 6.35186 12.7316 6.86912 13.2489C7.04032 13.4201 7.15928 13.5602 7.13346 13.5602C7.10759 13.5602 7.05007 13.6157 7.00563 13.6836C6.92954 13.7997 6.93101 13.8241 7.03008 14.0959C7.18613 14.5238 7.35929 14.808 7.66655 15.1405C8.04397 15.549 8.35006 15.7391 9.01867 15.9806C9.10265 16.0109 9.0828 16.0361 8.87168 16.1676C8.54286 16.3724 7.97302 16.575 7.44542 16.6747C7.11058 16.738 6.83963 16.7513 6.26563 16.7325C5.60633 16.7109 5.51181 16.7178 5.44493 16.7917C5.36555 16.8794 5.34566 17.0749 5.40681 17.1661C5.47114 17.262 6.02104 17.6123 6.42942 17.8176C7.6079 18.4098 9.15228 18.6943 10.6668 18.5981C11.688 18.5334 12.7483 18.2328 13.8213 17.7039C15.7226 16.7669 17.0344 15.3126 17.78 13.3152C18.1122 12.4255 18.3535 11.2197 18.3535 10.4504V10.0726L18.7851 9.62375C19.4175 8.96612 19.6764 8.5493 19.6764 8.18903C19.6764 7.94443 19.534 7.95012 18.9604 8.21754L18.5628 8.4029L18.8323 8.02944C19.1624 7.57196 19.282 7.32046 19.2834 7.08032C19.284 6.97929 19.2728 6.89658 19.2585 6.89658C19.2443 6.89658 19.1058 6.96062 18.9507 7.03892C18.5589 7.23667 18.095 7.38322 17.7014 7.43349L17.3677 7.47612L17.0027 7.21418C16.3537 6.74852 15.6682 6.57247 14.8443 6.65978ZM14.5291 7.33192C14.0941 7.47112 13.7705 7.67309 13.4536 8.00308C12.8999 8.57973 12.651 9.35114 12.7656 10.1352C12.8563 10.7551 12.7937 10.8004 11.9155 10.7509C10.3208 10.6609 8.59107 9.81597 7.09549 8.39628C6.89955 8.21034 6.72728 8.07016 6.71263 8.08476C6.69803 8.09941 6.65461 8.2294 6.61625 8.3737C6.48053 8.88346 6.54888 9.5092 6.79249 9.98756C6.84173 10.0842 7.05977 10.4001 7.27707 10.6897C7.7056 11.2606 7.75033 11.3998 7.54812 11.5323C7.42352 11.614 7.04458 11.6088 6.74599 11.5214C6.63119 11.4878 6.62909 11.4923 6.66103 11.7028C6.67902 11.8216 6.77152 12.0781 6.86658 12.2727C7.09691 12.7447 7.41069 13.0172 8.12325 13.3642C8.66912 13.63 8.67662 13.636 8.67662 13.8024C8.67662 14.0245 8.48426 14.14 8.04642 14.1809L7.72387 14.211L7.80825 14.3581C7.8547 14.439 7.99948 14.6232 8.13006 14.7674C8.42291 15.0907 8.80475 15.2817 9.43269 15.4187C10.1186 15.5684 10.2305 15.7374 9.89179 16.1124C9.32308 16.7418 8.23354 17.229 7.19691 17.3173L6.81474 17.3499L7.07251 17.4632C7.42318 17.6173 8.09042 17.8035 8.65212 17.904C9.29628 18.0192 10.7562 18.0188 11.3959 17.9031C12.8901 17.633 14.5108 16.8064 15.5207 15.7996C16.8459 14.4783 17.6633 12.5524 17.7502 10.5469C17.783 9.78853 17.8025 9.74571 18.3317 9.2722C18.5345 9.09062 18.6935 8.93515 18.685 8.92667C18.6765 8.9182 18.5146 8.93525 18.3251 8.9646C17.8979 9.03069 17.7015 8.96234 17.6758 8.73867C17.6621 8.61853 17.7177 8.53788 18.0433 8.20608C18.3355 7.90837 18.3978 7.82287 18.3045 7.84766C17.205 8.14037 17.2272 8.14032 16.8527 7.84776C16.3007 7.41634 15.8043 7.2377 15.1707 7.24221C14.9586 7.24373 14.6853 7.28195 14.5291 7.33192ZM0 12.6292C0 13.1278 0.00730054 13.3317 0.016169 13.0824C0.0250864 12.8331 0.0250864 12.4253 0.016169 12.176C0.00730054 11.9267 0 12.1307 0 12.6292Z" fill="white" />
                                  </svg>
                              </span>
                          </Link>
                      </li> */}
                  <li>
                    <Link
                      href="https://www.instagram.com/seraiboutiquehotel/"
                      target="_blank"
                    >
                      <span>
                        <svg
                          width="26"
                          height="26"
                          viewBox="0 0 26 26"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M11.5676 0.0747927C11.4868 0.086013 11.2112 0.119037 10.9552 0.14819C9.10475 0.358681 7.11381 1.10877 5.47844 2.2115C4.27817 3.02083 2.95368 4.34561 2.14332 5.54745C1.04849 7.17107 0.350475 9.01448 0.0704576 11.0216C-0.0148951 11.6334 -0.0148951 13.5456 0.0704576 14.1574C0.474829 17.0559 1.71078 19.5301 3.75855 21.5407C5.72838 23.4748 8.15127 24.6535 10.9552 25.0416C11.5654 25.1261 13.4808 25.1261 14.091 25.0416C16.9596 24.6445 19.4358 23.416 21.4271 21.4018C22.8444 19.9683 23.8085 18.398 24.431 16.5092C24.7603 15.51 25.0139 14.2524 25.0164 13.6062C25.0169 13.4781 25.0393 13.3734 25.0663 13.3734C25.0971 13.3734 25.115 13.0596 25.1145 12.5282C25.114 11.9644 25.098 11.7075 25.0663 11.7565C25.0321 11.8095 25.0183 11.7615 25.0171 11.5851C25.0105 10.5948 24.5271 8.69257 23.965 7.44481C22.9974 5.29703 21.3692 3.39869 19.3736 2.09185C18.37 1.4346 17.5931 1.06081 16.4428 0.68162C15.1376 0.251378 14.201 0.0970373 12.7436 0.0719999C12.1776 0.0622985 11.6485 0.0635234 11.5676 0.0747927ZM11.5921 0.664471C7.37149 1.05047 3.78776 3.45127 1.86766 7.1791C0.0930451 10.6245 0.153605 14.9125 2.02475 18.2976C2.60855 19.3538 3.18901 20.1295 4.03539 20.9847C5.89007 22.8586 8.19233 24.0215 10.8572 24.4305C11.6425 24.5511 13.4036 24.5511 14.189 24.4305C16.8673 24.0195 19.1577 22.8631 21.011 20.9861C22.8457 19.1279 23.9594 16.8925 24.3641 14.2554C24.4846 13.4701 24.4846 11.7089 24.3641 10.9236C23.9594 8.28643 22.8457 6.05104 21.011 4.19284C19.1709 2.32929 16.856 1.15503 14.238 0.757173C13.7424 0.681865 12.0502 0.622578 11.5921 0.664471ZM9.87562 6.12253C8.37985 6.23179 7.35968 6.75395 6.71807 7.73879C6.11384 8.66611 6.00795 9.38955 6.00795 12.5895C6.00795 14.5619 6.05935 15.6379 6.17802 16.1497C6.46514 17.3877 7.21504 18.293 8.31566 18.7304C8.83914 18.9384 9.20941 19.0048 10.1712 19.063C11.259 19.1288 15.1638 19.0898 15.7079 19.0077C17.1256 18.7939 18.1855 18.0011 18.6643 16.796C18.972 16.0217 19.0382 15.2773 19.0382 12.5895C19.0382 10.6171 18.9868 9.54105 18.8681 9.02923C18.5057 7.46691 17.4612 6.4955 15.8138 6.18887C15.467 6.12434 14.9372 6.10729 12.915 6.09558C11.5542 6.08774 10.1864 6.09985 9.87562 6.12253ZM9.92624 6.71353C8.83086 6.78752 8.16005 7.05122 7.57243 7.63884C6.73228 8.47899 6.59699 9.16549 6.59699 12.5895C6.59699 16.0135 6.73228 16.7 7.57243 17.5401C8.41258 18.3803 9.09907 18.5156 12.5231 18.5156C15.9471 18.5156 16.6336 18.3803 17.4737 17.5401C18.3139 16.7 18.4492 16.0135 18.4492 12.5895C18.4492 9.16549 18.3139 8.47899 17.4737 7.63884C16.8652 7.03035 16.2255 6.78997 14.9974 6.70849C14.1927 6.65508 10.7412 6.65851 9.92624 6.71353ZM9.87724 7.24716C8.65952 7.34745 7.89889 7.79063 7.49888 8.63289C7.17148 9.32228 7.16144 9.44041 7.16144 12.5895C7.16144 15.0614 7.17168 15.4547 7.24513 15.7974C7.43229 16.6708 7.8816 17.2884 8.56647 17.6137C9.25483 17.9405 9.37409 17.9507 12.5231 17.9507C15.6721 17.9507 15.7913 17.9405 16.4797 17.6137C17.1646 17.2884 17.6142 16.6703 17.8008 15.7974C17.874 15.4551 17.8843 15.0582 17.8843 12.5895C17.8843 10.1207 17.874 9.72385 17.8008 9.38156C17.6141 8.50844 17.1647 7.89063 16.4793 7.56515C15.8275 7.25558 15.6747 7.24118 12.8661 7.22413C11.4782 7.21575 10.1332 7.22609 9.87724 7.24716ZM9.92624 7.83551C8.90382 7.92062 8.37406 8.21103 8.04637 8.86607C7.76072 9.43707 7.74587 9.62076 7.74587 12.5895C7.74587 15.5582 7.76072 15.7419 8.04637 16.3129C8.2404 16.7008 8.45412 16.907 8.86193 17.0998C9.39315 17.3511 9.61334 17.3668 12.5721 17.3652C14.9055 17.3639 15.3405 17.3524 15.6375 17.284C16.3462 17.1208 16.7336 16.845 16.9987 16.3151C17.2856 15.7417 17.3003 15.56 17.3003 12.5895C17.3003 9.62076 17.2854 9.43707 16.9998 8.86607C16.8134 8.49354 16.612 8.29128 16.2392 8.1024C15.7271 7.84291 15.5448 7.82718 12.8661 7.81136C11.5052 7.80332 10.1822 7.8142 9.92624 7.83551ZM15.3705 8.35914C14.647 8.74063 14.6294 9.80406 15.3404 10.1771C15.8992 10.4702 16.5906 10.2075 16.8163 9.61621C17.0514 9.00066 16.5738 8.29535 15.8845 8.24008C15.68 8.22372 15.5862 8.24542 15.3705 8.35914ZM15.6344 8.87346C15.4753 8.96866 15.4171 9.07469 15.4155 9.27215C15.412 9.68598 15.9051 9.86149 16.1738 9.54212C16.4053 9.26706 16.2588 8.88944 15.9009 8.83868C15.8082 8.82554 15.6883 8.84118 15.6344 8.87346ZM11.7146 9.20267C10.1466 9.59024 9.04429 10.9883 9.04429 12.5895C9.04429 14.5081 10.6045 16.0683 12.5231 16.0683C13.0718 16.0683 13.5438 15.9536 14.091 15.6873C14.4792 15.4983 14.6259 15.3913 14.9754 15.0418C15.3249 14.6923 15.4319 14.5456 15.6209 14.1574C16.135 13.101 16.135 12.078 15.6209 11.0216C15.4319 10.6333 15.3249 10.4866 14.9754 10.1371C14.6259 9.7877 14.4792 9.68064 14.091 9.49171C13.835 9.36711 13.4668 9.23041 13.2729 9.18793C12.8194 9.08861 12.1505 9.09498 11.7146 9.20267ZM11.798 9.79446C11.278 9.93547 10.8802 10.1665 10.4776 10.5614C9.87734 11.15 9.58982 11.9158 9.64593 12.7766C9.67586 13.2362 9.81349 13.6854 10.0483 14.0898C10.2437 14.4264 10.7798 14.938 11.127 15.1191C11.6563 15.3953 11.9048 15.4551 12.5231 15.4551C13.141 15.4551 13.3888 15.3955 13.9195 15.1193C14.3012 14.9207 14.8539 14.3671 15.0601 13.9768C15.2655 13.5882 15.4139 13.0062 15.4139 12.5895C15.4139 12.1723 15.2653 11.5902 15.0599 11.2025C14.8709 10.8457 14.3612 10.3108 14.0234 10.1147C13.3523 9.72508 12.5039 9.60298 11.798 9.79446ZM11.8013 10.3372C11.157 10.547 10.5585 11.1123 10.3157 11.7407C10.1503 12.1685 10.1283 12.8228 10.2643 13.2704C10.4685 13.9426 11.0262 14.5464 11.6743 14.7969C12.102 14.9623 12.7563 14.9842 13.204 14.8482C13.8762 14.6441 14.48 14.0863 14.7305 13.4383C14.8958 13.0105 14.9178 12.3562 14.7818 11.9086C14.5778 11.2367 14.0209 10.6335 13.3719 10.3816C12.9599 10.2216 12.2206 10.2007 11.8013 10.3372ZM11.9498 10.9139C11.4606 11.0886 11.1144 11.4074 10.8929 11.8874C10.8043 12.0795 10.7837 12.2116 10.7837 12.5895C10.7837 12.9968 10.8003 13.0889 10.9168 13.3259C11.1188 13.7374 11.3581 13.9856 11.7282 14.1676C12.0293 14.3157 12.0942 14.3289 12.5223 14.3289C12.9248 14.3289 13.0266 14.311 13.2666 14.1985C13.6376 14.0246 13.9438 13.7333 14.1188 13.3876C14.2492 13.1302 14.2625 13.0587 14.2625 12.614C14.2625 12.1854 14.2461 12.0891 14.1316 11.8449C13.9639 11.487 13.6219 11.1462 13.2676 10.9839C12.8945 10.8128 12.3187 10.7823 11.9498 10.9139ZM0 12.5895C0 13.0611 0.00734954 13.254 0.016365 13.0182C0.0253314 12.7824 0.0253314 12.3965 0.016365 12.1608C0.00734954 11.925 0 12.1179 0 12.5895Z"
                            fill="white"
                          />
                        </svg>
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link href="https://youtu.be/VoeH5R9vuaY" target="_blank">
                      <span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="26"
                          height="26"
                          viewBox="0 0 26 26"
                          fill="none"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M11.1477 0.196165C2.68233 1.22742 -2.3448 10.1116 1.16399 17.84C4.76654 25.7749 15.2283 27.6602 21.4053 21.4877C28.6055 14.2929 24.6936 2.08077 14.6152 0.289745C13.9289 0.167785 11.8429 0.111524 11.1477 0.196165ZM14.0796 0.852663C22.7441 1.959 27.3197 11.9112 22.4996 19.1667C17.4457 26.774 6.1111 26.1542 1.98133 18.0447C-2.34242 9.55436 4.6302 -0.353938 14.0796 0.852663ZM8.41847 8.25368C7.47436 8.50091 6.71446 9.22173 6.40641 10.1622C6.22137 10.7271 6.22231 14.5694 6.40753 15.1351C6.71615 16.0774 7.48355 16.7983 8.43779 17.0424C9.02871 17.1935 16.0993 17.1935 16.6902 17.0424C17.6444 16.7983 18.4118 16.0774 18.7205 15.1351C18.8394 14.772 18.8396 14.7669 18.8396 12.6469C18.8396 10.5269 18.8394 10.5217 18.7205 10.1587C18.4118 9.21636 17.6444 8.49547 16.6902 8.25136C16.11 8.10302 8.98627 8.10496 8.41847 8.25368ZM16.6131 8.88123C17.3647 9.11521 17.95 9.73533 18.1622 10.5225C18.2566 10.873 18.2566 14.4207 18.1622 14.7713C17.95 15.5584 17.3647 16.1785 16.6131 16.4125C16.1535 16.5555 8.97451 16.5555 8.51493 16.4125C7.76329 16.1785 7.17799 15.5584 6.96582 14.7713C6.87137 14.4207 6.87137 10.873 6.96582 10.5225C7.17568 9.74389 7.75929 9.12003 8.49886 8.88354C8.93894 8.74289 16.1619 8.74083 16.6131 8.88123ZM11.2996 10.6618C11.0597 10.799 11.0537 10.8475 11.0518 12.6309L11.05 14.2999L11.1765 14.4501C11.408 14.7252 11.5079 14.6931 13.054 13.8468C15.281 12.6277 15.2794 12.6818 13.1252 11.4533C11.6392 10.6061 11.5015 10.5463 11.2996 10.6618ZM13.0156 12.1249C13.4924 12.3986 13.8821 12.6334 13.8818 12.6469C13.8815 12.6603 13.5582 12.8471 13.1634 13.062C12.7686 13.2769 12.2744 13.5464 12.0653 13.6609L11.685 13.869V12.6189V11.3688L11.9169 11.498C12.0445 11.5692 12.5389 11.8512 13.0156 12.1249Z"
                            fill="white"
                          />
                        </svg>
                      </span>
                    </Link>
                  </li>
                  <li className={classes.social_banner}>Follow us -</li>
                </ul>
              </div>
            </Box>
          </div>
          {/* <img style={{borderRadius:'11px'}} className="img-full img-responsive" src={seraiBanner} /> */}
        </Box>
        <Box sx={{ display: { xs: "block", md: "none" } }}>
          <div className={`${classes.banner_main} banner-main`}>
            <div className={classes.banner_overlay}></div>
            <div className="banner-content-text">
              <h1>Experience Luxury in Islamabad</h1>
            </div>
            {/* <img className="img-full img-responsive" src={seraiBannerMobile} /> */}
            <div
              style={{ display: videoPlay ? "block" : "none" }}
              className="ach-banner-vid"
            >
              <ReactPlayer
                width="100%"
                height="100%"
                url="https://rvt-videos.s3.ap-southeast-1.amazonaws.com/serai/responsive-serai-hotel.mp4"
                muted
                playing
                loop
              />
            </div>
          </div>
        </Box>
        <Container fixed className="top-filter-box">
          <Grid container className="waroper-formss">
            <Grid item xs className="position-relative">
              <div className="card form-card-search align-items-center ">
                <Grid className="from-box-search">
                  <Grid item xs>
                    <Grid container alignItems="center" spacing={3}>
                      <Grid item xs={12} sm={12} md={3} lg={3}>
                        <div className="form-control-transparent form-fs-md d-flex align-items-center positionRelative padd-left-iconsear border-bb-mb">
                          <i
                            className={`${classes.locationSvg} search-svg1 norepeat-img me-3 search-svg-post`}
                          ></i>
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
                            <label for="search" class="placeholder-label">
                              Select the Location
                            </label>
                          </div>
                          {!locationQuery && locationQueryError && (
                            <InputError
                              className="invalid-feedback"
                              message={locationQueryError}
                            />
                          )}
                          {openFilteredItems && (
                            <div className="filter-items">
                              {filteredData.map((item, index) => (
                                <div
                                  className="cursor-button"
                                  key={index}
                                  onClick={() => setLocationQuery(item)}
                                >
                                  {item}
                                </div>
                              ))}
                            </div>
                          )}
                          <span className="spacer-vert-search"></span>
                        </div>
                      </Grid>
                      <Grid item xs={12} sm={12} md={4} lg={4}>
                        <div className="form-control-transparent home-date-picker border-bb-mb form-fs-md d-flex padd-left-iconsear  align-items-center">
                          <i
                            className={`${classes.checkinSvg} search-svg1 norepeat-img me-3 search-svg-post`}
                          ></i>
                          <div
                            onClick={scrollToDatePicker}
                            ref={dateRangePickerRef}
                          >
                            <DateRangePicker
                              className="montserrat"
                              startDate={checkInDate} // momentPropTypes.momentObj or null,
                              endDate={checkOutDate} // momentPropTypes.momentObj or null,
                              startDatePlaceholderText="Check-in"
                              endDatePlaceholderText="Check-out"
                              noBorder
                              keepOpenOnDateSelect={true}
                              onDatesChange={handleDatesChange} // PropTypes.func.isRequired,
                              focusedInput={focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
                              onFocusChange={(focusedInput) =>
                                setFocusedInput(focusedInput)
                              } // PropTypes.func.isRequired,
                              renderCalendarInfo={renderCalendarInfo}
                              readOnly={true}
                              // customInputIcon={
                              //   <i className={`${classes.checkinSvg} checkin-svg cursor-pointer norepeat-img me-3`}></i>
                              // }
                              customArrowIcon={
                                <i
                                  className={`${classes.checkoutSvg} checkout-svg norepeat-img`}
                                ></i>
                              }
                              displayFormat="ddd, MMM D"
                              orientation={
                                isSmallScreen ? "vertical" : "horizontal"
                              }
                            />
                            <div className="date-field">
                              <label for="checkInDate" class="date-colour">
                                Check In Date
                              </label>
                              <label
                                for="checkInDate"
                                class="date-colour margin-field"
                              >
                                Check Out Date
                              </label>
                            </div>
                          </div>
                          <div className="date-required-error">
                            {!checkInDate && checkInDateError && (
                              <InputError message={checkInDateError} />
                            )}
                            {!checkOutDate && checkOutDateError && (
                              <InputError message={checkOutDateError} />
                            )}
                          </div>
                          <span className="spacer-vert-search spacer-vert-search-left"></span>
                        </div>
                      </Grid>
                      <Grid item xs={12} sm={12} md={5} lg={5}>
                        <div className="form-control-transparent  flex-wrap form-fs-md d-flex align-items-center positionRelative">
                          <i
                            className={`${classes.guestSvg} guest-svg norepeat-img me-3 cursor-button`}
                            onClick={() => setOpenAdultsChildren(true)}
                          ></i>
                          <div
                            id="adult-child-field"
                            onClick={() => setOpenAdultsChildren(true)}
                          >
                            <div>
                              <label className="form-label form-label-custome cursor-button montserrat">
                                {numOfAdults} Adult{numOfAdults > 1 && "s"} -{" "}
                                {numOfChildren}{" "}
                                {numOfChildren > 1 ? "Children" : "Child"}
                              </label>
                              <div>
                                <label for="noOfGuest" class="date-colour ">
                                  Number of Guests
                                </label>
                              </div>
                            </div>
                          </div>
                          <div
                            className="drop-icon cursor-button"
                            onClick={() => setOpenAdultsChildren(true)}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="18"
                              height="10"
                              viewBox="0 0 18 10"
                              fill="none"
                            >
                              <path
                                d="M16.9318 1.45129L10.4118 7.97129C9.6418 8.74129 8.3818 8.74129 7.6118 7.97129L1.0918 1.45129"
                                stroke="#797979"
                                strokeWidth="1.5"
                                strokeMiterlimit="10"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </div>

                          {openAdultsChildren && (
                            <div className="adults-children-div">
                              <Grid container>
                                <Grid item xs={8} sm={8} lg={8}>
                                  <div className="age-group">
                                    <p>Adults</p>
                                    <span>Age 13 or above</span>
                                  </div>
                                </Grid>
                                <Grid
                                  className="d-flex align-items-center justify-content-between"
                                  item
                                  xs={4}
                                  sm={4}
                                  lg={4}
                                >
                                  <span
                                    className="guests-ch-btn1"
                                    onClick={numberAdults}
                                  >
                                    <button
                                      className="btn btn-default value-control minus-btn cursor-button"
                                      data-action="minus"
                                      data-target="font-size"
                                    >
                                      <span
                                        className={`${classes.minusSvg} minus-svg norepeat-img`}
                                      ></span>
                                    </button>
                                  </span>
                                  <span>{numOfAdults}</span>
                                  <span
                                    className="guests-ch-btn1"
                                    onClick={() =>
                                      setNumOfAdults(numOfAdults + 1)
                                    }
                                  >
                                    <button
                                      className="btn btn-default value-control plus-btn cursor-button"
                                      data-action="plus"
                                      data-target="font-size"
                                    >
                                      <span
                                        className={`${classes.plusSvg} plus-svg norepeat-img`}
                                      ></span>
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
                                <Grid
                                  className="d-flex align-items-center justify-content-between"
                                  item
                                  xs={4}
                                  sm={4}
                                  lg={4}
                                >
                                  <span
                                    className="guests-ch-btn1"
                                    onClick={numberChild}
                                  >
                                    <button
                                      className="btn btn-default value-control minus-btn cursor-button"
                                      data-action="minus"
                                      data-target="font-size"
                                    >
                                      <span
                                        className={`${classes.minusSvg} minus-svg norepeat-img`}
                                      ></span>
                                    </button>
                                  </span>
                                  <span>{numOfChildren}</span>
                                  <span
                                    className="guests-ch-btn1"
                                    onClick={() =>
                                      setNumOfChildren(numOfChildren + 1)
                                    }
                                  >
                                    <button
                                      className="btn btn-default value-control plus-btn cursor-button"
                                      data-action="plus"
                                      data-target="font-size"
                                    >
                                      <span
                                        className={`${classes.plusSvg} plus-svg norepeat-img`}
                                      ></span>
                                    </button>
                                  </span>
                                </Grid>
                              </Grid>
                            </div>
                          )}
                          <div className="search-btn ms-auto">
                            <button
                              className="btn btn-serach-ht cursor-button"
                              onClick={() => searchRooms()}
                            >
                              {props?.loadingParam ? (
                                <span className={classes.searchLoader}>
                                  <Loader />
                                </span>
                              ) : (
                                <i
                                  className={`${classes.searchSvg1} search-svg1 norepeat-img`}
                                ></i>
                              )}
                              <span class="hh-btn">CHECK availability</span>
                            </button>
                          </div>
                        </div>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </div>
            </Grid>
          </Grid>
        </Container>
      </div>
      <div className={generalClasses.minHeight400}>
        <section className="about-section" id="AboutUs">
          <div className="defalut-heading-mainhm text-center">
            <h2>ACCOMMODATIONS</h2>
            <p>
              - Bringing you warm hospitality blended with luxury, exceptional
              service & prime location -
            </p>
          </div>
          <div className="accomdation-padd">
            <Container>
              {props?.loadingRoomList ? (
                <Loader />
              ) : (
                <Grid container spacing={smallAccomodation ? 2 : 6}>
                  {props?.roomList?.map((item, index) => {
                    // const formattedPrice = (Number(item.Price)).toLocaleString('en-PK', {
                    //   style: 'currency',
                    //   currency:currency,
                    //   minimumFractionDigits: 0,
                    //   maximumFractionDigits: 0,
                    // });
                    return (
                      <Grid item xs={12} md={6} lg={3} className="d-flex">
                        <div className="card about-content-card">
                          <div className="thumb-move-ab">
                            <Slider className="bluedots" {...settings}>
                              {item.category_gallery?.slice(0, 3).map((img) => (
                                <img
                                  className="tns-lazy-img img-responsive-cat"
                                  src={img.image}
                                  alt=""
                                />
                              ))}
                            </Slider>
                            <div className="price-tag">
                              <div className="price">
                                <div className="title-price">Starting From</div>
                                <div className="amount">{item.Price}</div>
                              </div>
                            </div>
                            <div
                              className="view-detail"
                              onClick={() => handleRoomDetials(item, index)}
                            >
                              <button className="view-detail-btn">
                                View Details
                              </button>
                              {loadingStates[index] && (
                                <div
                                  key={index}
                                  className={classes.searchLoaderDetail}
                                >
                                  <Loader />
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="card-body about-content-body">
                            <div className="location-div">
                              {item.id == 4 || item.id == 5 ? (
                                <span className="location-span-home">
                                  Located in F-6/2
                                </span>
                              ) : item.id == 6 ? 
                              (
                                <span className="location-span-home">
                                  Sofia, Bulgaria
                                </span>
                              )
                              :
                              (
                                <span className="location-span-home">
                                  Located in F-6/3
                                </span>
                              )}
                            </div>
                            <h5 className="card-title">{item.Name} </h5>{item.id == 5 ? 
                              (
                                <span style={{ color: "red" }}>
                                  For Female only
                                </span>
                              )
                              : ''}
                            <p>
                              <span
                                dangerouslySetInnerHTML={{
                                  __html: item.Description,
                                }}
                              ></span>
                            </p>
                          </div>
                          <div className="book-btn">
                            {item.BookingStatus == 2 ? (
                              <button className="not-available-btn">
                                Not Available
                              </button>
                            ) : (
                              <button
                                className="book-now-btn"
                                onClick={() => cartItem(item)}
                              >
                                Book Now
                              </button>
                            )}
                          </div>
                        </div>
                      </Grid>
                    );
                  })}
                  {/* <Grid item xs={12} md={6} lg={3} className="d-flex">
                <div className="card about-content-card">
                      <div className="thumb-move-ab">
                        <img
                          className="tns-lazy-img img-responsive-cat"
                          src={room1}
                          alt=""
                        />
                      <div className="price-tag">
                          <div className="price">
                              <div className="title-price">
                                Starting From
                              </div>
                              <div className="amount">
                                  RS 25,000
                              </div>
                          </div>
                      </div>
                      <div className="view-detail">
                          <button className="view-detail-btn">View Details</button>
                      </div>
                      </div>
                      <div className="card-body about-content-body">
                        <h5 className="card-title">Deluxe Suite</h5>
                        <p>
                          This is a perfect junior suite with a lounge area in the room and a attached bathroom.
                        </p>
                      </div>
                      <div className="book-btn">
                        <button className="book-now-btn">Book Now</button>
                      </div>
                </div>
              </Grid>
              <Grid item xs={12} md={6} lg={3} className="d-flex">
                <div className="card about-content-card">
                      <div className="thumb-move-ab">
                        <img
                          className="tns-lazy-img img-responsive-cat"
                          src={room2}
                          alt=""
                        />
                        <div className="price-tag">
                          <div className="price">
                              <div className="title-price">
                                Starting From
                              </div>
                              <div className="amount">
                                  RS 26,000
                              </div>
                          </div>
                      </div>
                      <div className="view-detail">
                          <button className="view-detail-btn">View Details</button>
                      </div>
                      </div>
                      <div className="card-body about-content-body">
                        <h5 className="card-title">Duplex Suite</h5>
                        <p>
                           This is a perfect junior suite with a lounge area in the room and a attached bathroom.
                        </p>
                      </div>
                      <div className="book-btn">
                        <button className="book-now-btn">Book Now</button>
                      </div>
                </div>
              </Grid>
              <Grid item xs={12} md={6} lg={3} className="d-flex">
                <div className="card about-content-card">
                      <div className="thumb-move-ab">
                        <img
                          className="tns-lazy-img img-responsive-cat"
                          src={room3}
                          alt=""
                        />
                        <div className="price-tag">
                          <div className="price">
                              <div className="title-price">
                                Starting From
                              </div>
                              <div className="amount">
                                  RS 26,000
                              </div>
                          </div>
                      </div>
                      <div className="view-detail">
                          <button className="view-detail-btn">View Details</button>
                      </div>
                      </div>
                      <div className="card-body about-content-body">
                        <h5 className="card-title">Apartment</h5>
                        <p>
                          Offering a patio and garden views, the spacious apartment includes.
                        </p>
                      </div>
                      <div className="book-btn">
                        <button className="book-now-btn">Book Now</button>
                      </div>
                </div>
              </Grid>     */}
                </Grid>
              )}
            </Container>
          </div>
        </section>

        {/* Luxury Hotel Section */}
        <section className="section-lux">
          <Container fixed>
            <Grid container spacing={3}>
              <Grid item xs={12} md={12} lg={6}>
                <div className="section-title">
                  <h5>Luxury in the Heart of Islamabad</h5>
                  {/* <div class="scrollable-container"> */}
                  <Scrollbars style={{ height: "400px", width: "100%" }}>
                    <p className="montserrat">
                      Experience the best of Islamabad’s hospitality with
                      Rockville House ! Located in the picturesque surroundings
                      of F-6 Islamabad, Rockville House offers elegantly
                      furnished rooms with modern amenities, exceptional service
                      and a cozy lounge/co-working space (only for the guests)
                      for the perfect stay. As part of the Rockville Group and
                      managed by Serai Boutique Hotels and Resorts, Rockville
                      House attracts local guests and foreigners alike.
                      <br />
                      So, whether you’re a business traveler, looking for a
                      couple’s staycation, a travel enthusiast or a nature
                      lover, we ensure you have a memorable experience with us!
                      Discover the trendiest cafes/coffee shops, restaurants,
                      grocery stores, local handicraft stores and art vendors,
                      at walking distance from Rockville House. Enjoy the
                      convenience of being a short drive away from popular
                      tourist attractions and the Margalla Hills.
                      <br />
                      Rockville House offers competitive room rates, round the
                      clock room service and a convenient online hotel booking
                      system, which makes it easy to reserve your room in
                      Islamabad. We also have fully furnished apartment with
                      kitchenette and lounge if you’re looking for added privacy
                      and a more spacious accommodation for short term stay in
                      Islamabad.
                      <br />
                      So if you’re browsing through luxury hotels in Islamabad,
                      choose Rockville House for an exquisite experience away
                      from home!
                    </p>
                    {/* </div> */}
                  </Scrollbars>
                </div>
              </Grid>
              <Grid
                item
                xs={12}
                md={12}
                lg={6}
                className="align-selft-center section-title-colum"
              >
                <a href="http://horockville.com" target="_blank">
                  <div className="luxury-sec-div">
                    <div className="luxrybackdots">
                      <img className="" src={dots} alt="" />
                    </div>
                    <div className="luxury-image-div">
                      <Slider
                        {...settingsLuxuary}
                        // responsive={{
                        //   0: {
                        //     stagePadding: 0,
                        //     items: 1,
                        //     margin: 0,
                        //     dots: false,
                        //     loop: true,
                        //     autoplay: true,
                        //     autoplayTimeout: 3000,
                        //   },
                        //   600: {
                        //     items: 1,
                        //     margin: 0,
                        //     dots: false,
                        //     loop: true,
                        //     autoplay: true,
                        //     autoplayTimeout: 3000,
                        //   },
                        //   991: {
                        //     items: 1,
                        //     margin: 0,
                        //     dots: false,
                        //     loop: true,
                        //     autoplay: true,
                        //     autoplayTimeout: 3000,

                        //   }
                        // }}
                      >
                        <img
                          className="tns-lazy-img img-responsive-cat luxury-img"
                          src={
                            "https://serai-hms.s3.ap-southeast-1.amazonaws.com/hms/images/luxuaryImage3.webp"
                          }
                          alt=""
                        />
                        <img
                          className="tns-lazy-img img-responsive-cat luxury-img"
                          src={
                            "https://serai-hms.s3.ap-southeast-1.amazonaws.com/hms/images/luxuaryImage2.webp"
                          }
                          alt=""
                        />
                        <img
                          className="tns-lazy-img img-responsive-cat luxury-img"
                          src={
                            "https://serai-hms.s3.ap-southeast-1.amazonaws.com/hms/images/luxuaryImage1.webp"
                          }
                          alt=""
                        />
                      </Slider>
                      <div className="luxury-logo-div">
                        <div class="oval-container">
                          <div class="oval">
                            <img
                              src={seraiLogo1}
                              alt="Logo"
                              class="luxury-sec-logo"
                            />
                          </div>
                          <div className="luxury-sec-txt">
                            <h5 className="typo-title">
                              Rockville House, Islamabad{" "}
                            </h5>
                            <p className="luxury-sec-desc montserrat">
                              An exquisite experience away from home!
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="rounded-div"></div>
                  </div>
                </a>
              </Grid>
            </Grid>
          </Container>
          {/* <OurServices /> */}
        </section>

        {/* blog section */}
        {props?.blog ? (
          <section className="blog-sec">
            <Container fixed className="blog-container">
              <Grid container>
                <Grid item xs={12} md={6} lg={5}>
                  <img
                    className="img-responsive-blog thum-blo-left"
                    src={props?.blog?.ThumbnailImage}
                    alt=""
                  />
                </Grid>
                <Grid item xs={12} md={6} lg={7}>
                  <div className="blog-detail-div">
                    <div className="blog-text">
                      <div>
                        <h5 className="title-blog-section">LATEST BLOG</h5>
                        <p className="blog-p">{props?.blog?.Title}</p>
                        <div className="blog-content montserrat">
                          <span
                            className="text-doted"
                            dangerouslySetInnerHTML={{
                              __html: blogIntroText(),
                            }}
                          />
                        </div>
                        <div className="line"></div>
                      </div>
                    </div>
                    <div className="blog-sec-div">
                      <span class="text-start">2 Min Read</span>
                      <span class="text-end" onClick={openBlog}>
                        READ NOW
                      </span>
                    </div>
                  </div>
                </Grid>
              </Grid>
            </Container>
          </section>
        ) : (
          <Loader />
        )}
        {/* video section */}
        <section className="video-sec">
          <img
            onClick={seraiVideo}
            className="video-thumb"
            src={
              "https://serai-hms.s3.ap-southeast-1.amazonaws.com/hms/images/Video.webp"
            }
            alt=""
          />
        </section>

        {/* <section id="Gallery" className="gallery-section">
          <div className="defalut-heading-mainhm text-center">
            <h2>RockVille House</h2>
            <p>Gallery</p>
          </div>
          <Container fixed>
            <div className={`${classes.imageListRoot} gallery-box`}>
              <ImageList
                rowHeight={651}
                className={classes.imageList}
                cols={rvHouseGalCol}
                gap={26}
              >
                <ImageListItem cols={1}>
                  <div className="positionRelative">
                    <div className="lightbox" onClick={() => handleOpenRvHouseGal(0)}>
                      <img
                        className="image-list-border"
                        src={gallerybb1}
                        width="420"
                        height="651"
                        alt="..."
                      />
                    </div>
                  </div>
                </ImageListItem>
                <ImageListItem cols={1}>
                  <ImageList
                    rowHeight={313}
                    className={classes.imageList}
                    cols={1}
                    gap={26}
                  >
                    <ImageListItem cols={1}>
                      <div className="positionRelative">
                        <div className="lightbox" onClick={() => handleOpenRvHouseGal(1)}>
                          <img
                            className="image-list-border"
                            src={gallerybb2}
                            width="420"
                            height="310"
                            alt="..."
                          />
                        </div>
                      </div>
                    </ImageListItem>
                    <ImageListItem cols={1}>
                      <div className="positionRelative">
                        <div className="lightbox" onClick={() => handleOpenRvHouseGal(2)}>
                          <img
                            className="image-list-border"
                            src={gallerybb3}
                            width="420"
                            height="310"
                            alt="..."
                          />
                        </div>
                      </div>
                    </ImageListItem>
                  </ImageList>
                </ImageListItem>
                <ImageListItem cols={1}>
                  <div className="positionRelative">
                    <div className="lightbox" onClick={() => handleOpenRvHouseGal(3)}>
                      <img
                        className="image-list-border"
                        src={gallerybb4}
                        width="420"
                        height="651"
                        alt="..."
                      />
                    </div>
                  </div>
                </ImageListItem>
              </ImageList>
            </div>
          </Container>
        </section> */}

        {/* Facilities And Services */}
        <FaclitiesServices />

        {/* <section>
          <div className="defalut-heading-mainhm text-center">
            <h2>Serai Bistro</h2>
            <p>Gallery</p>
          </div>
          <OwlCarousel
            loop
            className="owl-theme bluedots gallery-box"
            responsive={{
              0: {
                stagePadding: 20,
                items: 1,
                margin: 10,
                dots: false,
              },
              600: {
                items: 2,
                margin: 15,
                dots: true,
              },
              991: {
                items: 4,
                margin: 31,
              },
            }}
          >
            <div>
              <div className="position-relative">
                <a className="lightbox" onClick={() => handleOpenSerBisGal(0)}>
                  <img
                    className="tns-lazy-img default-radius-img img-responsive"
                    src={gallery2_1}
                    width="449"
                    height="412"
                    alt=""
                  />
                </a>
              </div>
            </div>
            <div>
              <div className="position-relative">
                <a className="lightbox" onClick={() => handleOpenSerBisGal(1)}>
                  <img
                    className="tns-lazy-img default-radius-img img-responsive"
                    src={gallery2_2}
                    width="449"
                    height="412"
                    alt=""
                  />
                </a>
              </div>
            </div>
            <div>
              <div className="position-relative">
                <a className="lightbox" onClick={() => handleOpenSerBisGal(2)}>
                  <img
                    className="tns-lazy-img default-radius-img img-responsive"
                    src={gallery2_3}
                    width="449"
                    height="412"
                    alt=""
                  />
                </a>
              </div>
            </div>
            <div>
              <div className="position-relative">
                <a className="lightbox" onClick={() => handleOpenSerBisGal(3)}>
                  <img
                    className="tns-lazy-img default-radius-img img-responsive"
                    src={gallery2_4}
                    width="449"
                    height="412"
                    alt=""
                  />
                </a>
              </div>
            </div>
            <div>
              <div className="position-relative">
                <a className="lightbox" onClick={() => handleOpenSerBisGal(0)}>
                  <img
                    className="tns-lazy-img default-radius-img img-responsive"
                    src={gallery2_1}
                    width="449"
                    height="412"
                    alt=""
                  />
                </a>
              </div>
            </div>
          </OwlCarousel>
        </section> */}

        <section className="testmonial-section" id="Reviews">
          <div className="defalut-heading-mainhm text-center">
            <h2>Every stay has a story</h2>
            <p>- WHAT OUR GUESTS SAY ABOUT US -</p>
          </div>
          <div>
            <Slider
              {...settingsReview}
              // responsive={{
              //   0: {
              //     stagePadding: 50,
              //     items: 1,
              //     margin: 10,
              //     dots: false,
              //   },
              //   600: {
              //     items: 1,
              //     margin: 20,
              //     stagePadding: 100,
              //     dots: false,
              //   },
              //   768: {
              //     items: 2,
              //     margin: 20,
              //     stagePadding: 50,
              //     dots: false,
              //   },
              //   991: {
              //     items: 4,
              //     margin: 70,
              //     dots: false,
              //   },
              //   1000: {
              //     items: 2,
              //     margin: 20,
              //     stagePadding: 100,
              //     dots: false,
              //   },
              //   1200: {
              //     items: 2,
              //     margin: 20,
              //     stagePadding: 200,
              //     dots: false,
              //     navText: ['<img src="' + leftArrow1 + '">', '<img src="' + rightArrow1 + '">'],
              //   },
              //   1300: {
              //     items: 3,
              //     margin: 30,
              //     stagePadding: 150,
              //     dots: false,
              //     navText: ['<img src="' + leftArrow1 + '">', '<img src="' + rightArrow1 + '">'],
              //   },
              //   1600: {
              //     stagePadding: 280,
              //     items: 3,
              //     margin: 30,
              //     dots: false,

              //   },
              // }}
            >
              <div class="testmonial-content-mar">
                <div className="card testmonial-content-card">
                  <div className="card-body testmonial-content-body">
                    <span className="testmonial-thumb">
                      <img
                        src={pak}
                        className="img-responsive left-right-auto"
                        alt="..."
                      />
                    </span>
                    <span className="testmonial-design">
                      <img
                        src={commentsDot}
                        className="img-responsive left-right-auto"
                        alt="..."
                      />
                    </span>
                    <span className="tesmonial-svg-btm">
                      <svg
                        width="41"
                        height="35"
                        viewBox="0 0 41 35"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M2.22005 24.2759C10.3641 22.6679 15.5534 15.4972 15.5534 8.64255C15.5534 3.34921 11.8387 0.275879 7.81872 0.275879C4.33205 0.275879 0.886719 2.67188 0.886719 6.91455C0.886719 10.3825 3.42672 13.2572 6.74805 13.7799C6.45872 16.4519 3.86139 20.3279 0.908052 21.4412L2.22005 24.2759ZM9.67207 11.5412C9.80274 13.1919 9.43607 16.0452 7.43074 19.1252C11.0041 16.4359 12.8867 12.2745 12.8867 8.64255C12.8867 4.72655 10.2587 2.94255 7.81874 2.94255C2.0774 2.94255 1.49607 11.6759 9.67207 11.5412ZM27.0054 11.5412C27.1361 13.1919 26.7694 16.0452 24.7641 19.1252C28.3374 16.4359 30.2201 12.2745 30.2201 8.64255C30.2201 4.72655 27.5921 2.94255 25.1521 2.94255C19.4107 2.94255 18.8294 11.6759 27.0054 11.5412ZM32.8864 8.64255C32.8864 15.4972 27.6971 22.6679 19.5531 24.2759L18.2411 21.4412C21.1944 20.3279 23.7917 16.4519 24.0811 13.7799C20.7597 13.2572 18.2197 10.3825 18.2197 6.91455C18.2197 2.67188 21.6651 0.275879 25.1517 0.275879C29.1717 0.275879 32.8864 3.34921 32.8864 8.64255Z"
                          fill="#AA8453"
                        />
                      </svg>
                    </span>
                    <span className="comment">
                      Superb! Room was pretty clean and area is best to have
                      access to markets.
                    </span>
                    <span className="comment-name">
                      <h5>Muhammad</h5>
                      <p>Pakistan</p>
                    </span>
                  </div>
                </div>
              </div>
              <div class="testmonial-content-mar">
                <div className="card testmonial-content-card">
                  <div className="card-body testmonial-content-body">
                    <span className="testmonial-thumb">
                      <img
                        src={england}
                        className="img-responsive left-right-auto"
                        alt="..."
                      />
                    </span>
                    <span className="testmonial-design">
                      <img
                        src={commentsDot}
                        className="img-responsive left-right-auto"
                        alt="..."
                      />
                    </span>
                    <span className="tesmonial-svg-btm">
                      <svg
                        width="41"
                        height="35"
                        viewBox="0 0 41 35"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M2.22005 24.2759C10.3641 22.6679 15.5534 15.4972 15.5534 8.64255C15.5534 3.34921 11.8387 0.275879 7.81872 0.275879C4.33205 0.275879 0.886719 2.67188 0.886719 6.91455C0.886719 10.3825 3.42672 13.2572 6.74805 13.7799C6.45872 16.4519 3.86139 20.3279 0.908052 21.4412L2.22005 24.2759ZM9.67207 11.5412C9.80274 13.1919 9.43607 16.0452 7.43074 19.1252C11.0041 16.4359 12.8867 12.2745 12.8867 8.64255C12.8867 4.72655 10.2587 2.94255 7.81874 2.94255C2.0774 2.94255 1.49607 11.6759 9.67207 11.5412ZM27.0054 11.5412C27.1361 13.1919 26.7694 16.0452 24.7641 19.1252C28.3374 16.4359 30.2201 12.2745 30.2201 8.64255C30.2201 4.72655 27.5921 2.94255 25.1521 2.94255C19.4107 2.94255 18.8294 11.6759 27.0054 11.5412ZM32.8864 8.64255C32.8864 15.4972 27.6971 22.6679 19.5531 24.2759L18.2411 21.4412C21.1944 20.3279 23.7917 16.4519 24.0811 13.7799C20.7597 13.2572 18.2197 10.3825 18.2197 6.91455C18.2197 2.67188 21.6651 0.275879 25.1517 0.275879C29.1717 0.275879 32.8864 3.34921 32.8864 8.64255Z"
                          fill="#AA8453"
                        />
                      </svg>
                    </span>
                    <span className="comment">
                      I have always loved the level of security and comfort this
                      property provides, especially for solo female travellers.
                    </span>
                    <span className="comment-name">
                      <h5>Ana</h5>
                      <p>England</p>
                    </span>
                  </div>
                </div>
              </div>
              <div class="testmonial-content-mar">
                <div className="card testmonial-content-card">
                  <div className="card-body testmonial-content-body">
                    <span className="testmonial-thumb">
                      <img
                        src={pak}
                        className="img-responsive left-right-auto"
                        alt="..."
                      />
                    </span>
                    <span className="testmonial-design">
                      <img
                        src={commentsDot}
                        className="img-responsive left-right-auto"
                        alt="..."
                      />
                    </span>
                    <span className="tesmonial-svg-btm">
                      <svg
                        width="41"
                        height="35"
                        viewBox="0 0 41 35"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M2.22005 24.2759C10.3641 22.6679 15.5534 15.4972 15.5534 8.64255C15.5534 3.34921 11.8387 0.275879 7.81872 0.275879C4.33205 0.275879 0.886719 2.67188 0.886719 6.91455C0.886719 10.3825 3.42672 13.2572 6.74805 13.7799C6.45872 16.4519 3.86139 20.3279 0.908052 21.4412L2.22005 24.2759ZM9.67207 11.5412C9.80274 13.1919 9.43607 16.0452 7.43074 19.1252C11.0041 16.4359 12.8867 12.2745 12.8867 8.64255C12.8867 4.72655 10.2587 2.94255 7.81874 2.94255C2.0774 2.94255 1.49607 11.6759 9.67207 11.5412ZM27.0054 11.5412C27.1361 13.1919 26.7694 16.0452 24.7641 19.1252C28.3374 16.4359 30.2201 12.2745 30.2201 8.64255C30.2201 4.72655 27.5921 2.94255 25.1521 2.94255C19.4107 2.94255 18.8294 11.6759 27.0054 11.5412ZM32.8864 8.64255C32.8864 15.4972 27.6971 22.6679 19.5531 24.2759L18.2411 21.4412C21.1944 20.3279 23.7917 16.4519 24.0811 13.7799C20.7597 13.2572 18.2197 10.3825 18.2197 6.91455C18.2197 2.67188 21.6651 0.275879 25.1517 0.275879C29.1717 0.275879 32.8864 3.34921 32.8864 8.64255Z"
                          fill="#AA8453"
                        />
                      </svg>
                    </span>
                    <span className="comment">
                      The location was amazing as all the cool places to eat and
                      visit were under 5 mins walk and a min drive. A very
                      comfortable, peaceful place to stay at.
                    </span>
                    <span className="comment-name">
                      <h5>Fatima</h5>
                      <p>Pakistan</p>
                    </span>
                  </div>
                </div>
              </div>
              <div class="testmonial-content-mar">
                <div className="card testmonial-content-card">
                  <div className="card-body testmonial-content-body">
                    <span className="testmonial-thumb">
                      <img
                        src={uae}
                        className="img-responsive left-right-auto"
                        alt="..."
                      />
                    </span>
                    <span className="testmonial-design">
                      <img
                        src={dots}
                        className="img-responsive left-right-auto"
                        alt="..."
                      />
                    </span>

                    <span className="tesmonial-svg-btm">
                      <svg
                        width="41"
                        height="35"
                        viewBox="0 0 41 35"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M2.22005 24.2759C10.3641 22.6679 15.5534 15.4972 15.5534 8.64255C15.5534 3.34921 11.8387 0.275879 7.81872 0.275879C4.33205 0.275879 0.886719 2.67188 0.886719 6.91455C0.886719 10.3825 3.42672 13.2572 6.74805 13.7799C6.45872 16.4519 3.86139 20.3279 0.908052 21.4412L2.22005 24.2759ZM9.67207 11.5412C9.80274 13.1919 9.43607 16.0452 7.43074 19.1252C11.0041 16.4359 12.8867 12.2745 12.8867 8.64255C12.8867 4.72655 10.2587 2.94255 7.81874 2.94255C2.0774 2.94255 1.49607 11.6759 9.67207 11.5412ZM27.0054 11.5412C27.1361 13.1919 26.7694 16.0452 24.7641 19.1252C28.3374 16.4359 30.2201 12.2745 30.2201 8.64255C30.2201 4.72655 27.5921 2.94255 25.1521 2.94255C19.4107 2.94255 18.8294 11.6759 27.0054 11.5412ZM32.8864 8.64255C32.8864 15.4972 27.6971 22.6679 19.5531 24.2759L18.2411 21.4412C21.1944 20.3279 23.7917 16.4519 24.0811 13.7799C20.7597 13.2572 18.2197 10.3825 18.2197 6.91455C18.2197 2.67188 21.6651 0.275879 25.1517 0.275879C29.1717 0.275879 32.8864 3.34921 32.8864 8.64255Z"
                          fill="#AA8453"
                        />
                      </svg>
                    </span>
                    <span className="comment">
                      Good value for money in good location with friendly staff.
                    </span>
                    <span className="comment-name">
                      <h5>Sameer</h5>
                      <p>Kuwait</p>
                    </span>
                  </div>
                </div>
              </div>
              <div class="testmonial-content-mar">
                <div className="card testmonial-content-card">
                  <div className="card-body testmonial-content-body">
                    <span className="testmonial-thumb">
                      <img
                        src={newzeland}
                        className="img-responsive left-right-auto"
                        alt="..."
                      />
                    </span>
                    <span className="testmonial-design">
                      <img
                        src={commentsDot}
                        className="img-responsive left-right-auto"
                        alt="..."
                      />
                    </span>

                    <span className="tesmonial-svg-btm">
                      <svg
                        width="41"
                        height="35"
                        viewBox="0 0 41 35"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M2.22005 24.2759C10.3641 22.6679 15.5534 15.4972 15.5534 8.64255C15.5534 3.34921 11.8387 0.275879 7.81872 0.275879C4.33205 0.275879 0.886719 2.67188 0.886719 6.91455C0.886719 10.3825 3.42672 13.2572 6.74805 13.7799C6.45872 16.4519 3.86139 20.3279 0.908052 21.4412L2.22005 24.2759ZM9.67207 11.5412C9.80274 13.1919 9.43607 16.0452 7.43074 19.1252C11.0041 16.4359 12.8867 12.2745 12.8867 8.64255C12.8867 4.72655 10.2587 2.94255 7.81874 2.94255C2.0774 2.94255 1.49607 11.6759 9.67207 11.5412ZM27.0054 11.5412C27.1361 13.1919 26.7694 16.0452 24.7641 19.1252C28.3374 16.4359 30.2201 12.2745 30.2201 8.64255C30.2201 4.72655 27.5921 2.94255 25.1521 2.94255C19.4107 2.94255 18.8294 11.6759 27.0054 11.5412ZM32.8864 8.64255C32.8864 15.4972 27.6971 22.6679 19.5531 24.2759L18.2411 21.4412C21.1944 20.3279 23.7917 16.4519 24.0811 13.7799C20.7597 13.2572 18.2197 10.3825 18.2197 6.91455C18.2197 2.67188 21.6651 0.275879 25.1517 0.275879C29.1717 0.275879 32.8864 3.34921 32.8864 8.64255Z"
                          fill="#AA8453"
                        />
                      </svg>
                    </span>
                    <span className="comment">
                      Excellent pllace to stay in Islamabad. The staff was very
                      helpful and polite.The breakfast was very good and the
                      location is near restaurants.
                    </span>
                    <span className="comment-name">
                      <h5>Belinda</h5>
                      <p>Germany</p>
                    </span>
                  </div>
                </div>
              </div>
              <div class="testmonial-content-mar">
                <div className="card testmonial-content-card">
                  <div className="card-body testmonial-content-body">
                    <span className="testmonial-thumb">
                      <img
                        src={usa}
                        className="img-responsive left-right-auto"
                        alt="..."
                      />
                    </span>
                    <span className="testmonial-design">
                      <img
                        src={commentsDot}
                        className="img-responsive left-right-auto"
                        alt="..."
                      />
                    </span>

                    <span className="tesmonial-svg-btm">
                      <svg
                        width="41"
                        height="35"
                        viewBox="0 0 41 35"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M2.22005 24.2759C10.3641 22.6679 15.5534 15.4972 15.5534 8.64255C15.5534 3.34921 11.8387 0.275879 7.81872 0.275879C4.33205 0.275879 0.886719 2.67188 0.886719 6.91455C0.886719 10.3825 3.42672 13.2572 6.74805 13.7799C6.45872 16.4519 3.86139 20.3279 0.908052 21.4412L2.22005 24.2759ZM9.67207 11.5412C9.80274 13.1919 9.43607 16.0452 7.43074 19.1252C11.0041 16.4359 12.8867 12.2745 12.8867 8.64255C12.8867 4.72655 10.2587 2.94255 7.81874 2.94255C2.0774 2.94255 1.49607 11.6759 9.67207 11.5412ZM27.0054 11.5412C27.1361 13.1919 26.7694 16.0452 24.7641 19.1252C28.3374 16.4359 30.2201 12.2745 30.2201 8.64255C30.2201 4.72655 27.5921 2.94255 25.1521 2.94255C19.4107 2.94255 18.8294 11.6759 27.0054 11.5412ZM32.8864 8.64255C32.8864 15.4972 27.6971 22.6679 19.5531 24.2759L18.2411 21.4412C21.1944 20.3279 23.7917 16.4519 24.0811 13.7799C20.7597 13.2572 18.2197 10.3825 18.2197 6.91455C18.2197 2.67188 21.6651 0.275879 25.1517 0.275879C29.1717 0.275879 32.8864 3.34921 32.8864 8.64255Z"
                          fill="#AA8453"
                        />
                      </svg>
                    </span>
                    <span className="comment">
                      The location is the best, very quiet yet convenient, close
                      to super market and restuarants.
                    </span>
                    <span className="comment-name">
                      <h5>Akbar</h5>
                      <p>USA</p>
                    </span>
                  </div>
                </div>
              </div>
              <div class="testmonial-content-mar">
                <div className="card testmonial-content-card">
                  <div className="card-body testmonial-content-body">
                    <span className="testmonial-thumb">
                      <img
                        src={pak}
                        className="img-responsive left-right-auto"
                        alt="..."
                      />
                    </span>
                    <span className="testmonial-design">
                      <img
                        src={commentsDot}
                        className="img-responsive left-right-auto"
                        alt="..."
                      />
                    </span>

                    <span className="tesmonial-svg-btm">
                      <svg
                        width="41"
                        height="35"
                        viewBox="0 0 41 35"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M2.22005 24.2759C10.3641 22.6679 15.5534 15.4972 15.5534 8.64255C15.5534 3.34921 11.8387 0.275879 7.81872 0.275879C4.33205 0.275879 0.886719 2.67188 0.886719 6.91455C0.886719 10.3825 3.42672 13.2572 6.74805 13.7799C6.45872 16.4519 3.86139 20.3279 0.908052 21.4412L2.22005 24.2759ZM9.67207 11.5412C9.80274 13.1919 9.43607 16.0452 7.43074 19.1252C11.0041 16.4359 12.8867 12.2745 12.8867 8.64255C12.8867 4.72655 10.2587 2.94255 7.81874 2.94255C2.0774 2.94255 1.49607 11.6759 9.67207 11.5412ZM27.0054 11.5412C27.1361 13.1919 26.7694 16.0452 24.7641 19.1252C28.3374 16.4359 30.2201 12.2745 30.2201 8.64255C30.2201 4.72655 27.5921 2.94255 25.1521 2.94255C19.4107 2.94255 18.8294 11.6759 27.0054 11.5412ZM32.8864 8.64255C32.8864 15.4972 27.6971 22.6679 19.5531 24.2759L18.2411 21.4412C21.1944 20.3279 23.7917 16.4519 24.0811 13.7799C20.7597 13.2572 18.2197 10.3825 18.2197 6.91455C18.2197 2.67188 21.6651 0.275879 25.1517 0.275879C29.1717 0.275879 32.8864 3.34921 32.8864 8.64255Z"
                          fill="#AA8453"
                        />
                      </svg>
                    </span>
                    <span className="comment">
                      Fabulous Service! Breakfast was simply awesome 10/10.
                      Ordered omlette, parathas, aalo bhojia & aalo qeema. Each
                      and every thing was top drawer.
                    </span>
                    <span className="comment-name">
                      <h5>Nadeem</h5>
                      <p>Pakistan</p>
                    </span>
                  </div>
                </div>
              </div>
              <div class="testmonial-content-mar">
                <div className="card testmonial-content-card">
                  <div className="card-body testmonial-content-body">
                    <span className="testmonial-thumb">
                      <img
                        src={pak}
                        className="img-responsive left-right-auto"
                        alt="..."
                      />
                    </span>
                    <span className="testmonial-design">
                      <img
                        src={commentsDot}
                        className="img-responsive left-right-auto"
                        alt="..."
                      />
                    </span>

                    <span className="tesmonial-svg-btm">
                      <svg
                        width="41"
                        height="35"
                        viewBox="0 0 41 35"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M2.22005 24.2759C10.3641 22.6679 15.5534 15.4972 15.5534 8.64255C15.5534 3.34921 11.8387 0.275879 7.81872 0.275879C4.33205 0.275879 0.886719 2.67188 0.886719 6.91455C0.886719 10.3825 3.42672 13.2572 6.74805 13.7799C6.45872 16.4519 3.86139 20.3279 0.908052 21.4412L2.22005 24.2759ZM9.67207 11.5412C9.80274 13.1919 9.43607 16.0452 7.43074 19.1252C11.0041 16.4359 12.8867 12.2745 12.8867 8.64255C12.8867 4.72655 10.2587 2.94255 7.81874 2.94255C2.0774 2.94255 1.49607 11.6759 9.67207 11.5412ZM27.0054 11.5412C27.1361 13.1919 26.7694 16.0452 24.7641 19.1252C28.3374 16.4359 30.2201 12.2745 30.2201 8.64255C30.2201 4.72655 27.5921 2.94255 25.1521 2.94255C19.4107 2.94255 18.8294 11.6759 27.0054 11.5412ZM32.8864 8.64255C32.8864 15.4972 27.6971 22.6679 19.5531 24.2759L18.2411 21.4412C21.1944 20.3279 23.7917 16.4519 24.0811 13.7799C20.7597 13.2572 18.2197 10.3825 18.2197 6.91455C18.2197 2.67188 21.6651 0.275879 25.1517 0.275879C29.1717 0.275879 32.8864 3.34921 32.8864 8.64255Z"
                          fill="#AA8453"
                        />
                      </svg>
                    </span>
                    <span className="comment">
                      Brilliant stay, will definitely be coming a third time.The
                      staff is absolutely delightful! Such a great facility at a
                      perfect location.
                    </span>
                    <span className="comment-name">
                      <h5>Ammarah</h5>
                      <p>Pakistan</p>
                    </span>
                  </div>
                </div>
              </div>
              <div class="testmonial-content-mar">
                <div className="card testmonial-content-card">
                  <div className="card-body testmonial-content-body">
                    <span className="testmonial-thumb">
                      <img
                        src={usa}
                        className="img-responsive left-right-auto"
                        alt="..."
                      />
                    </span>
                    <span className="testmonial-design">
                      <img
                        src={commentsDot}
                        className="img-responsive left-right-auto"
                        alt="..."
                      />
                    </span>

                    <span className="tesmonial-svg-btm">
                      <svg
                        width="41"
                        height="35"
                        viewBox="0 0 41 35"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M2.22005 24.2759C10.3641 22.6679 15.5534 15.4972 15.5534 8.64255C15.5534 3.34921 11.8387 0.275879 7.81872 0.275879C4.33205 0.275879 0.886719 2.67188 0.886719 6.91455C0.886719 10.3825 3.42672 13.2572 6.74805 13.7799C6.45872 16.4519 3.86139 20.3279 0.908052 21.4412L2.22005 24.2759ZM9.67207 11.5412C9.80274 13.1919 9.43607 16.0452 7.43074 19.1252C11.0041 16.4359 12.8867 12.2745 12.8867 8.64255C12.8867 4.72655 10.2587 2.94255 7.81874 2.94255C2.0774 2.94255 1.49607 11.6759 9.67207 11.5412ZM27.0054 11.5412C27.1361 13.1919 26.7694 16.0452 24.7641 19.1252C28.3374 16.4359 30.2201 12.2745 30.2201 8.64255C30.2201 4.72655 27.5921 2.94255 25.1521 2.94255C19.4107 2.94255 18.8294 11.6759 27.0054 11.5412ZM32.8864 8.64255C32.8864 15.4972 27.6971 22.6679 19.5531 24.2759L18.2411 21.4412C21.1944 20.3279 23.7917 16.4519 24.0811 13.7799C20.7597 13.2572 18.2197 10.3825 18.2197 6.91455C18.2197 2.67188 21.6651 0.275879 25.1517 0.275879C29.1717 0.275879 32.8864 3.34921 32.8864 8.64255Z"
                          fill="#AA8453"
                        />
                      </svg>
                    </span>
                    <span className="comment">
                      Recommended for foreigners and locals! The location is
                      perfect, nearby and a very safe neighborhood.
                    </span>
                    <span className="comment-name">
                      <h5>Mohamed</h5>
                      <p>Jordan</p>
                    </span>
                  </div>
                </div>
              </div>
              <div class="testmonial-content-mar">
                <div className="card testmonial-content-card">
                  <div className="card-body testmonial-content-body">
                    <span className="testmonial-thumb">
                      <img
                        src={pak}
                        className="img-responsive left-right-auto"
                        alt="..."
                      />
                    </span>
                    <span className="testmonial-design">
                      <img
                        src={commentsDot}
                        className="img-responsive left-right-auto"
                        alt="..."
                      />
                    </span>

                    <span className="tesmonial-svg-btm">
                      <svg
                        width="41"
                        height="35"
                        viewBox="0 0 41 35"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M2.22005 24.2759C10.3641 22.6679 15.5534 15.4972 15.5534 8.64255C15.5534 3.34921 11.8387 0.275879 7.81872 0.275879C4.33205 0.275879 0.886719 2.67188 0.886719 6.91455C0.886719 10.3825 3.42672 13.2572 6.74805 13.7799C6.45872 16.4519 3.86139 20.3279 0.908052 21.4412L2.22005 24.2759ZM9.67207 11.5412C9.80274 13.1919 9.43607 16.0452 7.43074 19.1252C11.0041 16.4359 12.8867 12.2745 12.8867 8.64255C12.8867 4.72655 10.2587 2.94255 7.81874 2.94255C2.0774 2.94255 1.49607 11.6759 9.67207 11.5412ZM27.0054 11.5412C27.1361 13.1919 26.7694 16.0452 24.7641 19.1252C28.3374 16.4359 30.2201 12.2745 30.2201 8.64255C30.2201 4.72655 27.5921 2.94255 25.1521 2.94255C19.4107 2.94255 18.8294 11.6759 27.0054 11.5412ZM32.8864 8.64255C32.8864 15.4972 27.6971 22.6679 19.5531 24.2759L18.2411 21.4412C21.1944 20.3279 23.7917 16.4519 24.0811 13.7799C20.7597 13.2572 18.2197 10.3825 18.2197 6.91455C18.2197 2.67188 21.6651 0.275879 25.1517 0.275879C29.1717 0.275879 32.8864 3.34921 32.8864 8.64255Z"
                          fill="#AA8453"
                        />
                      </svg>
                    </span>
                    <span className="comment">
                      Chicken ginger with great fattoush. Best parathay! Guard
                      chacha is amazingly helpful, brought out an umbrella for
                      us everytime we arrived during the rain.
                    </span>
                    <span className="comment-name">
                      <h5>Rizwan</h5>
                      <p>Pakistan</p>
                    </span>
                  </div>
                </div>
              </div>
            </Slider>
          </div>
        </section>

        <section className="tourist-attraction">
          <TouristAttraction />
        </section>
        <section className="section-bns">
          <Container>
            <Grid container spacing={3}>
              <Grid item sm={12} lg={6} className="d-flex">
                <div className="bns-div-outer">
                  <div className="bns-div-left">
                    <p>
                      BNS Couture A Luxury Life Style.Follow The Latest Trends &
                      Buy Products.{" "}
                    </p>
                    <a href="https://bnscouture.com/" target="_blank">
                      Visit Now
                    </a>
                  </div>
                  <div className="bns-div-right">
                    <img src={luxuaryImgae1} />
                  </div>
                </div>
              </Grid>
              <Grid item sm={12} lg={6} className="d-flex">
                <div className="bns-div-outer">
                  <div className="bns-div-left">
                    <p>
                      Serai Food Street & Artisan Market. Islamabad's Very Own
                      Premium & Speciality Market Place
                    </p>
                    <a href="https://seraibistro.com.pk/" target="_blank">
                      Visit Now
                    </a>
                  </div>
                  <div className="bns-div-right">
                    <img src={luxuaryImgae2} />
                  </div>
                </div>
              </Grid>
            </Grid>
          </Container>
        </section>

        {/* <section
          id="ContactUs"
          className="ContactUs-section overflow-hidden px-0"
        >
          <Grid container>
            <Grid
              item
              sm={12}
              lg={6}
              className={`${classes.contactLeftImage} height-contat-mm height-contat-mm-image contact-leftbanner`}
            >
              <Box sx={{ display: { xs: "block", md: "none" } }}>
                <img src={contactLeft} className="img-responsive img-full" />
              </Box>
            </Grid>
            <Grid item sm={12} lg={6}>
              <div className="form-contact-spacer height-contat-mm">
                <div className="defalut-heading-mainhm">
                  <h2>Contact Us</h2>
                  <p>For the bookings, submit your query through to us</p>
                </div>
                <Grid container>
                    <Grid item xs={12} lg={9} className="text-fields-margin">
                        <FormControl
                        className={`${generalClasses.fullWidth} positionRelative`}
                        >
                        <label className="form-label">Enter Name *</label>
                        <TextField
                            type="text"
                            className="form-control-custome "
                            id="name"
                            name="name"
                            placeholder="Enter Your Name"
                            value={values.name}
                            onChange={handleChange('name')}
                            required
                        />
                        {errors.name && <InputError
                            className="invalid-feedback"
                            message={errors.name}
                        />}
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} lg={9} className="text-fields-margin">
                        <FormControl
                        className={`${generalClasses.fullWidth} positionRelative`}
                        >
                        <label className="form-label">Phone Number *</label>
                        <TextField
                            type="text"
                            className="form-control-custome "
                            id="phone"
                            name="phone"
                            placeholder="Enter Your Number"
                            value={values.phone}
                            onChange={handleChange('phone')}
                        />
                        {errors.phone && <InputError
                            className="invalid-feedback"
                            message={errors.phone}
                        />}
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} lg={9} className="text-fields-margin">
                        <FormControl
                        className={`${generalClasses.fullWidth} positionRelative`}
                        >
                        <label className="form-label">Enter Email *</label>
                        <TextField
                            type="text"
                            className="form-control-custome "
                            id="Email"
                            name="Email"
                            placeholder="Enter Your Email"
                            value={values.Email}
                            onChange={handleChange('Email')}
                            required
                        />
                        {errors.Email && <InputError
                            className="invalid-feedback"
                            message={errors.Email}
                        />}
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} lg={9} className="text-fields-margin">
                        <FormControl
                        className={`${generalClasses.fullWidth} positionRelative`}
                        >
                        <label className="form-label">Message*</label>
                        <TextField
                            className="form-control-custome text-area-height text-area-formpd"
                            id="message"
                            name="message"
                            placeholder="Message:"
                            value={values.message}
                            onChange={handleChange('message')}
                            multiline
                            rows={4}
                            required
                        />
                        {errors.message && <InputError
                            className="invalid-feedback"
                            message={errors.message}
                        />}
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} lg={9} className="text-fields-margin text-center">
                      <div className="contact-form-button" onClick={submitContactUs}>
                        <Button >Submit</Button>
                      </div>
                    </Grid>
                    {
                      props?.loading &&
                      <Grid item xs={12} lg={9}>
                          <p className="wait-para">Please Wait ...!</p>
                      </Grid>
                    }
                </Grid>
                <Grid container>
                    <Grid item>
                        <div className="msgNote text-left"></div>
                    </Grid>
                </Grid>
              </div>
            </Grid>
          </Grid>
        </section> */}
      </div>
      {openRvHouseGal && (
        <Grid container spacing={3}>
          <div>
            <Modal
              className={classes.modal}
              open={openRvHouseGal}
              onClose={handleCloseRvHouseGal}
              closeAfterTransition
              BackdropComponent={Backdrop}
              BackdropProps={{
                timeout: 500,
              }}
            >
              <Fade in={openRvHouseGal}>
                <Grid item xs={12} sm={6} md={4} className={classes.paper}>
                  <ImageGallery
                    items={rvHouseGalSlide}
                    showThumbnails={true}
                    thumbnailPosition={"bottom"}
                    showPlayButton={false}
                    startIndex={currentImageRvHouseGal}
                  />
                  <div
                    className="image-modal-close"
                    onClick={handleCloseRvHouseGal}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="31"
                      height="31"
                      viewBox="0 0 31 31"
                      fill="none"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M15.5 30C23.5081 30 30 23.5081 30 15.5C30 7.49187 23.5081 1 15.5 1C7.49187 1 1 7.49187 1 15.5C1 23.5081 7.49187 30 15.5 30Z"
                        fill="white"
                        fill-opacity="0.9"
                        stroke="#DDDDDD"
                      />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M11.69 11.3277C11.5425 11.3277 11.4097 11.4171 11.3542 11.5538C11.2987 11.6905 11.3316 11.8471 11.4373 11.95L14.9872 15.5L11.4373 19.0499C11.3428 19.1409 11.3048 19.2758 11.3379 19.4027C11.3711 19.5296 11.4702 19.6287 11.5971 19.6619C11.724 19.695 11.8589 19.657 11.9499 19.5626L15.4999 16.0126L19.0498 19.5626C19.1408 19.657 19.2757 19.695 19.4026 19.6619C19.5295 19.6287 19.6286 19.5296 19.6618 19.4027C19.6949 19.2758 19.6569 19.1409 19.5624 19.0499L16.0125 15.5L19.5624 11.95C19.6696 11.8458 19.7019 11.6865 19.6436 11.5488C19.5853 11.4111 19.4485 11.3233 19.299 11.3277C19.2049 11.3305 19.1155 11.3698 19.0498 11.4374L15.4999 14.9874L11.9499 11.4374C11.8817 11.3673 11.7879 11.3277 11.6901 11.3277H11.69Z"
                        fill="#0C0D34"
                      />
                    </svg>
                  </div>
                </Grid>
              </Fade>
            </Modal>
          </div>
        </Grid>
      )}
      {openSerBisGal && (
        <Grid container spacing={3}>
          <div>
            <Modal
              className={classes.modal}
              open={openSerBisGal}
              onClose={handleCloseSerBisGal}
              closeAfterTransition
              BackdropComponent={Backdrop}
              BackdropProps={{
                timeout: 500,
              }}
            >
              <Fade in={openSerBisGal}>
                <Grid item xs={12} sm={6} md={4} className={classes.paper}>
                  <ImageGallery
                    items={serBisGalSlide}
                    showThumbnails={true}
                    thumbnailPosition={"bottom"}
                    showPlayButton={false}
                    startIndex={currentImageSerBisGal}
                  />
                  <div
                    className="image-modal-close"
                    onClick={handleCloseSerBisGal}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="31"
                      height="31"
                      viewBox="0 0 31 31"
                      fill="none"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M15.5 30C23.5081 30 30 23.5081 30 15.5C30 7.49187 23.5081 1 15.5 1C7.49187 1 1 7.49187 1 15.5C1 23.5081 7.49187 30 15.5 30Z"
                        fill="white"
                        fill-opacity="0.9"
                        stroke="#DDDDDD"
                      />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M11.69 11.3277C11.5425 11.3277 11.4097 11.4171 11.3542 11.5538C11.2987 11.6905 11.3316 11.8471 11.4373 11.95L14.9872 15.5L11.4373 19.0499C11.3428 19.1409 11.3048 19.2758 11.3379 19.4027C11.3711 19.5296 11.4702 19.6287 11.5971 19.6619C11.724 19.695 11.8589 19.657 11.9499 19.5626L15.4999 16.0126L19.0498 19.5626C19.1408 19.657 19.2757 19.695 19.4026 19.6619C19.5295 19.6287 19.6286 19.5296 19.6618 19.4027C19.6949 19.2758 19.6569 19.1409 19.5624 19.0499L16.0125 15.5L19.5624 11.95C19.6696 11.8458 19.7019 11.6865 19.6436 11.5488C19.5853 11.4111 19.4485 11.3233 19.299 11.3277C19.2049 11.3305 19.1155 11.3698 19.0498 11.4374L15.4999 14.9874L11.9499 11.4374C11.8817 11.3673 11.7879 11.3277 11.6901 11.3277H11.69Z"
                        fill="#0C0D34"
                      />
                    </svg>
                  </div>
                </Grid>
              </Fade>
            </Modal>
          </div>
        </Grid>
      )}
      <Modal
        open={token != undefined ? true : false}
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
      >
        <Fade in={token != undefined ? true : false}>
          <ResetModal token={token} />
        </Fade>
      </Modal>

      <Modal className={classes.modal} open={isOpen} onClose={closeModal}>
        <YouTube videoId={videoLink} />
      </Modal>
      {openModalCart && <CartModal openModalCart={true} cartItem={cartItem} />}

      {
        //justifyContent="center"
        //alignItems="center"
        // style={{ height: "100%" }} //height: "700px", width: "700px"
      }
      <>
        {props.bannerImage && (
          <Modal open={openBannerModal} onClose={handleCloseModal} className="BannerImageModal">
            <BannerImage
              handleClose={handleCloseModal}
              bannerImage={props.bannerImage}
            />
          </Modal>
        )}
      </>
    </div>
  );
}

//what is needed at start
const mapStateToProps = ({ cmsReducer }) => {
  const {
    loading,
    error,
    success,
    successBooking,
    message,
    roomList,
    loadingRoomList,
    blog,
    successBlog,
    successParam,
    paramData,
    successSetParam,
    loadingParam,
    loadingBannerImage,
    bannerImage,
  } = cmsReducer;
  return {
    loading,
    error,
    success,
    roomList,
    successBooking,
    message,
    loadingRoomList,
    blog,
    successBlog,
    successParam,
    paramData,
    successSetParam,
    loadingParam,
    loadingBannerImage,
    bannerImage,
  };
};
//which actions our function can dispatch
const mapDispatchToProps = (dispatch) => {
  return {
    submitContactUsStart: (data) => dispatch(actions.submitContactUs(data)),
    submitBookingData: (data) => dispatch(actions.submitBooking(data)),
    roomCatListStart: (data) => dispatch(actions.roomCatList(data)),
    getBlogStart: (data) => dispatch(actions.getBlog(data)),
    getSessionIDStart: (data) => dispatch(actions.getSessionID(data)),
    cmsHandlerSuccess: () => dispatch(actions.cmsHandlerSuccess()),
    setParamDataStart: (data) => dispatch(actions.setParam(data)),
    getParamsData: (data) => dispatch(actions.getParam(data)),
    getBannerImage: (data) => dispatch(actions.getBannerImage(data)),
    errorHandlerSuccess: () => dispatch(actions.cmsHandlerSuccess()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Home);
