const express = require('express');
const { graphqlHTTP } = require("express-graphql");
const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLNonNull
} = require('graphql');
const { resolve } = require('path');

//Database
const authors = [
	{ id: 1, name: 'J. K. Rowling' },
	{ id: 2, name: 'J. R. R. Tolkien' },
	{ id: 3, name: 'Brent Weeks' }
]

const books = [
	{ id: 1, name: 'Harry Potter and the Chamber of Secrets', authorID: 1 },
	{ id: 2, name: 'Harry Potter and the Prisoner of Azkaban', authorID: 1 },
	{ id: 3, name: 'Harry Potter and the Goblet of Fire', authorID: 1 },
	{ id: 4, name: 'The Fellowship of the Ring', authorID: 2 },
	{ id: 5, name: 'The Two Towers', authorID: 2 },
	{ id: 6, name: 'The Return of the King', authorID: 2 },
	{ id: 7, name: 'The Way of Shadows', authorID: 3 },
	{ id: 8, name: 'Beyond the Shadows', authorID: 3 }
]


const app = express();

const AuthorType = new GraphQLObjectType({
  name: 'AuthorName',
  description: 'Single Author Details',
  fields: () => ({
    id: {
      type: GraphQLNonNull(GraphQLInt)
    },
    name: {
      type: GraphQLNonNull(GraphQLString)
    },
    books: {
      type: GraphQLList(BookType),
      resolve: () => books
    }
  })
});

const BookType = new GraphQLObjectType({
  name: 'Book',
  description: 'Single Book Details',
  fields: () => ({
    id: {
      type: GraphQLNonNull(GraphQLInt)
    },
    name: {
      type: GraphQLString
    },
    authorID: {
      type: GraphQLNonNull(GraphQLInt)
    },
    authorName: {
      type: AuthorType,
      resolve: (book) => {
        return authors.find(author => author.id === book.authorID);
      }
    }
  })
});


const RootQueryType = new GraphQLObjectType({
  name: 'Query',
  description: 'Root Query',
  fields: () => ({
    books: {
      type: new GraphQLList(BookType),
      description: 'Book List',
      resolve: () => {
        return books
      }
    },
    authors: {
      type: new GraphQLList(AuthorType),
      description: 'Book List',
      resolve: () => {
        return authors
      }
    }
  })
});

const schema = new GraphQLSchema({
  query: RootQueryType
})

app.use('/graphql', graphqlHTTP({
  schema: schema,
  graphiql: true,
}));


const PORT = 8080
app.listen(PORT, (err) => {
  if(!err)
    console.log(`Listening on Port ${PORT}`);
})
