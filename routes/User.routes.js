const express = require('express')
const app = express.Router()

app.get('/', function (req, res) {
    res.send('All Users');
});
app.get('/:id', function (req, res) {
    res.send('View Users' + req.params.id);
});

module.exports = app 
