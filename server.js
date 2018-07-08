const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cors = require('cors')
const app = express()

const CustomersController = require('./server/controllers/CustomersController')
const distDir = `${__dirname}/dist/`

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/webtrekk', { useNewUrlParser: true });
mongoose.connection.on('error', err => {
  console.error(err.message);
});

app.use(bodyParser.json())
app.use(cors())
app.use(express.static(distDir))

app.get('/api/customers', CustomersController.index)
app.post('/api/customers', CustomersController.create)

app.get('/api/customer/:id', CustomersController.single)
app.put('/api/customer/:id', CustomersController.update)
app.delete('/api/customer/:id', CustomersController.delete)

app.listen(process.env.PORT || 8081)
