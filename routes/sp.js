'use strict';

const SpController = require('../controllers/serviceProvider/SpController');
const MetaController = require('../controllers/common/MetaController');

//const jwt = require('jsonwebtoken');
//const {secret} = require('../config');
const router = require('express').Router();
const spAuth = require('../middlewares/auth/spAuth');
const PREFIX = '/sp';


router.post(PREFIX, (req, res)=>{
    SpController.register(req.body)
        .then(user=>{
            res.status = 201;
            res.json({user})
        }).catch(err=>{
            if(err.name === 'SequelizeValidationError' || err.name ==='SequelizeUniqueConstraintError'){
                res.status = 400;
                return res.json({error:err.message})
            }
            res.status = 500;
            console.log(err);
            res.json({err:"internal server error"})

    })
});


module.exports = router;