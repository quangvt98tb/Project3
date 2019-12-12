app = require('../../server/server')
'use_strict';

module.exports = function(User) {
    // Amdin create Admin
    User.afterRemote('create', async function(ctx){
        let reqData = ctx.instance
        console.log(ctx)
        let RoleMapping = app.models.RoleMapping
        let Role = app.models.Rolel
        let admin = await User.find({where: {email: reqData.email}})
        let roleAdmin = await Role.findOne({where: {name: "admin"}})
        let admin2 = await User.updertWithWhere({id: admin.id}, {enable: false})
        console.log(admin2)
        const roleData = {
            principalType: RoleMapping.USER,
            principalId: admin.id,
            roleId: roleAdmin.id
        }
        await RoleMapping.create(roleData)
    })
}