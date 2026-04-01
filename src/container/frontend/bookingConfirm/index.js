import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { Button, Container, Grid } from "@material-ui/core";
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import '../scss/bookingConf.scss';
import * as actions from "../../../store/actions";
import { connect } from "react-redux";
import moment from 'moment';
import { confirmTickIcon, whiteCircle } from "../../../assets/images/images";
import Roll from 'react-reveal/Roll';
import { useCart } from '../layout/cartContext'
import { Loader} from "../../../components/index";
import { currency } from '../../../environment';
import UseAnalyticsEventTracker from '../../../components/googleAnalytics';



function BookingConfirm(props) {
    const { id } = useParams();
    const { clearCart} = useCart();
    const [data,setData]=useState()

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }, [props.location.pathname]);
    
    const bookings = [
        {
            heading: "Booking Summary",
            BookingID: data?.id,
            NoOfRooms:  data?.NoOfRoom,
            Date: moment(new Date()).format("MMM DD, YYYY"),
            CheckIn:data?.CheckInDate,
            Checkout: data?.CheckOutDate
        },
        {
            heading: "Personal Info",
            Name: data?.guest?.Name,
            Email: data?.guest?.Email,
            Mobile: data?.guest?.Phone
        },
        // {
        //     heading: "Payment Details",
        //     CardNo: 1234567890,
        //     CardNameHolder: "ahmed",
        //     CardType: "visa",
        // },
    ];



    const StyledTableCell = withStyles(() => ({
        body: {
            fontWeight: 400,
            fontSize: 14,
            color: '#797979'
        },
    }))(TableCell);

    const StyledTableRow = withStyles(() => ({
        root: {
            '&:nth-of-type(even) td': {
                backgroundColor: '#F4F4F4',
            },
            '&:last-child td': {
                borderBottom: 'none',
            },
            '&:last-child td:first-child': {
                borderRadius: '0px 0px 0px 10px',
            },
            '&:last-child td:last-child': {
                borderRadius: '0px 0px 10px 0px'
            }
        },
    }))(TableRow);

    const createData = (key, value) => {
        return { key, value };
    }

    const rowsBookingInfo = [
        // createData('Booking ID', props?.location?.bookingData.id),
        // createData('Room Type', 'Superior King Room'),
        createData('Date', moment(new Date()).format("MMM DD, YYYY")),
        // createData('Check-in',moment(props?.location?.fromDate).format("MMM DD, YYYY")),
        // createData('Check-out', moment(props?.location?.toDate).format("MMM DD, YYYY"))
    ];

    const rowsUserInfo = [
        // createData('Email',props?.location?.guest.Email ),
        // createData('Name', props?.location?.guest.Name ),
        // createData('Mobile Number', props?.location?.guest.Phone),

        // createData('Birthday', moment(props?.location?.guest.DateOfBirth).format("MMM DD, YYYY"))
    ];

    // const rowsPayment = [
    //     createData('Card No', '1234 1234 1234 1234'),
    //     createData('Expire date', '11/22/23'),
    //     createData('Country', 'Pakistan'),
    //     createData('Card Holder Name', 'Asad Khan'),
    //     createData('Total Bill', 'Rs. 6,500')
    // ];
    const fieldsWithHorizontalLine = ['bookingId', 'room', 'checkin', 'checkout'];

    // const formatPrice = (amount) => {
    //     const formattedAmount = (Number(amount)).toLocaleString('en-PK', {
    //         style: 'currency',
    //         currency:currency,
    //         minimumFractionDigits: 0,
    //         maximumFractionDigits: 0,
    //     });
  
    //     return formattedAmount
    // }

    useEffect(() => {
        UseAnalyticsEventTracker('Confirmation')
   }, []);

    useEffect(() => {
         props.getPaymentDataStart({SessionID:id});
    }, [id]);
    
    useEffect(() => {
        if(props?.success){
            console.log("called")
             setData(props?.paymentData)
             localStorage.removeItem('cart');
             localStorage.removeItem('sessionId');
             clearCart()
             const sessionId = localStorage.getItem('sessionId');
             if (!sessionId) {
                props.getSessionIDStart();
             }
            setTimeout(() => {
                props.errorHandlerSuccess()
            }, 2000)
        }
           
    }, [props?.success]);

  

    return (
        // <div className="booking" style={{ margin: '0 5%' }}>

        //     <div className="header-heigt-fix"></div>

        //     <div className='head-box'>
        //         <div className='svg-div'>
        //             <svg xmlns="http://www.w3.org/2000/svg" width="72" height="67" viewBox="0 0 72 67" fill="none">
        //                 <path fillRule="evenodd" clipRule="evenodd" d="M30.0069 0.156939C2.19341 2.86323 -10.0393 36.6869 9.6681 56.3942C26.6947 73.4208 55.776 66.962 64.0507 44.3161C65.7424 39.6869 66.6427 31.5322 65.7091 29.2977C65.1884 28.0516 62.8677 28.3078 62.808 29.618C62.8022 29.7473 62.8062 31.0536 62.817 32.521C62.969 53.3096 43.1497 67.8801 23.5869 61.3616C2.5563 54.3542 -3.75532 27.6819 11.9087 12.0107C21.7766 2.13817 36.6965 0.368847 48.7066 7.6469C51.2233 9.17214 52.7624 6.52607 50.2944 4.91725C44.987 1.45697 36.6794 -0.492268 30.0069 0.156939ZM53.6172 19.9583L37.462 36.1112L31.5251 30.1035C28.2598 26.7992 25.3612 23.922 25.0839 23.7096C23.8985 22.8019 22.5185 23.4365 22.5185 24.8895V25.6345L29.5746 32.684C37.1853 40.2877 37.0617 40.1847 38.0779 39.7638C38.292 39.675 46 32.0687 55.2066 22.8609L71.946 6.11933V5.4446C71.946 4.33455 71.4159 3.80522 70.3044 3.80522C69.7854 3.80522 69.3792 4.19848 53.6172 19.9583Z" fill="#123F36"/>
        //             </svg>
        //         </div>
        //         <h2>Booking Confirmed</h2>
        //         <p>Thank You! your booking has been placed with Us</p>
        //     </div>

        //     <div>
        //         <div className='summary-heading'>
        //             <h3>Booking Summary</h3>
        //             <Button variant="contained" className='download-button'>
        //                 <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
        //                     <path fillRule="evenodd" clipRule="evenodd" d="M1.67902 0.0817712C0.911917 0.294792 0.269009 0.945006 0.0635685 1.71557C-0.0211895 2.03357 -0.0211895 19.9796 0.0635685 20.2976C0.271371 21.077 0.919662 21.7252 1.70045 21.9342C2.05354 22.0288 16.3357 22.0193 16.6592 21.9243C17.4681 21.6866 18.1192 20.9949 18.283 20.1989C18.3633 19.8091 18.3468 14.1251 18.2651 13.9669C18.1181 13.6827 17.6177 13.6638 17.4618 13.9365C17.4196 14.0103 17.4023 14.7117 17.3857 17.019L17.3643 20.006L17.2141 20.3004C17.1052 20.5137 17.0048 20.6397 16.8493 20.758C16.44 21.0693 16.9899 21.0486 9.13998 21.0486H2.06848L1.8214 20.9562C1.48808 20.8314 1.16663 20.51 1.04188 20.1767L0.94949 19.9296V11.0066L0.949435 2.08361L1.04188 1.83653C1.16663 1.50321 1.48808 1.18176 1.8214 1.05701C2.06661 0.965276 2.09337 0.964616 5.43776 0.964561C9.14888 0.964561 8.98546 0.976317 9.1285 0.699741C9.22067 0.521546 9.18227 0.298912 9.03242 0.142524L8.91553 0.0204686L5.39382 0.0243137C2.71848 0.0272251 1.82569 0.0410127 1.67902 0.0817712ZM14.9978 0.0879234C11.0862 0.745004 8.90581 5.09556 10.6998 8.6638C12.7477 12.7368 18.5136 13.0667 21.0118 9.25381C23.8636 4.90133 20.1388 -0.775641 14.9978 0.0879234ZM16.8542 1.03103C20.9234 1.74062 22.4485 6.75299 19.46 9.59449C16.2772 12.6207 11.0344 10.3558 11.0344 5.95452C11.0344 2.88713 13.8481 0.506769 16.8542 1.03103ZM2.88008 13.8758L2.75187 14.004V16.4997V18.9953L2.87734 19.1207C3.06113 19.3046 3.36913 19.3018 3.54848 19.1147L3.67454 18.9833L3.688 18.2135L3.7014 17.4438H4.21594C4.86791 17.4438 5.24001 17.3625 5.57289 17.1473C6.79762 16.3557 6.69128 14.562 5.38129 13.9167L5.09291 13.7746L4.0506 13.7611L3.00829 13.7476L2.88008 13.8758ZM7.44833 13.8847L7.32227 14.0162V16.4997V18.9831L7.45004 19.1164L7.57786 19.2498L8.80188 19.2373C10.3211 19.2217 10.547 19.1401 10.866 18.4919L10.97 18.2806L10.9821 16.5586C10.9962 14.5591 10.9916 14.5298 10.6032 14.1414C10.24 13.7782 10.1199 13.7531 8.74486 13.7531H7.57434L7.44833 13.8847ZM12.7628 13.8241C12.5193 13.9103 12.1716 14.2306 12.0298 14.4995L11.9141 14.7187L11.9018 16.7981C11.8873 19.2573 11.8852 19.2462 12.3557 19.2462C12.7822 19.2462 12.8368 19.1247 12.8368 18.1755V17.4438H14.0191C15.4334 17.4438 15.5833 17.3995 15.5833 16.9815C15.5833 16.5253 15.5024 16.4997 14.0599 16.4997H12.8314L12.8448 15.7236L12.8582 14.9475L12.9984 14.8224L13.1385 14.6973H14.17C15.2735 14.6973 15.3709 14.6811 15.5163 14.4734C15.6467 14.2873 15.5636 13.9003 15.3711 13.7973C15.2318 13.7227 12.9837 13.7459 12.7628 13.8241ZM4.98739 14.7971C5.49835 15.0668 5.61673 15.7618 5.22518 16.1927C5.02908 16.4085 4.82919 16.4692 4.24313 16.4908L3.69602 16.511V15.6041V14.6973H4.24714C4.7413 14.6973 4.81781 14.7076 4.98739 14.7971ZM9.81249 14.7485C10.0392 14.8519 10.0474 14.9122 10.0474 16.4997C10.0474 18.4292 10.1232 18.3021 8.97244 18.3021H8.24494V16.4997V14.6973H8.97244C9.44512 14.6973 9.73943 14.7152 9.81249 14.7485Z" fill="#123F36"/>
        //                 </svg>
        //                 Download Pdf
        //             </Button>
        //         </div>

        //         <div className='booking-details'>
        //             <h4>Booking Information</h4>

        //             {/* <div className='table-outer'>
        //                 <Table aria-label="customized table">
        //                     <TableBody>
        //                         {rowsBookingInfo.map((row) => (
        //                             <StyledTableRow key={row.name}>
        //                                 <StyledTableCell align="left">{row.key}</StyledTableCell>
        //                                 <StyledTableCell align="right">{row.value}</StyledTableCell>
        //                             </StyledTableRow>
        //                         ))}
        //                     </TableBody>
        //                 </Table>
        //             </div> */}

        //             <h4>User Information</h4>

        //             {/* <div className='table-outer'>
        //                 <Table aria-label="customized table">
        //                     <TableBody>
        //                         {rowsUserInfo.map((row) => (
        //                             <StyledTableRow key={row.name}>
        //                                 <StyledTableCell align="left">{'row.key'}</StyledTableCell>
        //                                 <StyledTableCell align="right">{row.value}</StyledTableCell>
        //                             </StyledTableRow>
        //                         ))}
        //                     </TableBody>
        //                 </Table>
        //             </div> */}

        //             <h4>Payment</h4>

        //             {/* <div className='table-outer'>
        //                 <Table aria-label="customized table">
        //                     <TableBody>
        //                         {rowsPayment.map((row) => (
        //                             <StyledTableRow key={row.name}>
        //                                 <StyledTableCell align="left">{row.key}</StyledTableCell>
        //                                 <StyledTableCell align="right">{row.value}</StyledTableCell>
        //                             </StyledTableRow>
        //                         ))}
        //                     </TableBody>
        //                 </Table>
        //             </div> */}
        //         </div>

        //     </div>

        // </div>
        <div>
            <div className="header-heigt-fix"></div>
            <div className="header-booking-confirm">
                <Container fixed>
                    <Grid container>
                        <Grid item xs={12} md={12} lg={12} >
                            <span className='breadcrum-blogs'>
                                Serai / room-details / booking-information </span>
                        </Grid>
                    </Grid>
                </Container>
            </div>
            <Container fixed>
                <div className="">
                    <h2 className="book-cnfrm-heading">RESERVATION Confirmation</h2>
                    <p className="booking-cnfrm">Hello,</p>
                    <p className="booking-cnfrm-descp">Thank you for choosing to stay with us.</p>
                    <p className="booking-cnfrm-descp">Your room reservation has been put on hold on your name. Someone from our team will contacting you soon to confirm the booking & payment.</p>
                    <p className="booking-cnfrm-descp">Please feel free to connect with us for any queries or special services. </p>
                    <p className="booking-cnfrm-descp">We hope you will enjoy your stay at Serai, and we look forward to welcoming you!"</p>

                </div>
            </Container>
            {props?.loading?<Loader/>:
            <section style={{ marginBottom: '40px' }}>
                <Container fixed>
                    <Grid container spacing={8}>
                        <Grid item xs={12} xm={12} md={8}>
                            <div className='confirm-detail-main'>
                                <div>
                                    {bookings.map((section, index) => (
                                        <div key={index} className="section">
                                            <h2 className='booking-summary'>{section.heading}</h2>
                                            {Object.entries(section).map(([key, value]) => (
                                                key !== 'heading' && (
                                                    <p key={key} className='billing-div-row'>
                                                        <strong className="left-span">{key}:</strong>
                                                        <span className="right-span">{value}</span>
                                                    </p>
                                                )
                                            ))}
                                            {index !== bookings.length - 1 && <hr className='dash-line-confirm ' />}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </Grid>

                        <Grid item xs={12} xm={12} md={4}>
                            <div className='confirm-book-main'>
                                <div className='tick-padd'>
                                    <Roll top>
                                        <img src={confirmTickIcon}/>
                                    </Roll>

                                </div>
                                <div className='text-detail-booking'>
                                    <Roll top>
                                        <h2>RESERVATION Confirmed!</h2>
                                        <p>Thank You! For Choosing Serai.</p>
                                    </Roll>
                                </div>

                                <hr className='dashes-style-book' />
                                <div className='amount-paid'>
                                    <h2>{'Your Booking Amount'}</h2>
                                    <span>{data?.BookingPrice.toLocaleString('en-US', { style: 'decimal', minimumFractionDigits:0, maximumFractionDigits: 0 })}</span>
                                </div>
                            </div>
                        </Grid>
                    </Grid>
                </Container>
            </section>
            }
        </div>
    )
}

// //what is needed at start
const mapStateToProps = ({ cmsReducer, authReducer }) => {
    if (cmsReducer.paymentInfo || cmsReducer.loading) {
        if (cmsReducer.paymentInfo) {
            return {
                paymentData:cmsReducer.paymentInfo[0],
                success:cmsReducer.successPayment,
                loading: cmsReducer.loadingPaymentData,
            };
        } else
            return {
                loading: cmsReducer.loading,
            };
    } else if (authReducer.dataGetConfig || authReducer.successGetConfig) {
        return {
            dataGetConfig: authReducer.dataGetConfig,
            successGetConfig: authReducer.successGetConfig,
        };
    }
};
//which actions our function can dispatch
const mapDispatchToProps = (dispatch) => {
    return {
        getPaymentDataStart: (data) => dispatch(actions.paymentData(data)),
        errorHandlerSuccess: () => dispatch(actions.errorHandlerSuccess()),
        getSessionIDStart: (data) => dispatch(actions.getSessionID(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingConfirm);