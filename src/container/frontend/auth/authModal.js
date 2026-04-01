import React, { useEffect, useState } from 'react';
import { useStyles } from "./styles";
import { generalStyles } from "../general/general";
import FormControl from '@material-ui/core/FormControl';
import { InputError } from "../../../components/index";
import { Alert } from '../../../components';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
// import Scrollbars from 'react-custom-scrollbars';
import { useMediaQuery } from '@material-ui/core'
import "../scss/auth.scss";
import { validateInputs, validateMobile, isValidEmail } from "../../../services/utils";
import * as actions from "../../../store/actions";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import { Link as RouterLink, } from 'react-router-dom';
import { loginSlide1, loginSlide2, loginSlide3, seraiLoginLgo, signUpLogo } from "../../../assets/images/images";
import 'react-perfect-scrollbar/dist/css/styles.css';
import PerfectScrollbar from 'react-perfect-scrollbar'
import Fade from 'react-reveal/Fade';
// import OwlCarousel from 'react-owl-carousel';
// import 'owl.carousel/dist/assets/owl.carousel.css';
// import 'owl.carousel/dist/assets/owl.theme.default.css';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import { Loader } from "../../../components/index";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const backgroundImages = [
    'https://serai-hms.s3.ap-southeast-1.amazonaws.com/hms/images/seraiBanner.webp', 
    'https://serai-hms.s3.ap-southeast-1.amazonaws.com/hms/images/loginSlide2.webp', 
    'https://serai-hms.s3.ap-southeast-1.amazonaws.com/hms/images/loginSlide3.webp'
];

function AuthModal(props) {

    const classes = useStyles();
    const generalClasses = generalStyles();
    const matches = useMediaQuery('(max-width: 767px)');
    const [divClosed, setDivClosed] = useState(false);
    const [backgroundImage, setBackgroundImage] = useState(0);
    const [values, setValues] = React.useState({
        Name: "",
        phone: "",
        Email: "",
        Password: "",
        confirm_password: "",
        showPasswordEye: "",
        setShowPasswordEye: false,
        showPasswordEye1: "",
        setShowPasswordEye1: false,
        isRegister: props?.location.isRegister ? props?.location.isRegister : 0,
        HotelID: 1,
    });

    const [errors, setErrors] = React.useState({
        Name: "",
        phone: "",
        Email: "",
        Password: "",
        confirm_password: '',
    });

    const registerEmployee = (value) => {
        setValues({ ...values, ['isRegister']: parseInt(value) });
    }
    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
        setErrors({
            ...errors,
            [prop]: ''
        });
    };
    const handleClickShowPassword = () => {
        setValues({ ...values, showPasswordEye: !values.showPasswordEye });
    };
    const handleClickShowPassword1 = () => {
        setValues({ ...values, showPasswordEye1: !values.showPasswordEye1 });
    };
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    const submitRegister = (e) => {
        e.preventDefault();
        let { Name, Email, Password, phone, confirm_password, HotelID } = values;
        let data = { Name, Email, Password, phone, confirm_password, HotelID }
        let recordedErrors = validateInputs(data);
        if (Object.keys(recordedErrors).length > 0) {
            setErrors(recordedErrors);
        }
        else
            props.signupStart(data);
    }

    const submitLogin = (e) => {
        e.preventDefault();
        let { Email, Password } = values;
        let data = { Email, Password }
        let recordedErrors = validateInputs(data);

        if (Object.keys(recordedErrors).length > 0) {
            setErrors(recordedErrors);
        }
        else
            props.loginStart(data);
    };

    const sendResetEmail = (e) => {
        e.preventDefault();
        let { Email } = values;
        let data = { Email }
        // let recordedErrors = validateInputs(data);

        // if (Object.keys(recordedErrors).length > 0)
        //     setErrors(recordedErrors);
        // else
        props.resetEmailSentStart(data);
    };

    const modalCloseLogin = () => {
        props.history.push({ pathname: `/` });
        // setDivClosed(true)
        // window.location.reload();
    }
    useEffect(() => {
        if (props?.loggedInSuccess) {
            // setTimeout(() => {
            //     props.errorHandlerSuccess()
            // }, 2000)
            props.history.push({ pathname: `/` });
        }
    }, [props?.loggedInSuccess]);

    useEffect(() => {
        if (props?.loggedInError) {
            setTimeout(() => {
                props.errorHandlerSuccess()
            }, 2000)
        }
    }, [props?.loggedInError]);

    useEffect(() => {
        if (props?.signUpSuccess) {
            // setTimeout(() => {
            //     props.errorHandlerSuccess()
            // }, 2000)
            props.history.push({ pathname: `/` });
        }
    }, [props?.signUpSuccess]);

    useEffect(() => {
        if (props?.signUpError) {
            setTimeout(() => {
                props.errorHandlerSuccess()
            }, 2000)
        }
    }, [props?.signUpError]);

    useEffect(() => {
        if (props?.resetEmailSentSuccess) {
            setTimeout(() => {
                props.errorHandlerSuccess()
            }, 2000)
        }

    }, [props?.resetEmailSentSuccess]);

    useEffect(() => {
        if (props?.resetEmailSentError) {
            setTimeout(() => {
                props.errorHandlerSuccess()
            }, 2000)
        }
    }, [props?.resetEmailSentError]);

    // useEffect(() => {
    //     // Change the background image every 7 seconds
    //     console.log("Setting up the interval");
    //     const interval = setInterval(() => {
    //         setBackgroundImage((prevIndex) => (prevIndex + 1) % backgroundImages.length);
    //     }, 7000);

    //     return () => clearInterval(interval);
    // }, [backgroundImages]);

       var settings = {
        dots: false,
        infinite: true,
        arrows:false,
        autoplay:true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };

    return (
        <div>
            {(props?.signUpSuccess) &&
                <Alert type={'success'} message="Signup Successfull" />
            }
            {(props.signUpError) &&
                <Alert type={'error'} message={props.error.message || props.error} />
            }
            {(props?.loggedInSuccess) &&
                <Alert type={'success'} message="Login Successfull" />
            }
            {(props.loggedInError) &&
                <Alert type={'error'} message="Invalid Credentials" />
            }
            {(props?.resetEmailSentSuccess) &&
                <Alert type={'success'} message={props.message} />
            }
            {(props.resetEmailSentError) &&
                <Alert type={'error'} message={props.error} />
            }
            {divClosed ? null : (
                <div className='paper-wrappers'>
                    <Box className="login-box">
                        <svg width="31" height="31" viewBox="0 0 31 31" fill="none" className='cross-modal-btn' onClick={modalCloseLogin}><path fill-rule="evenodd" clip-rule="evenodd" d="M15.5 30.3193C23.5081 30.3193 30 23.8275 30 15.8193C30 7.81121 23.5081 1.31934 15.5 1.31934C7.49187 1.31934 1 7.81121 1 15.8193C1 23.8275 7.49187 30.3193 15.5 30.3193Z" fill="#F6F7FB" stroke="#DDDDDD"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M11.6902 11.6471C11.5427 11.6472 11.4099 11.7366 11.3544 11.8732C11.2989 12.0099 11.3317 12.1666 11.4374 12.2695L14.9874 15.8194L11.4374 19.3694C11.3429 19.4604 11.3049 19.5953 11.3381 19.7222C11.3712 19.8491 11.4703 19.9482 11.5972 19.9813C11.7241 20.0145 11.859 19.9765 11.95 19.882L15.5 16.332L19.0499 19.882C19.1409 19.9765 19.2758 20.0145 19.4027 19.9813C19.5296 19.9482 19.6287 19.8491 19.6619 19.7222C19.695 19.5953 19.657 19.4604 19.5625 19.3694L16.0126 15.8194L19.5625 12.2695C19.6698 12.1653 19.702 12.0059 19.6437 11.8682C19.5855 11.7305 19.4486 11.6427 19.2992 11.6471C19.205 11.6499 19.1156 11.6893 19.05 11.7569L15.5 15.3068L11.95 11.7569C11.8818 11.6867 11.7881 11.6471 11.6902 11.6471H11.6902Z" fill="#0C0D34"></path></svg>
                        <PerfectScrollbar style={{
                            height: matches ? 470 : 500,
                        }}
                        >
                            {values.isRegister === 0 && (//show logo for signup and login
                                <img src={seraiLoginLgo} alt="Login Logo" />
                            )}
                            {values.isRegister === 2 && (
                                <img src={seraiLoginLgo} alt="Second Logo" />
                            )}

                            {values.isRegister !== 1 && ( // Hide heading on the password reset screen
                                <h3 className='heading-modal'>
                                    {values.isRegister === 0 ? 'LOGIN' : 'Create an account'}
                                </h3>
                            )}

                            {values.isRegister === 2 ? ( // Registration section
                                <div className="registration-content">
                                    <FormControl className={`field-margin-bottom login-width-mobile ${generalClasses.fullWidth}`}>
                                        <label className="form-label-field">Enter Name <span className="compl-error">*</span></label>
                                        <TextField
                                            className="form-control-login "
                                            fullWidth
                                            placeholder="Enter Your Name"
                                            name="Name"
                                            value={values.Name}
                                            onChange={handleChange('Name')}
                                            required />
                                    </FormControl>
                                    {errors?.Name && <InputError message={errors.Name} />}

                                    <FormControl className={`field-margin-bottom login-width-mobile ${generalClasses.fullWidth} `}>
                                        <label className="form-label-field">Enter Phone No. <span className="compl-error">*</span></label>
                                        <TextField
                                            className="form-control-login "
                                            fullWidth
                                            placeholder="Enter Your Phone Number"
                                            name="phone"
                                            value={values.phone}
                                            onChange={handleChange('phone')}
                                            required />
                                    </FormControl>
                                    {errors?.phone && <InputError message={errors.phone} />}

                                    <FormControl className={`field-margin-bottom ${generalClasses.fullWidth} login-width-mobile`}>
                                        <label className="form-label-field">Enter Email <span className="compl-error">*</span></label>
                                        <TextField
                                            className="form-control-login "
                                            fullWidth
                                            placeholder="Enter Your Email"
                                            name="Email"
                                            value={values.Email}
                                            onChange={handleChange('Email')}
                                            required />
                                    </FormControl>
                                    {errors?.Email && <InputError message={errors.Email} />}

                                    <FormControl className={`field-margin-bottom ${generalClasses.fullWidth} login-width-mobile`}>
                                        <label className="form-label-field">Enter Password <span className="compl-error">*</span></label>
                                        <TextField
                                            className="form-control-login "
                                            type={values.showPasswordEye ? 'text' : 'password'}
                                            fullWidth
                                            placeholder="Enter Your Password"
                                            name="Password"
                                            value={values.Password}
                                            onChange={handleChange('Password')}
                                            InputProps={{
                                                endAdornment: (
                                                    <InputAdornment position="end" className='modal-text-field'>
                                                        <IconButton
                                                            // aria-label="toggle password visibility"
                                                            onClick={handleClickShowPassword}
                                                            onMouseDown={handleMouseDownPassword}
                                                        >
                                                            {values.showPasswordEye ? <Visibility /> : <VisibilityOff />}
                                                        </IconButton>
                                                    </InputAdornment>
                                                )
                                            }}
                                            required />
                                    </FormControl>
                                    {errors?.Password && <InputError message={errors.Password} />}

                                    <FormControl className={`field-margin-bottom ${generalClasses.fullWidth} login-width-mobile`}>
                                        <label className="form-label-field">Confirm Password <span className="compl-error">*</span></label>
                                        <TextField
                                            className="form-control-login "
                                            type={values.showPasswordEye1 ? 'text' : 'password'}
                                            fullWidth
                                            placeholder="Confirm Your Password"
                                            name="confirm_password"
                                            value={values.confirm_password}
                                            onChange={handleChange('confirm_password')}
                                            InputProps={{
                                                endAdornment: (
                                                    <InputAdornment position="end" className='modal-text-field'>
                                                        <IconButton
                                                            // aria-label="toggle password visibility"
                                                            onClick={handleClickShowPassword1}
                                                            onMouseDown={handleMouseDownPassword}
                                                        >
                                                            {values.showPasswordEye1 ? <Visibility /> : <VisibilityOff />}
                                                        </IconButton>
                                                    </InputAdornment>
                                                )
                                            }}
                                            required
                                        />
                                    </FormControl>
                                    {errors?.confirm_password && <InputError message={errors?.confirm_password} />}
                                    <Button variant="contained" onClick={submitRegister} className={`login-button-auth ${generalClasses.fullWidth}`}>
                                        CREATE ACCOUNT
                                    </Button>
                                    <p onClick={() => registerEmployee(0)} className="para cursor-button">Or back to Login?</p>
                                    <p className="para">
                                        By providing your email address, you agree to our{' '}
                                        <span>
                                            <RouterLink to={{ pathname: "/faqs", query: 1 }}>Privacy Policy and Terms of Service</RouterLink>
                                        </span>
                                    </p>
                                </div>
                            ) : ( // Login and Password Reset section
                                <React.Fragment>
                                    {values.isRegister === 1 && (
                                        <div className='reset-pass-para'>
                                            <p className="para">Enter the email address for your account and we'll send a link to reset your password.</p>
                                        </div>
                                    )}
                                    <FormControl className={`field-margin-bottom ${generalClasses.fullWidth}`}>
                                        <label className="form-label-field">Enter Email <span className="compl-error">*</span></label>
                                        <TextField
                                            className="form-control-login "
                                            fullWidth
                                            placeholder="Enter Your Email"
                                            name="Email"
                                            value={values.Email}
                                            onChange={(e) => setValues({ ...values, ['Email']: e.target.value })}
                                            required
                                        />
                                    </FormControl>

                                    {errors?.Email && <InputError message={errors?.Email} />}
                                    {values.isRegister !== 1 && (
                                        <FormControl className={`field-margin-bottom ${generalClasses.fullWidth}`}>
                                            <label className="form-label-field">Enter Password <span className="compl-error">*</span></label>
                                            <TextField
                                                type={values.showPasswordEye1 ? 'text' : 'password'}
                                                className="form-control-login "
                                                fullWidth
                                                placeholder="Enter Your Password"
                                                name="Password"
                                                value={values.Password}
                                                onChange={(e) => setValues({ ...values, ['Password']: e.target.value })}
                                                InputProps={{
                                                    endAdornment: (
                                                        <InputAdornment position="end" className='modal-text-field'>
                                                            <IconButton
                                                                // aria-label="toggle password visibility"
                                                                onClick={handleClickShowPassword1}
                                                                onMouseDown={handleMouseDownPassword}
                                                            >
                                                                {values.showPasswordEye1 ? <Visibility /> : <VisibilityOff />}
                                                            </IconButton>
                                                        </InputAdornment>
                                                    )
                                                }}
                                                required
                                            />
                                        </FormControl>
                                    )}
                                    {values.isRegister === 1 && (
                                        <Button variant="contained" onClick={sendResetEmail} className={`login-button-auth ${generalClasses.fullWidth}`}>
                                            Send Reset Link
                                            {props.loading &&
                                            <div className='loader-reset'>
                                                <Loader />
                                            </div> 
                                            }
                                        </Button>
                                        
                                    )}
                                    {values.isRegister !== 1 && (
                                        <React.Fragment>
                                            {errors?.Password && <InputError message={errors.Password} />}
                                            <p className="para-pass"> <span onClick={() => setValues({ ...values, isRegister: 1 })} className="cursor-button">Forgot your password?</span></p>
                                            <Button variant="contained" onClick={submitLogin} className={`login-button-auth ${generalClasses.fullWidth}`}>
                                                {values.isRegister === 0 ? 'Login' : 'CREATE ACCOUNT'}
                                            </Button>                                 
                                            <p className="para">Don’t have an account yet? <span onClick={() => registerEmployee(2)} className="cursor-button"> Register Account</span></p>                                    </React.Fragment>
                                    )}
                                </React.Fragment>
                            )}
                            {props.loading &&
                                <div className='loader-login'>
                                    <Loader />
                                </div> 
                            }

                            

                        </PerfectScrollbar>

                    </Box>
                    {/* <Slider {...settings}>
                        {backgroundImages.map((item, index) => (
                            
                            <div
                                key={index}
                                className={`${classes.loginForm} login-modal-background login-page`}
                                style={{
                                    backgroundImage: `url(${item})`,
                                }}
                            >
                                <div className={classes.banner_overlay_back}></div>

                            </div>
                        ))}
                    </Slider> */}
                    <Slider {...settings}>
                    {backgroundImages.map((item, index) => (
                        <div className='login-modal-background login-page'>
                         <img src={item}/>
                        </div>
                        ))}
                    </Slider>
                    <div className={classes.banner_overlay_back}></div>
             </div>

            )}
        </div>
    );
}

//what is needed at start
const mapStateToProps = ({ authReducer }) => {
    const { loading, error, message, signUpSuccess, signUpError, resetEmailSentSuccess, resetEmailSentError, loggedInSuccess, loggedInError } = authReducer;
    return { loading, error, message, signUpSuccess, signUpError, resetEmailSentSuccess, resetEmailSentError, loggedInSuccess, loggedInError };
};
//which actions our function can dispatch
const mapDispatchToProps = (dispatch) => {
    return {
        loginStart: (data) => dispatch(actions.loginStart(data)),
        signupStart: (data) => dispatch(actions.signupStart(data)),
        resetEmailSentStart: (data) => dispatch(actions.resetEmailSentStart(data)),
        errorHandlerSuccess: () => dispatch(actions.errorHandlerSuccess()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AuthModal)); 