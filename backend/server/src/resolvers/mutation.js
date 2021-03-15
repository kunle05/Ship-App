const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const matchPassword = require("../../../utils");

const Mutation = {
    newLocation: (parent, args, ctx, info) => {
        if(!ctx.req.userId) {
            throw new Error("Log in is required")
        }
        return ctx.Location.create({
            ...args
        });
    },
    updateLocation: async (parent, args, ctx, info) => {
        if(!ctx.req.userId) {
            throw new Error("Log in is required")
        }
        const location = await ctx.Location.findById(args._id);
        location.active = !location.active;
        return location.save();
    },
    editLocation: async (parent, args, ctx, info) => {
        if(!ctx.req.userId) {
            throw new Error("Log in is required")
        }
        const { _id } = args;
        delete args._id;
        const location = await ctx.Location.findByIdAndUpdate(_id, args);
        return location;
    },
    newUser: async (parent, args, ctx, info) => {
        if(!ctx.req.userId) {
            throw new Error("Log in is required")
        }
        matchPassword(args);
        const password = await bcrypt.hash(args.password, 10);
        return ctx.User.create({
            ...args,
            password
        });
    },
    updateUser: async (parent, args, ctx, info) => {
        if(!ctx.req.userId) {
            throw new Error("Log in is required")
        }
        const user = await ctx.User.findById(args._id);
        user.active = !user.active;
        return user.save();
    },
    editUser: async (parent, args, ctx, info) => {
        if(!ctx.req.userId) {
            throw new Error("Log in is required")
        }
        const { _id } = args;
        delete args._id;
        const user = await ctx.User.findByIdAndUpdate(_id, args);
        return user;
    },
    changeUserPass: async (parent, args, ctx, info) => {
        if(!ctx.req.userId) {
            throw new Error("Log in is required")
        }
        matchPassword(args);
        const user = await ctx.User.findById(args._id);
        const password = await bcrypt.hash(args.password, 10);
        user.password = password;
        return user.save();
    },
    signIn: async (_, {username, password}, ctx, info) => {
        let user = await ctx.User.findOne({ username });
        if(!user) {
            throw new Error("The login information provided is incorrect");
        }
        const valid = await bcrypt.compare(password, user.password);
        if(!valid) {
            throw new Error("The login information provided is incorrect");
        }
        
        const token = jwt.sign({
            userId: user._id
        }, process.env.APP_SECRET);
        
        user.lastLogin = new Date();
        user = await user.save(); 

        ctx.res.cookie('token', token, {
            httpOnly: true,
            maxAge: 1000 * 60 * 60  //1hour cookie
        });
        return user;
    }
}

module.exports = Mutation