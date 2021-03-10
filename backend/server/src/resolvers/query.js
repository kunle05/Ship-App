const Query = {
    locations: async (_, args, ctx, info) => {
        return ctx.Location.find({...args});
    },
    location: async (_, args, ctx, info) => {
        return ctx.Location.findById(args._id);
    },
    users: async (_, args, ctx, info) => {
        return ctx.User.find().populate({
            path: 'location'
        });
    }
}

module.exports = Query