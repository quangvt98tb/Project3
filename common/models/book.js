app = require('../../server/server')
let to = require('await-to-js').to
'use_strict';

module.exports = function(Book) {
    Book.createBook = async function(uid, name, catID, des, img, publisher, author, quantity, price, publishAt){
        let [err, book] = await to(Book.findOne({where: {uid : uid}}))
        if (err||book != null){
            return {
                statusCode: 400, 
                message: 'ma sach nay da ton tai'
            }
        }
        let Category = app.models.Category
        let i
        for (i = 0; i< catID.length; i++){
            let [errCat, category] = await to(Category.findOne({where: {id : catID[i]}}))
            console.log(i, errCat, category)
            if (errCat||category == null){
                return {
                    statusCode: 404, 
                    message: 'Ma the loai sach nay khong ton tai'
                }
            }
        }
        let bookData = {
            uid: uid,
            name: name,
            categoryId: catID,
            description: des,
            imgURL: img,
            publisher: publisher,
            author: author,
            quantity: quantity,
            sellPrice: price,
            publishAt: publishAt,
            enable: 1
        }
        let [errCreate, bookCreate] = await to(Book.create(bookData))
        if (errCreate||bookCreate == null){
            return {
                statusCode: 400, 
                message: 'Create fail'
            }
        }
        return {
            statusCode: 200, 
            message: 'Create success'
        }
    }

    Book.remoteMethod(
        'createBook', {
            http: {path: '/create', verb: 'post'},
            accepts: [
                {arg: 'uid', type: 'string', required: true},
                {arg: 'name', type: 'string', required: true},
                {arg: 'catID', type: 'array', required: true},
                {arg: 'des', type: 'string', required: false},
                {arg: 'img', type: 'string', required: false},
                {arg: 'publisher', type: 'string', required: true},
                {arg: 'author', type: 'array', required: true},
                {arg: 'quantity', type: 'number', required: false, default: '0'},
                {arg: 'price', type: 'number', required: true},
                {arg: 'publishAt', type: 'date', required: false}
            ],
            returns: [
                {arg: 'data', type: 'object'}
            ],
        }
    )
}
