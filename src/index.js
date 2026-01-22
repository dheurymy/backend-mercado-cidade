require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();


app.use(cors());
app.use(express.json());

// Rotas

app.use('/api/auth', require('./routes/auth'));
app.use('/api/boxes', require('./routes/boxes'));
app.use('/api/products', require('./routes/products'));
app.use('/api/categorias', require('./routes/categorias'));
app.use('/api/shopping-list', require('./routes/shoppingList'));
app.use('/api/upload', require('./routes/upload'));
app.use('/api/dashboard', require('./routes/dashboard'));

// Rotas (a serem implementadas)
// app.use('/api/auth', require('./routes/auth'));
// app.use('/api/boxes', require('./routes/boxes'));
// app.use('/api/products', require('./routes/products'));
// app.use('/api/shopping-list', require('./routes/shoppingList'));
// app.use('/api/admin', require('./routes/admin'));

app.get('/', (req, res) => {
  res.send('Mercado da Cidade API rodando!');
});

const PORT = process.env.PORT || 3001;

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/mercadocidade', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  });
})
.catch((err) => {
  console.error('Erro ao conectar no MongoDB:', err);
});
