# Smarthouse Backend
## Install application
Copy tarball
```
wget ....
unzip smarthouse-backend.zip
```
Install npm dependencies
```
cd smarthouse-backend
npm i
```
## Run application in managed mode (with PM2)

Install pm2 and install/configure pm2-logrotate
```
npm run setup
```
Start application
```
npm run on
```

Stop application and delete it from pm2 managed service
```
npm run off
```
## Run application
Run for production
```
npm start
```
Run for production with debug enabled
```
npm run debug
```
Run for development with debug enabled (for windows)
```
npm run devwin
```
Run for development with debug enabled (for linux)
```
npm run devlin
```