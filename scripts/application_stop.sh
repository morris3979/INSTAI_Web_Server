#!/bin/bash
#Stopping existing node servers
echo "Stopping any existing node servers"
pkill node

cd ~
pm2 delete all