let FD = require('../formatDate')
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
                sale: checkOutData.cart.sale,
                saleValue: checkOutData.cart.saleValue,
                grandTotal: checkOutData.cart.grandTotal
            },
            promotionId: checkOutData.promotionId,
            bookList: orderDetailList,
            createdAt: Date(),
            updatedAt: Date()
        }
        try{
            if (data.promotionId){
                let Promotion = app.models.Promotion
                console.log(data.promotionId)
                let promo = await Promotion.findById(data.promotionId)
                if (promo.total >= 0){
                    let newTotal = promo.total - 1 
                    await Promotion.upsertWithWhere({id: data.promotionId}, {total: newTotal})
                    console.log(newTotal)
                }
            }
            await ExportOrder.create(data)
            return "success"
        } catch (err){
            console.log('create ExportOrder', err)
            return []
        }
    }

    ExportOrder.UserRead = async function(orderId) {
        let Book = app.models.Book
        let Customer = app.models.Customer
        let Author = app.models.Author
        let Promotion = app.models.Promotion
        try {
            const data1 = await ExportOrder.findById(orderId)
            let customer = await Customer.findById(data1.userId)
            let items = []
            let i
            for (i = 0; i < data1.bookList.length; i++){
                let book = await Book.findById(data1.bookList[i].bookId)
                let author = await Author.findById(book.authorId)
                let temp = {
                    id: book.id,
                    author: author.name,
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
                    sale: data1.subtotal.sale,
                    saleValue: data1.subtotal.saleValue
                },
                checkOutType: data1.paymentMethod,
                orderDate: FD.formatDate(data1.createdAt),
                shipDate: FD.formatDate(data1.updatedAt),
                status: data1.status
            }
            if (data1.promotionId){
                let promo = await Promotion.findById(data1.promotionId)
                data.promotion = promo.name
            } else {
                data.promotion = ""
            }
            return data 
        } catch (err) {
            console.log('show ExportOrder for User', err)
            return []
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
                    shipDate: FD.formatDate(data2[i].updatedAt),
                    orderCode: data2[i].id,
                    orderDate: FD.formatDate(data2[i].createdAt),
                    status: data2[i].status,
                    books: data2[i].bookList,
                    fullName: data2[i].fullName
                }
                orderList.push(data)
            }
            return orderList
        } catch (err) {
            console.log('list ExportOrder For User', err)
            return []
        }
    }

    ExportOrder.UserEditOrder = async function(reqData, action) {
        const order = await ExportOrder.findById(reqData.orderId)
        if (order.status == 'Confirmed' ){
            try{
                if (action == "cancel"){
                    await ExportOrder.upsertWithWhere({id: reqData.orderId}, {status: 'Canceled', updatedAt: Date()})
                }
                else if (action == "edit"){
                    let data = {}
                    if (reqData.phone){
                        data.phone = reqData.phone
                    }
                    if (reqData.fullName){
                        data.fullName = reqData.fullName
                    }
                    if (reqData.address){
                        let addressShip =  {
                            province: reqData.address.province,
                            district: reqData.address.district,
                            ward: reqData.address.ward,
                            details: reqData.address.details
                        }
                        data.addressShip = addressShip
                    }
                    data.updatedAt = Date()
                    await ExportOrder.upsertWithWhere({id: reqData.orderId}, data)
                }
                return "Confirmed"
            } catch (err) {
                console.log('edit ExportOrder By User', err)
                return []
            }
        }
        else {
            return []
        }
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
        'UserEditOrder', {
            http: {path: '/editOrder', verb: 'post' },
            accepts: [
                {arg: 'reqData', type: 'object'},
                {arg: 'action', type: 'string'},
            ],
            returns: { arg: 'data',type: 'object'}
      }
    )

    ExportOrder.beforeRemote('replaceById', async function(ctx, next){
            let data = ctx.args
            let Book = app.models.Book
            let order = await ExportOrder.findById(data.id) 
            let dataBookList = order.bookList
            let flag = true 
            if (order.status == "Confirmed" & data.data.status == "Shipping" ){
                for (let i = 0; i < dataBookList.length; i++){
                    let book = await Book.findById(dataBookList[i].bookId)
                    if (book.quantity < dataBookList[i].quantity){
                        await ExportOrder.upsert({id: data.id}, {status: "Canceled"})
                        next(new Error('must be logged in to update'))
                    }
                }
                if (flag == true){
                    for (let i = 0; i < dataBookList.length; i++){
                        let book = await Book.findById(dataBookList[i].bookId)
                        let newQuantity = book.quantity - parseInt(dataBookList[i].quantity)
                        await Book.upsertWithWhere({id: book.id}, {quantity: newQuantity})  
                    }
                }
            } else if (order.status == "Shipping" & data.data.status == "Canceled"){
                flag == true
                for (let i = 0; i < dataBookList.length; i++){
                    let book = await Book.findById(dataBookList[i].bookId)
                    let newQuantity = book.quantity + parseInt(dataBookList[i].quantity)
                    await Book.upsertWithWhere({id: book.id}, {quantity: newQuantity})  
                }
            } else if (order.status == "Delivered" || order.status == "Canceled"){
                flag = false
            } else if (order.status == "Confirmed" & data.data.status == "Delivered"){
                flag = false
            } else if (order.status == "Shipping" & data.data.status == "Confirmed"){
                flag = false
            } 
            if (flag == true){
                await ExportOrder.upsertWithWhere({id: data.id}, {status: data.data.status})
                return "success"
            } else{
                next(new Error('must be logged in to update'))
            }
    })

    ExportOrder.afterRemoteError('replaceById', function(ctx, next){
        let data = ctx.error
        console.log(data)
        next()
    })
}
