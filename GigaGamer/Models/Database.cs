// contains code that interacts directly with database. Contains method that connects to database and read from database.

using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Dynamic;
using Microsoft.AspNetCore.Http;
using Microsoft.VisualBasic;
using MySql.Data.MySqlClient;

namespace GigaGamer.Models
{
    public class Database
    {
        public const string dbName = "GigaGamer";
        public const string dbServer = "";
        public SqlConnection Connection;
        public string connectionString = "";

        // default constructor for Database Class
        public Database()
        {
            this.connectionString = "Server=localhost;Port=3306;Database=GigaGamer;Uid=root;Pwd=password;CharSet=utf8";
        }

        public string SanitizeStringForSql(string data)
        {
            // Incomplete function
            return data;
        }

        public dynamic readSingleRow(string sqlData)
        {
            List<dynamic> Items = readMultipleRows(sqlData);
            // returns first row from the sql data
            if (Items.Count == 1) return Items[0];
            return null;
        }

        // Helper method to convert a MySqlDataReader to a dynamic object
        private dynamic GetDynamicData(MySqlDataReader reader)
        {
            var expandoObject = new ExpandoObject() as IDictionary<string, object>;

            // Iterate over the fields in the reader and add them to the dynamic object
            for (int i = 0; i < reader.FieldCount; i++)
            {
                expandoObject.Add(reader.GetName(i), reader[i]);
            }

            return expandoObject;
        }

        // Read multiple rows from the database and return them as a list of dynamic objects
        public List<dynamic> readMultipleRows(string sqlData)
        {
            List<dynamic> Items = new List<dynamic>();

            using (MySqlConnection connection = new MySqlConnection(this.connectionString))
            {
                connection.Open();

                using (MySqlCommand cmd = new MySqlCommand(sqlData, connection))
                {
                    using (MySqlDataReader reader = cmd.ExecuteReader())
                    {
                        if (reader != null)
                        {
                            // Iterate over the reader and add each row as a dynamic object to the list
                            while (reader.Read())
                            {
                                Items.Add(GetDynamicData(reader));
                            }
                        }
                    }
                }
            }

            return Items;
        }
    }
}
