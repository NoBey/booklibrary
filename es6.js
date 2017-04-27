require("babel-register")
require("babel-polyfill")
require('./ts')

// 此文件测试es6使用

// server {
// 	listen 3002;
// 	server_name localhost;
//   location / {
// 		proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
// 		proxy_pass http://127.0.0.1:3001;
// 	}
//   location /api {
//   	proxy_pass http://127.0.0.1:3000;
// 	}
// }
