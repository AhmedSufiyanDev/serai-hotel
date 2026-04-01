import { makeStyles } from '@material-ui/core/styles';
import { seraiBanner, seraiBannerMobile, contactLeft, searchField, locationIcon, guestIcon, fiRrCalendar, rockvilleHouse, fiRrArrowSmallRight, fiRsUser, minusSvg, plusSvg, searchIcon } from "../../../assets/images/images";

export const useStyles = makeStyles((theme) => ({
    checkinSvg: {
        backgroundImage: `url("${fiRrCalendar}")`
    },
    checkoutSvgIcon: {
        backgroundImage: `url("${fiRrArrowSmallRight}")`
    },
    minusSvg: {
        backgroundImage: `url("${minusSvg}")`
    },
    plusSvg: {
        backgroundImage: `url("${plusSvg}")`
    },
    fieldBorder: {
        "& .MuiOutlinedInput-root": {
            '&:hover fieldset': {
                border: '1px solid #DCE1E5', // Remove hover effect border
            },
            "&.Mui-focused fieldset": {
                borderColor: "#DCE1E5",
            }
        }
    },
    buttonNoHover: {
        '&:hover': {
            backgroundColor: '#AA8453', // No change on hover
        },
    },
}));    
