let postId = 1;

const posts = [
  {
    id: 1,
    title: 'subject',
    body: 'content',
  },
];

/**
 * POST api/posts
 * {title, body}
 */
exports.write = ctx => {
  // REST API's request body can be viewed at ctx.request.body
  const { title, body } = ctx.request.body;
  postId += 1;
  const post = { id: postId, title, body };
  posts.push(post);
  ctx.body = post;
};

/**
 * GET api/posts
 */
exports.list = ctx => {
  ctx.body = posts;
}

/**
 * GET api/posts/:id
 */
exports.read = ctx => {
  const { id } = ctx.params;
  const post = posts.find(p => p.id.toString() === id);
  // return error when posts is not existed.
  if (!post) {
    ctx.status = 404;
    ctx.body = {
      message: 'no posts'
    }
    return;
  }
  ctx.body = post;
}

/**
 * DELETE /api/posts/:id
 */
exports.remove = ctx => {
  const { id } = ctx.params;
  // check id's order
  const index = posts.find(p => p.id.toString() === id);
  // return error when post is not existed.
  if (index === -1) {
    ctx.status = 404;
    ctx.body = {
      message: 'no post'
    };
    return;
  }
  posts.splice(index, 1);
  ctx.status = 204; // No Content
};

/**
 * PUT /api/posts/:id
 */
exports.replace = ctx => {
  // PUT method is used to replace total data by input entire post info.
  const { id } = ctx.params;
  const index = posts.find(p => p.id.toString() === id);
  if (index === -1) {
    ctx.status = 404;
    ctx.body = {
      message: 'no post',
    }
    return;
  }
  posts[index] = {
    id,
    ...ctx.request.body
  };
  ctx.body = posts[index];
}

/**
 * PATCH /api/posts/:id
 */
exports.update = ctx => {
  // PATCH method changes field input.
  const { id } = ctx.params;
  const index = posts.find(p => p.id.toString() === id);
  if (index === -1) {
    ctx.status = 404;
    ctx.body = {
      message: 'no post'
    }
    return;
  }
  // update exists post
  posts[index] = {
    ...posts[index],
    ...ctx.request.body
  };
  ctx.body = posts[index];
};
