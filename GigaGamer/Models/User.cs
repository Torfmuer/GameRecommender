// contains that code pertaining to user functions/methods

using MySql.Data.MySqlClient;
using Newtonsoft.Json;
using System;
using System.Dynamic;

namespace GigaGamer.Models
{


    public class User
    {
        public int ID;
        public string uID;
        public int gameID;
        public string username;
        public string uFirstName;
        public string uLastName;
        public string uRating;
        public string uNumPlayers;
        private string password;
        public Boolean uModSupport;
        public DateTime uReleaseDate;
        public List<Game> Games = new List<Game>() { };



        private readonly string DatabaseServer = Database.dbServer;
        private readonly string DatabaseName = Database.dbName;
        private readonly string PrimaryView = "Users";
        private readonly string TableName = "Users";
        private Database Database;

        // Default constructor
        public User()
        {
            this.ID = -1;
            this.Database = new Database();
        }

        // Constructor with user ID and game ID
        public User(int userID, int gameID)
        {
            this.ID = userID;
            this.gameID = gameID;
            this.Database = new Database();
        }

        // Constructor with username
        public User(string username)
        {
            this.Database = new Database();
            this.QueryUser(username);
        }

        // Constructor with username and password
        public User(string username, string password)
        {
            this.Database = new Database();
            this.QueryUser(username, password);
        }

        // Query user from the database using username and password
        public void QueryUser(string username, string password)
        {
            string sqlData = "SELECT * FROM " + this.PrimaryView + " WHERE Username = '" + username + "'";

            dynamic raw = this.Database.readSingleRow(sqlData);

            if (raw != null)
            {
                if (raw.Password == password)
                {
                    this.LoadObject(raw);
                }
            }
            else
            {
                // Handle user not found
            }
        }

        // Query user from the database using username
        public void QueryUser(string username = "")
        {
            string sqlData = "";
            string CleanUsername = Database.SanitizeStringForSql(username);
            sqlData = "SELECT * FROM " + this.PrimaryView + " WHERE Username = '" + CleanUsername + "'";

            this.Database = new Database();
            dynamic raw = this.Database.readSingleRow(sqlData);

            if (raw != null)
            {
                this.LoadObject(raw);
            }
            else
            {
                // Handle user not found
            }
        }

        // Save user's game in the database
        public void SaveUserGame()
        {
            string sql = "INSERT INTO User_Games (gameID, userID) VALUES (@gameID, @userID)";

            using (MySqlConnection connection = new MySqlConnection(this.Database.connectionString))
            {
                using (MySqlCommand cmd = new MySqlCommand(sql, connection))
                {
                    cmd.Parameters.AddWithValue("@gameID", this.gameID);
                    cmd.Parameters.AddWithValue("@userID", this.ID);

                    connection.Open();
                    cmd.ExecuteNonQuery();
                    connection.Close();
                }
            }
        }

        // Delete user's games from the database
        public void DeleteUserGames(int userID, dynamic gameIDs)
        {
            string gameIdsString = string.Join(",", gameIDs);

            string sql = $"DELETE FROM user_games WHERE userID = @userId AND gameID IN ({gameIdsString})";

            using (MySqlConnection connection = new MySqlConnection(this.Database.connectionString))
            {
                using (MySqlCommand cmd = new MySqlCommand(sql, connection))
                {
                    cmd.Parameters.AddWithValue("@userId", userID);

                    connection.Open();
                    cmd.ExecuteNonQuery();
                    connection.Close();
                }
            }
        }

        // Query user's games from the database
        public void QueryUserGames()
        {
            string sqlData = "";
            string CleanUsername = Database.SanitizeStringForSql(username);
            sqlData = "SELECT * FROM Games WHERE ID IN (SELECT gameID FROM User_Games WHERE userID = '" + this.ID + "')";

            this.Database = new Database();

            List<dynamic> raw = this.Database.readMultipleRows(sqlData);
            foreach (dynamic Item in raw)
            {
                this.Games.Add(new Game(Item));
            }

            if (this.Games.Count == 0)
            {
                // Handle no games found
            }
        }

        // Get JSON representation of user's games
        public string GetMyGamesJSON()
        {
            return JsonConvert.SerializeObject(this.Games);
        }

        // Get JSON representation of user's data
        public string GetUserDataJSON()
        {
            dynamic user = new ExpandoObject();
            user.ID = this.ID;
            user.FirstName = this.uFirstName;
            user.LastName = this.uLastName;
            user.Username = this.username;

            return JsonConvert.SerializeObject(user);
        }

        // Set user object properties from a POST request
        public void SetFromPost(dynamic raw)
        {
            dynamic JSON = JsonConvert.DeserializeObject(raw.ToString());

            this.ID = Convert.ToInt32(JSON.ID);
            this.uFirstName = JSON.firstName;
            this.uLastName = JSON.lastName;
            this.username = JSON.username;
            this.password = JSON.password;

            // We didn't end up implementing the below due to time constraints
            //this.uRating = JSON.rating;
            //this.uNumPlayers = JSON.numPlayers;
            //this.uModSupport = JSON.modSupport;
            //this.uReleaseDate = JSON.releaseDate;
        }

        // Save the user object in the database
        public void Save()
        {
            if (this.ID > 0)
            {
                this.Update();
            }
            else
            {
                this.Insert();
                this.Update();
            }
        }

        // Insert the user object into the database
        public void Insert()
        {
            string insertSql = "INSERT INTO " + this.TableName + " DEFAULT VALUES";
            string selectSql = "SELECT LAST_INSERT_ID();";

            using (MySqlConnection connection = new MySqlConnection(this.Database.connectionString))
            {
                connection.Open();

                using (MySqlCommand insertCmd = new MySqlCommand(insertSql, connection))
                {
                    insertCmd.ExecuteNonQuery();
                }

                using (MySqlCommand selectCmd = new MySqlCommand(selectSql, connection))
                {
                    this.ID = Convert.ToInt32(selectCmd.ExecuteScalar());
                }

                connection.Close();
            }
        }

        // Update the user object in the database
        public void Update()
        {
            string sql = "UPDATE " + this.TableName + " " +
                         "SET UFirstName = @firstName, ULastName = @lastName, Username = @username, Password = @password " +
                         "WHERE ID = @ID";

            using (MySqlConnection connection = new MySqlConnection(this.Database.connectionString))
            {
                using (MySqlCommand cmd = new MySqlCommand(sql, connection))
                {
                    cmd.Parameters.AddWithValue("@firstName", this.uFirstName);
                    cmd.Parameters.AddWithValue("@lastName", this.uLastName);
                    cmd.Parameters.AddWithValue("@username", this.username);
                    cmd.Parameters.AddWithValue("@password", this.password);
                    cmd.Parameters.AddWithValue("@ID", this.ID);

                    // We didn't end up implementing the below due to time constraints
                    //cmd.Parameters.AddWithValue("@rating", this.uRating);
                    //cmd.Parameters.AddWithValue("@numPlayers", this.uNumPlayers);
                    //cmd.Parameters.AddWithValue("@modeSupport", this.uModSupport);
                    //cmd.Parameters.AddWithValue("@releaseDate", this.uReleaseDate);

                    connection.Open();
                    cmd.ExecuteNonQuery();
                    connection.Close();
                }
            }
        }

        // Load user object properties from raw data
        private void LoadObject(dynamic raw)
        {
            this.ID = raw.ID;
            this.username = raw.Username;
            this.uFirstName = raw.UFirstName;
            this.uLastName = raw.ULastName;
        }

    }
}
