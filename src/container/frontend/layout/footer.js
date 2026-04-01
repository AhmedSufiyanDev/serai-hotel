import React, { useEffect, useState, useRef } from "react";
import { generalStyles } from "../general/general";
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { footerLogo, Twitter, facebook,whatsapp,callBtn,footerIcon,footerImage,footerLine,footerYoutube,footerInstagram,footerFacebook,paymentIcons,callIcon, locationfooter,} from "../../../assets/images/images";
import "../scss/footer.scss";
import "../scss/general.scss"; 
import { Link as RouterLink, } from 'react-router-dom'; 
import { connect } from "react-redux"; 
import { AnimatedIcon } from "../../../components";
import UseAnalyticsEventTracker from '../../../components/googleAnalytics';
import { CONTACT_NO,CONTACT_NO2 } from '../../../environment/index.js';
import { Typography, useMediaQuery } from "@material-ui/core";
import Modal from "@material-ui/core/Modal";
import ContactUsModal from '../home/contact';
import Fade from "@material-ui/core/Fade";
import { useStyles } from "../home/styles";
import {
  footerUpperSection
} from "../../../assets/images/images";
import { getTrackBackground } from "react-range";


function Footer(props) { 
  const generalClasses = generalStyles();
  const classes = useStyles();
  const smallAccomodation = useMediaQuery('(max-width: 1199px)');
  const [showModal, setShowModal] = useState(false);


  const handleGetInTouch = () => {
    setShowModal(true)
  };
  //const gaEventTracker = UseAnalyticsEventTracker('Home');
  return (
    <div>  
      <div className='footer-upper-section' style={{ backgroundImage: `url(${footerUpperSection})` }}>
          <Container fixed >
                <Grid item xs={12} sm={12} lg={12}>
                <div className='footer-section-txt' >
                <div className='footer-inner-txt'>
                  <p>Rockville House thrives under the expert care of Serai Hotels
                      (A property management company).
                  Serai serves other properties and is not limited to Rockville House!</p>
                </div>
                <div className='footer-inner-btn'>
                  <button className='footer-btn' onClick={handleGetInTouch}>GET IN TOUCH</button>
                </div>
              </div>
              </Grid>
        </Container>
          
      </div>
      <div className={`${generalClasses.root} ${generalClasses.footer_image} footer-bg-sect`}>
        <Container fixed className="footer-tpcontet">
          <Grid container spacing={smallAccomodation?2:6}>
            <Grid item xs={12} sm={12} lg={6} className="footer-cent-mb">
              <div>
                  <div className='footer-txt'>
                    <img
                      src={footerIcon}
                      alt=""
                      />
                      <p>
                        Rockville House managed & operated by Serai Boutique Hotels and Resorts located in the heart of Islamabad. Rockville House is an ideal place for the local guests and foreigners alike.
                      </p>
                  </div>
                  <div>
                      <img
                      src={footerLine}
                      alt=""
                      />
                  </div>
                  <div className='social-icons'>
                    <div>
                        <p>Follow Us:</p>
                    </div>
                    <div className='footer-icons'>
                    <a href="https://youtu.be/VoeH5R9vuaY" onClick={()=>UseAnalyticsEventTracker('Youtube')} target="_blank" data-toggle="tooltip" data-bs-toggle="tooltip">
                      <img
                        className='img-margin'
                        src={footerYoutube}
                        alt=""
                        />
                    </a>
                        <a href="https://instagram.com/seraiboutiquehotel?igshid=MzRlODBiNWFlZA==" onClick={()=>UseAnalyticsEventTracker('Instagram')} target="_blank" data-toggle="tooltip" data-bs-toggle="tooltip">
                          <img
                          className='img-margin'
                          src={footerInstagram}
                          alt=""
                        />
                        </a>
                        <a href="https://www.facebook.com/experienceserai?mibextid=ZbWKwL"  onClick={()=>UseAnalyticsEventTracker('Facebook')} target="_blank" data-toggle="tooltip" data-bs-toggle="tooltip">
                          <img
                          className='img-margin'
                          src={footerFacebook}
                          alt=""
                        />
                        </a>
                    </div>
                  </div>
              </div>
            </Grid>
            <Grid item xs={12} sm={12} lg={3} className="footer-cent-mb">
              <div className='footer-useful-link'>
                <h5>Useful Links</h5>
                <div className='footer-links'>
                  {/* <RouterLink to={{pathname: "/"}}>Room Categories</RouterLink> */}
                  <RouterLink to={{pathname: "/home/blog-list"}}>Blogs</RouterLink>
                  <RouterLink to={{pathname: "/policies/privacy-policy"}}>Privacy Policy</RouterLink>
                      <RouterLink to={{pathname: "/policies/refund-policy"}}>Refund Policy</RouterLink>
                      <RouterLink to={{pathname: "/policies/complaint-policy"}}>Complaint Policy</RouterLink>
                      <RouterLink to={{pathname: "/policies/legal-notice"}}>Legal Notice</RouterLink>
                      <RouterLink to={{pathname: "/policies/terms-and-conditions"}}>Terms & Conditions</RouterLink>
                  {/* <RouterLink to={{pathname: "/"}}>Service</RouterLink> */}
                  {/* <RouterLink to={{pathname:"/faqs"}}>FAQS</RouterLink> */}
                </div>
                <div className='payment-header'>
                  <h5>Secure Payment Options</h5>
                  <img
                    src={paymentIcons}
                    alt=""
                    />
                </div>
              </div>
            </Grid>
            <Grid item xs={12} sm={12} lg={3} className="footer-cent-mb">
              <div className='footer-useful-link'>
                <h5>Contact Us Now</h5>
                <div className='contact-us-txt'>
                  <div className='call-position'>
                    <span class="foter-contact-iocn">
                    <svg xmlns="http://www.w3.org/2000/svg" width="17" height="19" viewBox="0 0 17 19" fill="none"> <path fill-rule="evenodd" clip-rule="evenodd" d="M2.16769 1.85283L4.23611 0.861328L7.1751 6.77884L5.19322 7.7846C4.80194 8.72885 6.76345 12.5014 7.59111 12.5636C7.65656 12.5201 9.53371 11.5676 9.53371 11.5676L12.5229 17.5166C12.5229 17.5166 10.5126 18.5321 10.4472 18.5636C4.72994 21.2569 -3.44483 4.87009 2.16769 1.85283ZM3.57102 2.80859L2.827 3.18659C-1.02328 5.2581 5.86491 19.0754 9.84392 17.2011L10.5501 16.8456L8.89844 13.5584L8.15224 13.9334C5.85181 15.0936 2.14335 7.76911 4.47578 6.47985L5.20816 6.1071L3.57102 2.80859ZM11.389 9.19693L9.26752 8.54443L9.89953 6.35742C10.4421 6.52392 10.9243 6.90492 11.2145 7.45917C11.5054 8.01268 11.5512 8.63668 11.389 9.19693ZM10.5793 4C11.7073 4.3465 12.7073 5.137 13.311 6.28826C13.9154 7.44026 14.0092 8.73551 13.6732 9.89802L12.3677 9.49676C12.6041 8.67851 12.5372 7.76726 12.1117 6.95651C11.6877 6.14576 10.9837 5.59 10.1895 5.347L10.5793 4ZM15.4371 5.10334C14.5164 3.34533 12.9905 2.14008 11.2705 1.61133L10.8712 2.99208C12.2494 3.41508 13.4713 4.38109 14.2102 5.78884C14.9477 7.19584 15.0626 8.7791 14.6524 10.2004L15.9906 10.6114C16.5034 8.83685 16.3601 6.86059 15.4371 5.10334Z" fill="white"/></svg>
                    </span>
                    <p>+92 300 0553778</p>
                  </div>
                  <div className='footer-location'>
                  <span class="foter-contact-iocn">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="19" viewBox="0 0 16 19" fill="none"> <path fill-rule="evenodd" clip-rule="evenodd" d="M7.78418 0.861328C3.64268 0.861328 0.28418 4.15758 0.28418 8.22258C0.28418 12.3062 3.49412 15.1118 7.64624 18.7408L7.78418 18.8613L7.92212 18.7408C12.0742 15.1118 15.2842 12.3062 15.2842 8.22258C15.2842 4.15758 11.9257 0.861328 7.78418 0.861328ZM7.78418 14.3613C4.46993 14.3613 1.78418 11.6748 1.78418 8.36133C1.78418 5.04783 4.46993 2.36133 7.78418 2.36133C11.0984 2.36133 13.7842 5.04783 13.7842 8.36133C13.7842 11.6748 11.0984 14.3613 7.78418 14.3613ZM7.25318 11.3928L11.5342 7.17258L10.4737 6.11133L7.25243 9.27108L5.53418 7.61133L4.47368 8.67258L7.25318 11.3928Z" fill="white"/></svg>
                   </span>
                    <div className=''>
                        <span className='span-name'>Rockville House</span>
                        <span className='span-location-footer'>F-6/3, Islamabad.</span>
                    </div>
                  </div>
                  <div className='footer-location'>
                  <span class="foter-contact-iocn">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="19" viewBox="0 0 16 19" fill="none"> <path fill-rule="evenodd" clip-rule="evenodd" d="M7.78418 0.861328C3.64268 0.861328 0.28418 4.15758 0.28418 8.22258C0.28418 12.3062 3.49412 15.1118 7.64624 18.7408L7.78418 18.8613L7.92212 18.7408C12.0742 15.1118 15.2842 12.3062 15.2842 8.22258C15.2842 4.15758 11.9257 0.861328 7.78418 0.861328ZM7.78418 14.3613C4.46993 14.3613 1.78418 11.6748 1.78418 8.36133C1.78418 5.04783 4.46993 2.36133 7.78418 2.36133C11.0984 2.36133 13.7842 5.04783 13.7842 8.36133C13.7842 11.6748 11.0984 14.3613 7.78418 14.3613ZM7.25318 11.3928L11.5342 7.17258L10.4737 6.11133L7.25243 9.27108L5.53418 7.61133L4.47368 8.67258L7.25318 11.3928Z" fill="white"/></svg>
                   </span>
                    <div className=''>
                        <span className='span-name'>Rockville Apartments</span>
                        <span className='span-location-footer'>F-6/2, Islamabad.</span>
                    </div>
                  </div>
                </div>
                {/* <button className='feedback-btn'>GIVE FEEDBACK</button> */}
              </div>
            </Grid>
          </Grid>
        </Container>

        <section className='cpyright'>
          <Container>
            <Grid 
              container
              direction="row"
              spacing={2}
            >
              <Grid item xs={12} sm={12} lg={3}>
                <span className="copyright-text"><span className='footer-copyright' id="copyright">
                <script>document.getElementById('copyright').appendChild(document.createTextNode(new Date().getFullYear()))</script>
                </span> &copy;Copyright 2023 - <span className='inner-txt'>Serai Bistro Hotel</span></span>
              </Grid>
              <Grid item xs={12} sm={12} lg={9}>
                <div className="footer-social-outer"> 
                  <div className="footer-social">
                      <RouterLink to={{pathname: "/faqs"}}><span className="dot-before"></span>FAQS</RouterLink>
                      {/* <RouterLink to={{pathname: "/"}}><span className="dot-before"></span>Policy</RouterLink> */}
                  </div>
                </div>
              </Grid>
            </Grid>
          </Container>
        </section>
        <div className="whatsapp-animat">
          <a href={"https://wa.me/"+CONTACT_NO} onClick={()=>UseAnalyticsEventTracker('Whatsapp')}  target="_blank">
            <AnimatedIcon icon={whatsapp} height={60} width={60} /> 
          </a>  
        </div>
        <div className="call-animat">
          <a href={"tel:"+CONTACT_NO2} onClick={()=>UseAnalyticsEventTracker('CallNow')}>
            <AnimatedIcon icon={callBtn} height={60} width={60} /> 
          </a>  
        </div>
      </div>
      {showModal &&
        <Modal
          className={classes.modalContact}
          open={true}
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
        >
          <Fade in={true}         
          className={classes.paperContact}
>
            <ContactUsModal showModal={showModal} setShowModal={setShowModal} />
          </Fade>
        </Modal>
      }
    </div>  
  );
}

//what is needed at start
const mapStateToProps = ({   }) => {
  // const { dataGetConfig, successGetConfig } = authReducer;
  return { };
};
//which actions our function can dispatch
const mapDispatchToProps = (dispatch) => {
  return { };
};
export default connect(mapStateToProps, mapDispatchToProps)(Footer);
