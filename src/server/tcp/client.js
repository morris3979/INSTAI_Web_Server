const readlineSync = require('readline-sync');
const net = require('net');

const Host = readlineSync.question("Enter server host: "); // '127.0.0.1'; // set tcp/ip
const Port = readlineSync.question("Enter server port: "); // 8000; // set server port

var client = null;

async function OpenConnection() {
    if (client) {
        console.log("--Connection is already open--")
        setTimeout(function () {
            menu();
        }, 0);
        return;
    }
    client = new net.Socket();

    client.on("error", function (err) {
        client.destroy();
        client = null;
        console.log("ERROR: Connection could not be opened. Msg: %s", err.message);
        setTimeout(function () {
            menu();
        }, 0);
    });

    client.on("data", function (data) {
        console.log("Received: %s", data);
        setTimeout(function () {
            menu();
        }, 0);
    });

    client.connect(Port, Host, function () {
        console.log("Connection Successfully!");
        setTimeout(function () {
            menu();
        }, 0);
    });
    setTimeout(function () {
        menu();
    }, 0);
}

async function SendData(data) {
    if (!client) {
        console.log("--Connection is not open or closed--");
        setTimeout(function () {
            menu();
        }, 0);
        return;
    }

    client.write(data);
    setTimeout(function () {
        menu();
    }, 0);
}

async function CloseConnection() {
    if (!client) {
        console.log("--Connection is not open or closed--");
        setTimeout(function () {
            menu();
        }, 0);
        return;
    }

    client.destroy();
    client = null;
    console.log("Connection closed Successfully!");
    setTimeout(function () {
        menu();
    }, 0);
}

async function menu() {
    const lineRead = readlineSync.question("\n\nEnter option (1-Open, 2-Send, 3-Close, 4-Quit): ");

    switch (lineRead) {
        case "1":
            await OpenConnection();
            break;
        case "2":
            const data = readlineSync.question("Enter data to send: ");
            await SendData(data);
            break;
        case "3":
            await CloseConnection();
            break;
        case "4":
            console.log("Quit!");
            break;
        default:
            setTimeout(function () {
                menu();
            }, 0);
            break;
    }
}

exports.client = () => {
    setTimeout(function () {
        menu();
    }, 0);
}