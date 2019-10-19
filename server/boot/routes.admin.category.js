module.exports = function (app) {
    var router = app.loopback.Router()
    var Category = app.models.Category

    router.get('/api/manage-category/list-categorys', async function (req, res){
        try {    
            listCategory = await Category.find({
                fields: {
                    name: true
                }, 
            })
            return res.json(listCategory) 
        } catch (err) {
            console.log('show list Categorys', err)
            return res.status(400).json(err)
        }
    })

    router.get('/api/manage-category/:id', async function (req, res){
        try {
            categoryData = await Category.findById(req.params.id, {
                fields: {
                    name: true
                }, 
            })
            return res.json(categoryData) 
        } catch (err) {
            console.log('show Category', err)
            return res.status(400).json(err)
        }
    })
    
    router.post('/api/manage-category/create', async function(req, res){
        const categoryData = {
            name: req.body.name
        }
        try {
            let [err, category] = await to(Category.findOne({where: {name: req.body.name}}))
            if (category != null) {
                return res.status(400).json(err)
            }
            categoryCreate = await Category.create(categoryData)
            return res.json(categoryCreate)
        } catch (error) {
            console.log('create Category', error)
            return res.status(400).json(error)
        }
    })

    router.post('/api/manage-category/:id/update', async function(req, res){
        const categoryData = {
            name: req.body.name
        }
        try {
            categoryUpdate = await Category.findByIdAndUpdate({id: req.params.id}, categoryData)
            return res.json(categoryUpdate)
        } catch (err) {
            console.log('update Category', err)
            return res.status(400).json(err)
        }
    })

    router.delete('/api/manage-category/:id/delete', async function(req, res){
        try {
            categoryDelete = await Category.destroyById({id: req.params.id})
            return res.json(categoryDelete)
        } catch (err){
            console.log('delelte Category', err)
            return res.status(400).json(err)
        }
    })

    app.use(router)
}