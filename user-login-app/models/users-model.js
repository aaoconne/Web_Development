/* class to model the users collection that has a constructor and add methods */ 
const shortid = require('shortid');
const bcrypt = require('bcrypt');   // import the bcrypt module into users-model

class Users{
   constructor(){
       this.users = [];
   }
    async add(name, email, password){
       const id = shortid.generate();
       const hashedPassword = await bcrypt.hash(password, 10);
       const user = {id:id, name:name, email:email, password:hashedPassword};
       this.users.push(user);
       console.log(this.users)
    } 

    /* findUser() that takes in params key, value;
    function returns the item in the users collection that matches the value, 
    if there is no match, it returns undefined */ 
    findUser(key, value){
        const user = this.users.find(item => item[key] === value)
        return user; 
    }
}

module.exports = new Users();