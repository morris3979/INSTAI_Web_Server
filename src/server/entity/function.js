const { getConnection } = require("./db_config");
const { User, CarNumber, Details } = require("./db_constructor");

//Users--------------------
async function getUsers() {
    const connection = await getConnection();
    const userRepo = connection.getRepository(User);
    const users = await userRepo.find();
    connection.close();
    return users;
}

async function insertUser(id, username, password, administrator, pageA, pageB, pageC) {
    const connection = await getConnection();
    //create
    const users = new User();
    users.id = id;
    users.username = username;
    users.password = password;
    users.administrator = administrator;
    users.pageA = pageA;
    users.pageB = pageB;
    users.pageC = pageC;
    //save
    const userRepo = connection.getRepository(User);
    console.log("user", User);
    const res = await userRepo.save(users);
    console.log("save", res);
    //return new list
    const allUsers = await userRepo.find();
    connection.close();
    return allUsers;
}

//CarNumber--------------------
async function getCarNumbers() {
    const connection = await getConnection();
    const carnumberRepo = connection.getRepository(CarNumber);
    const carnumbers = await carnumberRepo.find();
    connection.close();
    return carnumbers;
}

async function insertCarNumber(id, boardId, modelName, version, plateNumber) {
    const connection = await getConnection();
    //create
    const carnumber = new CarNumber();
    carnumber.id = id;
    carnumber.boardId = boardId;
    carnumber.modelName = modelName;
    carnumber.version = version;
    carnumber.plateNumber = plateNumber;
    //save
    const carnumberRepo = connection.getRepository(CarNumber);
    const res = await carnumberRepo.save(carnumber);
    console.log("save", res);
    //return new list
    const allCarnumbers = await carnumberRepo.find();
    connection.close();
    return allCarnumbers;
}

//Details--------------------
async function getDetails() {
    const connection = await getConnection();
    const detailRepo = connection.getRepository(Details);
    const details = await detailRepo.find();
    connection.close();
    return details;
}

async function insertDetail(id, startingTime, gpsState, speed, stayTime, position) {
    const connection = await getConnection();
    //create
    const details = new Details();
    details.id = id;
    details.startingTime = startingTime;
    details.gpsState = gpsState;
    details.speed = speed;
    details.stayTime = stayTime;
    details.position = position;
    //save
    const detailRepo = connection.getRepository(Details);
    const res = await detailRepo.save(details);
    console.log("save", res);
    //return new list
    const allDetails = await detailRepo.find();
    connection.close();
    return allDetails;
}

module.exports = { getUsers, insertUser, getCarNumbers, insertCarNumber, getDetails, insertDetail };