const express = require('express'); 
const app = express();
const dotenv= require('dotenv');
dotenv.config();

const port = process.env.PORT;                 
app.use(express.json());
app.get('/', (req, res) => {  
    res.send('Hello World !!!');  
});

app.listen(port, () => {       
    console.log(`Server listening on port ${port}`); 
});