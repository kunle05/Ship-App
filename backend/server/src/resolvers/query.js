const Query = {
    locations: async (_, arg, ctx, info) => {
        return ctx.Location.find();
    },
    users: async (_, arg, ctx, info) => {
        return ctx.User.find().populate({
            path: 'location'
        });
    }
}

module.exports = Query