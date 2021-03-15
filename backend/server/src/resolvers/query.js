const { hasPermission } = require("../../../utils");

const Query = {
    locations: async (_, args, ctx, info) => {
        return ctx.Location.find({...args});
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
        });
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
    }

}

module.exports = Query