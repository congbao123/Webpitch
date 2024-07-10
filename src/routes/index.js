const newsRouter = require('./news');
const siteRouter = require('./site');
const pitchsRouter = require('./pitch');
const meRouter = require('./me');
const userRouter = require('./User');
const authRoter = require('./auth');

function route(app) {
    app.use('/news', newsRouter);   // Sử dụng 'app.use' thay vì 'app.get'
    app.use('/pitch', pitchsRouter);  
    app.use('/me', meRouter);
    app.use('/Users', userRouter);
    app.use('/auth',authRoter)
    app.use('/', siteRouter);
}


module.exports = route;
