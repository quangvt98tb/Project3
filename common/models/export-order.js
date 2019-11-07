let to = require('await-to-js').to;
app = require('../../server/server')
const validateCheckOut = require('../validation/checkOut');
'use_strict'; 

module.exports = function(ExportOrder) {
    const Promise = require('bluebird')
    // ExportOrder.validatesInclusionOf('status', {in: ["Confirmed", "Canceled", "Shipping", "Delivered"]})
    // ExportOrder.validatesInclusionOf('paymentMethod', {in: ["Direct Bank Transfer", "Cheque Payment", "Cash on Delivery"]})
    
    ExportOrder.createOrder = async function(checkOutData, userId){
        const { errors, isValid } = validateCheckOut(checkOutData)
        if (!isValid) {
            return errors
        }
        let i
        let orderDetailList = []
        for (i = 0; i < checkOutData.cart.addedItems.length ; i++){
            let bookData = {
                bookId: checkOutData.cart.addedItems[i].id,
                title: checkOutData.cart.addedItems[i].title,
                quantity: checkOutData.cart.addedItems[i].quantity,
                price: checkOutData.cart.addedItems[i].price
            }
            orderDetailList.push(bookData)
        }
        let data = {
            userId: userId,
            fullName: checkOutData.profileData.fullName,
            phone: checkOutData.profileData.phone,
            status: "Confirmed",
            paymentMethod: checkOutData.checkOutType,
            addressShip: {
                province: checkOutData.profileData.province,
                district: checkOutData.profileData.district,
                ward: checkOutData.profileData.ward,
                details: checkOutData.profileData.details
            },
            subtotal: {
                total: checkOutData.cart.total,
                shipping: checkOutData.cart.shipping,
                grandTotal: checkOutData.cart.grandTotal
            },
            bookList: orderDetailList,
            createdAt: Date(),
            updatedAt: Date()
        }
        try{
            let exportOrder = await ExportOrder.create(data)
            return "success"
        } catch (err){
            console.log('create ExportOrder', err)
            return []
        }
    }

    ExportOrder.UserRead = async function(orderId) {
        let Book = app.models.Book
        let Customer = app.models.Customer
        try {
            const data1 = await ExportOrder.findById(orderId);
            let customer = await Customer.findById(data1.userId)
            let items = []
            let i
            for (i = 0; i < data1.bookList.length; i++){
                let book = await Book.findById(data1.bookList[i].bookId)
                let temp = {
                    id: book.id,
                    author: book.author,
                    title: book.name,
                    imgUrl: book.imgURL,
                    price: book.sellPrice,
                    quantity: data1.bookList[i].quantity
                }
                items.push(temp)
            }
            let data = {
                profileData: {
                    email: customer.email,
                    fullName: data1.fullName,
                    phone: data1.phone,
                    province: data1.addressShip.province,
                    district: data1.addressShip.district,
                    ward: data1.addressShip.ward,
                    details: data1.addressShip.details
                },
                cart: {
                    addedItems: items,
                    total: data1.subtotal.total,
                    shipping: data1.subtotal.shipping,
                    grandTotal: data1.subtotal.grandTotal,
                },
                checkOutType: data1.paymentMethod,
                orderDate: data1.createdAt,
                shipDate: data1.updatedAt,
                status: data1.status
            }
            return data
        } catch (err) {
            console.log('show ExportOrder for User', err)
            return [400, err]
        }
    }

    ExportOrder.UserList = async function(userId) {
        try {
            const data1 = await Promise.all([
                ExportOrder.find({ where: {userId : userId}})
            ])
            let Customer = app.models.Customer
            customer = await Customer.findById(userId)
            let orderList = []
            let i
            let data2 = data1[0]
            for (i=0; i< data2.length; i++){
                let data = {
                    shipDate: data2[i].updatedAt,
                    orderCode: data2[i].id,
                    orderDate: data2[i].createdAt,
                    status: data2[i].status,
                    books: data2[i].bookList,
                    fullName: customer.fullName
                }
                orderList.push(data)
            }
            return orderList
        } catch (err) {
            console.log('list ExportOrder For User', err)
            return []
        }
    }

    ExportOrder.UserCancelOrder = async function(orderId) {
        const order = await ExportOrder.findById(orderId)
        if (order.status == 'Confirmed'){
            try{
                const data = await ExportOrder.upsertWithWhere({id: orderId}, {status: 'Canceled', updatedAt: Date()})
                return "success"
            } catch (err) {
                console.log('update ExportOrderStatus By User', err)
                return []
            }
        }
        else {
            return []
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
        if (reqData.status == "Confirmed"){
            let order = await ExportOrder.findById(req.params.id)
            let i
            for (i = 0; i < order.bookList.length; i++){s
                let book = await Book.findById(order.bookList[i].bookId)
                if (book.quantity < order.bookList[i].quantity){
                    ExportOrder.upsertWithWhere(req.params.id, {status: "Canceled"})
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
            accepts: [
                {arg: 'checkOutData', type: 'Object'},
                {arg: 'userId', type: 'string'}],
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
            returns: { arg: 'data',type: 'array'}
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
