const cors = require('cors');
const http = require('http');
var morgan = require('morgan');
const dotenv = require('dotenv');
const express = require('express');

const app = express();
const server = http.createServer(app);

// DB Connection
const {mongoose} = require('./config/db.conf');

dotenv.config();
const port = process.env.PORT;

//import routes
const authRoutes = require('./routes/Auth.routes');
const userRoutes = require('./routes/User.routes');
const adminRoutes = require('./routes/Admin.routes');
const orderRoutes = require('./routes/Order.routes');
const sellerRoutes = require('./routes/Seller.routes');
const productRoutes = require('./routes/Product.routes');
const paymentRoutes = require('./routes/Payment.routes');
const categoryRoutes = require('./routes/Category.routes');
const notificationRoutes = require('./routes/Notification.routes');
const orderProposalRoutes = require('./routes/OrderProposal.routes');
const customizedOrderRoutes = require('./routes/CustomizeOrder.routes');

app.use(cors());
app.use(express.json());
app.use(morgan('combined'));

app.use('/api/auth',authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/order', orderRoutes);
app.use('/api/seller', sellerRoutes);
app.use('/api/products', productRoutes);
app.use('/api/payment', paymentRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/orderproposal', orderProposalRoutes);
app.use('/api/customizeorder', customizedOrderRoutes);

server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});




