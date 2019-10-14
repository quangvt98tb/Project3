let to = require('await-to-js').to;
'use_strict';
module.exports = function(Supplier) {
  const Promise = require('bluebird')
	  //create Supplier
	  Supplier.createSupplier = async function(
        uid, 
        name, 
        email, 
        address,
        phone) {

        const SupplierData = {
            uid: uid,
            name: name,
            email: email,
            address: address,
            phone: phone,
            createdAt: new Date(),
            enable: 1
        }
        try {
            const data = await Supplier.create(SupplierData)
            return data
          } catch (err) {
            console.log('create Supplier', err)
            throw err
          }
        }
    
    //read Supplier
    Supplier.readSupplier = async function(id) {
        try {
            const data = await Supplier.findById(id, {
              fields: {
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

    //update Supplier
    Supplier.updateSupplier = async function(
        id, 
        name, 
        email, 
        address,
        phone) {
    	
        const SupplierData = {
            name: name,
            email: email,
            address: address,
            phone: phone,
            updatedAt: new Date(),
        }

        try {
            const data = await Supplier.upsertWithWhere(
              {
                id: Supplier.id
              },
              SupplierData
            )
            return data
          } catch (err) {
            console.log('update Supplier', err)
            throw err
          }
    }

    //delete Supplier 
    Supplier.deleteSupplier = async function(id) {
        let [err, supplier] = await to(Supplier.findOne({where: {id: id}}))
        if (supplier == null) {
            return [200, 'can not find supplier']
        }
        Supplier.destroyById(supplier.id)
        return [200, 'delete supplier sucess']
    }

    // list Suppliers paganation(4)
    Supplier.listSupplier = async function(page, pageSize) {
        try {
          const [data, total] = await Promise.all([
            Supplier.find({
              fields: {
                name: true,
                email: true,
                address: true,
                phone: true,
                enable: true,
              }
            }),
            Supplier.count({
              enable: 1
            })
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
    
    Supplier.remoteMethod('createSupplier', 
      {
        http: {path: '/create', verb: 'post'},
        accepts: [
          {arg: 'uid', type: 'string', required: true},
          {arg: 'name', type: 'string', required: true},
          {arg: 'email', type: 'string', required: true},
          {arg: 'address', type: 'string', required: false},
          {arg: 'phone', type: 'string', required: false},
        ],
        returns: { arg: 'data' },
      }
    )

    Supplier.remoteMethod('readSupplier', 
      {
        http: {path: '/read', verb: 'post'},
        accepts: [
            {arg: 'id', type: 'string', required: true}],
        returns: { arg: 'data' }
      },
    )

    Supplier.remoteMethod('updateSupplier', 
      {
        http: {path: '/update', verb: 'post'},
        accepts: [
          {arg: 'id', type: 'string', required: true},
          {arg: 'name', type: 'string', required: false},
          {arg: 'email', type: 'string', required: false},
          {arg: 'address', type: 'string', required: false},
          {arg: 'phone', type: 'string', required: false},
        ],
        returns: { arg: 'data' }
      },
    )

    Supplier.remoteMethod('deleteSupplier', 
      {
        http: {path: '/delete', verb: 'delete'},
        accepts: [
            {arg: 'id', type: 'string', required: true}
        ],
        returns: [
            {arg: 'status', type: 'number'},
            {arg: 'message', type: 'string'}]
      }
    )

    Supplier.remoteMethod('listSupplier', 
      {
        http: {verb: 'post', path: '/list' },
        accepts: [
          { arg: 'page', type: 'number', default: '0'},
          { arg: 'pageSize', type: 'number', default: '10'}],
        returns: { arg: 'data' },
      }
    )
};