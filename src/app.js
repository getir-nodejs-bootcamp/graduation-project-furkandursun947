const config = require("./config");
const express = require("express");
const cors = require("cors");
const loaders = require("./loaders");
const Records = require("./models/db/records.model");
const validate = require("./middlewares/validate");
const ErrorHandler = require("./errors/error.handler");
const RecordsPayload = require("./validations/Records.validations")
const responseModel = require("./models/response.model");
config();
loaders();


const app = express();

app.use(express.json()); // ? optionally: body-parser can be used, this middleware is required for reading data from response   
app.use(cors({
    methods: "*",
    origin: "*"
}))
// ! since this project has only one endpoint, I will not split the code such as creatating routes, controller or service folders.


const pipeline = (endDate, startDate, minCount, maxCount) => {
    return [
        { $match: { createdAt: {$lt: endDate}, createdAt: {$gt: startDate}}},
        { $unwind: "$counts"},
        { $group: {_id: { "id":"$_id","key": "$key", "createdAt": "$createdAt"}, totalCount: { $sum: "$counts"}}},
        { $match: { totalCount: {$lt: maxCount}, totalCount: {$gt: minCount}}},
        { $unset: "_id.id"}
    ]
}



app.post('/records', validate(RecordsPayload),  async (req, res) => {
    var startDate = new Date(req.body.startDate);
    var endDate = new Date(req.body.endDate);

    var records = [];
    
    const agg = Records.aggregate(
        pipeline(endDate, startDate, req.body.minCount, req.body.maxCount)
    );

    if((await agg).length == 0){
        return res.send(new responseModel.ResponseModel(1, "No record found", records));
    }
    
    for await(const doc of agg){
        records.push(doc);
    }
    res.send(new responseModel.ResponseModel(0, "Success", records));
});


app.listen(process.env.SERVER_PORT, () => {
    console.log(`Application is running on ${process.env.SERVER_PORT}`);
    app.use((req, res, next) => {
        const error = new Error("Hata");
        console.log("geldi2");
        // TODO error handling
        res.status(404).send();
    })

});