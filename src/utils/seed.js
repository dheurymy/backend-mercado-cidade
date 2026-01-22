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

  // Limpar dados antigos
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

  // Feirantes e Boxes realistas
  const feirantesData = [
    { nome: 'Dona Maria', cpf: '11111111111', senha: await bcrypt.hash('feirante123', 10), tipo: 'feirante' },
    { nome: 'Seu João', cpf: '22222222222', senha: await bcrypt.hash('feirante123', 10), tipo: 'feirante' },
    { nome: 'Família Silva', cpf: '33333333333', senha: await bcrypt.hash('feirante123', 10), tipo: 'feirante' },
    { nome: 'Artesanato da Ana', cpf: '44444444444', senha: await bcrypt.hash('feirante123', 10), tipo: 'feirante' },
    { nome: 'Sabores do Mercado', cpf: '55555555555', senha: await bcrypt.hash('feirante123', 10), tipo: 'feirante' }
  ];
  const feirantesCriados = await User.insertMany(feirantesData);

  // Boxes e produtos realistas
  const boxesData = [
    {
      nome: 'Box da Dona Maria',
      descricao: 'Frutas frescas e verduras direto do produtor.',
      localizacao: 'Corredor A - 1',
      tipoEstabelecimento: categorias[4]._id,
      feirante: feirantesCriados[0]._id,
      produtos: [
        { nome: 'Banana Nanica', descricao: 'Banana madura, ideal para vitaminas.', preco: 4.50, foto: 'https://images.unsplash.com/photo-1574226516831-e1dff420e8e9?w=400&h=400&fit=crop', categoria: categorias[0]._id },
        { nome: 'Alface Crespa', descricao: 'Alface fresca e crocante.', preco: 2.00, foto: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=400&fit=crop', categoria: categorias[0]._id },
        { nome: 'Tomate Italiano', descricao: 'Tomate para salada ou molho.', preco: 5.00, foto: 'https://images.unsplash.com/photo-1464306076886-debca5e8a6b0?w=400&h=400&fit=crop', categoria: categorias[0]._id }
      ]
    },
    {
      nome: 'Box do Seu João',
      descricao: 'Legumes e raízes selecionados.',
      localizacao: 'Corredor B - 2',
      tipoEstabelecimento: categorias[4]._id,
      feirante: feirantesCriados[1]._id,
      produtos: [
        { nome: 'Cenoura', descricao: 'Cenoura orgânica.', preco: 3.00, foto: 'https://images.unsplash.com/photo-1502741338009-cac2772e18bc?w=400&h=400&fit=crop', categoria: categorias[0]._id },
        { nome: 'Batata Doce', descricao: 'Batata doce roxa.', preco: 4.00, foto: 'https://images.unsplash.com/photo-1518976024611-4886d7a7d57b?w=400&h=400&fit=crop', categoria: categorias[0]._id },
        { nome: 'Beterraba', descricao: 'Beterraba fresca.', preco: 3.50, foto: 'https://images.unsplash.com/photo-1506084868230-bb9d95c24759?w=400&h=400&fit=crop', categoria: categorias[0]._id }
      ]
    },
    {
      nome: 'Artesanato da Ana',
      descricao: 'Peças artesanais feitas à mão.',
      localizacao: 'Corredor C - 3',
      tipoEstabelecimento: categorias[5]._id,
      feirante: feirantesCriados[3]._id,
      produtos: [
        { nome: 'Cesto de Palha', descricao: 'Cesto artesanal para decoração.', preco: 25.00, foto: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=400&h=400&fit=crop', categoria: categorias[1]._id },
        { nome: 'Boneca de Pano', descricao: 'Boneca feita à mão.', preco: 30.00, foto: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=400&h=400&fit=crop', categoria: categorias[1]._id }
      ]
    },
    {
      nome: 'Sabores do Mercado',
      descricao: 'Comidas típicas e lanches.',
      localizacao: 'Corredor D - 4',
      tipoEstabelecimento: categorias[6]._id,
      feirante: feirantesCriados[4]._id,
      produtos: [
        { nome: 'Pastel de Queijo', descricao: 'Pastel frito na hora.', preco: 7.00, foto: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=400&fit=crop', categoria: categorias[2]._id },
        { nome: 'Suco Natural', descricao: 'Suco de frutas da estação.', preco: 5.00, foto: 'https://images.unsplash.com/photo-1519864600265-abb23847ef2c?w=400&h=400&fit=crop', categoria: categorias[2]._id }
      ]
    }
  ];

  for (const boxData of boxesData) {
    const box = await Box.create({
      nome: boxData.nome,
      descricao: boxData.descricao,
      localizacao: boxData.localizacao,
      tipoEstabelecimento: boxData.tipoEstabelecimento,
      feirante: boxData.feirante
    });
    for (const prod of boxData.produtos) {
      const produto = await Produto.create({
        ...prod,
        box: box._id,
        disponivel: true
      });
      await Box.findByIdAndUpdate(box._id, { $push: { produtos: produto._id } });
    }
  }

  // Administradores
  await User.insertMany([
    { nome: 'Admin 1', email: 'admin1@mercado.com', senha: await bcrypt.hash('admin123', 10), tipo: 'admin' },
    { nome: 'Admin 2', email: 'admin2@mercado.com', senha: await bcrypt.hash('admin123', 10), tipo: 'admin' }
  ]);


  console.log('Seed concluído com sucesso!');
  process.exit();
}

seed();
