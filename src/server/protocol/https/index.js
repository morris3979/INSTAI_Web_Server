exports.connect = (app) => {
    const https = require('https'); // nodejs https
    const httpsPort = process.env.HTTPS_PORT;
    const fs = require('fs');

    const privateKey = fs.readFileSync(__dirname + '/ssl/privatekey.pem');
    const certificate = fs.readFileSync(__dirname + '/ssl/certificate.pem');
    const credentials = {
        key: privateKey,
        cert: certificate
    };
    const httpsServer = https.createServer(credentials, app);

    const socketIo = require('socket.io')
    const io = socketIo(httpsServer, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"],
            credentials: true
        }
    })

    io.on('connection', (socket) => {
        console.log('client connected: ', socket.id)
        socket.join('room')
        socket.on('disconnect', (reason) => {
          console.log(reason)
        })
    })

    setInterval(() => {
        io.to('room').emit('time', new Date().toLocaleString('zh-TW', {timeZone: 'Asia/Taipei'}))
    }, 1000)

    httpsServer.listen(httpsPort, () => console.log(`=> https server listening on port ${httpsPort}!`));
}