require('dotenv').config();
const nodemailer = require('nodemailer');

const APP = process.env.APP_NAME;

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: Number(process.env.MAIL_PORT),
  secure: false,
  auth: {
    user: process.env.MAIL_USERNAME,
    pass: process.env.MAIL_PASSWORD,
  },
});

const sender = {
  name: process.env.MAIL_FROM_NAME ? process.env.MAIL_FROM_NAME.replace(/\$\{APP_NAME\}/g, APP) : APP,
  address: process.env.MAIL_FROM_ADDRESS,
};

exports.sendMessage = async (userFrom, userTo, message) => {
  try {
    const info = await transporter.sendMail({
      from: sender,
      to: userTo.email,
      subject: "Mensagem de " + userFrom.name,
      text: "Olá " + userTo.name + "! \nA seguinte mensagem foi enviada para você através do aplicativo " + APP + ": \n\n" + message,
    });
    console.log("Email enviado:", info.messageId);
    return true;
  } catch (error) {
    console.error("Erro ao enviar email:", error);
    return false;
  }
}

exports.sendCodeVerification = async (user) => {
  try {
    const info = await transporter.sendMail({
      from: sender,
      to: user.email,
      subject: APP + " - Confirmação de E-mail",
      text: "Olá " + user.name + "! Bem vindo ao " + APP + ". Use o código " + user.code + " para confirmar seu endereço de e-mail.",
    });
    console.log("Email de verificação enviado:", info.messageId);
    return true;
  } catch (error) {
    console.error("Erro ao enviar email de verificação:", error);
    return false;
  }
}

exports.sendResetCode = async (user) => {
  try {
    const info = await transporter.sendMail({
      from: sender,
      to: user.email,
      subject: APP + " - Recuperação de Senha",
      text: "Olá " + user.name + "! Se você solicitou a recuperação de senha no " + APP + ". Use o seguinte código: " + user.code,
    });
    console.log("Email de reset enviado:", info.messageId);
    return true;
  } catch (error) {
    console.error("Erro ao enviar email de reset:", error);
    return false;
  }
}

exports.sendMovement = async (user) => {
  try {
    const info = await transporter.sendMail({
      from: sender,
      to: user.email,
      subject: APP + " - Movimentação de Estoque",
      text: "Olá " + user.name + "! Uma movimentação de estoque foi realizada!",
    });
    console.log("Email de movimentação enviado:", info.messageId);
    return true;
  } catch (error) {
    console.error("Erro ao enviar email de movimentação:", error);
    return false;
  }
}

exports.sendTransfer = async (users) => {
  const recipients = users.map(user => user.email).join(", ");

  try {
    const info = await transporter.sendMail({
      from: sender,
      to: recipients,
      subject: APP + " - Transferência de Estoque",
      text: "Uma transferência de estoque foi realizada!",
    });
    console.log("Email de transferência enviado:", info.messageId);
    return true;
  } catch (error) {
    console.error("Erro ao enviar email de transferência:", error);
    return false;
  }
}