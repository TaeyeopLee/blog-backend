const Router = require('koa-router');
const postsCtrl = require('./posts.ctrl');

// const posts = require('./posts');

// const api = new Router();
const posts = new Router();

// api.use('/posts', posts.routes());

posts.get('/', postsCtrl.list);
posts.post('/', postsCtrl.write);
posts.get('/:id', postsCtrl.read);
posts.delete('/:id', postsCtrl.remove);
posts.patch('/:id', postsCtrl.update);

// module.exports = api;
module.exports = posts;

