const Mutation = {
    newLocation: (parent, args, ctx, info) => {
        return ctx.Location.create({
            ...args
        });
    },
    updateLocation: async (parent, args, ctx, info) => {
        const location = await ctx.Location.findById(args._id);
        location.active = !location.active;
        return location.save();
    },
    editLocation: async (parent, args, ctx, info) => {
        const { _id } = args;
        delete args._id;

        const location = await ctx.Location.findByIdAndUpdate(_id, args);
        return location;
    },
    newUser: (parent, args, ctx, info) => {
        return ctx.User.create({
            ...args
        })
    },
    updateUser: async (parent, args, ctx, info) => {
        const user = await ctx.User.findById(args._id);
        user.active = !user.active;
        return user.save();
    },
    editUser: async (parent, args, ctx, info) => {
        const { _id } = args;
        delete args._id;

        const user = await ctx.User.findByIdAndUpdate(_id, args);
        return user;
    }
}

module.exports = Mutation