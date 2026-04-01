import { Container, Grid, Card } from '@material-ui/core';
import React, { useState } from 'react';
import '../../../assets/scss/marketPlace.scss'
import { Loader, CustomSeparator } from "../../../components/index";
import { marketImage1, marketImage2, marketImage3, marketImage4, marketImageIcon1, marketImageIcon2, marketImageIcon3, marketImageIcon4 } from '../../../assets/images/images';
import { useStyles } from './styles';

const marketArray = [
    { image: marketImage1, icon: marketImageIcon1, link:'https://bnscouture.com/', title: 'BNS Couture', desc: 'BNS Couture A Luxury Life Style.Follow The Latest Trends & Buy Products.' },
    { image: marketImage2, icon: marketImageIcon2, link:'https://seraibistro.com.pk/', title: 'Serai Food Street', desc: "Serai Food Street & Artisan Market. Islamabad's Very Own Premium & Speciality Market Place" },
    { image: marketImage3, icon: marketImageIcon4, link:'http://Rajachangezsultan.com', title: 'Raja Changez Sultan', desc: "Explore a curated collection of exquisite, luxury paintings, designed to adorn spaces with timeless elegance." },
    { image: marketImage4, icon: marketImageIcon3, link:'https://instagram.com/kreo33?igshid=OGQ5ZDc2ODk2ZA==', title: 'Kreo', desc: "Discover opulent luxury in every piece—explore a curated collection of fine furniture and exquisite crockery." },
];


function MarketPlace(props) {
    const classes = useStyles();
    const [breadCrumbsList, setBreadCrumbsList] = useState([
        { text: 'Home', url: '/' },
        { text: 'Market Place', url: '' },
    ]);
    
    return (
        <div className="align-class">
            <div className="market-detail-list">
                <div className="header-market-fix">
                    <Container fixed>
                        <Grid container>
                            <Grid item xs={12} md={12} lg={12} >
                                <CustomSeparator
                                    breadCrumbsList={breadCrumbsList}
                                    {...props}
                                    setBreadCrumbsList={setBreadCrumbsList}
                                />
                            </Grid>
                        </Grid>
                    </Container>
                </div>
            </div>
            <section>
                <h2 className='market-font'>Serai Market Place</h2>
            </section>

            <section>
                <Container fixed>
                    <Grid container spacing={5}>
                        {marketArray.map((item, index) => (
                            <Grid item xs={12} sm={12} md={12} lg={6}>
                                <Card className={`${classes.root} card-inner-style `}>
                                    <div className='padd-image'>
                                        <div >
                                            <img src={item.image} className='img-responsive ' />
                                        </div>
                                        <div className='outer-logo-rel'>
                                            <img src={item.icon} className='inner-logo-style'/>
                                        </div>
                                    </div>
                                    <div className='market-text'>
                                        <span>{item.title}</span>
                                    </div>
                                    <div className='market-desc'>
                                        <span>{item.desc}</span>
                                        <a href={item.link} target='_blank'><button className='market-btn'>Visit Now</button></a>
                                    </div>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </section>
        </div>
    )
}

export default MarketPlace;