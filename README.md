# CarView Project from NTUT Lab321
#
## 1. With [npm](https://npmjs.org/) installed, run

```shell
npm install
```
#
## 2. Run and Start

```shell
npm start
```


```shell
http://localhost:8080/
```

#
## 3. AWS <--> Aliyun

```shell
client
│
└───component
│   │
│   └───reportPage
│       │   modelA.js
│       │   modelB.js
│       │   modelC.js
│
└───store
│   │   actionCreater.js
│
server
│
└───controllers
│   │
│   └───storage service
│       │   aliyun.oss.controller.js
│       │   aws.s3.controller.js
│
└───rds
│   │
│   └───entity
│   │   │   CarNumberSchema.js
│   │
│   └───index.js
│
│   ...
```