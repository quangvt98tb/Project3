let to = require('await-to-js').to
var config = require('../../server/config.json')
var path = require('path')
var senderAddress = 'ngocanh2162@gmail.com'
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
        receiveDistrict) {
        
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
            createdAt: new Date(),
            enable: 1
        }
        try {
            const data = await Customer.create(CustomerData)
            let Cart = app.models.Cart
            var CartData = {}
            CartData.userId = data.id
            data2 = Cart.create(CartData)
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
                where: {enable: 1},
                fields: { 
                  fullName: true, 
                  email: true,
                  address: true, 
                  phone: true,
                  dateOfBirth: true, 
                  gender: true, 
                  receiveDistrict: true,
                  createdAt: true
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
        dateOfBirth,
        gender,
        receiveDistrict) {
    	
        const CustomerData = {
            email: email,
            fullName: fullName,
            address: address,
            phone: phone,
            dateOfBirth: dateOfBirth,
            gender: gender,
            receiveDistrict: receiveDistrict
        }

        try {
            const data = await Customer.upsertWithWhere(
              {
                id: id
              },
              CustomerData
            )
            return data
          } catch (err) {
            console.log('update Customer', err)
            throw err
          }
    }

    // list Customers paganation
    Customer.listCustomer = async function(page, pageSize) {
        try {
          const [data, total] = await Promise.all([
            Customer.find({
              fields: { 
                fullName: true, 
                email: true,
                address: true, 
                phone: true,
                dateOfBirth: true, 
                gender: true, 
                receiveDistrict: true,
                createdAt: true,
                enable: true
              }
            }),
            Customer.count()
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
  

    Customer.remoteMethod('createCustomer', 
    {
        http: {path: '/createCustomer', verb: 'post'},
        accepts: [
          {arg: 'fullName', type: 'string', required: false},
          {arg: 'password', type: 'string', required: true},
          {arg: 'email', type: 'string', required: true}, 
          {arg: 'address', type: 'object', required: false},
          {arg: 'phone', type: 'string', required: false},
          {arg: 'dateOfBirth', type: 'date', required: false},
          {arg: 'gender', type: 'string', required: false},
          {arg: 'receiveDistrict', type: 'array', required: false}
        ],
        returns: { arg: 'data' },
    })

    Customer.remoteMethod('readCustomer', 
    {
        http: {path: '/readCustomer', verb: 'get'},
        accepts: [
            {arg: 'id', type: 'string', required: true}],
        returns: { arg: 'data' }
    })

    Customer.remoteMethod('updateCustomer', 
    {
        http: {path: '/updateCustomer', verb: 'post'},
        accepts: [
          {arg: 'id', type: 'string', required: true},
          {arg: 'email', type: 'string', required: false},
          {arg: 'fullName', type: 'string', required: false},
          {arg: 'address', type: 'object', required: false},
          {arg: 'phone', type: 'string', required: false},
          {arg: 'dateOfBirth', type: 'date', required: false},
          {arg: 'gender', type: 'string', required: false},
          {arg: 'receiveDistrict', type: 'string', required: false}
        ],
        returns: { arg: 'data' }
    })
    
    Customer.remoteMethod('listCustomer', 
    {
        http: {verb: 'get', path: '/listCustomers' },
        accepts: [
          { arg: 'page', type: 'number', default: '0'},
          { arg: 'pageSize', type: 'number', default: '10'}],
        returns: { arg: 'data' },
    })

    //send password reset link when requested
    Customer.on('resetPasswordRequest', function(info) {
      var url = 'http://' + config.host + ':' + config.port + '/reset-password';
      var html = 'Click <a href="' + url + '?access_token=' +
          info.accessToken.id + '">here</a> to reset your password';

      Customer.app.models.Email.send({
        to: info.email,
        from: senderAddress,
        subject: 'Password reset',
        html: html
      }, function(err) {
        if (err) return console.log('> error sending password reset email');
        console.log('> sending password reset email to:', info.email);
      });
    });

    //render UI page after password change
    Customer.afterRemote('changePassword', function(context, Customer, next) {
      context.res.render('response', {
        title: 'Password changed successfully',
        content: 'Please login again with new password',
        redirectTo: '/',
        redirectToLinkText: 'Log in'
      })
    })
    
    //render UI page after password reset
    Customer.afterRemote('setPassword', function(context, Customer, next) {
      context.res.render('response', {
        title: 'Password reset success',
        content: 'Your password has been reset successfully',
        redirectTo: '/',
        redirectToLinkText: 'Log in'
      })
    })
};