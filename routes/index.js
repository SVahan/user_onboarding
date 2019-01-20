const userRouter = require('./user');
const adminRouter = require('./admin');
const spRoutes = require('./sp');

const appRouter = app => {

    app.use(userRouter);
    app.use(adminRouter);
    app.use(spRoutes)

};


module.exports = appRouter;