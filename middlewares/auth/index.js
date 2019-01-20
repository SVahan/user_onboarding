'use strict';

const {secret} = require('../../config');
const jwt = require('jsonwebtoken');
const {User} = require('../../data/models');

module.exports = (req, res, next)=>{
    if(req.headers.authorization && req.headers['authorization'].split(' ')[0] === 'Bearer'){
        const  token =  req.headers.authorization.split(' ')[1];
        jwt.verify(token, secret, function(err, decoded) {
            if(err) return res.status(401).json({message: 'UNAUTHORIZED'});
            console.log(decoded);
            User.findOne({
                where:{
                    id:decoded.userId
                }
            }).then(user => {
                if(user) req.user = user;
                //if(user.role !==USER_ROLES.SP) res.status = 403; res.json({error:'access denied kam forbidden kam rad eli '})
                next()
            }).catch(err=>{
                res.json(err.message)
            })
        });
    }else res.status(401).json({message: 'UNAUTHORIZED'})
};