class User {
    constructor(id, username, password, administrator, modelA, modelB, modelC, createAt, updateAt, deleteAt) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.administrator = administrator;
        this.modelA = modelA;
        this.modelB = modelB;
        this.modelC = modelC;
        this.createAt = createAt;
        this.updateAt = updateAt;
        this.deleteAt = deleteAt;
    }
}

class CarNumber {
    constructor(id, boardId, modelName, version, plateNumber, createAt, updateAt, deleteAt) {
        this.id = id;
        this.boardId = boardId;
        this.modelName = modelName;
        this.version = version;
        this.plateNumber = plateNumber;
        this.createAt = createAt;
        this.updateAt = updateAt;
        this.deleteAt = deleteAt;
    }
}

class Details {
    constructor(id, startingTime, gpsState, speed, event, position, createAt, updateAt, deleteAt) {
        this.id = id;
        this.startingTime = startingTime;
        this.gpsState = gpsState;
        this.speed = speed;
        this.event = event;
        this.position = position;
        this.createAt = createAt;
        this.updateAt = updateAt;
        this.deleteAt = deleteAt;
    }
}

module.exports = { User, CarNumber, Details }