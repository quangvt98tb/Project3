let to = require('await-to-js').to
var config = require('../../server/config.json');
var path = require('path');
var senderAddress = 'ngocanh2162@gmail.com'; 
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
    })

    Customer.remoteMethod('readCustomer', 
    {
        http: {path: '/readCustomer', verb: 'post'},
        accepts: [
            {arg: 'id', type: 'string', required: true}],
        returns: { arg: 'data' }
    })

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
    })

    Customer.remoteMethod('deleteCustomer', 
    {
        http: {path: '/deleteCustomer', verb: 'delete'},
        accepts: [
            {arg: 'id', type: 'string', required: true}
        ],
        returns: [
            {arg: 'status', type: 'number'},
            {arg: 'message', type: 'string'}]
    })

    Customer.remoteMethod('listCustomer', 
    {
        http: {verb: 'get', path: '/listCustomers' },
        accepts: [
          { arg: 'page', type: 'number', default: '0'},
          { arg: 'pageSize', type: 'number', default: '10'}],
        returns: { arg: 'data' },
    })

    Customer.remoteMethod('loginCustomer',
    {
      http: {verb: 'post', path: '/loginCustomer' },
      accepts: [
        { arg: 'email', type: 'string', required: true,},
        { arg: 'password', type: 'string', required: true }],
      returns: [
        {arg: 'status', type: 'number'},
        {arg: 'message', type: 'string'}]
    })

    //send verification email after registration    
    Customer.afterRemote('createCustomer', function(context, user, next) {
      var options = {
        type: 'email',
        to: user.email,
        from: senderAddress,
        subject: 'Thanks for registering.',
        template: path.resolve(__dirname, '../../server/views/verify.ejs'), //check lai
        redirect: '/verified',
        user: user
      };

      user.verify(options, function(err, response) {
        if (err) {
          Customer.deleteById(user.id);
          return next(err);
        }
        context.res.render('response', {
          title: 'Signed up successfully',
          content: 'Please check your email and click on the verification link ' +
              'before logging in.',
          redirectTo: '/',
          redirectToLinkText: 'Log in'
        });
      });
    }); 

    // Method to render
    Customer.afterRemote('prototype.verify', function(context, user, next) {
      context.res.render('response', {
        title: 'A Link to reverify your identity has been sent '+
          'to your email successfully',
        content: 'Please check your email and click on the verification link '+
          'before logging in',
        redirectTo: '/',
        redirectToLinkText: 'Log in'
      });
    });

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
    Customer.afterRemote('changePassword', function(context, user, next) {
      context.res.render('response', {
        title: 'Password changed successfully',
        content: 'Please login again with new password',
        redirectTo: '/',
        redirectToLinkText: 'Log in'
      })
    })
    
    //render UI page after password reset
    Customer.afterRemote('setPassword', function(context, user, next) {
      context.res.render('response', {
        title: 'Password reset success',
        content: 'Your password has been reset successfully',
        redirectTo: '/',
        redirectToLinkText: 'Log in'
      })
    })
};