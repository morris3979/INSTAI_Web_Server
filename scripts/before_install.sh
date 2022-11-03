#!/bin/bash

# download node and npm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash
. ~/.nvm/nvm.sh
sudo nvm install node

# create our working directory if it doesnt exist
DIR="/home/ec2-user/my_project"
sudo rm -rf ${DIR}

if [ -d "$DIR" ]; then
  echo "${DIR} exists"
else
  echo "Creating ${DIR} directory"
  sudo mkdir ${DIR}
fi