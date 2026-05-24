const Supplier = require('../models/Supplier')
const Category = require('../models/Category')
const Component = require('../models/Component')
const Item = require('../models/Item')
const Local = require('../models/Local')
const Movement = require('../models/Movement')
const User = require('../models/User')
const Contact = require('../models/Contact')
const Brand = require('../models/Brand')
const moment = require('moment-timezone');

exports.create = async (req, res) => {
    const { name, website, email, phone, adress, sap, userId } = req.body
    if (!name) {
        return res.status(202).json({ msg: "Nome é obrigatório!" })
    }

    //CHECK 
    const supplierExists = await Supplier.findOne({ where: { name: name } });
    if (supplierExists) {
        return res.status(202).json({ msg: "Este Fornecedor já está cadastrado!" })
    }

    //CREATE 
    const supplier = new Supplier({
        name,
        website,
        email,
        phone,
        adress,
        sap,
        createdBy: userId
    })

    try {
        await supplier.save()
        return res.status(201).json({ msg: "Novo Fornecedor adicionado com sucesso!", supplier })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ msg: 'Erro ao cadastrar o fornecedor! Erro:' + error })
    }
}

exports.getAll = async function (req, res) {
    const { name } = req.query;

    let filter = {};

    if (name) {
        filter.name = { [Op.like]: `%${name}%` };
    }

    const suppliers = await Supplier.findAll({
        where: filter,
        include: [
            {
                model: Component,
            },
            {
                model: Brand,
            },            
            {
                model: Contact,
            }
        ]
    });
    return res.send(suppliers)
}

exports.getOne = async (req, res) => {
    const id = req.params.id
    const supplier = await Supplier.findByPk(id,
        {
            include: [
                {
                    model: Component
                },
                {
                    model: Brand
                },
                {
                    model: Contact
                }
            ]
        }
    )
    if (!supplier) {
        return res.status(404).json({ msg: "Fornecedor não encontrado!" })
    }
    res.status(200).json({ supplier })
}

exports.delete = async (req, res) => {
    const id = req.params.id
    const supplier = await Supplier.findByPk(id)
    if (!supplier) {
        return res.status(404).json({ msg: "Fornecedor não encontrado!" })
    }
    try {
        await supplier.destroy();
        res.status(200).json({ msg: "Fornecedor excluído!" })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ msg: 'Erro ao excluir o fornecedor! Erro:' + error })
    }
}

exports.update = async (req, res) => {
    const { name, website, email, phone, adress, sap, userId } = req.body
    const id = req.params.id;

    if (!name) {
        return res.status(202).json({ msg: "Nome é obrigatório!" })
    }

    const supplier = await Supplier.findByPk(id);
    if (!supplier) {
        return res.status(404).json({ msg: "Fornecedor não encontrado!" });
    }
    //CHECK NAME
    const nameExists = await Supplier.findOne({ where: { name: name } });
    if (nameExists && nameExists.id != supplier.id) {
        return res.status(202).json({ msg: "Este nome já está cadastrado!" })
    }

    const updatedFields = {
        name: name || supplier.name,
        website: website || supplier.website,
        email: email || supplier.email,
        phone: phone || supplier.phone,
        adress: adress || supplier.adress,
        sap: sap || supplier.sap,
        updatedBy: userId,
        updatedAt: moment.tz('America/Sao_Paulo').format()
    };

    try {
        await supplier.update(updatedFields)
        return res.status(200).json({ msg: "Fornecedor atualizado com sucesso!", supplier: supplier });
    } catch (error) {
        console.log(error)
        return res.status(500).json({ msg: 'Erro ao atualizar o fornecedor! Erro:' + error })
    }
}
