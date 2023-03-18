const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

const app = express();
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
    res.send('Hello World !!!');
});


app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});