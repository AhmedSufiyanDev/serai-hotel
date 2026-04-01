import React from 'react';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import {useStyles} from "./styles";
import HelpIcon from '@material-ui/icons/Help';
import {Tooltip} from "@material-ui/core";

export default function CustomSeparator(props) {


  const classes = useStyles();
  const {breadCrumbsList, helpHandler, location} = props;

  // const helpReducer = useSelector(state => state.helpReducer);
  // const dispatcher = useDispatch()

  const handleClick = (item, breadCrumbsList) => {
    console.log("item.name is",item)
    if(item.text=='Room Categories'){
      props.history.goBack()
    }
    if (item.url) {
      breadCrumbsList.pop()
      props.setBreadCrumbsList(breadCrumbsList)
      if(location.state){
        props.history.push({pathname: item.url, state: {...location.state}  });
      }
      else props.history.push(item.url);
    }
  }
  return (
    <div
      className={classes.breadCrumbsWidth + ' sticky-header bread-crumbs-container display-flex align-items-center justify-content-between'}>
      <Breadcrumbs
        separator={<NavigateNextIcon fontSize="small"/>} aria-label="breadcrumb"
      >
        {breadCrumbsList.map((item, index) => {
          if (index < breadCrumbsList.length - 1) {
            return (
              <Link
                style={{ cursor: 'pointer' }}
                key={`crumb${index}`}
                color="inherit"
                // href="/"
                onClick={(e) => handleClick(item, breadCrumbsList)}
                className='text-capitalize text-doc-none mouse-pointer primary-green-color'>
                {item.text}
              </Link>
            )
          } else return (<Typography key={`crumb${index}`} className='text-capitalize text-black-normal'
          >{breadCrumbsList[breadCrumbsList.length - 1].text}</Typography>)
        })}

      </Breadcrumbs>
    </div>
  );
}
