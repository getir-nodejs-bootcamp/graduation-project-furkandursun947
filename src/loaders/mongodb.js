const Mongoose = require("mongoose");

const db = Mongoose.connection;


// TODO Sil bunu
db.once("open", () => {
    console.log("MongoDB'ye baglanti basarilidir..");
});

// We want our project to wait database connection so it is more proper to use async.   
const connectionDB = async () => {
    await Mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@challenge-xzwqd.mongodb.net/${process.env.DB_NAME}?retryWrites=true`, {
        // ? any DB connection options comes here, we don't have to use useNewUrlParser since we are not working in localhost or any other db with specified port on it.
    });
}


module.exports = {
    connectionDB,
};
  