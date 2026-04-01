import React, { useState, useEffect } from 'react';
import axios from 'axios';import {useStyles} from "./styles";     
import {connect} from "react-redux"; 
import * as actions from "../../../store/actions";    
// import OwlCarousel from 'react-owl-carousel';
// import 'owl.carousel/dist/assets/owl.carousel.css';
// import 'owl.carousel/dist/assets/owl.theme.default.css';
import { withRouter } from "react-router";
import Container from "@material-ui/core/Container";
import UseAnalyticsEventTracker from '../../../components/googleAnalytics';

import {
    trial5,village,mall,dinoValley,mosque,station, mall2,mall1,market,superMrkaet,park,beverly,airport,monal,monomnet,
    vectorImage,wheel,weatherImage,cloud,sunny,vectorLine,leftArrow1,rightArrow1
    
} from "../../../assets/images/images";
import Grid from "@material-ui/core/Grid";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/scss/image-gallery.scss";
import "react-image-gallery/styles/css/image-gallery.css";
import "../scss/general.scss";
import "../scss/home.scss";
import fetchWeatherData from './corsProxy';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


function TouristSpots(props) {  
    const classes = useStyles();  

    const [open, setOpen] = React.useState(false);
    const [currentImage, setCurrentImage] = useState(0);
    const [weatherData, setWeatherData] = useState(null);


    const locationGA = (name) => {
        if(name === 'Centaurus Mall' || "Islamabad Airport"){
            UseAnalyticsEventTracker('Tourist Spot'+' '+name);
        }
    }


     const CustomPrevArrow = ({ onClick }) => (
       <div className="slick-prev"> 
       <img
          src={leftArrow1}
          alt="Previous"          
          onClick={onClick}
        />
        </div>
      );
    
      const CustomNextArrow = ({ onClick }) => (
        <div className="slick-next"> 
        <img
          src={rightArrow1}
          alt="Next"          
          onClick={onClick}
        />
        </div>
      );

    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        centerMode: true,
        responsive: [
            {
                breakpoint: 0, 
                settings: {
                    slidesToShow: 1, 
                    slidesToScroll: 1,
                    centerPadding: '20px',
                },
            },
            {
                breakpoint: 479, 
                settings: {
                    slidesToShow:1,
                    slidesToScroll: 1,
                    centerPadding: '20px',
                },
            },
            {
                breakpoint: 480, 
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    centerPadding: '60px',
                },
            },
            {
                breakpoint: 600, 
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    centerPadding: '20px',
                },
            },
            {
                breakpoint: 700, 
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    centerPadding: '30px',
                },
            },
            {
                breakpoint: 768, 
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    centerPadding: '0px',
                prevArrow: <CustomPrevArrow />,
                nextArrow: <CustomNextArrow />,
                },  
            },
            {
                breakpoint: 991, 
                settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                centerPadding: '0px',
                prevArrow: <CustomPrevArrow />,
                nextArrow: <CustomNextArrow />,
                },  
            },
            {
                breakpoint: 1000, 
                settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
                centerPadding: '0px',
                prevArrow: <CustomPrevArrow />,
                nextArrow: <CustomNextArrow />,
                },  
            },
            {
                breakpoint: 1200, 
                settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                centerPadding: '0px',
                prevArrow: <CustomPrevArrow />,
                nextArrow: <CustomNextArrow />,
                },  
            },
            {
                breakpoint: 1366, 
                settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
                centerPadding: '0px',
                prevArrow: <CustomPrevArrow />,
                nextArrow: <CustomNextArrow />,
                },  
            },
            {
                breakpoint: 1600, 
                settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
                centerPadding: '0px',
                prevArrow: <CustomPrevArrow />,
                nextArrow: <CustomNextArrow />,
                },  
            },
            {
                breakpoint: 1920, 
                settings: {
                slidesToShow: 4,
                slidesToScroll: 4,
                centerPadding: '0px',
                prevArrow: <CustomPrevArrow />,
                nextArrow: <CustomNextArrow />,
                },  
            },
            {
                breakpoint: 2500, 
                settings: {
                slidesToShow: 4,
                slidesToScroll: 4,
                centerPadding: '0px',
                prevArrow: <CustomPrevArrow />,
                nextArrow: <CustomNextArrow />,
                },  
            },
          ]
        
      };

    // const seraiBotGal = [gallery2,gallery3];
    const touristLocation = [
        { name: 'Kohsar Market',time:'2',image:'https://serai-hms.s3.ap-southeast-1.amazonaws.com/hms/images/kohsar.webp',link:'https://www.google.com/maps/dir/Rockville+House+managed+%26+operated+by+Serai+Boutique+Hotels+and+Resorts,+House+2A+School+Rd,+F-6%2F3+F+6%2F3+F-6,+Islamabad,+Islamabad+Capital+Territory+44000/Kohsar+Market,+Street+10,+Markaz+F+6%2F3+F-6,+Islamabad/@33.733373,73.0761286,17z/data=!3m1!4b1!4m14!4m13!1m5!1m1!1s0x38dfbf7bda3bc1b7:0xc4a08c1f020d6b92!2m2!1d73.079825!2d33.7317284!1m5!1m1!1s0x38dfbf7adc7e38bf:0xb5f7207c4b3059ef!2m2!1d73.0782928!2d33.7355194!3e0?entry=ttu'}, 
        { name: 'Trail 5',time:'4',image:'https://serai-hms.s3.ap-southeast-1.amazonaws.com/hms/images/trial5.webp',link:'https://www.google.com/maps/dir/Rockville+House+managed+%26+operated+by+Serai+Boutique+Hotels+and+Resorts,+House+2A+School+Rd,+F-6%2F3+F+6%2F3+F-6,+Islamabad,+Islamabad+Capital+Territory+44000/Trail+5+Parking+Area,+Main+Margalla+Road,+F-5%2F2+F-5,+Islamabad/@33.737629,73.0731105,15z/data=!3m1!4b1!4m14!4m13!1m5!1m1!1s0x38dfbf7bda3bc1b7:0xc4a08c1f020d6b92!2m2!1d73.079825!2d33.7317284!1m5!1m1!1s0x38dfc1ed65aeff95:0x3b77fd7ba3016264!2m2!1d73.0871726!2d33.7445566!3e0?entry=ttu'},
        { name: 'Beverly Center',time:'5',image:'https://serai-hms.s3.ap-southeast-1.amazonaws.com/hms/images/beverly.webp',link:'https://www.google.com/maps/dir/Rockville+House+managed+%26+operated+by+Serai+Boutique+Hotels+and+Resorts,+House+2A+School+Rd,+F-6%2F3+F+6%2F3+F-6,+Islamabad,+Islamabad+Capital+Territory+44000/Beverly+Centre,+Jinnah+Avenue,+F+6%2F1+Blue+Area,+Islamabad/@33.7260817,73.0701048,15z/data=!3m1!4b1!4m14!4m13!1m5!1m1!1s0x38dfbf7bda3bc1b7:0xc4a08c1f020d6b92!2m2!1d73.079825!2d33.7317284!1m5!1m1!1s0x38dfbf8d766402f1:0x772f112e08aed554!2m2!1d73.0738234!2d33.7201801!3e0?entry=ttu'},
        { name: 'Saidpur Village',time:'6',image:'https://serai-hms.s3.ap-southeast-1.amazonaws.com/hms/images/villege.webp',link:'https://www.google.com/maps/dir/Rockville+House+managed+%26+operated+by+Serai+Boutique+Hotels+and+Resorts,+House+2A+School+Rd,+F-6%2F3+F+6%2F3+F-6,+Islamabad,+Islamabad+Capital+Territory+44000/Saidpur+village+Islamabad,+Saidpur+Village+Road,+Saidpur,+Islamabad/@33.7324926,73.0523222,14z/data=!4m14!4m13!1m5!1m1!1s0x38dfbf7bda3bc1b7:0xc4a08c1f020d6b92!2m2!1d73.079825!2d33.7317284!1m5!1m1!1s0x38dfbf9befb2fe81:0x27553d2e6af32a6a!2m2!1d73.0679913!2d33.7457245!3e0?entry=ttu'},
        { name: 'Jinnah Super Market',time:'7',image:'https://serai-hms.s3.ap-southeast-1.amazonaws.com/hms/images/jinnahSuper.webp',link:'https://www.google.com/maps/dir/Rockville+House+managed+%26+operated+by+Serai+Boutique+Hotels+and+Resorts,+House+2A+School+Rd,+F-6%2F3+F+6%2F3+F-6,+Islamabad,+Islamabad+Capital+Territory+44000/Jinnah+Super+Market,+College+Road,+F-7+Markaz+F+7+Markaz+F-7,+Islamabad/@33.7306198,73.0499246,14z/data=!3m1!4b1!4m14!4m13!1m5!1m1!1s0x38dfbf7bda3bc1b7:0xc4a08c1f020d6b92!2m2!1d73.079825!2d33.7317284!1m5!1m1!1s0x38dfbfa76b72ff95:0x7f5e8a6820990b68!2m2!1d73.0575297!2d33.7211682!3e0?entry=ttu'},
        { name: 'Safa Gold Mall',time:'7',image:'https://serai-hms.s3.ap-southeast-1.amazonaws.com/hms/images/safaMall.webp',link:'https://www.google.com/maps/dir/Rockville+House+managed+%26+operated+by+Serai+Boutique+Hotels+and+Resorts,+House+2A+School+Rd,+F-6%2F3+F+6%2F3+F-6,+Islamabad,+Islamabad+Capital+Territory+44000/Safa+Gold+Mall,+College+Road,+F-7+Markaz+F+7+Markaz+F-7,+Islamabad/@33.72865,73.0483151,14z/data=!3m1!4b1!4m14!4m13!1m5!1m1!1s0x38dfbf7bda3bc1b7:0xc4a08c1f020d6b92!2m2!1d73.079825!2d33.7317284!1m5!1m1!1s0x38dfbfa7067ea8d3:0x49a6054408b8b584!2m2!1d73.0555015!2d33.7207086!3e0?entry=ttu'},
        { name: 'Pakistan Monument',time:'9',image:'https://serai-hms.s3.ap-southeast-1.amazonaws.com/hms/images/monument.webp',link:'https://www.google.com/maps/dir/Rockville+House+managed+%26+operated+by+Serai+Boutique+Hotels+and+Resorts,+House+2A+School+Rd,+F-6%2F3+F+6%2F3+F-6,+Islamabad,+Islamabad+Capital+Territory+44000/Pakistan+Monument+Museum,+Srinagar+Highway,+Islamabad/@33.7118389,73.0560415,13.88z/data=!4m15!4m14!1m5!1m1!1s0x38dfbf7bda3bc1b7:0xc4a08c1f020d6b92!2m2!1d73.079825!2d33.7317284!1m5!1m1!1s0x38dfbfe8ae4d21af:0x8bf154c0f614781!2m2!1d73.0694823!2d33.6925409!3e0!5i2?entry=ttu'},
        { name: 'Centaurus Mall',time:'11',image:'https://serai-hms.s3.ap-southeast-1.amazonaws.com/hms/images/centaurus.webp',link:'https://www.google.com/maps/dir/Rockville+House+managed+%26+operated+by+Serai+Boutique+Hotels+and+Resorts,+House+2A+School+Rd,+F-6%2F3+F+6%2F3+F-6,+Islamabad,+Islamabad+Capital+Territory+44000/The+Centaurus+Mall,+Jinnah+Avenue,+F+8%2F4+F-8,+Islamabad/@33.7199459,73.0483918,14z/data=!3m1!4b1!4m14!4m13!1m5!1m1!1s0x38dfbf7bda3bc1b7:0xc4a08c1f020d6b92!2m2!1d73.079825!2d33.7317284!1m5!1m1!1s0x38dfbfb0f4f77379:0xf8c50b8651f56d02!2m2!1d73.0497919!2d33.7077281!3e0?entry=ttu'},
        { name: 'Fasial Mosque',time:'12',image:'https://serai-hms.s3.ap-southeast-1.amazonaws.com/hms/images/mosque.webp',link:'https://www.google.com/maps/dir/Rockville+House+managed+%26+operated+by+Serai+Boutique+Hotels+and+Resorts,+House+2A+School+Rd,+F-6%2F3+F+6%2F3+F-6,+Islamabad,+Islamabad+Capital+Territory+44000/Faisal+Masjid,+Islamabad,+Shah+Faisal+Avenue,+E-8,+Islamabad/@33.7307326,73.0397321,14z/data=!3m1!4b1!4m14!4m13!1m5!1m1!1s0x38dfbf7bda3bc1b7:0xc4a08c1f020d6b92!2m2!1d73.079825!2d33.7317284!1m5!1m1!1s0x38dfbefce01e6917:0x3e66e0de3e2598c0!2m2!1d73.0371536!2d33.7295198!3e0?entry=ttu'},
        { name: 'Lake View Park',time:'16',image:'https://serai-hms.s3.ap-southeast-1.amazonaws.com/hms/images/lakeViewPark.webp',link:'https://www.google.com/maps/dir/Rockville+House+managed+%26+operated+by+Serai+Boutique+Hotels+and+Resorts,+House+2A+School+Rd,+F-6%2F3+F+6%2F3+F-6,+Islamabad,+Islamabad+Capital+Territory+44000/LAKE+VIEW+PARK,+Islamabad/@33.7179149,73.0820717,14z/data=!3m1!4b1!4m14!4m13!1m5!1m1!1s0x38dfbf7bda3bc1b7:0xc4a08c1f020d6b92!2m2!1d73.079825!2d33.7317284!1m5!1m1!1s0x38dfc04b8cff92e7:0x4fc0ece5b8b9d8fb!2m2!1d73.1305349!2d33.7154975!3e0?entry=ttu'},
        { name: 'Monal Restaurant',time:'26',image:'https://serai-hms.s3.ap-southeast-1.amazonaws.com/hms/images/monal.webp',link:'https://www.google.com/maps/dir/Rockville+House+managed+%26+operated+by+Serai+Boutique+Hotels+and+Resorts,+House+2A+School+Rd,+F-6%2F3+F+6%2F3+F-6,+Islamabad,+Islamabad+Capital+Territory+44000/The+Monal,+Pir+Sohawa+Road,+Islamabad/@33.7454597,73.0450445,14z/data=!3m1!4b1!4m14!4m13!1m5!1m1!1s0x38dfbf7bda3bc1b7:0xc4a08c1f020d6b92!2m2!1d73.079825!2d33.7317284!1m5!1m1!1s0x38dfbf49c71bac3b:0x440c38883a64cd51!2m2!1d73.0656798!2d33.76009!3e0?entry=ttu'},
        { name: 'Motorway Toll Plaza',time:'30',image:'https://serai-hms.s3.ap-southeast-1.amazonaws.com/hms/images/motarway.webp',link:'https://www.google.com/maps/dir/Rockville+House+managed+%26+operated+by+Serai+Boutique+Hotels+and+Resorts,+House+2A+School+Rd,+F-6%2F3+F+6%2F3+F-6,+Islamabad,+Islamabad+Capital+Territory+44000/Motorway+M-1+Toll+Plaza+Office,+Islamabad/@33.6602085,72.8944641,12z/data=!3m1!4b1!4m14!4m13!1m5!1m1!1s0x38dfbf7bda3bc1b7:0xc4a08c1f020d6b92!2m2!1d73.079825!2d33.7317284!1m5!1m1!1s0x38df99b66d258573:0x88aaf6e6158496c4!2m2!1d72.8658825!2d33.5982224!3e0?entry=ttu'},
        { name: 'Golra Railway Museum',time:'31',image:'https://serai-hms.s3.ap-southeast-1.amazonaws.com/hms/images/station.webp' ,link:'https://www.google.com/maps/dir/Rockville+House+managed+%26+operated+by+Serai+Boutique+Hotels+and+Resorts,+House+2A+School+Rd,+F-6%2F3+F+6%2F3+F-6,+Islamabad,+Islamabad+Capital+Territory+44000/Golra+Railway+Station,+Golra+Road,+Islamabad/@33.6865998,72.935287,12z/data=!3m1!4b1!4m14!4m13!1m5!1m1!1s0x38dfbf7bda3bc1b7:0xc4a08c1f020d6b92!2m2!1d73.079825!2d33.7317284!1m5!1m1!1s0x38dfbd8237fc18df:0x3cfe0595a1bb0cee!2m2!1d72.9476309!2d33.6705685!3e0?entry=ttu'}, 
        { name: 'Dino Valley',time:'39',image:'https://serai-hms.s3.ap-southeast-1.amazonaws.com/hms/images/dinoValley.webp',link:'https://www.google.com/maps/dir/Rockville+House+managed+%26+operated+by+Serai+Boutique+Hotels+and+Resorts,+House+2A+School+Rd,+F-6%2F3+F+6%2F3+F-6,+Islamabad,+Islamabad+Capital+Territory+44000/Dino+Valley,+Pir+Sohawa+Road/@33.7624889,73.0442642,13z/data=!3m1!4b1!4m14!4m13!1m5!1m1!1s0x38dfbf7bda3bc1b7:0xc4a08c1f020d6b92!2m2!1d73.079825!2d33.7317284!1m5!1m1!1s0x38dfbfbf1532b6ab:0x36cbabce65ebcb47!2m2!1d73.1240766!2d33.7940619!3e0?entry=ttu'},
        { name: 'Giga Mall',time:'40',image:'https://serai-hms.s3.ap-southeast-1.amazonaws.com/hms/images/gigaMall.webp' ,link:'https://www.google.com/maps/dir/Rockville+House+managed+%26+operated+by+Serai+Boutique+Hotels+and+Resorts,+House+2A+School+Rd,+F-6%2F3+F+6%2F3+F-6,+Islamabad,+Islamabad+Capital+Territory+44000/Giga+Mall,+Grand+Trunk+Road,+Defense+Housing+Authority+Sector+F+DHA+Phase+II,+Islamabad/@33.6265404,72.9530876,11z/data=!3m1!4b1!4m14!4m13!1m5!1m1!1s0x38dfbf7bda3bc1b7:0xc4a08c1f020d6b92!2m2!1d73.079825!2d33.7317284!1m5!1m1!1s0x38dfed736df2ee2b:0xd2c18a69157f1c54!2m2!1d73.1589673!2d33.5206638!3e0?entry=ttu'},
        { name: 'Islamabad Airport',time:'41',image:'https://serai-hms.s3.ap-southeast-1.amazonaws.com/hms/images/airport.webp',link:'https://www.google.com/maps/dir/Rockville+House+managed+%26+operated+by+Serai+Boutique+Hotels+and+Resorts,+House+2A+School+Rd,+F-6%2F3+F+6%2F3+F-6,+Islamabad,+Islamabad+Capital+Territory+44000/Islamabad+International+Airport,+New+Islamabad+Airport+Road,+Islamabad/@33.6435523,72.7959284,11z/data=!3m1!4b1!4m14!4m13!1m5!1m1!1s0x38dfbf7bda3bc1b7:0xc4a08c1f020d6b92!2m2!1d73.079825!2d33.7317284!1m5!1m1!1s0x38df999324e8b081:0x4436b8765030008!2m2!1d72.8340621!2d33.5564864!3e0?entry=ttu'},

    ];
  
    return (
        <div>
            <Container fixed className='padd-tourist tourist-slider'>
                <Slider   {...settings}
                    // responsive={{
                    //     0: {
                    //         stagePadding: 20,
                    //         items: 1,
                    //         margin: 10,
                    //         dots: false
                    //     },
                    //     600: {
                    //         items: 2,
                    //         margin: 15,
                    //         dots: true
                    //     },
                    //     768: {
                    //         items: 1,
                    //         margin: 20,
                    //         nav: true,
                    //     navText: [ '<img src="' + leftArrow1 + '">','<img src="' + rightArrow1 + '">'],
                    //     dots: false    
                    //     },
                    //     991: {
                    //         items: 2,
                    //         margin: 20,
                    //         nav: true,
                    //     navText: [ '<img src="' + leftArrow1 + '">','<img src="' + rightArrow1 + '">'],
                    //     dots: false    
                    //     },
                    //     1000: {
                    //         items: 2,
                    //         margin: 20,
                    //         nav: true,
                    //         navText: [ '<img src="' + leftArrow1 + '">','<img src="' + rightArrow1 + '">'],
                    //         dots: false 
                    //     },
                    //     1200: {
                    //         items: 2,
                    //         margin: 20,
                    //         nav: true,
                    //         navText: [ '<img src="' + leftArrow1 + '">','<img src="' + rightArrow1 + '">'],
                    //         dots: false    
                    //     },
                    //     1366: {
                    //         items: 3,
                    //         margin: 20,
                    //         nav: true,
                    //         navText: [ '<img src="' + leftArrow1 + '">','<img src="' + rightArrow1 + '">'],
                    //         dots: false    
                    //     },
                    //     1600: {
                    //         items: 3,
                    //         margin: 23,
                    //         nav: true,
                    //         navText: [ '<img src="' + leftArrow1 + '">','<img src="' + rightArrow1 + '">'],
                    //         dots: false     
                    //     },
                    //     1920: {
                    //         items: 4,
                    //         margin: 23,
                    //         nav: true,
                    //         navText: [ '<img src="' + leftArrow1 + '">','<img src="' + rightArrow1 + '">'],
                    //         dots: false     
                    //     }
                    // }}
                >
                {touristLocation.map(item => (
                <div >
                    <div className='tourist-box'>
                    <a href={item.link} target='_blank' >
                        <div >
                            <div className="position-relative" onClick={()=>locationGA(item.name)}>
                                {/* {/ <a className="lightbox" onClick={() => handleOpens(0)}> /} */}
                                    <img className="tourist-attration-img img-responsive" src={item.image} width='314' height='392'  alt="" />
                                {/* {/ </a> /} */}
                                <div className='location-data-outer'>
                                <div className='location-data'>
                                    <h5>{item.name}</h5>
                                    <div className='location-ppol'>
                                    <a >
                                        <span className='span-location' >
                                            <img className="img-responsive-vector" src={vectorImage} width='22' height='22' alt="" />
                                        </span>
                                    </a>
                                    <a>
                                    <span className='span-drive'>
                                        <img className="img-responsive-vector" src={wheel} width='22' height='22' alt="" />
                                        <span>{item.time} Minutes Drive</span>
                                    </span>
                                    </a>
                                    </div> 
                                </div>
                                </div>
                            </div> 
                        </div>
                    </a> 
                </div>
                </div>
                ))}
                </Slider>
            </Container>
        </div>
    );
}

//what is needed at start
const mapStateToProps = ({ cmsReducer }) => {  
   
};
//which actions our function can dispatch
const mapDispatchToProps = (dispatch) => {
    return {

    };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(TouristSpots));
