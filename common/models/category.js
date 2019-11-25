app = require('../../server/server')
'use_strict';

module.exports = function(Category) {
    const Promise = require('bluebird')
    
    //General
    Category.showCategory = async function(id) {
        try {
            const data = await Category.findById(id);
            return data
        } catch (err) {
            console.log('show Category', err)
            throw err
        }
    }

    Category.listCategory = async function(nlimit, page, pageSize) {
        try {
            const [data, total] = await Promise.all([
                Category.find({limit: nlimit}),
                Category.count()
            ])
            return {
                rows: data,
                page: page,
                pageSize: pageSize,
                total: total
            }
        } catch (err) {
            console.log('list Category', err)
            throw err
        }
    }

    Category.listBook = async function(genre, page, pageSize) {
        try {
            let Book = app.models.Book
            let Author = app.models.Author
            let category = await Category.find({where: {name: genre}})
            
            let cId = category[0].id
            let listId = [cId]
            
            const [data1, total] = await Promise.all([
                Book.find({
                    where: {categoryList : listId, enable: 1}, 
                    fields: {
                        id: true,
                        name: true, 
                        authorId: true, 
                        imgURL: true, 
                        sellPrice: true
                    }
                }),
                Book.count({categoryList : listId, enable: 1})
            ])
            
            let i
            let data = []
            for (i = 0; i < data1.length; i++){
                let temp = {}
                temp.id = data1[i].id
                temp.title = data1[i].name
                temp.imgUrl = data1[i].imgURL
                temp.price = data1[i].sellPrice
                author = await Author.findById(data1[i].authorId)
                temp.author = author.name
                data.push(temp)
            }
            
            return {
                rows: data,
                page: page,
                pageSize: pageSize,
                total: total
            }
        } catch (err) {
            console.log('list Book of Category', err)
            throw err
        }
    }

    Category.remoteMethod(
        'showCategory', {
            http: {path: '/show', verb: 'get'},
            accepts: [{arg: 'id', type: 'string', required: true}],
            returns: {arg: 'data', type: 'object'}
        }
    )

    Category.remoteMethod(
        'listCategory', {
            http: {path: '/list', verb: 'get' },
            accepts: [
                {arg: 'nlimit', type: 'number', default: 5},
                {arg: 'page', type: 'number', default: '4'},
                {arg: 'pageSize', type: 'number', default: '8'}],
            returns: {arg: 'data', type: 'object'}
      }
    )

    Category.remoteMethod(
        'listBook', {
            http: {path: '/listBook', verb: 'post' },
            accepts: [
                {arg: 'genre', type: 'string', required: true},
                {arg: 'page', type: 'number', default: '0'},
                {arg: 'pageSize', type: 'number', default: '10'}],
            returns: {arg: 'data', type: 'object', root: true}
      }
    )
}
