'use strict';

const {secret} = require('../config');
const jwt = require('jsonwebtoken');
const router = require('express').Router();
const UserController = require('../controllers/common/UserController');
const PREFIX = '/users';
const spAuth = require('../middlewares/auth/spAuth');


router.post(PREFIX, (req, res)=>{
    if(req.body.username && req.body.password && req.body.firstName && req.body.lastName && req.body.phone && req.body.email) {
        UserController.register(req.body)
            .then(user => {
                res.status = 201;
                res.json({
                    user,
                    token: jwt.sign({
                        userId: user.id
                    }, secret)
                })
            }).catch(err => {
            res.status = 400;
            res.json({
                error: {
                    message: err.message
                }
            })
        })
    }
    else {res.json({'message':"invalid params"})}
});
router.post(PREFIX + '/login', (req, res)=>{
    UserController.login(req.body)
        .then(user=>{
            res.status = 201;
            res.json({
                user,
                token: jwt.sign({
                    exp: Math.floor(Date.now() / 1000) + 1020,
                    userId: user.id
                },secret)
            })
        }).catch(err=>{
            res.status(400).json(err)
    })
});

router.get(PREFIX + '/', spAuth, (req, res)=>{
        UserController.getUsers()
            .then(users=>{
               // console.log(users[0].password);;
                res.status(200).json({
                    users
                })
            })
            .catch(err=>{
                res.status(500).json(err.message)
            })
});
router.put(PREFIX + '/update/meta', spAuth, (req, res)=>{
    UserController.Update(req.user)
        .then(user=>{
           user.update({email: req.body.email}, { where:user.id});
            res.status = 204;
            res.json({user})
        })
        .catch(err=>{
            res.status(500).json(err.message)
        })
});


module.exports = router;