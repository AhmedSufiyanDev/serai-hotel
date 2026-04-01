import React from 'react';
import { Checkbox, FormControlLabel, Grid, TextField  } from "@material-ui/core";
import InputPassword from "../inputPassword/inputPassword";
import Input from "../../inputLabelWithError";
import '../styles.scss';
import DatePickers from "../../datePicker";
import InputFile from '../inputFile'
import PrimaryButton from  '../../primaryButton/primaryButton'

function Index(props) {
  const {
    error,
    onChangeInput,
    types,
    numOfInputPerRow = 2,
  } = props;

  return (
    <Grid container className={`${props.className} form-row `} spacing={3} style={{ paddingLeft: 0, paddingRight: 0, }}>
      {(types || []).map((item, key) => {
        let len = types.length;
        let md = 12 % len ? 'auto' : 12 / len;
        let itemCol = 12 % numOfInputPerRow ? 'auto' : 12 / numOfInputPerRow;

        const { id, type, label, labelWidth, value, error } = item;


        return (
          <Grid item xs={12} md={itemCol} className='p-tiny'>
            {
              (item.type === 'password') ? <InputPassword
                item={item}
                onChange={(value, key) => onChangeInput(value, key,)}
              /> : (item.type === 'checkbox') ?
                <FormControlLabel control={
                  <Checkbox
                    id={id || label}
                    // onChange={(value, key) => onChangeInput(value, key,)}/>}
                    onChange={(event) => onChangeInput(event.target.checked, id || label)} />}
                  label={label}
                  checked={item?.value}
                />
                : (item.type === 'date') ?
                  <DatePickers
                    item={item}
                    onChange={(value, key) => onChangeInput(value, key,)}
                  /> : (item.type === 'autoSearch') ?
                    <DatePickers
                      item={item}
                      onChange={(value, key) => onChangeInput(value, key,)}
                    /> : (item.type === 'file') ?
                      <InputFile item={item} onChangeInput={(value, key) => onChangeInput(value, key,)} />
                      : (item.type === 'button') ?
                      <PrimaryButton onClick={props.onClick} value='+ add' style={{padding:'13px'}}/> :
                      <Input
                        item={item}
                        onChange={(value, key) => onChangeInput(value, key)}
                        error={item.error ? true : false}
                        errorText={item.error ? item.error : ''}
                      />
            }
          </Grid>
        )
      })}
    </Grid>
  );
}

export default Index;

// <Grid item xs={12} md={6} className='p-5'>
//   {type[0] === 'email' ?
//     <InputEmail
//       value={values[0]}
//       onChange={(value, key) => onChangeInput(value, key)}
//       error={error[0] ? true : false}
//       errorText={error[0] ? error[0] : ''}
//     /> : (type[0] === 'password') ? <InputPassword
//         value={values[0]}
//         onChange={(value, key) => onChangeInput(value, key,)}
//         error={error[0] ? true : false}
//         errorText={error[0] ? error[0] : ''}
//       /> :
//       <Input
//         dropdownList={dropdownList}
//         label={labels[0]}
//         id={labels[0]}
//         value={values[0]}
//         required={required[0]}
//         onChange={(value, key) => onChangeInput(value, key)}
//         labelWidth={labelsWidth[0]}
//         error={error[0] ? true : false}
//         errorText={error[0] ? error[0] : ''}
//       />
//   }
// </Grid>
// <Grid item xs={12} md={6} className='p-5'>
//   {type[1] === 'email' ?
//     <InputEmail
//       value={values[1]}
//       onChange={(value, key) => onChangeInput(value, key)}
//       error={error[1] ? true : false}
//       errorText={error[1] ? error[1] : ''}
//     /> : (type[1] === 'password') ? <InputPassword
//         value={values[1]}
//         onChange={(value, key) => onChangeInput(value, key,)}
//         error={error[1] ? true : false}
//         errorText={error[1] ? error[1] : ''}
//       /> :
//       <Input
//         dropdownList={dropdownList}
//         label={labels[1]}
//         id={labels[1]}
//         value={values[1]}
//         required={required[1]}
//         onChange={(value, key) => onChangeInput(value, key)}
//         labelWidth={labelsWidth[1]}
//         error={error[1] ? true : false}
//         errorText={error[1] ? error[1] : ''}
//       />
//   }
// </Grid>
