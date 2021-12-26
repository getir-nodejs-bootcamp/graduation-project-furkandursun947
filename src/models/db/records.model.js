const Mongoose = require("mongoose");


const RecordsSchema = new Mongoose.Schema(
    {
        key: String,
        value: String,
        counts: [Number],
        createdAt: Date,
    }
)


module.exports = Mongoose.model("records", RecordsSchema);