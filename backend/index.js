const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/webtrekk', { useNewUrlParser: true });
mongoose.Promise = global.Promise;
mongoose.connection.on('error', err => {
  console.error(err.message);
});

const app = express()
app.use(bodyParser.json())

const CustomersController = require('./controllers/CustomersController')

app.get('/customers', CustomersController.index)
app.post('/customers', CustomersController.create)

app.get('/customer/:id', CustomersController.single)
app.put('/customer/:id', CustomersController.update)
app.delete('/customer/:id', CustomersController.delete)

app.listen(process.env.PORT || 8081)