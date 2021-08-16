const express = require('express');
const helmet = require('helmet');

const app = express();

const ninetyDaysInSeconds = 90*24*60*60

app.use(helmet());
app.use(helmet({
  frameguard: {         // configure
    action: 'deny'
  },
  contentSecurityPolicy: {    // enable and configure
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ['trusted-cdn.com'],
    }
  },
  dnsPrefetchControl: false     // disable
}))
app.use(helmet.noCache());

module.exports = app;
const api = require('./server.js');
app.use(express.static('public'));
app.disable('strict-transport-security');
app.use('/_api', api);
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});
let port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Your app is listening on port ${port}`);
});
