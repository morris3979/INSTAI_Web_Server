const path = require('path');
// const awsIot = require('aws-iot-device-sdk');

// const jobs = awsIot.jobs({
//     keyPath: path.resolve(__dirname, '../../certs/private.pem.key'),
//     certPath: path.resolve(__dirname, '../../certs/certificate.pem.crt'),
//     caPath: path.resolve(__dirname, '../../certs/AmazonRootCA1.pem'),
//     clientId: 'lab321_carview',
//         host: 'a1pxy4ej19lukk-ats.iot.us-east-1.amazonaws.com',
// });

// jobs.on('connect', async function() {
//     console.log('Connect AWS IOT Server Success ...');
//     jobs.subscribe(topicHouse2);
//     jobs.publish(topicHouse1, JSON.stringify(Data));
//     // console.log('Message send successfully ...');
// });

// jobs
// .on('message', function(topic, payload) {
//     console.log('message', topic, payload.toString());
// });


// class IotController {
//     static async publish(req, res) {
//         jobs.on('connect', function(topic, payload) {
//             jobs.publish(topicHouse1, JSON.stringify(Data));
//             console.log('message', topic, payload.toString(Data));

//             return res.status(200).json({
//                 message: 'Message send successfully ...',
//             });
//         });
//     }
// }

const AWS = require('aws-sdk');
const iotData = new AWS.IotData({ endpoint: "a1pxy4ej19lukk-ats.iot.us-east-1.amazonaws.com" });

const topicHouse1 = "send_topic";
const topicHouse2 = "receive_topic";

const deviceData = {
    serialNumber: "0x0001",
    device: "AAA-0001",
    type: "MyIoTDevice",
    message: {}
}
const Data = {
    ...deviceData,
    message: 'update module ...'
}

exports.publish = (event, context, callback) => {
    console.log("found iotData",iotData);

    const params = {
        topic: topicHouse1,
        payload: Data,
        qos: 1
    };

    return iotData.publish(params, function(err, data){
        if(err){
            console.log("Error occurred : ",err);
        }
        else{
            console.log("Success ...", data);
        }
    });
};
