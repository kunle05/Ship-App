const Mutation = {
    newLocation: (parent, args, ctx, info) => {
        return ctx.Location.create({
            ...args
        });
    },
    newUser: (parent, args, ctx, info) => {
        return ctx.User.create({
            ...args
        })
    }
}

module.exports = Mutation