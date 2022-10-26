#!/bin/bash

# Stop all servers and start the server as a daemon
sudo forever stopall
sudo pkill -f nodejs
sudo npm start