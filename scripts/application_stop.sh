#!/bin/bash

# Stop all servers and start the server as a daemon
# sudo forever stopall
npm uninstall -g pm2
echo "Stopping any existing node servers"
pkill node