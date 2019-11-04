let to = require('await-to-js').to;
app = require('../../server/server')
'use_strict';

module.exports = function(Cart) {
    const Promise = require('bluebird')

    Cart.updateCart = async function(reqData) {
        const Book = app.models.Book
        let book = await Book.findById(bookId)
        if (book.enable != 1 || book.quantity < reqData.quantity){
            return [400, []]
        }
        else return 200

    }

    Cart.remoteMethod('updateCart', 
    {
        http: {verb: 'post', path: '/updateCart' },
        accepts: {arg: 'reqData', type: 'Object', http: {source: 'body'}},
        returns: { arg: 'data',type: 'object'}
    })
}