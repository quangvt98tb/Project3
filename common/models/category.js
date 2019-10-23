// let to = require('await-to-js').to;
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

    Category.listBook = async function(id, page, pageSize) {
        try {
            let Book = app.models.Book
            const [data, total] = await Promise.all([
                Book.find({
                    where: {categoryId : id, enable: 1}, 
                    fields: {_id: true, name: true, imgURL: true, sellPrice: true}
                }),
                Book.count({categoryId : id, enable: 1})
            ])
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
            http: {path: '/listBook', verb: 'get' },
            accepts: [
                {arg: 'id', type: 'string', required: true},
                {arg: 'page', type: 'number', default: '0'},
                {arg: 'pageSize', type: 'number', default: '10'}],
            returns: {arg: 'data', type: 'object'}
      }
    )
}
