User.create([
    {username: 'NgocAnh', email: 'jane@doe.com', password: 'opensesame'},
    {username: 'Quang', email: 'john@doe.com', password: 'opensesame'}
  ], function(err, users) {
    if (err) return cb(err);

    //create the admin role
    Role.create({
      name: 'admin'
    }, function(err, role) {
      if (err) cb(err);

      //make NgocAnh an admin
      role.principals.create({
        principalType: RoleMapping.USER,
        principalId: users[0].id
      }, function(err, principal) {
        cb(err);
        console.log('Created principal:', principal);
      });
      //make NgocAnh an admin
      role.principals.create({
        principalType: RoleMapping.USER,
        principalId: users[1].id
      }, function(err, principal) {
        cb(err);
        console.log('Created principal:', principal);
      });
    });
  });