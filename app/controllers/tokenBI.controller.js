const request = require('request');
const config = require('../../config/tokenBI.config.js');

const getAccessToken = function () {

  return new Promise(function (resolve, reject) {

    //const url = 'https://login.microsoftonline.com/common/oauth2/token'; EmbedToken PowerBI
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

// Function to get embedToken PowerBI
// const getReportEmbedToken = function (accessToken, groupId, reportId) {
//   return new Promise(function (resolve, reject) {
//     const url = 'https://api.powerbi.com/v1.0/myorg/groups/' + groupId + '/reports/' + reportId + '/GenerateToken';

//     const headers = {
//       'Content-Type': 'application/x-www-form-urlencoded',
//       'Authorization': 'Bearer ' + accessToken
//     };

//     const formData = {
//       'accessLevel': 'view'
//     };

//     request.post({
//       url: url,
//       form: formData,
//       headers: headers

//     }, function (err, result, body) {
//       if (err) return reject(err);
//       const bodyObj = JSON.parse(body);
//       resolve(bodyObj.token);
//     });
//   });
// };

module.exports = {
  embedReport: function (req, res) {
    getAccessToken().then(function (accessToken) {
      res.status(200).json({
        'embedToken': accessToken,
      });
      // Function to get embedToken PowerBI
      // getReportEmbedToken(accessToken, req.params.groupId, req.params.reportId).then(function (embedToken) {
      //   console.log('accessToken: ' + accessToken);
      //   console.log('groupId: ' + req.params.groupId);
      //   console.log('reportId: ' + req.params.reportId);
      //   console.log('accessToken: ' + embedToken);
      //   res.status(200).json({
      //     'reportId': req.params.reportId,
      //     'embedToken': embedToken,
      //     'embedUrl': 'https://app.powerbi.com/reportEmbed?reportId=' + req.params.reportId + '&groupId=' + req.params.groupId
      //   });
      // }).catch(function (err) {
      //   res.status(500).send(err);
      // });
    }).catch(function (err) {
      res.status(500).send(err);
    });
  }
};