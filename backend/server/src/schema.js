const { gql } = require("apollo-server-express");

const typeDefs = gql`
    scalar Date

    enum Permission {
        USER
        MANAGER
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
        active: Boolean
        createdAt: Date
        updatedAt: Date
    }
    type User {
        _id: ID!
        firstname: String! 
        lastname: String! 
        photo: String
        username: String!
        email: String! 
        location: Location!
        active: Boolean! 
        permissions: [Permission]
        lastLogin: Date
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
        locations(active: Boolean) : [Location]!
        location(_id: ID!) : Location
        users: [User]!
        user(_id: ID!) : User
    }

    type Mutation {
        newLocation(city: String!, address: String!, description: String, phone: String, email: String) : Location!
        updateLocation(_id: ID!) : Location!
        editLocation(_id: ID!, city: String, address: String, description: String, phone: String, email: String) : Location!
        newUser(firstname: String!, lastname: String!, username: String!, email: String!, password: String!, confirmPassword: String! location: ID!) : User
        updateUser(_id: ID!) : User!
        editUser(_id: ID!, username: String, firstname: String, lastname: String, email: String) : User!
    }
`;

module.exports = typeDefs
