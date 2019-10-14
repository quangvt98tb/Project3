let to = require('await-to-js').to;
app = require('../../server/server')
'use_strict';

module.exports = function(Cart) {
    const Promise = require('bluebird')

    Cart.checkOut = async function(id, paymentMethod, addressShip, status) {
        try {
            const data = await Cart.findById(id)
            try {
                const ExportOrder = app.models.ExportOrder
                const orderData = {
                    userId: data.userId,
                    bookList: data.bookList,
                    subtotal: subtotal,
                    paymentMethod: paymentMethod,
                    addressShip: addressShip,
                    status: status,
                    createdAt: Date()
                }
                const data2 = await ExportOrder.create(orderData)
                const data3 = await Cart.upsertWithWhere({id: id}, {bookList: []})
                return data2
            } catch (err){
                console.log('Cart to Order', err)
                throw err
            }
        } catch (err) {
            console.log('checkout Cart', err)
            throw err
        }
    }
}