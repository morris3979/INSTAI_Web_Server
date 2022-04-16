class User {
    constructor(id, username, password, admin, authA, authB, authC, token) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.admin = admin;
        this.authA = authA;
        this.authB = authB;
        this.authC = authC;
        this.token = token;
    }
}

module.exports = { User }