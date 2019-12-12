let to = require('await-to-js').to
let FD = require('../formatDate')
var config = require('../../server/config.json')
var path = require('path')
var senderAddress = 'project1.20181k61@gmail.com'
const validateRegisterInput = require('../validation/register');
const validateLoginInput = require('../validation/login');
const validateUpdateCustomer = require('../validation/updateCustomer');
const validateResetPass = require('../validation/resetPassword');

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
                  receiveDistrict: true
                }
            });
            if (data.phone == null) {
                data.phone = ""
            }
            if (data.receiveDistrict == null) {
                data.receiveDistrict = []
            }
            if (data.dateOfBirth == null) {
                data.dateOfBirth =""
            }
            if (data.gender == null) {
                data.gender = ""
            }
            return data;
        } catch (err) {
            console.log('read Customer', err)
            throw err
        }
    }

    // Customer update Profile
    Customer.updateProfile = async function(reqData){
        const { errors, isValid } = validateUpdateCustomer(reqData);
        if (!isValid) {
            errors.status = 400
            return errors
        }

        const customerData = {
            email: reqData.email,
            address: {
                province: reqData.province,
                district: reqData.district,
                ward: reqData.ward,
                details: reqData.details, 
            },
            phone: reqData.phone,
            gender: reqData.gender,
            receiveDistrict: reqData.receiveDistrict,
            id: reqData.id,
            errors: [] 
        }
        try {
            customer = await Customer.upsert(customerData)
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
          //data.createdAt = FD.formatDate(data.createdAt)
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
    // Customer.blockCustomer = async function(reqData){
    //     try {
    //         customer = await Customer.findByIdAndUpdate({id: reqData.id}, reqData.enable)
    //         return customer
    //     } catch (err) {
    //         console.log('block Customer', err)
    //         throw err
    //     }
    // }

    //Login Customer validateLoginInput
    Customer.loginCustomer = async function(reqData){
        const { errors, isValid } = validateLoginInput(reqData);
        if (!isValid) {
            errors.status = 400
            return errors
        }
        try {
            let [err, customer] = await to(Customer.findOne({where: {email: reqData.email}}))
            if (customer == null) {
                errors.status = 400
                errors.email = "Email này chưa đăng ký là thành viên"
                return errors
            }
            let data = await Customer.login(reqData)
            return data
        } catch (error) {
            console.log('login Customer', error)
            return {status: 400, login: "Đăng nhập không thành công"}
        }
    }
    // Guest create Customer (Register)
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
            createdAt: FD.formatDate(new Date()),
            enable: true
        }
        try {
            let [err, customer] = await to(Customer.findOne({where: {email: reqData.email}}))
            if (customer != null) {
                errors.status = 400
                errors.email = "Email này đã đăng ký là thành viên"
                return [400, errors]
            }
            customerData = await Customer.create(customerData)
            return [200, 'Thanh Cong']
        } catch (error) {
            console.log('create Customer', error)
            throw error
        }
    }

    Customer.forgotPass = async function(email){
        const { errors, isValid } = validateLoginInput({email, password: "123"});
        if (!isValid) {
            errors.status = 400
            return errors
        }
        let [err, customer] = await to(Customer.findOne({where: {email: email}}))
        if (customer == null) {
            errors.status = 400
            errors.email = "Email này chưa đăng ký là thành viên"
            return errors
        }
        let newpass = Array(10).fill("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz").map(function(x) { return x[Math.floor(Math.random() * x.length)] }).join('')
        Customer.setPassword(customer.id, newpass)
        Customer.app.models.Email.send({
          to: email,
          from: senderAddress,
          subject: '[BOOKSTOR] Password reset',
          text: 'Your new password is: "' + `${newpass}` + '"'
        }, function(err) {
          if (err) return console.log('> error sending password reset email');
          console.log('> sending password reset email to:', email);
        });
        return []
    }
    
    Customer.resetPass = async function(userId, pass1, pass2, passwOld){
        const { errors, isValid } = validateResetPass(pass1, pass2, passwOld);
        if (!isValid) {
            errors.status = 400
            return errors
        }
        try{
            await Customer.changePassword(userId, passwOld, pass1)
        } catch (err){
            err.passwordOld = err.message
            return err
        }
    }
    
    //
    Customer.remoteMethod('readProfile', 
    {
        http: {path: '/readProfile', verb: 'post'},
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
          { arg: 'pageSize', type: 'number', default: '20'}],
        returns: [
            { arg: 'status', root: true },
            { arg: 'data', root: true }  ]
    })

    Customer.remoteMethod('blockCustomer', 
    {
        http: {path: '/blockCustomer', verb: 'post'},
        accepts: {arg: 'reqData', type: 'Object', http: {source: 'body'}},
        returns: { arg: 'data', root: true }
    })

    Customer.remoteMethod('loginCustomer', 
    {
        http: {path: '/loginCustomer', verb: 'post'},
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

    Customer.remoteMethod('forgotPass', 
    {
        http: {path: '/forgotPass', verb: 'post'},
        accepts: {arg: 'email', type: 'string'},
        returns: { arg: 'data', root: true }
    })

    Customer.remoteMethod('resetPass', 
    {
        http: {path: '/resetPass', verb: 'post'},
        accepts: [
            {arg: 'userId', type: 'string', required: true},
            {arg: 'pass1', type: 'string'},
            {arg: 'pass2', type: 'string'},
            {arg: 'passOld', type: 'string'},
        ],
        returns: { arg: 'data', root: true }
    })
}