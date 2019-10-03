
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
            throw err
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
            throw err
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
            throw err
        }
    })

    router.delete('/api/manage-user/:id/delete', async function(req, res){
        try {
            userData = await User.destroyById({id: req.params.id})
            return res.json(userData)
        } catch (err){
            console.log('delelte User', err)
            throw err
        }
    })

}