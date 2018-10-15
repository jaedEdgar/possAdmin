import React, { Component } from 'react'

import TextField from '@material-ui/core/TextField';
import Grid from "@material-ui/core/Grid";
import {Search as SearchIcon} from "@material-ui/icons";


class Search extends Component {
    state = {
        query: ''
    }

    _handleInputChange = () => {
        this.setState({
        query: this.search.value
        }, () => {
            this.props.handleSearchChange(this.state.query);
        })
    }

    render() {
        return (
        <form>
            <div>
            <Grid container spacing={8} alignItems="flex-end">
            <Grid item>
                <SearchIcon/>
            </Grid>
            <Grid item>
                <TextField 
                    onChange={this._handleInputChange}
                    inputRef={el => this.search = el}
                    id="input-with-icon-grid" 
                    InputLabelProps={{
                        shrink: true,
                    }}
                    label="Filtrar por descripción" />
            </Grid>
            </Grid>
        </div>
      
        </form>
        )
    }
}

export default Search
