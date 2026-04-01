import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import '../../container/frontend/scss/faqs.scss'
import { useState } from 'react';
const useStyles = makeStyles((theme) => ({

  root: {
    borderRadius: 20,
  },
  heading: {
    fontWeight: '500',
    fontSize: '18px',
    lineHeight: '31px',
    color: '#404B63',
    marginTop: 0,
    marginBottom: 0,
    paddingBottom: 0,
    [theme.breakpoints.down('lg')]: {
      fontSize: '16px',
    lineHeight: '22px',
  },
  },
  header: {
  },
  accordion: {
    borderRadius: "20px !important",
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    '& .Mui-expanded': {
      '& .MuiIconButton-label svg path': {
        fill: 'rgb(63, 177, 107) !important',
      },
    },
    boxShadow: 'none'
  },
  accordionDefault: {
    border: '1px solid transparent',
  },
  accordionExpend: {
    border: '1px solid #3FB16B',
  },
  accordionSummary: {
    border: '1px solid transparent',
    borderRadius: '20px',
    backgroundColor: ' rgba(217, 217, 217, 0.2)',
    height: '81px',
    padding: "0px 36px",
    [theme.breakpoints.down('lg')]: {
      padding: "0px 20px",
      height: '71px',
  },
  },

}));

export default function SimpleAccordion(props) {
  const { title, children } = props;
  const classes = useStyles();
  const [clicked, setClicked] = useState(false)

  return (
    <div className={classes.root}>
      <Accordion
        className={classes.accordion}
        style={{
          border: clicked ? '1px solid #3FB16B' :'1px solid transparent'
      }}
        defaultExpanded={false}
        onChange={(d, open) => {
          console.log(open, d)
        }}
      >
        <AccordionSummary className={`${classes.accordionSummary} text-capitalize`}
          expandIcon={<svg width="17" height="9" viewBox="0 0 17 9" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M8.49997 8.16235C8.03456 8.16318 7.57355 8.07228 7.14329 7.89483C6.71304 7.71738 6.32198 7.45687 5.99247 7.12819L0.205385 1.3411C0.0720034 1.20772 -0.00292969 1.02682 -0.00292969 0.838185C-0.00292969 0.649554 0.0720034 0.46865 0.205385 0.335268C0.338767 0.201886 0.519672 0.126953 0.708302 0.126953C0.896932 0.126953 1.07784 0.201886 1.21122 0.335268L6.9983 6.12235C7.39674 6.5203 7.93684 6.74382 8.49997 6.74382C9.0631 6.74382 9.6032 6.5203 10.0016 6.12235L15.7887 0.335268C15.9221 0.201886 16.103 0.126953 16.2916 0.126953C16.4803 0.126953 16.6612 0.201886 16.7946 0.335268C16.9279 0.46865 17.0029 0.649554 17.0029 0.838185C17.0029 1.02682 16.9279 1.20772 16.7946 1.3411L11.0075 7.12819C10.678 7.45687 10.2869 7.71738 9.85664 7.89483C9.42639 8.07228 8.96538 8.16318 8.49997 8.16235Z" fill="#404B63"/>
          </svg>
          }
          aria-controls="panel1a-content"
          id="panel1a-header"
          onClick={()=>setClicked(!clicked)}
        // style={{border: '1px solid red'}}
        >
          <div>
            <Typography className={classes.heading}>{title}</Typography>
          </div>
        </AccordionSummary>
        <AccordionDetails>
          {children}
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
