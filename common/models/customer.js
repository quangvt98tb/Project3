let to = require('await-to-js').to;
'use_strict';

module.exports = function(Customer) {
  const Promise = require('bluebird')
	  //create Customer
	  Customer.createCustomer = async function(
        fullName,    
        password, 
        email,
        address,
        phone,
        dateOfBirth,
        gender,
        receiveDistrict,
        role) {
        
        let [err, user] = await to(Customer.findOne({where: {email: email}}))
        if (user != null) {
            return [200, 'Email exsited']
        }

        const CustomerData = {
            fullName: fullName,
            password: password,
            email: email,
            address: address,
            phone: phone,
            dateOfBirth: dateOfBirth,
            gender: gender,
            receiveDistrict: receiveDistrict,
            role: role,
            createdAt: new Date(),
            enable: 1
        }
        try {
            const data = await Customer.create(CustomerData)
            return data
          } catch (err) {
            console.log('create Customer', err)
            throw err
          }
        }
    
    //read Customer
    Customer.readCustomer = async function(id) {
        try {
            const data = await Customer.findById(id, {
                where: {
                enable: 1
                }
            });
            return data;
        } catch (err) {
            console.log('read Customer', err)
            throw err
        }
    }

    //update Customer
    Customer.updateCustomer = async function(
        id, 
        email,
        fullName,  
        address,
        phone,
        birthday,
        gender,
        receiveDistrict) {
    	
        const CustomerData = {
            email: email,
            fullName: fullName,
            address: address,
            phone: phone,
            birthday: birthday,
            gender: gender,
            receiveDistrict: receiveDistrict
        }

        try {
            const data = await Customer.upsertWithWhere(
              {
                id: Customer.id
              },
              CustomerData
            )
            return data
          } catch (err) {
            console.log('update Customer', err)
            throw err
          }
    }

    //delete Customer 
    Customer.deleteCustomer = async function(id) {
        let [err, user] = await to(Customer.findOne({where: {id: id}}))
        if (user == null) {
            return [200, 'can not find Customer']
        }
        Customer.destroyById(user.id)
        return [200, 'delete Customer sucess']
    }

    // list Customers paganation
    Customer.listCustomer = async function(page, pageSize) {
        try {
          const [data, total] = await Promise.all([
            Customer.find({
              where: {
                enable: 1,
                role: false
              },
              fields: { 
                fullName: true, 
                email: true,
                password:true,
                address: true, 
                phone: true,
                dateOfBirth: true, 
                gender: true, 
                receiveDistrict: true,
              }
            }),
            Customer.count({
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
          console.log('list Customer', err)
          throw err
        }
    }
    
    // Login function
    Customer.loginCustomer = async function(email, password){
      //console.log("hi1");
      let [err,user] = await to(Customer.findOne({where: {email: email}}))
      if (user == null) {
        return [200,"Account have not register!"]} 
      else {
        if (match)
               {return [200, "Login sucess!"] }
        else 
               {return [200,"Password error"] }
    }}

    Customer.remoteMethod('createCustomer', 
      {
        http: {path: '/createCustomer', verb: 'post'},
        accepts: [
          {arg: 'fullName', type: 'string', required: false},
          {arg: 'password', type: 'string', required: true},
          {arg: 'email', type: 'string', required: true}, 
          {arg: 'address', type: 'object', required: false},
          {arg: 'phone', type: 'string', required: false},
          {arg: 'birthday', type: 'date', required: false},
          {arg: 'gender', type: 'string', required: false},
          {arg: 'receiveDistrict', type: 'array', required: false},
          {arg: 'role', type: 'boolean'}
        ],
        returns: { arg: 'data' },
      }
    )

    Customer.remoteMethod('readCustomer', 
      {
        http: {path: '/readCustomer', verb: 'post'},
        accepts: [
            {arg: 'id', type: 'string', required: true}],
        returns: { arg: 'data' }
      },
    )

    Customer.remoteMethod('updateCustomer', 
      {
        http: {path: '/updateCustomer', verb: 'post'},
        accepts: [
          {arg: 'id', type: 'string', required: true},
          {arg: 'password', type: 'string', required: false},
          {arg: 'email', type: 'string', required: false},
          {arg: 'fullName', type: 'string', required: false},
          {arg: 'address', type: 'object', required: false},
          {arg: 'phone', type: 'string', required: false},
          {arg: 'birthday', type: 'date', required: false},
          {arg: 'gender', type: 'string', required: false}
        ],
        returns: { arg: 'data' }
      },
    )

    Customer.remoteMethod('deleteCustomer', 
      {
        http: {path: '/deleteCustomer', verb: 'delete'},
        accepts: [
            {arg: 'id', type: 'string', required: true}
        ],
        returns: [
            {arg: 'status', type: 'number'},
            {arg: 'message', type: 'string'}]
      }
    )

    Customer.remoteMethod('listCustomer', 
      {
        http: {verb: 'get', path: '/listCustomers' },
        accepts: [
          { arg: 'page', type: 'number', default: '0'},
          { arg: 'pageSize', type: 'number', default: '10'}],
        returns: { arg: 'data' },
      }
    )

    Customer.remoteMethod('loginCustomer',
    {
      http: {verb: 'post', path: '/loginCustomer' },
      accepts: [
        { arg: 'email', type: 'string', required: true,},
        { arg: 'password', type: 'string', required: true }],
      returns: [
        {arg: 'status', type: 'number'},
        {arg: 'message', type: 'string'}]
    }
  )
};