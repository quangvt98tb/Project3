let to = require('await-to-js').to;
app = require('../../server/server')
'use_strict';

module.exports = function(ImportOrder) {
    const Promise = require('bluebird')

    ImportOrder.ListBySupplier = async function(supplierId, page, pageSize) {
        try {
            const [data, total] = await Promise.all([
                ImportOrder.find({
                    where: {supplierId : supplierId}, 
                    fields: {
                        supplierId: true,
                        subtotal: true,
                        createdAt: true,
                        status: true
                    },
                    include: ['belongsToSupplier']    
                }),
                ImportOrder.count({supplierId : supplierId})
            ])
            return {
                rows: data,
                page: page,
                pageSize: pageSize,
                total: total
            }
        } catch (err) {
            console.log('list ImportOrder of Supplier', err)
            throw err
        }
    }

    ImportOrder.ListByStatus = async function(status, page, pageSize) {
        try {
            const [data, total] = await Promise.all([
                ImportOrder.find({
                    where: {status : status}, 
                    fields: {
                        supplierId: true,
                        subtotal: true, 
                        createdAt: true, 
                        status: true
                    }}),
                ImportOrder.count({status : status})
            ])
            return {
                rows: data,
                page: page,
                pageSize: pageSize,
                total: total
            }
        } catch (err) {
            console.log('list ImportOrder By Status', err)
            throw err
        }
    }

    ImportOrder.UpdateStatus = async function(id, status) {
        try {
            const data = await ImportOrder.upsertWithWhere({id: id}, {status: status})
            return data
        } catch (err) {
            console.log('update ImportOrder Status', err)
            throw err
        }
    }

    ImportOrder.remoteMethod(
        'ListBySupplier', {
            http: {path: '/listBySupplier', verb: 'post' },
            accepts: [
                {arg: 'userId', type: 'string', required: true},
                {arg: 'page', type: 'number', default: '0'},
                {arg: 'pageSize', type: 'number', default: '10'}],
            returns: {arg: 'data', type: 'object'}
      }
    )

    ImportOrder.remoteMethod(
        'ListByStatus', {
            http: {path: '/listByStatus', verb: 'post' },
            accepts: [
                {arg: 'status', type: 'string', required: true},
                {arg: 'page', type: 'number', default: '0'},
                {arg: 'pageSize', type: 'number', default: '10'}],
            returns: {arg: 'data', type: 'object'}
      }
    )

    ImportOrder.remoteMethod(
        'UpdateStatus', {
            http: {path: '/updateStatus', verb: 'post' },
            accepts: [
                {arg: 'id', type: 'string', required: true},
                {arg: 'status', type: 'string', required: true}],
            returns: {arg: 'data', type: 'object'}
      }
    )

    ImportOrder.afterRemote('create', function(context, user, next) {
        
    })
}
