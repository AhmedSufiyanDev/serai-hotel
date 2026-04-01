import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

const PrimaryButton = (props) => {
  const {value = '', onClick, Icon, loading, edge = 'end', disabled, style, className} = props;
  const classes = ((className && className.split(' ')) || [])
  const mt=classes.find(item => {
    if (item.search('mt-') > -1) {
      return true
    }
  })
  return (
    // <button className={`custom-btn btn-3 mt-20 ${props.className}`} onClick={onClick}>
    <button className={`round-btn   ${className + mt? ' ':' mt-20 '}  `} style={style} onClick={onClick}
            disabled={disabled || loading}>
      {
        <span className='display-flex align-items-center justify-content-center'>
            {Icon && edge === 'start' && <Icon className='ml-10'/>}
          {value}
          {Icon && edge === 'end' && <Icon className='ml-10'/>}
          {loading && <CircularProgress color='white' style={{width: 15, height: 15, marginLeft: 10}}/>}
        </span>
      }
    </button>
  );
}

export default PrimaryButton;
