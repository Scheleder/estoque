const Brand = require('../models/Brand')
const Category = require('../models/Category')
const Component = require('../models/Component')
const Item = require('../models/Item')
const Local = require('../models/Local')
const Movement = require('../models/Movement')
const User = require('../models/User')
const Contact = require('../models/Contact')
const Supplier = require('../models/Supplier')
const moment = require('moment-timezone');

exports.create = async(req, res)=>{
  const {name, email, phone, supplierId, userId} =  req.body
  if(!name){
    return res.status(202).json({ msg:"Nome é obrigatório!"})
  }

  //CHECK BRAND
  const contactExists = await Contact.findOne({ where: { name: name } });
  if(contactExists){
    return res.status(202).json({ msg:"Este Contato já está cadastrado!"})
  }

  //CREATE BRAND
  const contact = new Contact({
    name, 
    email,
    phone,
    supplierId,
    createdBy: userId
  })

  try {
    await contact.save()
    return res.status(201).json({msg:"Novo Contato adicionado com sucesso!", contact})
  } catch (error) {
    console.log(error)
    return res.status(500).json({msg: 'Erro ao cadastrar o contato! Erro:'+error})
  }
}

exports.getAll = async function(req, res){
  const { name } = req.query;

  let filter = {};

  if (name) {
    filter.name = { [Op.like]: `%${name}%` };
  }

  const contacts = await Contact.findAll({ 
    where: filter, 
    include: [
      {
        model: Supplier,
      }
    ]
  });
  return res.send(contacts)
}

exports.getOne = async (req, res) => {
  const id = req.params.id
  const contact = await Contact.findByPk(id, 
    {
      include: [
        {
          model: Supplier,
        },
      ]
    }
    )
  if(!contact){
    return res.status(404).json({ msg:"Contato não encontrado!"})
  }
   res.status(200).json({contact})
}

exports.delete = async (req, res) => {
  const id = req.params.id
  const contact = await Contact.findByPk(id)
  if(!contact){
    return res.status(404).json({ msg:"Contato não encontrado!"})
  }
  try {
    await contact.destroy();
    res.status(200).json({msg: "Contato excluído!"})
  } catch (error) {
    console.log(error)
    return res.status(500).json({msg: 'Erro ao excluir o contato! Erro:'+error})
  }
}

exports.update = async(req, res)=>{
  const {name, email, phone, supplierId, userId} =  req.body
  const id = req.params.id;

  if(!name){
    return res.status(202).json({ msg:"Nome é obrigatório!"})
  }

  const contact = await Contact.findByPk(id);
  if (!contact) {
    return res.status(404).json({ msg: "Contato não encontrado!" });
  }
  //CHECK NAME
  const nameExists = await Contact.findOne({ where: { name: name } });
  if(nameExists && nameExists.id != contact.id){
    return res.status(202).json({ msg:"Este nome já está cadastrado!"})
  }

  const updatedFields = {
    name: name || contact.name,
    email: email || contact.email,
    phone: phone || contact.phone,
    supplierId: supplierId || contact.supplierId,
    updatedBy: userId,
    updatedAt: moment.tz('America/Sao_Paulo').format()
  };

  try {
    await contact.update(updatedFields)
    return res.status(200).json({ msg: "Contato atualizado com sucesso!", contact: contact });
  } catch (error) {
    console.log(error)
    return res.status(500).json({msg: 'Erro ao atualizar o contato! Erro:'+error})
  }
}
