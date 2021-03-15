function matchPassword(args) {
    const { password, confirmPassword } = args;
    if(password !== confirmPassword) {
        throw new Error("Passwords do not match")
    }
}

function hasPermission(user, level="ADMIN") {
    return user.permissions.includes(level);
}

module.exports = { matchPassword, hasPermission };