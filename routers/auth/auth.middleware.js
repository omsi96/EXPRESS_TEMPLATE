const { Author } = require("../../db/models");

const findAuthor = async (authorId, next) => {
  try {
    const foundAuthor = await Author.findByPk(authorId, {
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });
    return foundAuthor;
  } catch (error) {
    next(error);
  }
};
exports.authorParamsMiddleware = async (req, res, next, authorId) => {
  const author = await findAuthor(authorId, next);
  console.log("Author with authorId: ", authorId, ", is:", author);
  if (author) {
    req.author = author;
    next();
  } else {
    const error = new Error("Author not found!");
    error.status = 404;
    next(error);
  }
};
