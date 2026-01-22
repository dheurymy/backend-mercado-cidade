# Mercado da Cidade - Backend

Backend em Node.js, Express, Mongoose e MongoDB para o sistema Mercado da Cidade.

## Funcionalidades
- Autenticação por tipo de usuário (feirante, visitante, administrador)
- Cadastro e gerenciamento de boxes, produtos, estabelecimentos e categorias
- Lista de compras com roteiro inteligente
- API RESTful pronta para integração com frontend
- Pronto para deploy no Vercel

## Como rodar localmente
1. Instale as dependências:
   ```bash
   npm install
   ```
2. Configure as variáveis de ambiente (exemplo em `.env.example`).
3. Inicie o servidor:
   ```bash
   npm run dev
   ```

## Estrutura sugerida
- `/models` - Modelos Mongoose
- `/routes` - Rotas Express
- `/controllers` - Lógica de negócio
- `/middleware` - Middlewares de autenticação e permissões
- `/utils` - Utilitários

## Deploy
- Pronto para deploy no Vercel (serverless)

---

> Substitua este README conforme o projeto evoluir.
