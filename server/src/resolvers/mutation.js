const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const cryptoRandomString = require('crypto-random-string');
const { matchPassword, hasPermission }= require("../utils");
const { transport, makeEmail } = require('../mail');

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

        user.lastLogin = Date.now();
        user = await user.save(); 

        const token = jwt.sign({
            userId: user._id,
        }, process.env.APP_SECRET);
        
        ctx.res.cookie('token', token, {
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 3  //3hour cookie
        });
        return user;
    },
    signOut: (_, args, ctx, info) => {
        ctx.res.clearCookie('token');
        return { message: "You have successfully signed out"}
    },
    requestReset: async (_, { email }, ctx, info) => {
        let user = await ctx.User.findOne({ email });
        if(!user) {
            throw new Error("Couldn't find your email account");
        }

        let resetToken = await crypto.randomBytes(20).toString('hex');

        user.resetTokenExpiry = Date.now() + 3600000;  //1hr from now
        user.resetToken = resetToken;
        await user.save();

        const link = `${process.env.FRONTEND_URL}/admin/resetpassword?resetToken=${resetToken}`;

        const mailRes = await transport.sendMail({
            from: 'noreply@shipsafe.com',
            to: user.email,
            subject: 'Password Reset Request',
            html: makeEmail(user.email, link, process.env.FRONTEND_URL)
        });
        return {message: "Token set"};
    },
    resetPassword: async (_, args, ctx, info) => {
        const { token } = args;
        if(!token) {
            throw new Error("Token is either invalid or expired!");
        }
        matchPassword(args);
        const [user] = await ctx.User.where('resetToken', token).where('resetTokenExpiry').gte(Date.now());
        if(!user) {
            throw new Error("Token is either invalid or expired!");
        }
        const password = await bcrypt.hash(args.password, 10);
        user.password = password;
        user.resetToken = null;
        user.resetTokenExpiry = null; 
        await user.save();
        return {message: "Reset Succesful"};
    },
    newPackage: async (_, args, ctx, info) => {
        if(!ctx.req.userId) {
            throw new Error("Log in is required")
        }
        const { origin, items } = args;
        let amount = 0;

        const weight = items.reduce((tally, item) => {
            item.status = [{
                user: ctx.req.userId
            }]
            return tally + item.weight;
        }, 0);

        const originLoc = await ctx.Location.findById(origin);
        if(!originLoc) {
            throw new Error("Shipment origin is required");
        }
        if(originLoc.city.includes('NG')) {
            amount = weight * +process.env.NGN_RATE
        } else {
            amount = weight * +process.env.USD_RATE
        }
        const tracking = cryptoRandomString({length: 16, type: 'alphanumeric'}).toUpperCase();

        const package = new ctx.Package(args);
        package.items = items;
        package.amount = amount;
        package.tracking = tracking;
        const res = await package.save()
        return res;
    }
}

module.exports = Mutation