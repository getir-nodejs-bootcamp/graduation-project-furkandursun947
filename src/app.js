const config = require("./config");
const express = require("express");
const loaders = require("./loaders");
const Records = require("./models/records.model");
const validate = require("./middlewares/validate");
const RecordsPayload = require("./validations/Records.validations")

config();
loaders();


const app = express();

app.use(express.json()); // ? optionally: body-parser can be used, this middleware is required for reading data from response   

// ! since this project has only one endpoint, I will not split the code such as creatating routes, controller or service folders.


  

app.post('/records', validate(RecordsPayload), (req, res) => {
    // Todo operation
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