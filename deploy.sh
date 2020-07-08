docs_path="/usr/local/src/nginx-1.12.2/html/e-admin-docs"

# git pull

npm install

npm run api

rm -rf $docs_path

cp -a ./public/docs $docs_path

pm2 startOrRestart ecosystem.config.js --env production