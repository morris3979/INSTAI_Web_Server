class User {
    constructor(id, username, password, administrator, modelA, modelB, modelC, token) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.administrator = administrator;
        this.modelA = modelA;
        this.modelB = modelB;
        this.modelC = modelC;
        this.token = token;
    }
}

class CarNumber {
    constructor(id, boardId, modelName, version, plateNumber) {
        this.id = id;
        this.boardId = boardId;
        this.modelName = modelName;
        this.version = version;
        this.plateNumber = plateNumber;
    }
}

class Details {
    constructor(id, startingTime, gpsState, speed, event, position) {
        this.id = id;
        this.startingTime = startingTime;
        this.gpsState = gpsState;
        this.speed = speed;
        this.event = event;
        this.position = position;
    }
}

module.exports = { User, CarNumber, Details }