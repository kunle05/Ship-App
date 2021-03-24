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
        packaging: String!
        dimensions: String
        reference: String
        weight: Int!
        content: String!
        status: [Tracker]
        createdAt: Date
        updatedAt: Date
    }
    type Package {
        _id: ID!
        shipper_name: String!
        shipper_phone: String!
        shipper_email: String
        recipient_name: String!
        recipient_phone: String!
        recipient_email: String
        destination: Location!
        origin: Location!
        bill_to: String!
        amount: Int!
        amount_paid: Int!
        tracking: String!
        items: [Item]
        createdAt: Date
        updatedAt: Date
    }
    type Message {
        message: String!
    }
    input PackageItem {
        packaging: String!
        dimensions: String
        reference: String
        weight: Int!
        content: String!
    }
    type Query {
        locations(active: Boolean, skip: Int, limit: Int) : [Location]!
        location(_id: ID!) : Location
        users(skip: Int, limit: Int): [User]!
        user(_id: ID!) : User
        me: User
        count(sender: String!) : Int
    }
    type Mutation {
        newLocation(city: String!, address: String!, description: String, phone: String, email: String, photo: String) : Location!
        updateLocation(_id: ID!) : Location!
        editLocation(_id: ID!, photo: String, city: String, address: String, description: String, phone: String, email: String) : Location!
        newUser(firstname: String!, lastname: String!, username: String!, email: String!, password: String!, confirmPassword: String! location: ID!) : User
        updateUser(_id: ID!) : User!
        editUser(_id: ID!, username: String, firstname: String, lastname: String, email: String, photo: String, permissions: [Permission]) : User!
        changeUserPass(_id: ID!, password: String!, confirmPassword: String!) : User!
        signIn(username: String!, password: String!) : User
        signOut: Message
        requestReset(email: String!): Message
        resetPassword(token: String!, password: String!, confirmPassword: String!) : Message
        package(shipper_name: String!, shipper_phone: String!, shipper_email: String, recipient_name: String!, recipient_phone: String!, recipient_email: String, destination: ID!, origin: ID!, bill_to: String, amount: Int, amount_paid: Int, items: [PackageItem]) : Package
    }
`;

module.exports = typeDefs