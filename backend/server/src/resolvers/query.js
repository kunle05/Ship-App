const Query = {
    locations: async (_, args, ctx, info) => {
        return ctx.Location.find({...args});
    },
    location: async (_, args, ctx, info) => {
        if(!ctx.req.userId) {
            throw new Error("Log in is required")
        }
        return ctx.Location.findById(args._id);
    },
    users: async (_, args, ctx, info) => {
        if(!ctx.req.userId) {
            throw new Error("Log in is required")
        }
        return ctx.User.find().populate({
            path: 'location'
        });
    },
    user: async (_, args, ctx, info) => {
        if(!ctx.req.userId) {
            throw new Error("Log in is required")
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