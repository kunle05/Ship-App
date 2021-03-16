const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');

require('dotenv').config();
require('./server/config/mongoose');

const Location = require('./server/models/location');
const User = require('./server/models/user');

const typeDefs = require('./server/src/schema');
const Query = require('./server/src/resolvers/query');
const Mutation = require('./server/src/resolvers/mutation');

const app = express();
app.use(cookieParser());

app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
}));

app.use((req, res, next) => {
    const { token } = req.cookies;
    const now = new Date();

    if(token) {
        const { userId, lastLogin } = jwt.verify(token, process.env.APP_SECRET);
        req.userId = userId;

        // if(now > new Date(lastLogin) + 2700000) {
        //     //new token
        //     const token = jwt.sign({
        //         userId: userId,
        //         lastLogin: now
        //     }, process.env.APP_SECRET);

        //     res.cookie('token', token, {
        //         httpOnly: true,
        //         maxAge: 1000 * 60 * 60  //1hour cookie
        //     });
        // }

        // console.log(new Date() - new Date(lastLogin));
    };
    next();
}) 

const server = new ApolloServer({
    typeDefs,
    resolvers: { Query, Mutation },
    context: (req) => ({ ...req, Location, User })
})

server.applyMiddleware({ app, path: '/', cors: false });

app.listen(7200, () => console.log("Running on 7200"));