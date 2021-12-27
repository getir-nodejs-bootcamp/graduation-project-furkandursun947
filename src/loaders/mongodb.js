const Mongoose = require("mongoose");

const db = Mongoose.connection;

// ? Logging the message in console. We can log it into a file.
db.once("open", () => {
    console.log("Connection to database is established.");
});

// ! We want our project to wait database connection so it is more proper to use async.   
const connectionDB = async () => {
    await Mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@challenge-xzwqd.mongodb.net/${process.env.DB_NAME}?retryWrites=true`, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
}


module.exports = {
    connectionDB,
};
  