import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 250,
  },
  td:{
    boxSizing: 'border-box',
    paddingRight: 10,
    width: 100,
    textAlign:"right"
  },
  containerTable:{
      maxWidth:300,
      float:'right'
  }
});


function TableSumaTotal(props) {
  const { classes } = props;

  return (
      <div className={classes.containerTable}>
      <Table className={classes.table}>
        <TableBody>
        <TableRow>
            <TableCell component="th" scope="row"  className={classes.td}>
                Suma total:
            </TableCell>
            <TableCell numeric className={classes.td}>$<strong>{props.total}</strong></TableCell>
        </TableRow>
        </TableBody>
      </Table>
      </div>
  );
}

TableSumaTotal.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TableSumaTotal);
