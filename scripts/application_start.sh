#!/bin/bash

# give permission for everything in the my_project directory
sudo chmod -R 777 /home/ec2-user/my_project

#navigate into our working directory where we have all our github files
cd /home/ec2-user/my_project

# add npm and node to path
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # loads nvm bash_completion (node is in path now)

# install node modules
npm install

# stop and clean
pm2 stop all
pm2 delete all
# start our node app in the background
pm2 start npm --name my_project -- start
