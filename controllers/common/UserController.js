'use strict';

const _isEmpty = require('lodash/isEmpty');
//const _trim = require('lodash/trim');
const { User } = require('../../data/models/index');
const { USER_ROLES } = require('../../utils/constants');

const Helper = require('../../components/Helper');
class UserHandler {

    static getUsers() {
        return User.findAll()
    }

    static register({ email, password, username, lastName, firstName, phone }) {
        return User.create({
            email,
            password: Helper.passwordHash(password),
            lastName,
            username,
            firstName,
            phone,
            role: USER_ROLES.ADMIN
        })
    }
    static login({ email, password }) {
        return new Promise((resolve, reject) => {

            User.findOne({
                where: {
                    email
                }
            }).then(user => {
                if (_isEmpty(user) || !Helper.checkPassword(password, user.password)) {
                    return reject({ error: { message: 'INVALID_CREDENTIALS' } })
                }

                resolve(user);
            })
        })
    }
    static userUpdate({ id }) {
        return User.findById(id)
    }
}

module.exports = UserHandler;
