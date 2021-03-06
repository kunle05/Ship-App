const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const cors = require('cors');

require('./server/config/mongoose');
const Location = require('./server/models/location');
const User = require('./server/models/user');

const typeDefs = require('./server/src/schema');
const Query = require('./server/src/resolvers/query');
const Mutation = require('./server/src/resolvers/mutation');

const app = express();
app.use(cors(
    // origin: process.env.FRONTEND_URL,
    // credentials: true,
));

const server = new ApolloServer({
    typeDefs,
    resolvers: { Query, Mutation },
    // context: (req) => ({ ...req, Location, User })
    context: {Location, User }
})

server.applyMiddleware({ app, path: '/', cors: true });

app.listen(7200, () => console.log("Running on 7200"));