import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  loginForm: {
    "& .MuiFormControl-fullWidth": {
      marginTop: '10px'
    }
  },
  paddText: {
    "& .MuiInputBase-root-MuiOutlinedInput-root": {
      paddingRight: '0px !important'
    }
  },
  registerForm: {
    "& .MuiFormControl-fullWidth": {
      marginTop: '10px'
    }
  }, banner_overlay_back: {
    background: "linear-gradient(180deg, rgba(20, 20, 20, 0.50) 0%, rgba(107, 87, 64, 0.50) 100%)",
    position: "absolute",
    top: "0px",
    left: "0px",
    width: "100%",
    height: "100%",
    zIndex: "2"
  },
  errorMsgs: {
    top: "5px !important",
    color: "red !important",
    right: "5px !important",
    position: "relative !important",
    fontSize: "12px !important",
    textAlign: "right !important",
    margin: "0px 0px 0px !important",
    // [theme.breakpoints.down('sm')]: {
    // 	fontSize: "10px",
    // },
    [theme.breakpoints.down('xs')]: {
      fontSize: "10px",
    },
  },
  // [theme.breakpoints.down('sm')]: {
  // 	fontSize: "10px",
  // },
}));