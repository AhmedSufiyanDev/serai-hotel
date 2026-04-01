import React, { useEffect, useState } from 'react'
import { Button, Container, Grid, Typography, TextField, FormControl, Box } from "@material-ui/core";
import '../../frontend/scss/myAccount.scss';
import { IconButton } from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { userProfileLogo, bookingHistoryLogo, activeBookingLogo, myPaymentLogo, editProfile } from '../../../assets/images/images';
import "../scss/general.scss";
import { generalStyles } from "../general/general";
import { useStyles } from './styles';
import { NoData } from "./../../../components/index";
import * as actions from "../../../store/actions";
import { connect } from "react-redux";
import { validateInputs } from "../../../services/utils";
import { validateConfirmPassword } from "../../../services/utils";
import { InputError } from '../../../components';
import { Loader } from "../../../components/index";
import { Alert } from '../../../components';
import { currency } from '../../../environment';



const menuArray = [
    { icon: userProfileLogo, title: 'My Profile' },
    // { icon: myPaymentLogo, title: 'My Payment ' },
    { icon: activeBookingLogo, title: 'Active Booking' },
    // { icon: bookingHistoryLogo, title: 'Booking History' },
]
// const historyBooking = [
//     { title: 'Super Deluxe Family Suite', bookingDate: 'Aug 01, 2023 -> Aug 03,2023', noOfAdult: '2Adults', Price: 'RS 5,400' },
//     { title: 'Super Deluxe Family Suite', bookingDate: 'Aug 01, 2023 -> Aug 03,2023', noOfAdult: '2Adults', Price: 'RS 5,400' },
//     { title: 'Super Deluxe Family Suite', bookingDate: 'Aug 01, 2023 -> Aug 03,2023', noOfAdult: '2Adults', Price: 'RS 5,400' },
//     { title: 'Super Deluxe Family Suite', bookingDate: 'Aug 01, 2023 -> Aug 03,2023', noOfAdult: '2Adults', Price: 'RS 5,400' },


// ]
function MyAccount(props) {
    const generalClasses = generalStyles();
    const classes = useStyles();
    const [selectedMenuIndex, setSelectedMenuIndex] = useState(0); // Initialize with the default menu index
    const [editMode, setEditMode] = useState(false);/////dummy edit mode
    const [userName, setUserName] = useState('')
    const [id, setUserID] = useState('')


    const [activeMode, setActiveMode] = useState(0);

    // const historyBooking = props?.userBookingData.map(function(item) {
    //     return {

    //         title: 'Super Deluxe Family Suite', 
    //         bookingDate: 'Aug 01, 2023 -> Aug 03,2023', 
    //         noOfAdult: '2Adults', 
    //         Price: 'RS 5,400'
    //     }

    // });

    // const historyBooking = props?.userBookingData?.map(function(item) {
    //      item.booking_room.map(function(room) {
    //         console.log("roomroomroomroom",room)
    //         return {
    //             title: room.room_category.Name, 
    //             bookingDate: `${item.CheckInDate} -> ${item.CheckOutDate}`, 
    //             noOfAdult: room.adult, 
    //             Price: room.Price
    //         };
    //     });
    
    // });

    // const historyBooking =props?.userBookingData.map(item) => [
    //     { title: 'Super Deluxe Family Suite', bookingDate: 'Aug 01, 2023 -> Aug 03,2023', noOfAdult: '2Adults', Price: 'RS 5,400' },
    //     { title: 'Super Deluxe Family Suite', bookingDate: 'Aug 01, 2023 -> Aug 03,2023', noOfAdult: '2Adults', Price: 'RS 5,400' },
    //     { title: 'Super Deluxe Family Suite', bookingDate: 'Aug 01, 2023 -> Aug 03,2023', noOfAdult: '2Adults', Price: 'RS 5,400' },
    //     { title: 'Super Deluxe Family Suite', bookingDate: 'Aug 01, 2023 -> Aug 03,2023', noOfAdult: '2Adults', Price: 'RS 5,400' },
    
    
    // ]


    useEffect(() => {
        const user = localStorage.getItem('guest')
        const userObject = JSON.parse(user);
        if (user) {
            const userID = userObject.UserID
            setUserID(userID)
            props.getUserData({ id: userID })
        }
    }, []);

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }, [props.location.pathname]);

    useEffect(() => {
        if (props?.successUser) {
            setValues((prevState) => ({
                ...prevState,
                name: props?.userData[0].Name,
                email: props?.userData[0].Email,
                phone: props?.userData[0].Phone,
                address: props?.userData[0].Address,
                id: props?.userData[0].UserID,
            }));
            setUserName(props?.userData[0].Name)
        }
    }, [props?.successUser]);

    useEffect(() => {
        if (props?.submitSuccessUser) {
            console.log("userData is", props?.submitData[0])
            // localStorage.setItem(props?.submitData[0])
            localStorage.setItem('guest', JSON.stringify(props?.submitData[0]));
            setTimeout(() => {
                props.errorHandlerSuccess()
            }, 2000)

        }
    }, [props?.submitSuccessUser]);


    useEffect(() => {
        if (props?.bookingDataSuccess) {
            console.log("user boooking data is",props?.userBookingData.length)
        }
    }, [props?.bookingDataSuccess]);

    const [values, setValues] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        password: '',
        id: '',
        confirmPassword: ''
    })
    const [errors, setErrors] = useState({
        Email: '',
        Phone: '',
        Password: '',
        Address: '',
        ConfirmPassword: ''
    })

    const handleChangeMenu = (index) => {
        console.log("index",index)
        if(index==1){
            props.userBookingDataStart({active:1,userID:id})
        }
        setSelectedMenuIndex(index);

    };
    const handleEditClick = () => {
        setEditMode(!editMode);
    };
    const handleChangeTextField = (event) => {
        const { name, value } = event.target;
        setValues((prevState) => ({
            ...prevState,
            [name]: value
        }));
        console.log("name", name, "values", value);
    };

    // const formatPrice = (amount) => {
    //     const formattedAmount = (Number(amount)).toLocaleString('en-PK', {
    //         style: 'currency',
    //         currency:currency,
    //         minimumFractionDigits: 0,
    //         maximumFractionDigits: 0,
    //     });
    //     return formattedAmount
    // }

    const handleActive = (index) => {
        if(index ==1 ){
            props.userBookingDataStart({active:0,userID:id})
        }
        else{
            props.userBookingDataStart({active:1,userID:id})
        }
        setActiveMode(index)
    }

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'short', day: '2-digit' };
        return new Date(dateString).toLocaleString('en-US', options);
    };

    const submitUserData = (e) => {
        e.preventDefault();

        let Email = values.email
        let Name = values.name
        let Phone = values.phone
        let Address = values.address
        let data = { Email, Name, Phone, Address }
        let recordedErrors = validateInputs(data);
        console.log('recordedErrors ', recordedErrors);

        let passwordErrors = validateConfirmPassword(values.password, values.confirmPassword);
        console.log('passwordErrors ', passwordErrors);


        if (Object.keys(recordedErrors).length > 0) {
            setErrors(recordedErrors);
        }

        else if (Object.keys(recordedErrors).length == 0 && values.password.length < 8 && !passwordErrors) {
            setErrors({
                ...errors,
                ConfirmPassword: "Password should be greater than 8 characters"
            });
        }
        else if (Object.keys(recordedErrors).length == 0 && !passwordErrors) {
            setErrors({
                ...errors,
                ConfirmPassword: "Passwords do not match"
            });
        }

        else {
            let fd = new FormData();
            for (let item in data)
                fd.append(item, data[item]);
            if (values.password !== '') {
                fd.append("Password", values.password)
            }
            fd.append('UserID', values.id)
            props.submitUserDataStart(fd);


        }
    }


    return (
        <div>
            <div className="header-heigt-account"></div>
            <div className="header-account">
                <Container fixed>
                    <span className='breadcrum-account'>
                        Serai / My Account
                    </span>
                </Container>
            </div>
            <section>
                <Container fixed>
                    <Typography className='account-heading'>My Account</Typography>
                </Container>
            </section>

            {/**menu grid section */}
            <section>
                <Container fixed>
                    <Grid container >
                        <Grid item xs={12} xm={12} md={4}>
                            {menuArray.map((item, index) => (
                                <div className={`menu-div-main ${index === selectedMenuIndex ? 'active-menu' : ''}`}
                                    onClick={() => handleChangeMenu(index)}
                                    key={index}
                                >
                                    <ul className='menu-ul-main'>
                                        <li className='menu-li-style'>
                                            <img src={item.icon} />
                                            <span>{item.title}</span>
                                        </li>
                                    </ul>
                                </div>
                            ))}
                        </Grid>
                        <Grid item xs={12} xm={12} md={8}>
                            {props?.submitSuccessUser &&
                                <Alert type={'success'} message={"Profile Updated"} />
                            }
                            <div className='profile-div-account'>
                                {selectedMenuIndex == 0 ? (
                                    <>
                                        <div className='flex-div-space'>
                                            <h2 className='main-profile-title'>My Profile</h2>
                                            <button className='edit-btn' onClick={handleEditClick} ><img className='edit-icon' src={editProfile} />Edit</button>
                                        </div>
                                        {props?.loading ?
                                            <Loader /> :
                                            <div>
                                                <div>
                                                    <IconButton
                                                        aria-label="account of current user"
                                                        aria-controls="menu-appbar"
                                                        aria-haspopup="true"
                                                    >
                                                        <AccountCircle className='account-circle-icon no-hover' />
                                                    </IconButton><span className='profile-name-text'>{userName}</span>
                                                </div>

                                                <div className='line-color'></div>
                                                <div style={{ marginTop: "30px" }}>
                                                    <Grid container spacing={2}>
                                                        <Grid item xs={12} sm={12} md={6} className="p-10 text-fields-style" >
                                                            <FormControl className={`${generalClasses.fullWidth} positionRelative`}>
                                                                <label className="form-label form-label-boking">Name<span className="compl-error"></span></label>
                                                                <TextField type="text" className="form-control-custome " placeholder="Name" name='name' value={values.name} required variant="outlined" onChange={handleChangeTextField} disabled={!editMode} />
                                                                {errors?.Name && <InputError message={"Name is required"} />}
                                                            </FormControl>
                                                        </Grid>
                                                        <Grid item xs={12} sm={12} md={6} className="p-10 text-fields-style" >
                                                            <FormControl className={`${generalClasses.fullWidth} positionRelative`}>
                                                                <label className="form-label form-label-boking">Email<span className="compl-error"></span></label>
                                                                <TextField type="text" className="form-control-custome " placeholder="Email" name='email' value={values.email} required variant="outlined" onChange={handleChangeTextField} disabled={!editMode} />
                                                                {errors?.Email && <InputError message={errors['Email']} />}
                                                            </FormControl>
                                                        </Grid>
                                                        <Grid item xs={12} sm={12} md={6} className="p-10 text-fields-style" >
                                                            <FormControl className={`${generalClasses.fullWidth} positionRelative`}>
                                                                <label className="form-label form-label-boking">Mobile Number<span className="compl-error"></span></label>
                                                                <TextField type="text" className="form-control-custome card-number-padd " style={{ width: '100%' }} name='phone' placeholder="333xxxxxxx" value={values.phone} required variant="outlined" onChange={handleChangeTextField} disabled={!editMode} />
                                                                {errors?.Phone && <InputError message={errors['Phone']} />}
                                                            </FormControl>
                                                        </Grid>
                                                        <Grid item xs={12} sm={12} md={6} className="p-10 text-fields-style" >
                                                            <FormControl className={`${generalClasses.fullWidth} positionRelative`}>
                                                                <label className="form-label form-label-boking">Address<span className="compl-error"></span></label>
                                                                <TextField type="text" className="form-control-custome " placeholder="Address" name='address' value={values.address} required variant="outlined" onChange={handleChangeTextField} disabled={!editMode} />
                                                                {errors?.Address && <InputError message={errors['Address']} />}
                                                            </FormControl>
                                                        </Grid>
                                                    </Grid>
                                                    <Grid container spacing={2}>

                                                        {/* <Grid item xs={12} sm={12} md={6} className="p-10 text-fields-style" >
                                                            <FormControl className={`${generalClasses.fullWidth} positionRelative`}>
                                                                <label className="form-label form-label-boking">State<span className="compl-error"></span></label>
                                                                <TextField type="text" className="form-control-custome card-number-padd " style={{ width: '100%' }} name='state' placeholder="state" value={editMode ? values.state : ''} required variant="outlined" onChange={handleChangeTextField} />
                                                            </FormControl>
                                                        </Grid> */}
                                                    </Grid>
                                                    <Grid container spacing={2}>
                                                        <Grid item xs={12} sm={12} md={6} className="p-10 text-fields-style" >
                                                            <FormControl className={`${generalClasses.fullWidth} positionRelative`}>
                                                                <label className="form-label form-label-boking">New Password<span className="compl-error"></span></label>
                                                                <TextField type="password" className="form-control-custome " name='password' placeholder="password" value={values.password} required variant="outlined" onChange={handleChangeTextField} disabled={!editMode} />
                                                                {errors?.ConfirmPassword && <InputError message={errors?.ConfirmPassword} />}
                                                            </FormControl>
                                                        </Grid>
                                                        <Grid item xs={12} sm={12} md={6} className="p-10 text-fields-style" >
                                                            <FormControl className={`${generalClasses.fullWidth} positionRelative`}>
                                                                <label className="form-label form-label-boking">Confirm Password<span className="compl-error"></span></label>
                                                                <TextField type="password" className="form-control-custome card-number-padd " style={{ width: '100%' }} name="confirmPassword" placeholder="password" value={values.confirmPassword} required variant="outlined" onChange={handleChangeTextField} disabled={!editMode} />
                                                            </FormControl>
                                                        </Grid>
                                                    </Grid>
                                                    <div className='btn-div'>
                                                        <Button>Cancel</Button>
                                                        <Button className={`save-btn ${classes.buttonNoHover}`} onClick={submitUserData} disabled={!editMode} >Save Changes</Button>
                                                    </div>
                                                </div>
                                            </div>
                                        }
                                    </>
                                ) : <div>
                                    <div>
                                        <h2 className='boking-history-head'>Booking History</h2>
                                    </div>
                                    <div className='btn-main-conainer'>
                                        <button className={activeMode === 0 ? 'act-btn1' : 'act-btn'} onClick={() => handleActive(0)}>Active</button>
                                        <button className={activeMode === 1 ? 'act-btn1' : 'act-btn'} onClick={() => handleActive(1)}>Previous</button>
                                    </div>
                                    {props?.userBookingData?.length!=0 ? (
                                        <div className='box-top'>
                                             {props?.loading?<Loader />:
                                                <div>
                                                    {props?.userBookingData?.map((item, index) => (
                                                        <div>
                                                            {item.booking_room.map((room, roomIndex) => (
                                                                <Box key={roomIndex} className="detail-booking-history">
                                                                    <span className='title-font'>{room.room_category.Name}</span>
                                                                    <span>{formatDate(item.CheckInDate)+ ' ' + '->' +' ' +formatDate(item.CheckOutDate)}</span>
                                                                    <span>{room.adult} Adults</span>
                                                                    <span className='price-font'> {room.room_category.Price}</span>
                                                                </Box>

                                                            ))}
                                                        </div>
                                                    ))}
                                                </div>
                                             }

                                        </div>
                                    ) :
                                        <div>
                                            <div class="norooms-book">
                                                <div>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="109" height="108" viewBox="0 0 109 108" fill="none"> <g filter="url(#filter0_d_2763_2947)"> <circle cx="54.5776" cy="53" r="50" fill="white" /> </g> <path fill-rule="evenodd" clip-rule="evenodd" d="M43.6687 36.6364V33H46.6687V36.6364H62.1533V33H65.1533V36.6364H67.3049C71.3215 36.6364 74.5776 39.8925 74.5776 43.9091V65.7273C74.5776 69.7439 71.3215 73 67.3049 73H41.8504C37.8337 73 34.5776 69.7439 34.5776 65.7273V43.9091C34.5776 39.8925 37.8337 36.6364 41.8504 36.6364H43.6687ZM43.6687 39.3637H41.8504C39.34 39.3637 37.3049 41.3987 37.3049 43.9091V48.4545H71.8503V43.9091C71.8503 41.3987 69.8153 39.3637 67.3049 39.3637H65.1533V43.9091H62.1533V39.3637H46.6687V43.9091H43.6687V39.3637ZM71.8503 65.7273V51.1818H37.3049V65.7273C37.3049 68.2377 39.34 70.2727 41.8504 70.2727H67.3049C69.8153 70.2727 71.8503 68.2377 71.8503 65.7273Z" fill="#978667" /> <defs> <filter id="filter0_d_2763_2947" x="0.577637" y="0" width="108" height="108" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"> <feFlood flood-opacity="0" result="BackgroundImageFix" /> <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" /> <feOffset dy="1" /> <feGaussianBlur stdDeviation="2" /> <feComposite in2="hardAlpha" operator="out" /> <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0" /> <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_2763_2947" /> <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_2763_2947" result="shape" /> </filter> </defs></svg>
                                                </div>
                                                <h5>  You don't have any booking history</h5>
                                                {/* <div>
                                                    <button onClick={''}>Book Now</button>
                                                </div> */}
                                            </div>
                                        </div>
                                    }
                                </div>
                                }
                            </div>
                        </Grid>
                    </Grid>
                </Container>
            </section>

        </div>
    )
}

const mapStateToProps = ({ cmsReducer }) => {
    const { loading, userData, successUser, submitSuccessUser, submitData, userBookingData, bookingDataSuccess } = cmsReducer;
    return { loading, userData, successUser, submitSuccessUser, submitData, userBookingData, bookingDataSuccess };

};
//which actions our function can dispatch
const mapDispatchToProps = (dispatch) => {
    return {
        getUserData: (data) => dispatch(actions.getUser(data)),
        submitUserDataStart: (data) => dispatch(actions.submitUserData(data)),
        userBookingDataStart: (data) => dispatch(actions.userBookingData(data)),
        errorHandlerSuccess: () => dispatch(actions.errorHandlerSuccess())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MyAccount);

