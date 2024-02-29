import React, { Component } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import './css/Home.css'


export class Home extends Component {
    static displayName = Home.name;


    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            User: null,
            isLoggedIn: false,
            username: ""

        }

    };

    // Checks to see if the user was previously logged in
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
                                    console.log(data);
                                    this.setState({ User: data, isLoading: false })
                                })
                                .catch(error => {
                                    console.error('Error fetching user data:', error);
                                    window.location.replace('https://localhost:44413/log_on');
                                });
                        }
                        else {
                            window.location.replace('https://localhost:44413/log_on');
                        }
                    }
                );
            }
        );


    }

    // Render splash page
    render() {
   
        return (
            <>
                {
                    this.state.isLoading ? <CircularProgress / > : 
                < div id = "title_text" >
                    <h1>Welcome {this.state.User.FirstName}</h1>
                    <h3>Get gaming! <Button size="small" color="secondary" variant="contained" href="main_form">SEARCH</Button> </h3>
              </div >
                }
            </>
        
    );
  }
}
