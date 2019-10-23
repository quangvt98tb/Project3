let to = require('await-to-js').to;
app = require('../../server/server')
'use_strict';

module.exports = function(ExportOrder) {
    const Promise = require('bluebird')
    ExportOrder.validatesInclusionOf('statua', {in: ["Doi Xac Nhan", "Doi Giao Hang", "Da Huy", "Bi Huy", "Da Hoan Thanh"]})

    ExportOrder.UserRead = async function(id) {
        try {
            const data = await ExportOrder.findById(id, 
                {fields: {
                    userId: true,
                    subtotal: true,
                    paymentMethod: true,
                    addressShip: true,
                    createdAt: true,
                    updatedAt: true, 
                    status: true
                },
                include: ['belongsToUser']
            });
            return data
        } catch (err) {
            console.log('show ExportOrder for User', err)
            throw err
        }
    }

    ExportOrder.UserList = async function(userId, page, pageSize) {
        try {
            const [data, total] = await Promise.all([
                ExportOrder.find({
                    where: {userId : userId}, 
                    fields: {
                        subtotal: true,
                        paymentMethod: true,
                        addressShip: true,
                        createdAt: true,
                        updatedAt: true, 
                        status: true
                    }
                }),
                ExportOrder.count({userId : userId})
            ])
            return {
                rows: data,
                page: page,
                pageSize: pageSize,
                total: total
            }
        } catch (err) {
            console.log('list ExportOrder For User', err)
            throw err
        }
    }

    ExportOrder.UserCancelOrder = async function(id) {
        try {
            const order = await ExportOrder.findById(id)
            if (order.status == 'Cho xac nhan'){
                try{
                    const data = await ExportOrder.upsertWithWhere({id: id}, {status: 'Bi Huy'})
                    return data
                } catch (err) {
                    console.log('update ExportOrderStatus By User', err)
                    throw err
                }
            }
            else {
                return {status: "Don Hang Da Duoc Tiep Nhan. Khong The Huy Don Hang!"}
            }
        } catch (err) {
            console.log('find ExportOrderStatus', err)
            throw err
        }
    }

    ExportOrder.AdminListByUser = async function(userId, page, pageSize) {
        try {
            const [data, total] = await Promise.all([
                ExportOrder.find({
                    where: {userId : userId}, 
                    fields: {
                        userId: true,
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

    ExportOrder.AdminListByStatus = async function(status, page, pageSize) {
        try {
            const [data, total] = await Promise.all([
                ExportOrder.find({
                    where: {status : status}, 
                    fields: {
                        userId: true,
                        subtotal: true, 
                        createdAt: true, 
                        updatedAt: true,
                        status: true
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

    ExportOrder.AdminUpdateByStatus = async function(reqData){
        if (reqData.status == "Chap nhan"){
            let order = await ExportOrder.findById(req.params.id)
            let i
            for (i = 0; i < order.bookList.length; i++){
                let bookId =  order.bookList[i].bookId
                let quantity = order.bookList[i].quantity
                let book = await Book.findById(bookId)
                if (book.quantity < quantity){
                    ExportOrder.upsertWithWhere(req.params.id, {status: "Huy vi Khong Du Sach"})
                    return res.status(400).json('Khong Du So Luong Sach Trong Kho')
                }
            }
            for (i = 0; i < order.bookList.length; i++){
                bookId = order.bookList[i].bookId
                quantity = order.bookList[i].quantity
                try{
                    let book = await Book.findById(bookId)
                    let newQuantity = book.quantity - orderData.quantity
                    let bookUpdate = await Book.upsertWithWhere(book.id, {quantity: newQuantity})
                } catch (error) {
                    console.log('create Order Detail', error)
                    return res.status(400).json(error)
                }
            }
        }
        let exportUpdate = await ExportOrder.upsertWithWhere(req.params.id, {status: reqData.status})
        return res.json(exportUpdate)
    }

    ExportOrder.remoteMethod(
        'UserRead', {
            http: {path: '/show', verb: 'post'},
            accepts: [{arg: 'id', type: 'string', required: true}],
            returns: {arg: 'data', type: 'object'}
        }
    )

    ExportOrder.remoteMethod(
        'UserList', {
            http: {path: '/listOrdersForUser', verb: 'post' },
            accepts: [
                {arg: 'userId', type: 'string', required: true},
                {arg: 'page', type: 'number', default: '0'},
                {arg: 'pageSize', type: 'number', default: '10'}],
            returns: {arg: 'data', type: 'object'}
      }
    )

    ExportOrder.remoteMethod(
        'UserCancelOrder', {
            http: {path: '/cancelOrder', verb: 'post' },
            accepts: [{arg: 'id', type: 'string', required: true}],
            returns: {arg: 'data', type: 'object'}
      }
    )

    ExportOrder.remoteMethod(
        'AdminListByUser', {
            http: {path: '/listOrdersOfUser', verb: 'post' },
            accepts: [
                {arg: 'userId', type: 'string', required: true},
                {arg: 'page', type: 'number', default: '0'},
                {arg: 'pageSize', type: 'number', default: '10'}],
            returns: {arg: 'data', type: 'object'}
      }
    )

    ExportOrder.remoteMethod(
        'AdminListByStatus', {
            http: {path: '/listOrderByStatus', verb: 'post' },
            accepts: [
                {arg: 'status', type: 'string', required: true},
                {arg: 'page', type: 'number', default: '0'},
                {arg: 'pageSize', type: 'number', default: '10'}],
            returns: {arg: 'data', type: 'object'}
      }
    )
}
