const mongoose = require('mongoose');
const nanoid  = require('nanoid').nanoid

const database_name = process.env.MONGO_DATABASE_NAME
const username = process.env.MONGO_USERNAME
const password = process.env.MONGO_PASSWORD
const env_uri = process.env.MONGO_URI


const dbConnect = async () => {
    if (database_name === undefined || username === undefined
        || password === undefined || env_uri === undefined) {
        console.log("ERROR: .env file not found")
        process.exit(1);
    } else {
        const uri = env_uri.replace("username", username)
            .replace("password", password)
            .replace("database_name", database_name)
        console.log("Connecting to database...")
        mongoose.connect(uri)
            .then(data => {
                const urlNanoId = nanoid()
                console.log("...database connection successful!")
                console.log("NewID: " + urlNanoId)

            }).catch(err => {
            console.log("ERROR: database connection failed::" + err.message)
            process.exit(1);
        })
    }
}

module.exports = dbConnect