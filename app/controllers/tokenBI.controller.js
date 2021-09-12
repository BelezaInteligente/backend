const request = require('request');
const config = require('../../config/tokenBI.config.js');

const getAccessToken = function () {

  return new Promise(function (resolve, reject) {

    const url = 'https://login.windows.net/common/oauth2/token';

    const username = config.usernameBI;
    const password = config.passwordBI;
    const clientId = config.clientIDAzure;
    const clientSecret = config.clientSecretAzure;

    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded'
    };

    const formData = {
      grant_type: 'password',
      scope: 'openid',
      client_id: clientId,
      username: username,
      password: password,
      resource: 'https://analysis.windows.net/powerbi/api',
      client_secret: clientSecret
    };

    request.post({
      url: url,
      form: formData,
      headers: headers
    }, function (err, result, body) {
      if (err) return reject(err);
      const bodyObj = JSON.parse(body);
      resolve(bodyObj.access_token);
    });
  });
};

module.exports = {
  embedReport: function (req, res) {
    getAccessToken().then(function (accessToken) {
      res.status(200).json({
        'embedToken': accessToken,
      });

    }).catch(function (err) {
      res.status(500).send(err);
    });
  }
};