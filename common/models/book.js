let to = require('await-to-js').to
'use_strict';

module.exports = function(Book) {
    const Promise = require('bluebird')

    // Admin
    Book.addBook = async function(reqData){
        const bookData = {
            uid : reqData.uid,
            name : reqData.name,
            categoryId : reqData.categoryId,
            description : reqData.description,
            imgURL : reqData.imgURL,
            publisher : reqData.publisher,
            author : reqData.author,
            quantity : reqData.quantity,
            sellPrice : reqData.sellPrice,
            publishedAt : reqData.publishedAt
        }
        try {
            let [err, book] = await to(Book.findOne({where: {uid: reqData.uid}}))
            if (book != null) {
                return "Da ton tai ma sach nay"
            }
            bookCreate = await Book.create(bookData)
            return bookCreate
        } catch (error) {
            console.log('create Book', error)
            throw error
        }
    }

    Book.updateBook = async function(reqData){
        const bookData = {}
        bookData.uid = reqData.uid
        bookData.name = reqData.name
        bookData.categoryId = reqData.categoryId
        bookData.description = reqData.description
        bookData.imgURL = reqData.imgURL
        bookData.publisher = reqData.publisher
        bookData.author = reqData.author
        bookData.quantity = reqData.quantity
        bookData.sellPrice = reqData.sellPrice
        bookData.publishedAt = reqData.publishedAt
        try{
            book = await bookModel.findByIdAndUpdate({id: reqData.id}, bookData)
            return book
        } catch (error) {
            throw error
        }
    }

    // Customer
    Book.showBook = async function(reqData) {
        try {
            const data = await Book.findById({reqData, 
                fields: {
                    id: true, 
                    name: true, 
                    categoryId: true, 
                    description: true,
                    imgURL: true, 
                    publisher: true, 
                    author: true,
                    sellPrice: true,
                    publishedAt: true,
                    enable: true
                }, 
                include: ['belongsToCategory']
            });
            return data
        } catch (err) {
            console.log('show Book', err)
            throw err
        }
    }

    Book.listBook = async function(page, pageSize) {
        try {
            const [data, total] = await Promise.all([
                Book.find({
                    fields: {
                        _id: true,
                        name: true, 
                        categoryId: true, 
                        description: true,
                        imgURL: true, 
                        publisher: true, 
                        author: true,
                        sellPrice: true,
                        publishedAt: true
                    }, 
                    include: ['belongsToCategory']
                })
            ])
            return {
                rows: data,
                page: page,
                pageSize: pageSize,
                total: total
            }
        } catch (err) {
            console.log('list Book', err)
            throw err
        }
    }

    //
    Book.remoteMethod('addBook', 
    {
        http: {path: '/addBook', verb: 'post'},
        accepts: {arg: 'reqData', type: 'Object', http: { source: 'body' }},
        returns: { arg: 'data',type: 'object'}
    })

    Book.remoteMethod('updateBook', 
    {
        http: {path: '/updateBook', verb: 'post'},
        accepts: {arg: 'reqData', type: 'Object', http: {source: 'body'}},
        returns: { arg: 'data',type: 'object'}
    })
    
    Book.remoteMethod(
        'showBook', {
            http: {path: '/show', verb: 'get'},
            accepts: {arg: 'reqData', type: 'Object', http: {source: 'body'}},
            returns: { arg: 'data',type: 'object'}
        }
    )

    Book.remoteMethod(
        'listBook', {
            http: {path: '/list', verb: 'get' },
            accepts: [
                {arg: 'page', type: 'number', default: '4'},
                {arg: 'pageSize', type: 'number', default: '8'}],
            returns: { arg: 'data',type: 'object'}
      }
    )
}
