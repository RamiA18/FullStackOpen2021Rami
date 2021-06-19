// let authors = [
//   {
//     name: 'Robert Martin',
//     id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
//     born: 1952,
//   },
//   {
//     name: 'Martin Fowler',
//     id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
//     born: 1963
//   },
//   {
//     name: 'Fyodor Dostoevsky',
//     id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
//     born: 1821
//   },
//   {
//     name: 'Joshua Kerievsky', // birthyear not known
//     id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
//   },
//   {
//     name: 'Sandi Metz', // birthyear not known
//     id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
//   },
// ]

// let books = [
//   {
//     title: 'Clean Code',
//     published: 2008,
//     author: 'Robert Martin',
//     id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
//     genres: ['refactoring']
//   },
//   {
//     title: 'Agile software development',
//     published: 2002,
//     author: 'Robert Martin',
//     id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
//     genres: ['agile', 'patterns', 'design']
//   },
//   {
//     title: 'Refactoring, edition 2',
//     published: 2018,
//     author: 'Martin Fowler',
//     id: "afa5de00-344d-11e9-a414-719c6709cf3e",
//     genres: ['refactoring']
//   },
//   {
//     title: 'Refactoring to patterns',
//     published: 2008,
//     author: 'Joshua Kerievsky',
//     id: "afa5de01-344d-11e9-a414-719c6709cf3e",
//     genres: ['refactoring', 'patterns']
//   },
//   {
//     title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
//     published: 2012,
//     author: 'Sandi Metz',
//     id: "afa5de02-344d-11e9-a414-719c6709cf3e",
//     genres: ['refactoring', 'design']
//   },
//   {
//     title: 'Crime and punishment',
//     published: 1866,
//     author: 'Fyodor Dostoevsky',
//     id: "afa5de03-344d-11e9-a414-719c6709cf3e",
//     genres: ['classic', 'crime']
//   },
//   {
//     title: 'The Demon ',
//     published: 1872,
//     author: 'Fyodor Dostoevsky',
//     id: "afa5de04-344d-11e9-a414-719c6709cf3e",
//     genres: ['classic', 'revolution']
//   },
// ]

const { ApolloServer, UserInputError, PubSub, gql } = require("apollo-server");
const { v1: uuid } = require("uuid");
const mongoose = require("mongoose");
const Book = require("./schemas/book");
const Author = require("./schemas/author");
const User = require("./schemas/user");
const jwt = require("jsonwebtoken");
const pubsub = new PubSub();
const JWT_SECRET = "apassword";
const MONGODB_URI =
  "mongodb+srv://FullStackRami:FullStackRami@phonebook.0r9xf.mongodb.net/library-backend?retryWrites=true&w=majority";

console.log("connecting to", MONGODB_URI);

mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("connection to MongoDB is established");
  })
  .catch((error) => {
    console.log("error connecting to MongoDB:", error.message);
  });

const typeDefs = gql`
  type Author {
    name: String!
    id: ID
    born: Int
    bookCount: Int
  }

  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
  }

  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    me: User
  }

  type Mutation {
    addBook(
      title: String
      author: String
      published: Int
      genres: [String]
    ): Book

    editAuthor(name: String, setBornTo: Int): Author

    createUser(username: String!, favoriteGenre: String!): User

    login(username: String!, password: String!): Token
  }
  type Subscription {
    bookAdded: Book!
  }
`;

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      const genreArg = args.genre;
      const authorArg = args.author;
      // Author and genre in args
      if (genreArg && authorArg) {
        const author = await Author.findOne({ name: authorArg });
        const bookList = await Book.find({
          $and: [{ author: { $in: author.id } }, { genres: { $in: genreArg } }],
        }).populate("author");
        return bookList;
        // No author in args, only genre
      } else if (genreArg && !authorArg) {
        const bookList = await Book.find({
          genres: { $in: genreArg },
        }).populate("author");
        return bookList;
        // No genre in args, Only author
      } else if (authorArg && !genreArg) {
        const author = await Author.findOne({ name: authorArg });
        const bookList = await Book.find({
          author: { $in: author.id },
        }).populate("author");
        return bookList;
      } else {
        const bookList = await Book.find({}).populate("author");
        return bookList;
      }
    },

    allAuthors: async () => {
      const authors = await Author.find({});
      const books = await Book.find({});
      return authors.map((author) => ({
        name: author.name,
        born: author.born,
        bookCount: books.filter(
          (book) => book.author.toString() === author._id.toString()
        ).length,
      }));
    },
    me: (root, args, context) => {
      const currentUser = context.currentUser;
      return currentUser;
    },
  },

  Mutation: {
    addBook: async (root, args, { currentUser }) => {
      const titleArg = args.title;

      const authorArg = args.author;

      if (!currentUser) {
        throw new AuthenticationError("Unauthorized!");
      }
      const bookExists = await Book.findOne({ title: titleArg });

      if (bookExists) {
        throw new UserInputError("Book title must be unique", {
          invalidArgs: titleArg,
        });
      }

      const authorExists = await Author.findOne({ name: authorArg });

      const book = new Book({ ...args });

      let bookSaved;

      if (!authorExists) {
        const author = new Author({ name: authorArg });
        const returnedAuthor = await author.save();
        book.author = returnedAuthor._id;
      } else {
        book.author = authorExists._id;
      }

      bookSaved = await book.save().catch((error) => {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      });

      bookSaved = bookSaved.populate("author").execPopulate();

      pubsub.publish("BOOK_ADDED", { bookAdded: bookSaved });

      return bookSaved;
    },

    editAuthor: async (root, args, { currentUser }) => {
      const authorNameArg = args.name;
      const birthDateArg = args.setBornTo;

      if (!currentUser) {
        throw new AuthenticationError("Unauthorized!");
      }

      if (!authorNameArg) {
        throw new UserInputError("Name is missing", {
          invalidArgs: args,
        });
      }

      if (!birthDateArg) {
        throw new UserInputError("Birthdate is missing", {
          invalidArgs: args,
        });
      }

      const authorExists = await Author.findOne({ name: authorNameArg });

      if (!authorExists) {
        throw new UserInputError("Author does not exist");
        return null;
      }

      const author = await Author.findOneAndUpdate(
        { name: authorNameArg },
        { $set: { born: birthDateArg } },
        { new: true },
        (err) => {
          if (err) {
            throw new UserInputError(error.message, {
              invalidArgs: args,
            });
          }
        }
      );
      return author;
    },

    createUser: async (root, args) => {
      const username = args.username;
      const user = new User({
        username: username,
        favoriteGenre: args.favoriteGenre,
      });
      return user.save().catch((error) => {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      });
    },

    login: async (root, args) => {
      const username = args.username;
      const password = args.password;
      const user = await User.findOne({ username: username });
      if (!user || password !== "apassword") {
        throw new UserInputError("Wrong Credentials");
      }
      const userForToken = {
        username: user.username,
        id: user._id,
      };
      return { value: jwt.sign(userForToken, JWT_SECRET) };
    },
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(["BOOK_ADDED"]),
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null;
    if (auth && auth.toLowerCase().startsWith("bearer ")) {
      const tokenDecoded = jwt.verify(auth.substring(7), JWT_SECRET);
      const currentUser = await User.findById(tokenDecoded.id);
      return { currentUser };
    }
  },
});

server.listen().then(({ url, subscriptionsUrl }) => {
  console.log(`Server ready at ${url}`);
  console.log(`Subscriptions ready at ${subscriptionsUrl}`);
});
