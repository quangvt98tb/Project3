let to = require('await-to-js').to
let FD = require('../formatDate')

module.exports = function(Comment) {
  const Promise = require('bluebird')

  // list comment theo book 
  Comment.listComment = async function(bookId) {
    let Customer = app.models.Customer
      try {
          const [data, total] = await Promise.all([
            Comment.find({where: { bookId: bookId, display: true}}),
            Comment.count({ bookId: bookId, display: true})
          ])

          for (var i = data.length - 1; i >= 0; i--) {
        		let customer = await Customer.findById(data[i].userId);
        		data[i].userName = customer.fullName;
        		data[i].time = FD.formartTime(data[i].createdAt);
          }

          return {
              rows: data,
              total: total
          }
      } catch (err) {
          console.log('list Comment', err)
          throw err
      }
    }

    //tao 1 comment
    Comment.createComment = async function(bookId, userId, content) {
    	const dataComment = {
    		bookId: bookId,
    		userId: userId,
            content: content,
            enable: false,
            display: true,
    		createdAt: Date()
    	} 
    	try {
    		let commentCreate = await Comment.create(dataComment)
    		return commentCreate
    	} catch (err) {
    		console.log('createComment', err)
    		throw err
    	}
    }

    Comment.remoteMethod(
    	'createComment', 
    {
        http: {path: '/create', verb: 'post'},
        accepts: [ 
        	{arg: 'bookId', type: 'string', required: true},
        	{arg: 'userId', type: 'string', required: true},
        	{arg: 'content', type: 'string', required: true},
        ],

        returns: { arg: 'data',type: 'object', root: true}
    })

    Comment.remoteMethod(
        'listComment', {
            http: {path: '/list', verb: 'post'},
            accepts: {arg: 'bookId', type: 'string'},
            returns: { arg: 'data',type: 'object', root: true}
        }
    )

}