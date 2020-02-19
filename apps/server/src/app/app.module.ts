import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';

import { BooksModule } from './books/books.module';

// import { typeDefs, resolvers } from './schema';

@Module({
  imports: [
    BooksModule,

    GraphQLModule.forRoot({
      // typeDefs: typeDefs,
      // resolvers: resolvers

      autoSchemaFile: true
    })
  ]
})
export class AppModule {}
