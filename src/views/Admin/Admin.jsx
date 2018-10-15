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


const API_URL = 'http://localhost:3004';

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
        <GridItem xs={12} sm={12} md={12}>
            {this.state.results.map(function(row, index){
                return <Card key={ index }>
                    <CardBody >
                        <p>Folio:{row.folio}</p>
                        <p>Comentario:{row.comment}</p>
                        <p>Productos:</p>
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
            })}
          
          </GridItem>
        </GridContainer>
      </div>
    );
  };
}

Admin.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(dashboardStyle)(Admin);