exports.connect = () => {
    const net = require('net'); // nodejs tcp
    const tcpPort = process.env.TCP_PORT;
    const tcpServer = net.createServer();

    // tcp server connection
    tcpServer.on('connection', function (socket) {
        const remoteAddress = socket.remoteAddress + ':' + socket.remotePort;
        console.log('server: new client connection is made %s', remoteAddress);
        tcpServer.getConnections(function (err, count) {
            console.log("The number of currently connection is: " + count);
        });

        socket.on("data", function (d) {
            console.log('Data from %s: %s', remoteAddress, d);
        });

        socket.write(readlineSync.question("Enter data to send: "));

        socket.once("close", function () {
            console.log("Connection from %s closed", remoteAddress);
            tcpServer.getConnections(function (err, count) {
                console.log("The number of currently connection is: " + count);
            });
        })

        socket.on("error", function (err) {
            console.log('Connection %s error: %s', remoteAddress, err.message);
        });
    })

    tcpServer.listen(tcpPort, () => console.log(`=> tcp server listening on port ${tcpPort}!`));
}