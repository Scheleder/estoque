const User = require('../models/User')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const MailService = require('../services/MailService');
const moment = require('moment-timezone');

exports.sendMailToUser = async (req, res) => {
    const { from, to, message } = req.body
    if (!from) {
        return res.status(202).json({ msg: "Remetente é obrigatório!" })
    }
    if (!to) {
        return res.status(202).json({ msg: "Destinatário é obrigatório!" })
    }
    if (!message) {
        return res.status(202).json({ msg: "Mensagem é obrigatória!" })
    }

    //CHECK USERS
    let userFrom = await User.findByPk(from);
    if (!userFrom) {
        return res.status(202).json({ msg: "Destinatário não encontrado!" })
    }
    let userTo = await User.findByPk(to);
    if (!userTo) {
        return res.status(202).json({ msg: "Destinatário não encontrado!" })
    }


    try {
        if (MailService.sendMessage(userFrom, userTo, message)) {
            return res.status(201).json({ msg: "Mensagem para " + userTo.name + " enviada com sucesso!" })
        } else {
            return res.status(202).json({ msg: "Falha ao enviar a mensagem!" })
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({ msg: 'Erro ao enviar e-mail! Erro:' + error })
    }
}
