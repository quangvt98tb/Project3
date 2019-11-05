let to = require('await-to-js').to;
app = require('../../server/server')
'use_strict';

module.exports = function(ExportOrder) {
    const Promise = require('bluebird')
    ExportOrder.validatesInclusionOf('status', {in: ["Doi Xac Nhan", "Doi Giao Hang", "Da Huy", "Bi Huy", "Da Hoan Thanh"]})
    ExportOrder.validatesInclusionOf('paymentMethod', {in: ["Direct Bank Transfer", "Cheque Payment", "Cash on Delivery"]})
    
    ExportOrder.createOrder = async function(reqData){
        let OrderDetail = app.models.OrderDetail
        let Book = app.models.Book
        let i
        let orderDetailList = {}
        for (i = 0; i < reqData.cart.addedItems.length(); i++){
            let bookData = {
                bookId: reqData.cart.addedItems[i].bookId,
                quantity: reqData.cart.addedItems[i].quantity,
                price: reqData.cart.addedItems[i].price
            }
            try {
                let data1 = await OrderDetail.create(bookData)
                orderDetailList.push(data1)
            } catch (err){
                console.log('add To ExportOrder', err)
                return [400, err]
            }
        }
        let data = {
            userId: reqData.profileData.userId,
            status: "Doi Xac Nhan",
            paymentMethod: reqData.checkOutType,
            addressShip: reqData.profileData.addressShip,
            subtotal: reqData.cart.total,
            createdAt: Date()
        }
        try{
            let exportOrder = await ExportOrder.create(data)
            exportOrder.bookList.set(orderDetailList)
            return exportOrder
        } catch (err){
            console.log('create ExportOrder', err)
            return [400, err]
        }
    }

    ExportOrder.UserRead = async function(orderId) {
        try {
            const data = await ExportOrder.findById(orderId, 
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
            return [400, err]
        }
    }

    ExportOrder.UserList = async function(userId) {
        try {
            const data1 = await Promise.all([
                ExportOrder.find({
                    where: {userId : userId}
                })
            ])
            let Customer = app.models.Customer
            customer = Customer.findById(userId)
            let data = {
                shipDate: data1.updatedAt,
                orderCode: data1.id,
                orderDate: data1.createdAt,
                status: data1.status,
                books: data1.bookList,
                fullName: customer.fullName
            }
            return data
        } catch (err) {
            console.log('list ExportOrder For User', err)
            return [userId, err]
        }
    }

    ExportOrder.UserCancelOrder = async function(orderId) {
        try {
            const order = await ExportOrder.findById(orderId)
            if (order.status == 'Doi Xac Nhan'){
                try{
                    const data = await ExportOrder.upsertWithWhere({id: orderId}, {status: 'Bi Huy'})
                    return data
                } catch (err) {
                    console.log('update ExportOrderStatus By User', err)
                    return err
                }
            }
            else {
                return [400, "Don Hang Da Duoc Tiep Nhan. Khong The Huy Don Hang!"]
            }
        } catch (error) {
            console.log('find ExportOrderStatus', error)
            return error
        }
    }

    ExportOrder.AdminListByUser = async function(userId) {
        try {
            const [data, total] = await Promise.all([
                ExportOrder.find({
                    where: {userId :userId}, 
                    fields: {
                        id: true,
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
                total: total
            }
        } catch (err) {
            console.log('list ExportOrder of User', err)
            return [400, err]
        }
    }

    ExportOrder.AdminListByStatus = async function(status) {
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
                total: total
            }
        } catch (err) {
            console.log('list ExportOrder By Status', err)
            return [400, err]
        }
    }

    ExportOrder.AdminUpdateByStatus = async function(reqData){
        if (reqData.status == "Doi Giao Hang"){
            let order = await ExportOrder.findById(req.params.id)
            let i
            for (i = 0; i < order.bookList.length; i++){s
                let book = await Book.findById(order.bookList[i].bookId)
                if (book.quantity < order.bookList[i].quantity){
                    ExportOrder.upsertWithWhere(req.params.id, {status: "Da Huy"})
                    return [400, 'Khong Du So Luong Sach Trong Kho']
                }
            }
            for (i = 0; i < order.bookList.length; i++){
                try{
                    let book = await Book.findById(order.bookList[i].bookId)
                    let newQuantity = book.quantity - order.bookList[i].quantity
                    let bookUpdate = await Book.upsertWithWhere(book.id, {quantity: newQuantity})
                } catch (error) {
                    console.log('create Order Detail', error)
                    return [400, error]
                }
            }
        }
        let exportUpdate = await ExportOrder.upsertWithWhere(req.params.id, {status: reqData.status})
        return exportUpdate
    }

    ExportOrder.remoteMethod(
        'createOrder', {
            http: {path: '/createOrder', verb: 'post'},
            accepts: {arg: 'reqData', type: 'Object', http: {source: 'body'}},
            returns: { arg: 'data',type: 'object'}
        }
    )

    ExportOrder.remoteMethod(
        'UserRead', {
            http: {path: '/show', verb: 'post'},
            accepts: {arg: 'orderId', type: 'string'},
            returns: { arg: 'data',type: 'object'}
        }
    )

    ExportOrder.remoteMethod(
        'UserList', {
            http: {path: '/listOrdersForUser', verb: 'post' },
            accepts: {arg: 'userId', type: 'string'},
            returns: { arg: 'data',type: 'object'}
      }
    )

    ExportOrder.remoteMethod(
        'UserCancelOrder', {
            http: {path: '/cancelOrder', verb: 'post' },
            accepts: {arg: 'orderId', type: 'string'},
            returns: { arg: 'data',type: 'object'}
      }
    )

    ExportOrder.remoteMethod(
        'AdminListByUser', {
            http: {path: '/listOrdersOfUser', verb: 'post' },
            accepts: {arg: 'userId', type: 'string'},
            returns: { arg: 'data',type: 'object'}
      }
    )

    ExportOrder.remoteMethod(
        'AdminListByStatus', {
            http: {path: '/listOrderByStatus', verb: 'post' },
            accepts: {arg: 'status', type: 'string'},
            returns: { arg: 'data',type: 'object'}
      }
    )
}
