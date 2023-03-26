const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const app = express();
const {mongoose} = require('./config/db.conf');
const {User} = require('./models/User.model')
dotenv.config();
const port = process.env.PORT;

// const options = {
//     origin: '',
//     methods: 'GET, PUT',
//   }

// app.use(cors(options));

app.use(cors());
app.use(express.json());

// test route
app.get('/', (req, res) => {
    // res.send('Hello World !!');
    const user = User.create({name:'name',age:26})
    
    res.json({msg:"Hello world from tailorlink backend"})
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});




