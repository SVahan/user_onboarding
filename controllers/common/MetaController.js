'use strict';

const { User } = require('../../data/models/index');


class MetaController {

  static updateApprovement(approvement, id) {
    return new Promise((resolve, reject) => {
      User.findById(id)
        .then(user => {
          console.log(user);
          // user.update({meta:approvement}, { where:id});
          resolve(user);
        }).catch(err => { reject(err) })
    })

  }
}

module.exports = MetaController;
