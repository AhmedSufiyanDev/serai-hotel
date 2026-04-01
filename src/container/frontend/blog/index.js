import React, { useEffect,useState } from 'react'; 
import { Container, Grid,Box,Link } from '@material-ui/core'; 
import { useLocation } from "react-router";
import "../scss/blog.scss";
import { useStyles } from "./styles";
import * as actions from "../../../store/actions";
import { connect } from "react-redux";
import { Loader } from "../../../components/index";
import {
    seraiBannerMobile,
    blogContentImage,
    blogImgae2
  } from "../../../assets/images/images";

function formatDate(dateString) {
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', options);
}
function Blog(props) {  
    const { query } = useLocation();
    const classes = useStyles();
    const queryParams = new URLSearchParams(props.location.search);

    useEffect(() => {
        props.getBlogDataStart({id:queryParams.get('BlogID')})
    }, [])
    
    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }, [props.location.pathname]);


    return (
        <div className={`${classes.marBottom40} ${classes.posRelative}`} id="BookNow">
        
        {/* <Box sx={{ display: { xs: "none", md: "block" } }}> */}
        <div className={`${classes.banner_main} banner-main-blog`}>
            <div className={classes.banner_overlay}></div>
            <Container fixed>
                <Grid container>
                    <Grid item xs={12} sm={12} lg={12}>
                    <div className="banner-content-blog">
                        <h1>{props?.blogData?.Title}</h1>
                        <div className='blog-info-txt'>
                            <div className='blog-inner-info'>
                                <div className='txt-style-heading'>
                                    Viewed
                                </div>
                                <div className='txt-style-content'>
                                    3 min read
                                </div>
                            </div>
                            <div className='blog-inner-info'>
                                <div className='txt-style-heading'>
                                    Published Date
                                </div>
                                <div className='txt-style-content'> 
                                    {formatDate(props?.blogData?.created_at)}
                                </div>
                            </div>
                        </div>
                    </div>
                    </Grid>
                </Grid>
            </Container>
        </div>
        <Container fixed>
            <Grid container>
                <Grid item xs={12} sm={12} lg={12}>
                    <div className='blog-content'>
                    {props?.loading ?<Loader />:
                     <div dangerouslySetInnerHTML={{__html:props?.blogData?.Description}} />
                    }
                        {/* <p>Welcome to Islamabad, the capital city of Pakistan, where modernity meets natural beauty and warm hospitality. The metropolitan city has loads to explore from breathtaking scenery to cultural attractions and delightful culinary experiences. Here are six compelling reasons why you should visit Islamabad:</p>
                        <h5>Nature and Outdoor Activities</h5>
                        <p>Nestled among the beautiful Margalla Hills and surrounding forests, Islamabad is a haven for nature enthusiasts. Go trekking on the scenic hiking trails, take a boating tour on Rawal Lake, explore the flora and fauna in the various flower gardens around the city or indulge in rock-climbing adventures.</p>
                        <h5>Tourist Attractions</h5>
                        <p>Explore the rich cultural heritage as you go to the the must-visit places. Marvel at the grandeur of the Faisal Mosque, an architectural masterpiece and one of the largest mosques in the world. Dive into the soul-stirring exhibits of the Lok Virsa Museum or take a stroll along the vintage Golra Railway Station, or bask in the patriotic spirit at the Pakistan Monument, celebrating the nation's history and unity.</p> */}
                    </div>
                    
                </Grid>
            </Grid>
        </Container>
        {/* <img
            className='image-blog'
            src={blogContentImage}
            alt=""
        /> */}
        {/* <Container fixed>
            <Grid container>
                <Grid item xs={12} sm={12} lg={12}>
                    <div className='blog-content'>
                        <h5>Planned Smart City</h5>
                        <p>Islamabad's well-planned layout boasts modern infrastructure and facilities that seamlessly blend with its natural surroundings. Explore the city's wide boulevards adorned with lush green parks, offering a refreshing experience amidst the busy urban life. Indulge in retail therapy at state-of-the-art shopping malls, and marvel at contemporary architecture around the city.</p>
                        <h5>Food in Islamabad</h5>
                        <p>Enrich your culinary experience with a variety of cuisines including Chinese, Thai, Turkish, Central Asian, Japanese, continental, Italian and Pakistani restaurants. The city's restaurants and cafes cater to every palate and match your mood. Embark on a flavorful journey that takes you from mouth-watering street food to fine dining experiences, all accompanied by the warmth and hospitality of the locals.</p>
                    </div>
                    <img
                    className='image-blog'
                    src={blogImgae2}
                    alt=""
                    />
                    <div className='blog-content'>
                        <h5>Islamabad Shopping Scene</h5>
                        <p>Whether you’re looking for the hustle bustle of vibrant local markets, local and international brands in malls or fresh produce from vendor markets, Islamabad shopping scene has the best options. Unleash your inner shopaholic in Islamabad's markets, offering a blend of tradition and modernity. Find souvenirs and gift shops brimming with handicrafts, leather goods, hand-embroidered clothes.</p>
                        <h5>Serene and Peaceful Environment</h5>
                        <p>Rest assured that Islamabad will embrace you with its safe and peaceful environment. Enjoy your trip to Islamabad with a sense of tranquility where you can relax in the city’s laid back vibe . Interact with friendly locals and immerse yourself in their genuine hospitality, making your stay in Islamabad an unforgettable experience.<br/><br/>
                            In summary, Islamabad beckons with a harmonious blend of natural wonders, cultural splendors, modern comforts, and warm hospitality. Whether you seek adventure in nature's lap, crave cultural exploration, desire retail therapy, or simply long for a safe and serene getaway, Islamabad has everything to make your journey truly memorable
                        </p>
                    </div>
                </Grid>
            </Grid>
        </Container> */}

          {/* <img style={{borderRadius:'11px'}} className="img-full img-responsive" src={seraiBanner} /> */}
        {/* </Box> */}
        {/* <Box sx={{ display: { xs: "block", md: "none" } }}>
          <div className={classes.banner_overlay}></div>
          <img className="img-full img-responsive" src={seraiBannerMobile} />
        </Box> */}
      </div>
    );
}

//what is needed at start
const mapStateToProps = ({ cmsReducer }) => {
    const { loading, error, successBlogData,blogData } = cmsReducer;
    return { loading, error, successBlogData,blogData};
  };
  //which actions our function can dispatch
const mapDispatchToProps = (dispatch) => {
    return {
         getBlogDataStart: (data) => dispatch(actions.getBlogData(data)),
        };
    };
export default connect(mapStateToProps, mapDispatchToProps)(Blog);

