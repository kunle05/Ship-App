const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { matchPassword, hasPermission }= require("../../../utils");

const Mutation = {
    newLocation: async (parent, args, ctx, info) => {
        if(!ctx.req.userId) {
            throw new Error("Log in is required")
        }
        const admin = await ctx.User.findById(ctx.req.userId);
        if(!hasPermission(admin)) {
            throw new Error("You got caught!!")
        }
        return ctx.Location.create({
            ...args
        });
    },
    updateLocation: async (parent, args, ctx, info) => {
        if(!ctx.req.userId) {
            throw new Error("Log in is required")
        }
        const admin = await ctx.User.findById(ctx.req.userId);
        if(!hasPermission(admin)) {
            throw new Error("You got caught!!")
        }
        const location = await ctx.Location.findById(args._id);
        location.active = !location.active;
        return location.save();
    },
    editLocation: async (parent, args, ctx, info) => {
        if(!ctx.req.userId) {
            throw new Error("Log in is required")
        }
        const admin = await ctx.User.findById(ctx.req.userId);
        if(!hasPermission(admin)) {
            throw new Error("You got caught!!")
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
        const admin = await ctx.User.findById(ctx.req.userId);
        if(!hasPermission(admin)) {
            throw new Error("You got caught!!")
        }
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
        const admin = await ctx.User.findById(ctx.req.userId);
        if(!hasPermission(admin)) {
            throw new Error("You got caught!!")
        }
        const user = await ctx.User.findById(args._id);
        user.active = !user.active;
        return user.save();
    },
    editUser: async (_, args, ctx, info) => {
        if(!ctx.req.userId) {
            throw new Error("Log in is required")
        }
        const { _id } = args;
        if(ctx.req.userId != _id) {
            const admin = await ctx.User.findById(ctx.req.userId);
            if(!hasPermission(admin)) {
                throw new Error("You got caught!!")
            }
        }
        delete args._id;
        const user = await ctx.User.findByIdAndUpdate(_id, args);
        return user;
    },
    changeUserPass: async (_, args, ctx, info) => {
        if(!ctx.req.userId) {
            throw new Error("Log in is required")
        }
        matchPassword(args);
        if(ctx.req.userId != args._id) {
            const admin = await ctx.User.findById(ctx.req.userId);
            if(!hasPermission(admin)) {
                throw new Error("You got caught!!")
            }
        }
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

        user.lastLogin = new Date();
        user = await user.save(); 
        
        const token = jwt.sign({
            userId: user._id,
            lastLogin: user.lastLogin
        }, process.env.APP_SECRET);
        

        ctx.res.cookie('token', token, {
            httpOnly: true,
            maxAge: 1000 * 60 * 60  //1hour cookie
        });
        return user;
    },
    signOut: (_, args, ctx, info) => {
        ctx.res.clearCookie('token');
        return { message: "You have successfully signed out"}
    }

}

module.exports = Mutation