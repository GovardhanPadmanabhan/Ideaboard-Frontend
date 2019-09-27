import React, { Component } from 'react'
import axios from 'axios';

class Signup extends Component {
    constructor(props) {
        super(props)
    }

    handleSignup = (e) => {
        e.preventDefault()
        
        axios.post('http://localhost:3001/models', {
            user: {
                email: document.getElementById("email").value,
                password: document.getElementById("password").value,
                password_confirmation: document.getElementById("password_confirmation").value
            }
        })
        .then(response => {
            this.props.changePage("delete")
            this.props.updateCurrentUser(response.data.user.email)
        })
        .catch(error => console.log(error))
    }

    render() {
        return (
            <div>
                <h3>Signup</h3>
                <form>
                    <input id="email" placeholder="email" />
                    <input id="password" placeholder="password" />
                    <input id="password_confirmation" placeholder="confirm password" />
                    <br />
                    <button onClick={this.handleSignup}>Sign Up</button>
                </form>
                <br /><br />
                <button onClick={this.props.changePage("login")}>Back to Login</button>
            </div>
        )
    }
}

export default Signup