
module.exports = function (app) {
    var router = app.loopback.Router()
    var Supplier = app.models.Supplier

    router.get('/api/manage-supplier/list-suppliers', async function (req, res){
        try {    
            listSupplier = await Supplier.find({
                fields: {
                    uid: true,
                    name: true, 
                    email: true,
                    address: true, 
                    phone: true, 
                    enable: true
                }, 
            })
            return res.json(listSupplier) 
        } catch (err) {
            console.log('show list Suppliers', err)
            return res.status(400).json(err)
        }
    })

    router.get('/api/manage-supplier/:id', async function (req, res){
        try {
            supplierData = await Supplier.findById(req.params.id, {
                fields: {
                    uid: true,
                    name: true, 
                    email: true,
                    address: true, 
                    phone: true, 
                    enable: true
                }, 
            })
            return res.json(supplierData) 
        } catch (err) {
            console.log('show Supplier', err)
            return res.status(400).json(err)
        }
    })
    
    router.post('/api/manage-supplier/create', async function(req, res){
        const supplierData = {
            uid: req.body.uid,
            name: req.body.name,
            email: req.body.name,
            address: req.body.address,
            phone: req.body.phone,
            enable: 1
        }
        try {
            let [err, supplier] = await to(Supplier.findOne({where: {uid: req.body.uid}}))
            if (supplier != null) {
                return res.status(400).json(err)
            }
            supplierCreate = await Supplier.create(supplierData)
            return res.json(supplierCreate)
        } catch (error) {
            console.log('create Supplier', error)
            return res.status(400).json(error)
        }
    })

    router.post('/api/manage-supplier/:id/update', async function(req, res){
        const supplierData = {
            uid: req.body.uid,
            name: req.body.name,
            email: req.body.name,
            address: req.body.address,
            phone: req.body.phone,
            enable: req.body.enable
        }
        try {
            supplierUpdate = await Supplier.findByIdAndUpdate({id: req.params.id}, supplierData)
            return res.json(supplierUpdate)
        } catch (err) {
            console.log('update Supplier', err)
            return res.status(400).json(err)
        }
    })

    router.delete('/api/manage-supplier/:id/delete', async function(req, res){
        try {
            supplierDelete = await Supplier.destroyById({id: req.params.id})
            return res.json(supplierDelete)
        } catch (err){
            console.log('delelte Supplier', err)
            return res.status(400).json(err)
        }
    })

    app.use(router)
}