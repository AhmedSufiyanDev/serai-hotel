import React, { useEffect, useState, useRef } from "react";
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { Container, Grid, Box, Link, Typography, useMediaQuery, useTheme } from '@material-ui/core';
import { blogCard1, blogCard2, blogCard3, blogCard4, blogCard5, blogCard6 } from '../../../assets/images/images';
import '../../../assets/scss/blogList.scss';
import '../scss/general.scss';
import { useStyles } from './styles';
import * as actions from "../../../store/actions";
import { connect } from "react-redux";
import { Loader,CustomSeparator} from "../../../components/index";



// const blogListCard = [
//     { image: blogCard1, title: 'Hotel room are second home just relax!', description: 'Phasellus enim libero, blandit vel sapien vitae, condimentum ultricies magna et. Quisque euismod orci' },
//     { image: blogCard2, title: 'Hotel room are second home just relax!', description: 'Phasellus enim libero, blandit vel sapien vitae, condimentum ultricies magna et. Quisque euismod orci' },
//     { image: blogCard3, title: 'Hotel room are second home just relax!', description: 'Phasellus enim libero, blandit vel sapien vitae, condimentum ultricies magna et. Quisque euismod orci' },
//     { image: blogCard4, title: 'Hotel room are second home just relax!', description: 'Phasellus enim libero, blandit vel sapien vitae, condimentum ultricies magna et. Quisque euismod orci' },
//     { image: blogCard5, title: 'Hotel room are second home just relax!', description: 'Phasellus enim libero, blandit vel sapien vitae, condimentum ultricies magna et. Quisque euismod orci' },
//     { image: blogCard6, title: 'Hotel room are second home just relax!', description: 'Phasellus enim libero, blandit vel sapien vitae, condimentum ultricies magna et. Quisque euismod orci' },
// ]

function BlogList(props) {
    const classes = useStyles();
    const theme = useTheme();
    const isSmall = useMediaQuery(theme.breakpoints.up('lg'));
    const [blogData,setBlogData] = useState([])
    const [breadCrumbsList, setBreadCrumbsList] = useState([
        {text: 'Home', url: '/'},
        {text: 'Blogs', url: ''},
      ]);


    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }, [props.location.pathname]);

    useEffect(() => {
        props.getBlogStart({latest:0});
     }, []);

    
    useEffect(() => {
        if(props?.successBlog){
            if(Array.isArray(props?.blog)){
                setBlogData(props?.blog)
            }
        }
    }, [props?.successBlog]);

    const openBlog = (id) => { 
        const queryParams = {
            BlogID:id,
        };
        const searchString = new URLSearchParams(queryParams).toString();
        props.history.push({ pathname: `/blog`,search: `?${searchString}`});
    }

    return (
        <div className='align-class'>
            <div className="blog-detail-list">
                <div className="header-blog-fix">
                    <Container fixed>
                        <Grid container>
                            <Grid item xs={12} md={12} lg={12} >
                                <CustomSeparator
                                    breadCrumbsList={breadCrumbsList}
                                    {...props}
                                    setBreadCrumbsList={setBreadCrumbsList}
                                />
                                {/* <span className='breadcrum-blog'>
                                    Serai / blogs
                                </span> */}
                            </Grid>
                        </Grid>
                    </Container>
                </div>
            </div>
            <section>
                <h2 className='blog-font'>Blog</h2>
            </section>
            <section id='blogList'>
            {props?.loading ?<Loader />:
                <Container fixed >    
                    <Grid container spacing={isSmall ? 5 : 2}> 
                        {blogData?.map((item, index) => {
                            const htmlContent = item.Description;
                            if (!htmlContent) return ''; 
                            const parser = new DOMParser();
                            const parsedHTML = parser.parseFromString(htmlContent, 'text/html');
                            // Get the first p tag from the parsed HTML
                            const firstPTag = parsedHTML.querySelector('p');
                            return(
                                <Grid item xs={12} xm={12} md={8} lg={4} className='d-flex'>
                                    <Card className='blog-box-card' onClick={() => openBlog(item.id)}>
                                        <CardActionArea >
                                            <CardMedia className={classes.media}>
                                                <img src={item.ThumbnailImage} className='img-responsive img-full blog-thum-img' />
                                            </CardMedia>
                                            <CardContent className='blog-box-card-inner'>
                                                <Typography gutterBottom variant="h5" component="h2" className='title-blog'>
                                                    {item.Title}
                                                </Typography>
                                                <Typography variant="body2" color="textSecondary" component="p" className='desc-blog-list' dangerouslySetInnerHTML={{ __html:firstPTag ? firstPTag.outerHTML : '' }}>
                                                </Typography>
                                            </CardContent>
                                        </CardActionArea>
                                    </Card>
                                </Grid>
                            )
                        })}
                    </Grid>
                </Container>
            }
            </section>
        </div>
    )
}
//what is needed at start
const mapStateToProps = ({ cmsReducer }) => {
    return {
        loading:cmsReducer.loading,
        blog:cmsReducer.blog,
        successBlog:cmsReducer.successBlog};
  };
  //which actions our function can dispatch
const mapDispatchToProps = (dispatch) => {
    return {
        getBlogStart: (data) => dispatch(actions.getBlog(data)),
        };
    };
export default connect(mapStateToProps, mapDispatchToProps)(BlogList);
