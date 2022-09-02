const readlineSync = require('readline-sync');
const net = require('net');

const Host = '127.0.0.1';
const Port = 8124;

var client = null;

function OpenConnection() {
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

function SendData(data) {
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

function CloseConnection() {
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

function menu() {
    const lineRead = readlineSync.question("\n\nEnter option (1-Open, 2-Send, 3-Close, 4-Quit): ");

    switch (lineRead) {
        case "1":
            OpenConnection();
            break;
        case "2":
            const data = readlineSync.question("Enter data to send: ");
            SendData(data);
            break;
        case "3":
            CloseConnection();
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

setTimeout(function () {
    menu();
}, 0);