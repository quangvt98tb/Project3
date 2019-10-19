module.exports = function (app) {
    var router = app.loopback.Router()
    var Customer = app.models.Customer
    var RoleMapping = app.models.RoleMapping
    var Role = app.models.Role

    router.get('/api/manage-customer/list-customers', async function (req, res){
        // try {    
        //     listCustomer = await Customer.find({
        //         where: {enable: 1}, 
        //         fields: {
        //             fullName: true, 
        //             email: true,
        //             address: true, 
        //             phone: true,
        //             dateOfBirth: true, 
        //             gender: true, 
        //             receiveDistrict: true,
        //             createdAt: true
        //         }, 
        //     })
        //     return res.json(listCustomer) 
        // } catch (err) {
        //     console.log('show list Customers', err)
        //     return res.status(400).json(err)
        // }
        return res.json(Customer.listCustomer())
    })

    router.get('/api/manage-customer/:id', async function (req, res){
        try {
            customerData = await Customer.findById(req.params.id, {
                where: { enable: 1}, 
                fields: {
                    fullName: true, 
                    email: true,
                    address: true, 
                    phone: true,
                    dateOfBirth: true, 
                    gender: true, 
                    receiveDistrict: true, 
                    createdAt: true
                }, 
            })
            return res.json(customerData) 
        } catch (err) {
            console.log('show Customer', err)
            return res.status(400).json(err)
        }
    })

    router.post('/api/manage-customer/:id/block', async function(req, res){
        const customerData = {
            enable: req.body.enable
        }
        try {
            customer = await Customer.findByIdAndUpdate({id: req.params.id}, customerData)
            return res.json(customer)
        } catch (err) {
            console.log('block Customer', err)
            return res.status(400).json(err)
        }
    })

    router.post('/api/manage-customer/createAdmin', async function(req, res){
        const adminData = {
            email: req.body.email,
            password: req.body.password
        }
        try {
            let [err, roleAdmin] = await to(Role.findOne({where: {name: "admin"}}))
            if (roleAdmin == null) {
                return res.status(400).json(err)
            }
            admin = await User.create(adminData)
            const roleData = {
                principalType: RoleMapping.USER,
                principalId: admin.id,
                roleId: roleAdmin.id
            }
            try{
                roleMapping = await to(RoleMapping.create(roleData))
                return res.json(roleData)
            }
            catch{
                console.log('create Admin roleMapping', error)
                return res.status(400).json(error)
            }
        } catch (error) {
            console.log('create Admin', error)
            return res.status(400).json(error)
        }
    })

    app.use(router)
}