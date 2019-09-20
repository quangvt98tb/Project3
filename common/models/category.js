app = require('../../server/server')
let to = require('await-to-js').to
'use_strict';

module.exports = function(Category) {
    Category.findBook = async function(id){
        let [err, category] = await to(Category.findOne({where: {id : id}}))
        if (err||category == null){
            return {
                statusCode: 404, 
                message: 'Ma the loai sach nay khong ton tai'
            }
        }
        let Book = app.models.Book
        let [errBook, bookArr] = await to(Book.find({where: {categoryId : id}}))
        if (errBook||bookArr == null){
            return {
                statusCode: 404, 
                message: 'Khong co sach thuoc the loai nay'
            }
        }
        return {
            statusCode: 200, 
            message: 'Danh sach sach thuoc the loai',
            result: bookArr
        }
    }

    Category.remoteMethod(
        'findBook', {
            http: {path: '/:id/listBook', verb: 'post'},
            accepts: [
                {arg: 'id', type: 'string', required: true}
            ],
            returns: [
                {arg: 'data', type: 'object'}
            ],
        }
    )
}
