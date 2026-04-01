import React, { useState, useEffect } from 'react';
import axios from 'axios';import {useStyles} from "./styles";     
import {connect} from "react-redux"; 
import * as actions from "../../../store/actions";    
// import OwlCarousel from 'react-owl-carousel';
// import 'owl.carousel/dist/assets/owl.carousel.css';
// import 'owl.carousel/dist/assets/owl.theme.default.css';
import { withRouter } from "react-router";
import Container from "@material-ui/core/Container";
import {
    trial5,village,mall,dinoValley,mosque,station, mall2,mall1,market,superMrkaet,park,beverly,airport,monal,monomnet,
    vectorImage,wheel,weatherImage,cloud,sunny,vectorLine,leftArrow1,rightArrow1,clouds,thunderstrom,clear,rain,
    
} from "../../../assets/images/images";
import Grid from "@material-ui/core/Grid";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/scss/image-gallery.scss";
import "react-image-gallery/styles/css/image-gallery.css";
import "../scss/general.scss";
import fetchWeatherData from './corsProxy';
import TouristSpots from './touristSpots';

const iframe = '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d26548.597554104676!2d73.07035564267308!3d33.719952523008125!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38dfbf7bda3bc1b7%3A0xc4a08c1f020d6b92!2sRockville%20House%20managed%20%26%20operated%20by%20Serai%20Boutique%20Hotels%20and%20Resorts!5e0!3m2!1sen!2s!4v1689080438950!5m2!1sen!2s" width="100%" height="450" style="border:0;border-radius:15px" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>'
function Iframe(props) {
    return (
        <div dangerouslySetInnerHTML={ {__html:  props.iframe?props.iframe:""}} />
    );
}

function TouristAttraction(props) {  
    const classes = useStyles();  

    const [open, setOpen] = React.useState(false);
    const [currentImage, setCurrentImage] = useState(0);
    const [weatherData, setWeatherData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
                try {
                    const response = await fetchWeatherData();
                    setWeatherData(response.data);
                } catch (error) {
                    console.log("error")
                }
            };
            fetchData();
      }, []);
    // const seraiBotGal = [gallery2,gallery3];
    const handleOpens = (index) => {
        setCurrentImage(index)
        setOpen(true);
    };

    const handleCloses = () => {
        setOpen(false);
    };
  
    return (
        <div>
        <section className='tourist-sec'>
            <div className="defalut-heading-mainhm text-center">
                <h2 >Tourist Attractions Near Serai</h2>
                <p>- WE ARE WAITING FOR YOU -</p>
            </div>
           <TouristSpots/>
        </section>
        <div>
      {weatherData && (
        <section className='weather-section'>
            <Container>
                <Grid container spacing={3}>
                    <Grid item sm={12} lg={9} className='d-flex'>
                        <div className='weather-box'>
                        <img
                        className='img-responsive img-full'
                        src={'https://serai-hms.s3.ap-southeast-1.amazonaws.com/hms/images/weatherImage.webp'}
                        width='900'
                        height='365'
                        alt=""
                        />
                        <div className='weather-information'>
                            <h5>Weather In Islamabad</h5>
                            <img
                                className='img-cloud'
                                src={weatherData.list[0].weather[0].main==='Clear'?clear:weatherData.list[0].weather[0].main=='Rain'?rain:weatherData.list[0].weather[0].main=='Thunderstrom'?thunderstrom:clouds}
                                width='64'
                                height='46'
                                alt=""
                            />
                            <span className='today-temp'>    
                            {Math.round(weatherData.list[0].main.temp - 273.15)}°C
                            <p>{weatherData.list[0].weather[0].main}</p>
                            </span>
                            <span className='rectangle-style'>   
                                <div className='rectangle-div'>
                                    <div className='weather-rectangle'>
                                        <h5>Pressure</h5>
                                        <p>{weatherData.list[0].main.pressure} mb</p>
                                    </div>
                                    <div className='weather-rectangle'>
                                        <h5>Visibility</h5>
                                        <p>{weatherData.list[0].visibility/1000} km</p>
                                    </div>
                                    <div className='weather-rectangle'>
                                        <h5>humidity</h5>
                                        <p>{weatherData.list[0].main.humidity} %</p>
                                    </div>
                                </div>    
                            </span>
                        </div>
                        </div>
                    </Grid>
                    <Grid item sm={12} lg={3} className='d-flex'>
                        <div className='more-forecast'>
                            <h5>Weather Prediction</h5>
                            {[1,5,13].map((index) => { //to avoid the data for same dates as weather api has hourly weather data for same date
                            {/* {weatherData.list.slice(1, 4).map((item, index) => {  */}
                                 let dateObj = new Date(weatherData.list[index].dt * 1000);
                                 let options = { month: "short", day: "numeric" };
                                 let formattedDate = dateObj.toLocaleString("en-US", options);
                                return(
                                    <div key={index} className='list-item-weather'>
                                        <img
                                         src={weatherData.list[index].weather[0].main==='Clear'?clear:weatherData.list[index].weather[0].main=='Rain'?rain:weatherData.list[index].weather[0].main=='Thunderstrom'?thunderstrom:clouds}
                                        alt=""
                                        />
                                        <span className='extended-forecast-data'>    
                                            <p>{weatherData.list[index].weather[0].main}</p>
                                            <span className='font-date'>{formattedDate}</span>
                                        </span>
                                        <span className='extended-forecast-temp'> 
                                            {Math.round(weatherData.list[index].main.temp_min - 273.15)}°C/{Math.round(weatherData.list[index].main.temp_max - 273.15)}°C
                                        </span>
                                        {index !== 2 && (
                                        <span className='span-spacer'>
                                            <img
                                            className='img-full img-responsive'
                                            src={vectorLine}
                                            alt=""
                                            />
                                        </span>
                                        )}
                                    </div>
                                )

                            })}
                        </div>
                    </Grid>
                </Grid>           
            </Container>
        </section>
      )}
      
       <section className='map-section'>
        <Container>
            <div className='map-location'>
              <Iframe iframe={iframe} />
            </div>
        </Container>
       </section>
    </div>
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
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(TouristAttraction));
