require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const Categoria = require('../models/Categoria');
const Box = require('../models/Box');
const Produto = require('../models/Produto');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/mercadocidade';

async function seed() {
  await mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
  await User.deleteMany({});
  await Categoria.deleteMany({});
  await Box.deleteMany({});
  await Produto.deleteMany({});

  // Categorias
  const categorias = await Categoria.insertMany([
    { nome: 'Hortifruti', descricao: 'Frutas, verduras e legumes', tipo: 'produto' },
    { nome: 'Artesanato', descricao: 'Produtos artesanais', tipo: 'produto' },
    { nome: 'Alimentação', descricao: 'Comidas e bebidas', tipo: 'produto' },
    { nome: 'Serviços', descricao: 'Serviços diversos', tipo: 'produto' },
    { nome: 'Box Hortifruti', descricao: 'Box de hortifruti', tipo: 'estabelecimento' },
    { nome: 'Box Artesanato', descricao: 'Box de artesanato', tipo: 'estabelecimento' },
    { nome: 'Box Alimentação', descricao: 'Box de alimentação', tipo: 'estabelecimento' }
  ]);

  // Administradores
  const admins = await User.insertMany([
    { nome: 'Admin 1', email: 'admin1@mercado.com', senha: await bcrypt.hash('admin123', 10), tipo: 'admin' },
    { nome: 'Admin 2', email: 'admin2@mercado.com', senha: await bcrypt.hash('admin123', 10), tipo: 'admin' }
  ]);

  // Feirantes
  const feirantes = [];
  for (let i = 1; i <= 10; i++) {
    feirantes.push({
      nome: `Feirante ${i}`,
      cpf: `0000000000${i}`.slice(-11),
      senha: await bcrypt.hash('feirante123', 10),
      tipo: 'feirante'
    });
  }
  const feirantesCriados = await User.insertMany(feirantes);

  // Boxes e Produtos
  for (let i = 0; i < feirantesCriados.length; i++) {
    const box = await Box.create({
      nome: `Box ${i+1}`,
      descricao: `Box do Feirante ${i+1}`,
      localizacao: `Corredor ${String.fromCharCode(65 + (i%3))} - ${i+1}`,
      tipoEstabelecimento: categorias[4 + (i%3)]._id,
      feirante: feirantesCriados[i]._id
    });
    // Produtos variados
    for (let j = 1; j <= 5; j++) {
      const produto = await Produto.create({
        nome: `Produto ${j} do Box ${i+1}`,
        descricao: `Descrição do produto ${j} do box ${i+1}`,
        preco: (Math.random() * 20 + 2).toFixed(2),
        foto: '',
        categoria: categorias[i%4]._id,
        box: box._id,
        disponivel: true
      });
      await Box.findByIdAndUpdate(box._id, { $push: { produtos: produto._id } });
    }
  }

  console.log('Seed concluído com sucesso!');
  process.exit();
}

seed();
