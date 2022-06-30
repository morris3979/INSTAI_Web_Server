const { getConnection } = require("../rds/index");
const { User } = require("../rds/model/User");

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

async function register (username, password) {
    const connection = await getConnection();
    const existedUser = await connection.getRepository(User).findOne({
        username: username,
    });
    const encryptedPassword = bcrypt.hashSync(password, 10);
    if (!(username && password)) {
        const tryAgain = "All input is required";
        return tryAgain;
    }
    if (existedUser) {
        const userExisted = "User Already Exist. Please Login";
        return userExisted;
    }
    const users = new User();
    const token = jwt.sign({ _id: users.id, username },
        process.env.TOKEN_KEY, {
            expiresIn: "2h",
        }
    );
    users.username = username;
    users.password = encryptedPassword;
    users.token = token;
    await connection.getRepository(User).save(users);
    connection.close();
    // return new user
    return users;
}

async function login (username, password) {
    if (!(username && password)) {
        const isRequired = "All input is required";
        return isRequired;
    }
    const connection = await getConnection();
    const user = await connection.getRepository(User).findOne({
        username: username,
    });
    const comparePwd = await bcrypt.compareSync(password, user.password);
    const mode = user.admin || user.authA || user.authB || user.authC;
    if (user && comparePwd && (mode == true)) {
        const token = jwt.sign({ _id: user.id, username },
            process.env.TOKEN_KEY, {
                expiresIn: "2h",
            }
        );
        user.token = token;
        await connection.getRepository(User).save(user);
        connection.close();
        return user;
    }
    const invalidCredentials = "Invalid Credentials";
    return invalidCredentials;
}

async function getUser () {
    const connection = await getConnection();
    const userRepo = connection.getRepository(User);
    const users = await userRepo.find();
    connection.close();
    return users;
}

async function patchUser (id, username, admin, authA, authB, authC) {
    const connection = await getConnection();
    const user = await connection.getRepository(User).findOne(id);
    // const encryptedPassword = await bcrypt.hashSync(password, 10);
    if (!user) {
        const notFound = "Not Found";
        return notFound;
    }
    // if (username) {
    //   user.username = username;
    // }
    // if (encryptedPassword) {
    //   user.password = encryptedPassword;
    // }
    if (admin) {
        user.admin = admin;
    }
    if (authA) {
        user.authA = authA;
    }
    if (authB) {
        user.authB = authB;
    }
    if (authC) {
        user.authC = authC;
    }
    const token = jwt.sign({ users_id: user._id, username },
        process.env.TOKEN_KEY, {
            expiresIn: "2h",
        }
    );
    user.token = token;
    await connection.getRepository(User).save(user);
    connection.close();
    return user;
}

async function deleteUser (id) {
    const connection = await getConnection();
    const userRepo = connection.getRepository(User);
    const findAdmin = await userRepo.findOne(id);
    if (findAdmin.admin == false) {
        const deletedUser = await userRepo.softDelete(id);
        connection.close();
        //return new list
        return deletedUser;
    }
    const forbidden = "Forbidden";
    return forbidden;
}

module.exports =  { register, login, getUser, patchUser, deleteUser }