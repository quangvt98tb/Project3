let to = require('await-to-js').to;
app = require('../../server/server')
'use_strict';

module.exports = function(ExportOrder) {
    const Promise = require('bluebird')
    ExportOrder.validatesInclusionOf('statua', {in: ["Doi Xac Nhan", "Doi Giao Hang", "Da Huy", "Bi Huy", "Da Hoan Thanh"]})

    ExportOrder.createOrder = async function(reqData){
        let OrderDetail = app.models.OrderDetail
        let Book = app.models.Book
        let i
        let orderDetailList = {}
        for (i = 0; i < reqData.bookList.length(); i++){
            let bookData = {
                bookId: reqData.bookList[i].bookId,
                quantity: reqData.bookList[i].quantity,
                price: reqData.bookList[i].price
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
            userId: reqData.userId,
            status: reqData.status,
            paymentMethod: reqData.paymentMethod,
            addressShip: reqData.addressShip,
            subtotal: reqData.subtotal,
            createdAt: Date()
        }
        try{
            let exportOrder = await ExportOrder.create(data)
            exportOrder.bookList.set(orderDetailList)
            for (i = 0; i < orderDetailList.length; i++){
                try{
                    let book = await Book.findById(reqData.bookList[i].bookId)
                    let newQuantity = book.quantity - reqData.bookList[i].quantity
                    let bookUpdate = await Book.upsertWithWhere(book.id, {quantity: newQuantity})
                } catch (error) {
                    console.log('update Book quantity', error)
                    return [400, error]
                }
            }
            return exportOrder
        } catch (err){
            console.log('create ExportOrder', err)
            return [400, err]
        }
    }

    ExportOrder.UserRead = async function(reqData) {
        try {
            const data = await ExportOrder.findById(reqData.id, 
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

    ExportOrder.UserList = async function(reqData) {
        try {
            const [data, total] = await Promise.all([
                ExportOrder.find({
                    where: {userId : reqData.userId}, 
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
            return [400, err]
        }
    }

    ExportOrder.UserCancelOrder = async function(reqData) {
        try {
            const order = await ExportOrder.findById(reqData.id)
            if (order.status == 'Doi Xac Nhan'){
                try{
                    const data = await ExportOrder.upsertWithWhere({id: reqData.id}, {status: 'Bi Huy'})
                    return data
                } catch (err) {
                    console.log('update ExportOrderStatus By User', err)
                    return [400, err]
                }
            }
            else {
                return [400, "Don Hang Da Duoc Tiep Nhan. Khong The Huy Don Hang!"]
            }
        } catch (err) {
            console.log('find ExportOrderStatus', err)
            return [400, err]
        }
    }

    ExportOrder.AdminListByUser = async function(reqData) {
        try {
            const [data, total] = await Promise.all([
                ExportOrder.find({
                    where: {userId : reqData.userId}, 
                    fields: {
                        userId: true,
                        subtotal: true,
                        createdAt: true,
                        updatedAt: true, 
                        status: true
                    }}),
                ExportOrder.count({userId : reqData.userId})
            ])
            return {
                rows: data,
                page: page,
                pageSize: pageSize,
                total: total
            }
        } catch (err) {
            console.log('list ExportOrder of User', err)
            return [400, err]
        }
    }

    ExportOrder.AdminListByStatus = async function(reqData) {
        try {
            const [data, total] = await Promise.all([
                ExportOrder.find({
                    where: {status : reqData.status}, 
                    fields: {
                        userId: true,
                        subtotal: true, 
                        createdAt: true, 
                        updatedAt: true,
                        status: true
                    }}),
                ExportOrder.count({status : reqData.status})
            ])
            return {
                rows: data,
                page: page,
                pageSize: pageSize,
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
            for (i = 0; i < order.bookList.length; i++){
                let bookId =  order.bookList[i].bookId
                let quantity = order.bookList[i].quantity
                let book = await Book.findById(bookId)
                if (book.quantity < quantity){
                    ExportOrder.upsertWithWhere(req.params.id, {status: "Da Huy"})
                    return [400, 'Khong Du So Luong Sach Trong Kho']
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
            accepts: {arg: 'reqData', type: 'Object', http: {source: 'body'}},
            returns: { arg: 'data',type: 'object'}
        }
    )

    ExportOrder.remoteMethod(
        'UserList', {
            http: {path: '/listOrdersForUser', verb: 'post' },
            accepts: {arg: 'reqData', type: 'Object', http: {source: 'body'}},
            returns: { arg: 'data',type: 'object'}
      }
    )

    ExportOrder.remoteMethod(
        'UserCancelOrder', {
            http: {path: '/cancelOrder', verb: 'post' },
            accepts: {arg: 'reqData', type: 'Object', http: {source: 'body'}},
            returns: { arg: 'data',type: 'object'}
      }
    )

    ExportOrder.remoteMethod(
        'AdminListByUser', {
            http: {path: '/listOrdersOfUser', verb: 'post' },
            accepts: {arg: 'reqData', type: 'Object', http: {source: 'body'}},
            returns: { arg: 'data',type: 'object'}
      }
    )

    ExportOrder.remoteMethod(
        'AdminListByStatus', {
            http: {path: '/listOrderByStatus', verb: 'post' },
            accepts: {arg: 'reqData', type: 'Object', http: {source: 'body'}},
            returns: { arg: 'data',type: 'object'}
      }
    )
}
