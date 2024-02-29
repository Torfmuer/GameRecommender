import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { NavMenu } from './NavMenu';
import CircularProgress from '@mui/material/CircularProgress';

export class Layout extends Component {
    static displayName = Layout.name;

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            User: null,
            isLoggedIn: false,
            username: ""

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
                                    console.log(data);
                                    if (data.ID > 0 && data.FirstName != "") {
                                        this.setState({ isLoading: false, isLoggedIn: true })
                                    }
                                })
                                .catch(error => {
                                    console.error('Error fetching user data:', error);
                                })
                                .finally(() => {
                                    this.setState({ isLoading: false })
                                });

                        }
                       
                    }
                );
            }
        );



    }

  render() {
    return (
        <div>
            <NavMenu isLoggedIn={this.state.isLoggedIn} />
            
        <Container>
          {this.props.children}
        </Container>
      </div>
    );
  }
}
