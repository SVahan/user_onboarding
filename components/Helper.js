'use strict';

const bcrypt = require('bcrypt');


class Helper {

    static  passwordHash(password){
       return bcrypt.hashSync(password,10)

}
static  checkPassword(password, candidate = ''){
       return  bcrypt.compareSync(password, candidate)

}
}




module.exports = Helper;