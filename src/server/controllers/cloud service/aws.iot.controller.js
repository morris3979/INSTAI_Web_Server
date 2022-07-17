const AWS = require('aws-sdk');
require('dotenv').config();

const iotData = new AWS.IotData({
    endpoint: "a1pxy4ej19lukk-ats.iot.us-east-1.amazonaws.com",
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const topicHouse1 = "send_topic";
const params = {
    topic: topicHouse1,
    payload: JSON.stringify("Data"),
    qos: 1
};

exports.publish = () => {
    iotData.publish(params, function(err, data){
        if(err){
            // console.log("Error occurred : ", err, err.stack);
            return err;
        } else {
            // console.log("Connect to AWS IOT Success ...", data);
            return data;
        }
    });
};
