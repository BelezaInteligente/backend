const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const app = express();
const originURL = process.env.NODE_ENV === 'production' ? process.env.BASE_URL : 'http://localhost:3000';

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(__dirname + '/public'));
app.use(cors({ credentials: true, origin: originURL }));

const db = require('./app/models');
db.sequelize.sync();

require('./app/routes/account.routes')(app);
require('./app/routes/user.routes')(app);
require('./app/routes/group.routes')(app);
require('./app/routes/goal.routes')(app);

app.route('/*').get(function (req, res) {
  return res.sendFile(path.join(__dirname, 'public/index.html'));
});

const port = process.env.NODE_ENV === 'production' ? process.env.PORT : 3000;
app.listen(port, () => {
  console.log('Server listening on port ' + port);
});