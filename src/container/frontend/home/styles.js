import { makeStyles } from "@material-ui/core/styles";
import {
  seraiBanner,
  seraiBannerMobile,
  contactLeft,
  searchField,
  locationIcon,
  guestIcon,
  fiRrCalendar,
  rockvilleHouse,
  fiRrArrowSmallRight,
  fiRsUser,
  minusSvg,
  plusSvg,
  searchIcon,
} from "../../../assets/images/images";

export const useStyles = makeStyles((theme) => ({
  iconexp: {
    maxWidth: "100px",
  },
  autoplayVidBox: {
    width: "100%",
    marginBottom: "20px",
    borderRadius: "20px",
    height: "555px",
    [theme.breakpoints.down("md")]: {
      height: "400px",
    },
    [theme.breakpoints.down("sm")]: {
      height: "300px",
    },
    [theme.breakpoints.down("xs")]: {
      height: "250px",
    },
    "& iframe": {
      borderRadius: "20px",
    },
  },

  // paragrExp: {
  //     fontFamily: 'Poppins',
  //     fontWeight: "500",
  //     fontSize: "16px",
  //     lineHeight: "24px",
  //     textAlign: "center",
  //     color: "#252D40",
  //     [theme.breakpoints.down('sm')]: {
  //         fontSize: "14px",
  //         lineHeight: "22px",
  //         marginTop: "0px",
  //         marginBottom: "30px",
  //         padding: "0px 25px"
  //     },
  // },
  // exph3: {
  //     fontFamily: "'Poppins', sans-serif",
  //     fontWeight: "700",
  //     fontSize: "36px",
  //     lineHeight: "54px",
  //     marginTop: "20px",
  //     marginBottom: "30px",
  //     color: "#252D40",
  //     [theme.breakpoints.down('sm')]: {
  //         "fontSize": "26px",
  //         "marginTop": "20px",
  //         "lineHeight": "34px",
  //         "marginBottom": "20px"
  //     },
  // },
  // expp: {
  //     fontFamily: "'Poppins', sans-serif",
  //     fontWeight: "400",
  //     fontSize: "16px",
  //     lineHeight: "32px",
  //     textAlign: "center",
  //     color: "#667488",
  //     marginBottom: "20px"

  // },
  // expsection: {
  //     paddingTop: "50px",
  //     paddingBottom: "80px",
  //     [theme.breakpoints.down('sm')]: {
  //         paddingTop: "0px",
  //         paddingBottom: "45px",
  //     },
  // },
  playPauseButton: {
    display: "inline-block",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    width: "40px",
    height: "40px",
    [theme.breakpoints.down("sm")]: {
      width: "25px",
      height: "25px",
    },
  },
  bannerlink: {
    fontSize: "12px",
    background: "#FFFFFF",
    border: "2px solid #EEF3F5",
    borderRadius: "20px 0px",
    color: "#101010",
    fontWeight: "400",
    lineHeight: "15px",
    padding: "14px 30px",
    textTransform: "uppercase",
    "& span": {
      marginLeft: "8px",
    },
  },
  banner_main: {
    backgroundImage: `url("${"https://serai-hms.s3.ap-southeast-1.amazonaws.com/hms/images/seraiBanner.webp"}")`,
    [theme.breakpoints.down("md")]: {
      backgroundImage: `url("${"https://serai-hms.s3.ap-southeast-1.amazonaws.com/hms/images/homeslider-mobile.webp"}")`,
    },
  },
  marBottom40: {
    marginBottom: "40px",
  },
  posRelative: {
    position: "relative",
  },
  social_banner: {
    lineHeight: "1",
    paddingTop: "0.5rem",
    position: "relative",
    WebkitTransform: "rotate(180deg)",
    transform: "rotate(180deg)",
    whiteSpace: "nowrap",
    WebkitWritingMode: "vertical-rl",
    writingMode: "vertical-rl",
    color: "#fff",
  },
  leftSocial: {
    position: "absolute",
    top: "50%",
    left: "0%",
    transform: "translate(0%, -50%)",
    WebkitTransform: "translate(0%, -50%)",
    zIndex: "2",
    "& ul": {
      listStyleType: "none",
    },
    "& li": {
      marginBottom: "13px",
    },
  },
  bannerContent: {
    position: "absolute",
    left: "9%",
    top: "52%",
    transform: "translate(0%, -50%)",
    WebkitTransform: "translate(0%, -50%)",
    width: "45%",
    zIndex: "5",
    boxSizing: "border-box",
    [theme.breakpoints.down("md")]: {
      width: "70%",
    },
    [theme.breakpoints.down("xs")]: {
      width: "100%",
      left: "0px",
      padding: "0px 30px",
    },
  },
  banner_main: {
    backgroundImage: `url("${"https://serai-hms.s3.ap-southeast-1.amazonaws.com/hms/images/seraiBanner.webp"}")`,
    // [theme.breakpoints.down('xs')]: {
    //     backgroundImage: `url("${homeBannerDam}")`,
    // },
  },
  // [theme.breakpoints.down('xs')]: {
  //     banner_main_mobile: {
  //         backgroundImage: `url("${homeBannerDam}")`,
  //     },
  // },
  banner_overlay: {
    background:
      "linear-gradient(180deg, rgb(20 20 20 / 35%) 0%, rgb(107 87 64 / 35%) 100%)",
    position: "absolute",
    top: "0px",
    left: "0px",
    width: "100%",
    height: "100%",
    zIndex: "2",
  },
  tabs: {
    "& .MuiTab-root.Mui-selected": {
      backgroundColor: "#0E97FF",
      color: "#fff",
      border: "1px solid #0E97FF",
    },
    "& .MuiTabs-flexContainer": {
      width: "100%",
      overflowX: "auto",
      paddingBottom: "15px",
    },
  },
  contactLeftImage: {
    backgroundImage: `url("${contactLeft}")`,
  },
  imageListRoot: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
  },
  imageList: {
    width: "100%",
    height: "auto",
    overflow: "hidden !important",
  },
  searchSvg: {
    backgroundImage: `url("${searchField}")`,
  },
  searchSvg1: {
    backgroundImage: `url("${searchIcon}")`,
  },
  locationSvg: {
    backgroundImage: `url("${locationIcon}")`,
  },
  guestSvg: {
    backgroundImage: `url("${guestIcon}")`,
  },
  checkinSvg: {
    backgroundImage: `url("${fiRrCalendar}")`,
  },
  checkoutSvg: {
    backgroundImage: `url("${fiRrArrowSmallRight}")`,
  },
  // guestSvg:{
  //     backgroundImage: `url("${fiRsUser}")`
  // },
  minusSvg: {
    backgroundImage: `url("${minusSvg}")`,
  },
  plusSvg: {
    backgroundImage: `url("${plusSvg}")`,
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    outline: 0, // Disable browser on-focus border
    padding: theme.spacing(5, 4, 8),
    backgroundColor: "transparent",
    boxShadow: "none",
    position: "relative",
    // border: '2px solid #000',
    // boxShadow: theme.shadows[5],
  },
  paperContact: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    borderRadius: 15,
  },
  modalContact: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  searchLoader: {
    "& .MuiCircularProgress-root": {
      height: "25px !important",
      width: "25px !important",
      marginRight: "10px",
    },
  },
  searchLoaderDetail: {
    "& .MuiCircularProgress-root": {
      width: "20px !important",
      height: "20px !important",
      marginTop: "15px !important",
      marginLeft: "5px !important",
    },
  },

  searchLoaderDetail: {
    "& .makeStyles-root-58": {
      height: "0px !important",
    },
  },
}));
