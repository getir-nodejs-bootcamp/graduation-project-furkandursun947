const config = require("./config");
const express = require("express");
const cors = require("cors");
const loaders = require("./loaders");
const Records = require("./models/db/records.model");
const validate = require("./middlewares/validate");
const ErrorHandler = require("./middlewares/error.handler");
const RecordsPayload = require("./validations/Records.validations")
const responseModel = require("./models/response.model");
const morgan = require("morgan");

// ! since this project has only one endpoint, I will not split the code such as creatating routes, controller or service folders.


config();       // setting our environment properties
loaders();      // database load


const app = express();

app.use(express.json()); // ? optionally: body-parser can be used, this middleware is required for reading data from response   

// cross-origin policy, allow any request 
app.use(cors({
    methods: "*",
    origin: "*"
}))

// ? We can create a file and write our logs to the file. But I will keep it simple and log them in console.
// ? Optionally for another logging package, winston can be used.  
app.use(morgan("combined"));


// Starting index
app.get('/', (req, res) => {
    res.status(200).json({
        Started:{
            message: "Only endpoint : /records"
        }
    })
})




/*
* This function filters the records data
* @param1: endDate => endDate from request.body
* @param2: startDate => startDate from request.body
* // ! createdAt field in our records must be between these two dates.
* @param3: minCount => minCount from request.body
* @param4: maxCount => maxCount from request.body
* // ! sum of counts field in our records must be between these two numbers.
* @return: a pipeline that will be used in aggregate
*/
const pipeline = (endDate, startDate, minCount, maxCount) => {
    return [
        { $match: { createdAt: {$lt: endDate}, createdAt: {$gt: startDate}}},
        { $unwind: "$counts"},
        { $group: {_id: { "id":"$_id","key": "$key", "createdAt": "$createdAt"}, totalCount: { $sum: "$counts"}}},
        { $match: { totalCount: {$lt: maxCount}, totalCount: {$gt: minCount}}},
        { $unset: "_id.id"}
    ]
}



/*
* @desc: Get data that is filtered by req.body
* @route: '/records', POST Method
* @validate: middleware for checking the request's body
* In this endpoint;
*   - We get the request body from user
*   - We convert string dates to Date object to compare with our createdAt field.
*   - Then we use a pipeline to filter the data
*   - @return If no record is found, set code of response to "1". If at least on record is found, then send a response with code "0".
*   // ! NOTE: Response codes => "0" = Success, "1" = No record is found. 
*/
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


app.listen(process.env.PORT, () => {
    console.log(`Application is running on ${process.env.PORT}`);

    
    // ! If user tries to request to an endpoint that is not valid, we catch the error in here.
    app.use((req, res, next) => {
        const error = new Error("Bad Request, no endpoint found in controller.");
        error.status = 404;
        next(error);
    })
    app.use(ErrorHandler);
});


module.exports = app