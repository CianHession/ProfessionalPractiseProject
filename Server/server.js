const express = require('express')
const app = express()
const port = 4000;
const bodyParser = require('body-parser')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

//Cross-Origin Resource Sharing - to allow 2 domains to interact
const cors = require('cors');
app.use(cors());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.post('/api/event', (req, res) => {
    //Log data
    console.log(req.body);
    console.log(req.body.Name);
    console.log(req.body.Price);
    console.log(req.body.Poster);
    res.send("Data Recieved!")
});

app.get('/', function (req, res) {
    res.send('Hello World!')
})

app.get('/api/event', (req, res) => {
    const event = [
        {
        }
    ]

    //Send JSON Data
    res.json({
        myEvents: event,
    })

})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
