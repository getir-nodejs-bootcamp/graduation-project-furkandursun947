const Mongoose = require("mongoose");

const db = Mongoose.connection;

// ? Logging the message in console. We can log it into a file.
db.once("open", () => {
    console.log("Connection to database is established.");
});

// ! We want our project to wait database connection so it is more proper to use async.   
const connectionDB = async () => {
    const CONNECT_URL = process.env.DB_CONNECT_URL;
    await Mongoose.connect(CONNECT_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
}


module.exports = {
    connectionDB,
};
  