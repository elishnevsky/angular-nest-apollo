import { Module } from '@nestjs/common';
import { GraphQLModule, Args } from '@nestjs/graphql';
import { authors, books } from './data';

const typeDefs = `
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
  }
  type Query {
    authors: [Author]
    author(id: Int!): Author
    books: [Book]
    book(id: Int!): Book
  }
  type Mutation {
    updateAuthor(author: AuthorInput!): Author
  }
`;

const resolvers = {
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
    },
  },
  Mutation: {
    updateAuthor(obg, args) {
      const author = authors.find(a => a.id === args.author.id);
      author.name = args.author.name;
      return author;
    }
  }
};

@Module({
  imports: [
    GraphQLModule.forRoot({
      typeDefs: typeDefs,
      resolvers: resolvers
    })
  ]
})
export class AppModule {}
