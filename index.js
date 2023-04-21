const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
var morgan = require('morgan');
const app = express();
const {mongoose} = require('./config/db.conf');
const {User} = require('./models/User.model')
//import routes
const userRoutes = require('./routes/User.routes');

dotenv.config();
const port = process.env.PORT;

app.use(morgan('combined'));
app.use(cors());
app.use(express.json());
app.use('/api/users', userRoutes);


app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});




