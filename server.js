const itemsRouter = require('./routes/itemRouter'),
    userRouter = require('./routes/userRouter'),
    express = require('express'),
    morgan = require('morgan'),
    app = express(),
    jwt = require('jsonwebtoken');;

//morgan for logging
app.use(morgan('dev'));
app.set('secretKey', 'nodeRestApi');

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.use('/user', userRouter);

//Secure Routers
app.use('/items', validateUser, itemsRouter);

function validateUser(req, res, next) {
    jwt.verify(req.headers['x-access-token'], req.app.get('secretKey'), function(err, decoded) {
        if (err) {
            res.json({ status: "error", message: err.message, data: null });
        } else {
            // add user id to request
            //req.body.userId = decoded.id;
            next();
        }
    });

}


const port = 3001;
app.listen(port, function() {
    console.debug('Server listening on port ' + port);
});