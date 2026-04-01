import React, { useEffect, useState } from "react";
import { useStyles } from './styles';
import { Container, Grid, Box, Link, ImageListItem, ImageList, Modal, Backdrop, Fade } from '@material-ui/core';
import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/scss/image-gallery.scss";
import "react-image-gallery/styles/css/image-gallery.css";
import '../../frontend/scss/gallery.scss';
import { galleryImage, galleryImage1, galleryImage2, zoomIn, leftArrow1, rightArrow1 } from "../../../assets/images/images";
// import OwlCarousel from 'react-owl-carousel';
// import 'owl.carousel/dist/assets/owl.carousel.css';
// import 'owl.carousel/dist/assets/owl.theme.default.css';
import * as actions from "../../../store/actions";
import { connect } from "react-redux";
import { Loader } from "../../../components/index";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// const imagesSlides = [
//     {
//         name: 'Deluxe Room',
//         images: [
//             { original: galleryImage, thumbnail: galleryImage },
//             { original: galleryImage1, thumbnail: galleryImage1 },
//             { original: galleryImage2, thumbnail: galleryImage2 },
//             { original: galleryImage, thumbnail: galleryImage },
//             { original: galleryImage1, thumbnail: galleryImage1 },
//             { original: galleryImage2, thumbnail: galleryImage2 },
//         ],
//     },
//     {
//         name: 'Deluxe Suite',
//         images: [
//             { original: galleryImage, thumbnail: galleryImage },
//             { original: galleryImage1, thumbnail: galleryImage1 },
//             { original: galleryImage2, thumbnail: galleryImage2 },
//             { original: galleryImage, thumbnail: galleryImage },
//             { original: galleryImage1, thumbnail: galleryImage1 },
//             { original: galleryImage2, thumbnail: galleryImage2 },
//         ],
//     },
//     {
//         name: 'Duplex Suite',
//         images: [
//             { original: galleryImage, thumbnail: galleryImage },
//             { original: galleryImage1, thumbnail: galleryImage1 },
//             { original: galleryImage2, thumbnail: galleryImage2 },
//             { original: galleryImage, thumbnail: galleryImage },
//             { original: galleryImage1, thumbnail: galleryImage1 },
//             { original: galleryImage2, thumbnail: galleryImage2 },
//         ],
//     },
//     {
//         name: 'Apartment',
//         images: [
//             { original: galleryImage, thumbnail: galleryImage },
//             { original: galleryImage1, thumbnail: galleryImage1 },
//             { original: galleryImage2, thumbnail: galleryImage2 },
//             { original: galleryImage, thumbnail: galleryImage },
//             { original: galleryImage1, thumbnail: galleryImage1 },
//             { original: galleryImage2, thumbnail: galleryImage2 },
//         ],
//     },
// ];
function Gallery(props) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [currentImage, setCurrentImage] = useState(0);
    const [currentImageRow, setCurrentImageRow] = useState(0);

    
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
        arrows:true,
        infinite: false,
        speed: 500,
        prevArrow: <CustomPrevArrow />,
        nextArrow: <CustomNextArrow />,
        responsive: [
            {
                breakpoint: 0, 
                settings: {
                    slidesToShow: 2, 
                    slidesToScroll: 2,
                },
            },
            {
                breakpoint: 600, 
                settings: {
                    slidesToShow: 2,
                    slidesToScroll:2,
                },
            },
            {
                breakpoint: 768, 
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                },  
            },
            {
                breakpoint: 992, 
                settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
                },  
            },
            {
                breakpoint: 1000, 
                settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
                },  
            },
            {
              breakpoint: 1200, 
              settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
              },  
            },
            {
              breakpoint: 1366, 
              settings: {
              slidesToShow: 4,
              slidesToScroll: 4,
              },  
            },
            {
              breakpoint: 1600, 
              settings: {
              slidesToShow: 8,
              slidesToScroll: 8,
              },  
            },
            {
              breakpoint: 1920, 
              settings: {
              slidesToShow: 5,
              slidesToScroll: 5,
             
              }, 
            },
            {
              breakpoint: 2500, 
              settings: {
              slidesToShow: 6,
              slidesToScroll: 6,
              }, 
            }
          ]
    };



    useEffect(() => {
        props.roomCatListStart();
     }, []);

     const imagesSlides = props?.roomList?.map((room, index) => ({
        name: room.Name,
        images: room.category_gallery?.map((item) => ({
            original: item.image, thumbnail: item.image,
        }))
    }));

    const handleOpens = (index,rowIndex) => {
        setCurrentImage(index)
        setCurrentImageRow(rowIndex)
        setOpen(true);
    };

    const handleCloses = () => {
        setOpen(false);
    };
    return (
        <div className="booking">
            <div className="header-heigt-fix"></div>
            <div className={`${classes.banner_main} banner-main-gallery`}>
                <div className={classes.banner_overlay}></div>
                <Container fixed>
                    <Grid container>
                        <Grid item xs={12} sm={12} lg={12}>
                            <div className="banner-gallery ">
                                <h1>GALLERY</h1>
                            </div>
                        </Grid>
                    </Grid>
                </Container>
            </div>
            <section className="gallery-outersection">
                {props?.loading?<Loader/>:
                    <div>
                        {imagesSlides?.map((row, rowIndex) => (
                            <div key={rowIndex}>
                                <Container fixed>
                                    <Grid container>
                                        <Grid item xs={12} sm={12} lg={12}>
                                                <h2 className="gallery-main-head">{row.name}</h2>
                                        </Grid>
                                    </Grid>
                                </Container>
                                <Slider className="gallery-slider" {...settings}
                                    // dots={false}
                                    // nav={true}
                                    // loop={true}
                                    // responsive={{
                                    //     0: {
                                    //         items: 3,
                                    //         stagePadding: 0,
                                    //         margin: 0,
                                    //         // navText: ['<img src="' + leftArrow1 + '">', '<img src="' + rightArrow1 + '">'],
                                    //     },
                                    //     600: {
                                    //         items: 3,
                                    //         stagePadding: 0,
                                    //         margin: 0,
                                    //         // navText: ['<img src="' + leftArrow1 + '">', '<img src="' + rightArrow1 + '">'],
                                    //     },
                                    //     768: {
                                    //         items: 4,
                                    //         stagePadding: 0,
                                    //         margin: 0,
                                    //         // navText: ['<img src="' + leftArrow1 + '">', '<img src="' + rightArrow1 + '">'],
                                    //     },
                                    //     992: {
                                    //         items: 6,
                                    //         stagePadding: 60,
                                    //         margin: 40
                                    //     },
                                    //     1000: {
                                    //         items: 4,
                                    //         stagePadding: 0,
                                    //         margin: 0,
                                    //         // navText: ['<img src="' + leftArrow1 + '">', '<img src="' + rightArrow1 + '">'],
                                    //     },
                                    //     1200: {
                                    //         items: 4,
                                    //         stagePadding: 0,
                                    //         margin: 0,
                                    //         navText: ['<img src="' + leftArrow1 + '">', '<img src="' + rightArrow1 + '">'],
                                    //     },
                                    //     1366: {
                                    //         items: 4,
                                    //         stagePadding: 0,
                                    //         margin: 0,
                                    //         navText: ['<img src="' + leftArrow1 + '">', '<img src="' + rightArrow1 + '">'],

                                    //     },
                                    //     1600: {
                                    //         stagePadding: 40,
                                    //         items: 8,
                                    //         margin: 55,
                                    //         navText: ['<img src="' + leftArrow1 + '">', '<img src="' + rightArrow1 + '">'],

                                    //     },
                                    //     1920: {
                                    //         stagePadding: 0,
                                    //         items: 5,
                                    //         margin: 0,
                                    //         navText: ['<img src="' + leftArrow1 + '">', '<img src="' + rightArrow1 + '">'],
                                    //     },

                                    // }}
                                >
                                    {row.images?.map((src, index) => (
                                        <div className="carousel-item" key={index}>
                                            <div className="image-container">
                                                <div className="image-wrapper">
                                                    <img
                                                        className='your-image-class' // Replace with your image class
                                                        src={src.original}
                                                        onClick={() => handleOpens(index,rowIndex)}
                                                        key={index}
                                                    />
                                                    <div className="overlay" onClick={() => handleOpens(index,rowIndex)}>
                                                        <i className="zoom-icon"><img src={zoomIn} /></i>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </Slider>
                            </div>
                        ))}

                        {open && (
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
                                        <div className={classes.paper}>
                                            <svg width="31" height="31" viewBox="0 0 31 31" fill="none" className='cross-modal-btn1' onClick={handleCloses}><path fill-rule="evenodd" clip-rule="evenodd" d="M15.5 30.3193C23.5081 30.3193 30 23.8275 30 15.8193C30 7.81121 23.5081 1.31934 15.5 1.31934C7.49187 1.31934 1 7.81121 1 15.8193C1 23.8275 7.49187 30.3193 15.5 30.3193Z" fill="#F6F7FB" stroke="#DDDDDD"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M11.6902 11.6471C11.5427 11.6472 11.4099 11.7366 11.3544 11.8732C11.2989 12.0099 11.3317 12.1666 11.4374 12.2695L14.9874 15.8194L11.4374 19.3694C11.3429 19.4604 11.3049 19.5953 11.3381 19.7222C11.3712 19.8491 11.4703 19.9482 11.5972 19.9813C11.7241 20.0145 11.859 19.9765 11.95 19.882L15.5 16.332L19.0499 19.882C19.1409 19.9765 19.2758 20.0145 19.4027 19.9813C19.5296 19.9482 19.6287 19.8491 19.6619 19.7222C19.695 19.5953 19.657 19.4604 19.5625 19.3694L16.0126 15.8194L19.5625 12.2695C19.6698 12.1653 19.702 12.0059 19.6437 11.8682C19.5855 11.7305 19.4486 11.6427 19.2992 11.6471C19.205 11.6499 19.1156 11.6893 19.05 11.7569L15.5 15.3068L11.95 11.7569C11.8818 11.6867 11.7881 11.6471 11.6902 11.6471H11.6902Z" fill="#0C0D34"></path></svg>
                                            <ImageGallery
                                                items={imagesSlides[currentImageRow]?.images ?? []}
                                                showThumbnails={true}
                                                thumbnailPosition={'bottom'}
                                                showPlayButton={false}
                                                startIndex={currentImage}
                                            />
                                        </div>
                                    </Fade>
                                </Modal>
                            </div>
                        )}
                    </div>
                }
                
            </section>
        </div >

    )
}

//what is needed at start
const mapStateToProps = ({ cmsReducer }) => {
    const {loading,error,success,roomList,blog,successBlog} = cmsReducer;  
    return {loading,error,success,roomList,blog,successBlog};
  };
  //which actions our function can dispatch
  const mapDispatchToProps = (dispatch) => {
    return {
      roomCatListStart: (data) => dispatch(actions.roomCatList(data)),
    };
  };

  export default connect(mapStateToProps, mapDispatchToProps)(Gallery);
