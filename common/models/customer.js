let to = require('await-to-js').to
var config = require('../../server/config.json')
var path = require('path')
var senderAddress = 'ngocanh2162@gmail.com'
const validateRegisterInput = require('../validation/register');
const validateLoginInput = require('../validation/login');
'use_strict';

module.exports = function(Customer) {
    const Promise = require('bluebird')
    //Customer read Profile
    Customer.readProfile = async function(id) {
        try {
            const data = await Customer.findById(id, {
                fields: { 
                  fullName: true, 
                  email: true,
                  address: true, 
                  phone: true,
                  dateOfBirth: true, 
                  gender: true, 
                  createdAt: true
                }
            });
            return data;
        } catch (err) {
            console.log('read Customer', err)
            throw err
        }
    }

    // Customer update Profile
    Customer.updateProfile = async function(reqData){
        const customerData = {
            fullName: reqData.fullName,
            email: reqData.email,
            address: {
                province: reqData.province,
                district: reqData.district
            },
            phone: reqData.phone,
            dateOfBirth: reqData.dateOfBirth,
            gender: reqData.gender,
            receiveDistrict: reqData.receiveDistrict,
        }
        try {
            customer = await Customer.findByIdAndUpdate({id: reqData.id}, customerData)
            return customer
        } catch (err) {
            console.log('update Customer', err)
            throw err
        }
    }

    // Admin list Customers 
    Customer.listCustomer = async function(queryData, page, pageSize) {
        try {
          const [data, total] = await Promise.all([
            Customer.find({
              fields: { 
                id: true,
                fullName: true, 
                email: true,
                address: true, 
                phone: true,
                dateOfBirth: true, 
                gender: true, 
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

    // Admin block User
    Customer.blockCustomer = async function(reqData){
        try {
            customer = await Customer.findByIdAndUpdate({id: reqData.id}, reqData.enable)
            return customer
        } catch (err) {
            console.log('block Customer', err)
            throw err
        }
    }

    // Amdin create Admin
    Customer.createAdmin = async function(reqData){
        const { errors, isValid } = validateRegisterInput(reqData);
        if (!isValid) {
            errors.status = 400
            return [400, errors]
        }
        let RoleMapping = app.models.RoleMapping
        let Role = app.models.Role
        let User = app.models.User
        let adminData = {
            email: reqData.email,
            password: reqData.password
        }
        try {
            let [err, roleAdmin] = await to(Role.findOne({where: {name: "admin"}}))
            admin = await User.create(adminData)
            const roleData = {
                principalType: RoleMapping.USER,
                principalId: admin.id,
                roleId: roleAdmin.id
            }
            try{
                roleMapping = await to(RoleMapping.create(roleData))
                return roleData
            } catch(err){
                console.log('create Admin roleMapping', err)
                throw err
            }
        } catch (error) {
            console.log('create Admin', error)
            throw error
        }
    }

    // Guest create Customer
    Customer.createCustomer = async function(reqData){
        const { errors, isValid } = validateRegisterInput(reqData);
        if (!isValid) {
            errors.status = 400
            return [400, errors]
        }
        let customerData = {
            fullName: reqData.fullname,
            email: reqData.email,
            password: reqData.password,
            address: {
                province: reqData.province,
                district: reqData.district
            },
            createdAt: new Date(),
            enable: 1
        }
        try {
            let [err, customer] = await to(Customer.findOne({where: {email: reqData.email}}))
            if (customer != null) {
                errors.status = 400
                errors.email = "Email này đã đăng ký là thành viên"
                return [400, errors]
            }
            customerData = await Customer.create(customerData)
            let Cart = app.models.Cart
            var CartData = {}
            CartData.userId = customerData.id
            cart = Cart.create(CartData)
            return [200, 'Thanh Cong']
        } catch (error) {
            console.log('create Customer', error)
            throw error
        }
    }
    
    //
    Customer.remoteMethod('readProfile', 
    {
        http: {path: '/readProfile', verb: 'get'},
        accepts: [
            {arg: 'id', type: 'string', required: true}],
        returns: { arg: 'data', root: true }
    })
    
    Customer.remoteMethod('updateProfile', 
    {
        http: {path: '/updateProfile', verb: 'post'},
        accepts: {arg: 'reqData', type: 'Object', http: { source: 'body' }},
        returns: { arg: 'data', root: true }
    })

    Customer.remoteMethod('listCustomer', 
    {
        http: {verb: 'get', path: '/listCustomers' },
        accepts: [
          { arg: 'queryData', type: 'string'},
          { arg: 'page', type: 'number', default: '0'},
          { arg: 'pageSize', type: 'number', default: '10'}],
        returns: { arg: 'data', root: true },
    })

    Customer.remoteMethod('blockCustomer', 
    {
        http: {path: '/blockCustomer', verb: 'post'},
        accepts: {arg: 'reqData', type: 'Object', http: {source: 'body'}},
        returns: { arg: 'data', root: true }
    })

    Customer.remoteMethod('createAdmin', 
    {
        http: {path: '/createAdmin', verb: 'post'},
        accepts: {arg: 'reqData', type: 'Object', http: {source: 'body'}},
        returns: { arg: 'data', root: true }
    })

    Customer.remoteMethod('createCustomer', 
    {
        http: {path: '/createCustomer', verb: 'post'},
        accepts: {arg: 'reqData', type: 'Object', http: {source: 'body'}},
        returns: [
            { arg: 'status', root: true },
            { arg: 'data', root: true }
        ]   
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

    Customer.beforeRemote('login', function(context, Customer, next){
        const { errors, isValid } = validateRegisterInput(context);
        if (!isValid) {
            errors.status = 400
            return [400, errors]
        }
    })
}