var express = require('express'); // call express
var app = express(); // define our app using express
var bodyParser = require('body-parser');
var jwt = require('./middleware/jwt');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());


// ROUTES FOR OUR API
// =============================================================================
var router = express.Router(); // get an instance of the express Router

router.use(jwt.verify);

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function (req, res) {
    //get some stuff using get parameters
    res.json({
        message: 'hooray! we are live!!!'
    });
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/generateToken', function (req, res) {
    let param1 = req.query.param1;
    let param2 = req.query.param1;

    //get some stuff using get parameters
    res.json({
        message: {
            token: jwt.sign({
                param1,
                param2
            })
        }
    });
});


router.post('/update', function (req, res) {
    var body = req.body;
    //do some update stuff
    res.json({
        message: 'hooray! we are live!!!'
    });
});

app.use('/api', router);

module.exports = {
    app
};