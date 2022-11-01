#!/bin/bash

# Stop all servers and start the server as a daemon
sudo forever stopall
sudo pkill -f nodejs
sudo pm2 stop all
sudo pm2 delete all

sudo pm2 start npm -- start