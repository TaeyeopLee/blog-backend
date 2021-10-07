/**
 * for mysql controller
 */

const Blog = require('../models');

// blog posting
exports.write = async ctx => {
  const { title, body } = ctx.request.body;
  console.log('blog posting', title, body);
  const newPost = { title: title, body: body };

  try {
    await Blog.create(newPost);
    ctx.body = newPost;
  }
  catch (e) {
    ctx.throw(500, e)
  }
}

// read post by id
exports.read = async ctx => {
  const { id } = ctx.params;
  try {
    const post = await Blog.findByPk(id);
    if (!post) {
      ctx.stats = 404;
      return;
    }
    ctx.body = post;
  }
  catch (e) {
    ctx.throw(500, e);
  }
}

// remove post by id
exports.remove = async ctx => {
  const { id } = ctx.params;
  try {
    const post = await Blog.findByPk(id);
    if (!post) {
      ctx.status = 404;
      return;
    }
    await post.destroy();
    ctx.status = 204; // No Content
  }
  catch (e) {
    ctx.throw(500, e);
  }
}

// update post by id
exports.update = async ctx => {
  const { id } = ctx.params;
  const { title, body } = ctx.request.body;
  try {
    const post = await Blog.findByPk(id);
    if (!post) {
      ctx.status = 404;
      return;
    }
    post.title = title;
    post.body = body;

    await post.save();
    ctx.body = post;
  }
  catch (e) {
    ctx.throw(500, e);
  }
}

// list
exports.list = async ctx => {
  try {
    const posts = await Blog.findAll();
    ctx.body = posts;
  }
  catch (e) {
    ctx.throw(500, e);
  }
}
