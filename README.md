pofresh-http
==================

Wrap express module as pofresh http tools.


[wiki][]
[wiki]: https://github.com/pofresh/pofresh-http/wiki

###How to use pofresh-http:

###Single server

For example, your http server name is gamehttp.

#####1. Create config/http.json, configure your http server
```js
{
  "development": {
    "gamehttp": {
      "host": "127.0.0.1",
      "port": 3001
    }
  }
}
```
If you want to support https, you should add more keys to config/http.json
```js
{
  "development": {
    "gamehttp": {
      "useSSL": true,
      "keyFile": "config/key.pem",
      "certFile": "config/cert.pem",
      "host": "127.0.0.1",
      "port": 3001
    }
  }
}
```
#####2. Change servers.json, add gamehttp config
```js
"gamehttp": [{
  "id": "gamehttp",
  "port": 3002,
  "host": "127.0.0.1"
}]
```
#####3. Change adminServer.json, add server type config
```js
{
  "type": "gamehttp",
  "token": "agarxhqb98rpajloaxn34ga8xrunpagkjwlaw3ruxnpaagl29w4rxn"
}
```
#####4. Change app.js
```js
const pofreshHttp = require('pofresh-http');
app.configure('development', 'gamehttp', () => {
  app.loadConfigBaseApp('httpConfig', 'config/http.json');
  app.use(pofreshHttp, {
    http: app.get('httpConfig')[app.getServerId()]
  });
});
```
#####5. Create app/servers/gamehttp/routers/testRoute.js
```js
module.exports = (app, express) => {
  const router = express.Router();
  
  router.get('/test', (req, res) => {
    res.send('test success')
  });
  
  return router;
};
```
#####6. Run your app and open url http://127.0.0.1:3001/test

###Server cluster

This example, we configure our http server as a server cluster, just have a little difference with the before example.

#####1. Create config/http.json, configure your http server
```js
{
  "development": {
    "gamehttp": {
      "isCluster": true,
      "host": "127.0.0.1",
      "port": "3001++"
    }
  }
}
```
If you want to support https, you should add more keys to config/http.json
```js
{
  "development": {
    "gamehttp": {
      "useSSL": true,
      "keyFile": "config/key.pem",
      "certFile": "config/cert.pem",
      "isCluster": true,
      "host": "127.0.0.1",
      "port": "3001++"
    }
  }
}
```
#####2. Change servers.json, add gamehttp config
```js
"gamehttp": [{
  "id": "gamehttp",
  "clusterCount": 2,
  "port": "3101++",
  "host": "127.0.0.1"
}]
```
#####3. Change adminServer.json, add server type config
```js
{
  "type": "gamehttp",
  "token": "agarxhqb98rpajloaxn34ga8xrunpagkjwlaw3ruxnpaagl29w4rxn"
}
```
#####4. Change app.js
```js
const pofreshHttp = require('pofresh-http');

app.configure('development', 'gamehttp', () => {
  app.loadConfigBaseApp('httpConfig', 'config/http.json');
  app.use(pofreshHttp, {
    http: app.get('httpConfig')[app.getServerType()]
  });
});
```
#####5. Create app/servers/gamehttp/routers/testRoute.js
```js
module.exports = (app, express) => {
  const router = express.Router();
  
  router.get('/test', (req, res) => {
    res.send('test success')
  });
  
  return router;
};
```
#####6. Run your app and open urls: http://127.0.0.1:3001/test, http://127.0.0.1:3002/test
#####7. Optional, you can use nginx or any other similar program to reverse proxy the http port, just google it!
