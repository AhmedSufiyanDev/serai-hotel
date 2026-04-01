import React from 'react';
import TextField from '@material-ui/core/TextField';
import {withStyles} from "@material-ui/core";
import {styles} from '../inputComponents/inputStyle'
import InputLabel from "@material-ui/core/InputLabel";

const DatePickers = (props) => {

  const {item, onChange, classes} = props;
  const {id, label, value, required, error, disable,min,max} = item;

  return (
    <>
      <InputLabel className='mb-10' htmlFor={id} error={error}>{label}</InputLabel>
      <TextField
        value={value}
        required={required}
        fullWidth
        variant='outlined'
        id={id || label}
        type="date"
        defaultValue={value}
        error={error}
        helperText={error}
        onChange={(event) => {
          onChange(event.target.value, id || label)
        }}
        inputProps={{
          // min: "2020-08-10",
          min,max
          // max: "2020-08-20"
        }}
        InputProps={{
          // inputProps: {min: min,max},
          classes: {
            root: classes.cssOutlinedInput,
            focused: classes.cssFocused,
            notchedOutline: classes.notchedOutline,
          },
          // inputMode: "numeric"
        }}
        // label={label}
        // labelWidth={labelWidth}
        disabled={disable}
      />
    </>
  );
}

export default withStyles(styles)(DatePickers);
