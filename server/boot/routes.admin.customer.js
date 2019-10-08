module.exports = function (app) {
    var router = app.loopback.Router()
    var Customer = app.models.Customer

    router.get('/api/manage-customer/list-customers', async function (req, res){
        try {    
            listCustomer = await Customer.find({
                where: {enable: 1, role: false}, 
                fields: {
                    fullName: true, 
                    email: true,
                    password:true,
                    address: true, 
                    phone: true,
                    dateOfBirth: true, 
                    gender: true, 
                    receiveDistrict: true, 
                }, 
            })
            return res.json(listCustomer) 
        } catch (err) {
            console.log('show list Customers', err)
            return res.status(400).json(err)
        }
    })

    router.get('/api/manage-customer/:id', async function (req, res){
        try {
            customerData = await Customer.findById(req.params.id, {
                where: { enable: 1}, 
                fields: {
                    fullName: true, 
                    email: true,
                    password:true,
                    address: true, 
                    phone: true,
                    dateOfBirth: true, 
                    gender: true, 
                    receiveDistrict: true, 
                }, 
            })
            return res.json(customerData) 
        } catch (err) {
            console.log('show Customer', err)
            return res.status(400).json(err)
        }
    })
    
    router.post('/api/manage-customer/create', async function(req, res){
        const customerData = {
            fullName: req.body.fullName,
            email: req.body.email,
            password: req.body.password,
            address: req.body.address,
            phone: req.body.phone,
            dateOfBirth: req.body.dateOfBirth,
            gender: req.body.gender,
            receiveDistrict: req.body.receiveDistrict
        }
        try {
            let [err, customer] = await to(Customer.findOne({where: {email: req.body.email, phone: req.body.phone}}))
            if (customer != null) {
                return res.status(400).json(err)
            }
            customerData = await Customer.create(customerData)
            return res.json(customerData)
        } catch (error) {
            console.log('create Customer', error)
            return res.status(400).json(error)
        }
    })

    router.post('/api/manage-customer/:id/update', async function(req, res){
        const customerData = {
            fullName: req.body.fullName,
            email: req.body.email,
            password: req.body.password,
            address: req.body.address,
            phone: req.body.phone,
            dateOfBirth: req.body.dateOfBirth,
            gender: req.body.gender,
            receiveDistrict: req.body.receiveDistrict
        }
        try {
            
            customerData = await Customer.findByIdAndUpdate({id: req.params.id}, customerData)
            return res.json(customerData)
        } catch (err) {
            console.log('update Customer', err)
            return res.status(400).json(err)
        }
    })

    router.delete('/api/manage-customer/:id/delete', async function(req, res){
        try {
            customerData = await Customer.destroyById({id: req.params.id})
            return res.json(customerData)
        } catch (err){
            console.log('delelte Customer', err)
            return res.status(400).json(err)
        }
    })

    app.use(router)
}