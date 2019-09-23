let to = require('await-to-js').to;
app = require('../../server/server')
'use_strict';

module.exports = function(ExportOrder) {
    const Promise = require('bluebird')

    ExportOrder.showForUser = async function(id) {
        try {
            const data = await ExportOrder.findById(id, {fields: {
                id: true,
                bookList: true,
                subtotal: true,
                createdAt: true,
                updatedAt: true,
                status: true,
            }});
            return data
        } catch (err) {
            console.log('show ExportOrder for User', err)
            throw err
        }
    }

    ExportOrder.listOfUser = async function(userId, page, pageSize) {
        try {
            const [data, total] = await Promise.all([
                ExportOrder.find({
                    where: {userId : userId}, 
                    fields: {
                        subtotal: true,
                        createdAt: true,
                        updatedAt: true, 
                        status: true
                    }}),
                ExportOrder.count({userId : userId})
            ])
            return {
                rows: data,
                page: page,
                pageSize: pageSize,
                total: total
            }
        } catch (err) {
            console.log('list ExportOrder of User', err)
            throw err
        }
    }

    ExportOrder.listByStatus = async function(status, page, pageSize) {
        try {
            const [data, total] = await Promise.all([
                ExportOrder.find({
                    where: {status : status}, 
                    fields: {
                        subtotal: true, 
                        createdAt: true, 
                        updatedAt: true
                    }}),
                ExportOrder.count({status : status})
            ])
            return {
                rows: data,
                page: page,
                pageSize: pageSize,
                total: total
            }
        } catch (err) {
            console.log('list ExportOrder By Status', err)
            throw err
        }
    }

    ExportOrder.updateStatus = async function(id, status) {
        try {
            const data = await ExportOrder.upsertWithWhere({id: id}, {status: status})
            return data
        } catch (err) {
            console.log('update ExportOrderStatus', err)
            throw err
        }
    }

    ExportOrder.cancelOrderByUser = async function(id) {
        try {
            const order = await ExportOrder.findById(id)
            if (order.status == 'Cho xac nhan'){
                try{
                    const data = await ExportOrder.upsertWithWhere({id: id}, {status: 'Bi huy boi User'})
                    return data
                } catch (err) {
                    console.log('update ExportOrderStatus By User', err)
                    throw err
                }
            }
            else {
                return "Don Hang Da Duoc Tiep Nhan. Khong The Huy Don Hang!"
            }
        } catch (err) {
            console.log('find ExportOrderStatus', err)
            throw err
        }
    }

    ExportOrder.remoteMethod(
        'showForUser', {
            http: {path: '/show', verb: 'post'},
            accepts: [{arg: 'id', type: 'string', required: true}],
            returns: {arg: 'data', type: 'object'}
        }
    )

    ExportOrder.remoteMethod(
        'listOfUser', {
            http: {path: '/listOrdersOfUser', verb: 'post' },
            accepts: [
                {arg: 'userId', type: 'string', required: true},
                {arg: 'page', type: 'number', default: '0'},
                {arg: 'pageSize', type: 'number', default: '10'}],
            returns: {arg: 'data', type: 'object'}
      }
    )

    ExportOrder.remoteMethod(
        'listByStatus', {
            http: {path: '/listOrderByStatus', verb: 'post' },
            accepts: [
                {arg: 'status', type: 'string', required: true},
                {arg: 'page', type: 'number', default: '0'},
                {arg: 'pageSize', type: 'number', default: '10'}],
            returns: {arg: 'data', type: 'object'}
      }
    )

    ExportOrder.remoteMethod(
        'updateStatus', {
            http: {path: '/updateStatus', verb: 'post' },
            accepts: [
                {arg: 'id', type: 'string', required: true},
                {arg: 'status', type: 'string', required: true}],
            returns: {arg: 'data', type: 'object'}
      }
    )

    ExportOrder.remoteMethod(
        'cancelOrderByUser', {
            http: {path: '/cancelOrder', verb: 'post' },
            accepts: [{arg: 'id', type: 'string', required: true}],
            returns: {arg: 'data', type: 'object'}
      }
    )
}
