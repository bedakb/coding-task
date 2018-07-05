const Customer = require('../models/Customer')
const { handleError } = require('../handlers/errors')

module.exports = {

    index(req, res) {
        Customer.find({}, (err, data) => {
            if (err) {
                handleError(res, err.message, 'Error occured: Fetching customers list data failed !')
            }
            res.send(data)
        })
    },

    single(req, res) {
        Customer.findById(req.params.id, (err, data) => {
            if (err) {
                handleError(res, err.message, 'Error occured: Fetching single customer data failed !')
            }
            res.send(data)
        })
    },

    create(req, res) {
        let { name, birthday, gender, customerLifetimeValue} = req.body

        const newCustomer = new Customer({ name, birthday, gender, customerLifetimeValue})

        newCustomer.save(err => {
            if (err) {
                handleError(res, err.message, 'Error occured: Can not create new customer !')
            }
            res.send({
                success: true,
                message: 'Customer has been successfully created !'
            })
        })
    },

    update(req, res) {
        Customer.findById(req.params.id, (err, data) => {
            data.name.first = req.body.name.first
            data.name.last = req.body.name.last
            data.birthday = req.body.birthday
            data.gender = req.body.gender
            data.customerLifetimeValue = req.body.customerLifetimeValue

            if (err) {
                handleError(res, err.message, 'Error occured: Can not update this customer!')
            }
            data.save(err => {
                res.send({
                    success: true,
                    message: 'Customer has been successfully updated !'
                })
            })
        })
    },

    delete(req, res) {
        Customer.findByIdAndRemove(req.params.id, err => {
            if (err) {
                handleError(res, err.message, 'Error occured: Can not delete this customer!')
            }
            res.send({
                success: true,
                message: 'Customer has been successfully removed !'
            })
        })
    }

}