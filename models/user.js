class User {
    constructor(username,password) {
        this.username = username;
        this.password = password;
    }
    static compare(user,newUser) {
        return (
          user.username === newUser.username &&
          user.password === newUser.password
        );
    }
}

module.exports = User;