module.exports = function (app) {
    var router = app.loopback.Router()
    var Customer = app.models.Customer

    router.post('/api/customer/create', async function(req, res){
        console.log(req.body)
        const customerData = {
            fullName: req.body.fullname,
            email: req.body.email,
            password: req.body.password,
            address: req.body.province,
            receiveDistrict: req.body.district,
            createdAt: new Date(),
            enable: 1
        }
        try {
            let [err, customer] = await to(Customer.findOne({where: {email: req.body.email}}))
            if (customer != null) {
                return res.status(400).json(err)
            }
            customerData = await Customer.create(customerData)
            let Cart = app.models.Cart
            var CartData = {}
            CartData.userId = data.id
            cart = Cart.create(CartData)
            return res.json(customerData)
        } catch (error) {
            console.log('create Customer', error)
            return res.status(400).json(error)
        }
    })

    router.post('/api/customer/:id/update', async function(req, res){
        const customerData = {
            fullName: req.body.fullName,
            email: req.body.email,
            password: req.body.password,
            address: req.body.address,
            phone: req.body.phone,
            dateOfBirth: req.body.dateOfBirth,
            gender: req.body.gender,
            receiveDistrict: req.body.receiveDistrict,
        }
        try {
            customer = await Customer.findByIdAndUpdate({id: req.params.id}, customerData)
            return res.json(customer)
        } catch (err) {
            console.log('update Customer', err)
            return res.status(400).json(err)
        }
    })

    app.use(router)
}
