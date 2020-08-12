const config = require('../../config/default.config.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const crypto = require("crypto");
const sendEmail = require('../helpers/send-email');
const db = require("../models");
const Account = db.user;

module.exports = {
  authenticate,
  forgotPassword,
  resetPassword,
};

async function authenticate({ email, password }) {
  const account = await Account.findOne({ where: { email: email } });

  if (!account || !account.active || !bcrypt.compareSync(password, account.password)) {
    throw 'Email ou senha incorretos ou usuário inativo.';
  }

  // authentication successful so generate jwt and refresh tokens
  const accessJwtToken = generateJwtToken(account);

  return {
    ...basicDetails(account),
    accessJwtToken,
  };
};

async function forgotPassword(email) {
  const account = await Account.findOne({ where: { email: email } });

  if (!account) return;

  const user = await Account.findByPk(account.id)

  account.resetToken = randomTokenString();

  Object.assign(user, account);
  await account.save();

  await sendPasswordResetEmail(account);

  return ('Email enviado!');
};

async function resetPassword(token, params) {
  const account = await Account.findOne({
    where: {
      resetToken: token,
      //updateAt: { $gte: Date.now() }
    }
  });

  if (!account) throw 'Token inválido!';

  const user = await Account.findByPk(account.id);

  account.password = hash(params.password);
  account.resetToken = null;

  Object.assign(user, account);
  await account.save();
}

// helper functions

function basicDetails(user) {
  const { id, name, firstName, lastName, email, role, active, resetToken } = user;
  return { id, name, firstName, lastName, email, role, active, resetToken };
};

function generateJwtToken(user) {
  // create a jwt token containing the account id that expires in 24 hours
  return jwt.sign({ id: user.id }, config.secret, { expiresIn: 86400 });
};

async function sendPasswordResetEmail(account) {
  let message;
  const resetUrl = `www.belezainteligente.app/account/resetpassword?token=${account.resetToken}`;
  message = `<p>Clique no link abaixo para gerar uma nova senha:</p>
                 <p><a href="${resetUrl}">${resetUrl}</a></p>`;

  await sendEmail({
    to: account.email,
    subject: 'Esqueci a senha',
    html: `<h4>Esqueci a senha</h4>
             ${message}`
  });
};

function randomTokenString() {
  return crypto.randomBytes(40).toString('hex');
};

function hash(password) {
  return bcrypt.hashSync(password, 10);
};