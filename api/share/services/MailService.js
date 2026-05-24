require('dotenv').config();
const { MailtrapClient } = require("mailtrap");

const TOKEN = process.env.MAIL_TOKEN;
const ENDPOINT = process.env.MAIL_ENDPOINT;
const FROM = process.env.MAIL_FROM;
const APP = process.env.MAIL_APP;
const sender = { email: FROM, name: APP };

const client = new MailtrapClient({ endpoint: ENDPOINT, token: TOKEN });

exports.sendMessage = async (userFrom, userTo, message) => {

  const recipients = [
    {
      email: userTo.email,
    }
  ];

  client
    .send({
      from: sender,
      to: recipients,
      subject: "Mensagem de "+userFrom.name,
      text: "Olá " + userTo.name + "! \nA seguinte mensagem foi enviada para você através do aplicativo "+APP+": \n\n"+message,
      category: "Welcome Email",
    })
    .then(function (results) {
      //console.log(results)
      return results.success;
    });

}

exports.sendCodeVerification = async (user) => {

  const recipients = [
    {
      email: user.email,
    }
  ];

  client
    .send({
      from: sender,
      to: recipients,
      subject: APP,
      text: "Olá " + user.name + "! Bem vindo ao " + APP + ". Use o código " + user.code + " para confirmar seu endereço de e-mail.",
      category: "Welcome Email",
    })
    .then(function (results) {
      //console.log(results)
      return results.success;
    });

}

exports.sendResetCode = async (user) => {

  const recipients = [
    {
      email: user.email,
    }
  ];

  client
    .send({
      from: sender,
      to: recipients,
      subject: APP,
      text: "Olá " + user.name + "! Se você solicitou a recuperação de senha no " + APP + ". Use o seguinte código: " + user.code,
      category: "Welcome Email",
    })
    .then(function (results) {
      //console.log(results)
      return results.success;
    });

}

exports.sendMovement = async (user) => {

  const recipients = [
    {
      email: user.email,
    }
  ];

  client
    .send({
      from: sender,
      to: recipients,
      subject: APP,
      text: "Olá " + user.name + "! Uma movimentação de estoque foi realizada!",
      category: "Welcome Email",
    })
    .then(function (results) {
      //console.log(results)
      return results.success;
    });

}

exports.sendTransfer = async (users) => {

  const recipients = users.map(user => ({
    email: user.email
  }));

  client
    .send({
      from: sender,
      to: recipients,
      subject: APP,
      text: "Uma transferência de estoque foi realizada!",
      category: "Welcome Email",
    })
    .then(function (results) {
      //console.log(results)
      return results.success;
    });

}