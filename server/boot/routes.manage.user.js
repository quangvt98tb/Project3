
module.exports = function (app) {
    var router = app.loopback.Router()
    var User = app.models.User

    router.get('/api/manage-user/list-users', async function (req, res){
        try {    
            listUser = await User.find({
                where: {enable: 1, role: false}, 
                fields: {
                    fullName: true, 
                    address: true, 
                    phone: true,
                    birthday: true, 
                    gender: true, 
                }, 
            })
            return res.json(listUser) 
        } catch (err) {
            console.log('show list Users', err)
            return res.status(400).json(err)
        }
    })

    router.get('/api/manage-user/:id', async function (req, res){
        try {
            userData = await User.findById(req.params.id, {
                where: { role: false}, 
                fields: {
                    fullName: true, 
                    address: true, 
                    phone: true,
                    birthday: true, 
                    gender: true, 
                }, 
            })
            return res.json(userData) 
        } catch (err) {
            console.log('show User', err)
            return res.status(400).json(err)
        }
    })
    
    router.post('/api/manage-user/create', async function(req, res){
        const userData = {
            uid: req.body.uid,
            fullName: req.body.fullName,
            password: req.body.password,
            address: req.body.address,
            phone: req.body.phone,
            birthday: req.body.birthday,
            gender: req.body.gender
        }
        try {
            let [err, user] = await to(User.findOne({where: {email: req.body.email, phone: req.body.phone}}))
            if (user != null) {
                //return [200, 'Email or Phone exsited']
                return res.status(400).json(err)
            }
            userData = await User.create(userData)
            return res.json(userData)
        } catch (error) {
            console.log('create User', error)
            return res.status(400).json(error)
        }
    })

    router.post('/api/manage-user/:id/update', async function(req, res){
        const userData = {
            uid: req.body.uid,
            fullName: req.body.fullName,
            password: req.body.password,
            address: req.body.address,
            phone: req.body.phone,
            birthday: req.body.birthday,
            gender: req.body.gender
        }
        try {
            userData = await User.findByIdAndUpdate({id: req.params.id}, userData)
            return res.json(userData)
        } catch (err) {
            console.log('update User', err)
            return res.status(400).json(err)
        }
    })

    router.delete('/api/manage-user/:id/delete', async function(req, res){
        try {
            userData = await User.destroyById({id: req.params.id})
            return res.json(userData)
        } catch (err){
            console.log('delelte User', err)
            return res.status(400).json(err)
        }
    })

}