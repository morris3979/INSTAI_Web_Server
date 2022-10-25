#!/bin/bash

# Stop all servers and start the server as a daemon
forever stopall
pkill -f nodejs
npm start