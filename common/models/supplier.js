let to = require('await-to-js').to;
'use_strict';
module.exports = function(Supplier) {
  const Promise = require('bluebird')
	      
    Supplier.readSupplier = async function(id) {
        try {
            const data = await Supplier.findById(id, {
              fields: {
                id: true,
                name: true,
                email: true,
                address: true,
                phone: true,
                enable: true,
              }
            });
            return data;
        } catch (err) {
            console.log('read Supplier', err)
            throw err
        }
    }

    Supplier.listSupplier = async function(page, pageSize) {
        try {
          const [data, total] = await Promise.all([
            Supplier.find({
              fields: {
                id: true,
                uid: true,
                name: true,
                email: true,
                address: true,
                phone: true,
                enable: true,
              }
            }),
            Supplier.count()
          ])

          return {
            rows: data,
            page: page,
            pageSize: pageSize,
            total: total
          }
        } catch (err) {
          console.log('list Supplier', err)
          throw err
        }
    }
  
    Supplier.remoteMethod('readSupplier', 
      {
        http: {path: '/read', verb: 'post'},
        accepts: [
            {arg: 'id', type: 'string', required: true}],
        returns: { arg: 'data', root: true }
      },
    )

    Supplier.remoteMethod('listSupplier', 
      {
        http: {verb: 'post', path: '/list' },
        accepts: [
          { arg: 'page', type: 'number', default: '0'},
          { arg: 'pageSize', type: 'number', default: '10'}],
        returns: { arg: 'data', root: true }
      }
    )
};