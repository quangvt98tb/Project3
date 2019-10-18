// let to = require('await-to-js').to;
// app = require('../../server/server')
// 'use_strict';

// module.exports = function(Cart) {
//     const Promise = require('bluebird')

//     Cart.checkOut = async function(id, paymentMethod, addressShip, status) {
//         try {
//             let data = await Cart.findById(id)
//             try {
//                 let ExportOrder = app.models.ExportOrder
//                 let orderData = {
//                     userId: data.userId,
//                     bookList: data.bookList,
//                     subtotal: subtotal,
//                     paymentMethod: paymentMethod,
//                     addressShip: addressShip,
//                     status: status,
//                     createdAt: Date()
//                 }
//                 let data2 = await ExportOrder.create(orderData)
//                 while (cart.bookList.length != 0){
//                     cart.bookList.unset(cart.bookList[0].id)
//                 }
//                 return data2
//             } catch (err){
//                 console.log('Cart to Order', err)
//                 throw err
//             }
//         } catch (err) {
//             console.log('checkout Cart', err)
//             throw err
//         }
//     }

//     Cart.addToCart = async function(id, bookId){
//             const Book = app.models.Book
//             const OrderDetail = app.models.OrderDetail
//             let book = await Book.findById(bookId)
//             if (book.enable != 1){
//                 return('Ngung Kinh Doanh')
//             }
//             let cart = await Cart.findById(id)
//             let  i = 0
//             for (i=0; i< cart.bookList.length; i++){
//                 if (bookId == cart.bookList[i].bookId){
//                     let data = await OrderDetail.upsertWithWhere()
//                 }
//                 break
//             }

//             let bookData = {
//                 bookId: bookId,
//                 quantity: 1,
//                 price: book.sellPrice
//             }
//             try {
//                 let data1 = await OrderDetail.create(bookData)
//                 console.log(data1.id)
//                 let data = await cart.bookList.create(data1)
//                 // let data2 = await cart.bookList.add(data1.id)
//                 return data
//             } catch (err){
//                 console.log('add To Cart', err)
//                 throw err
//             }
//     }

//     Cart.deleteItem = async function(id, orderDetailId){
//         let OrderDetail = app.models.OrderDetail
//         try{
//             let cart = await Cart.findById(id)
//             let orderDetail = await cart.bookList.remove(orderDetailId)
//             let orderDetailDelete = await OrderDetail.destroyById(orderDetailId)
//         } catch (err){
//             console.log('add To Cart', err)
//             throw err
//         }
        
//     }

//     Cart.remoteMethod('checkOut', 
//     {
//         http: {verb: 'post', path: '/checkOut' },
//         accepts: [
//           { arg: 'id', type: 'string', require: true},
//           { arg: 'paymentMethod', type: 'string', require: true},
//           { arg: 'addressShip', type: 'string', require: true},
//           { arg: 'status', type: 'string', default: "cho User xac nhan"}],
//         returns: { arg: 'data', root: true },
//     })

//     Cart.afterRemote('checkOut', function(context, Cart, next) {
//         context.res.render('response', {
//           title: 'Check Out',
//           content: 'Check Out Your Order',
//           redirectUrl: '/ExportOrders/' +  data2.id + '/updateStatus'
//         })
//       })

//     Cart.remoteMethod('addToCart', 
//     {
//         http: {verb: 'post', path: '/addToCart' },
//         accepts: [
//           { arg: 'id', type: 'string', require: true},
//           { arg: 'bookId', type: 'string', require: true}],
//         returns: { arg: 'data', root: true },
//     })

//     Cart.remoteMethod('deleteItem', 
//     {
//         http: {verb: 'post', path: '/deleteItem' },
//         accepts: [
//           { arg: 'id', type: 'string', require: true},
//           { arg: 'orderDetailId', type: 'string', require: true}],
//         returns: { arg: 'data', root: true },
//     })
// }