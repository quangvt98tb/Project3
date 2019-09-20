let to = require('await-to-js').to;

'use_strict';

module.exports = function(User) {
  const Promise = require('bluebird')
  const bcrypt = require('bcrypt')
	  //create User
	  User.createUser = async function(
        uid, 
        username,
        password, 
        email, 
        address,
        phone,
        birthday,
        gender,
        role) {

        const UserData = {
            uid: uid,
            username: username,
            password: bcrypt.hashSync(password,2),
            email: email,
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
        password, 
        email, 
        address,
        phone,
        birthday,
        gender) {
    	
        const UserData = {
            username: username,
            email: email,
            address: address,
            phone: phone,
            birthday: birthday,
            gender: gender,
            updatedAt: new Date(),
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
                email: true,
                address: true,
                phone: true,
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
    
    User.remoteMethod('createUser', 
      {
        http: {path: '/create', verb: 'post'},
        accepts: [
          {arg: 'uid', type: 'string', required: true},
          {arg: 'username', type: 'string', required: true},
          {arg: 'password', type: 'string', required: true},
          {arg: 'email', type: 'string', required: true},
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
        http: {path: '/read', verb: 'post'},
        accepts: [
            {arg: 'id', type: 'string', required: true}],
        returns: { arg: 'data' }
      },
    )

    User.remoteMethod('updateUser', 
      {
        http: {path: '/update', verb: 'post'},
        accepts: [
          {arg: 'id', type: 'string', required: true},
          {arg: 'username', type: 'string', required: false},
          // {arg: 'password', type: 'string', required: true},
          {arg: 'email', type: 'string', required: false},
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
        http: {path: '/delete', verb: 'delete'},
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
        http: {verb: 'post', path: '/list' },
        accepts: [
          { arg: 'page', type: 'number', default: '0'},
          { arg: 'pageSize', type: 'number', default: '10'}],
        returns: { arg: 'data' },
      }
    )
};