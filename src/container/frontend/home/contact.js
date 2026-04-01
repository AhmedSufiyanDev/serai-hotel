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
import { generalStyles } from "../general/general";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { InputError } from "../../../components/index";
import { validateInputs } from "../../../services/utils";
import UseAnalyticsEventTracker from '../../../components/googleAnalytics';
import ReactPixel from 'react-facebook-pixel';
import PerfectScrollbar from 'react-perfect-scrollbar'
import { useMediaQuery } from '@material-ui/core'


function ContactUsModal(props) {  
    const classes = useStyles();  
    const generalClasses = generalStyles();
    const matches = useMediaQuery('(max-width: 767px)');

    const [values, setValues] = useState({
        name: "",
        phone: "",
        Email: "",
        message: ""
      });
    
      const [errors, setErrors] = useState({
        name: "",
        phone: "",
        Email: "",
        message: ""
      });
    
    const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
    setErrors({
        ...errors,
        [prop]: ''
    });
    };

    const closeModal = () =>{
        props.setShowModal(false)
    }
    
    const submitContactUs = (e) => {
        e.preventDefault();
        let { name, Email, phone, message } = values;
        let data = { name, Email, message }
        let recordedErrors = validateInputs(data);
    
        if (Object.keys(recordedErrors).length > 0) {
          setErrors(recordedErrors);
        }
        else {
          UseAnalyticsEventTracker("ContactUs");
          ReactPixel.trackCustom('ContactUs');
          //gaEventTracker("ContactUs-Submited");
          props.submitContactUsStart({ name, phone, email: Email, message });
        }
    
    };

    useEffect(() => {
        console.log("props?.successContactUs",props?.successContactUs)
      if(props?.successContactUs){
            props.setShowModal(false)
            setTimeout(() => {
                props.errorHandlerSuccess()
            }, 2000)      
         }
      }, [props?.successContactUs]);
  
    return (
        <div className="gettouch-hm">
            <div>
                <PerfectScrollbar className='scroll-gettouch-heigt' style={{
                            height: matches ? 550 : 550,
                            width :'100%'
                    }}>
              <div className="form-contact-spacer1 positionRelative">
              
                <div className="gettouch-hm-heading-mainhm1">
                  <h2>Get in Touch!</h2>
                  <p>We are always looking for great partners and customers.
                    Message us and let’s do something together.</p>
                </div>    
                <div onClick={closeModal}>
                    <svg width="31" height="31" viewBox="0 0 31 31" fill="none" className='cross-modal-btn'><path fill-rule="evenodd" clip-rule="evenodd" d="M15.5 30.3193C23.5081 30.3193 30 23.8275 30 15.8193C30 7.81121 23.5081 1.31934 15.5 1.31934C7.49187 1.31934 1 7.81121 1 15.8193C1 23.8275 7.49187 30.3193 15.5 30.3193Z" fill="#F6F7FB" stroke="#DDDDDD"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M11.6902 11.6471C11.5427 11.6472 11.4099 11.7366 11.3544 11.8732C11.2989 12.0099 11.3317 12.1666 11.4374 12.2695L14.9874 15.8194L11.4374 19.3694C11.3429 19.4604 11.3049 19.5953 11.3381 19.7222C11.3712 19.8491 11.4703 19.9482 11.5972 19.9813C11.7241 20.0145 11.859 19.9765 11.95 19.882L15.5 16.332L19.0499 19.882C19.1409 19.9765 19.2758 20.0145 19.4027 19.9813C19.5296 19.9482 19.6287 19.8491 19.6619 19.7222C19.695 19.5953 19.657 19.4604 19.5625 19.3694L16.0126 15.8194L19.5625 12.2695C19.6698 12.1653 19.702 12.0059 19.6437 11.8682C19.5855 11.7305 19.4486 11.6427 19.2992 11.6471C19.205 11.6499 19.1156 11.6893 19.05 11.7569L15.5 15.3068L11.95 11.7569C11.8818 11.6867 11.7881 11.6471 11.6902 11.6471H11.6902Z" fill="#0C0D34"></path></svg>
                </div>                    
                
                    <Grid item xs={12} lg={12} className="text-fields-margin">
                        <FormControl
                        className={`${generalClasses.fullWidth} positionRelative`}
                        >
                        <label className="form-label">Your Name (required)</label>
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
                    <Grid item xs={12} lg={12} className="text-fields-margin">
                        <FormControl
                        className={`${generalClasses.fullWidth} positionRelative`}
                        >
                        <label className="form-label">Mobile or Phone Number</label>
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
                    <Grid item xs={12} lg={12} className="text-fields-margin">
                        <FormControl
                        className={`${generalClasses.fullWidth} positionRelative`}
                        >
                        <label className="form-label">Email Address</label>
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
                    <Grid item xs={12} lg={12} className="text-fields-margin">
                        <FormControl
                        className={`${generalClasses.fullWidth} positionRelative`}
                        >
                        <label className="form-label">Your Query or Message</label>
                        <textarea
                            type="text"
                            className="form-control-custome text-area-height text-area-formpd"
                            id="message"
                            name="message"
                            placeholder="Message:"
                            value={values.message}
                            onChange={handleChange('message')}                        
                        >

                        </textarea>
                        {/* <TextField
                            type="text"
                            className="form-control-custome text-area-height text-area-formpd"
                            id="message"
                            name="message"
                            placeholder="Message:"
                            value={values.message}
                            onChange={handleChange('message')}
                            rows={2}
                            required
                        /> */}
                        {errors.message && <InputError
                            className="invalid-feedback"
                            message={errors.message}
                        />}
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} lg={12} className="text-fields-margin text-center">
                      <div className='d-flex'>
                        <div className="contact-form-button" onClick={submitContactUs}>
                            <Button >Submit</Button>
                        </div>
                      </div>
                      
                    </Grid>
                    {props?.loading &&
                      <Grid item xs={12} lg={9}>
                            <p className="wait-para">Please Wait ...!</p>
                      </Grid>
                    }
                   
                <Grid container>
                    <Grid item>
                        <div className="msgNote text-left"></div>
                    </Grid>
                </Grid>
                
              </div>
              </PerfectScrollbar>
            </div>
        </div>     
    );
}

//what is needed at start
const mapStateToProps = ({ cmsReducer }) => {
    const { loading, error,successContactUs} = cmsReducer;
    return { loading, error,successContactUs};
  };
//which actions our function can dispatch
const mapDispatchToProps = (dispatch) => {
    return {
        submitContactUsStart: (data) => dispatch(actions.submitContactUs(data)),
        errorHandlerSuccess: () => dispatch(actions.cmsHandlerSuccess())
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ContactUsModal));