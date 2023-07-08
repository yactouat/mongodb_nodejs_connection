// getting the client class from the official mongodb driver
const { MongoClient } = require('mongodb');

/**
 * 
 * connect to a MongoDB database and return the db client instance
 * 
 * @param {string} dbUrl - localhost would be mongodb://localhost:27017
 * @param {string} dbName 
 * @returns {MongoClient|null}
 */
module.exports = async function getMongoClientObj(dbUrl, dbName) {
    const client = new MongoClient(dbUrl);
    try {
        await client.connect();
        console.log('Connected successfully to server');
        // returning the client object
        return client;
    } catch (error) {
        console.error(error);
        // returning null if there is an error while connecting
        return null;
    }
}
