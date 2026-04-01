import React, { useEffect, useState } from "react";
import { Fragment } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { useStyles } from "./styles";
import { generalStyles } from "../general/general";
import { seraiLogo, seraiLogoMobile, footerIcon, logo2, cart2, cartIcon, cartImage1, cartImage2, deleteIcon, logoutLogo, defaultimageprofile, burgerToggleWhite, burgerToggleBlack } from "../../../assets/images/images";
import Box from '@material-ui/core/Box';
import Button from '@mui/material/Button';
import Container from '@material-ui/core/Container';
import { IconButton } from '@material-ui/core';
import CloseIcon from '@mui/icons-material/Close';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Drawer from '@mui/material/Drawer';
import { Link } from '@material-ui/core';
import "../scss/header.scss";
import '../scss/dropdown.scss';
import Modal from '@material-ui/core/Modal';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import LoginModal from '../auth/authModal'
import { getUserDataFromLocalStorage } from "../../../services/utils";
import { connect } from "react-redux";
import { CONTACT_NO2 } from '../../../environment/index.js';
import UseAnalyticsEventTracker from '../../../components/googleAnalytics';
import Badge from '@material-ui/core/Badge';
// import Scrollbars from 'react-custom-scrollbars';
import 'react-perfect-scrollbar/dist/css/styles.css';
import PerfectScrollbar from 'react-perfect-scrollbar'
import { useMediaQuery } from '@material-ui/core'
// import { Slide , Roll , Zoom} from 'react-reveal';
import CartModal from './cart'
import { useCart } from './cartContext'
import { Slide, Roll, Zoom } from 'react-reveal';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import { useHistory } from "react-router-dom"
import moment from 'moment'; 


function Header(props) {
  //let userDetail = getUserDataFromLocalStorage();

  const classes = useStyles();
  const history = useHistory();

  const generalClasses = generalStyles();
  const matches = useMediaQuery('(max-width: 767px)');
  const location = useLocation().pathname;;
  const parts = location.split('/');
  const urlPart = parts[parts.length - 1];
  const urlBooking = parts[parts.length - 2];
  console.log("==========",location)
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [locationQuery, setLocationQuery] = useState('Islamabad');
  const [checkInDate, setCheckInDate] = useState(moment());
  const [checkOutDate, setCheckOutDate] = useState(moment().add(1, 'day'));
  const [numOfAdults, setNumOfAdults] = useState(2);
  const [numOfChildren, setNumOfChildren] = useState(0);
  // const queryParams = {
  //   address: locationQuery, 
  //   fromDate: checkInDate, 
  //   toDate: checkOutDate, 
  //   numOfAdults: numOfAdults, 
  //   numOfChildren: numOfChildren
  // };
  // const searchString = new URLSearchParams(queryParams).toString();

  const { cartItems } = useCart();

  const [profileMenu, setProfileMenu] = React.useState(false);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const [state, setState] = useState({
    values: {
      experience: '',
      proj_comp: '',
      expert_eng: '',
      tw: '',
      fb: '',
      instagram: '',
      phone1: '',
      phone2: '',
      email: '',
      address: '',
      total_emp: '',
      views: '',
    },
  });

  const menuItems = [
    {
      title: 'HOME',
      url: '/',
      param: 0
    },
    // {
    //   title: 'ACCOMMODATIONS',
    //   url: '',
    //   param: 1
    // },
    {
      title: 'BLOGS',
      url: '/home/blog-list',
      param: 2
    },
    {
      title: 'GALLERY',
      url: '/gallery',
      param: 3
    },
    {
      title: 'Rockville House',
      url: 'https://horockville.com',
      param: 4
    },
    {
      title: 'MARKET PLACE',
      url: '/market-place',
      param: 5
    },

    // {
    //   title: 'REVIEWS',
    //   url: '/',
    //   param: 4
    // }, 
    // {
    //   title: 'CONTACT',
    //   url: '/',
    //   param: 5
    // }
  ];

  const MenuItem = ({ item, depthLevel }) => {
    return (
      item.param==4? 
      <ListItem button className="list-item-sidebar">
        <a href={item.url} style={{ paddingLeft: depthLevel * 10, textDecoration: 'none' }} className='sidebar-list-text' target="_blank" >
          <ListItemText onClick={toggleDrawer} primary={item.title} />
        </a>
     </ListItem>:
     <ListItem button className="list-item-sidebar">
      <RouterLink to={{ pathname: item.url, query: (item.param >= 0) ? item?.param : '' }} style={{ paddingLeft: depthLevel * 10, textDecoration: 'none' }} className='sidebar-list-text' >
        <ListItemText onClick={toggleDrawer} primary={item.title} />
      </RouterLink>
    </ListItem>
     
    );
  };


  useEffect(() => {
    if (props?.dataGetConfig?.data[0]) {
      setState(state => ({ ...state, values: { ...state.values, ...props?.dataGetConfig.data[0] } }))
    }
  }, [props?.successGetConfig]);




  //////////Login model////////////

  const [openModal, setOpenModal] = React.useState(false);
  const [openModalCart, setOpenModalCart] = React.useState(false);


  const handleClose = () => {
    setOpenModal(false);
  };
  // const handleCloseCart = () => {
  //   setOpenModalCart(false);
  // };
  const handleOpenCart = () => {
    setOpenModalCart(true)
  };

  const handleMenu = (event) => {
    setProfileMenu(true)
  };

  const handleCloseMenu = () => {
    setProfileMenu(false)

  };

  const accomodations = () => {
    UseAnalyticsEventTracker('Header Accomodations');
  };

  const blogs = () => {
    UseAnalyticsEventTracker('Header Blog');
  };


  const logOut = () => {
    localStorage.removeItem('guest');
    setProfileMenu(false)
    // window.location.reload();
  };

  // Change color of header on scrolling 
  const listenScrollEvent = e => {
    if (window.scrollY > 0)
      setScrolled(true);
    else
      setScrolled(false);
  }

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    window.addEventListener('scroll', listenScrollEvent)
  });

  useEffect(() => {
    function handleClickOutside(event) {
      const clickedInside = event.target.closest('.cart-div');
      const clickedInsides = event.target.closest('.profile-menu');
      if (!clickedInside && !clickedInsides) {
        setOpenModalCart(false);
        setProfileMenu(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (

    <div className={generalClasses.root}>
      <AppBar position="fixed" className={scrolled || urlPart == 'no-data'|| urlPart == 'decline' || urlPart == 'booking-list' || urlPart == 'room-details' || urlPart == 'blog-list' || urlPart == 'booking-detail' || urlBooking == 'booking-confirm' || urlPart == 'my-account' || urlPart == 'faqs' || urlPart == 'gallery' || urlPart == 'market-place' || urlPart == 'privacy-policy' || urlPart == 'refund-policy' || urlPart == 'complaint-policy' || urlPart == 'legal-notice' || urlPart == 'terms-and-conditions' ? `navbar-white-fixed` : `navbar-transparent-fixed`}>
        <Toolbar disableGutters >
          <Container fixed className="bar-width">
            <div className='navbar-inner'>
              <div className='navbar-center'>
                <Box sx={{ display: { lg: 'none' } }}>
                  <div className="burger-toggle">
                    {
                      <Fragment key='left'>
                        <Button className="burgerbutton" onClick={toggleDrawer}>
                        <img src={scrolled || urlPart == 'no-data'|| urlPart == 'decline' || urlPart == 'booking-list' || urlPart == 'room-details' || urlPart == 'blog-list' || urlPart == 'booking-detail' || urlBooking == 'booking-confirm' || urlPart == 'my-account' || urlPart == 'faqs' || urlPart == 'gallery'   || urlPart == 'market-place' || urlPart == 'privacy-policy' || urlPart == 'refund-policy' || urlPart == 'complaint-policy' || urlPart == 'legal-notice' || urlPart == 'terms-and-conditions' ? burgerToggleBlack:burgerToggleWhite} alt="" />
                        </Button>
                        <Drawer
                          anchor='right'
                          className={classes.fullDrawerNav}
                          open={drawerOpen}
                          onClose={toggleDrawer}
                        >
                          <div className='drawer-logo'>
                            <img src={seraiLogoMobile} alt="logo" />
                            {/* <IconButton aria-label="Close" style={{ padding: '0.5rem 0rem 0.5rem 0.5rem' }} onClick={toggleDrawer}>
                              <CloseIcon />
                            </IconButton> */}
                            <button class="cross-header-drawer" onClick={toggleDrawer}>
                              <svg width="37" height="37" viewBox="0 0 37 37" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M18.5 37C28.7173 37 37 28.7173 37 18.5C37 8.28273 28.7173 0 18.5 0C8.28273 0 0 8.28273 0 18.5C0 28.7173 8.28273 37 18.5 37Z" fill="#2B2B2B"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M13.6395 13.176C13.4513 13.176 13.2819 13.2901 13.2111 13.4645C13.1403 13.6388 13.1822 13.8387 13.3171 13.97L17.8463 18.4993L13.3171 23.0285C13.1965 23.1446 13.148 23.3167 13.1903 23.4786C13.2326 23.6405 13.3591 23.767 13.521 23.8093C13.6829 23.8516 13.855 23.8031 13.9711 23.6825L18.5003 19.1533L23.0296 23.6825C23.1457 23.8031 23.3178 23.8516 23.4797 23.8093C23.6416 23.767 23.7681 23.6405 23.8104 23.4786C23.8526 23.3167 23.8042 23.1446 23.6836 23.0285L19.1544 18.4993L23.6836 13.97C23.8204 13.837 23.8615 13.6337 23.7872 13.4581C23.7128 13.2824 23.5383 13.1704 23.3476 13.176C23.2274 13.1796 23.1134 13.2298 23.0296 13.316L18.5004 17.8453L13.9711 13.316C13.884 13.2265 13.7644 13.176 13.6396 13.176H13.6395Z" fill="white"></path></svg>
                            </button>
                          </div>
                          <div className='sidebar-drawer'>
                            {menuItems.map((item, key) => <MenuItem key={key} item={item} depthLevel={0} />)}
                          </div>
                          <div className="profile-nav">
                              <a href="/">
                                <Button variant="contained" >
                                  LOGIN
                                </Button>
                              </a>
                              {(location == "/") &&
                                <a href={"tel:" + CONTACT_NO2} onClick={() => UseAnalyticsEventTracker('CallNow')}>
                                  <Button className="callnw" variant="contained" >
                                    CALL NOW
                                  </Button>
                                </a>
                              }
                          </div>
                          
                          <div className='left-social-mobile'>
                            <ul>
                              <li>
                                <Link href="https://www.facebook.com/experienceserai" target="_blank">
                                  <span>
                                    <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                                      <path fillRule="evenodd" clipRule="evenodd" d="M11.2613 0.211729C8.40807 0.505172 5.71823 1.78698 3.66913 3.82961C2.06091 5.43279 0.903208 7.47631 0.365467 9.66127C0.124794 10.6393 0.0412544 11.2511 0.00710357 12.2861C-0.139054 16.7176 1.97707 20.7701 5.72093 23.2284C7.19814 24.1984 8.90876 24.8441 10.7468 25.1257C11.5776 25.253 13.4927 25.253 14.3236 25.1257C17.0616 24.7063 19.4708 23.4938 21.4003 21.5642C23.0437 19.9209 24.1588 17.9517 24.7082 15.7228C24.8852 15.0046 25.0294 14.135 25.0294 13.7859C25.0294 13.6764 25.0514 13.5732 25.0784 13.5565C25.1081 13.5382 25.1274 13.1794 25.1274 12.6443C25.1274 12.0688 25.1104 11.7729 25.0784 11.7926C25.0487 11.811 25.0294 11.7422 25.0294 11.6181C25.0294 11.2635 24.8863 10.398 24.7082 9.67539C24.0113 6.84802 22.3715 4.39033 20.0072 2.62987C18.1511 1.24782 16.0495 0.437899 13.7182 0.206291C13.1261 0.147445 11.8587 0.150287 11.2613 0.211729ZM11.5797 0.773087C9.66435 0.965694 7.91996 1.5248 6.42604 2.42492C3.24016 4.34442 1.23085 7.39242 0.670571 11.1557C0.571695 11.82 0.586198 13.7062 0.695657 14.404C1.1063 17.023 2.26238 19.3209 4.08791 21.1463C5.91363 22.9721 8.27332 24.1566 10.8472 24.5393C11.6517 24.6589 13.4098 24.6603 14.2039 24.542C19.5206 23.7495 23.5856 19.6845 24.3781 14.3678C24.495 13.5833 24.495 11.8149 24.3781 11.0303C23.8598 7.55333 21.931 4.54443 19.0006 2.64163C17.627 1.74969 15.9877 1.13366 14.2746 0.865593C13.8059 0.792245 12.004 0.730411 11.5797 0.773087ZM12.8537 6.31469C12.1543 6.40744 11.5298 6.77933 11.1421 7.33392C10.7347 7.91679 10.6739 8.17588 10.6736 9.33055L10.6733 10.2492H10.1795C9.69918 10.2492 9.68194 10.2531 9.54259 10.3925L9.39937 10.5357V11.5967V12.6576L9.54259 12.8009C9.68194 12.9402 9.69918 12.9441 10.1795 12.9441H10.6733V15.8811V18.8182L10.7915 18.9557L10.9098 19.0932H12.1869H13.4639L13.5997 18.9574L13.7356 18.8215L13.749 15.8828L13.7623 12.9441H14.4689C15.4901 12.9441 15.4679 12.973 15.5761 11.4959C15.6098 11.0362 15.6226 10.6011 15.6044 10.5291C15.5457 10.2951 15.3684 10.2492 14.522 10.2492H13.7601V9.69557C13.7601 9.33025 13.7801 9.12192 13.8189 9.08311C13.859 9.04303 14.0944 9.02431 14.5587 9.02431C15.3084 9.02431 15.5147 8.97081 15.6152 8.75018C15.651 8.67164 15.671 8.27618 15.671 7.64765C15.671 6.55325 15.6427 6.42944 15.3712 6.33478C15.2241 6.28353 13.2099 6.26741 12.8537 6.31469ZM12.8292 6.92401C12.2438 7.01985 11.6934 7.43417 11.4251 7.98083L11.2858 8.26486L11.2705 9.55103L11.2553 10.8372H10.6213H9.98733V11.5967V12.3561H10.6243H11.2613V15.444V18.5318L12.2044 18.5185L13.1476 18.5052L13.1603 15.4318L13.1729 12.3584L14.0422 12.345L14.9115 12.3316L14.9446 11.9151C14.9628 11.6861 14.9917 11.3499 15.0088 11.1679L15.0399 10.8372H14.1061H13.1721V9.91351C13.1721 9.03387 13.1774 8.98193 13.2836 8.82451C13.3448 8.73357 13.4693 8.60902 13.5603 8.54777C13.7125 8.44522 13.7795 8.43635 14.4043 8.43635H15.083V7.6524V6.86845L14.0908 6.87418C13.5451 6.87732 12.9774 6.89976 12.8292 6.92401ZM0.0122972 12.6991C0.0122972 13.1976 0.0195978 13.4016 0.0284662 13.1523C0.0373837 12.903 0.0373837 12.4951 0.0284662 12.2459C0.0195978 11.9966 0.0122972 12.2005 0.0122972 12.6991Z" fill="rgb(14, 151, 255)" />
                                    </svg>
                                  </span>
                                </Link>
                              </li>
                              <li>
                                <Link href="#" target="_blank">
                                  <span>
                                    <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                                      <path fillRule="evenodd" clipRule="evenodd" d="M11.2735 0.135892C7.44195 0.559421 4.13505 2.57202 2.02926 5.76191C1.02531 7.28283 0.382666 8.97131 0.0962299 10.8408C-0.031015 11.6717 -0.031015 13.5868 0.0962299 14.4176C0.515448 17.1541 1.72778 19.5614 3.65924 21.4929C5.7664 23.6001 8.42718 24.8458 11.4221 25.1274C12.1829 25.1989 13.6047 25.1611 14.3358 25.0497C17.9016 24.5068 20.9759 22.5491 22.9918 19.5378C24.0478 17.9602 24.7905 15.9299 24.9723 14.1236C25.0021 13.8272 25.0465 13.5464 25.0708 13.4996C25.1334 13.3794 25.1289 11.684 25.0661 11.7228C25.0364 11.7411 25.0171 11.6723 25.0171 11.5482C25.0171 11.2233 24.8786 10.3538 24.7249 9.71391C24.1786 7.43908 23.049 5.42506 21.388 3.76407C19.4679 1.84392 17.0387 0.618414 14.3358 0.206251C13.733 0.114333 11.8581 0.0712649 11.2735 0.135892ZM11.5674 0.7021C11.4866 0.713125 11.222 0.746296 10.9795 0.775841C8.42634 1.08643 5.94014 2.3114 4.07262 4.17897C2.20324 6.04835 1.06725 8.34616 0.658078 11.0858C0.570618 11.6716 0.570618 13.5869 0.658078 14.1726C1.07034 16.9328 2.20138 19.21 4.09928 21.1009C5.91241 22.9073 8.20885 24.0585 10.8179 24.4691C11.5956 24.5914 13.4502 24.5914 14.2278 24.4691C15.9781 24.1937 17.6045 23.5852 18.9834 22.6899C21.9114 20.7887 23.8115 17.8373 24.3627 14.3342C24.4851 13.5565 24.4851 11.7019 24.3627 10.9243C23.8502 7.66667 22.1776 4.89237 19.5685 2.97193C18.0255 1.83623 16.2679 1.11617 14.2523 0.794068C13.7978 0.721405 11.9017 0.656484 11.5674 0.7021ZM14.8443 6.65978C13.3211 6.82113 12.1309 8.2027 12.1309 9.80931C12.1309 10.0729 12.1133 10.1793 12.0697 10.1791C12.036 10.1789 11.7989 10.147 11.5429 10.1081C10.3168 9.9219 9.10309 9.28185 7.75332 8.1096C6.70905 7.20267 6.6747 7.17832 6.53227 7.24324C6.44848 7.28141 6.35921 7.40699 6.26083 7.62507C6.01163 8.17736 5.98262 8.31064 5.98247 8.90546C5.98228 9.54124 6.07581 9.91014 6.37729 10.4629C6.5136 10.7127 6.52742 10.7613 6.45049 10.7201C6.39836 10.6922 6.28758 10.6693 6.20428 10.6693C5.97821 10.6693 5.93392 10.8268 6.00144 11.3901C6.09669 12.1851 6.35186 12.7316 6.86912 13.2489C7.04032 13.4201 7.15928 13.5602 7.13346 13.5602C7.10759 13.5602 7.05007 13.6157 7.00563 13.6836C6.92954 13.7997 6.93101 13.8241 7.03008 14.0959C7.18613 14.5238 7.35929 14.808 7.66655 15.1405C8.04397 15.549 8.35006 15.7391 9.01867 15.9806C9.10265 16.0109 9.0828 16.0361 8.87168 16.1676C8.54286 16.3724 7.97302 16.575 7.44542 16.6747C7.11058 16.738 6.83963 16.7513 6.26563 16.7325C5.60633 16.7109 5.51181 16.7178 5.44493 16.7917C5.36555 16.8794 5.34566 17.0749 5.40681 17.1661C5.47114 17.262 6.02104 17.6123 6.42942 17.8176C7.6079 18.4098 9.15228 18.6943 10.6668 18.5981C11.688 18.5334 12.7483 18.2328 13.8213 17.7039C15.7226 16.7669 17.0344 15.3126 17.78 13.3152C18.1122 12.4255 18.3535 11.2197 18.3535 10.4504V10.0726L18.7851 9.62375C19.4175 8.96612 19.6764 8.5493 19.6764 8.18903C19.6764 7.94443 19.534 7.95012 18.9604 8.21754L18.5628 8.4029L18.8323 8.02944C19.1624 7.57196 19.282 7.32046 19.2834 7.08032C19.284 6.97929 19.2728 6.89658 19.2585 6.89658C19.2443 6.89658 19.1058 6.96062 18.9507 7.03892C18.5589 7.23667 18.095 7.38322 17.7014 7.43349L17.3677 7.47612L17.0027 7.21418C16.3537 6.74852 15.6682 6.57247 14.8443 6.65978ZM14.5291 7.33192C14.0941 7.47112 13.7705 7.67309 13.4536 8.00308C12.8999 8.57973 12.651 9.35114 12.7656 10.1352C12.8563 10.7551 12.7937 10.8004 11.9155 10.7509C10.3208 10.6609 8.59107 9.81597 7.09549 8.39628C6.89955 8.21034 6.72728 8.07016 6.71263 8.08476C6.69803 8.09941 6.65461 8.2294 6.61625 8.3737C6.48053 8.88346 6.54888 9.5092 6.79249 9.98756C6.84173 10.0842 7.05977 10.4001 7.27707 10.6897C7.7056 11.2606 7.75033 11.3998 7.54812 11.5323C7.42352 11.614 7.04458 11.6088 6.74599 11.5214C6.63119 11.4878 6.62909 11.4923 6.66103 11.7028C6.67902 11.8216 6.77152 12.0781 6.86658 12.2727C7.09691 12.7447 7.41069 13.0172 8.12325 13.3642C8.66912 13.63 8.67662 13.636 8.67662 13.8024C8.67662 14.0245 8.48426 14.14 8.04642 14.1809L7.72387 14.211L7.80825 14.3581C7.8547 14.439 7.99948 14.6232 8.13006 14.7674C8.42291 15.0907 8.80475 15.2817 9.43269 15.4187C10.1186 15.5684 10.2305 15.7374 9.89179 16.1124C9.32308 16.7418 8.23354 17.229 7.19691 17.3173L6.81474 17.3499L7.07251 17.4632C7.42318 17.6173 8.09042 17.8035 8.65212 17.904C9.29628 18.0192 10.7562 18.0188 11.3959 17.9031C12.8901 17.633 14.5108 16.8064 15.5207 15.7996C16.8459 14.4783 17.6633 12.5524 17.7502 10.5469C17.783 9.78853 17.8025 9.74571 18.3317 9.2722C18.5345 9.09062 18.6935 8.93515 18.685 8.92667C18.6765 8.9182 18.5146 8.93525 18.3251 8.9646C17.8979 9.03069 17.7015 8.96234 17.6758 8.73867C17.6621 8.61853 17.7177 8.53788 18.0433 8.20608C18.3355 7.90837 18.3978 7.82287 18.3045 7.84766C17.205 8.14037 17.2272 8.14032 16.8527 7.84776C16.3007 7.41634 15.8043 7.2377 15.1707 7.24221C14.9586 7.24373 14.6853 7.28195 14.5291 7.33192ZM0 12.6292C0 13.1278 0.00730054 13.3317 0.016169 13.0824C0.0250864 12.8331 0.0250864 12.4253 0.016169 12.176C0.00730054 11.9267 0 12.1307 0 12.6292Z" fill="rgb(14, 151, 255)" />
                                    </svg>
                                  </span>
                                </Link>
                              </li>
                              <li>
                                <Link href="https://www.instagram.com/seraiboutiquehotel/" target="_blank">
                                  <span>
                                    <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                                      <path fillRule="evenodd" clipRule="evenodd" d="M11.5676 0.0747927C11.4868 0.086013 11.2112 0.119037 10.9552 0.14819C9.10475 0.358681 7.11381 1.10877 5.47844 2.2115C4.27817 3.02083 2.95368 4.34561 2.14332 5.54745C1.04849 7.17107 0.350475 9.01448 0.0704576 11.0216C-0.0148951 11.6334 -0.0148951 13.5456 0.0704576 14.1574C0.474829 17.0559 1.71078 19.5301 3.75855 21.5407C5.72838 23.4748 8.15127 24.6535 10.9552 25.0416C11.5654 25.1261 13.4808 25.1261 14.091 25.0416C16.9596 24.6445 19.4358 23.416 21.4271 21.4018C22.8444 19.9683 23.8085 18.398 24.431 16.5092C24.7603 15.51 25.0139 14.2524 25.0164 13.6062C25.0169 13.4781 25.0393 13.3734 25.0663 13.3734C25.0971 13.3734 25.115 13.0596 25.1145 12.5282C25.114 11.9644 25.098 11.7075 25.0663 11.7565C25.0321 11.8095 25.0183 11.7615 25.0171 11.5851C25.0105 10.5948 24.5271 8.69257 23.965 7.44481C22.9974 5.29703 21.3692 3.39869 19.3736 2.09185C18.37 1.4346 17.5931 1.06081 16.4428 0.68162C15.1376 0.251378 14.201 0.0970373 12.7436 0.0719999C12.1776 0.0622985 11.6485 0.0635234 11.5676 0.0747927ZM11.5921 0.664471C7.37149 1.05047 3.78776 3.45127 1.86766 7.1791C0.0930451 10.6245 0.153605 14.9125 2.02475 18.2976C2.60855 19.3538 3.18901 20.1295 4.03539 20.9847C5.89007 22.8586 8.19233 24.0215 10.8572 24.4305C11.6425 24.5511 13.4036 24.5511 14.189 24.4305C16.8673 24.0195 19.1577 22.8631 21.011 20.9861C22.8457 19.1279 23.9594 16.8925 24.3641 14.2554C24.4846 13.4701 24.4846 11.7089 24.3641 10.9236C23.9594 8.28643 22.8457 6.05104 21.011 4.19284C19.1709 2.32929 16.856 1.15503 14.238 0.757173C13.7424 0.681865 12.0502 0.622578 11.5921 0.664471ZM9.87562 6.12253C8.37985 6.23179 7.35968 6.75395 6.71807 7.73879C6.11384 8.66611 6.00795 9.38955 6.00795 12.5895C6.00795 14.5619 6.05935 15.6379 6.17802 16.1497C6.46514 17.3877 7.21504 18.293 8.31566 18.7304C8.83914 18.9384 9.20941 19.0048 10.1712 19.063C11.259 19.1288 15.1638 19.0898 15.7079 19.0077C17.1256 18.7939 18.1855 18.0011 18.6643 16.796C18.972 16.0217 19.0382 15.2773 19.0382 12.5895C19.0382 10.6171 18.9868 9.54105 18.8681 9.02923C18.5057 7.46691 17.4612 6.4955 15.8138 6.18887C15.467 6.12434 14.9372 6.10729 12.915 6.09558C11.5542 6.08774 10.1864 6.09985 9.87562 6.12253ZM9.92624 6.71353C8.83086 6.78752 8.16005 7.05122 7.57243 7.63884C6.73228 8.47899 6.59699 9.16549 6.59699 12.5895C6.59699 16.0135 6.73228 16.7 7.57243 17.5401C8.41258 18.3803 9.09907 18.5156 12.5231 18.5156C15.9471 18.5156 16.6336 18.3803 17.4737 17.5401C18.3139 16.7 18.4492 16.0135 18.4492 12.5895C18.4492 9.16549 18.3139 8.47899 17.4737 7.63884C16.8652 7.03035 16.2255 6.78997 14.9974 6.70849C14.1927 6.65508 10.7412 6.65851 9.92624 6.71353ZM9.87724 7.24716C8.65952 7.34745 7.89889 7.79063 7.49888 8.63289C7.17148 9.32228 7.16144 9.44041 7.16144 12.5895C7.16144 15.0614 7.17168 15.4547 7.24513 15.7974C7.43229 16.6708 7.8816 17.2884 8.56647 17.6137C9.25483 17.9405 9.37409 17.9507 12.5231 17.9507C15.6721 17.9507 15.7913 17.9405 16.4797 17.6137C17.1646 17.2884 17.6142 16.6703 17.8008 15.7974C17.874 15.4551 17.8843 15.0582 17.8843 12.5895C17.8843 10.1207 17.874 9.72385 17.8008 9.38156C17.6141 8.50844 17.1647 7.89063 16.4793 7.56515C15.8275 7.25558 15.6747 7.24118 12.8661 7.22413C11.4782 7.21575 10.1332 7.22609 9.87724 7.24716ZM9.92624 7.83551C8.90382 7.92062 8.37406 8.21103 8.04637 8.86607C7.76072 9.43707 7.74587 9.62076 7.74587 12.5895C7.74587 15.5582 7.76072 15.7419 8.04637 16.3129C8.2404 16.7008 8.45412 16.907 8.86193 17.0998C9.39315 17.3511 9.61334 17.3668 12.5721 17.3652C14.9055 17.3639 15.3405 17.3524 15.6375 17.284C16.3462 17.1208 16.7336 16.845 16.9987 16.3151C17.2856 15.7417 17.3003 15.56 17.3003 12.5895C17.3003 9.62076 17.2854 9.43707 16.9998 8.86607C16.8134 8.49354 16.612 8.29128 16.2392 8.1024C15.7271 7.84291 15.5448 7.82718 12.8661 7.81136C11.5052 7.80332 10.1822 7.8142 9.92624 7.83551ZM15.3705 8.35914C14.647 8.74063 14.6294 9.80406 15.3404 10.1771C15.8992 10.4702 16.5906 10.2075 16.8163 9.61621C17.0514 9.00066 16.5738 8.29535 15.8845 8.24008C15.68 8.22372 15.5862 8.24542 15.3705 8.35914ZM15.6344 8.87346C15.4753 8.96866 15.4171 9.07469 15.4155 9.27215C15.412 9.68598 15.9051 9.86149 16.1738 9.54212C16.4053 9.26706 16.2588 8.88944 15.9009 8.83868C15.8082 8.82554 15.6883 8.84118 15.6344 8.87346ZM11.7146 9.20267C10.1466 9.59024 9.04429 10.9883 9.04429 12.5895C9.04429 14.5081 10.6045 16.0683 12.5231 16.0683C13.0718 16.0683 13.5438 15.9536 14.091 15.6873C14.4792 15.4983 14.6259 15.3913 14.9754 15.0418C15.3249 14.6923 15.4319 14.5456 15.6209 14.1574C16.135 13.101 16.135 12.078 15.6209 11.0216C15.4319 10.6333 15.3249 10.4866 14.9754 10.1371C14.6259 9.7877 14.4792 9.68064 14.091 9.49171C13.835 9.36711 13.4668 9.23041 13.2729 9.18793C12.8194 9.08861 12.1505 9.09498 11.7146 9.20267ZM11.798 9.79446C11.278 9.93547 10.8802 10.1665 10.4776 10.5614C9.87734 11.15 9.58982 11.9158 9.64593 12.7766C9.67586 13.2362 9.81349 13.6854 10.0483 14.0898C10.2437 14.4264 10.7798 14.938 11.127 15.1191C11.6563 15.3953 11.9048 15.4551 12.5231 15.4551C13.141 15.4551 13.3888 15.3955 13.9195 15.1193C14.3012 14.9207 14.8539 14.3671 15.0601 13.9768C15.2655 13.5882 15.4139 13.0062 15.4139 12.5895C15.4139 12.1723 15.2653 11.5902 15.0599 11.2025C14.8709 10.8457 14.3612 10.3108 14.0234 10.1147C13.3523 9.72508 12.5039 9.60298 11.798 9.79446ZM11.8013 10.3372C11.157 10.547 10.5585 11.1123 10.3157 11.7407C10.1503 12.1685 10.1283 12.8228 10.2643 13.2704C10.4685 13.9426 11.0262 14.5464 11.6743 14.7969C12.102 14.9623 12.7563 14.9842 13.204 14.8482C13.8762 14.6441 14.48 14.0863 14.7305 13.4383C14.8958 13.0105 14.9178 12.3562 14.7818 11.9086C14.5778 11.2367 14.0209 10.6335 13.3719 10.3816C12.9599 10.2216 12.2206 10.2007 11.8013 10.3372ZM11.9498 10.9139C11.4606 11.0886 11.1144 11.4074 10.8929 11.8874C10.8043 12.0795 10.7837 12.2116 10.7837 12.5895C10.7837 12.9968 10.8003 13.0889 10.9168 13.3259C11.1188 13.7374 11.3581 13.9856 11.7282 14.1676C12.0293 14.3157 12.0942 14.3289 12.5223 14.3289C12.9248 14.3289 13.0266 14.311 13.2666 14.1985C13.6376 14.0246 13.9438 13.7333 14.1188 13.3876C14.2492 13.1302 14.2625 13.0587 14.2625 12.614C14.2625 12.1854 14.2461 12.0891 14.1316 11.8449C13.9639 11.487 13.6219 11.1462 13.2676 10.9839C12.8945 10.8128 12.3187 10.7823 11.9498 10.9139ZM0 12.5895C0 13.0611 0.00734954 13.254 0.016365 13.0182C0.0253314 12.7824 0.0253314 12.3965 0.016365 12.1608C0.00734954 11.925 0 12.1179 0 12.5895Z" fill="rgb(14, 151, 255)" />
                                    </svg>
                                  </span>
                                </Link>
                              </li>
                              <li>
                                <a>
                                  <Link href='#' target="_blank">
                                    <span>
                                      <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 26 26" fill="none">
                                        <path fillRule="evenodd" clipRule="evenodd" d="M11.1477 0.196165C2.68233 1.22742 -2.3448 10.1116 1.16399 17.84C4.76654 25.7749 15.2283 27.6602 21.4053 21.4877C28.6055 14.2929 24.6936 2.08077 14.6152 0.289745C13.9289 0.167785 11.8429 0.111524 11.1477 0.196165ZM14.0796 0.852663C22.7441 1.959 27.3197 11.9112 22.4996 19.1667C17.4457 26.774 6.1111 26.1542 1.98133 18.0447C-2.34242 9.55436 4.6302 -0.353938 14.0796 0.852663ZM8.41847 8.25368C7.47436 8.50091 6.71446 9.22173 6.40641 10.1622C6.22137 10.7271 6.22231 14.5694 6.40753 15.1351C6.71615 16.0774 7.48355 16.7983 8.43779 17.0424C9.02871 17.1935 16.0993 17.1935 16.6902 17.0424C17.6444 16.7983 18.4118 16.0774 18.7205 15.1351C18.8394 14.772 18.8396 14.7669 18.8396 12.6469C18.8396 10.5269 18.8394 10.5217 18.7205 10.1587C18.4118 9.21636 17.6444 8.49547 16.6902 8.25136C16.11 8.10302 8.98627 8.10496 8.41847 8.25368ZM16.6131 8.88123C17.3647 9.11521 17.95 9.73533 18.1622 10.5225C18.2566 10.873 18.2566 14.4207 18.1622 14.7713C17.95 15.5584 17.3647 16.1785 16.6131 16.4125C16.1535 16.5555 8.97451 16.5555 8.51493 16.4125C7.76329 16.1785 7.17799 15.5584 6.96582 14.7713C6.87137 14.4207 6.87137 10.873 6.96582 10.5225C7.17568 9.74389 7.75929 9.12003 8.49886 8.88354C8.93894 8.74289 16.1619 8.74083 16.6131 8.88123ZM11.2996 10.6618C11.0597 10.799 11.0537 10.8475 11.0518 12.6309L11.05 14.2999L11.1765 14.4501C11.408 14.7252 11.5079 14.6931 13.054 13.8468C15.281 12.6277 15.2794 12.6818 13.1252 11.4533C11.6392 10.6061 11.5015 10.5463 11.2996 10.6618ZM13.0156 12.1249C13.4924 12.3986 13.8821 12.6334 13.8818 12.6469C13.8815 12.6603 13.5582 12.8471 13.1634 13.062C12.7686 13.2769 12.2744 13.5464 12.0653 13.6609L11.685 13.869V12.6189V11.3688L11.9169 11.498C12.0445 11.5692 12.5389 11.8512 13.0156 12.1249Z" fill="rgb(14, 151, 255)" />
                                      </svg>
                                    </span>
                                  </Link>
                                </a>
                              </li>
                            </ul>
                          </div>
                        </Drawer>
                      </Fragment>
                    }
                  </div>
                </Box>
                <Box sx={{ display: { xs: 'none', sm: 'none', md: 'none', lg: 'block' } }}>
                  <div className={`${classes.logo} logo cursor-button`}>
                    <RouterLink to={{ pathname: "/", query: '0' }}>
                      <img src={scrolled || urlPart == 'no-data'|| urlPart == 'decline' || urlPart == 'booking-list' || urlPart == 'room-details' || urlPart == 'blog-list' || urlPart == 'booking-detail' || urlBooking == 'booking-confirm' || urlPart == 'my-account' || urlPart == 'faqs' || urlPart == 'gallery' || urlPart == 'market-place' || urlPart == 'privacy-policy' || urlPart == 'refund-policy' || urlPart == 'complaint-policy' || urlPart == 'legal-notice' || urlPart == 'terms-and-conditions' ? logo2 : footerIcon} alt="logo" />
                    </RouterLink>
                  </div>
                </Box>
                <Box sx={{ display: { lg: 'none' } }}>
                  <div className={`${classes.logoMobile} cursor-button`}>
                    <RouterLink to={{ pathname: "/", query: '0' }}>
                      <img src={scrolled || urlPart == 'no-data'|| urlPart == 'decline' || urlPart == 'booking-list' || urlPart == 'room-details' || urlPart == 'blog-list' || urlPart == 'booking-detail' || urlBooking == 'booking-confirm'|| urlPart =='my-account' || urlPart == 'faqs' || urlPart == 'gallery' || urlPart == 'market-place' || urlPart == 'privacy-policy' || urlPart == 'refund-policy' || urlPart == 'complaint-policy' || urlPart == 'legal-notice' || urlPart == 'terms-and-conditions' ? logo2 : footerIcon} alt="logo" />
                    </RouterLink>
                  </div>
                </Box>
                <Box className="nav-menu" ml="auto" sx={{ display: { xs: 'none', sm: 'none', md: 'none', lg: 'block' } }} >
                  <nav>
                    <ul className="menus">
                      <li className="menu-items"><RouterLink to={{ pathname: "/", query: '0' }}><span className="dot-before"></span> Home</RouterLink></li>
                      <li onClick={accomodations} className="menu-items"><RouterLink to={{pathname:`/home/booking/booking-list`}}><span className="dot-before"></span> ACCOMMODATIONS</RouterLink></li>
                      <li onClick={blogs} className="menu-items"><RouterLink to={{ pathname: "/home/blog-list" }}><span className="dot-before"></span> BLOGS</RouterLink></li>
                      <li className="menu-items"><RouterLink to={{ pathname: "/gallery", query: 3 }}><span className="dot-before"></span> Gallery</RouterLink></li>
                      <li className="menu-items"><a  href='https://horockville.com' target="_blank"><span className="dot-before"></span> Rockville House</a></li>
                      <li className="menu-items"><RouterLink to={{ pathname: "/market-place", query: 4 }}><span className="dot-before"></span> Market Place</RouterLink></li>
                      <li className="menu-items">
                      </li>
                      {/* <li className="menu-items"><RouterLink to={{pathname: "/", query: 5}}><span className="dot-before"></span> Contact</RouterLink></li>  */}
                    </ul>
                  </nav>

                </Box>
                <Box className="header-right">
                  <ul>
                    <li>
                      {/* <RouterLink to={{ pathname: "/", query: 4 }}> */}
                      <Badge badgeContent={cartItems.length} color="primary" className="cart-res">
                        <span className="dot-before"></span>
                        <img className={"cursor"} src={scrolled || urlPart == 'no-data'|| urlPart == 'decline' || urlPart == 'booking-list' || urlPart == 'room-details' || urlPart == 'blog-list' || urlPart == 'booking-detail' || urlBooking == 'booking-confirm' || urlPart == 'my-account' || urlPart == 'faqs' || urlPart == 'gallery'  || urlPart == 'market-place' || urlPart == 'privacy-policy' || urlPart == 'refund-policy' || urlPart == 'complaint-policy' || urlPart == 'legal-notice' || urlPart == 'terms-and-conditions' ? cart2 : cartIcon} alt="logo" onClick={handleOpenCart} />
                        {/* <i className={scrolled ? `${classes.cartSvg2}` : `${classes.cartSvg} search-svg2 norepeat-img me-3`}></i> */}
                      </Badge>
                      {/* </RouterLink> */}

                    </li>
                    {!localStorage.getItem('guest') &&
                      <li>
                        <div className="call-now">
                          <div className='display-emp'>
                            <a href='javascript:void(0)'>
                              {/* <Button variant="contained" onClick={() => setOpenModal(true)}> */}
                              <Button variant="contained" onClick={() => history.push({pathname:`/login`, isRegister:0})}>
                                Login
                              </Button>
                            </a>
                          </div>
                        </div>
                      </li>
                    }
                    {/** profile modal */}
                    <Box sx={{ display: { xs: 'none', sm: 'none', md: 'none', lg: 'block' } }} >
                      <li>
                        {(localStorage.getItem('guest')) &&
                          <div className="profile-main">
                            <div className='display-emps'>
                              <IconButton
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleMenu}
                              >
                                <img src={defaultimageprofile} />
                              </IconButton>
                              {/* <span style={{ color: "black" }}>{JSON.parse(localStorage.getItem('user')).Name}</span> */}
                              {/* <ArrowDropDownIcon className="arrow-icon-style"  /> */}
                              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="6" viewBox="0 0 12 6" fill="none" onClick={handleMenu}>
                                <path d="M0.817261 0.5L5.81726 5.5L10.8173 0.5" stroke="#525252" stroke-linecap="round" stroke-linejoin="round" />
                              </svg>
                            </div>
                          </div>
                        }
                      </li>
                    </Box>
                    <li>
                      {/* {(location == "/") &&
                        <div className="profile-nav">
                          <div className='display-emp'>
                            <a href={"tel:" + CONTACT_NO2} onClick={() => UseAnalyticsEventTracker('CallNow', 'Click')}>
                              <Button variant="contained" >
                                CALL NOW
                              </Button>
                            </a>
                          </div>
                        </div>
                      } */}

                    </li>

                  </ul>
                </Box>
                {profileMenu &&
                  <div className="profile-menu">
                    <div className="profile-drop-title">
                      <IconButton
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleMenu}
                        className="button-prfileineer"
                      >
                        <img src={defaultimageprofile} />
                      </IconButton>
                      <div className="profile-drop-title-left">
                        <span>{JSON.parse(localStorage.getItem('guest')).Name}</span>
                        <span className="profile-mail">{JSON.parse(localStorage.getItem('guest')).Email}</span>
                      </div>

                    </div>

                    <ul className="main-ul-div">
                      <li className="list-style-menu">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="21" viewBox="0 0 16 21" fill="none">
                          <path d="M8.47363 10.9028C9.46254 10.9028 10.4292 10.6096 11.2515 10.0602C12.0737 9.51077 12.7146 8.72988 13.093 7.81625C13.4715 6.90262 13.5705 5.89729 13.3776 4.92738C13.1846 3.95748 12.7084 3.06656 12.0092 2.3673C11.3099 1.66804 10.419 1.19183 9.44908 0.998908C8.47918 0.805982 7.47385 0.904998 6.56021 1.28344C5.64658 1.66187 4.86569 2.30274 4.31628 3.12498C3.76688 3.94723 3.47363 4.91393 3.47363 5.90283C3.47496 7.22851 4.00217 8.49951 4.93956 9.4369C5.87696 10.3743 7.14796 10.9015 8.47363 10.9028ZM8.47363 2.5695C9.1329 2.5695 9.77737 2.765 10.3255 3.13127C10.8737 3.49754 11.3009 4.01814 11.5532 4.62722C11.8055 5.23631 11.8715 5.90653 11.7429 6.55313C11.6143 7.19974 11.2968 7.79368 10.8307 8.25986C10.3645 8.72603 9.77054 9.0435 9.12393 9.17212C8.47733 9.30073 7.80711 9.23472 7.19802 8.98243C6.58893 8.73014 6.06834 8.3029 5.70207 7.75473C5.3358 7.20657 5.1403 6.5621 5.1403 5.90283C5.1403 5.01878 5.49149 4.17093 6.11661 3.54581C6.74173 2.92069 7.58958 2.5695 8.47363 2.5695Z" fill="#232631" />
                          <path d="M8.47363 12.5695C6.48519 12.5717 4.57881 13.3626 3.17277 14.7686C1.76672 16.1747 0.975839 18.0811 0.973633 20.0695C0.973633 20.2905 1.06143 20.5025 1.21771 20.6588C1.37399 20.815 1.58595 20.9028 1.80697 20.9028C2.02798 20.9028 2.23994 20.815 2.39622 20.6588C2.5525 20.5025 2.6403 20.2905 2.6403 20.0695C2.6403 18.5224 3.25488 17.0387 4.34884 15.9447C5.4428 14.8507 6.92654 14.2362 8.47363 14.2362C10.0207 14.2362 11.5045 14.8507 12.5984 15.9447C13.6924 17.0387 14.307 18.5224 14.307 20.0695C14.307 20.2905 14.3948 20.5025 14.551 20.6588C14.7073 20.815 14.9193 20.9028 15.1403 20.9028C15.3613 20.9028 15.5733 20.815 15.7296 20.6588C15.8858 20.5025 15.9736 20.2905 15.9736 20.0695C15.9714 18.0811 15.1805 16.1747 13.7745 14.7686C12.3685 13.3626 10.4621 12.5717 8.47363 12.5695Z" fill="#232631" />
                        </svg>
                        <span onClick={() => history.push('/home/my-account')}>My Account</span>
                      </li>
                      <li className="list-style-menu" onClick={logOut}>
                        <img src={logoutLogo} />
                        <span>Logout</span>
                      </li>
                    </ul>
                  </div>
                }
              </div>
            </div>
          </Container>
        </Toolbar>
      </AppBar>
      <Modal
        open={openModal}
        onClose={handleClose}
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        hideBackdrop={true}
      >
        <Fade in={openModal}>
          <LoginModal setOpen={setOpenModal} setClose={handleClose} openModal={openModal} />
        </Fade>
      </Modal>
      {openModalCart &&
        <CartModal openModalCart={openModalCart} itemAddedCart={false}/>
      }
      {/* <Modal
        open={openModalCart}
        onClose={handleCloseCart}
        className={classes.modalCart}
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        BackdropComponent={Backdrop}
      // hideBackdrop={true}
      > */}

      {/* <Fade in={openModalCart} > */}
      {/* <div className={classes.paperCart}> */}
      {/* {openModalCart &&
        <Zoom top>
          <div className="cart-div">
            <div>
              <h2 className="heading-title">Complete your booking</h2>
              <div>
                <PerfectScrollbar style={{
                  height: 250,
                  borderRadius: 10
                }}
                >
                  {cartDetail.map((item, index) => (
                    <React.Fragment key={index}>
                      <div className="cart-modal">
                        <img src={item.image} alt={item.title} className="img-responsive cart-image-style" />
                        <div>
                          <h2 className="hotel-title">{item.title}</h2>
                          <h2 className="digit-color"><span className="rs-style">RS.</span> {item.amount}</h2>
                        </div>
                        <div>
                        </div>
                        <div className="delete-icon-rel">
                          <img src={deleteIcon} />
                        </div>
                      </div>
                    </React.Fragment>
                  ))}
                </PerfectScrollbar>

              </div>
              <button className="view-cart-btn">VIEW CART</button>
              <button className="checkout-btn">PROCEEDS TO CHECKOUT</button>
            </div>
          </div>
        </Zoom>
      } */}
      {/* </Fade> */}
      {/* </Modal> */}
    </div >
  );


}

//what is needed at start
const mapStateToProps = ({ cmsReducer, authReducer }) => {
  const { loading, homeData } = cmsReducer;
  const { dataGetConfig, successGetConfig } = authReducer;
  return { loading, homeData, dataGetConfig, successGetConfig };
};
//which actions our function can dispatch
const mapDispatchToProps = (dispatch) => {
  return {

    //cmsMessageHandler: () => dispatch(actions.cmsMessageHandler()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Header);
