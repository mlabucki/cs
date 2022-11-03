var bcrypt = require('bcryptjs');

const users = [
    {
        name:"Admin",
        email:"admin@admin.com",
        password:bcrypt.hashSync("pass123",10),
        isAdmin:true
    },
    {
        name:"User",
        email:"user@user.com",
        password:"1234",
        
    },
  ];
  module.exports = users;
  