const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(__dirname + '/public'));
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));

const db = require('./app/models');
db.sequelize.sync();

require('./app/routes/account.routes')(app);
require('./app/routes/user.routes')(app);
require('./app/routes/group.routes')(app);
require('./app/routes/goal.routes')(app);

const port = process.env.NODE_ENV === 'production' ? process.env.PORT : 3000;
app.listen(port, () => {
  console.log('Server listening on port ' + port);
});