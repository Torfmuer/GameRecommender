import React, { Component } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import './css/MainForm.css';
//import './css/onmovehandle.js';



export class MainForm extends Component {
    static displayName = MainForm.name;
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            platformID: 0,
            platforms: [],
            genreID: 0,
            genres: [],
            games: [],
            myGames:[],
            myGame: 0,
            isLoading: true,
            User: null,
            isLoggedIn: false,
            username: "",
            message: ""
        };
    }

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
                                    this.setState({ User: data, isLoading: false }, () => {
                                        this.getUserGames();
                                        this.getConstants();
                                    })
                                })
                                .catch(error => {
                                    console.error('Error fetching user data:', error);
                                    window.location.replace('https://localhost:44413/log_on');
                                });
                        }
                        else {
                            window.location.replace('https://localhost:44413/log_on')
                        }
                    }
                );
            }
        );


    }

    // Aquire and send filters
    getConstants = () => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userID: this.state.User.ID })
        };
        fetch("https://localhost:7130/GigaGamer/GetConstants", requestOptions)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                this.setState({ platforms: data.platforms, genres: data.genres })
            })
            .catch(error => {
                console.error('Error fetching games data:', error);
            });
    }

    // Aquire current games on list
    getUserGames = () => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userID: this.state.User.ID })
        };
        fetch("https://localhost:7130/GigaGamer/GetUserGames", requestOptions)
            .then(response => response.json())
            .then(data => {
                console.log(data);
               this.setState({ myGames: data })
            })
            .catch(error => {
                console.error('Error fetching games data:', error);
            });
    }

    // Submit and change handler
    handleChange = (event) => {
        const { name, value } = event.target;

        this.setState({
            [name]: value
        });
        

    }

    // Know what to do when add
    addGame = (gameID) => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({gameID: gameID, userID: this.state.User.ID})
        };
        fetch("https://localhost:7130/GigaGamer/AddUserGame", requestOptions)
            .then(response => response.text())
            .then(data => {
                console.log(data);
                let d = this.state.myGames;
                d.push({ID: gameID})
                this.setState({myGames : d})
             
            })
            .catch(error => {
                console.error('Error saving game data:', error);
            });
    }

    // Submit full form
    submit = () => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(this.state)
        };
        fetch("https://localhost:7130/GigaGamer/SearchGames", requestOptions)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                this.setState({ games: data }, () => {
                    if (this.state.games.length <= 0) {
                        this.setState({ message: "No results found. Please try again with different criteria." })
                    }
                    else {
                        this.setState({ message: "" })
                    }
                })
             
            })
            .catch(error => {
                console.error('Error fetching search data:', error);
            });
    }


    render() {
        return (
                <>
                {
                    this.state.isLoading ? <CircularProgress /> :
                        <>
                            <div id="search" style={{ display: 'block', margin: 'auto', textAlign: 'center' }}>
                                <h2>Find a Game</h2>
                                <Box sx={{ width: '100%' }}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12}>
                                            <TextField
                                                color="secondary"
                                                name="title"
                                                label="Game Title"
                                                defaultValue=""
                                                color="secondary"
                                                onChange={this.handleChange}
                                                fullWidth
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <FormControl fullWidth>
                                                <InputLabel color="secondary" id="demo-simple-select-label">Supported Platforms</InputLabel>
                                                <Select
                                                    color="secondary"
                                                    name="platformID"
                                                    labelId="demo-simple-select-label"
                                                    id="demo-simple-select"
                                                    label="Platforms"
                                                    onChange={this.handleChange}
                                                >
                                                    {this.state.platforms.map((platform) => (
                                                        <MenuItem key={platform.Item1} value={platform.Item1}>
                                                            {platform.Item2}
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <FormControl fullWidth>
                                                <InputLabel color="secondary" id="demo-simple-select-label">Genres</InputLabel>
                                                <Select
                                                    color="secondary"
                                                    name="platformID"
                                                    labelId="demo-simple-select-label"
                                                    id="demo-simple-select"
                                                    label="Genres"
                                                    onChange={this.handleChange}
                                                >
                                                    {this.state.genres.map((genre) => (
                                                        <MenuItem key={genre.Item1} value={genre.Item1}>
                                                            {genre.Item2}
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                        </Grid>

                                    </Grid>
                                </Box>

                                <br />
                                <Box sx={{ width: '100%' }}>
                                    <Grid item xs={12}>
                                        <Button color="secondary" variant="contained" onClick={() => { this.submit() }}>Search</Button>
                                    </Grid>
                                </Box>
                            </div>
                            <div id="gameslist" style={{ marginTop: '5%' }}>
                                {this.state.message !== "" && (
                                    <div id="message">{this.state.message}</div>
                                )}
                                {this.state.games.map((game, index) => (
                                    <div class="game" key={`game-${index}`}>
                                        {this.state.myGames.find(g => g.ID === game.ID) ?
                                            <BookmarkAddedIcon />
                                            :
                                            <div class="add_ico"><IconButton aria-label="add" onClick={() => { this.addGame(game.ID) }}
                                                style={{ display: this.state.addedGames?.includes(game.ID) ? 'none' : 'inline-flex' }}
                                            >
                                                <AddCircleIcon />
                                            </IconButton> </div>

                                        }
                                        <div><img src={game.gameImageURL} /></div>
                                        <div class="gametxt">
                                            <span>{game.gameName}</span>
                                            <br />
                                            <span>{game.gameReleaseDate}</span>
                                            <br /><br />
                                        </div>
                                    </div>
                                ))}
                            </div>

                        </>
                }
                </>
 
        );
    }

}
