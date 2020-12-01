const express = require('express');
const { graphqlHTTP } = require("express-graphql");
const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString
} = require('graphql')

const app = express();

/* 
Request: Front-End can make a Request Knowing that the Server Can Respond with
a String (Type of Message)
*/


const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'HelloWorld', //If you ask for HelloWorld (Query)
    fields: () => {
      return {
        message: {
          type: GraphQLString, 
          resolve: () => {
            return 'Hello World' //You can get a Message (of type String)
          }
        }
      }
    }
  })
});



app.use('/graphql', graphqlHTTP({
  schema: schema,
  graphiql: true,
}));





const PORT = 8000
app.listen(PORT, (err) => {
  if(!err)
    console.log(`Listening on Port ${PORT}`);
})