let to = require('await-to-js').to;
'use_strict';

module.exports = function(User) {
  const Promise = require('bluebird')
  //const bcrypt = require('bcrypt')
	  //create User
	  User.createUser = async function(
        username,
        password, 
        email,
        fullname,  
        address,
        phone,
        birthday,
        gender,
        role) {
        
        let [err, user] = await to(User.findOne({where: {email: email}}))
        if (user != null) {
            return [200, 'Email exsited']
        }

        const UserData = {
            username: username,
            password: password,
            email: email,
            fullname: fullname,
            address: address,
            phone: phone,
            birthday: birthday,
            gender: gender,
            role: role,
            createdAt: new Date(),
            enable: 1
        }
        try {
            const data = await User.create(UserData)
            return data
          } catch (err) {
            console.log('create User', err)
            throw err
          }
        }
    
    //read User
    User.readUser = async function(id) {
        try {
            const data = await User.findById(id, {
                where: {
                enable: 1
                }
            });
            return data;
        } catch (err) {
            console.log('read User', err)
            throw err
        }
    }

    //update User
    User.updateUser = async function(
        id, 
        username,
        email,
        fullname,  
        address,
        phone,
        birthday,
        gender,) {
    	
        const UserData = {
            username: username,
            email: email,
            fullname: fullname,
            address: address,
            phone: phone,
            birthday: birthday,
            gender: gender
        }

        try {
            const data = await User.upsertWithWhere(
              {
                id: User.id
              },
              UserData
            )
            return data
          } catch (err) {
            console.log('update User', err)
            throw err
          }
    }

    //delete User 
    User.deleteUser = async function(id) {
        let [err, user] = await to(User.findOne({where: {id: id}}))
        if (user == null) {
            return [200, 'can not find User']
        }
        User.destroyById(user.id)
        return [200, 'delete User sucess']
    }

    // list Users paganation(4)
    User.listUser = async function(page, pageSize) {
        try {
          const [data, total] = await Promise.all([
            User.find({
              where: {
                enable: 1
              },
              fields: {
                username: true,
                fullname: true,
                email: true,
                address: true,
                phone: true,
                birthday:true,
                gender:true
              }
            }),
            User.count({
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
          console.log('list User', err)
          throw err
        }
    }
    
    // Login function
    User.loginUser = async function(email, password){
      //console.log("hi1");
      let [err,user] = await to(User.findOne({where: {email: email}}))
      if (user == null) {
        return [200,"Account have not register!"]} 
      else {
        if (match)
               {return [200, "Login sucess!"] }
        else 
               {return [200,"Password error"] }
    }}

    User.remoteMethod('createUser', 
      {
        http: {path: '/createUser', verb: 'post'},
        accepts: [
          {arg: 'username', type: 'string', required: true},
          {arg: 'password', type: 'string', required: true},
          {arg: 'email', type: 'string', required: true},
          {arg: 'fullName', type: 'string', required: false},
          {arg: 'address', type: 'string', required: false},
          {arg: 'phone', type: 'string', required: false},
          {arg: 'birthday', type: 'date', required: false},
          {arg: 'gender', type: 'string', required: false},
          {arg: 'role', type: 'boolean', required: true}
        ],
        returns: { arg: 'data' },
      }
    )

    User.remoteMethod('readUser', 
      {
        http: {path: '/readUser', verb: 'post'},
        accepts: [
            {arg: 'id', type: 'string', required: true}],
        returns: { arg: 'data' }
      },
    )

    User.remoteMethod('updateUser', 
      {
        http: {path: '/updateUser', verb: 'post'},
        accepts: [
          {arg: 'id', type: 'string', required: true},
          {arg: 'username', type: 'string', required: false},
          {arg: 'password', type: 'string', required: false},
          {arg: 'email', type: 'string', required: false},
          {arg: 'fullName', type: 'string', required: false},
          {arg: 'address', type: 'string', required: false},
          {arg: 'phone', type: 'string', required: false},
          {arg: 'birthday', type: 'date', required: false},
          {arg: 'gender', type: 'string', required: false}
        ],
        returns: { arg: 'data' }
      },
    )

    User.remoteMethod('deleteUser', 
      {
        http: {path: '/deleteUser', verb: 'delete'},
        accepts: [
            {arg: 'id', type: 'string', required: true}
        ],
        returns: [
            {arg: 'status', type: 'number'},
            {arg: 'message', type: 'string'}]
      }
    )

    User.remoteMethod('listUser', 
      {
        http: {verb: 'post', path: '/listUsers' },
        accepts: [
          { arg: 'page', type: 'number', default: '0'},
          { arg: 'pageSize', type: 'number', default: '10'}],
        returns: { arg: 'data' },
      }
    )

    User.remoteMethod('loginUser',
    {
      http: {verb: 'post', path: '/loginUser' },
      accepts: [
        { arg: 'email', type: 'string', required: true,},
        { arg: 'password', type: 'string', required: true }],
      returns: [
        {arg: 'status', type: 'number'},
        {arg: 'message', type: 'string'}]
    }
  )
};