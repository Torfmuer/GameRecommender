# GameRecommender
# By Esther Tan and Owen Foster

Documents
-------------
Presentation: https://docs.google.com/presentation/d/1uFtNsIMHyX4WsC2QK80AQnVuMcT4Y7m_1c3pJtzF-4k/edit?usp=sharing

Final Write up: https://docs.google.com/document/d/1yskE7xbOGJKkuZhpEGIAETaueTij9XLsei1cAHwRLcM/edit?usp=sharing


How to run the app
-------------------
1. Download .NET 6.0
2. Download Node.js and make sure npm is installed to your machine
3. Run the sql scripts that are included in the SQL_Scripts folder 
4. Change database connection string in Database.cs (add in your username and password there)
5. Install Visual Studio and use that to open this project (click on the .sln file)
6. Click on Debug > Start without Debugging to run the project on localhost


Architecture of this project
----------------------------
This project is built using React (javascript), .NET (C#) and MySQL. 
The React side takes care of the client side rendering while the .NET 
handles the operations in the backend and interacts with the database.
The frontend and backend communicates via HTTP requests like POST and GET
which will send a json payload to/from each other.


