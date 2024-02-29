using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.Diagnostics;
using GigaGamer.Models;
using Microsoft.AspNetCore.Authorization;
using System;
using Microsoft.Extensions.FileSystemGlobbing;

namespace GigaGamer.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class GigaGamerController : ControllerBase
    {
        private readonly ILogger<GigaGamerController> _logger;

        public GigaGamerController(ILogger<GigaGamerController> logger)
        {
            _logger = logger;
        }

        // Default action for the controller
        public ActionResult Index()
        {
            throw new NotImplementedException("you made it to the default controller");
        }

        // Action for saving user profile
        [HttpPost]
        public string SaveUserProfile([FromBody] dynamic raw)
        {
            try
            {
                User User = new User();
                User.SetFromPost(raw); // Set user data from the request body
                User.Save(); // Save the user profile
            }
            catch (Exception ex)
            {
                // Handle any exceptions that occur during the process
            }

            return "";
        }

        // Action for retrieving user data
        [HttpPost("GetUserData")]
        public string GetUserData([FromBody] dynamic raw)
        {
            dynamic JSON = JsonConvert.DeserializeObject(raw.ToString());
            string username = JSON.username;
            User User = new User(username); // Create a User object with the specified username (placeholder for now)

            return User.GetUserDataJSON(); // Return the user data in JSON format
        }

        // Action for user login
        [HttpPost("LoginUser")]
        public string LoginUser([FromBody] dynamic raw)
        {
            dynamic JSON = JsonConvert.DeserializeObject(raw.ToString());
            string username = JSON.username;
            string password = JSON.password;
            User User = new User(username, password); // Create a User object with the specified username and password (placeholder for now)

            return User.GetUserDataJSON(); // Return the user data in JSON format
        }

        // Action for creating a new user
        [HttpPost("CreateUser")]
        public string CreateUser([FromBody] dynamic raw)
        {
            dynamic JSON = JsonConvert.DeserializeObject(raw.ToString());

            User User = new User(); // Create a new User object

            User.SetFromPost(raw); // Set user data from the request body
            User.Save(); // Save the new user
            return User.GetUserDataJSON(); // Return the user data in JSON format
        }

        // Action for searching games
        [HttpPost("SearchGames")]
        public string SearchGames([FromBody] dynamic raw)
        {
            GameMatcher Matcher = new GameMatcher(); // Create a GameMatcher object

            Matcher.QueryGames(raw); // Query games based on the provided criteria

            return Matcher.GetGamesJSON(); // Return the matched games in JSON format
        }

        // Action for adding a game to a user's collection
        [HttpPost("AddUserGame")]
        public string AddUserGame([FromBody] dynamic raw)
        {
            dynamic JSON = JsonConvert.DeserializeObject(raw.ToString());
            int userID = JSON.userID;
            int gameID = JSON.gameID;
            User User = new User(userID, gameID); // Create a User object with the specified userID and gameID (placeholder for now)

            User.SaveUserGame(); // Save the user's game
            return "done";
        }

        // Action for retrieving a user's games
        [HttpPost("GetUserGames")]
        public string GetUserGames([FromBody] dynamic raw)
        {
            dynamic JSON = JsonConvert.DeserializeObject(raw.ToString());
            int userID = JSON.userID;

            User User = new User(userID, 0); // Create a User object with the specified userID (placeholder for now)
            User.QueryUserGames(); // Query the user's games

            return User.GetMyGamesJSON(); // Return the user's games in JSON format
        }

        // Action for deleting games from a user's collection
        [HttpPost("DeleteGames")]
        public string DeleteGames([FromBody] dynamic raw)
        {
            dynamic JSON = JsonConvert.DeserializeObject(raw.ToString());
            int userID = JSON.userID;
            dynamic gameIDs = JSON.gameIDs;

            User User = new User(); // Create a new User object

            User.DeleteUserGames(userID, gameIDs); // Delete the specified games from the user's collection
            return "done";
        }

        // Action for retrieving constants (game-related)
        [HttpPost("GetConstants")]
        public string GetConstants([FromBody] dynamic raw)
        {
            dynamic JSON = JsonConvert.DeserializeObject(raw.ToString());

            Game Game = new Game(); // Create a new Game object
            Game.QueryConstants(); // Query game constants

            return Game.GetConstantsJSON(); // Return the game constants in JSON format
        }
    }
}
