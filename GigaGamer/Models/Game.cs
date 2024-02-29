using Newtonsoft.Json;
using System.Dynamic;
using System.Transactions;

namespace GigaGamer.Models
{
    public class Game
    {
        public int ID;
        public string gameID;
        public string gameName;
        public string gameReleaseDate;
        public int genreID;
        public int developerID;
        public Boolean modSupport;
        public int rating;
        public string numPlayers;
        public string downloadLink;
        public string gameImageURL;
        public List<(int ID, string platformName)> platform = new List<(int platformID, string platformName)>();
        public List<(int ID, string platformName)> genres = new List<(int genreID, string genreName)>();


        private readonly string DatabaseServer = Database.dbServer;
        private readonly string DatabaseName = Database.dbName;
        private readonly string PrimaryView = "Games";
        private Database Database;


        // Constructor to create a Game object from raw data
        public Game(dynamic raw)
        {
            this.LoadObject(raw);
        }

        // Default constructor
        public Game()
        {
        }

        // Query game constants (platforms and genres)
        public void QueryConstants()
        {
            this.QueryPlatforms(); // Query platforms
            this.QueryGenres(); // Query genres
        }

        // Query platforms from the database
        public void QueryPlatforms()
        {
            string sqlData = "SELECT * FROM platforms";
            this.Database = new Database();
            List<dynamic> raw = this.Database.readMultipleRows(sqlData);

            foreach (dynamic item in raw)
            {
                int platformID = item.ID;
                string platformName = item.PlatformName;

                this.platform.Add((platformID, platformName));
            }
        }

        // Query genres from the database
        public void QueryGenres()
        {
            string sqlData = "SELECT * FROM genres";
            this.Database = new Database();
            List<dynamic> raw = this.Database.readMultipleRows(sqlData);

            foreach (dynamic item in raw)
            {
                int genreID = item.ID;
                string genreName = item.GenreName;

                this.genres.Add((genreID, genreName));
            }
        }

        // Get game constants in JSON format
        public string GetConstantsJSON()
        {
            dynamic constantData = new ExpandoObject();
            constantData.platforms = this.platform;
            constantData.genres = this.genres;

            return JsonConvert.SerializeObject(constantData);
        }

        // Load game object properties from raw data from database
        public void LoadObject(dynamic raw)
        {
            this.ID = raw.ID;
            this.gameName = raw.GameName;
            this.gameReleaseDate = raw.ReleaseDate;
            this.gameImageURL = raw.link;

            // Uncomment and add additional criteria if needed
            // this.genreID = raw.genreID;
            // this.developerID = raw.developerID;
            // this.modSupport = raw.modSupport;
            // this.rating = raw.rating;
            // this.numPlayers = raw.numPlayers;
            // this.downloadLink = raw.downloadLink;
        }




    }
}
