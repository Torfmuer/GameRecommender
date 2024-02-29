import React, { Component } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import './css/Home.css';


export class SignUp extends Component {
    static displayName = SignUp.name;

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            User: null,
            isLoggedIn: false,
            firstName: "",
            lastName: "",
            username: "",
            password: ""

        }

    };

    componentDidMount() {

        this.setState(
            { isLoggedIn: localStorage.getItem('isLoggedIn') },
            () => {
                this.setState(
                    { username: localStorage.getItem('username') },
                    () => {
                        if (this.state.isLoggedIn && this.state.username !== "") {
                            const requestOptions = {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({ username: this.state.username })
                            };
                            fetch("https://localhost:7130/GigaGamer/GetUserData", requestOptions)
                                .then(response => response.json())
                                .then(data => {
                                    if (data.ID > 0) {
                                        window.location.replace('https://localhost:44413/');
                                    }

                                })
                                .catch(error => {
                                    console.error('Error fetching user data:', error);
                                });
                        }

                    }
                );
            }
        );


    }

    handleChange = (event) => {
        const { name, value } = event.target;

        this.setState({
            [name]: value
        });


    }


    submit = () => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(this.state)
        };
        fetch("https://localhost:7130/GigaGamer/CreateUser", requestOptions)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                    window.location.replace('https://localhost:44413/log_on'); 
            })
            .catch(error => {
                console.error('cannot create user', error);
            });
    }

    render() {
        return (
            <div id="createacc">
                <h2>Create Account:</h2>
             
                            <TextField
                                required
                                id="outlined-required"
                                label="Username"
                                name="username"
                                defaultValue=""
                                color="secondary"
                                onChange={this.handleChange}

                            />

                            <TextField
                                required
                                id="outlined-required"
                                label="First Name"
                                name="firstName"
                                color="secondary"
                                defaultValue=""
                                onChange={this.handleChange}

                            />
  
                            <TextField
                                required
                                id="outlined-required"
                                label="Last Name"
                                name="lastName"
                                color="secondary"
                                defaultValue=""
                                onChange={this.handleChange}

                            />

                            <TextField
                                required
                                id="outlined-required"
                                label="Password"
                                name="password"
                                type="password"
                                color="secondary"
                                defaultValue=""
                                onChange={this.handleChange}

                            />

                            <Button color="secondary" variant="contained" onClick={() => { this.submit() }}>Sign Up</Button>

            </div>
        );
    }
}