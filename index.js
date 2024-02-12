const connectToMongo = require('./config');
const bodyParser = require('body-parser')
const express = require('express')
const cors = require('cors') // Import cors module
const path = require('path');

const auth = require('./routes/auth');
const cart = require('./routes/cart')
const wishlist = require('./routes/wishlist')
const product = require('./routes/product')
const review = require('./routes/review')
const paymentRoute = require('./routes/paymentRoute')
const forgotPassword = require('./routes/forgotPassword')
const AdminRoute = require('./routes/Admin/AdminAuth')
const dotenv = require('dotenv');
const checkOrigin = require('./middleware/apiAuth');
dotenv.config()

connectToMongo();

const port = 3000;

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// Use cors middleware
app.use(cors());

// Set static directory
app.use(express.static(path.join(__dirname, 'build')));

// Use checkOrigin middleware after setting up routes
app.use('/api/auth', auth)
app.use('/api/product', product)
app.use('/api/cart', cart)
app.use('/api/wishlist', wishlist)
app.use('/api/review', review)
app.use('/api/admin', AdminRoute)
app.use('/api', paymentRoute)
app.use('/api/password', forgotPassword)
app.use(checkOrigin);

app.listen(port, () => {
    console.log(`E-commerce backend listening at http://localhost:${port}`)
})
