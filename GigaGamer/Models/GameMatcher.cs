// contains functions/methods to match games based on user's preference

using System.Text.Json;
using Newtonsoft.Json;


namespace GigaGamer.Models
{
    public class GameMatcher
    {
        public List<Game> Games = new List<Game>() { };

        private readonly string DatabaseServer = Database.dbServer;
        private readonly string DatabaseName = Database.dbName;
        private Database Database;

        // constructor for GameMatcher class
        public GameMatcher()
        {
            Database = new Database();
        }

        // Query Games from database based on criteria from frontend
        public void QueryGames(JsonElement criteria)
        {
            List<dynamic> raw = this.Database.readMultipleRows(this.ComposeGameSQL(criteria));
            foreach (dynamic Item in raw)
            {
                this.Games.Add(new Game(Item));
            }

            if (this.Games.Count == 0)
            {
                // no games matched
            }
        }

        private string ComposeGameSQL(JsonElement criteria)
        {
            dynamic Criteria = JsonConvert.DeserializeObject(criteria.ToString());
            string sql = "";

            // Compose the SQL query based on the specified criteria

            // Check if the title criteria is provided
            if (Criteria.title != "")
            {
                sql = sql + " GameName LIKE '%" + Criteria.title + "%'";
            }

            // Check if the platform ID criteria is provided
            if (Criteria.platformID != 0)
            {
                if (sql != "")
                {
                    sql += " AND ";
                }
                sql = sql + "PlatformID = " + Criteria.platformID;
            }

            // Due to time constraints, the genre ID criteria was not implemented
            //if (Criteria.genreID != 0)
            //{
            //    if (sql != "")
            //    {
            //        sql = " AND ";
            //    }
            //    sql = sql + "GenreID = " + Criteria.genreID;
            //}

            // Compose the final SQL query to retrieve games based on the criteria
            sql = "SELECT * FROM games WHERE ID IN ( SELECT DISTINCT ID FROM game_platform_view WHERE " + sql + " )";

            return sql;
        }

        public string GetGamesJSON()
        {
            return JsonConvert.SerializeObject(this.Games);
        }


    }
}
