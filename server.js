const itemsRouter = require('./routes/itemRouter');

const express = require('express');
const app = express();



app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.use('/items', itemsRouter);


const port = 3001;
app.listen(port, function() {
    console.debug('Server listening on port ' + port);
});