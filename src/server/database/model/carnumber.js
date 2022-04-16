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

module.exports = { CarNumber }