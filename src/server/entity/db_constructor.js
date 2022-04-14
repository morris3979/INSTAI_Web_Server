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

class CarNumber {
    constructor(id, boardId, modelName, version, plateNumber, accessKey, secretKey) {
        this.id = id;
        this.boardId = boardId;
        this.modelName = modelName;
        this.version = version;
        this.plateNumber = plateNumber;
        this.accessKey = accessKey;
        this.secretKey = secretKey;
    }
}

class Event {
    constructor(id, startingTime, gpsState, speed, stayTime, position, CarNumber) {
        this.id = id;
        this.startingTime = startingTime;
        this.gpsState = gpsState;
        this.speed = speed;
        this.stayTime = stayTime;
        this.position = position;
        this.CarNumber = CarNumber;
    }
}

class Details {
    constructor(id, event, Event) {
        this.id = id;
        this.event = event;
        this.Event = Event;
    }
}

module.exports = { User, CarNumber, Event, Details }