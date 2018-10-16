import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
  th:{
    boxSizing: 'border-box',
    paddingRight: 15,
    width: 100,
    color: '#f8f8fb',
    textAlign:'center'
  },
  th_input:{
    boxSizing: 'border-box',
    paddingRight: 15,
    width: 80,
    color: '#f8f8fb',
  },
  td:{
    boxSizing: 'border-box',
    paddingRight: 10,
    width: 100,
    textAlign:"center"
  },
  td_input:{
    boxSizing: 'border-box',
    paddingRight: 10,
    width: 80,
    fontSize:16
  }
});

let totalItem = (cant,precio) => {
  return cant * precio;
}


const TableFilterResult = (props) =>{
    const { classes } = props;
    console.log(props.sales);
    return (
    <div>
      
      <div style={{height: 'auto', overflow: 'auto'}}>
        <div style={{ width:'100%'}}>
          <Table className={classes.table}>
            <TableHead style={{background:'#018eF4'}}>
              <TableRow>
                <TableCell className={classes.th}>Clave</TableCell>
                <TableCell style={{color:'#f8f8fB'}}>Descripción</TableCell>
                <TableCell className={classes.th_input}>Cantidad</TableCell>
                <TableCell className={classes.th}>Precio</TableCell>
                <TableCell className={classes.th}>Stock</TableCell>
                <TableCell className={classes.th}>Total</TableCell>
              </TableRow>
            </TableHead>
          </Table>
        </div>
        <div style={{maxHeight: 290, overflowX: 'hidden', overflowY: 'auto', width:'100%'}}>
          <Table className={classes.table}>
              <TableBody style={{width:'100%'}}>
              {props.sales && props.sales.length > 0 &&
                props.sales.map((row,index) => {
                  return (
                  <TableRow key={index}
                      hover
                  >
                      <TableCell  className={classes.td}>
                        <strong>
                        {row.clave}
                        </strong>
                      </TableCell>
                      <TableCell >{row.description}</TableCell>
                      <TableCell className={classes.td_input}> 
                        <FormControl fullWidth className={classes.margin}>
                          <Input
                            id="adornment-amount"
                            type="number"
                            inputProps={{
                              style:{
                                width:60,
                                textAlign:'center',
                                fontSize:12,
                                padding:'4px 0 3px'
                              }
                            }}
                            defaultValue="1"
                            onChange={props.changeQuantity.bind(this,index)} 
                            /* 
                            value={this.state.amount}*/
                          />
                        </FormControl>
                      </TableCell>
                      <TableCell className={classes.td}> 
                        $ {row.price}
                      </TableCell>
                      <TableCell  className={classes.td}>
                       <span>
                          {row.existence}
                       </span>
                      </TableCell>
                 
                      <TableCell  className={classes.td}>
                       <span>
                        $ {totalItem(row.quantity,row.price)}
                       </span>
                      </TableCell>
                  </TableRow>
                  );
                })}
                {props.fakeRow.map((index) =>
                  <TableRow key={index}>
                    <TableCell component="th" scope="row" className={classes.td}>
                      --
                    </TableCell>
                    <TableCell >
                      --
                    </TableCell>
                    <TableCell className={classes.td}> 
                      --
                    </TableCell>
                    <TableCell className={classes.td}> 
                      --
                    </TableCell>
                    <TableCell className={classes.td}>
                      --
                    </TableCell>
                    <TableCell className={classes.td}>
                      --
                    </TableCell>
                  </TableRow>
                )}
    
                 
                  
                 
              </TableBody>
          </Table>
        </div>
        
        </div>
        

    </div>
  );
}

TableFilterResult.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TableFilterResult);