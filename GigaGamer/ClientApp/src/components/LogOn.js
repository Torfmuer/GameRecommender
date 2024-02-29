import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import './css/Home.css';


export class LogOn extends Component {
    static displayName = LogOn.name;

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            User: null,
            isLoggedIn: false,
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

    // change handler
    handleChange = (event) => {
        const { name, value } = event.target;

        this.setState({
            [name]: value
        });


    }

    // sends data to backend
    submit = () => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(this.state)
        };
        fetch("https://localhost:7130/GigaGamer/LoginUser", requestOptions)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                if (data.ID > 0) {
                    localStorage.setItem('isLoggedIn', true);
                    localStorage.setItem('username', data.Username);

                    window.location.replace('https://localhost:44413/');
                }
            })
            .catch(error => {
                console.error('login user not found:', error);
            });
    }

    render() {
        return (
            <div id="loginn">
                <h2>Log In:</h2>
                            <TextField
                                required
                                name="username"
                                id="outlined-required"
                                label="Username"
                                color="secondary"
                                defaultValue=""
                                onChange={this.handleChange}
                            />
                            <TextField
                                required
                                name="password"
                                type="password"
                                id="outlined-required"
                                label="Password"
                                color="secondary"
                                defaultValue=""
                                onChange={this.handleChange}
                            />
                            <Button color="secondary" variant="contained" onClick={() => { this.submit() }}>Log In</Button>
                            <p style={{ textAlign: 'center' }}>Don't have an account? <Link to="/sign_up"> Sign up! </Link></p>
                </div>
        );
    }
}