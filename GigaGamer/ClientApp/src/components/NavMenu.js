import React, { Component } from 'react';
import { Collapse, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import './NavMenu.css';

export class NavMenu extends Component {
  static displayName = NavMenu.name;

  constructor (props) {
    super(props);

    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      collapsed: true
    };
  }

  toggleNavbar () {
    this.setState({
      collapsed: !this.state.collapsed
    });
    }

    logout = () => {
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('username');
        window.location.replace('https://localhost:44413/log_on');

    }

  render() {
    return (
      <header id="menwah">
        <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3" container light>
          <NavbarBrand tag={Link} to="/">GigaGamer</NavbarBrand>
          <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
          <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!this.state.collapsed} navbar>
            <ul className="navbar-nav flex-grow">
              <NavItem>
                <NavLink tag={Link}  to="/">Home</NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} to="/main_form">Search</NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} to="/my_games">My Games</NavLink>
            </NavItem>
                        {this.props.isLoggedIn ? 
                 <NavItem id="logout">
                    <Button size="small" color="secondary" variant="contained" onClick={() => { this.logout() }}>Log Out</Button>
                </NavItem>
                :
                <NavItem>
                    <NavLink color="secondary" tag={Link} to="/log_on">Log In</NavLink>
                </NavItem>
            }
             
            </ul>
          </Collapse>
        </Navbar>
      </header>
    );
  }
}
