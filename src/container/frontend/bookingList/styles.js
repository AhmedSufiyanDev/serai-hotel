import { makeStyles } from '@material-ui/core/styles';
import { fiRrCalendar, fiRrArrowSmallRight, fiRsUser, minusSvg, plusSvg, filterSvg,bookingList } from "../../../assets/images/images";
export const useStyles = makeStyles((theme) => ({

    root: {
        '& .MuiInput-underline:before': {
            borderBottom: 'none',
        },
        '& .MuiInput-underline:after': {
            borderBottom: 'none',
        },
        '& .MuiInput-underline:hover:before': {
            borderBottom: 'none',
        },
        '& .MuiSelect-select:focus': {
            backgroundColor: 'transparent',
        },
        '& .MuiInputBase-root': {
            background: '#FCF5EB !important',
            border: '1px solid #8F6F3F !important',
            borderRadius: '50px',
            fontStyle: 'normal',
            fontWeight: '500',
            fontSize: '15px',
            color: '#797979',
            padding: '13px 15px 13px 25px',
            outline: 'none',
            boxShadow: 'none !important',
            height: '45px',
            width: '200px'
        },
    },
    priceDropdown: {
        '& .MuiInput-underline:before': {
            borderBottom: 'none',
        },
        '& .MuiInput-underline:after': {
            borderBottom: 'none',
        },
        '& .MuiInput-underline:hover:before': {
            borderBottom: 'none',
        },
        '& .MuiSelect-select:focus': {
            backgroundColor: 'transparent',
        },
        '& .MuiInputBase-root': {
            background: 'transparent !important',
            fontStyle: 'normal',
            fontWeight: '500',
            fontSize: '15px',
            color: '#797979',
            padding: '13px 15px 13px 25px',
            height: '45px',
            width: '120px',
            cursor: 'pointer'
        },
    },
    gridPaddCustome: {
        [theme.breakpoints.down('md')]: {
            "width": "calc(100% + 24px)",
            "margin": "-12px",
            '& > .MuiGrid-item': {
                "padding": "12px"
            }
        }
    },
    checkinSvg:{
        backgroundImage: `url("${fiRrCalendar}")`
    },
    checkoutSvg:{
        backgroundImage: `url("${fiRrArrowSmallRight}")`
    },
    guestSvg:{
        backgroundImage: `url("${fiRsUser}")`
    },
    minusSvg:{
        backgroundImage: `url("${minusSvg}")`
    },
    plusSvg:{
        backgroundImage: `url("${plusSvg}")`
    },
    filterSvg:{
        backgroundImage: `url("${filterSvg}")`
    },
    banner_main: {
        backgroundImage: `url('https://serai-hms.s3.ap-southeast-1.amazonaws.com/hms/images/bookingList.webp')`,
    },
    banner_overlay: {
        background: "linear-gradient(180deg, rgba(20, 20, 20, 0.50) 0%, rgba(107, 87, 64, 0.50) 100%)",
        position: "absolute",
        top: "0px",
        left: "0px",
        width: "100%",
        height: "100%",
        zIndex: "2"
    },

    fullInfoLoader:{
        "& .MuiCircularProgress-root": {
            width: '20px !important',
            height: '20px !important',
        },
    }
}));   