app = require('../../server/server')
'use_strict';
module.exports = function(Admin) {

    // Admin.observe('before save', async function(ctx){
    //     const token = ctx.options && ctx.options.accessToken;
    //     const userId = token && token.userId;
    //     console.log(1, ctx.options)
    //     console.log(ctx)
    //     let admin = await Admin.findById(data.userId) 
    //     if (admin.root != true){
    //         next(new Error())
    //     }
    // })

    // Admin.observe('before delete', async function(ctx){
    //     let data = ctx.instance
    //     console.log(2, ctx)
    //     let admin = await Admin.findById(data.userId) 
    //     if (admin.root != true){
    //         next(new Error())
    //     }
    // })
}