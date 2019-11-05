let to = require('await-to-js').to
'use_strict';

module.exports = function(Book) {
    const Promise = require('bluebird')

    // Admin
    Book.addBook = async function(reqData){
        const bookData = {
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
            let [err, book] = await to(Book.findOne({where: {name: reqData.name}}))
            if (book != null) {
                return "Da ton tai cuon sach nay"
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
    Book.showBook = async function(id) {
        try {
            const data1 = await Book.findById(id);
            let Category = app.models.Category
            genre = await Category.findById(data1.categoryId)
            data1.category = genre.name
            let data = {  
                id: data1.id,
                title: data1.name,
                imgUrl: data1.imgURL,
                price: data1.sellPrice,
                author: data1.author,
                description: data1.description,
                genre: data1.category
            }
            return data
        } catch (err) {
            console.log('show Book', err)
            throw err
        }
    }

    Book.listBook = async function(page, pageSize) {
        try {
            const [data1, total] = await Promise.all([
                Book.find({
                    fields: {
                        id: true,
                        name: true, 
                        categoryId: true, 
                        imgURL: true, 
                        author: true,
                        sellPrice: true
                    }
                })
            ])
            let i
            let data = []
            let Category = app.models.Category
            for (i = 0; i < data1.length; i++){
                let temp = {}
                temp.id = data1[i].id
                temp.title = data1[i].name
                temp.imgUrl = data1[i].imgURL
                temp.price = data1[i].sellPrice
                genre = await Category.findById(data1[i].categoryId)
                temp.category = genre.name
                data.push(temp)
            }
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

    Book.addToCart = async function(bookId, quantity, currentQuantity){
        let quan = quantity + currentQuantity
        let book = await Book.findById(bookId)
        if (book.enable != true || book.quantity == 0 || quan > book.quantity){
            return [400, []]
        }
        if (quantity == 0){
            return [200, book]
        }
        else return [200, book]         
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
            http: {path: '/show', verb: 'post'},
            accepts: {arg: 'id', type: 'string'},
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

    Book.remoteMethod('addToCart', 
    {
        http: {verb: 'post', path: '/addToCart' },
        accepts: [
            {arg: 'bookId', type: 'string'},
            {arg: 'quantity', type: 'number'},
            {arg: 'currentQuantity', type: 'number'}
        ],
        returns: { arg: 'data',type: 'object'}
    })

}
