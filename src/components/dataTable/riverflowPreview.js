import React, {useState} from "react";
import Typography from '@material-ui/core/Typography';
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import {Grid } from "@material-ui/core";
import {withRouter} from "react-router-dom";
import {useStyles} from "./dataTableStyle"; 
import EmptyRows from "./emptyRowSpace"; 
import TableHeading from './tableHeading';
import TableCell from './tableCell'
import './styles.scss' 

function EnhancedTable(props) {
  const {data, } = props;
  const {rows, column,activeReservoir} = data; 

  let headCells = column;
  const classes = useStyles();
  const [order, ] = useState("asc");
  const [orderBy,] = useState("");
 

  return (
    <div className={`${classes.root} ${classes.marginTop20}`}>
      <Paper className={`table-border ${classes.paper}`}>
      <Typography component="h1" variant="h5" align="center" className="table-heading">RIVER FLOWS AND LEVELS </Typography>
      <Typography component="p"   align="center" className="table-sub-heading">(ALL FIGURES IN 1000 X CUSECS)</Typography>
      <Grid container spacing={2} className={[classes.marginTop20]} > 
        <Grid item xs={4}>
          <Typography component="p" align="center" className="columns-heading">Indus at Tarbela</Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography component="p" align="center" className="columns-heading">Jehlum at Mangla</Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography component="p"  align="center" className="columns-heading">System Inflows</Typography>
        </Grid>
      </Grid>
  
        <TableContainer>
          
          <Table className={[classes.table, ' datatable-body']} stickyHeader aria-label="sticky table">
            <TableHeading
              classes={classes}
              order={order}
              orderBy={orderBy} 
              rowCount={rows?.length || 0}
              columns={headCells}
              rows={rows}
            />
            <TableBody>
              { 
                (rows || []).map((row, index) => {
 
                  return (
                    <TableRow hover key={index} className='cursor-pointer'>
                      <TableCell value={row?.date} row={row}/>
                      <TableCell value={row?.iatLevels} row={row}/>
                      <TableCell value={row?.iatInflow} row={row}/>
                      <TableCell value={row?.iatOutflow} row={row}/>
                      <TableCell value={row?.kInflowAN} row={row}/>
                      <TableCell value={row?.jamLevels} row={row}/>
                      <TableCell value={row?.jamInflow} row={row}/>
                      <TableCell value={row?.jamOutflow} row={row}/>
                      <TableCell value={row?.cInflowAM} row={row}/>
                      <TableCell value={row?.sCurrY} row={row}/>
                      <TableCell value={row?.sLastY} row={row}/>
                      <TableCell value={row?.avgL10Y} row={row}/>
                    </TableRow>
                  );
                })
              }
              {rows.length <= 0 && (
                <EmptyRows emptyRows={rows.length} colSpan={8}/>
              )}
            </TableBody>
          </Table>
        </TableContainer>
 
      </Paper>
    </div>
  );
}

export default withRouter(
  (EnhancedTable)
);
