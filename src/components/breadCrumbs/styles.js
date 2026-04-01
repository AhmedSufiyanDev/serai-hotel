import {makeStyles} from "@material-ui/core/styles";

const drawerWidth = 240;
export const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    width: `100% !important`,
    // marginTop:'5%',
    // width: `calc(100% - ${drawerWidth}px) !important`,
    // zIndex: theme.zIndex.drawer + 1,
    // transition: theme.transitions.create(["width", "margin"], {
    //     easing: theme.transitions.easing.sharp,
    //     duration: theme.transitions.duration.leavingScreen,
    // }),
    // background: "orange",
    // marginLeft: drawerWidth,
    // width: `calc(100% - ${drawerWidth}px)`,
  },
  appBarShift: {
    // backgroundColor: 'transparent',
    backgroundColor: '#1B2132',
    color: '#fff',
    // marginLeft: drawerWidth,
    // width: `calc(100% - ${drawerWidth}px) !important`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  appBarShift1: {
    backgroundColor: '#1B2132',
    marginLeft: 50,
    width: `calc(100% ) !important`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 6,
    fontSize: 25,
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
    paddingBottom: 25,
    height: '100%',
    backgroundColor:`#fff !important`,
    // borderTopRightRadius: 40,
    // marginTop: '5%'
    [theme.breakpoints.up('xl')]: {
			width: 365
		},
    '& .MuiList-root': {
      overflow: 'visible !important',
    }
  },
  logoTextContainer: {
    width: drawerWidth-20,
    flexShrink: 0,
    whiteSpace: "nowrap",
    [theme.breakpoints.up('xl')]: {
			width: 345
		}
  },
  logoTextContainerOpen: {
    width: drawerWidth-20,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    backgroundColor: "#f8fcfd",
    color: 'white',
    [theme.breakpoints.up('xl')]: {
			width: 345
		}
  },
  logoTextContainerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1,
    },
    backgroundColor: "#fff",
    top:65
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    backgroundColor: "#f8fcfd",
    color: 'white',
    height: '90%',
    top: 65,
    [theme.breakpoints.up('xl')]: {
			width: 365
		}
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    // width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1,
    },
    backgroundColor: "#f8fcfd",
    top:65
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: 'column',
    paddingBottom: 250
  }, small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  content: {
    flexGrow: 1,
    // padding: theme.spacing(3),
    padding: 0,
    position: "relative",
    // overflow: "hidden",
    backgroundColor: '#fcfafa',
    // width: '-moz-available',
    width: `calc(100% - ${drawerWidth}px) !important`,
    top: 87,
    height:`calc(100vh - 6em) !important`,
    // overflowX: 'auto'
    [theme.breakpoints.up('xl')]: {
			width: `calc(100% - 365px) !important`
		}
  },
  breadCrumbsWidth:{
    width: `calc(100% - ${drawerWidth+40}px) !important`,
    [theme.breakpoints.up('xl')]: {
			width: `calc(100% - 405px) !important`
		}
  }
}));
