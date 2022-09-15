exports.connect = (app) => {
    const http = require('http'); // nodejs http
    const httpPort = process.env.HTTP_PORT;
    const httpServer = http.createServer(app);

    httpServer.listen(httpPort, () => console.log(`=> http server listening on port ${httpPort}!`));
}