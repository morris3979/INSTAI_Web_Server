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

    httpsServer.listen(httpsPort, () => console.log(`=> https server listening on port ${httpsPort}!`));
}