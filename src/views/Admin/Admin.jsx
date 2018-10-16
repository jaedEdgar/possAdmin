import React from "react";
import PropTypes from "prop-types";
import axios from 'axios'
// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";

// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.jsx";
import CardHeader from "components/Card/CardHeader.jsx";

const API_URL = 'http://localhost:3004';

const styles={
    title:{
        margin:0,
    }
}

class Admin extends React.Component {
  state = {
    results: [],
 
  };
  
  getDataPrescriptions(){
      console.log("is here");
    axios.get(API_URL+'/prescriptions')
        .then((res) => { 
            console.log(res.data);
            this.setState({
                results:res.data
            })
            console.log(this.state.results);
        });
  };

  componentDidMount() {                                                       
     this.getDataPrescriptions()                                                           
  }                                                                           
  
  render() {
    return (
      <div>
        <GridContainer>
            {this.state.results.map(function(row, index){
            return <GridItem xs={12} sm={6} md={6} key={ index }>
                <Card>
                    <CardHeader color="primary">
                        <h4 style={styles.title}>
                            Folio: 0000{row.folio}
                        </h4>
                    </CardHeader>
                    <CardBody >
                        <p>Comentario:{row.comment}</p>
                        <p>Total:{row.total}</p>
                        <p>Productos:   </p>
                            <ul>
                            {
                                row.product.map(function(r,i){
                                    return <li key={i}>
                                        <br/>clave: {r.clave}
                                        <br/>descripción: {r.description}
                                        <br/>precio: {r.price}
                                        <br/>cantidad: {r.quantity}
                                    </li>
                                })
                            }
                            </ul>
                    </CardBody>
                </Card>
            </GridItem>
            })}
        </GridContainer>
      </div>
    );
  };
}

Admin.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(dashboardStyle)(Admin);