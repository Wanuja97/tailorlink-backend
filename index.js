const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const http = require('http');
var morgan = require('morgan');

const app = express();
const server = http.createServer(app);

// DB Connection
const {mongoose} = require('./config/db.conf');

dotenv.config();
const port = process.env.PORT;

//import routes
const userRoutes = require('./routes/User.routes');
const productRoutes = require('./routes/Product.routes');
const categoryRoutes = require('./routes/Category.routes');
const notificationRoutes = require('./routes/Notification.routes');
const customizedOrderRoutes = require('./routes/CustomizeOrder.routes');
const orderRoutes = require('./routes/Order.routes');
const orderProposalRoutes = require('./routes/OrderProposal.routes');

app.use(morgan('combined'));
app.use(cors());
app.use(express.json());
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/customizeorder', customizedOrderRoutes);
app.use('/api/order', orderRoutes);
app.use('/api/orderproposal', orderProposalRoutes);

server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});




