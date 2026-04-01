import React, {useEffect} from 'react';   
import {useStyles} from "./styles";
import {generalStyles} from "../general/general";  
import Link from '@material-ui/core/Link';  
import FormControl from '@material-ui/core/FormControl'; 
import {InputError} from "../../../components/index";
import { validateInputs } from "../../../services/utils";
import {connect} from "react-redux";
import * as actions from "../../../store/actions";
import Countdown from "react-countdown";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import {getUserDataFromLocalStorage} from "../../../services/utils";
import { withRouter } from "react-router";
import {Alert} from '../../../components' 
import { CMS_DOMAIN_PREFIX } from '../../../environment/index.js';
import Scrollbars from 'react-custom-scrollbars';
import { useMediaQuery } from '@material-ui/core'

function LoginModal(props) {   
    const classes = useStyles();
    const generalClasses = generalStyles(); 
    const matches = useMediaQuery('(max-width: 767px)');
    const [values, setValues] = React.useState({
        name:"",
        email: "", 
        password:"",
        employee_id:"",
        cnic_no:"",
        mobile_no:"",
        otp: "",
        isRegister:0,
        otpTimer:0,
        resendOtp:0, 
        sendOtp:1,
        otpText:"Send OTP"
    });
 
    const [errors, setErrors] = React.useState({
        name:"",
        email: "", 
        password:"",
        employee_id:"",
        cnic_no:"",
        mobile_no:"",
        otp: "",
    });
    const [nowDate, setNowDate] = React.useState(Date.now());

    const loginStyle = {
        height: matches ? 357 : 360, width: matches ? 300 : 527
    };

    const registerStyle = {
        height: matches ? 600 : 658, width: matches ? 300 : 527
    };

    const handleChange = (prop) => (event) => {  
        setValues({ ...values, [prop]: event.target.value });
        setErrors({
            ...errors,
            [prop]: ''
        });

    };
    
    function setDateTimer(setRegister=0){
        setNowDate(Date.now());
        if(setRegister){ 
            setValues({ ...values, 
                ['otpTimer']: 1,['resendOtp']:0,['sendOtp']:0,['isRegister']:0 
            });
        }
        else
            setValues({ ...values, ['otpTimer']: 1,['resendOtp']:0,['sendOtp']:0 });
    }
    useEffect(() => { 
        if(props?.signUpSuccess){ 
            setDateTimer(1)
        }
        else if (props?.sendOtpData?.statusCode==200) { /** OTP sent successfully */ 
            if(values.otpTimer==0){
                setDateTimer()
            }
        }
    }, [props?.sendOtpData?.statusCode,props?.signUpSuccess]);
 
    const submitOtp = (e) => { 
        e.preventDefault();
        let { email } = values;
        let data = { email } 
        let recordedErrors = validateInputs(data);
 
        if (Object.keys(recordedErrors).length > 0) {
            setErrors(recordedErrors);
        } 
        else {
            delete data.bid_amount; 
            props.sendOtpStart(data);
        }
    };

    const submitRegister= (e) => {   
        e.preventDefault();
        let { name,email, password,employee_id,cnic_no,mobile_no} = values;
        let data = {name, email, password,employee_id,cnic_no,mobile_no} 
        let recordedErrors = validateInputs(data); 
        if (Object.keys(recordedErrors).length > 0) { 
            setErrors(recordedErrors);
        } 
        else { 
            props.signupStart(data);
            setValues({
                ...values,
                otp: ''
            });
        }
    }
    const submitLogin = (e) => { 
        e.preventDefault();
        let { email, otp} = values;
        let data = {email, otp} 
        let recordedErrors = validateInputs(data);
     
        if (Object.keys(recordedErrors).length > 0) {
            setErrors(recordedErrors);
        } 
        else { 
            props.loginStart(data);
            setValues({
                ...values,
                otp: ''
            });
        }
    };

    const renderer = ({ hours, minutes, seconds, completed }) => { 
        if (completed) {
            // Render a completed state 
            setValues({ ...values, ['otp']: '', ['otpTimer']: 0,['resendOtp']: 1,['sendOtp']: 0,['otpText']: "Resend OTP" });
            setErrors({
                ...errors,
                ['otp']: ''
            });  
            return <span>{seconds}</span>;
        } else {
          // Render a countdown
          return <span>{seconds}</span>;
        }
    };

    function OTPTimer(){  
        if(values.otpTimer != 0 && !props?.loggedInSuccess)
            return (
                <div className={classes.otpTimeDiv}>
                    OTP will expire in <Countdown  className={classes.otpTimer} date={nowDate + 59000} renderer={renderer} ></Countdown>
                </div>
            );
        else if(props?.loggedInSuccess)
            return "Login Successfull, Redirecting...";
        else
            return "";
    }

    function ModalBtn(){
        if(!props?.loading){ 
            if((props?.sendOtpData?.statusCode==200 || props?.signUpSuccess) && values.resendOtp==0 && values.sendOtp==0)
                return ( 
                    <Button variant="contained"  onClick={submitLogin} className={`login-button ${generalClasses.fullWidth}`}
                    >Login
                    </Button>
                );
            else
                return (
                    <Button variant="contained" onClick={submitOtp} className={`login-button ${generalClasses.fullWidth}`}>
                      {values.otpText}
                    </Button> 
                );
        } 
        else
            return (
                <div>
                    Loading...
                </div>
            ); 
    }

    if(props.loggedInSuccess ){ 
        let tokenData=localStorage.getItem('token');
        let userDetail=getUserDataFromLocalStorage();
        if(tokenData && userDetail){
            let domLink=CMS_DOMAIN_PREFIX+"/"+tokenData+"/"+JSON.stringify(userDetail); 
            window.location.replace(domLink);
        }
        else
            props.setLoginFalse()
        
        props.errorHandlerSuccess();
    }
 
    
    function registerEmployee(value){ 
        setValues({ ...values, ['isRegister']: parseInt(value)}); 
    }
    
    return (
        <div className='paper-wrapper' style={values.isRegister==0 ? loginStyle : registerStyle}>
            <div className='form-modal-close' onClick={props.setClose}>
                <svg xmlns="http://www.w3.org/2000/svg" width="31" height="31" viewBox="0 0 31 31" fill="none">
                    <path fillRule="evenodd" clipRule="evenodd" d="M15.5 30C23.5081 30 30 23.5081 30 15.5C30 7.49187 23.5081 1 15.5 1C7.49187 1 1 7.49187 1 15.5C1 23.5081 7.49187 30 15.5 30Z" fill="white" fill-opacity="0.9" stroke="#DDDDDD"/>
                    <path fillRule="evenodd" clipRule="evenodd" d="M11.69 11.3277C11.5425 11.3277 11.4097 11.4171 11.3542 11.5538C11.2987 11.6905 11.3316 11.8471 11.4373 11.95L14.9872 15.5L11.4373 19.0499C11.3428 19.1409 11.3048 19.2758 11.3379 19.4027C11.3711 19.5296 11.4702 19.6287 11.5971 19.6619C11.724 19.695 11.8589 19.657 11.9499 19.5626L15.4999 16.0126L19.0498 19.5626C19.1408 19.657 19.2757 19.695 19.4026 19.6619C19.5295 19.6287 19.6286 19.5296 19.6618 19.4027C19.6949 19.2758 19.6569 19.1409 19.5624 19.0499L16.0125 15.5L19.5624 11.95C19.6696 11.8458 19.7019 11.6865 19.6436 11.5488C19.5853 11.4111 19.4485 11.3233 19.299 11.3277C19.2049 11.3305 19.1155 11.3698 19.0498 11.4374L15.4999 14.9874L11.9499 11.4374C11.8817 11.3673 11.7879 11.3277 11.6901 11.3277H11.69Z" fill="#0C0D34"/>
                </svg>
            </div>
            {(props?.signUpSuccess) &&
                <Alert type={'success'} message="Signup Successfull, Enter OTP to Confirm"/>
            }
            {(props?.loggedInSuccess) &&
                <Alert type={'success'} message="Login Successfull, Redirecting..."/>
            }
            {(props.sendOtpError) &&
                <Alert type={'error'} message="Invalid User"/>
            }
            {(props.loggedInError) &&
                <Alert type={'error'} message="Invalid Otp"/>
            }
            {(props.signUpError) &&
                <Alert type={'error'} message={props.error.message || props.error}/>
            }
            <div>  
                {(values.isRegister==0)?
                    <div className={`${classes.loginForm} login-modal`}>
                         
                        <h2 id="simple-modal-title">Login to continue</h2>
                    
                        <FormControl className={generalClasses.fullWidth}>
                            <TextField
                            fullWidth label= "Enter Email"
                            placeholder=" Email"
                            name="email"
                            value={values.email}
                            onChange={handleChange('email')} 
                            required/>
                            {errors?.email && <InputError message={errors.email}/>}
                        </FormControl>
                        {((props?.sendOtpData?.statusCode==200 || props?.signUpSuccess) && values.resendOtp==0 && values.sendOtp==0 && !props?.loggedInSuccess) && 
                            <FormControl className={generalClasses.fullWidth}> 
                                <TextField
                                fullWidth label= "Enter OTP"
                                placeholder=" OTP"
                                name="otp" 
                                value={values.otp}
                                onChange={handleChange('otp')} 
                                required/>
                                {errors?.otp && <InputError message={"OTP is required"}/>}
                            </FormControl>
                        }
                        <ModalBtn/>
                        
                        <OTPTimer/> 
                        {/* <Grid> 
                            <FormControlLabel className={classes.Checkbox} style={{color:'#5F5F5F'}}
                                    control={<Checkbox Checked={''} onChange={''} />}
                                    label="Remember me"
                                />    
                        </Grid> */}
                        
                        <Grid item display="flex" justifyContent="center">
                            <Link to="" className={`${generalClasses.hoverIt} account-not-exists-msg`}  onClick={() => registerEmployee(1)}>
                                <p>{"Don't have an account?"} <ins style={{color:'#0E97FF'}} >Register</ins></p>
                            </Link>
                        </Grid> 
                    </div>
                    :
                    <Scrollbars autoHide style={{ position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        height: matches ? 600 : 658,
                        width: matches ? 300 : 527,
                        borderRadius: 15}}>
                        <div className={`${classes.registerForm} register-modal`}> 
                            <h2 id="simple-modal-title">Register Now</h2>

                            <FormControl className={generalClasses.fullWidth}>
                                <TextField
                                fullWidth label= "Name"
                                placeholder=" Name"
                                name="name"
                                onChange={handleChange('name')} 
                                value={values.name}
                                required/>
                                {errors?.name && <InputError message={"Name is required"}/>}
                            </FormControl>

                            <FormControl className={generalClasses.fullWidth}>
                                <TextField
                                fullWidth label= "Email"
                                placeholder=" Email"
                                name="email"
                                onChange={handleChange('email')} 
                                value={values.email}
                                required/>
                                {errors?.email && <InputError message={errors.email}/>}
                            </FormControl>
                        
                            <FormControl className={generalClasses.fullWidth}>
                                <TextField
                                fullWidth label= "Employee Id"
                                placeholder=" Employee Id"
                                name="employee_id"
                                value={values.employee_id}
                                onChange={handleChange('employee_id')} 
                                required/>
                                {errors?.employee_id && <InputError message={"Employee Id is required"}/>}
                            </FormControl>
                            
                            <FormControl className={generalClasses.fullWidth}>
                                <TextField
                                fullWidth label= "CNIC"
                                placeholder=" XXXXXXXXXXXXX"
                                name="cnic_no"
                                onChange={handleChange('cnic_no')} 
                                value={values.cnic_no}
                                required/>
                                {errors?.cnic_no && <InputError message={errors?.cnic_no}/>}
                            </FormControl>

                            <FormControl className={generalClasses.fullWidth}>
                                <TextField
                                fullWidth label= "Mobile #"
                                placeholder=" Mobile #"
                                name="mobile_no"
                                onChange={handleChange('mobile_no')}
                                value={values.mobile_no} 
                                required/>
                                {errors?.mobile_no && <InputError message={errors.mobile_no}/>}
                            </FormControl>

                            <FormControl className={generalClasses.fullWidth}>
                                <TextField
                                type={'password'}
                                fullWidth label= "Password"
                                placeholder=" Password"
                                name="password"
                                onChange={handleChange('password')} 
                                value={values.password} 
                                required/>
                                {errors?.password && <InputError message={errors.password}/>}
                            </FormControl>
                            {(!props?.loading)?
                                <Button variant="contained"  onClick={submitRegister} className={`login-button ${generalClasses.fullWidth}`}
                                    >Register
                                </Button>
                            :
                                <div>Loading...</div>
                            }
                            <Grid item display="flex" justifyContent="center">
                                <Link to="" className={`${generalClasses.hoverIt} account-exists-msg`}  onClick={() => registerEmployee(0)}>
                                    <p>{"Already have an account?"} <ins style={{color:'#0E97FF'}}>Login</ins></p>
                                </Link>
                            </Grid> 
                        </div>
                    </Scrollbars>
                }
            </div>
        </div>
    );
}

//what is needed at start
const mapStateToProps = ({authReducer}) => {
    const {loading,error,message,signUpSuccess,signUpError, loggedInSuccess,sendOtpData,sendOtpError,loggedInError} = authReducer;  
    return {loading,error,message,signUpSuccess,signUpError,loggedInSuccess,sendOtpData,sendOtpError,loggedInError};
};
//which actions our function can dispatch
const mapDispatchToProps = (dispatch) => {
    return {
        sendOtpStart: (data) => dispatch(actions.sendOtp(data)),
        loginStart: (data) => dispatch(actions.loginStart(data)), 
        setLoginFalse: () => dispatch(actions.logout()),
        signupStart: (data) => dispatch(actions.signupStart(data)), 
        errorHandlerSuccess: () => dispatch(actions.errorHandlerSuccess()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(LoginModal));