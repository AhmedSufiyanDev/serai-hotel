import React, {useEffect, useState} from 'react';   
import {useStyles} from "./styles";
import {generalStyles} from "../general/general";  
import FormControl from '@material-ui/core/FormControl'; 
import {InputError} from "../../../components/index";
import {Alert} from '../../../components';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import "../scss/auth.scss";
import * as actions from "../../../store/actions";
import { withRouter } from "react-router";
import {connect} from "react-redux";

function ResetModal(props) {

    const classes = useStyles();
    const generalClasses = generalStyles(); 
    const [values, setValues] = React.useState({
        Password:"",
        confirm_password:"",
    });

    const [errors, setErrors] = React.useState({
        Password:""
    });

    const submitReset = (e) => { 
        e.preventDefault();
        let token = props.token;
        let { Password, confirm_password } = values;
        let data = {token, Password, confirm_password} 
        // let recordedErrors = validateInputs(data);
     
        // if (Object.keys(recordedErrors).length > 0)
        //     setErrors(recordedErrors);
        // else
        props.resetPasswordStart(data);
    };

    useEffect(() => {
        if(props?.resetPasswordSuccess){
            setTimeout(() => {
                props.errorHandlerSuccess()
              },2000)
              props.history.push({pathname:`/`});
        } 
    }, [props?.resetPasswordSuccess]);

    useEffect(() => {
        if(props?.resetPasswordError){
            setTimeout(() => {
                props.errorHandlerSuccess()
              },2000)
        }
    }, [props?.resetPasswordError]);

    return (
        <div>
            {(props?.resetPasswordSuccess) &&
                <Alert type={'success'} message={props.message} />
            }
            {(props.resetPasswordError) &&
                <Alert type={'error'} message={props.error} />
            }
            <div className='paper-wrapper-reset'>
                <div className='reset-modal'>  
                    <div className={`${classes.loginForm} login-modal`}>
                        
                        <h2 id="simple-modal-title">Enter new password</h2>

                        <FormControl className={`field-margin-bottom ${generalClasses.fullWidth}`}>
                            <label className="form-label form-label-boking">Enter Password</label>
                            <TextField
                            className="form-control-custome "
                            type={'password'}
                            fullWidth
                            placeholder="Enter Your Password"
                            name="password"
                            value={values.Password}
                            onChange={(e) => setValues({ ...values, ['Password']: e.target.value })}
                            required/>
                        </FormControl>
                        {errors?.Password && <InputError message={errors.Password}/>}

                        <FormControl className={`field-margin-bottom ${generalClasses.fullWidth}`}>
                            <label className="form-label form-label-boking">Confirm Password</label>
                            <TextField
                            className="form-control-custome "
                            type={'password'}
                            fullWidth
                            placeholder="Confirm Your Password"
                            name="confirm_password"
                            value={values.confirm_password} 
                            onChange={(e) => setValues({ ...values, ['confirm_password']: e.target.value })}
                            required/>
                        </FormControl>

                        <Button variant="contained" onClick={submitReset} className={`login-button ${generalClasses.fullWidth}`}>
                            Reset Password
                        </Button>                        
                    </div>
                </div>
            </div>
        </div>
    );
}

//what is needed at start
const mapStateToProps = ({authReducer}) => {
    const {loading,error,message,resetPasswordSuccess,resetPasswordError} = authReducer;  
    return {loading,error,message,resetPasswordSuccess,resetPasswordError};
};
//which actions our function can dispatch
const mapDispatchToProps = (dispatch) => {
    return {
        resetPasswordStart: (data) => dispatch(actions.resetPasswordStart(data)),
        errorHandlerSuccess: () => dispatch(actions.errorHandlerSuccess())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ResetModal)); 