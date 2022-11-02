#!/bin/bash

# Stop all servers and start the server as a daemon
# sudo forever stopall
echo "Stopping any existing node servers"
sudo pkill -f node
sudo pm2 stop all
sudo pm2 delete all
