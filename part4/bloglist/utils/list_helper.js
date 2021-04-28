const _ = require('lodash');

const dummy = (blogsArray) => {
    return 1
}

const totalLikes = (blogsArray) => {
    return blogsArray.reduce((accumulator, blog) => (accumulator += blog.likes), 0)
}

const favouriteBlog = (blogsArray) => {
    return Math.max(...blogsArray.map(blog=>blog.likes))
}

const mostBlogs = (blogArray) => {
    const blogsByAuthor = _.groupBy(blogArray, 'author')
    const orderedBlogsByAuthor = _.orderBy(blogsByAuthor, 'length', ['desc']);
    const mostBlogsAuthor = { 
        "author": orderedBlogsByAuthor[0][0].author,
        "blogs": orderedBlogsByAuthor[0].length
    }
    return (
        mostBlogsAuthor
    )
}

const mostLikes = (blogArray) => {

    const blogsByAuthor = _.groupBy(blogArray, 'author')
    const likesPerAuthor = _.mapValues(blogsByAuthor,(blogs) => blogs.reduce((totalLikes,blog) => totalLikes += blog.likes,0))
    const rLikesPerAuthor = _.toPairs(likesPerAuthor)
    const mostLikedAuthor = _.reduce(rLikesPerAuthor, (valueA, valueB) => valueA[1] > valueB[1] ? valueA : valueB)
    const rMostLikedAuthor = { 
        "author": mostLikedAuthor[0],
        "likes": mostLikedAuthor[1]
    }
    return (
        rMostLikedAuthor
    )
}

  module.exports = {
    dummy,
    totalLikes,
    favouriteBlog,
    mostBlogs,
    mostLikes
  }