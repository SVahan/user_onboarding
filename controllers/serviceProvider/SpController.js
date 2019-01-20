'use strict';

const _isEmpty = require('lodash/isEmpty');
const Helper = require('../../components/Helper');
const { User }  = require('../../data/models/index');
const { USER_ROLES } = require('../../utils/constants');

class SpController {

    static register({email, password, username, lastName, firstName, phone, avatar, gender}) {
        return User.create({
            email,
            password:Helper.passwordHash(password),
            firstName,
            lastName,
            phone,
            avatar,
            gender,
            role:USER_ROLES.ADMIN,
            meta:{
               approvement:null,
               sertificate:null
           }
        });
    }
    static login({email,password}){
        return new Promise((resolve,reject)=>{

            User.findOne({
                where:{
                    email
                }
            }).then(user=>{
                if(_isEmpty(user) || !Helper.checkPassword(password, user.password)){
                    return reject({error:{message:'INVALID_CREDENTIALS'}})
                }

                resolve(user);
            })
        })
    }
}

module.exports = SpController;