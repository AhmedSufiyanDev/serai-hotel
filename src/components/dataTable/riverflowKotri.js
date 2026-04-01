import React, {useState} from "react";
import Typography from '@material-ui/core/Typography';
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import TableHead from '@material-ui/core/TableHead';
import TableCell  from '@material-ui/core/TableCell';
import Paper from "@material-ui/core/Paper";
import {Grid } from "@material-ui/core";
import {withRouter} from "react-router-dom";
import {useStyles} from "./dataTableStyle";  
import './styles.scss' 

function KotriTable(props) {
  console.log('in KotriTable');
  const {data } = props;
  const {rows, column,activePreview} = data; 

  // let headCells = column;
  const classes = useStyles(); 
  console.log("activeReservoir kotri ",rows)

  const kharifData=[];
  const rabiData=[];
 
  for (var key in rows) {
    kharifData.push(
      <TableRow 
        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
      >
        <TableCell  align="center">{key}</TableCell>
        <TableCell align="center"> {rows[key]["3m"]}  </TableCell>
        <TableCell align="center">{rows[key]["4m"]}</TableCell>
        <TableCell align="center">{rows[key]["5m"]}</TableCell>
        <TableCell align="center">{rows[key]["6m"]}</TableCell>
        <TableCell align="center">{rows[key]["7m"]}</TableCell>
        <TableCell align="center">{rows[key]["8m"]}</TableCell> 
      </TableRow>
    );

    rabiData.push(
      <TableRow 
        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
      >
        <TableCell align="center">{rows[key]["9m"]}</TableCell>
        <TableCell align="center"> {rows[key]["10m"]}  </TableCell>
        <TableCell align="center">{rows[key]["11m"]}</TableCell>
        <TableCell align="center">{rows[key]["0m"]}</TableCell>
        <TableCell align="center">{rows[key]["1m"]}</TableCell>
        <TableCell align="center">{rows[key]["2m"]}</TableCell>
      </TableRow>
    );
     
  }
  kharifData.push(
    <TableRow 
      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
    >
      <TableCell  align="center"><b>Month Total (MAF)</b></TableCell>
      <TableCell align="center"> --  </TableCell>
      <TableCell align="center">--</TableCell>
      <TableCell align="center">--</TableCell>
      <TableCell align="center">--</TableCell>
      <TableCell align="center">--</TableCell>
      <TableCell align="center">--</TableCell> 
    </TableRow>
  );
  rabiData.push(
    <TableRow 
      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
    > 
      <TableCell align="center"> --  </TableCell>
      <TableCell align="center">--</TableCell>
      <TableCell align="center">--</TableCell>
      <TableCell align="center">--</TableCell>
      <TableCell align="center">--</TableCell>
      <TableCell align="center">--</TableCell> 
    </TableRow>
  );
  kharifData.push(
    <TableRow 
      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
    >
      <TableCell  align="center"><b>Kharif Total</b></TableCell>
      <TableCell align="center"> --  </TableCell> 
    </TableRow>
  );
  kharifData.push(
    <TableRow 
      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
    >
      <TableCell  align="center"><b>Rabi Total</b></TableCell>
      <TableCell align="center"> --  </TableCell> 
    </TableRow>
  );
  kharifData.push(
    <TableRow 
      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
    >
      <TableCell  align="center"><b>Annual Total</b></TableCell>
      <TableCell align="center"> --  </TableCell> 
    </TableRow>
  );
  return (
    <div className={classes.root}>
      <Paper className={`table-border ${classes.paper}`}>
        <Typography component="h1" variant="h5" align="center" className="table-heading"> ESCAPAGE BELOW KOTRI </Typography> 
        <Grid container spacing={0} className={[classes.marginTop20]} > 
          <Grid item xs={6}>
            <Typography component="p" align="center" className="columns-heading">Kharif 2022 (Cusecs)</Typography>
            <TableContainer>
              <Table className='datatable-body-one' sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">Date</TableCell>
                    <TableCell align="center">Apr</TableCell>
                    <TableCell align="center">May</TableCell>
                    <TableCell align="center">June</TableCell>
                    <TableCell align="center">July</TableCell>
                    <TableCell align="center">Aug</TableCell>
                    <TableCell align="center">Sep</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody> 
                  {kharifData}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
          <Grid item xs={6}>
            <Typography component="p" align="center" className="columns-heading">Rabi 2022-23 (Cusecs)</Typography>
            <TableContainer>
              <Table className='datatable-body-two' sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow> 
                    <TableCell align="center">Oct</TableCell>
                    <TableCell align="center">Nov</TableCell>
                    <TableCell align="center">Dec</TableCell>
                    <TableCell align="center">Jan</TableCell>
                    <TableCell align="center">Feb</TableCell>
                    <TableCell align="center">Mar</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                 {rabiData}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid> 
        </Grid> 
      </Paper>
    </div>
  );
}

export default withRouter(
  (KotriTable)
);
