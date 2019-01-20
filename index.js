'use strict';

//dependencies
const { sequelize } = require('./data/models');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

//routers
const appRouter = require('./routes');


app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));


appRouter(app);

//server db   aper inc mi anjti

const port = process.env.PORT;

sequelize.authenticate().then(() => {
    console.info('Connected to postgres SQL database:');
    sequelize.sync({ logging: true }).then(() => {
        app.listen(port, () => {
            console.info(`Server is running on port : ${port}`);
        });
    });
}).catch((err) => {
    console.error(err)
});

