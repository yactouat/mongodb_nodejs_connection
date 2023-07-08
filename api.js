// loading the environment variables
require('dotenv').config()

const express = require("express");

// getting the connectToMongoDb function from mongo.js
const getMongoClientObj = require("./mongo");

const app = express();

app.get("/", async (req, res) => {
    // arbitrary database name
    const dbName = process.env.DB_NAME;
    const dbObj = await getMongoClientObj(process.env.DB_URL, dbName);
    // sending back a JSON response
    res.json({ 
        msg: "Welcome to the API connected to MongoDB!", 
        data: {
            dbIsup: dbObj != null // this way we can check if the db is up or not
    }});
    // if there is a db connection, we can get the server status
    if (dbObj != null) {
        dbObj.db(dbName).admin().serverStatus().then((info) => {
            console.info("INFO ABOUT AVAILABLE AND CURRENT CONNECTIONS: ", info.connections);
            // ! comment the line below and see the current connections count pile up ;)
            dbObj.close();
        });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));