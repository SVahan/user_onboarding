'use strict';

const {USER_ROLES} = require('../../utils/constants');
const {secret} = require('../../config');
const jwt = require('jsonwebtoken');
const {User} = require('../../data/models');

module.exports = (req, res, next)=>{

    if(req.headers.authorization && req.headers['authorization'].split(' ')[0] === 'Bearer'){
        const  token =  req.headers.authorization.split(' ')[1];
        jwt.verify(token, secret, function(err, decoded) {
            if (err) return res.status(401).json({message: 'UNAUTHORIZED'});
            console.log(decoded);
            User.findOne({
                where: {
                    id:decoded.userId
                }
            }).then(user => {
                if (user.role === USER_ROLES.ADMIN) {
                        req.user = user;
                        next();
                } else {res.status(403).json({error: "permission denied"})}
            }).catch(err => {res.json(err.message)})
        })
    }else res.status(401).json({message: 'UNAUTHORIZED'})
};


