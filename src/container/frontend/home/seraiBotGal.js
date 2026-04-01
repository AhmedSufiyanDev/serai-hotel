import React, {useState} from 'react';   
import {useStyles} from "./styles";     
import {connect} from "react-redux"; 
import * as actions from "../../../store/actions";    
// import OwlCarousel from 'react-owl-carousel';
// import 'owl.carousel/dist/assets/owl.carousel.css';
// import 'owl.carousel/dist/assets/owl.theme.default.css';
import { withRouter } from "react-router";
import Container from "@material-ui/core/Container";
import {
    gallery1, gallery2, gallery3,
    cafeImage,taxiImage,securityImage,
    cameraImage,leftArrow1,rightArrow1
    
} from "../../../assets/images/images";
import Grid from "@material-ui/core/Grid";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/scss/image-gallery.scss";
import "react-image-gallery/styles/css/image-gallery.css";
import "../scss/general.scss";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


function FaclitiesServices(props) {  
    const classes = useStyles();  

    const [open, setOpen] = React.useState(false);
    const [currentImage, setCurrentImage] = useState(0);

    const seraiBotGal = [gallery1,gallery2,gallery3];

    const seraiBotGalSlide = seraiBotGal.map(function(item) {
        return  {original: item,thumbnail: item}
    });

    const handleOpens = (index) => {
        setCurrentImage(index)
        setOpen(true);
    };

    const handleCloses = () => {
        setOpen(false);
    };

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
        centerMode: true,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 0, 
                settings: {
                    slidesToShow: 1, 
                    slidesToScroll: 1,
                    centerPadding: '30px',
                    
                },
            },
            {
                breakpoint: 479, 
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    centerPadding: '30px',
                    
                },
            },
            {
                breakpoint: 600, 
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    centerPadding: '30px',
                    
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
                    slidesToShow: 2,
                    slidesToScroll: 2,
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
                breakpoint: 1920, 
                settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
                centerPadding: '0px',
                prevArrow: <CustomPrevArrow />,
                nextArrow: <CustomNextArrow />,
                },  
            },
            {
                breakpoint: 2500, 
                settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
                centerPadding: '0px',
                prevArrow: <CustomPrevArrow />,
                nextArrow: <CustomNextArrow />,
                },  
            },                
        
        ]
        
      };
    
  
    return (
        <div>
        <section className='facilities-sec'>
            <div className="defalut-heading-mainhm text-center">
                <h2 >FACILITIES & SERVICES</h2>
                <p>- WE ARE WAITING FOR YOU -</p>
            </div>
            <div className="facilities-slider-outer">
                <Slider {...settings}
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
                    //      768: {
                    //         items: 1,
                    //         margin: 20,
                    //         nav: true,
                    //         navText: [ '<img src="' + leftArrow1 + '">','<img src="' + rightArrow1 + '">'],
                    //         dots: false    
                    //     },
                    //     991: {
                    //         items: 2,
                    //         margin: 20,
                    //          nav: true,
                    //          dots: false,
                    //         navText: [ '<img src="' + leftArrow1 + '">','<img src="' + rightArrow1 + '">'],
            
                    //     },
                    //      1366: {
                    //         items: 3,
                    //         margin: 40,
                    //          nav: true,
                    //          dots: false,
                    //         navText: [ '<img src="' + leftArrow1 + '">','<img src="' + rightArrow1 + '">'],
            
                    //     }
                    // }}
                >
                    <div>
                        <div className="facilities-slider">
                            {/* <a className="lightbox" onClick={() => handleOpens(0)}> */}
                                <img className="default-radius-img img-responsive" src={'https://serai-hms.s3.ap-southeast-1.amazonaws.com/hms/images/terrace.webp'} width="605" height="412" alt="" />
                                <div className='img-title'>Terrace Garden</div>
                            {/* </a> */}
                        </div>
                    </div>
                    <div>
                        <div className="facilities-slider">
                            {/* <a className="lightbox" onClick={() => handleOpens(1)}> */}
                            <img className="default-radius-img img-responsive" src={'https://serai-hms.s3.ap-southeast-1.amazonaws.com/hms/images/gym.webp'} width="605" height="412" alt="" />
                            <div className='img-title'>Gym</div>
                            {/* </a> */}
                        </div>
                    </div>
                    <div>
                        <div className="facilities-slider">
                            {/* <a className="lightbox" onClick={() => handleOpens(2)}> */}
                            <img className="default-radius-img img-responsive" src={'https://serai-hms.s3.ap-southeast-1.amazonaws.com/hms/images/cafe.webp'} width="605" height="412" alt="" />
                            <div className='img-title'>Restaurant/café only for members</div>
                            {/* </a> */}
                        </div>
                    </div>
                    <div>
                        <div className="facilities-slider">
                            {/* <a className="lightbox" onClick={() => handleOpens(2)}> */}
                            <img className="default-radius-img img-responsive" src={'https://serai-hms.s3.ap-southeast-1.amazonaws.com/hms/images/cafeImage.webp'} width="605" height="412" alt="" />
                            <div className='img-title'>Walking distance from cafes and shopping district</div>
                            {/* </a> */}
                        </div>
                    </div>
                    <div>
                        <div className="facilities-slider">
                            {/* <a className="lightbox" onClick={() => handleOpens(2)}> */}
                            <img className="default-radius-img img-responsive" src={'https://serai-hms.s3.ap-southeast-1.amazonaws.com/hms/images/dropOff.png'} width="605" height="412" alt="" />
                            <div className='img-title'>Airport pick & Drop Service</div>
                            {/* </a> */}
                        </div>
                    </div>
                    <div>
                        <div className="facilities-slider">
                            {/* <a className="lightbox" onClick={() => handleOpens(2)}> */}
                            <img className="default-radius-img img-responsive" src={'https://serai-hms.s3.ap-southeast-1.amazonaws.com/hms/images/security.webp'} width="605" height="412" alt="" />
                            <div className='img-title'>Technology enabled Rooms</div>
                            {/* </a> */}
                        </div>
                    </div>
                    <div>
                        <div className="facilities-slider">
                            {/* <a className="lightbox" onClick={() => handleOpens(2)}> */}
                            <img className="default-radius-img img-responsive" src={'https://serai-hms.s3.ap-southeast-1.amazonaws.com/hms/images/camera.webp'} width="605" height="412" alt="" />
                            <div className='img-title'>CCTV- Protected Premises</div>
                            {/* </a> */}
                        </div>
                    </div>
                </Slider>
            </div>
        </section>
        {open && (
    <Grid container spacing={3}  >
        <div>
            <Modal
                className={classes.modal}
                open={open}
                onClose={handleCloses}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <Grid item xs={12} sm={6} md={4} className={classes.paper}>
                        <ImageGallery
                            items={seraiBotGalSlide}
                            showThumbnails={true}
                            thumbnailPosition={'bottom'}
                            showPlayButton={false}
                            startIndex={currentImage}
                        />
                        <div className='image-modal-close' onClick={handleCloses}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="31" height="31" viewBox="0 0 31 31" fill="none">
                                <path fillRule="evenodd" clipRule="evenodd" d="M15.5 30C23.5081 30 30 23.5081 30 15.5C30 7.49187 23.5081 1 15.5 1C7.49187 1 1 7.49187 1 15.5C1 23.5081 7.49187 30 15.5 30Z" fill="white" fill-opacity="0.9" stroke="#DDDDDD"/>
                                <path fillRule="evenodd" clipRule="evenodd" d="M11.69 11.3277C11.5425 11.3277 11.4097 11.4171 11.3542 11.5538C11.2987 11.6905 11.3316 11.8471 11.4373 11.95L14.9872 15.5L11.4373 19.0499C11.3428 19.1409 11.3048 19.2758 11.3379 19.4027C11.3711 19.5296 11.4702 19.6287 11.5971 19.6619C11.724 19.695 11.8589 19.657 11.9499 19.5626L15.4999 16.0126L19.0498 19.5626C19.1408 19.657 19.2757 19.695 19.4026 19.6619C19.5295 19.6287 19.6286 19.5296 19.6618 19.4027C19.6949 19.2758 19.6569 19.1409 19.5624 19.0499L16.0125 15.5L19.5624 11.95C19.6696 11.8458 19.7019 11.6865 19.6436 11.5488C19.5853 11.4111 19.4485 11.3233 19.299 11.3277C19.2049 11.3305 19.1155 11.3698 19.0498 11.4374L15.4999 14.9874L11.9499 11.4374C11.8817 11.3673 11.7879 11.3277 11.6901 11.3277H11.69Z" fill="#0C0D34"/>
                            </svg>
                        </div>
                    </Grid>
                </Fade>
            </Modal>
        </div>
    </Grid>
    )}  
        </div>
    );
}

//what is needed at start
const mapStateToProps = ({ cmsReducer }) => {  
    if(cmsReducer?.relNewsData || cmsReducer.loading){ 
    }
};
//which actions our function can dispatch
const mapDispatchToProps = (dispatch) => {
    return {

    };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(FaclitiesServices));
