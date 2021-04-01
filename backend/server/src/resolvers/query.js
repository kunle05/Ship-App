const jwt = require('jsonwebtoken');
const { hasPermission } = require("../utils")

const Query = {
    locations: async (_, args, ctx, info) => {
        const { active, skip, limit } = args;
        if(active) {
            return ctx.Location.find({ active });
        }
        return ctx.Location.find().skip(skip).limit(limit);
    },
    location: async (_, args, ctx, info) => {
        if(!ctx.req.userId) {
            throw new Error("Log in is required")
        }
        const admin = await ctx.User.findById(ctx.req.userId);
        if(!hasPermission(admin)) {
            throw new Error("You do not have the required permission to view this page")
        }
        return ctx.Location.findById(args._id);
    },
    users: async (_, args, ctx, info) => {
        if(!ctx.req.userId) {
            throw new Error("Log in is required")
        }
        const admin = await ctx.User.findById(ctx.req.userId);
        if(!hasPermission(admin)) {
            throw new Error("You do not have the required permission to view this page")
        }
        return ctx.User.find().populate({
            path: 'location'
        }).skip(args.skip).limit(args.limit).sort('username');
    },
    user: async (_, args, ctx, info) => {
        if(!ctx.req.userId) {
            throw new Error("Log in is required")
        }
        const admin = await ctx.User.findById(ctx.req.userId);
        if(!hasPermission(admin)) {
            throw new Error("You do not have the required permission to view this page")
        }
        return ctx.User.findById(args._id).populate({
            path: 'location'
        });
    },
    me: async (_, args, ctx, info) => {
        if(!ctx.req.userId) {
            return null;
        }
        return ctx.User.findById(ctx.req.userId).populate({
            path: 'location'
        });
    },
    count: async (_, args, ctx, info) => {
        if(args.sender == "locations") {
            return ctx.Location.countDocuments();
        }
        if(args.sender == "users") {
            return ctx.User.countDocuments();
        }
    },
    weeklyPackages: async (_, args, ctx, info) => {
        if(!ctx.req.userId) {
            throw new Error("Log in is required")
        }
        const { origin } = args;

        return ctx.Package.find({
            origin, 
            createdAt: { $gte: new Date(new Date() - 7 * 60 * 60 * 24 * 1000) }
        }).sort('-createdAt');
    },
}

module.exports = Query