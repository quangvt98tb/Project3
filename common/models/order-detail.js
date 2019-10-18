let to = require('await-to-js').to
var config = require('../../server/config.json')
'use_strict';

module.exports = function(OrderDetail) {
    const Promise = require('bluebird')

    //update Customer
    OrderDetail.updateOrderDetail = async function(id, quantity) {
        try {
            let od = await OrderDetail.findByID(id)
            let bk = await app.models.Book.findByID(or.bookId)
            if (bk.quantity < quantity){
                return("Khong du so luong sach trong kho")
            }
            const data = await OrderDetail.upsertWithWhere({id: id}, {quantity: quantity})
            return data
        } catch (err) {
            console.log('update OrderDetail', err)
            throw err
        }
    }

    OrderDetail.remoteMethod('updateOrderDetail', 
    {
        http: {path: '/updateOrderDetail', verb: 'post'},
        accepts: [
          {arg: 'id', type: 'string', required: true},
          {arg: 'quantity', type: 'number', required: true}
        ],
        returns: { arg: 'data', root: true}
    })
}
