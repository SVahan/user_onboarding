
'use strict';

const MetaController = require('../controllers/common/MetaController');


const router = require('express').Router();
const adminAuth = require('../middlewares/auth/adminAuth');
const PREFIX = '/sp';


router.put(PREFIX + '/update/meta:id', adminAuth, (req, res) => {
    MetaController.updateApprovement(req.body.approvement, req.params.id)
        .then(user => {
            res.status(200).json({ user })
        })
        .catch(err => {
            res.status(500).json(err.message)
        })
});

module.exports = router;