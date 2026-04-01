import { makeStyles } from '@material-ui/core/styles';
import {galleryBanner } from "../../../assets/images/images";
export const useStyles = makeStyles((theme) => ({

    banner_main: {
        backgroundImage: `url("${'https://serai-hms.s3.ap-southeast-1.amazonaws.com/hms/images/galleryBanner.webp'}")`,
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
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        outline: 0, // Disable browser on-focus border
        padding: theme.spacing(5, 4, 8),
        backgroundColor: 'transparent',
        boxShadow: 'none',
         // border: '2px solid #000',
        // boxShadow: theme.shadows[5],
    },
}));   