const { gql } = require("apollo-server-express");

const typeDefs = gql`
    scalar Date

    enum Permission {
        USER
        ITEMDELETE
        ADMIN
    }
    enum Status {
        Shipped
        Transit
        Received
        Delivered
    }
    type Location {
        _id: ID!
        photo: String
        city: String! 
        address: String!
        description: String
        phone: String
        email: String 
        status: Int 
        createdAt: Date
        updatedAt: Date
    }
    type User {
        _id: ID!
        firstname: String! 
        lastname: String! 
        username: String!
        email: String! 
        location: Location!
        status: Int! 
        permissions: [Permission]
        createdAt: Date
        updatedAt: Date
    }
    type Tracker {
        _id: ID!
        action: String!
        user: User!
        createdAt: Date
        updatedAt: Date
    }
    type Item {
        _id: ID!
        weight: Int!
        content: String!
        packaging: String!
        status: [Tracker]
        createdAt: Date
        updatedAt: Date
    }
    type Package {
        _id: ID!
        shipper_name: String!
        shipper_phone: String!
        receiver_name: String!
        receiver_phone: String!
        receiver_email: String
        amount: Int!
        amount_paid: Int!
        tracking: String!
        destination: Location!
        items: [Item]
        createdAt: Date
        updatedAt: Date
    }

    type Query {
        locations: [Location]!
        users: [User]!
    }

    type Mutation {
        newLocation(city: String!, address: String!, description: String, phone: String, email: String) : Location
        newUser(firstname: String!, lastname: String!, username: String!, email: String!, password: String!, confirmPassword: String! location: ID!) : User
    }
`;

module.exports = typeDefs
