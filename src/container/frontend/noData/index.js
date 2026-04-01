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


function BookingNoData(props) {
    console.log("props",props.location)
    return (
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
                    <h2 className="book-cnfrm-heading">{props.location?.errorMessage?props.location.errorMessage:'Error!'}</h2>
                </div>
            </Container>
        </div>
    )
}

// //what is needed at start
const mapStateToProps = ({ cmsReducer, authReducer }) => {
   
};
//which actions our function can dispatch
const mapDispatchToProps = (dispatch) => {
    return {
     
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingNoData);