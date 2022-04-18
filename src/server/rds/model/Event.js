class Event {
    constructor(id, startingTime, gpsState, speed, stayTime, position, CarNumber, Details) {
        this.id = id;
        this.startingTime = startingTime;
        this.gpsState = gpsState;
        this.speed = speed;
        this.stayTime = stayTime;
        this.position = position;
        this.CarNumber = CarNumber;
        this.Details = Details;
    }
}

module.exports = { Event }