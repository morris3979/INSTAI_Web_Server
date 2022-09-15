const AWS = require('aws-sdk');
require('dotenv').config();

const iotData = new AWS.IotData({
    endpoint: process.env.AWS_IOT_ENDPOINT,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

exports.publish = (topic, message) => {
    const params = {
        topic: topic,
        payload: JSON.stringify({message}),
        qos: 1
    };
    iotData.publish(params, function(err, data){
        if(err){
            // console.log("Error occurred : ", err, err.stack);
            return err;
        } else {
            // console.log("Data: ", data);
            return data;
        }
    });
};
