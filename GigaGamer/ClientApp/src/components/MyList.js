import React, { Component } from 'react';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';
import EditIcon from '@mui/icons-material/Edit';
import BookmarkRemoveIcon from '@mui/icons-material/BookmarkRemove';
import SaveIcon from '@mui/icons-material/Save';
import IconButton from '@mui/material/IconButton';
import './css/MainForm.css';



export class MyList extends Component {
    static displayName = MyList.name;

    constructor(props) {
        super(props);
        this.state = {
            title: "",
            myGames: [],
            deleteGames: [],
            isLoading: true,
            User: null,
            isLoggedIn: false,
            username: "",
            showDeleteBtns: false,
            editMode: false
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
                                    this.setState({ User: data, isLoading: false, isLoggedIn: true }, () => {
                                        this.getUserGames();
                                    })
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


    // Aqure current games on list
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

    // Edit mode handler
    editMode = () => {
        if (this.state.showDeleteBtns) {
            this.setState({ showDeleteBtns: false })
        }
        else {
            this.setState({showDeleteBtns: true})
        }

        if (this.state.editMode) {
            // show message
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userID : this.state.User.ID, gameIDs : this.state.deleteGames })
            };
            fetch("https://localhost:7130/GigaGamer/DeleteGames", requestOptions)
                .then(response => response.text())
                .then(data => {
                    console.log(data);
                    this.setState({ editMode: false })

                })
                .catch(error => {
                    console.error('Error deleting games', error);
                });
        }
        else {
            this.setState({editMode : true})
        }
    }

    deleteGame = (gameID) => {
        let deleteGames = this.state.deleteGames;
        let myGames = this.state.myGames;

        for (let i = 0; i < myGames.length; i++) {
            if (myGames[i].ID === gameID) {
                myGames.splice(i, 1); 
                break;
            }
        }
        deleteGames.push(gameID);

        this.setState({ myGames: myGames, deleteGames: deleteGames });

    }

    render() {
        return (
            <>
            {
                    this.state.isLoading ? <CircularProgress /> :
                        <div>
                            <h1 style={{ color: 'white' }}>My Games
                                <IconButton aria-label="add" onClick={() => { this.editMode() }} style={{ display: this.state.editMode ? 'none' : 'inline-flex' }}>
                                    <EditIcon />
                                </IconButton>
                                <IconButton aria-label="add" onClick={() => { this.editMode() }} style={{ display: this.state.editMode ? 'inline-flex' : 'none' }}>
                                    <SaveIcon />
                                </IconButton>
                            </h1>
                            <br />
                            <Alert severity="info">Click <EditIcon /> to edit the list and <SaveIcon /> to save your changes</Alert>
                            <br />
                            <Stack sx={{ width: '100%' }} spacing={2}>
                                <div id="mygameslist">
                                    {this.state.isLoading ? <CircularProgress /> : this.state.isLoggedIn ? null : <Alert severity="info">Please log in to view your game list!</Alert>}
                                    {this.state.myGames.map((game, index) => (
                                        <div class="mygame" key={`game-${index}`}>
                                            <IconButton aria-label="delete" style={{ display: this.state.showDeleteBtns ? 'inline-flex' : 'none' }} onClick={() => { this.deleteGame(game.ID) }}>
                                                <BookmarkRemoveIcon />
                                            </IconButton>
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
                            </Stack>
                        </div>
            }
            </>
           

        );
    }
}
