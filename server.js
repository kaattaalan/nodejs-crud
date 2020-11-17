const itemsRouter = require('./routes/itemRouter'),
    express = require('express'),
    morgan = require('morgan'),
    app = express();

//morgan for logging
app.use(morgan('dev'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.use('/items', itemsRouter);


const port = 3001;
app.listen(port, function() {
    console.debug('Server listening on port ' + port);
});