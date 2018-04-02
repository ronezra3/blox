const express = require('express')
const app = express()
const bodyParser = require('body-parser');


app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    next();
});

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))


var api = require("./api/index");

app.use(api);


app.listen(3000, () => console.log('app listening on port 3000!'))