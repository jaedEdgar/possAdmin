import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
});


const TableFilterResult = (props) =>{
    const { classes } = props;
    
    function onClickElement(row){
        props.getElementRow(row);
    }
    return (
    <div>
    {props.results.length > 0 &&
    <Paper className={classes.root} >
      <div style={{height: 'auto', overflow: 'auto'}}>
        <div style={{ width:'100%'}}>
        <Table className={classes.table}>
        <TableHead style={{background:'#018eF4'}}>
          <TableRow>
            <TableCell style={{ width: 100,color:'#f8f8fB' }}>Clave</TableCell>
            <TableCell style={{color:'#f8f8fB'}}>Descripción</TableCell>
          </TableRow>
        </TableHead>
        </Table>
        </div>
        <div style={{maxHeight: 288, overflowX: 'hidden', overflowY: 'auto', width:'100%'}}>
            <Table className={classes.table}>
                <TableBody style={{width:'100%'}}>
                {props.results.map((row,index) => {
                    return (
                    <TableRow key={index} 
                        hover
                        onClick={onClickElement.bind(this,row)}
                    >
                        <TableCell component="th" scope="row" style={{ width: 100}}>
                        {row.clave}
                        </TableCell>
                        <TableCell >{row.description}</TableCell>
                    </TableRow>
                    );
                })}
                </TableBody>
            </Table>
        </div>
        </div>
        </Paper>
    }
      {props.results.length === 0 &&
            <Typography variant="title" gutterBottom style={{padding:25}}>
               No se encontraron coincidencias
            </Typography>
        }
    </div>
  );
}

TableFilterResult.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TableFilterResult);