function matchPassword(args) {
    const { password, confirmPassword } = args;
    if(password !== confirmPassword) {
        throw new Error("Passwords do not match")
    }
}

module.exports = matchPassword;