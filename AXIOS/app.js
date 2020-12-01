const express = require('express');
const axios = require('axios');
const { graphqlHTTP } = require('express-graphql');
const { 
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLInt,
  GraphQLList
} = require('graphql');

const app = express();

const CustomerType = new GraphQLObjectType({
  name: 'Customer',
  fields: () => ({
    id: {
      type: GraphQLString
    },
    name: {
      type: GraphQLString
    },
    email: {
      type: GraphQLString
    },
    age: {
      type: GraphQLInt
    }
  })
});


const RootTypeQuery = new GraphQLObjectType({
  name: 'Root',
  fields: () => ({
    customers: {
      type: GraphQLList(CustomerType),
      description: 'Customer List',
      resolve(){
        return axios.get('http://localhost:3000/customers').then(res => res.data);
      }
    }
  })
});


const schema = new GraphQLSchema({
  query: RootTypeQuery
});



app.use('/graphql', graphqlHTTP({
  schema: schema,
  graphiql: true
}));



app.listen(8000, (err) => {
  if(!err)
    console.log(`http://localhost:8000`);
})