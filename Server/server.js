const express = require('express')
const app = express()
const port = 4000;
const bodyParser = require('body-parser')

//JWT Authentication
var cookieParser = require('cookie-parser');
var bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const exjwt = require('express-jwt');
var db = require("./models");

/*========= Here we want to let the server know that we should expect and allow a header with the content-type of 'Authorization' ============*/
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Headers', 'Content-type,Authorization');
  next();
});

/*========= This is the typical node server setup so we can be able to parse the requests/responses coming in and out of the server ============*/
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

/*========= Here we will set up an express jsonwebtoken middleware(simply required for express to properly utilize the token for requests) You MUST instantiate this with the same secret that will be sent to the client ============*/
const jwtMW = exjwt({
  secret: 'PPITCHKG'
});

app.post('/signup', (req, res) => {
  const { username, password } = req.body;
  const saltRounds = 10;
  bcrypt.hash(password, saltRounds, function (err, hash) {
    db.user.create({
      username: username,
      password: hash
    }).then((result) => {
      console.log("User created: ", result);
      res.json("user created!");
    })
  });
})

/* This is SUPER important! This is the route that the client will be passing the entered credentials for verification to. If the credentials match, then the server sends back a json response with a valid json web token for the client to use for identification. */
app.post('/log-in', (req, res) => {
  const { username, password } = req.body;
  console.log("User submitted: ", username, password);

  db.user.findOne(
    {
      where: { username: username }
    })
    .then((user) => {
      console.log("User Found: ", user);
      if (user === null) {
        res.json(false);
      }
      bcrypt.compare(password, user.password, function (err, result) {
        if (result === true) {
          console.log("Valid!");
          let token = jwt.sign({ username: user.username }, 'PPITCHKG', { expiresIn: 129600 }); // Signing the token
          res.json({
            sucess: true,
            err: null,
            token
          });
        }
        else {
          console.log("Entered Password and Hash do not match!");
          res.status(401).json({
            sucess: false,
            token: null,
            err: 'Entered Password and Hash do not match!'
          });
        }
      });
    })
});


app.get('/', jwtMW /* Using the express jwt MW here */, (req, res) => {
  console.log("Web Token Checked.")
  res.send('You are authenticated'); //Sending some response when authenticated
});

db.sequelize.sync().then(() => {
  app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
  });
})


module.exports = app;

const PORT = process.env.PORT || 3000;
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
