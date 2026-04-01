import { makeStyles } from '@material-ui/core/styles';
import { cartIcon, cart2 } from "../../../assets/images/images";

export const useStyles = makeStyles((theme) => ({
  logo: {
    maxWidth: 160,
    "& img": {
      width: '163px',
      // height:'36px'
    }
  },
  logoMobile: {
    maxWidth: 160,
    "& img": {
      width: '129px',
    }
  },
  fullDrawerNav: {
    "& .MuiDrawer-paper": {
      width: '100% !important',
      background: 'rgba(10, 16, 25, 0.85)',
      backdropFilter: 'blur(15px)',
    }
   },
  paper: {
    position: 'absolute',
    width: 400,
    height: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    borderRadius: '20px',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  modalCart: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paperCart: {
    // backgroundColor: theme.palette.background.paper,
    position: 'absolute',
    right: 200,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    border: 'none',
    width: "372px",
    height: "495px",
    borderRadius: '22px',
    border: '1px solid #DCE1E5',
    background: '#F3F8FC',
    transition: 'none',

  },

  button1: {
    position: 'absolute',
    width: '390.23px',
    height: '40.1px',
    left: '6.15px',
    top: '70px',
    background: '#0E97FF',
    color: '#0E97FF',
    borderRadius: "10px",
  },

  loginModalbtn: {
    width: '390.23px',
    height: '40.1px',
    left: '6.15px',
    marginTop: '10px !important',
    marginBottom: '10px !important',
    background: '#0E97FF',
    color: '#0E97FF',
    borderRadius: "10px",
  },
  GridBox: {
    position: 'absolute',
    width: '195px',
    height: ' 18px',
    left: '140px',
    bottom: '20px',
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: '12px',
    lineHeight: '18px',
    color: '#5F5F5F'
  },
  forgottenPin: {
    position: 'absolute',
    width: '85px',
    height: '18px',
    left: '320px',
    top: '260px',
    whiteSpace: 'nowrap',
    color: '#5F5F5F',
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: '12px',
    lineHeight: '18px',
  },
  Checkbox: {
    position: 'absolute',
    width: '111px',
    height: '20px',
    left: '35px',
    top: '260px',
    whiteSpace: 'nowrap',
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: '2px',
    lineHeight: '10px',
    color: '#5F5F5F',
  },
  cartSvg: {
    backgroundImage: `url("${cartIcon}")`
  },
  cartSvg2: {
    backgroundImage: `url("${cart2}")`
  },
  modalPos: {
    top: `10%`,
    left: `35%`,
    transform: `translate(-20%, -35%%)`,
    position: 'absolute',
    width: 400,
    minHeight: 300,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    borderRadius: '20px',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  loginForm: {
    "& .MuiFormControl-fullWidth": {
      marginTop: '10px'
    }
  },
  registerForm: {
    "& .MuiFormControl-fullWidth": {
      marginTop: '10px'
    }
  },
  backDropOff: {
    "& .MuiBackdrop-root": {
      backgroundColor: 'none'
    }
  },
}));
