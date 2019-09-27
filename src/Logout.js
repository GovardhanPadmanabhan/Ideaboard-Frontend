import React, { Component } from 'react';
import axios from 'axios';

class Logout extends Component {
    constructor(props) {
        super(props)
    }

    handleLogout = (e) => {
        e.preventDefault()

        axios.delete('http://localhost:3001/models/sign_out')
        .then(response => {
            this.props.changePage("Login")
        })
        .catch(error => console.log(error))
    }

    render() {
        return (
            <button onClick={this.handleLogout}>Sign Out</button>
        )
    }
}

export default Logout