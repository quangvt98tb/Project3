let to = require('await-to-js').to
'use_strict';

module.exports = function(Book) {
    const Promise = require('bluebird')
    Book.showBook = async function(id) {
        try {
            const data = await Book.findById({id, 
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

    Book.listBook = async function(queryData, page, pageSize) {
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

    Book.remoteMethod(
        'showBook', {
            http: {path: '/show', verb: 'get'},
            accepts: [{arg: 'id', type: 'string', required: true}],
            returns: {arg: 'data', type: 'object', root:true}
        }
    )

    Book.remoteMethod(
        'listBook', {
            http: {path: '/list', verb: 'get' },
            accepts: [
                {arg: 'queryData', type: 'object'},
                {arg: 'page', type: 'number', default: '4'},
                {arg: 'pageSize', type: 'number', default: '8'}],
            returns: {arg: 'data', type: 'object'}
      }
    )
}
