exports.connect = (app) => {
    const socketIo = require('socket.io')
    const http = require('http'); // nodejs http
    const httpPort = process.env.HTTP_PORT;
    const httpServer = http.createServer(app);
    const io = socketIo(httpServer,{
        cors: {
          origin: 'http://localhost:3000'
        }
    })
    io.on('connection', (socket)=>{
        console.log('client connected: ',socket.id)

        socket.on('disconnect',(reason)=>{
          console.log(reason)
        })
    })

    httpServer.listen(httpPort, () => console.log(`=> http server listening on port ${httpPort}!`));
}