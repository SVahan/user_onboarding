'use strict';

const _omit = require('lodash/omit');

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define(
        'User',
        {
            id: {
                primaryKey: true,
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4
            },
            avatar: DataTypes.STRING,
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: {
                    message: 'email ollreade exixt'
                },
                validate: {
                    isEmail: true
                }
            },
            role: {
                type: DataTypes.STRING,
            },
            gender: {
                type: DataTypes.STRING,

            },
            password: {
                allowNull: false,
                type: DataTypes.STRING,
                required: true
            },

            firstName: {
                allowNull: false,
                type: DataTypes.STRING(50),
            },

            lastName: {
                allowNull: false,
                type: DataTypes.STRING(50),
            },

            phone: {
                allowNull: true,
                type: DataTypes.STRING(50),

            },

            meta: DataTypes.JSON

        },
        {
            timestamps: true,
        }
    );
   User.prototype.toJSON = function(){
       const user = this.get();
        return _omit(user, ['password'])
   };

    return User
};

