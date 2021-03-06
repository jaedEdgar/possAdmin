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
import Paper from '@material-ui/core/Paper';

import Button from "components/CustomButtons/Button.jsx";
import Search from "components/Dashboard/Search.jsx";
import TableFilterResult from 'components/Dashboard/TableFilterResult.jsx';
import TableSale from 'components/Dashboard/TableSale.jsx';
import TableSumaTotal from 'components/Dashboard/TableSumaTotal.jsx';
import TextField from '@material-ui/core/TextField';

const API_URL = 'http://localhost:3004';

class Dashboard extends React.Component {
  state = {
    value: 0,
    drugs:[],
    query: '',
    results: [],
    stock:[],
    sale:[],
    showResults:false,
    fakeRow:[0,1,2,3,4],
    total:'0',
    comment:'',
    folio:''
  };
  initialState={
    value: 0,
    query: '',
    sale:[],
    showResults:false,
    fakeRow:[0,1,2,3,4],
    total:'0'
  };
  
  setInitialState(){
    console.log("me acabas de setear")
    let folio = this.state.folio;
    this.setState(this.initialState);
    this.setState({sale:[]});
    console.log(this.state.sale);
    this.setState({
      folio:(folio+1)
    });
  };
 
  getData = {
    stock: () => {
      axios.get(API_URL+'/stock')
      .then((res) => { 
        this.setDataStates(res.data);
      })
      .catch((error)=>{
        if("stock" in localStorage){
          let data = JSON.parse(localStorage.getItem('stock'));
          this.setDataStates(data);
        }else{
          alert("no pudimos recuperar información")
        }
      });
  },
 
  prescriptions: () =>{
      axios.get(API_URL+'/prescriptions')
      .then((res) => { 
          console.log(res);
          this.setState({
            folio:(res.data[res.data.length-1].folio+1),
          })
          localStorage.setItem('prescriptions', JSON.stringify(res.data));
        })
        .catch((error)=>{
        });
    }
  };
  setDataStates = (data) => {
    this.setState({
      results:  data,
      stock: data
    })
    localStorage.setItem('stock', JSON.stringify(data));
  }
  savePrescription = (data) => {
    axios.post(API_URL+'/prescriptions',data)
    .then((response) => {
      alert("Guardado correctamente");
      console.log(response);
    })
    .catch((error) => {
     
      console.log(error);
    });
  };

  filterInfo() {
    let query = this.state.query;
    let queryResult = this.state.stock.filter(function(el) {
        return el.description.toLowerCase().indexOf(query.toLowerCase()) > -1;
    });
    this.setState({
        results:queryResult
    });
  };

  handleSearchChange=(query) => {
    this.setState({
      query: query
    }, () => {
      if (this.state.query && this.state.query.length > 0) {
        this.setState({showResults:true});
        this.filterInfo();      
      } 
    }) 
  };
 
  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };
   
  componentDidMount() {
     this.getData.stock();       
     this.getData.prescriptions();       
  }           

  getElementRow = (row) => {
    let sale = this.state.sale;
    let fakeRow = [0,1,2,3,4];

    if(sale.length < 6){
      fakeRow.splice(0,sale.length+1);
    }else{
      fakeRow = [];
    }
    row.quantity=1;
    sale.push(row);
    this.setState({
      showResults:false,
      sale:sale,
      fakeRow: fakeRow
    });
    this.salesSuma();
  };
  
  changeQuantity = (index,e)=>{
    if(e.target.value){
      let sale = this.state.sale;
      sale[index].quantity = parseInt(e.target.value,10);
     
      this.setState({
        sale:sale
      });
      
      this.salesSuma();
    }
  };
    
  salesSuma = () =>{
    let total = 0;
    if(this.state.sale.length === 1){
      total = this.state.sale[0].price * this.state.sale[0].quantity;
    }else{
      total= this.state.sale.map(function(item){
        return item.price * item.quantity;
      })  
      total =total.reduce(function(a, b){ return a + b; });
    }
    this.setState({
      total:total
    })
  };

  complete = () =>{
    let products = this.state.sale.map(function(item){
      return {
        description:item.description,
        clave:item.clave,
        quantity:item.quantity,
        price:item.price
      };
    })  
    let data = {
        id: this.state.folio,
        folio:this.state.folio,
        product:products,
        total: this.state.total,
        comment:this.state.comment
    };
    if(navigator.onLine){
      this.savePrescription(data);
      this.setInitialState();
    }else{
      alert("problemas para conectarse");
      this.saveInLocalStorage(data);
      this.saveBefore();
    }
    
  };

  saveInLocalStorage = (data) =>{
    if("prescription" in localStorage){
      let prescriptions = JSON.parse(localStorage.getItem('prescription'));
      prescriptions.push(data);
      localStorage.setItem('prescription', JSON.stringify(prescriptions));
    }else{
      localStorage.setItem('prescription', JSON.stringify([data]));
    }   
    this.setInitialState();
  }

  saveBefore= () =>{
    if("prescription" in localStorage){
      if(navigator.onLine){
        let prescription = JSON.parse(localStorage.getItem('prescription'));
        console.log(prescription);
        prescription.forEach(element => {
          this.savePrescription(element);
        });
        //localStorage.clear();
      }else{
        setTimeout(this.saveBefore,100);
      }
    } 
  };

  render() {
    return (
      <div>
        <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
            <Card style={{marginTop:0}}>
              <CardBody >
                <GridContainer>
                  <GridItem xs={12} sm={8} md={8}>
                    <Search handleSearchChange={this.handleSearchChange} />
                  </GridItem>
                  <GridItem xs={12} sm={4} md={4}>
                  <p style={{float:'right'}}>
                    Folio: <strong>0000{this.state.folio}</strong>
                  </p>
                </GridItem>
                <GridItem xs={12} sm={12} md={12}>
                  { this.state.showResults &&
                      <TableFilterResult results={this.state.results} getElementRow={this.getElementRow}/>
                  }
                </GridItem>
                </GridContainer>
              </CardBody>
            </Card>
          
            <Paper style={{overflow:'hidden'}}>
              <TableSale sales={this.state.sale} 
                  fakeRow={this.state.fakeRow} 
                  itemSalesCant={this.itemSalesCant}
                  changeQuantity={this.changeQuantity}
                  />
                <TableSumaTotal total={this.state.total} />
            </Paper>
          </GridItem>     
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardBody>
                <GridContainer>
                  <GridItem xs={12} sm={6} md={6}>
                  <TextField
                    id="standard-multiline-flexible"
                    label="Comentario"
                    multiline
                    rowsMax="4"
                    fullWidth
                    InputLabelProps={{
                        shrink: true,
                    }}
                    value={this.state.comment}
                    onChange={(e) => this.setState({comment:e.target.value})}
                    margin="normal"
                  />
                  </GridItem> 
                  <GridItem xs={12} sm={6} md={6}>
                    <Button 
                      color="success" 
                      style={{ marginTop: 21,float: 'right'}}
                      onClick={this.complete}
                      >
                      Completar 
                    </Button>
                    <Button 
                      color="danger" 
                      style={{ marginTop: 21,float: 'right',marginRight:10}}
                      onClick={(e)=>this.setState(this.initialState)}
                      >
                      Cancelar
                    </Button>
                  </GridItem>
                </GridContainer>
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    );
  };
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(dashboardStyle)(Dashboard);