import { authors, books } from './data';

export const typeDefs = `
  type Author {
    id: ID!
    name: String!
    books: [Book]!
  }
  input AuthorInput {
    id: Int!
    name: String!
  }
  type Book {
    id: ID!
    title: String!
    authorId: Int!
    author: Author!
    likes: Int
  }
  type Query {
    authors: [Author]
    author(id: Int!): Author
    books: [Book]
    book(id: Int!): Book
  }
  type Mutation {
    likeBook(id: Int!): Book
  }
`;

export const resolvers = {
  Author: {
    books(author) {
      return books.filter(book => book.authorId === author.id);
    }
  },

  Book: {
    author(book) {
      return authors.find(author => author.id === book.authorId);
    }
  },

  Query: {
    authors() {
      return authors;
    },
    author(obj, args, context, info) {
      return authors.find(author => author.id === args.id);
    },
    books() {
      return books;
    },
    book(obj, args, context, info) {
      return books.find(b => b.id === args.id);
    }
  },

  Mutation: {
    likeBook(obg, args: { id: number }) {
      const book = books.find(b => b.id === args.id);
      book.likes += 1;
      return book;
    }
  }
};
