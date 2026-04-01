// Modal.js
import React, { useEffect, useState, useRef } from "react";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { DuplexSuite2 } from "../../../assets/images/images";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import { withRouter } from "react-router-dom/cjs/react-router-dom.min";

function BannerImage(props) {
  //const [open, handleClose] = props;
  //const [image, setImage] = useState("");

  // useEffect(() => {
  //   if (props.success) {
  //     console.log("useeffect called", props.bannerImage);
  //     setImage(props.bannerImage);
  //   }
  //   // console.log("image is->", image);
  // }, [props.success]);

  return (
    <>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        style={{ height: "100%" }}
      >
        <Grid item>
          <Button
            onClick={props.handleClose}
            style={{ marginLeft: "100%", top: "2%" }}
          >
            <svg
              width="36"
              height="36"
              viewBox="0 0 36 36"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M24 12C23.7187 11.7188 23.3372 11.5608 22.9395 11.5608C22.5417 11.5608 22.1603 11.7188 21.879 12L18 15.879L14.121 12C13.8381 11.7268 13.4592 11.5756 13.0659 11.579C12.6726 11.5824 12.2964 11.7402 12.0183 12.0183C11.7402 12.2964 11.5824 12.6726 11.579 13.0659C11.5756 13.4592 11.7268 13.8381 12 14.121L15.879 18L12 21.879C11.7268 22.1619 11.5756 22.5408 11.579 22.9341C11.5824 23.3274 11.7402 23.7036 12.0183 23.9817C12.2964 24.2598 12.6726 24.4176 13.0659 24.421C13.4592 24.4244 13.8381 24.2732 14.121 24L18 20.121L21.879 24C22.1619 24.2732 22.5408 24.4244 22.9341 24.421C23.3274 24.4176 23.7036 24.2598 23.9817 23.9817C24.2598 23.7036 24.4176 23.3274 24.421 22.9341C24.4244 22.5408 24.2732 22.1619 24 21.879L20.121 18L24 14.121C24.2812 13.8397 24.4392 13.4582 24.4392 13.0605C24.4392 12.6627 24.2812 12.2813 24 12Z"
                fill="white"
              />
              <path
                d="M18 0C14.4399 0 10.9598 1.05568 7.99974 3.03355C5.03966 5.01141 2.73255 7.82263 1.37018 11.1117C0.00779915 14.4008 -0.348661 18.02 0.345873 21.5116C1.04041 25.0033 2.75474 28.2106 5.27208 30.7279C7.78943 33.2453 10.9967 34.9596 14.4884 35.6541C17.98 36.3487 21.5992 35.9922 24.8883 34.6298C28.1774 33.2674 30.9886 30.9603 32.9664 28.0003C34.9443 25.0402 36 21.5601 36 18C35.9948 13.2277 34.0968 8.65231 30.7222 5.27778C27.3477 1.90324 22.7723 0.00516162 18 0ZM18 33C15.0333 33 12.1332 32.1203 9.66645 30.472C7.19972 28.8238 5.27713 26.4811 4.14181 23.7402C3.0065 20.9994 2.70945 17.9834 3.28823 15.0736C3.86701 12.1639 5.29562 9.49118 7.3934 7.3934C9.49119 5.29561 12.1639 3.867 15.0736 3.28822C17.9834 2.70944 20.9994 3.00649 23.7403 4.14181C26.4811 5.27712 28.8238 7.19971 30.472 9.66644C32.1203 12.1332 33 15.0333 33 18C32.9956 21.9769 31.4139 25.7897 28.6018 28.6018C25.7897 31.4139 21.9769 32.9956 18 33Z"
                fill="white"
              />
            </svg>
          </Button>
          <img
            src={props?.bannerImage}
            className="img-responsive left-right-auto"
            alt="..."
          />
        </Grid>
      </Grid>
    </>
  );
}

/*
const mapStateToProps = ({ cmsReducer }) => {
  const { loadingBannerImage, bannerImage, success } = cmsReducer;
  return {
    loadingBannerImage,
    success,
    bannerImage,
  };
};*/
//which actions our function can dispatch
/*const mapDispatchToProps = (dispatch) => {
  return {
    getBannerImage: (data) => dispatch(actions.getBannerImage(data)),
    errorHandlerSuccess: () => dispatch(actions.cmsHandlerSuccess()),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(BannerImage));*/
export default BannerImage;
