#!/bin/bash
#Stopping existing node servers
echo "Stopping any existing node servers"
pkill node
sudo pm2 stop all